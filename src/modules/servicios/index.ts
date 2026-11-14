// Módulo 1 · Pago de servicios y recargas con CoDi.
// Flujo: elegir servicio → escribir referencia → ver adeudo → confirmar → cobro CoDi (push o QR) → pey confirma
//        → se liquida con el agregador (SIMULACIÓN por ahora) → comprobante por WhatsApp.
import { config } from "../../config.ts";
import { celularDe, historial } from "../../core/cobros.ts";
import { mxn } from "../../core/dinero.ts";
import type { Cobro, Contexto, Entrada, MetodoCobro, Modulo } from "../../core/tipos.ts";
import { agregador } from "./agregador.ts";
import { MONTOS_RECARGA, OPERADORES, SERVICIOS, operadorPorClave, servicioPorClave } from "./catalogo.ts";

interface Orden {
  tipo: "servicio" | "recarga";
  clave: string; // servicio u operador
  nombre: string;
  emoji: string;
  referencia: string; // referencia del servicio o celular a recargar
  centavosReal: number; // monto del recibo o de la recarga
  periodo?: string;
  vence?: string;
}

const ocultar = (ref: string) => (ref.length > 4 ? `•••• ${ref.slice(-4)}` : ref);
const soloDigitos = (s: string) => s.replace(/[\s-]/g, "");

/** Cuánto se cobra de verdad: en la demo, un monto de prueba; si no, el monto real dentro del tope (AGENTS.md §3). */
function montoACobrar(centavosReal: number): number | null {
  if (config.demoCobroCentavos > 0) return Math.min(config.demoCobroCentavos, config.maxCobroCentavos);
  return centavosReal <= config.maxCobroCentavos ? centavosReal : null;
}

const enDemo = () => config.demoCobroCentavos > 0;

async function listaServicios(ctx: Contexto) {
  await ctx.responder.lista("¿Qué servicio quieres pagar?", "Elegir servicio", [
    { titulo: "Servicios", filas: SERVICIOS.map((s) => ({ id: `svc:srv:${s.clave}`, titulo: `${s.emoji} ${s.nombre}`, descripcion: s.categoria })) },
  ]);
}

async function listaOperadores(ctx: Contexto) {
  await ctx.responder.lista("¿De qué compañía es el celular?", "Elegir compañía", [
    { titulo: "Recargas", filas: OPERADORES.map((o) => ({ id: `svc:rec:${o.clave}`, titulo: `📱 ${o.nombre}` })) },
  ]);
}

async function listaMontos(ctx: Contexto, operador: string, numero: string) {
  ctx.irA("rec_monto", { operador, numero });
  await ctx.responder.lista(`Recarga ${operadorPorClave(operador)?.nombre} al ${ocultar(numero)}.\n¿De cuánto?`, "Elegir monto", [
    { titulo: "Montos", filas: MONTOS_RECARGA.map((m) => ({ id: `svc:recmonto:${m}`, titulo: `$${m}` })) },
  ]);
}

async function confirmar(ctx: Contexto, orden: Orden) {
  const cobro = montoACobrar(orden.centavosReal);
  if (cobro === null) {
    await ctx.responder.botones(`Ese monto supera el máximo de ${mxn(config.maxCobroCentavos)} de esta demo.`, [{ id: "core:menu", titulo: "Menú" }]);
    return;
  }
  ctx.irA("confirmar", { orden });
  const lineas =
    orden.tipo === "servicio"
      ? [`${orden.emoji} *${orden.nombre}*`, `Referencia: ${ocultar(orden.referencia)}`, `Periodo: ${orden.periodo}`, `Vence: ${orden.vence}`, ``, `*Total: ${mxn(orden.centavosReal)}*`]
      : [`📱 *Recarga ${orden.nombre}*`, `Número: ${ocultar(orden.referencia)}`, ``, `*Total: ${mxn(orden.centavosReal)}*`];
  if (enDemo()) lineas.push(``, `🧪 _Demo: tu banco te cobrará ${mxn(cobro)} reales vía CoDi. El pago a ${orden.nombre} es una SIMULACIÓN._`);
  else lineas.push(`Sin comisiones.`);
  await ctx.responder.botones(lineas.join("\n"), [
    { id: "svc:pagar:pn", titulo: "✅ Pagar" },
    { id: "svc:pagar:qr", titulo: "📷 Pagar con QR" },
    { id: "core:menu", titulo: "Cancelar" },
  ], { pie: "Pagar = solicitud a tu app bancaria" });
}

async function pagar(ctx: Contexto, metodo: MetodoCobro) {
  const orden = ctx.sesion.datos.orden as Orden | undefined;
  if (!orden || ctx.sesion.paso !== "confirmar") return ctx.menu();
  const centavos = montoACobrar(orden.centavosReal);
  if (centavos === null) return ctx.menu();
  ctx.irA("cobrando");
  const concepto = orden.tipo === "servicio" ? `Pago ${orden.nombre} ${orden.referencia.slice(-4)}` : `Recarga ${orden.nombre} ${orden.referencia.slice(-4)}`;
  await ctx.cobrar({ centavos, concepto, metodo, payload: { orden } });
}

async function mostrarHistorial(ctx: Contexto) {
  const pagos = historial(ctx.waId, "svc", 5);
  if (pagos.length === 0) {
    await ctx.responder.botones("Aún no tienes pagos con Pey.", [{ id: "svc:servicios", titulo: "Pagar un servicio" }, { id: "core:menu", titulo: "Menú" }]);
    return;
  }
  const lineas = pagos.map((p) => {
    const o = p.payload.orden as Orden;
    const fecha = new Date(p.pagadoEn!).toLocaleDateString("es-MX", { day: "numeric", month: "short", timeZone: "America/Mexico_City" });
    return `• ${fecha} · ${o.emoji} ${o.nombre} ${ocultar(o.referencia)} · ${mxn(o.centavosReal)}${p.simulado ? " (SIMULACIÓN)" : ""}`;
  });
  await ctx.responder.botones(`🧾 *Tus últimos pagos*\n${lineas.join("\n")}`, [{ id: "core:menu", titulo: "Menú" }]);
}

async function atender(ctx: Contexto, e: Entrada) {
  if (e.tipo === "boton" && e.id) {
    const [, accion, arg] = e.id.split(":");
    switch (accion) {
      case "servicios":
        return listaServicios(ctx);
      case "recargas":
        return listaOperadores(ctx);
      case "historial":
        return mostrarHistorial(ctx);
      case "srv": {
        const s = servicioPorClave(arg);
        if (!s) return listaServicios(ctx);
        ctx.irA("ref", { servicio: s.clave });
        return ctx.responder.texto(`${s.emoji} *${s.nombre}*\nEscribe tu ${s.etiquetaRef}.\n_${s.ayudaRef}_`);
      }
      case "rec": {
        const o = operadorPorClave(arg);
        if (!o) return listaOperadores(ctx);
        ctx.irA("rec_numero", { operador: o.clave });
        const propio = celularDe(ctx.waId);
        return ctx.responder.botones(`📱 Recarga *${o.nombre}*. ¿A qué número?`, [
          ...(propio ? [{ id: "svc:recnum:yo", titulo: `A este (${propio.slice(-4)})` }] : []),
          { id: "svc:recnum:otro", titulo: "Otro número" },
        ]);
      }
      case "recnum": {
        const operador = ctx.sesion.datos.operador as string | undefined;
        if (!operador) return listaOperadores(ctx);
        const propio = celularDe(ctx.waId);
        if (arg === "yo" && propio) return listaMontos(ctx, operador, propio);
        ctx.irA("rec_numero_texto");
        return ctx.responder.texto("Escribe el número a 10 dígitos.");
      }
      case "recmonto": {
        const { operador, numero } = ctx.sesion.datos as { operador?: string; numero?: string };
        const o = operador ? operadorPorClave(operador) : undefined;
        const pesos = Number(arg);
        if (!o || !numero || !MONTOS_RECARGA.includes(pesos)) return listaOperadores(ctx);
        return confirmar(ctx, { tipo: "recarga", clave: o.clave, nombre: o.nombre, emoji: "📱", referencia: numero, centavosReal: pesos * 100 });
      }
      case "pagar":
        return pagar(ctx, arg === "qr" ? "qr" : "pn");
    }
    return ctx.menu();
  }

  // Texto libre según el paso.
  const texto = soloDigitos(e.texto ?? "");
  switch (ctx.sesion.paso) {
    case "ref": {
      const s = servicioPorClave(String(ctx.sesion.datos.servicio));
      if (!s) return listaServicios(ctx);
      if (!s.patron.test(texto)) return ctx.responder.texto(`Ese ${s.etiquetaRef} no parece correcto. ${s.ayudaRef}\nIntenta de nuevo o escribe *menú*.`);
      await ctx.responder.texto("🔎 Consultando tu adeudo…");
      const adeudo = await agregador.consultar(s.clave, texto);
      if (!adeudo) {
        ctx.irA("fin");
        return ctx.responder.botones(`✅ ${s.nombre} ${ocultar(texto)} no tiene adeudo pendiente.`, [{ id: "svc:servicios", titulo: "Pagar otro" }, { id: "core:menu", titulo: "Menú" }]);
      }
      return confirmar(ctx, { tipo: "servicio", clave: s.clave, nombre: s.nombre, emoji: s.emoji, referencia: texto, centavosReal: adeudo.centavos, periodo: adeudo.periodo, vence: adeudo.vence });
    }
    case "rec_numero_texto": {
      if (!/^\d{10}$/.test(texto)) return ctx.responder.texto("El número debe tener 10 dígitos. Intenta de nuevo o escribe *menú*.");
      return listaMontos(ctx, String(ctx.sesion.datos.operador), texto);
    }
    case "confirmar":
      return ctx.responder.texto("Toca *Pagar* o *Pagar con QR* para continuar, o escribe *menú*.");
    case "cobrando":
      return ctx.responder.texto("Estamos esperando la confirmación de tu banco. Te aviso aquí en cuanto llegue ✅");
  }
  return ctx.menu();
}

async function onPagado(ctx: Contexto, cobro: Cobro) {
  const orden = cobro.payload.orden as Orden;
  const liquidacion = await agregador.pagar({ tipo: orden.tipo, clave: orden.clave, referencia: orden.referencia, centavos: orden.centavosReal, idCobro: cobro.id });
  const fecha = new Date(cobro.pagadoEn ?? Date.now()).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short", timeZone: "America/Mexico_City" });
  const lineas = [
    cobro.simulado ? "⚠️ *SIMULACIÓN · no es un pago real*" : "✅ *¡Pago confirmado!*",
    ``,
    orden.tipo === "servicio" ? `${orden.emoji} ${orden.nombre} · ${ocultar(orden.referencia)}` : `📱 Recarga ${orden.nombre} · ${ocultar(orden.referencia)}`,
    `Monto: ${mxn(orden.centavosReal)}`,
    ...(enDemo() || cobro.centavos !== orden.centavosReal ? [`Cobrado vía CoDi: ${mxn(cobro.centavos)}`] : []),
    `Fecha: ${fecha}`,
    ...(cobro.rastreo ? [`Clave de rastreo: ${cobro.rastreo}`] : []),
    `Folio Pey: ${cobro.numRef}`,
    `Folio ${orden.nombre}: ${liquidacion.folio}${liquidacion.simulado ? " (SIMULACIÓN)" : ""}`,
    ``,
    cobro.simulado ? `⚠️ SIMULACIÓN: no se movió dinero` : `Sin comisiones · Pagado con CoDi`,
  ];
  ctx.irA("fin");
  await ctx.responder.botones(lineas.join("\n"), [
    { id: orden.tipo === "servicio" ? "svc:servicios" : "svc:recargas", titulo: "Pagar otro" },
    { id: "core:menu", titulo: "Menú" },
  ], { encabezado: "Comprobante de pago" });
}

export const servicios: Modulo = {
  id: "svc",
  menu: [
    { id: "svc:servicios", titulo: "💡 Pagar un servicio", descripcion: "Luz, agua, teléfono, internet, TV, gas" },
    { id: "svc:recargas", titulo: "📱 Recarga de saldo", descripcion: "Telcel, AT&T, Movistar, Bait y más" },
    { id: "svc:historial", titulo: "🧾 Mis pagos", descripcion: "Tus últimos comprobantes" },
  ],
  atender,
  onPagado,
};

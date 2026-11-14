// Módulo 3 · Cobro rápido + factura express.
// Para profesionistas que cobran en sitio (consulta, plomería, reparación tras un choque…):
//   monto → concepto → QR en su pantalla o push al celular del cliente (con su aceptación) → pey confirma
//   → datos fiscales mínimos del cliente → factura PDF en el chat para reenviarla.
// La factura sale del facturador configurado: Facturama si hay credenciales; si no, SIMULACIÓN sin validez fiscal.
import { actualizarPayload, cobroPorId } from "../../core/cobros.ts";
import { enDemo, montoACobrar } from "../../core/demo.ts";
import { mxn } from "../../core/dinero.ts";
import { REGIMENES, RFC_VALIDO, USOS, facturadorConfigurado, type Receptor } from "../../core/facturacion/index.ts";
import type { Cobro, Contexto, Entrada, Modulo } from "../../core/tipos.ts";

const CONCEPTOS: { clave: string; titulo: string }[] = [
  { clave: "consulta", titulo: "Consulta médica" },
  { clave: "auto", titulo: "Reparación de auto" },
  { clave: "plomeria", titulo: "Plomería" },
  { clave: "electricidad", titulo: "Electricidad" },
  { clave: "tecnico", titulo: "Servicio técnico" },
  { clave: "clase", titulo: "Clase particular" },
];

const MAX_REAL_CENTAVOS = 100_000_00; // $100,000: tope de captura del monto de referencia

/** "$1,250.50" → 125050 */
export function leerMonto(texto: string): number | null {
  const limpio = texto.replace(/[$\s,]/g, "").replace(/mxn|pesos?/gi, "");
  if (!/^\d+(\.\d{1,2})?$/.test(limpio)) return null;
  const c = Math.round(Number(limpio) * 100);
  return c > 0 && c <= MAX_REAL_CENTAVOS ? c : null;
}

const ocultar = (cel: string) => `•••• ${cel.slice(-4)}`;

async function pedirMonto(ctx: Contexto) {
  ctx.irA("monto", { centavosReal: null, concepto: null, celular: null });
  await ctx.responder.texto("⚡ *Cobro rápido*\n¿Cuánto vas a cobrar? Escribe el monto, por ejemplo *350*.");
}

async function pedirMetodo(ctx: Contexto) {
  const { centavosReal, concepto } = ctx.sesion.datos as { centavosReal: number; concepto: string };
  const cobro = montoACobrar(centavosReal);
  if (cobro === null) return ctx.responder.botones("Ese monto supera el máximo de esta demo.", [{ id: "core:menu", titulo: "Menú" }]);
  ctx.irA("metodo");
  const lineas = [`⚡ *${concepto}*`, `Total: *${mxn(centavosReal)}*`];
  if (enDemo()) lineas.push("", `🧪 _Demo: se cobran ${mxn(cobro)} reales vía CoDi._`);
  lineas.push("", "¿Cómo te paga tu cliente?");
  await ctx.responder.botones(lineas.join("\n"), [
    { id: "p2p:metodo:qr", titulo: "📷 QR en mi pantalla" },
    { id: "p2p:metodo:pn", titulo: "📲 A su celular" },
    { id: "core:menu", titulo: "Cancelar" },
  ]);
}

async function cobrar(ctx: Contexto, metodo: "qr" | "pn") {
  const { centavosReal, concepto, celular } = ctx.sesion.datos as { centavosReal?: number; concepto?: string; celular?: string };
  if (!centavosReal || !concepto) return pedirMonto(ctx);
  const centavos = montoACobrar(centavosReal);
  if (centavos === null) return ctx.menu();
  ctx.irA("cobrando");
  await ctx.cobrar({
    centavos,
    concepto: concepto.slice(0, 40),
    metodo,
    audiencia: "tercero",
    ...(metodo === "pn" && celular ? { celular } : {}),
    payload: { concepto, centavosReal },
  });
}

// ---------- Factura ----------
interface Borrador extends Partial<Receptor> {
  cobro: string;
}

function cobroFacturable(ctx: Contexto, id: string): Cobro | null {
  const c = cobroPorId(id);
  return c && c.waId === ctx.waId && c.modulo === "p2p" && c.estado === "pagado" ? c : null;
}

async function iniciarFactura(ctx: Contexto, cobroId: string) {
  const c = cobroFacturable(ctx, cobroId);
  if (!c) return ctx.responder.botones("No encontré ese cobro pagado.", [{ id: "core:menu", titulo: "Menú" }]);
  const previa = c.payload.factura as { folio: string } | undefined;
  if (previa) return ctx.responder.botones(`Ese cobro ya tiene la factura ${previa.folio}.`, [{ id: "core:menu", titulo: "Menú" }]);
  ctx.irA("rfc", { factura: { cobro: cobroId } satisfies Borrador });
  await ctx.responder.botones("🧾 *Factura*\nEscribe el *RFC* de tu cliente.", [
    { id: `p2p:pg:${cobroId}`, titulo: "Público en general" },
    { id: "core:menu", titulo: "Cancelar" },
  ]);
}

const borrador = (ctx: Contexto) => (ctx.sesion.datos.factura ?? {}) as Borrador;
const guardar = (ctx: Contexto, paso: string, cambios: Partial<Borrador>) => ctx.irA(paso, { factura: { ...borrador(ctx), ...cambios } });

async function confirmarFactura(ctx: Contexto) {
  const b = borrador(ctx);
  const c = b.cobro ? cobroFacturable(ctx, b.cobro) : null;
  if (!c) return ctx.menu();
  ctx.irA("confirmar_factura");
  const total = Number(c.payload.centavosReal ?? c.centavos);
  const facturador = facturadorConfigurado();
  await ctx.responder.botones(
    [
      "🧾 *Revisa los datos*",
      `RFC: ${b.rfc}`,
      `Nombre: ${b.nombre}`,
      `CP: ${b.cp}`,
      `Régimen: ${REGIMENES.find((r) => r.clave === b.regimen)?.titulo ?? b.regimen}`,
      `Uso: ${USOS.find((u) => u.clave === b.uso)?.titulo ?? b.uso}`,
      "",
      `${c.payload.concepto ?? c.concepto} · ${mxn(total)} (IVA incluido)`,
      ...(facturador.nombre === "SIMULACIÓN" ? ["", "⚠️ _SIMULACIÓN: el PDF no tiene validez fiscal._"] : [`_Timbrado con ${facturador.nombre}._`]),
    ].join("\n"),
    [
      { id: "p2p:emitir", titulo: "✅ Emitir factura" },
      { id: `p2p:fac:${c.id}`, titulo: "Corregir" },
      { id: "core:menu", titulo: "Cancelar" },
    ],
  );
}

async function emitir(ctx: Contexto) {
  const b = borrador(ctx);
  const c = b.cobro ? cobroFacturable(ctx, b.cobro) : null;
  if (!c || !b.rfc || !b.nombre || !b.cp || !b.regimen || !b.uso) return ctx.menu();
  if (c.payload.factura) return ctx.responder.texto("Ese cobro ya está facturado.");
  ctx.irA("emitiendo");
  await ctx.responder.texto("⏳ Generando la factura…");
  const facturador = facturadorConfigurado();
  try {
    const f = await facturador.emitir({
      folio: c.numRef,
      receptor: { rfc: b.rfc, nombre: b.nombre, cp: b.cp, regimen: b.regimen, uso: b.uso },
      concepto: String(c.payload.concepto ?? c.concepto),
      totalCentavos: Number(c.payload.centavosReal ?? c.centavos),
      rastreo: c.rastreo,
    });
    actualizarPayload(c.id, { factura: { folio: f.folio, uuid: f.uuid, simulada: f.simulada, rfc: b.rfc } });
    await ctx.responder.documento(
      f.pdf,
      `Factura-${f.folio}.pdf`,
      f.simulada ? `🧾 ${f.folio} · SIMULACIÓN sin validez fiscal` : `🧾 Factura ${f.folio} · UUID ${f.uuid}`,
    );
    ctx.irA("fin");
    await ctx.responder.botones("Listo ✅ Reenvíale este PDF a tu cliente.", [
      { id: "p2p:inicio", titulo: "Nuevo cobro" },
      { id: "core:menu", titulo: "Menú" },
    ]);
  } catch (e) {
    console.error("[factura] error", { cobro: c.id, error: (e as Error).message.slice(0, 200) });
    ctx.irA("confirmar_factura");
    await ctx.responder.botones(`⚠️ No se pudo emitir la factura.\n_${(e as Error).message.slice(0, 300)}_`, [
      { id: `p2p:fac:${c.id}`, titulo: "Corregir datos" },
      { id: "core:menu", titulo: "Menú" },
    ]);
  }
}

// ---------- Router del módulo ----------
async function atender(ctx: Contexto, e: Entrada) {
  if (e.tipo === "boton" && e.id) {
    const [, accion, arg] = e.id.split(":");
    switch (accion) {
      case "inicio":
        return pedirMonto(ctx);
      case "con": {
        if (arg === "otro") {
          ctx.irA("concepto_texto");
          return ctx.responder.texto("Escribe el concepto (por ejemplo: *Cambio de llanta*).");
        }
        const c = CONCEPTOS.find((x) => x.clave === arg);
        if (!c || !ctx.sesion.datos.centavosReal) return pedirMonto(ctx);
        ctx.irA("metodo", { concepto: c.titulo });
        return pedirMetodo(ctx);
      }
      case "metodo":
        if (arg === "qr") return cobrar(ctx, "qr");
        ctx.irA("celular");
        return ctx.responder.texto("Escribe el celular de tu cliente a 10 dígitos.\n_Le llegará una solicitud de cobro en la app de su banco._");
      case "enviar":
        return cobrar(ctx, "pn");
      case "fac":
        return iniciarFactura(ctx, arg);
      case "pg": {
        // Público en general: RFC genérico del SAT para clientes que no piden factura a su nombre.
        if (!cobroFacturable(ctx, arg)) return ctx.menu();
        const cp = process.env.FACTURAMA_LUGAR_EXPEDICION || "06000";
        ctx.irA("rfc", { factura: { cobro: arg, rfc: "XAXX010101000", nombre: "PUBLICO EN GENERAL", cp, regimen: "616", uso: "S01" } satisfies Borrador });
        return confirmarFactura(ctx);
      }
      case "reg":
        if (!REGIMENES.some((r) => r.clave === arg)) return ctx.menu();
        guardar(ctx, "uso", { regimen: arg });
        return ctx.responder.lista("¿Para qué usará la factura?", "Elegir uso", [
          { titulo: "Uso del CFDI", filas: USOS.map((u) => ({ id: `p2p:uso:${u.clave}`, titulo: u.titulo, descripcion: u.clave })) },
        ]);
      case "uso":
        if (!USOS.some((u) => u.clave === arg)) return ctx.menu();
        guardar(ctx, "confirmar_factura", { uso: arg });
        return confirmarFactura(ctx);
      case "emitir":
        return emitir(ctx);
    }
    return ctx.menu();
  }

  const texto = (e.texto ?? "").trim();
  switch (ctx.sesion.paso) {
    case "monto": {
      const c = leerMonto(texto);
      if (c === null) return ctx.responder.texto("Escribe solo el monto, por ejemplo *350* o *1200.50*.");
      ctx.irA("concepto", { centavosReal: c });
      return ctx.responder.lista(`Cobro de *${mxn(c)}*. ¿Por qué concepto?`, "Elegir concepto", [
        { titulo: "Conceptos", filas: [...CONCEPTOS.map((x) => ({ id: `p2p:con:${x.clave}`, titulo: x.titulo })), { id: "p2p:con:otro", titulo: "✏️ Otro (escribir)" }] },
      ]);
    }
    case "concepto_texto": {
      if (texto.length < 3) return ctx.responder.texto("Escribe un concepto un poco más largo.");
      ctx.irA("metodo", { concepto: texto.slice(0, 60) });
      return pedirMetodo(ctx);
    }
    case "celular": {
      const cel = texto.replace(/\D/g, "");
      if (!/^\d{10}$/.test(cel)) return ctx.responder.texto("El celular debe tener 10 dígitos. Intenta de nuevo o escribe *menú*.");
      ctx.irA("confirmar_celular", { celular: cel });
      // Solo se manda la solicitud con aceptación explícita de quien paga (codi/05: cobros solo a clientes que lo autorizaron).
      return ctx.responder.botones(`¿Tu cliente aceptó recibir la solicitud de cobro en el ${ocultar(cel)}?`, [
        { id: "p2p:enviar", titulo: "Sí, enviar" },
        { id: "p2p:metodo:qr", titulo: "Mejor QR" },
        { id: "core:menu", titulo: "Cancelar" },
      ]);
    }
    case "rfc": {
      const rfc = texto.toUpperCase().replace(/[\s-]/g, "");
      if (!RFC_VALIDO.test(rfc)) return ctx.responder.texto("Ese RFC no parece válido (12 o 13 caracteres). Intenta de nuevo.");
      guardar(ctx, "nombre", { rfc });
      return ctx.responder.texto("Escribe el *nombre o razón social* tal como aparece en su constancia de situación fiscal.");
    }
    case "nombre": {
      if (texto.length < 3) return ctx.responder.texto("Escribe el nombre completo.");
      guardar(ctx, "cp", { nombre: texto.toUpperCase().slice(0, 120) });
      return ctx.responder.texto("Escribe el *código postal* de su domicilio fiscal (5 dígitos).");
    }
    case "cp": {
      if (!/^\d{5}$/.test(texto)) return ctx.responder.texto("El código postal tiene 5 dígitos.");
      guardar(ctx, "regimen", { cp: texto });
      return ctx.responder.lista("¿Cuál es su régimen fiscal?", "Elegir régimen", [
        { titulo: "Régimen fiscal", filas: REGIMENES.map((r) => ({ id: `p2p:reg:${r.clave}`, titulo: r.titulo, descripcion: r.clave })) },
      ]);
    }
    case "cobrando":
      return ctx.responder.texto("Esperando la confirmación del banco. Te aviso aquí en cuanto llegue ✅");
  }
  return pedirMonto(ctx);
}

async function onPagado(ctx: Contexto, cobro: Cobro) {
  const real = Number(cobro.payload.centavosReal ?? cobro.centavos);
  const fecha = new Date(cobro.pagadoEn ?? Date.now()).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short", timeZone: "America/Mexico_City" });
  ctx.irA("pagado");
  await ctx.responder.botones(
    [
      cobro.simulado ? "⚠️ *SIMULACIÓN · no es un pago real*" : "✅ *¡Cobro recibido!*",
      "",
      `${cobro.payload.concepto ?? cobro.concepto} · ${mxn(real)}`,
      ...(real !== cobro.centavos ? [`Cobrado vía CoDi: ${mxn(cobro.centavos)}`] : []),
      `Fecha: ${fecha}`,
      ...(cobro.rastreo ? [`Clave de rastreo: ${cobro.rastreo}`] : []),
      `Folio: ${cobro.numRef}`,
      "",
      "¿Tu cliente quiere factura?",
    ].join("\n"),
    [
      { id: `p2p:fac:${cobro.id}`, titulo: "🧾 Facturar" },
      { id: "p2p:inicio", titulo: "Nuevo cobro" },
      { id: "core:menu", titulo: "Menú" },
    ],
    { encabezado: "Comprobante" },
  );
}

export const p2p: Modulo = {
  id: "p2p",
  menu: [{ id: "p2p:inicio", titulo: "⚡ Cobro rápido", descripcion: "Cobra un servicio al momento y factura" }],
  atender,
  onPagado,
};

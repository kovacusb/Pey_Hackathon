// Módulo 2 · Tiendita (diseño y motor de la rama "business", docs/PRD.md).
// Adaptador: conecta el motor puro (motor.ts: estado + evento → mensajes + solicitud de cobro) con el núcleo.
// El motor decide productos, carrito y montos (solo del catálogo, nunca arriba de MAX_MONTO_MXN);
// el núcleo crea el cobro CoDi real con pey, lo confirma y avisa a onPagado una sola vez.
import { config } from "../../config.ts";
import { celularDe } from "../../core/cobros.ts";
import { mxn } from "../../core/dinero.ts";
import type { Cobro, Contexto, Entrada, Modulo } from "../../core/tipos.ts";
import { leerAjustes, listarProductos } from "./datos.ts";
import { ESTADO_INICIAL, responder, type Estado, type Evento, type Mensaje, type Partida } from "./motor.ts";

const PREFIJO = "tienda:";
const conPrefijo = (id: string) => PREFIJO + id;

/** Traduce lo que llega de WhatsApp al evento que entiende el motor. */
function aEvento(e: Entrada): Evento {
  if (e.tipo === "boton" && e.id?.startsWith(PREFIJO)) {
    const id = e.id.slice(PREFIJO.length);
    if (id === "inicio") return { tipo: "texto", texto: "" }; // el motor saluda y muestra el catálogo
    return id.startsWith("prod:") ? { tipo: "lista", id } : { tipo: "boton", id };
  }
  return { tipo: "texto", texto: e.texto ?? "" };
}

/** Manda un mensaje del motor por el núcleo, con los ids prefijados para que el router los regrese aquí. */
async function enviar(ctx: Contexto, m: Mensaje) {
  if (m.tipo === "texto") return ctx.responder.texto(m.texto);
  if (m.tipo === "botones") {
    return ctx.responder.botones(m.cuerpo, m.botones.map((b) => ({ id: conPrefijo(b.id), titulo: b.titulo })), { pie: m.pie });
  }
  return ctx.responder.lista(
    m.cuerpo,
    m.boton,
    [{ titulo: m.seccion, filas: m.renglones.map((r) => ({ id: conPrefijo(r.id), titulo: r.titulo, descripcion: r.descripcion })) }],
    { pie: m.pie },
  );
}

const describir = (partidas: Partida[]) => partidas.map((p) => `• ${p.cantidad} × ${p.nombre}: ${mxn(p.cantidad * p.precioCentavos)}`).join("\n");

async function atender(ctx: Contexto, e: Entrada) {
  // Catálogo y ajustes vienen del panel web (/panel): lo que cambia el comercio se ve en el siguiente mensaje.
  const ajustes = leerAjustes();
  const catalogo = listarProductos({ soloDisponibles: true });
  if (!ajustes.activo || !catalogo.length) {
    const motivo = ajustes.activo ? "no tiene productos disponibles por ahora" : "está cerrada por ahora";
    await ctx.responder.botones(`🛒 *${ajustes.nombre}* ${motivo}. Vuelve más tarde.`, [{ id: "core:menu", titulo: "Menú" }]);
    return;
  }
  const estado = (ctx.sesion.datos.estado as Estado | undefined) ?? ESTADO_INICIAL;
  const r = responder(estado, aEvento(e), {
    catalogo,
    maxMontoCentavos: config.maxCobroCentavos,
    ultimos4: celularDe(ctx.waId)?.slice(-4),
    nombreTienda: ajustes.nombre,
    saludo: ajustes.saludo,
  });
  ctx.irA("tienda", { estado: r.estado });
  for (const m of r.mensajes) await enviar(ctx, m);
  if (r.cobro) {
    const piezas = r.cobro.partidas.reduce((n, p) => n + p.cantidad, 0);
    await ctx.cobrar({
      centavos: r.cobro.montoCentavos,
      concepto: `${ajustes.nombre.slice(0, 24)} ${piezas} articulo${piezas === 1 ? "" : "s"}`,
      metodo: r.cobro.canal === "push" ? "pn" : "qr",
      payload: { partidas: r.cobro.partidas },
    });
  }
}

async function onPagado(ctx: Contexto, cobro: Cobro) {
  const partidas = (cobro.payload.partidas ?? []) as Partida[];
  const encabezado = cobro.simulado ? "⚠️ *SIMULACIÓN · no es un pago real*" : "✅ *¡Pago recibido!*";
  await ctx.responder.botones(
    [
      encabezado,
      "",
      describir(partidas),
      `Total: ${mxn(cobro.centavos)}`,
      ...(cobro.rastreo ? [`Clave de rastreo: ${cobro.rastreo}`] : []),
      `Folio: ${cobro.numRef}`,
      "",
      cobro.simulado ? "No se movió dinero." : "La tienda ya tiene tu pedido. ¡Gracias!",
    ].join("\n"),
    [
      { id: conPrefijo("inicio"), titulo: "Seguir comprando" },
      { id: "core:menu", titulo: "Menú" },
    ],
    { encabezado: "Comprobante" },
  );
}

export const tienda: Modulo = {
  id: "tienda",
  // Getter: el menú principal muestra el nombre que el comercio puso en el panel (título ≤ 24).
  get menu() {
    return [{ id: conPrefijo("inicio"), titulo: `🛒 ${leerAjustes().nombre}`.slice(0, 24), descripcion: "Compra y paga con CoDi desde el chat" }];
  },
  atender,
  onPagado,
};

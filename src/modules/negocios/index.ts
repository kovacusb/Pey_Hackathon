// Módulo 2 · Pey Negocios (lo construye tu compañero). Este archivo es el punto de partida: ver docs/MODULOS.md.
// Prefijo de botones: "neg:". Para cobrar: ctx.cobrar({ centavos, concepto, metodo: "qr", payload: { mesa, orden } }).
import type { Cobro, Contexto, Entrada, Modulo } from "../../core/tipos.ts";

async function atender(ctx: Contexto, _e: Entrada) {
  await ctx.responder.botones(
    "🏪 *Pey Negocios*\nCobra en tu negocio con CoDi desde WhatsApp: mesas, cajas o cobro directo.\n\n_Muy pronto aquí._",
    [{ id: "core:menu", titulo: "Menú" }],
  );
}

async function onPagado(ctx: Contexto, cobro: Cobro) {
  await ctx.responder.texto(`✅ Pago recibido: ${cobro.concepto}`);
}

export const negocios: Modulo = {
  id: "neg",
  menu: [{ id: "neg:inicio", titulo: "🏪 Soy negocio", descripcion: "Cobra en tu negocio con CoDi" }],
  atender,
  onPagado,
};

// Módulo 3 · Cobro rápido entre personas y profesionistas + factura express (por definir).
// Prefijo de botones: "p2p:". La factura (CFDI) irá detrás de una interfaz, igual que el agregador de servicios.
import type { Contexto, Entrada, Modulo } from "../../core/tipos.ts";

async function atender(ctx: Contexto, _e: Entrada) {
  await ctx.responder.botones(
    "⚡ *Cobro rápido*\nCobra al momento por un servicio (consulta, plomería, reparación) y envía la factura por WhatsApp.\n\n_Muy pronto aquí._",
    [{ id: "core:menu", titulo: "Menú" }],
  );
}

export const p2p: Modulo = {
  id: "p2p",
  menu: [{ id: "p2p:inicio", titulo: "⚡ Cobro rápido", descripcion: "Cobra por un servicio y factura al instante" }],
  atender,
};

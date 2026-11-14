// Centro de ayuda y adopción: guías paso a paso y preguntas frecuentes sobre CoDi.
import type { Contexto, Entrada, Modulo } from "../../core/tipos.ts";
import { GUIAS } from "./contenido.ts";

async function temas(ctx: Contexto) {
  await ctx.responder.lista("📚 *Aprende a pagar con CoDi.*\nElige un tema:", "Ver temas", [
    { titulo: "Guías", filas: GUIAS.map((g) => ({ id: `ayuda:g:${g.id}`, titulo: g.titulo, descripcion: g.resumen })) },
  ]);
}

async function atender(ctx: Contexto, e: Entrada) {
  const [, accion, arg] = (e.id ?? "").split(":");
  if (accion === "g") {
    const g = GUIAS.find((x) => x.id === arg);
    if (!g) return temas(ctx);
    const texto = g.video_url ? `${g.texto}\n\n🎬 Video: ${g.video_url}` : g.texto;
    return ctx.responder.botones(texto, [
      { id: "ayuda:temas", titulo: "Otra duda" },
      { id: "svc:servicios", titulo: "Pagar un servicio" },
      { id: "core:menu", titulo: "Menú" },
    ]);
  }
  return temas(ctx);
}

export const ayuda: Modulo = {
  id: "ayuda",
  menu: [{ id: "ayuda:temas", titulo: "📚 Aprende CoDi", descripcion: "Activar CoDi, seguridad, límites, dudas" }],
  atender,
};

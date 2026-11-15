// Centro de ayuda y adopción: guías paso a paso y preguntas frecuentes sobre CoDi.
import { existsSync } from "node:fs";
import type { Contexto, Entrada, Modulo } from "../../core/tipos.ts";
import { GUIAS } from "./contenido.ts";

const DIR_PUBLICO = new URL("../../../public/", import.meta.url).pathname;

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
    const botones = [
      { id: "ayuda:temas", titulo: "Otra duda" },
      { id: "p2p:inicio", titulo: "⚡ Cobro rápido" },
      { id: "core:menu", titulo: "Menú" },
    ];
    // Con video: el video lleva la guía como pie y después van los botones. Sin video (o si falla), solo texto.
    if (g.video_url && existsSync(DIR_PUBLICO + g.video_url.slice(1))) {
      try {
        await ctx.responder.video(g.video_url, g.texto);
        return ctx.responder.botones("¿Te quedó claro? 🙂", botones);
      } catch (e) {
        console.warn("[ayuda] no se pudo enviar el video", { guia: g.id, error: (e as Error).message.slice(0, 120) });
      }
    }
    return ctx.responder.botones(g.texto, botones);
  }
  return temas(ctx);
}

export const ayuda: Modulo = {
  id: "ayuda",
  menu: [{ id: "ayuda:temas", titulo: "📚 Aprende CoDi", descripcion: "Activar CoDi, seguridad, límites, dudas" }],
  atender,
};

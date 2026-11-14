// Transporte de WhatsApp Cloud API (Meta). Fuentes consultadas el 2026-11-14:
// - Verificación (hub.mode, hub.verify_token, hub.challenge) y firma X-Hub-Signature-256:
//   https://developers.facebook.com/docs/graph-api/webhooks/getting-started
// - Payload de mensajes y de avisos de estado: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples
// - Lista y botones: https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-list-messages
//   y https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages

import crypto from "node:crypto";
import type { Evento, Mensaje } from "./bot.ts";
import type { Config } from "./config.ts";

/** Firma de Meta: "sha256=" + HMAC-SHA256 del cuerpo crudo con el App Secret. */
// TODO(⚪): la página de Meta no dice que la firma vaya en hexadecimal; se asume hex. Confirmar con el primer evento real.
export function firmaMetaValida(cuerpoCrudo: Uint8Array, cabecera: string | undefined, appSecret: string | undefined): boolean {
  if (!appSecret || !cabecera?.startsWith("sha256=")) return false;
  const recibida = Buffer.from(cabecera.slice("sha256=".length), "hex");
  const esperada = crypto.createHmac("sha256", appSecret).update(cuerpoCrudo).digest();
  return recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
}

export type MensajeEntrante = {
  idMensaje: string;
  /** wa_id de quien escribe. Meta puede omitirlo si la persona usa nombre de usuario. */
  de: string | undefined;
  evento: Evento;
};

type Obj = Record<string, unknown>;
const obj = (v: unknown): Obj | undefined => (v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : undefined);
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const str = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);

/** Saca los mensajes de un webhook. Ignora los avisos de estado (statuses: sent, delivered, read, failed). */
export function extraerMensajes(payload: unknown): MensajeEntrante[] {
  const raiz = obj(payload);
  if (raiz?.object !== "whatsapp_business_account") return [];
  const salida: MensajeEntrante[] = [];
  for (const entrada of arr(raiz.entry)) {
    for (const cambio of arr(obj(entrada)?.changes)) {
      const c = obj(cambio);
      if (c?.field !== "messages") continue;
      for (const m of arr(obj(c.value)?.messages)) {
        const msg = obj(m);
        const idMensaje = str(msg?.id);
        if (!msg || !idMensaje) continue;
        const interactivo = obj(msg.interactive);
        let evento: Evento;
        if (msg.type === "interactive" && interactivo?.type === "list_reply") {
          evento = { tipo: "lista", id: str(obj(interactivo.list_reply)?.id) ?? "" };
        } else if (msg.type === "interactive" && interactivo?.type === "button_reply") {
          evento = { tipo: "boton", id: str(obj(interactivo.button_reply)?.id) ?? "" };
        } else {
          // Texto, audio, imagen…: por ahora todo lo que no es lista o botón muestra el menú. El agente (tarea 4) leerá el texto.
          evento = { tipo: "texto", texto: str(obj(msg.text)?.body) ?? "" };
        }
        salida.push({ idMensaje, de: str(msg.from), evento });
      }
    }
  }
  return salida;
}

/** pey pide un celular de 10 dígitos (^[0-9]{10}$, pey/04). WhatsApp manda el número con la lada del país. */
// TODO(⚪): confirmar con un número mexicano real si llega como 52 + 10 dígitos o como 521 + 10 dígitos.
export function celularParaCodi(waId: string | undefined): string | undefined {
  const d = (waId ?? "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("52")) return d.slice(2);
  if (d.length === 13 && d.startsWith("521")) return d.slice(3);
  return undefined; // fuera de México no hay CoDi
}

/** Cuerpo JSON de POST /{versión}/{phone-number-id}/messages para cada tipo de mensaje del bot. */
export function cuerpoMeta(para: string, m: Mensaje): Obj {
  const base = { messaging_product: "whatsapp", recipient_type: "individual", to: para.startsWith("+") ? para : `+${para}` };
  if (m.tipo === "texto") return { ...base, type: "text", text: { body: m.texto } };
  const pie = m.pie ? { footer: { text: m.pie } } : {};
  if (m.tipo === "lista") {
    const rows = m.renglones.map((r) => ({ id: r.id, title: r.titulo, ...(r.descripcion ? { description: r.descripcion } : {}) }));
    return {
      ...base,
      type: "interactive",
      interactive: { type: "list", body: { text: m.cuerpo }, ...pie, action: { button: m.boton, sections: [{ title: m.seccion, rows }] } },
    };
  }
  const buttons = m.botones.map((b) => ({ type: "reply", reply: { id: b.id, title: b.titulo } }));
  return { ...base, type: "interactive", interactive: { type: "button", body: { text: m.cuerpo }, ...pie, action: { buttons } } };
}

export class ErrorWhatsApp extends Error {}

/** Envía un mensaje. Si Meta no responde 2xx, lanza ErrorWhatsApp con el código HTTP y el código de error de Meta (sin el resto: puede traer datos). */
export async function enviarMensaje(config: Config, para: string, m: Mensaje, fetchImpl: typeof fetch = fetch): Promise<void> {
  if (!config.whatsappToken || !config.whatsappPhoneNumberId) {
    throw new ErrorWhatsApp("faltan WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID");
  }
  const url = `https://graph.facebook.com/${config.graphVersion}/${config.whatsappPhoneNumberId}/messages`;
  const res = await fetchImpl(url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${config.whatsappToken}` },
    body: JSON.stringify(cuerpoMeta(para, m)),
  });
  if (!res.ok) {
    const detalle = obj(await res.json().catch(() => undefined));
    const codigo = obj(detalle?.error)?.code;
    throw new ErrorWhatsApp(`Meta respondió ${res.status}${typeof codigo === "number" ? ` (código ${codigo})` : ""}`);
  }
}

// Webhook de WhatsApp Cloud API: verificación de firma de Meta y normalización de mensajes entrantes.
import crypto from "node:crypto";
import type { Entrada } from "../tipos.ts";

/** Meta firma el cuerpo crudo con el App Secret: header X-Hub-Signature-256 = "sha256=<hex>". */
export function firmaMetaValida(appSecret: string, cuerpoCrudo: Buffer, header: string | undefined): boolean {
  if (!appSecret || !header?.startsWith("sha256=")) return false;
  const esperada = crypto.createHmac("sha256", appSecret).update(cuerpoCrudo).digest();
  const recibida = Buffer.from(header.slice(7), "hex");
  return recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
}

export interface MensajeEntrante {
  idMensaje: string;
  waId: string;
  nombre: string | null;
  entrada: Entrada;
}

/** Estados de entrega fallidos (Meta acepta el envío y avisa después si no se entregó). Solo códigos, sin números completos. */
export function fallosDeEntrega(payload: any): { a: string; codigo: number; titulo: string; detalle: string }[] {
  const salida: { a: string; codigo: number; titulo: string; detalle: string }[] = [];
  for (const entry of payload?.entry ?? [])
    for (const change of entry?.changes ?? [])
      for (const st of change?.value?.statuses ?? [])
        if (st?.status === "failed")
          for (const e of st.errors ?? [{}])
            salida.push({ a: String(st.recipient_id ?? "").slice(-4), codigo: e.code, titulo: e.title ?? e.message ?? "", detalle: e.error_data?.details ?? "" });
  return salida;
}

/** Extrae los mensajes de un payload de Meta. Ignora estados (sent/delivered/read). */
export function extraerMensajes(payload: any): MensajeEntrante[] {
  const salida: MensajeEntrante[] = [];
  for (const entry of payload?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      const value = change?.value;
      if (!value?.messages) continue;
      const nombres = new Map<string, string>();
      for (const c of value.contacts ?? []) if (c?.wa_id) nombres.set(c.wa_id, c?.profile?.name ?? null);
      for (const m of value.messages) {
        // TODO(⚪): Meta puede omitir "from" si la persona usa nombre de usuario; sin número no podemos responder ni cobrar.
        if (!m?.id || !m?.from) continue;
        salida.push({ idMensaje: m.id, waId: String(m.from), nombre: nombres.get(m.from) ?? null, entrada: normalizar(m) });
      }
    }
  }
  return salida;
}

function normalizar(m: any): Entrada {
  if (m.type === "text") return { tipo: "texto", texto: String(m.text?.body ?? "").trim() };
  if (m.type === "interactive") {
    const r = m.interactive?.button_reply ?? m.interactive?.list_reply;
    if (r?.id) return { tipo: "boton", id: String(r.id) };
  }
  // Botones de plantillas (quick reply) llegan como type "button".
  if (m.type === "button" && m.button?.payload) return { tipo: "boton", id: String(m.button.payload) };
  return { tipo: "otro" };
}

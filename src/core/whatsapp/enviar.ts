// Envío de mensajes: WhatsApp Cloud API para usuarios reales y captura en memoria para el chat de pruebas (/dev).
import { config } from "../../config.ts";
import type { Boton, Respuesta, Seccion } from "../tipos.ts";

export type Saliente =
  | { tipo: "texto"; cuerpo: string }
  | { tipo: "botones"; cuerpo: string; botones: Boton[]; encabezado?: string; pie?: string }
  | { tipo: "lista"; cuerpo: string; textoBoton: string; secciones: Seccion[]; encabezado?: string; pie?: string }
  | { tipo: "imagen"; png: Buffer; pie?: string };

// --- Límites de WhatsApp (se recorta para que Meta no rechace el mensaje) ---
const corta = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

function normalizar(m: Saliente): Saliente {
  if (m.tipo === "botones") {
    return {
      ...m,
      cuerpo: corta(m.cuerpo, 1024),
      botones: m.botones.slice(0, 3).map((b) => ({ id: corta(b.id, 256), titulo: corta(b.titulo, 20) })),
      encabezado: m.encabezado && corta(m.encabezado, 60),
      pie: m.pie && corta(m.pie, 60),
    };
  }
  if (m.tipo === "lista") {
    let quedan = 10;
    const secciones = m.secciones
      .map((s) => {
        const filas = s.filas.slice(0, quedan).map((f) => ({
          id: corta(f.id, 200),
          titulo: corta(f.titulo, 24),
          descripcion: f.descripcion && corta(f.descripcion, 72),
        }));
        quedan -= filas.length;
        return { titulo: corta(s.titulo, 24), filas };
      })
      .filter((s) => s.filas.length > 0);
    return { ...m, cuerpo: corta(m.cuerpo, 1024), textoBoton: corta(m.textoBoton, 20), secciones, encabezado: m.encabezado && corta(m.encabezado, 60), pie: m.pie && corta(m.pie, 60) };
  }
  if (m.tipo === "texto") return { ...m, cuerpo: corta(m.cuerpo, 4096) };
  return m;
}

// --- Captura para /dev ---
export interface Capturado {
  n: number;
  en: number;
  mensaje: Exclude<Saliente, { tipo: "imagen" }> | { tipo: "imagen"; dataUrl: string; pie?: string };
}
const buzones = new Map<string, Capturado[]>();
let contador = 0;

export function buzon(waId: string, desde = 0): Capturado[] {
  return (buzones.get(waId) ?? []).filter((c) => c.n > desde);
}

function capturar(waId: string, m: Saliente) {
  const lista = buzones.get(waId) ?? [];
  const mensaje = m.tipo === "imagen" ? { tipo: "imagen" as const, dataUrl: `data:image/png;base64,${m.png.toString("base64")}`, pie: m.pie } : m;
  lista.push({ n: ++contador, en: Date.now(), mensaje });
  buzones.set(waId, lista.slice(-200));
}

export const esUsuarioDev = (waId: string) => waId.startsWith("dev");

// --- WhatsApp Cloud API ---
const graph = (ruta: string) => `https://graph.facebook.com/${config.wa.apiVersion}/${ruta}`;

/** En México WhatsApp entrega "521" + 10 dígitos, pero la API espera "52" + 10 para enviar. */
export function destinoWhatsApp(waId: string): string {
  const m = /^521(\d{10})$/.exec(waId);
  return m ? `52${m[1]}` : waId;
}

async function llamarGraph(ruta: string, init: RequestInit) {
  const res = await fetch(graph(ruta), {
    ...init,
    headers: { Authorization: `Bearer ${config.wa.token}`, ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(15_000),
  });
  const datos: any = await res.json().catch(() => null);
  if (!res.ok) {
    const e = datos?.error;
    throw new Error(`WhatsApp ${res.status} ${e?.code ?? ""} ${e?.message ?? ""}`.trim());
  }
  return datos;
}

async function subirImagen(png: Buffer): Promise<string> {
  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", "image/png");
  form.append("file", new Blob([new Uint8Array(png)], { type: "image/png" }), "cobro.png");
  const r = await llamarGraph(`${config.wa.phoneNumberId}/media`, { method: "POST", body: form });
  return r.id as string;
}

async function enviarCloud(waId: string, m: Saliente) {
  const base = { messaging_product: "whatsapp", recipient_type: "individual", to: destinoWhatsApp(waId) };
  let cuerpo: Record<string, unknown>;
  switch (m.tipo) {
    case "texto":
      cuerpo = { ...base, type: "text", text: { body: m.cuerpo, preview_url: true } };
      break;
    case "botones":
      cuerpo = {
        ...base,
        type: "interactive",
        interactive: {
          type: "button",
          ...(m.encabezado ? { header: { type: "text", text: m.encabezado } } : {}),
          body: { text: m.cuerpo },
          ...(m.pie ? { footer: { text: m.pie } } : {}),
          action: { buttons: m.botones.map((b) => ({ type: "reply", reply: { id: b.id, title: b.titulo } })) },
        },
      };
      break;
    case "lista":
      cuerpo = {
        ...base,
        type: "interactive",
        interactive: {
          type: "list",
          ...(m.encabezado ? { header: { type: "text", text: m.encabezado } } : {}),
          body: { text: m.cuerpo },
          ...(m.pie ? { footer: { text: m.pie } } : {}),
          action: {
            button: m.textoBoton,
            sections: m.secciones.map((s) => ({
              title: s.titulo,
              rows: s.filas.map((f) => ({ id: f.id, title: f.titulo, ...(f.descripcion ? { description: f.descripcion } : {}) })),
            })),
          },
        },
      };
      break;
    case "imagen": {
      const mediaId = await subirImagen(m.png);
      cuerpo = { ...base, type: "image", image: { id: mediaId, ...(m.pie ? { caption: m.pie } : {}) } };
      break;
    }
  }
  await llamarGraph(`${config.wa.phoneNumberId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
}

export async function enviar(waId: string, mensaje: Saliente): Promise<void> {
  const m = normalizar(mensaje);
  if (esUsuarioDev(waId) || !config.wa.token) {
    capturar(waId, m);
    if (!esUsuarioDev(waId)) console.warn("[wa] sin WA_TOKEN: mensaje capturado, no enviado");
    return;
  }
  try {
    await enviarCloud(waId, m);
  } catch (e) {
    console.error("[wa] fallo al enviar", m.tipo, (e as Error).message);
    throw e;
  }
}

export function respuestaPara(waId: string): Respuesta {
  return {
    texto: (cuerpo) => enviar(waId, { tipo: "texto", cuerpo }),
    botones: (cuerpo, botones, o) => enviar(waId, { tipo: "botones", cuerpo, botones, ...o }),
    lista: (cuerpo, textoBoton, secciones, o) => enviar(waId, { tipo: "lista", cuerpo, textoBoton, secciones, ...o }),
    imagen: (png, pie) => enviar(waId, { tipo: "imagen", png, pie }),
  };
}

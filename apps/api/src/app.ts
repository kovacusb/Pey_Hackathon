// Rutas HTTP de la API de peybot.

import crypto from "node:crypto";
import { Hono } from "hono";
import type { Almacen } from "./almacen.ts";
import { ESTADO_INICIAL, responder, type Mensaje, type SolicitudCobro } from "./bot.ts";
import { CATALOGO_DEMO, pesos, type Producto } from "./catalogo.ts";
import type { Config } from "./config.ts";
import { celularParaCodi, enviarMensaje, extraerMensajes, firmaMetaValida, type MensajeEntrante } from "./whatsapp.ts";

/** Crea el cobro y devuelve los mensajes para quien compra. `celular` solo llega cuando el canal es push. */
export type Cobrador = (solicitud: SolicitudCobro, celular: string | undefined) => Promise<Mensaje[]>;

/** Tarea 1: todavía no hay cobro. Lo dice claro y no finge un pago (AGENTS.md §3). La tarea 2 lo cambia por pey. */
export const cobroPendiente: Cobrador = async (solicitud) => [
  {
    tipo: "texto",
    texto: `🛠️ Anoté tu pedido por ${pesos(solicitud.montoCentavos)}. El cobro CoDi con pey se conecta en la siguiente etapa del desarrollo: todavía no se cobró nada.`,
  },
];

export type Dependencias = {
  config: Config;
  almacen: Almacen;
  catalogo?: readonly Producto[];
  cobrar?: Cobrador;
  fetch?: typeof fetch;
  /** Solo IDs y conteos: nunca números de teléfono ni texto de las personas (AGENTS.md §4). */
  log?: (linea: string) => void;
};

function igualSeguro(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function crearApp(dep: Dependencias): Hono {
  const app = new Hono();
  const log = dep.log ?? ((linea: string) => console.log(linea));
  const catalogo = dep.catalogo ?? CATALOGO_DEMO;
  const cobrar = dep.cobrar ?? cobroPendiente;

  app.get("/salud", (c) => c.json({ ok: true }));

  // Verificación del webhook: Meta manda GET con hub.mode=subscribe, hub.verify_token y hub.challenge.
  app.get("/api/whatsapp", (c) => {
    const esperado = dep.config.whatsappVerifyToken;
    const token = c.req.query("hub.verify_token") ?? "";
    const reto = c.req.query("hub.challenge") ?? "";
    if (c.req.query("hub.mode") === "subscribe" && esperado && reto && igualSeguro(token, esperado)) {
      return c.text(reto, 200);
    }
    return c.text("forbidden", 403);
  });

  // Mensajes: la firma se verifica sobre el cuerpo CRUDO antes de parsear. A un evento válido siempre se responde 200,
  // aunque falle el envío, para que Meta no lo reintente y duplique respuestas.
  app.post("/api/whatsapp", async (c) => {
    const crudo = new Uint8Array(await c.req.arrayBuffer());
    if (!firmaMetaValida(crudo, c.req.header("x-hub-signature-256"), dep.config.whatsappAppSecret)) {
      log("whatsapp: firma inválida");
      return c.text("firma inválida", 401);
    }
    let payload: unknown;
    try {
      payload = JSON.parse(Buffer.from(crudo).toString("utf8"));
    } catch {
      return c.text("JSON inválido", 400);
    }
    for (const mensaje of extraerMensajes(payload)) {
      try {
        await atender(mensaje);
      } catch (error) {
        log(`whatsapp: error en ${mensaje.idMensaje}: ${error instanceof Error ? error.message : "desconocido"}`);
      }
    }
    return c.text("ok", 200);
  });

  async function atender(m: MensajeEntrante): Promise<void> {
    if (!(await dep.almacen.marcarProcesado(m.idMensaje))) {
      log(`whatsapp: repetido ${m.idMensaje}`);
      return;
    }
    if (!m.de) {
      // TODO(⚪): Meta omite el número cuando la persona usa nombre de usuario; falta ver cómo responderle (user_id).
      log(`whatsapp: ${m.idMensaje} sin número visible`);
      return;
    }
    const celular = celularParaCodi(m.de);
    const estado = (await dep.almacen.leerEstado(m.de)) ?? ESTADO_INICIAL;
    const r = responder(estado, m.evento, { catalogo, maxMontoCentavos: dep.config.maxMontoCentavos, ultimos4: celular?.slice(-4) });
    await dep.almacen.guardarEstado(m.de, r.estado);
    const mensajes = r.cobro
      ? [...r.mensajes, ...(await cobrar(r.cobro, r.cobro.canal === "push" ? celular : undefined))]
      : r.mensajes;
    for (const salida of mensajes) await enviarMensaje(dep.config, m.de, salida, dep.fetch);
    log(`whatsapp: ${m.idMensaje} → ${mensajes.length} mensaje(s)${r.cobro ? `, cobro ${r.cobro.canal} de ${r.cobro.montoCentavos} centavos` : ""}`);
  }

  return app;
}

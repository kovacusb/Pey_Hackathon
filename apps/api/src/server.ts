// Servidor único de Paga Fácil: un webhook de WhatsApp y un webhook de pey para todos los módulos.
import express from "express";
import { config, waConfigurado } from "./config.ts";
import { procesarMensaje, registrarModulo } from "./core/bot.ts";
import { iniciarPolling, procesarEventoPey } from "./core/cobros.ts";
import { primeraVez } from "./core/db.ts";
import { verificarWebhookPey } from "./core/pey/firma.ts";
import { extraerMensajes, fallosDeEntrega, firmaMetaValida } from "./core/whatsapp/recibir.ts";
import { rutasDev } from "./dev/rutas.ts";
import { rutasPanel } from "./panel/rutas.ts";
import { ayuda } from "./modules/ayuda/index.ts";
import { p2p } from "./modules/p2p/index.ts";
import { servicios } from "./modules/servicios/index.ts";

// El orden define el orden del menú principal.
registrarModulo(servicios);
// Tiendita (src/modules/tienda) fuera del menú por ahora (decisión del 15-nov); el código se conserva.
registrarModulo(p2p);
registrarModulo(ayuda);

const app = express();
app.disable("x-powered-by");
const crudo = express.raw({ type: "*/*", limit: "1mb" });

app.get("/", (_req, res) => {
  res.type("text/plain").send("Paga Fácil · ok");
});

app.get("/salud", (_req, res) => {
  res.json({
    ok: true,
    pey: Boolean(config.pey.apiKey),
    peyWebhook: Boolean(config.pey.webhookSecret),
    whatsapp: waConfigurado(),
    devTools: config.devTools,
  });
});

// ---------- WhatsApp Cloud API ----------
app.get("/api/whatsapp", (req, res) => {
  const ok = req.query["hub.mode"] === "subscribe" && config.wa.verifyToken && req.query["hub.verify_token"] === config.wa.verifyToken;
  if (ok) {
    res.type("text/plain").send(String(req.query["hub.challenge"] ?? ""));
    return;
  }
  res.sendStatus(403);
});

app.post("/api/whatsapp", crudo, (req, res) => {
  const cuerpo = req.body as Buffer;
  if (config.wa.appSecret) {
    if (!firmaMetaValida(config.wa.appSecret, cuerpo, req.get("x-hub-signature-256"))) {
      console.warn("[wa] firma inválida");
      res.sendStatus(401);
      return;
    }
  } else if (process.env.NODE_ENV === "production") {
    res.sendStatus(500); // sin App Secret no aceptamos mensajes en producción
    return;
  }
  res.sendStatus(200); // Meta reintenta si no respondemos rápido: procesamos después
  let payload: unknown;
  try {
    payload = JSON.parse(cuerpo.toString("utf8"));
  } catch {
    return;
  }
  for (const f of fallosDeEntrega(payload)) console.warn("[wa] no se entregó", { a: `••${f.a}`, codigo: f.codigo, titulo: f.titulo, detalle: f.detalle });
  for (const m of extraerMensajes(payload)) {
    if (!primeraVez("wa", m.idMensaje)) continue;
    void procesarMensaje(m.waId, m.nombre, m.entrada);
  }
});

// ---------- pey (Standard Webhooks) ----------
app.post("/api/webhook-pey", crudo, async (req, res) => {
  const cuerpo = (req.body as Buffer).toString("utf8");
  const id = req.get("webhook-id");
  const firma = verificarWebhookPey(
    config.pey.webhookSecret,
    { id, timestamp: req.get("webhook-timestamp"), firma: req.get("webhook-signature") },
    cuerpo,
  );
  if (!firma.valida) {
    console.warn("[pey] webhook rechazado", { motivo: firma.motivo });
    res.sendStatus(401);
    return;
  }
  let evento: any;
  try {
    evento = JSON.parse(cuerpo);
  } catch {
    res.sendStatus(400);
    return;
  }
  if (!primeraVez("pey", id!)) {
    res.sendStatus(200);
    return;
  }
  try {
    const resultado = await procesarEventoPey(evento);
    console.log("[pey] webhook", { webhookId: id, type: evento?.type, transactionId: evento?.transactionId, resultado });
    res.sendStatus(200);
  } catch (e) {
    console.error("[pey] error procesando webhook", (e as Error).message);
    res.sendStatus(500);
  }
});

if (config.devTools) app.use("/dev", rutasDev());
app.use("/panel", rutasPanel());

iniciarPolling();

// Despertador: en Render gratis el servicio se duerme tras ~15 min sin tráfico entrante. Visitar su propia URL
// pública cada 10 min cuenta como tráfico y lo mantiene despierto. Render define RENDER_EXTERNAL_URL solo.
const urlPublica = process.env.KEEPALIVE_URL || process.env.RENDER_EXTERNAL_URL;
if (urlPublica) {
  setInterval(() => {
    fetch(`${urlPublica.replace(/\/$/, "")}/salud`, { signal: AbortSignal.timeout(10_000) }).catch(() => {});
  }, 10 * 60_000).unref();
}

app.listen(config.port, () => {
  console.log(`Paga Fácil escuchando en :${config.port}`);
  console.log(`  pey: ${config.pey.apiKey ? "llave cargada" : "SIN LLAVE"} · webhook pey: ${config.pey.webhookSecret ? "con secreto" : "sin secreto (solo polling)"}`);
  console.log(`  WhatsApp: ${waConfigurado() ? "configurado" : "sin configurar (solo /dev)"} · tope por cobro: $${config.maxCobroCentavos / 100}`);
  if (config.devTools) console.log(`  Chat de pruebas: http://localhost:${config.port}/dev`);
  console.log(`  Panel del negocio: http://localhost:${config.port}/panel/`);
});

// Servidor único de Paga Fácil: un webhook de WhatsApp y un webhook de pey para todos los módulos.
import express from "express";
import { config, waConfigurado } from "./config.ts";
import { procesarMensaje, registrarModulo } from "./core/bot.ts";
import { iniciarPolling, procesarEventoPey } from "./core/cobros.ts";
import { primeraVez } from "./core/db.ts";
import { verificarWebhookPey } from "./core/pey/firma.ts";
import { extraerMensajes, firmaMetaValida } from "./core/whatsapp/recibir.ts";
import { rutasDev } from "./dev/rutas.ts";
import { tienda } from "./modules/tienda/index.ts";
import { rutasPanel } from "./modules/tienda/panel.ts";

// Rama negocio-independiente: solo el bot del negocio, separado de servicios, recargas y ayuda.
// Con un solo módulo, el bot saluda directo con la tienda (core/bot.ts).
registrarModulo(tienda);

const app = express();
app.disable("x-powered-by");
const crudo = express.raw({ type: "*/*", limit: "1mb" });

app.get("/", (_req, res) => {
  if (config.devTools) {
    res.redirect("/panel");
    return;
  }
  res.type("text/plain").send("Paga Fácil · Negocio independiente · ok");
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
// Panel web del comercio (Módulo 2): maneja el bot y ve pedidos y pagos. Sin inicio de sesión todavía: solo con DEV_TOOLS.
if (config.devTools) app.use("/panel", rutasPanel());

iniciarPolling();
app.listen(config.port, () => {
  console.log(`Paga Fácil escuchando en :${config.port}`);
  console.log(`  pey: ${config.pey.apiKey ? "llave cargada" : "SIN LLAVE"} · webhook pey: ${config.pey.webhookSecret ? "con secreto" : "sin secreto (solo polling)"}`);
  console.log(`  WhatsApp: ${waConfigurado() ? "configurado" : "sin configurar (solo /dev)"} · tope por cobro: $${config.maxCobroCentavos / 100}`);
  if (config.devTools) console.log(`  Chat de pruebas: http://localhost:${config.port}/dev · Panel del negocio: http://localhost:${config.port}/panel`);
});

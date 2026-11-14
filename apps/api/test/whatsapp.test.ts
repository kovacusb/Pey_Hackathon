import assert from "node:assert/strict";
import crypto from "node:crypto";
import { test } from "node:test";
import type { Hono } from "hono";
import { AlmacenMemoria } from "../src/almacen.ts";
import { crearApp } from "../src/app.ts";
import { leerConfig } from "../src/config.ts";
import { celularParaCodi, extraerMensajes } from "../src/whatsapp.ts";

// Todo es ficticio: secreto, token y número (AGENTS.md §4).
const SECRETO = "secreto-de-prueba";
const config = leerConfig({
  WHATSAPP_TOKEN: "token-de-prueba",
  WHATSAPP_PHONE_NUMBER_ID: "123",
  WHATSAPP_APP_SECRET: SECRETO,
  WHATSAPP_VERIFY_TOKEN: "verifica-prueba",
  MAX_MONTO_MXN: "1",
});
const WA = "5215500000000";

type Enviado = { url: string; cuerpo: any };

function preparar(respuestaMeta = 200) {
  const enviados: Enviado[] = [];
  const bitacora: string[] = [];
  const fetchFalso: typeof fetch = async (url, init) => {
    enviados.push({ url: String(url), cuerpo: JSON.parse(String(init?.body)) });
    return new Response(JSON.stringify(respuestaMeta === 200 ? {} : { error: { code: 131030 } }), { status: respuestaMeta });
  };
  const app = crearApp({ config, almacen: new AlmacenMemoria(), fetch: fetchFalso, log: (l) => bitacora.push(l) });
  return { app, enviados, bitacora };
}

function webhook(id: string, mensaje: object): string {
  return JSON.stringify({
    object: "whatsapp_business_account",
    entry: [{ id: "0", changes: [{ field: "messages", value: {
      messaging_product: "whatsapp",
      metadata: { display_phone_number: "15550000000", phone_number_id: "123" },
      contacts: [{ profile: { name: "Persona de prueba" }, wa_id: WA }],
      messages: [{ from: WA, id, timestamp: "1794000000", ...mensaje }],
    } }] }],
  });
}

const firmar = (cuerpo: string, secreto = SECRETO) => `sha256=${crypto.createHmac("sha256", secreto).update(cuerpo).digest("hex")}`;

async function postear(app: Hono, cuerpo: string, firma: string | null = firmar(cuerpo)) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (firma) headers["x-hub-signature-256"] = firma;
  return app.request("/api/whatsapp", { method: "POST", headers, body: cuerpo });
}

test("verificación del webhook: responde el reto solo con el token correcto", async () => {
  const { app } = preparar();
  const ok = await app.request("/api/whatsapp?hub.mode=subscribe&hub.verify_token=verifica-prueba&hub.challenge=reto123");
  assert.equal(ok.status, 200);
  assert.equal(await ok.text(), "reto123");
  const mal = await app.request("/api/whatsapp?hub.mode=subscribe&hub.verify_token=otro&hub.challenge=reto123");
  assert.equal(mal.status, 403);
  const sinModo = await app.request("/api/whatsapp?hub.verify_token=verifica-prueba&hub.challenge=reto123");
  assert.equal(sinModo.status, 403);
});

test("firma: sin firma 401, firma ajena 401, JSON inválido 400, válida 200", async () => {
  const { app, enviados } = preparar();
  const cuerpo = webhook("wamid.1", { type: "text", text: { body: "hola" } });
  assert.equal((await postear(app, cuerpo, null)).status, 401);
  assert.equal((await postear(app, cuerpo, firmar(cuerpo, "otro-secreto"))).status, 401);
  assert.equal((await postear(app, "{no es json")).status, 400);
  assert.equal(enviados.length, 0);
  assert.equal((await postear(app, cuerpo)).status, 200);
  assert.equal(enviados.length, 1);
});

test("«hola» responde con la lista de productos a la URL de la Graph API", async () => {
  const { app, enviados } = preparar();
  await postear(app, webhook("wamid.2", { type: "text", text: { body: "hola" } }));
  assert.equal(enviados[0]?.url, "https://graph.facebook.com/v27.0/123/messages");
  const c = enviados[0]?.cuerpo;
  assert.equal(c.messaging_product, "whatsapp");
  assert.equal(c.to, `+${WA}`);
  assert.equal(c.interactive.type, "list");
  assert.ok(c.interactive.action.sections[0].rows.length <= 10);
});

test("flujo completo: producto → Pagar → A mi número; todavía no se cobra y lo dice", async () => {
  const { app, enviados, bitacora } = preparar();
  await postear(app, webhook("wamid.3", { type: "interactive", interactive: { type: "list_reply", list_reply: { id: "prod:chicle", title: "Chicle" } } }));
  await postear(app, webhook("wamid.4", { type: "interactive", interactive: { type: "button_reply", button_reply: { id: "pagar", title: "Pagar" } } }));
  const pagar = enviados[1]?.cuerpo;
  assert.deepEqual(pagar.interactive.action.buttons.map((b: any) => b.reply.id), ["push", "qr", "cancelar"]);
  assert.match(pagar.interactive.body.text, /0000/); // últimos 4 dígitos del número ficticio
  await postear(app, webhook("wamid.5", { type: "interactive", interactive: { type: "button_reply", button_reply: { id: "push", title: "A mi número" } } }));
  assert.match(enviados[2]?.cuerpo.text.body, /todavía no se cobró nada/);
  assert.ok(bitacora.some((l) => l.includes("cobro push de 10 centavos")));
  assert.ok(!bitacora.some((l) => l.includes(WA)), "la bitácora no debe llevar el número");
});

test("un mensaje repetido (Meta reintenta) se atiende una sola vez", async () => {
  const { app, enviados } = preparar();
  const cuerpo = webhook("wamid.6", { type: "text", text: { body: "hola" } });
  assert.equal((await postear(app, cuerpo)).status, 200);
  assert.equal((await postear(app, cuerpo)).status, 200);
  assert.equal(enviados.length, 1);
});

test("los avisos de estado (statuses) no generan respuestas", async () => {
  const { app, enviados } = preparar();
  const cuerpo = JSON.stringify({ object: "whatsapp_business_account", entry: [{ id: "0", changes: [{ field: "messages", value: {
    messaging_product: "whatsapp", metadata: { phone_number_id: "123" },
    statuses: [{ id: "wamid.x", status: "delivered", timestamp: "1794000000", recipient_id: WA }],
  } }] }] });
  assert.equal((await postear(app, cuerpo)).status, 200);
  assert.equal(enviados.length, 0);
});

test("si Meta rechaza el envío, igual se responde 200 y se registra solo el código", async () => {
  const { app, bitacora } = preparar(400);
  const r = await postear(app, webhook("wamid.7", { type: "text", text: { body: "hola" } }));
  assert.equal(r.status, 200);
  assert.ok(bitacora.some((l) => l.includes("Meta respondió 400 (código 131030)")));
});

test("celular para CoDi: 10 dígitos desde el número de WhatsApp", () => {
  assert.equal(celularParaCodi("5215512345678"), "5512345678");
  assert.equal(celularParaCodi("525512345678"), "5512345678");
  assert.equal(celularParaCodi("16505551234"), undefined);
  assert.equal(celularParaCodi(undefined), undefined);
});

test("extraerMensajes ignora lo que no es de WhatsApp Business", () => {
  assert.deepEqual(extraerMensajes({ object: "page", entry: [] }), []);
  assert.deepEqual(extraerMensajes(null), []);
});

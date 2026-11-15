// Deja listo un número real de WhatsApp (producción) después de agregarlo en Meta (Paso 2):
//   1) lo registra en la Cloud API con un PIN de 6 dígitos (verificación en dos pasos),
//   2) suscribe nuestra app a su cuenta de WhatsApp (para recibir los mensajes en el webhook),
//   3) pone el perfil: foto (logo), «acerca de», descripción, categoría y sitios.
// Uso: node scripts/numero-real.mjs <PHONE_NUMBER_ID> <WABA_ID>
// Lee WHATSAPP_TOKEN y WHATSAPP_GRAPH_VERSION de ../../.env; guarda WHATSAPP_PIN ahí si no existe. No imprime secretos.
// TODO(⚪): rutas y campos de Meta escritos de memoria (register, subscribed_apps, whatsapp_business_profile,
// subida reanudable /{app-id}/uploads); no se verificaron contra la documentación el 15-nov. El script reporta cada respuesta.
import { randomInt } from "node:crypto";
import { appendFileSync, readFileSync } from "node:fs";

const [telId, wabaId] = process.argv.slice(2);
if (!/^\d+$/.test(telId ?? "") || !/^\d+$/.test(wabaId ?? "")) {
  console.error("Uso: node scripts/numero-real.mjs <PHONE_NUMBER_ID> <WABA_ID>");
  process.exit(1);
}
const RAIZ = new URL("../../../", import.meta.url).pathname;
const ENV = RAIZ + ".env";
const env = Object.fromEntries(readFileSync(ENV, "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]));
const TOKEN = env.WHATSAPP_TOKEN;
const G = `https://graph.facebook.com/${env.WHATSAPP_GRAPH_VERSION || "v25.0"}`;
if (!TOKEN) throw new Error("Falta WHATSAPP_TOKEN en .env");

async function graph(metodo, ruta, cuerpo, extraHeaders = {}) {
  const r = await fetch(G + ruta, {
    method: metodo,
    headers: { authorization: `Bearer ${TOKEN}`, ...(cuerpo && !(cuerpo instanceof Uint8Array) ? { "content-type": "application/json" } : {}), ...extraHeaders },
    body: cuerpo instanceof Uint8Array ? cuerpo : cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const datos = await r.json().catch(() => ({}));
  return { ok: r.ok, datos };
}
const informe = (paso, r) => console.log(`${r.ok ? "✓" : "✗"} ${paso}${r.ok ? "" : ` → ${r.datos?.error?.message ?? JSON.stringify(r.datos).slice(0, 200)}`}`);

// 0) Qué número es
const info = await graph("GET", `/${telId}?fields=display_phone_number,verified_name,name_status,code_verification_status,quality_rating`);
informe("leer el número", info);
if (info.ok) console.log(`   ${info.datos.display_phone_number} · nombre: ${info.datos.verified_name} (${info.datos.name_status}) · verificación: ${info.datos.code_verification_status}`);

// 1) Registro con PIN
let pin = env.WHATSAPP_PIN;
if (!/^\d{6}$/.test(pin ?? "")) {
  pin = String(randomInt(0, 1_000_000)).padStart(6, "0");
  appendFileSync(ENV, `\nWHATSAPP_PIN=${pin}\n`);
  console.log("   PIN nuevo guardado en .env (WHATSAPP_PIN)");
}
informe("registrar el número en la Cloud API", await graph("POST", `/${telId}/register`, { messaging_product: "whatsapp", pin }));

// 2) Suscribir la app a la cuenta de WhatsApp
informe("suscribir la app a la cuenta de WhatsApp", await graph("POST", `/${wabaId}/subscribed_apps`));

// 3) Perfil: foto (subida reanudable) + textos
const appId = (await graph("GET", `/debug_token?input_token=${TOKEN}`)).datos?.data?.app_id;
let handle = null;
if (appId) {
  const png = new Uint8Array(readFileSync(new URL("../public/marca/logo-640.png", import.meta.url)));
  const sesion = await graph("POST", `/${appId}/uploads?file_name=paga-facil.png&file_length=${png.length}&file_type=image/png`);
  if (sesion.ok) {
    const r = await fetch(`${G}/${sesion.datos.id}`, { method: "POST", headers: { authorization: `OAuth ${TOKEN}`, file_offset: "0" }, body: png });
    handle = (await r.json().catch(() => ({}))).h ?? null;
  }
}
console.log(`${handle ? "✓" : "✗"} subir el logo${handle ? "" : " (se puede poner a mano en WhatsApp Manager)"}`);
informe("actualizar el perfil", await graph("POST", `/${telId}/whatsapp_business_profile`, {
  messaging_product: "whatsapp",
  about: "Cobra y paga con CoDi desde WhatsApp: sin apps y sin comisiones.",
  description: "Paga Fácil te ayuda a cobrar al momento con CoDi, el cobro digital del Banco de México: escribe el monto, tu cliente autoriza en la app de su banco y recibes el comprobante aquí mismo, con factura si la pide. También aprende a usar CoDi con guías en video. Proyecto independiente para el Hackatón México 2026: no es un producto de pey ni de Banxico.",
  vertical: "FINANCE",
  websites: ["https://paga-facil.onrender.com/privacidad", "https://github.com/kovacusb/Pey_Hackathon"],
  ...(handle ? { profile_picture_handle: handle } : {}),
}));

console.log(`\nSiguiente: en Render cambia WHATSAPP_PHONE_NUMBER_ID=${telId} y despliega. Después escribe «hola» al número nuevo desde cualquier celular.`);

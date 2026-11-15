// Aprende CoDi: cada guía manda su mini video (public/videos) con el texto como pie y luego los botones.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.WHATSAPP_TOKEN = "";

let bot: typeof import("../src/core/bot.ts");
let enviar: typeof import("../src/core/whatsapp/enviar.ts");
let GUIAS: typeof import("../src/modules/ayuda/contenido.ts")["GUIAS"];
const PUBLICO = new URL("../public/", import.meta.url).pathname;

before(async () => {
  bot = await import("../src/core/bot.ts");
  enviar = await import("../src/core/whatsapp/enviar.ts");
  GUIAS = (await import("../src/modules/ayuda/contenido.ts")).GUIAS;
  bot.registrarModulo((await import("../src/modules/ayuda/index.ts")).ayuda);
});

test("cada guía tiene su video en public/videos", () => {
  for (const g of GUIAS) {
    assert.ok(g.video_url && enviar.rutaDeVideoValida(g.video_url), `ruta de ${g.id}`);
    assert.ok(existsSync(PUBLICO + g.video_url!.slice(1)), `falta el archivo de ${g.id}`);
  }
});

test("abrir una guía manda el video con la guía como pie y después los botones", async () => {
  const wa = "dev5500000201";
  await bot.procesarMensaje(wa, null, { tipo: "boton", id: "ayuda:g:pagar-qr" });
  const [video, botones] = enviar.buzon(wa).slice(-2).map((c) => c.mensaje as any);
  assert.equal(video.tipo, "video");
  assert.equal(video.url, "/videos/pagar-qr.mp4");
  assert.match(video.pie, /Pagar con QR/);
  assert.ok(video.pie.length <= 1024, "WhatsApp limita el pie a 1024 caracteres");
  assert.equal(botones.tipo, "botones");
  assert.ok(botones.botones.some((b: any) => b.id === "ayuda:temas"));
});

test("las rutas de video no pueden salir de /videos", () => {
  assert.equal(enviar.rutaDeVideoValida("/videos/que-es.mp4"), true);
  for (const mala of ["/videos/../../.env", "/etc/passwd", "/videos/a b.mp4", "videos/x.mp4", "/videos/x.mov"]) {
    assert.equal(enviar.rutaDeVideoValida(mala), false, mala);
  }
});

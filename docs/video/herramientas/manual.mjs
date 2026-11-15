// Manual de uso en video (documentación): docs/manual/manual-paga-facil.html (autocontenido) y .mp4 (1080p).
// Usa las conversaciones reales del bot (docs/video/conversaciones) y la voz de Marlene.
// Uso: node manual.mjs [--solo-html]
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import ffmpeg from "ffmpeg-static";
import { duracion, mezclar, narrar } from "./voz.mjs";

const VIDEO = new URL("../", import.meta.url).pathname;
const H = new URL("./", import.meta.url).pathname;
const SAL = VIDEO + "salida/manual/";
const DOCS = new URL("../../manual/", import.meta.url).pathname;
mkdirSync(SAL + "audio", { recursive: true });
mkdirSync(DOCS, { recursive: true });
const leer = (r) => JSON.parse(readFileSync(VIDEO + r, "utf8"));

// ---------- Voz y línea de tiempo ----------
const { escenas: guion } = leer("manual/narracion.json");
const ENTRADA = 0.35, COLCHON = 1.1;
const MIN = { m02: 9, m03: 12, m04: 9, m06: 15, m11: 8, m12: 11 };
let t = 0;
const escenas = [], clips = [];
for (const [i, g] of guion.entries()) {
  const archivo = await narrar(g.texto, `${SAL}audio/${g.id}.mp3`, { previo: guion[i - 1]?.texto, siguiente: guion[i + 1]?.texto });
  const d = duracion(archivo);
  const dur = Math.max(ENTRADA + d + COLCHON, MIN[g.id] ?? 0);
  escenas.push({ id: g.id, inicio: Number(t.toFixed(3)), dur: Number(dur.toFixed(3)), voz: Number((t + ENTRADA).toFixed(3)) });
  clips.push({ archivo, inicio: t + ENTRADA });
  t += dur;
}
const TOTAL = t;

// ---------- Chats (conversaciones reales) ----------
const conv = (n) => leer(`conversaciones/${n}`).pasos;
const sinBanco = (pasos) => pasos.filter((p) => p.de !== "banco");
const c02 = conv("02-cobro-rapido-push-y-factura.json");
const iBanco = c02.findIndex((p) => p.de === "banco");
const iRecibo = c02.findIndex((p) => p.de === "bot" && /Cobro recibido/.test(p.mensaje.cuerpo ?? ""));
const chats = {
  c01: { pasos: conv("01-menu.json"), inicio: 0.8, colchon: 3 },
  c02a: { pasos: c02.slice(0, iBanco), inicio: 0.5, colchon: 1.2 },
  c02b: (() => { const previos = c02.slice(iBanco - 3, iBanco); return { pasos: [...previos, c02[iRecibo]], tiempos: [...previos.map(() => -5), 3.2] }; })(),
  c02c: { pasos: c02.slice(iRecibo + 1), inicio: 0.6, colchon: 1.4 },
  c03: { pasos: sinBanco(conv("03-cobro-rapido-qr.json")), inicio: 0.5, colchon: 1.0 },
  c04: { pasos: sinBanco(conv("04-servicios-cfe.json")), inicio: 0.5, colchon: 1.0 },
  c05: { pasos: conv("05-recarga.json"), inicio: 0.5, colchon: 1.0 },
  c06: { pasos: conv("06-aprende-codi.json"), inicio: 0.6, colchon: 1.5 },
  c08: { pasos: conv("08-mis-pagos.json"), inicio: 0.6, colchon: 1.5 },
};

// ---------- Audio y página ----------
const audio = mezclar({ clips, total: TOTAL, salida: `${SAL}mezcla.m4a`, musica: 0.06 });
const html = readFileSync(H + "plantilla-manual.html", "utf8")
  .replace("/*__DATOS__*/null", JSON.stringify({ escenas, chats }))
  .replace("__AUDIO__", `data:audio/mp4;base64,${readFileSync(audio).toString("base64")}`)
  .replace("__FACTURA__", `data:image/png;base64,${readFileSync(VIDEO + "capturas/factura-ejemplo.png").toString("base64")}`);
writeFileSync(DOCS + "manual-paga-facil.html", html);
writeFileSync(SAL + "linea-de-tiempo.json", JSON.stringify(escenas, null, 2));
console.log(`Manual: ${TOTAL.toFixed(1)} s · ${escenas.length} escenas`);
if (process.argv.includes("--solo-html")) process.exit(0);

// ---------- Render 1080p ----------
const FPS = 30;
const navegador = await chromium.launch({ channel: "chrome" });
const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 } });
await pagina.goto(`file://${DOCS}manual-paga-facil.html?render=1`);
await pagina.evaluate(() => window.listo);
const ff = spawn(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-i", audio,
  "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  "-c:a", "aac", "-b:a", "160k", "-t", TOTAL.toFixed(3), DOCS + "manual-paga-facil.mp4"], { stdio: ["pipe", "inherit", "inherit"] });
ff.stdin.on("error", (e) => { if (e.code !== "EPIPE") throw e; });
for (let f = 0; f < Math.ceil(TOTAL * FPS); f++) {
  await pagina.evaluate((s) => window.irA(s), f / FPS);
  const png = await pagina.screenshot({ type: "png" });
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await navegador.close();
console.log("→ docs/manual/manual-paga-facil.mp4");

// Mini videos de las guías de Aprende CoDi → apps/api/public/videos/<id>.mp4 (vertical 720×1280, voz de Marlene).
// Cada punto de la guía tiene su propio clip de voz, así el punto aparece justo cuando se dice.
// Uso: node guias.mjs [id ...]        (sin ids: todas)    · --solo-html para no renderizar
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import ffmpeg from "ffmpeg-static";
import { duracion, mezclar, narrar } from "./voz.mjs";

const VIDEO = new URL("../", import.meta.url).pathname;
const H = new URL("./", import.meta.url).pathname;
const SAL = VIDEO + "salida/guias/";
const PUBLICO = new URL("../../../apps/api/public/videos/", import.meta.url).pathname;
mkdirSync(SAL + "audio", { recursive: true });
mkdirSync(PUBLICO, { recursive: true });

const { guias } = JSON.parse(readFileSync(VIDEO + "guias/guias.json", "utf8"));
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const soloHtml = process.argv.includes("--solo-html");
const elegidas = args.length ? guias.filter((g) => args.includes(g.id)) : guias;
const FPS = 30, PAUSA = 0.28, ENTRADA = 0.55, COLA = 1.1;

const navegador = soloHtml ? null : await chromium.launch({ channel: "chrome" });

for (const g of elegidas) {
  // 1) Voz: intro + un clip por punto, con continuidad de entonación.
  const textos = [g.intro, ...g.puntos.map((p) => p.voz)];
  const clips = [];
  let t = ENTRADA;
  for (const [i, texto] of textos.entries()) {
    const archivo = await narrar(texto, `${SAL}audio/${g.id}-${i}.mp3`, { previo: textos[i - 1], siguiente: textos[i + 1] });
    const d = duracion(archivo);
    clips.push({ archivo, inicio: Number(t.toFixed(3)), dur: d });
    t += d + PAUSA;
  }
  const total = Number((t - PAUSA + COLA).toFixed(3));

  // 2) Audio y página.
  const audio = mezclar({ clips, total, salida: `${SAL}${g.id}.m4a`, musica: 0.05 });
  const datos = { emoji: g.emoji, titulo: g.titulo, total, puntos: g.puntos.map((p, i) => ({ pantalla: p.pantalla, inicio: clips[i + 1].inicio - 0.1 })) };
  const html = readFileSync(H + "plantilla-guia.html", "utf8").replace("/*__DATOS__*/null", JSON.stringify(datos));
  writeFileSync(`${SAL}${g.id}.html`, html);
  if (soloHtml) { console.log(`${g.id}: ${total.toFixed(1)} s (solo HTML)`); continue; }

  // 3) Render: cuadros 1080×1920 → ffmpeg escala a 720×1280 (ligero para WhatsApp, límite 16 MB).
  const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1920 } });
  await pagina.goto(`file://${SAL}${g.id}.html?render=1`);
  await pagina.evaluate(() => window.listo);
  const salida = `${PUBLICO}${g.id}.mp4`;
  const ff = spawn(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-", "-i", audio,
    "-vf", "scale=720:1280:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "128k", "-t", String(total), salida], { stdio: ["pipe", "inherit", "inherit"] });
  ff.stdin.on("error", (e) => { if (e.code !== "EPIPE") throw e; });
  const cuadros = Math.ceil(total * FPS);
  for (let f = 0; f < cuadros; f++) {
    await pagina.evaluate((s) => window.irA(s), f / FPS);
    const png = await pagina.screenshot({ type: "png" });
    if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  await pagina.close();
  console.log(`${g.id}: ${total.toFixed(1)} s → apps/api/public/videos/${g.id}.mp4`);
}
await navegador?.close();

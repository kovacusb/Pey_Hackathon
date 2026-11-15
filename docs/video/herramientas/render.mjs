// Render del video a MP4: Playwright (Chrome instalado) toma cada cuadro con irA(t) y ffmpeg lo codifica con la mezcla de audio.
// Uso: node render.mjs [fps=30]   → docs/video/paga-facil.mp4
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const VIDEO = new URL("../", import.meta.url).pathname;
const FPS = Number(process.argv[2] ?? 30);
const navegador = await chromium.launch({ channel: "chrome" });
const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await pagina.goto("file://" + VIDEO + "paga-facil-video.html?render=1");
await pagina.evaluate(() => window.listo);
const total = await pagina.evaluate(() => window.TOTAL);
const cuadros = Math.ceil(total * FPS);

const ff = spawn(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error",
  "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
  "-i", VIDEO + "salida/mezcla.m4a",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  "-c:a", "aac", "-b:a", "192k", "-shortest", VIDEO + "paga-facil.mp4"], { stdio: ["pipe", "inherit", "inherit"] });

const inicio = Date.now();
for (let f = 0; f < cuadros; f++) {
  await pagina.evaluate((t) => window.irA(t), f / FPS);
  const png = await pagina.screenshot({ type: "png" });
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % (FPS * 10) === 0) console.log(`${(f / FPS).toFixed(0)} s / ${total.toFixed(0)} s · ${((Date.now() - inicio) / 1000).toFixed(0)} s transcurridos`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await navegador.close();
console.log(`Listo: ${cuadros} cuadros en ${((Date.now() - inicio) / 60000).toFixed(1)} min → docs/video/paga-facil.mp4`);

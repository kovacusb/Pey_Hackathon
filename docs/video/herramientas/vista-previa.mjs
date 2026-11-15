// Capturas de prueba: un cuadro por escena (o los segundos que pases) para revisar el diseño antes de renderizar.
// Uso: node vista-previa.mjs <carpeta-salida> [segundo1 segundo2 ...]
import { chromium } from "playwright-core";
import { mkdirSync, readFileSync } from "node:fs";

const VIDEO = new URL("../", import.meta.url).pathname;
const salida = process.argv[2];
mkdirSync(salida, { recursive: true });
const escenas = JSON.parse(readFileSync(VIDEO + "salida/linea-de-tiempo.json", "utf8"));
const tiempos = process.argv.slice(3).length ? process.argv.slice(3).map(Number) : escenas.map((e) => e.inicio + e.dur * 0.72);

const navegador = await chromium.launch({ channel: "chrome" });
const pagina = await navegador.newPage({ viewport: { width: 1920, height: 1080 } });
const errores = [];
pagina.on("pageerror", (e) => errores.push(e.message));
pagina.on("console", (m) => m.type() === "error" && errores.push(m.text()));
await pagina.goto("file://" + VIDEO + "paga-facil-video.html?render=1");
await pagina.evaluate(() => window.listo);
for (const t of tiempos) {
  await pagina.evaluate((s) => window.irA(s), t);
  await pagina.screenshot({ path: `${salida}/t${String(t.toFixed(1)).padStart(6, "0")}.png` });
}
console.log(`${tiempos.length} capturas · errores en la página: ${errores.length ? errores.join(" | ") : "ninguno"}`);
await navegador.close();

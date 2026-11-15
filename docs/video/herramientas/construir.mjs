// Arma el video: línea de tiempo desde la duración de cada narración, mezcla de audio (voz + música con ducking)
// y la página docs/video/paga-facil-video.html autocontenida (audio, factura y conversaciones incrustados).
// Uso: node docs/video/herramientas/construir.mjs   (antes: narrar.mjs)
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const VIDEO = new URL("../", import.meta.url).pathname;
const H = new URL("./", import.meta.url).pathname;
const leer = (r) => JSON.parse(readFileSync(VIDEO + r, "utf8"));

const { escenas: guion } = leer("narracion.json");
const dur = leer("salida/duraciones.json");

// ---------- Línea de tiempo ----------
const ENTRADA_VOZ = 0.35; // la voz empieza un poco después de que aparece la escena
const COLCHON = 1.1; // aire al final de cada escena
const MIN = { e04: 9.5, e06: 7.5, e07: 10, e08: 15, e12: 11 }; // mínimos para que la animación respire
let t = 0;
const escenas = guion.map((g) => {
  const d = Math.max(ENTRADA_VOZ + dur[g.id] + COLCHON, MIN[g.id] ?? 0);
  const e = { id: g.id, inicio: Number(t.toFixed(3)), dur: Number(d.toFixed(3)), voz: Number((t + ENTRADA_VOZ).toFixed(3)) };
  t += d;
  return e;
});
const TOTAL = t;

// ---------- Chats ----------
const c02 = leer("conversaciones/02-cobro-rapido-push-y-factura.json").pasos;
const sinBanco = (pasos) => pasos.filter((p) => p.de !== "banco");
const idxRecibo = c02.findIndex((p) => p.de === "bot" && /Cobro recibido/.test(p.mensaje.cuerpo ?? ""));
const idxBanco = c02.findIndex((p) => p.de === "banco");
const chats = {
  c02a: { pasos: c02.slice(0, idxBanco), inicio: 0.5, colchon: 1.2 },
  // Contexto ya visible y el comprobante entra cuando el panel cambia a «Pagado».
  c02b: (() => {
    const previos = c02.slice(idxBanco - 4, idxBanco);
    return { pasos: [...previos, c02[idxRecibo]], tiempos: [...previos.map(() => -5), 3.2] };
  })(),
  c02c: { pasos: c02.slice(idxRecibo + 1), inicio: 0.6, colchon: 1.4 },
  c03: { pasos: sinBanco(leer("conversaciones/03-cobro-rapido-qr.json").pasos), inicio: 0.5, colchon: 1.0 },
  c04: { pasos: sinBanco(leer("conversaciones/04-servicios-cfe.json").pasos), inicio: 0.5, colchon: 1.0 },
  c06: { pasos: leer("conversaciones/06-aprende-codi.json").pasos, inicio: 0.6, colchon: 1.5 },
};

// ---------- Audio: voz + música suave con ducking ----------
const SAL = VIDEO + "salida/";
const entradas = [];
const filtros = [];
escenas.forEach((e, i) => {
  entradas.push("-i", `${SAL}audio/${e.id}.mp3`);
  const ms = Math.round(e.voz * 1000);
  filtros.push(`[${i}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`);
});
filtros.push(`${escenas.map((_, i) => `[v${i}]`).join("")}amix=inputs=${escenas.length}:normalize=0:dropout_transition=0,volume=1.6[voz]`);
// Acorde abierto (La mayor con novena) muy bajo, con trémolo lento: fondo neutro sin derechos de terceros.
const notas = [[110, 0.5], [164.81, 0.35], [220, 0.3], [246.94, 0.18], [277.18, 0.22], [329.63, 0.16]];
const base = escenas.length;
notas.forEach(([f], k) => entradas.push("-f", "lavfi", "-t", String(TOTAL), "-i", `sine=frequency=${f}:sample_rate=44100`));
notas.forEach(([, a], k) => filtros.push(`[${base + k}:a]volume=${a},aformat=channel_layouts=stereo[n${k}]`));
filtros.push(`${notas.map((_, k) => `[n${k}]`).join("")}amix=inputs=${notas.length}:normalize=0,lowpass=f=1400,tremolo=f=0.18:d=0.35,volume=0.07,afade=t=in:d=2.5,afade=t=out:st=${(TOTAL - 3.5).toFixed(2)}:d=3.5[mus]`);
filtros.push(`[voz]apad=whole_dur=${TOTAL.toFixed(3)},asplit=2[voz1][vozsc]`); // la voz dura lo mismo que el video
filtros.push(`[mus][vozsc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=450[musd]`);
filtros.push(`[voz1][musd]amix=inputs=2:normalize=0,alimiter=limit=0.95,atrim=0:${TOTAL.toFixed(3)}[out]`);
const r = spawnSync(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error", ...entradas, "-filter_complex", filtros.join(";"), "-map", "[out]", "-c:a", "aac", "-b:a", "192k", `${SAL}mezcla.m4a`], { encoding: "utf8" });
if (r.status !== 0) throw new Error("ffmpeg (audio): " + r.stderr);

// ---------- Página ----------
const audio64 = readFileSync(`${SAL}mezcla.m4a`).toString("base64");
const factura64 = readFileSync(VIDEO + "capturas/factura-ejemplo.png").toString("base64");
const html = readFileSync(H + "plantilla.html", "utf8")
  .replace("/*__DATOS__*/null", JSON.stringify({ escenas, chats }))
  .replace("__AUDIO__", `data:audio/mp4;base64,${audio64}`)
  .replace("__FACTURA__", `data:image/png;base64,${factura64}`);
writeFileSync(VIDEO + "paga-facil-video.html", html);
writeFileSync(SAL + "linea-de-tiempo.json", JSON.stringify(escenas, null, 2));
console.log(`Duración: ${TOTAL.toFixed(1)} s · escenas: ${escenas.length} · HTML: ${(html.length / 1e6).toFixed(1)} MB`);

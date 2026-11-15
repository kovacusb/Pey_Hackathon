// Narración con ElevenLabs (Marlene, español de México) y medición de duración con ffmpeg. Compartido por los videos.
// La llave se lee de .env de la raíz y nunca se imprime.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const RAIZ = new URL("../../../", import.meta.url).pathname;
export const VOZ = { voice_id: "JYyJjNPfmNJdaby8LdZs", modelo: "eleven_multilingual_v2", nombre: "Marlene" };

function llave() {
  const linea = readFileSync(RAIZ + ".env", "utf8").split("\n").find((l) => l.startsWith("ELEVENLABS_API_KEY="));
  const v = linea?.slice("ELEVENLABS_API_KEY=".length).trim();
  if (!v) throw new Error("Falta ELEVENLABS_API_KEY en .env");
  return v;
}

/** Genera el MP3 si no existe (o si forzar). previo/siguiente dan continuidad de entonación. */
export async function narrar(texto, archivo, { previo, siguiente, forzar = false } = {}) {
  if (!forzar && existsSync(archivo)) return archivo;
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOZ.voice_id}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": llave(), "content-type": "application/json" },
    body: JSON.stringify({
      text: texto,
      model_id: VOZ.modelo,
      language_code: "es",
      previous_text: previo,
      next_text: siguiente,
      voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
    }),
  });
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}`);
  writeFileSync(archivo, Buffer.from(await r.arrayBuffer()));
  return archivo;
}

/** Duración en segundos (ffmpeg reporta el progreso en stderr). */
export function duracion(archivo) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-i", archivo, "-f", "null", "-"], { encoding: "utf8" });
  const u = [...String(r.stderr).matchAll(/time=(\d+):(\d+):([\d.]+)/g)].at(-1);
  return u ? Number(u[1]) * 3600 + Number(u[2]) * 60 + Number(u[3]) : null;
}

/** Mezcla clips de voz (en sus tiempos) con una música suave que se agacha cuando hay voz. */
export function mezclar({ clips, total, salida, musica = 0.06 }) {
  const entradas = [], filtros = [];
  clips.forEach((c, i) => {
    entradas.push("-i", c.archivo);
    const ms = Math.round(c.inicio * 1000);
    filtros.push(`[${i}:a]aresample=44100,aformat=channel_layouts=stereo,adelay=${ms}|${ms}[v${i}]`);
  });
  filtros.push(`${clips.map((_, i) => `[v${i}]`).join("")}amix=inputs=${clips.length}:normalize=0:dropout_transition=0,volume=1.6,apad=whole_dur=${total.toFixed(3)},asplit=2[voz][vozsc]`);
  const notas = [[110, 0.5], [164.81, 0.35], [220, 0.3], [246.94, 0.18], [277.18, 0.22], [329.63, 0.16]];
  const base = clips.length;
  notas.forEach(([f]) => entradas.push("-f", "lavfi", "-t", String(total), "-i", `sine=frequency=${f}:sample_rate=44100`));
  notas.forEach(([, a], k) => filtros.push(`[${base + k}:a]volume=${a},aformat=channel_layouts=stereo[n${k}]`));
  filtros.push(`${notas.map((_, k) => `[n${k}]`).join("")}amix=inputs=${notas.length}:normalize=0,lowpass=f=1400,tremolo=f=0.18:d=0.35,volume=${musica},afade=t=in:d=1.2,afade=t=out:st=${Math.max(0, total - 1.5).toFixed(2)}:d=1.5[mus]`);
  filtros.push(`[mus][vozsc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=450[musd]`);
  filtros.push(`[voz][musd]amix=inputs=2:normalize=0,alimiter=limit=0.95,atrim=0:${total.toFixed(3)}[out]`);
  const r = spawnSync(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error", ...entradas, "-filter_complex", filtros.join(";"), "-map", "[out]", "-c:a", "aac", "-b:a", "160k", salida], { encoding: "utf8" });
  if (r.status !== 0) throw new Error("ffmpeg (mezcla): " + r.stderr);
  return salida;
}

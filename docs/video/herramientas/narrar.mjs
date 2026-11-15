// Genera la narración escena por escena con ElevenLabs y mide la duración de cada audio.
// Uso: node docs/video/herramientas/narrar.mjs   (lee ELEVENLABS_API_KEY del .env de la raíz; no la imprime)
// Salida: docs/video/salida/audio/<id>.mp3 y docs/video/salida/duraciones.json
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const RAIZ = new URL("../../../", import.meta.url).pathname;
const VIDEO = new URL("../", import.meta.url).pathname;
const SALIDA = VIDEO + "salida/audio/";
mkdirSync(SALIDA, { recursive: true });

const env = Object.fromEntries(
  readFileSync(RAIZ + ".env", "utf8").split("\n").filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]),
);
const llave = env.ELEVENLABS_API_KEY;
if (!llave) throw new Error("Falta ELEVENLABS_API_KEY en .env");

const { voz, escenas } = JSON.parse(readFileSync(VIDEO + "narracion.json", "utf8"));
const forzar = process.argv.includes("--forzar");

function duracion(archivo) {
  // ffmpeg escribe el progreso (time=…) en stderr; la última marca es la duración decodificada.
  const r = spawnSync(ffmpeg, ["-hide_banner", "-i", archivo, "-f", "null", "-"], { encoding: "utf8" });
  const marcas = [...String(r.stderr).matchAll(/time=(\d+):(\d+):([\d.]+)/g)];
  const u = marcas.at(-1);
  return u ? Number(u[1]) * 3600 + Number(u[2]) * 60 + Number(u[3]) : null;
}

const duraciones = {};
for (const [i, e] of escenas.entries()) {
  const archivo = `${SALIDA}${e.id}.mp3`;
  if (forzar || !existsSync(archivo)) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voz.voice_id}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": llave, "content-type": "application/json" },
      body: JSON.stringify({
        text: e.texto,
        model_id: voz.modelo,
        language_code: "es",
        // Continuidad de entonación entre escenas.
        previous_text: escenas[i - 1]?.texto,
        next_text: escenas[i + 1]?.texto,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
      }),
    });
    if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 200)}`);
    writeFileSync(archivo, Buffer.from(await r.arrayBuffer()));
  }
  duraciones[e.id] = duracion(archivo);
  console.log(`${e.id}: ${duraciones[e.id]?.toFixed(2)} s`);
}
writeFileSync(VIDEO + "salida/duraciones.json", JSON.stringify(duraciones, null, 2));

// Verificación de webhooks de pey con Standard Webhooks (pey/09, K03.5). Cuerpo CRUDO, sin parsear.
import crypto from "node:crypto";

export function firmaPeyValida(p: {
  secreto: string;
  id: string | undefined;
  timestamp: string | undefined;
  firmas: string | undefined;
  cuerpo: string;
  toleranciaSeg?: number;
  ahoraSeg?: number;
}): boolean {
  const { secreto, id, timestamp, firmas, cuerpo } = p;
  if (!secreto || !id || !timestamp || !firmas) return false;
  const ahora = p.ahoraSeg ?? Date.now() / 1000;
  if (Math.abs(ahora - Number(timestamp)) > (p.toleranciaSeg ?? 300)) return false; // evita repeticiones viejas
  const llave = Buffer.from(secreto.replace(/^whsec_/, ""), "base64");
  const esperada = crypto.createHmac("sha256", llave).update(`${id}.${timestamp}.${cuerpo}`).digest();
  return firmas.split(" ").some((f) => {
    const [version, b64] = f.split(",");
    const recibida = Buffer.from(b64 ?? "", "base64");
    return version === "v1" && recibida.length === esperada.length && crypto.timingSafeEqual(recibida, esperada);
  });
}

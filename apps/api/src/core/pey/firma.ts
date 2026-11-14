// Verificación de los webhooks de pey.
// Fuentes: https://docs.pey.mx/docs/webhooks/introduction (consultada el 2026-11-07, resumen en pey/09)
//          https://www.standardwebhooks.com/ (especificación: encabezados webhook-id, webhook-timestamp, webhook-signature)
// Se firma el texto `${webhook-id}.${webhook-timestamp}.${cuerpo crudo}` con HMAC-SHA256. La llave son los bytes del
// secreto en base64, sin el prefijo "whsec_". El encabezado puede traer varias firmas "v1,<base64>" separadas por espacio.
import { createHmac, timingSafeEqual } from "node:crypto";

export interface EncabezadosWebhook {
  id: string | undefined;
  timestamp: string | undefined;
  firma: string | undefined;
}

export type ResultadoFirma = { valida: true } | { valida: false; motivo: "sin_secreto" | "faltan_encabezados" | "fuera_de_tiempo" | "no_coincide" };

const VENTANA_SEG = 5 * 60; // decisión propia: rechaza entregas con más de 5 min de diferencia (evita repeticiones)

function llaveDe(secreto: string): Buffer {
  const base64 = secreto.startsWith("whsec_") ? secreto.slice("whsec_".length) : secreto;
  return Buffer.from(base64, "base64");
}

function firmasV1(encabezado: string): Buffer[] {
  return encabezado
    .split(" ")
    .map((parte) => parte.split(","))
    .filter(([version, valor]) => version === "v1" && Boolean(valor))
    .map(([, valor]) => Buffer.from(valor, "base64"));
}

export function verificarWebhookPey(secreto: string, enc: EncabezadosWebhook, cuerpoCrudo: string, ahoraMs = Date.now()): ResultadoFirma {
  if (!secreto) return { valida: false, motivo: "sin_secreto" };
  if (!enc.id || !enc.timestamp || !enc.firma) return { valida: false, motivo: "faltan_encabezados" };

  const enviadoSeg = Number.parseInt(enc.timestamp, 10);
  if (!Number.isFinite(enviadoSeg) || Math.abs(ahoraMs / 1000 - enviadoSeg) > VENTANA_SEG) return { valida: false, motivo: "fuera_de_tiempo" };

  const calculada = createHmac("sha256", llaveDe(secreto)).update(`${enc.id}.${enc.timestamp}.${cuerpoCrudo}`).digest();
  const coincide = firmasV1(enc.firma).some((recibida) => recibida.length === calculada.length && timingSafeEqual(recibida, calculada));
  return coincide ? { valida: true } : { valida: false, motivo: "no_coincide" };
}

// Cliente mínimo de la API CoDi de pey. Campos según openapi.json 2026-10-20 (pey/04, pey/07). Solo producción.
import { config } from "../../config.ts";
import { aPesos } from "../dinero.ts";

export class PeyError extends Error {
  status: number;
  tipo: string | undefined;
  requestId: string | undefined;
  constructor(status: number, cuerpo: any) {
    super(cuerpo?.error?.message ?? `pey respondió HTTP ${status}`);
    this.status = status;
    this.tipo = cuerpo?.error?.type;
    this.requestId = cuerpo?.error?.requestId;
  }
}

async function pey<T>(ruta: string, opciones: { method?: string; body?: unknown; timeoutMs?: number } = {}): Promise<T> {
  if (!config.pey.apiKey) throw new Error("Falta la variable PEY_API_KEY");
  const res = await fetch(`${config.pey.baseUrl}${ruta}`, {
    method: opciones.method ?? "GET",
    headers: {
      Authorization: `Bearer ${config.pey.apiKey}`,
      Accept: "application/json",
      ...(opciones.body ? { "Content-Type": "application/json" } : {}),
    },
    body: opciones.body ? JSON.stringify(opciones.body) : undefined,
    signal: AbortSignal.timeout(opciones.timeoutMs ?? 20_000),
  });
  const texto = await res.text();
  let datos: any = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch {
    datos = { crudo: texto.slice(0, 200) };
  }
  if (!res.ok) throw new PeyError(res.status, datos);
  return datos as T;
}

function validarComun(centavos: number, numRef: string) {
  if (!Number.isInteger(centavos) || centavos <= 0) throw new Error("El monto debe ser mayor que 0");
  if (centavos > config.maxCobroCentavos) throw new Error("El monto rebasa el tope del servidor (MAX_MONTO_MXN)");
  if (!/^[0-9]{1,7}$/.test(numRef)) throw new Error("numRef debe tener de 1 a 7 dígitos");
}

// ⚪ pey no documenta el largo máximo de concept; 40 es decisión propia (K03.7).
const recortar = (concepto: string) => concepto.slice(0, 40);

export interface QrCreado {
  id: string; // IDC de Banxico
  qrString: string;
  qrImage: string | null; // PNG en base64 (sin prefijo data:)
}

export function crearQr(p: { centavos: number; concepto: string; numRef: string; vigenciaSeg: number; metadata?: Record<string, string> }) {
  validarComun(p.centavos, p.numRef);
  if (!(p.vigenciaSeg === 0 || p.vigenciaSeg >= 360)) throw new Error("La vigencia del QR debe ser 0 o >= 360 s");
  return pey<QrCreado>("/codi/qr", {
    method: "POST",
    body: {
      amount: aPesos(p.centavos),
      concept: recortar(p.concepto),
      expiration: p.vigenciaSeg,
      numRef: p.numRef,
      generateImage: true,
      metadata: p.metadata ?? {},
    },
  });
}

export interface PushCreada {
  transactionId: string;
  codiId: string;
}

export function crearPush(p: { centavos: number; concepto: string; numRef: string; celular: string; vigenciaSeg: number; metadata?: Record<string, string> }) {
  validarComun(p.centavos, p.numRef);
  if (!/^[0-9]{10}$/.test(p.celular)) throw new Error("El celular debe tener 10 dígitos");
  if (p.vigenciaSeg < 360) throw new Error("La vigencia de la push debe ser >= 360 s");
  return pey<PushCreada>("/codi/pn", {
    method: "POST",
    body: {
      amount: aPesos(p.centavos),
      phoneNumber: p.celular,
      concept: recortar(p.concepto),
      expiration: p.vigenciaSeg,
      numRef: p.numRef,
      metadata: p.metadata ?? {},
    },
  });
}

export interface Transaccion {
  id: string;
  status: "PENDING" | "PAID";
  amount: number;
  currency?: string;
  datePaid?: number;
  metadata?: { trackingKey?: string; [k: string]: unknown };
}

/** Pagos de un QR (20 por página). Un QR no es una transacción: se consulta con su IDC (pey/07). */
export function pagosDeQr(idc: string) {
  return pey<{ items: Transaccion[]; nextToken: string | null }>(`/transaction/codi/qr/${encodeURIComponent(idc)}`, { timeoutMs: 10_000 });
}

/** Una transacción por su ULID; sirve para seguir una push. */
export function transaccion(id: string) {
  return pey<Transaccion>(`/transaction/${encodeURIComponent(id)}`, { timeoutMs: 10_000 });
}

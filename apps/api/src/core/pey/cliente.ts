// Cliente de la API CoDi de pey (solo producción: https://api.pey.mx).
// Fuentes (consultadas el 2026-11-07, resumen en pey/03, pey/04 y pey/07; probado en vivo el 2026-11-14):
//   https://docs.pey.mx/openapi.json (versión 2026-10-20)
//   https://docs.pey.mx/docs/api/create-qr · https://docs.pey.mx/docs/api/create-push-notification
//   https://docs.pey.mx/docs/api/get-transaction · https://docs.pey.mx/docs/api/get-co-di-qr-transactions
// Montos: el núcleo maneja centavos; aquí se convierten a pesos con 2 decimales, que es lo que pide pey.

/** Error de pey con su `error.type` (enumeración estable) y `requestId` para soporte. */
export class FalloPey extends Error {
  readonly http: number;
  readonly tipo: string | null;
  readonly requestId: string | null;
  constructor(http: number, tipo: string | null, requestId: string | null, mensaje: string) {
    super(mensaje);
    this.http = http;
    this.tipo = tipo;
    this.requestId = requestId;
  }
}

export interface PeticionQr {
  centavos: number;
  concepto: string;
  numRef: string; // ^[0-9]{1,7}$
  vigenciaSeg: number; // 0 (no vence) o >= 360
  metadata: Record<string, string>;
}

export interface PeticionPush {
  centavos: number;
  concepto: string;
  numRef: string;
  celular: string; // ^[0-9]{10}$
  vigenciaSeg: number; // >= 360
  metadata: Record<string, string>;
}

export interface Pago {
  id: string; // ULID de la transacción
  status: "PENDING" | "PAID";
  amount: number; // pesos
  datePaid?: number;
  metadata?: { trackingKey?: string } & Record<string, unknown>;
}

export interface ClientePey {
  /** POST /codi/qr → 201 { id (IDC), qrString, qrImage (PNG base64 o null) } */
  crearQr(p: PeticionQr): Promise<{ id: string; qrString: string; qrImage: string | null }>;
  /** POST /codi/pn → 200 { transactionId, codiId } */
  crearPush(p: PeticionPush): Promise<{ transactionId: string; codiId: string }>;
  /** GET /transaction/codi/qr/{IDC} → pagos de ese QR (un QR no es una transacción) */
  pagosDelQr(idc: string): Promise<Pago[]>;
  /** GET /transaction/{id} → una transacción; sirve para seguir una push */
  transaccion(id: string): Promise<Pago>;
}

// ⚪ pey no documenta el largo máximo de `concept`; 40 caracteres es decisión propia.
const LARGO_CONCEPTO = 40;
const pesos = (centavos: number) => Number((centavos / 100).toFixed(2));

export function crearClientePey(opciones: { apiKey: string; base?: string; fetch?: typeof fetch }): ClientePey {
  const base = opciones.base ?? "https://api.pey.mx";
  const hacerFetch = opciones.fetch ?? fetch;

  async function llamar<T>(metodo: "GET" | "POST", ruta: string, cuerpo?: object, limiteMs = 20_000): Promise<T> {
    if (!opciones.apiKey) throw new FalloPey(0, "SIN_LLAVE", null, "Falta PEY_API_KEY");
    const headers: Record<string, string> = { authorization: `Bearer ${opciones.apiKey}`, accept: "application/json" };
    if (cuerpo) headers["content-type"] = "application/json";
    const respuesta = await hacerFetch(base + ruta, {
      method: metodo,
      headers,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
      signal: AbortSignal.timeout(limiteMs),
    });
    const texto = await respuesta.text();
    const datos = texto ? (JSON.parse(texto) as any) : {};
    if (respuesta.ok) return datos as T;
    const e = datos?.error ?? {};
    throw new FalloPey(respuesta.status, e.type ?? null, e.requestId ?? null, e.message ?? `pey respondió ${respuesta.status}`);
  }

  return {
    crearQr: (p) =>
      llamar("POST", "/codi/qr", {
        amount: pesos(p.centavos),
        concept: p.concepto.slice(0, LARGO_CONCEPTO),
        expiration: p.vigenciaSeg,
        numRef: p.numRef,
        generateImage: true,
        metadata: p.metadata,
      }),
    crearPush: (p) =>
      llamar("POST", "/codi/pn", {
        amount: pesos(p.centavos),
        phoneNumber: p.celular,
        concept: p.concepto.slice(0, LARGO_CONCEPTO),
        expiration: p.vigenciaSeg,
        numRef: p.numRef,
        metadata: p.metadata,
      }),
    pagosDelQr: async (idc) => (await llamar<{ items?: Pago[] }>("GET", `/transaction/codi/qr/${encodeURIComponent(idc)}`, undefined, 10_000)).items ?? [],
    transaccion: (id) => llamar<Pago>("GET", `/transaction/${encodeURIComponent(id)}`, undefined, 10_000),
  };
}

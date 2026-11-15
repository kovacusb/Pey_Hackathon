// Configuración leída de variables de entorno. Los nombres están en .env.example; los valores nunca van al repo.

function num(nombre: string, porDefecto: number): number {
  const v = process.env[nombre];
  if (v === undefined || v.trim() === "") return porDefecto;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`${nombre} debe ser un número`);
  return n;
}

function pesosACentavos(pesos: number): number {
  return Math.round(pesos * 100);
}

export const config = {
  port: num("PORT", 3000),
  publicUrl: process.env.PUBLIC_URL ?? "",
  dbPath: process.env.DB_PATH ?? "data/pey.sqlite",

  pey: {
    apiKey: process.env.PEY_API_KEY ?? "",
    webhookSecret: process.env.PEY_WEBHOOK_SECRET ?? "",
    baseUrl: "https://api.pey.mx", // único entorno documentado (pey/03)
  },

  // Tope de cobro que impone el servidor, diga lo que diga la interfaz (AGENTS.md §3). No es límite de pey.
  // Configurable: los organizadores pidieron probar con montos mayores a $1 (15-nov).
  maxCobroCentavos: pesosACentavos(num("MAX_MONTO_MXN", 1)),
  // Si es > 0, todo cobro real se reduce a este monto de prueba (y se muestra el monto real como referencia).
  // 0 (por defecto) = se cobra el monto real, hasta el tope.
  demoCobroCentavos: pesosACentavos(num("DEMO_COBRO_MXN", 0)),
  // Servicios y recargas: mientras no haya un agregador real, el flujo completo es SIMULACIÓN (no se cobra dinero),
  // para no cobrar de verdad un recibo inventado. "0" = cobro CoDi real del monto (con liquidación simulada).
  serviciosSimulados: (process.env.SERVICIOS_SIMULADOS ?? "1") !== "0",

  // Vigencias en segundos. pey exige 0 o >= 360 en QR y >= 360 en push (pey/04).
  vigenciaQrSeg: num("VIGENCIA_QR_SEG", 600),
  vigenciaPushSeg: num("VIGENCIA_PUSH_SEG", 360),
  pollingMs: num("POLLING_MS", 4000),

  // WhatsApp Cloud API de Meta. v27.0: versión de los ejemplos de Meta consultados el 2026-11-14.
  wa: {
    accessToken: process.env.WHATSAPP_TOKEN ?? "",
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "",
    appSecret: process.env.WHATSAPP_APP_SECRET ?? "",
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN ?? "",
    apiVersion: process.env.WHATSAPP_GRAPH_VERSION || "v27.0",
  },

  // Chat de pruebas en /dev y pagos simulados. Nunca encendido en producción salvo que se pida.
  devTools: (process.env.DEV_TOOLS ?? (process.env.NODE_ENV === "production" ? "0" : "1")) === "1",
};

export const waConfigurado = () => Boolean(config.wa.accessToken && config.wa.phoneNumberId);

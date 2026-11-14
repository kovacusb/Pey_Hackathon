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
  maxCobroCentavos: pesosACentavos(num("MAX_MONTO_MXN", 1)),
  // Monto real que se cobra en la demo, sin importar el monto del recibo. 0 = cobrar el monto real (hasta el tope).
  demoCobroCentavos: pesosACentavos(num("DEMO_COBRO_MXN", 0.01)),

  // Vigencias en segundos. pey exige 0 o >= 360 en QR y >= 360 en push (pey/04).
  vigenciaQrSeg: num("VIGENCIA_QR_SEG", 600),
  vigenciaPushSeg: num("VIGENCIA_PUSH_SEG", 360),
  pollingMs: num("POLLING_MS", 4000),

  wa: {
    token: process.env.WA_TOKEN ?? "",
    phoneNumberId: process.env.WA_PHONE_NUMBER_ID ?? "",
    appSecret: process.env.WA_APP_SECRET ?? "",
    verifyToken: process.env.WA_VERIFY_TOKEN ?? "",
    apiVersion: process.env.WA_API_VERSION ?? "v23.0",
  },

  // Chat de pruebas en /dev y pagos simulados. Nunca encendido en producción salvo que se pida.
  devTools: (process.env.DEV_TOOLS ?? (process.env.NODE_ENV === "production" ? "0" : "1")) === "1",
};

export const waConfigurado = () => Boolean(config.wa.token && config.wa.phoneNumberId);

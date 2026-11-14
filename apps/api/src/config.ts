// Configuración desde variables de entorno. Los nombres están en .env.example; los valores nunca se imprimen.

export type Config = {
  whatsappToken: string | undefined;
  whatsappPhoneNumberId: string | undefined;
  whatsappAppSecret: string | undefined;
  whatsappVerifyToken: string | undefined;
  /** Versión de la Graph API. v27.0 es la de los ejemplos de Meta consultados el 2026-11-14. */
  graphVersion: string;
  /** Tope por cobro en centavos (MAX_MONTO_MXN). Si falta o no es válido: $1 (AGENTS.md §3). */
  maxMontoCentavos: number;
};

type Entorno = Record<string, string | undefined>;

const PARA_WHATSAPP = ["WHATSAPP_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_APP_SECRET", "WHATSAPP_VERIFY_TOKEN"];

function valor(env: Entorno, nombre: string): string | undefined {
  const v = env[nombre]?.trim();
  return v ? v : undefined;
}

export function leerConfig(env: Entorno = process.env): Config {
  const max = Number(valor(env, "MAX_MONTO_MXN") ?? "1");
  return {
    whatsappToken: valor(env, "WHATSAPP_TOKEN"),
    whatsappPhoneNumberId: valor(env, "WHATSAPP_PHONE_NUMBER_ID"),
    whatsappAppSecret: valor(env, "WHATSAPP_APP_SECRET"),
    whatsappVerifyToken: valor(env, "WHATSAPP_VERIFY_TOKEN"),
    graphVersion: valor(env, "WHATSAPP_GRAPH_VERSION") ?? "v27.0",
    maxMontoCentavos: Number.isFinite(max) && max > 0 ? Math.round(max * 100) : 100,
  };
}

/** Nombres (nunca valores) de las variables que faltan para hablar con WhatsApp. */
export function variablesFaltantes(env: Entorno = process.env): string[] {
  return PARA_WHATSAPP.filter((nombre) => !valor(env, nombre));
}

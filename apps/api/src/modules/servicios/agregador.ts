// Agregador de pago de servicios y recargas. Hoy es SIMULACIÓN; en producción se cambia por un proveedor real
// sin tocar los flujos del bot (misma interfaz).
import crypto from "node:crypto";

export interface Adeudo {
  centavos: number;
  periodo: string;
  vence: string;
}

export interface Comprobante {
  folio: string;
  simulado: boolean;
}

export interface Agregador {
  /** Consulta el adeudo de un servicio. null = sin adeudo. */
  consultar(servicio: string, referencia: string): Promise<Adeudo | null>;
  /** Liquida el servicio o la recarga una vez que el pago CoDi está confirmado. */
  pagar(p: { tipo: "servicio" | "recarga"; clave: string; referencia: string; centavos: number; idCobro: string }): Promise<Comprobante>;
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** Simulación determinista: la misma referencia da siempre el mismo adeudo. Referencias que terminan en 0000 no deben nada. */
export const agregadorSimulado: Agregador = {
  async consultar(servicio, referencia) {
    if (referencia.endsWith("0000")) return null;
    const h = crypto.createHash("sha256").update(`${servicio}:${referencia}`).digest();
    const pesos = 189 + (h.readUInt16BE(0) % 1300); // entre $189 y $1,488
    const centavos = pesos * 100 + (h[2] % 2 ? 50 : 0);
    const hoy = new Date();
    const vence = new Date(hoy.getTime() + (5 + (h[3] % 15)) * 86_400_000);
    const mesAnt = MESES[(hoy.getMonth() + 11) % 12];
    return {
      centavos,
      periodo: `${mesAnt}–${MESES[hoy.getMonth()]} ${hoy.getFullYear()}`,
      vence: `${vence.getDate()} ${MESES[vence.getMonth()]}`,
    };
  },
  async pagar() {
    return { folio: `SIM-${crypto.randomBytes(4).toString("hex").toUpperCase()}`, simulado: true };
  },
};

// TODO: agregador real (p. ej. un proveedor de pago de servicios con API) detrás de la misma interfaz.
export const agregador: Agregador = agregadorSimulado;

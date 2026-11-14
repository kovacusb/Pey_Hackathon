// Monto que se cobra de verdad. En la demo (DEMO_COBRO_MXN > 0) se cobra un monto de prueba y se muestra el monto
// real como referencia, con la etiqueta de demo visible (AGENTS.md §3). Sin demo, el monto real dentro del tope.
import { config } from "../config.ts";

export const enDemo = () => config.demoCobroCentavos > 0;

/** null = el monto real rebasa el tope del servidor y no se puede cobrar. */
export function montoACobrar(centavosReal: number): number | null {
  if (enDemo()) return Math.min(config.demoCobroCentavos, config.maxCobroCentavos);
  return centavosReal <= config.maxCobroCentavos ? centavosReal : null;
}

// Montos: internamente centavos enteros; a pey se mandan pesos con 2 decimales (AGENTS.md §3, pey/03).

export const aPesos = (centavos: number): number => Math.round(centavos) / 100;

export const desdePesos = (pesos: number): number => Math.round(pesos * 100);

const formato = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

/** 84550 → "$845.50" */
export const mxn = (centavos: number): string => formato.format(aPesos(centavos));

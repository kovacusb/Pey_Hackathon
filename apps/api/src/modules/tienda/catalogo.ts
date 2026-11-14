// Catálogo de demo de la tiendita (datos ficticios; docs/PRD.md). Precios de prueba en centavos: el servidor nunca
// cobra más de MAX_MONTO_MXN (AGENTS.md §3). En la tarea 3 el catálogo vendrá de la base de datos y de la app.

export type Producto = { sku: string; nombre: string; precioCentavos: number };

export const CATALOGO_DEMO: readonly Producto[] = [
  { sku: "chicle", nombre: "Chicle", precioCentavos: 10 },
  { sku: "paleta", nombre: "Paleta de dulce", precioCentavos: 20 },
  { sku: "galleta", nombre: "Galletas", precioCentavos: 25 },
  { sku: "agua", nombre: "Agua 600 ml", precioCentavos: 30 },
  { sku: "pan", nombre: "Pan dulce", precioCentavos: 30 },
  { sku: "papas", nombre: "Papas", precioCentavos: 35 },
  { sku: "jugo", nombre: "Jugo", precioCentavos: 35 },
  { sku: "refresco", nombre: "Refresco", precioCentavos: 40 },
];

export function pesos(centavos: number): string {
  return `$${(centavos / 100).toFixed(2)}`;
}

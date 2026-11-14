// Catálogo de servicios y compañías de recarga.
// TODO(⚪): los formatos de referencia son aproximados para la demo; al conectar un agregador real, usar los suyos.

export interface Servicio {
  clave: string;
  nombre: string;
  emoji: string;
  categoria: string;
  etiquetaRef: string;
  ayudaRef: string;
  patron: RegExp;
}

export const SERVICIOS: Servicio[] = [
  { clave: "cfe", nombre: "CFE", emoji: "💡", categoria: "Luz", etiquetaRef: "número de servicio", ayudaRef: "Son 12 dígitos; vienen en tu recibo, arriba a la derecha.", patron: /^\d{12}$/ },
  { clave: "agua", nombre: "Agua CDMX", emoji: "🚰", categoria: "Agua", etiquetaRef: "número de cuenta", ayudaRef: "Viene en tu boleta de agua.", patron: /^\d{8,20}$/ },
  { clave: "telmex", nombre: "Telmex", emoji: "☎️", categoria: "Teléfono e internet", etiquetaRef: "número telefónico", ayudaRef: "Tu número fijo a 10 dígitos.", patron: /^\d{10}$/ },
  { clave: "izzi", nombre: "izzi", emoji: "📡", categoria: "Internet y TV", etiquetaRef: "número de cuenta", ayudaRef: "Viene en tu estado de cuenta.", patron: /^\d{6,20}$/ },
  { clave: "totalplay", nombre: "Totalplay", emoji: "📡", categoria: "Internet y TV", etiquetaRef: "número de cuenta", ayudaRef: "Viene en tu estado de cuenta.", patron: /^\d{6,20}$/ },
  { clave: "megacable", nombre: "Megacable", emoji: "📡", categoria: "Internet y TV", etiquetaRef: "número de suscriptor", ayudaRef: "Viene en tu estado de cuenta.", patron: /^\d{6,20}$/ },
  { clave: "gas", nombre: "Naturgy", emoji: "🔥", categoria: "Gas natural", etiquetaRef: "número de contrato", ayudaRef: "Viene en tu recibo de gas.", patron: /^\d{6,20}$/ },
  { clave: "sky", nombre: "SKY", emoji: "🛰️", categoria: "TV satelital", etiquetaRef: "número de cuenta", ayudaRef: "Viene en tu estado de cuenta.", patron: /^\d{6,20}$/ },
];

export interface Operador {
  clave: string;
  nombre: string;
}

export const OPERADORES: Operador[] = [
  { clave: "telcel", nombre: "Telcel" },
  { clave: "att", nombre: "AT&T" },
  { clave: "movistar", nombre: "Movistar" },
  { clave: "bait", nombre: "Bait" },
  { clave: "unefon", nombre: "Unefon" },
  { clave: "virgin", nombre: "Virgin Mobile" },
];

/** Montos de recarga en pesos. */
export const MONTOS_RECARGA = [20, 30, 50, 100, 150, 200, 300, 500];

export const servicioPorClave = (c: string) => SERVICIOS.find((s) => s.clave === c);
export const operadorPorClave = (c: string) => OPERADORES.find((o) => o.clave === c);

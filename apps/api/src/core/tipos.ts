// CONTRATO entre el núcleo y los módulos. Cambios aquí se revisan entre todo el equipo (ver docs/MODULOS.md).

/** Botón de respuesta de WhatsApp: máximo 3 por mensaje, título de hasta 20 caracteres. */
export interface Boton {
  id: string;
  titulo: string;
}

/** Fila de una lista de WhatsApp: título <= 24, descripción <= 72; máximo 10 filas en total. */
export interface Fila {
  id: string;
  titulo: string;
  descripcion?: string;
}

export interface Seccion {
  titulo: string;
  filas: Fila[];
}

/** Lo que el bot puede mandar. Cada método se dirige al usuario de la conversación actual. */
export interface Respuesta {
  texto(cuerpo: string): Promise<void>;
  botones(cuerpo: string, botones: Boton[], opciones?: { encabezado?: string; pie?: string }): Promise<void>;
  lista(cuerpo: string, textoBoton: string, secciones: Seccion[], opciones?: { encabezado?: string; pie?: string }): Promise<void>;
  imagen(png: Buffer, pie?: string): Promise<void>;
  /** Documento (p. ej. PDF de una factura). */
  documento(archivo: Buffer, nombre: string, pie?: string): Promise<void>;
}

/** Mensaje entrante ya normalizado. */
export interface Entrada {
  tipo: "texto" | "boton" | "otro";
  /** Texto escrito por la persona (tipo "texto"). */
  texto?: string;
  /** id del botón o fila elegida (tipo "boton"), con prefijo de módulo: "svc:...", "neg:...". */
  id?: string;
}

export interface Sesion {
  modulo: string | null;
  paso: string | null;
  datos: Record<string, unknown>;
}

export type MetodoCobro = "pn" | "qr";

export interface SolicitudCobro {
  /** Monto a cobrar en centavos. El núcleo rechaza lo que pase de MAX_MONTO_MXN. */
  centavos: number;
  /** Lo que verá quien paga en su banco. Debe describir con verdad lo que se cobra (codi/05). */
  concepto: string;
  metodo: MetodoCobro;
  /** Datos propios del módulo; regresan en onPagado. */
  payload: Record<string, unknown>;
  /** Push a OTRO celular (10 dígitos). Solo con confirmación explícita de que esa persona aceptó el cobro (codi/05).
   *  Sin él, la push va al celular de quien está en el chat. */
  celular?: string;
  /** "tercero": quien paga está frente a la persona del chat (le muestra el QR). Cambia los textos del cobro. */
  audiencia?: "propia" | "tercero";
}

/** Cobro tal como lo guarda el núcleo. */
export interface Cobro {
  id: string;
  grupo: string;
  modulo: string;
  waId: string;
  metodo: MetodoCobro;
  centavos: number;
  concepto: string;
  numRef: string;
  peyId: string | null;
  estado: string;
  pagadoEn: number | null;
  peyTxId: string | null;
  rastreo: string | null;
  simulado: boolean;
  creadoEn: number;
  payload: Record<string, unknown>;
}

export interface Contexto {
  waId: string;
  nombre: string | null;
  responder: Respuesta;
  sesion: Sesion;
  /** Guarda en qué paso va la persona dentro de este módulo. */
  irA(paso: string, datos?: Record<string, unknown>): void;
  /** Regresa al menú principal y limpia la sesión. */
  menu(): Promise<void>;
  /** Crea un cobro CoDi (push o QR) y se encarga de la conversación de pago. */
  cobrar(solicitud: SolicitudCobro): Promise<void>;
}

export interface Modulo {
  /** Prefijo de los ids de botones: "svc", "neg", "p2p", "ayuda". */
  id: string;
  /** Opciones que el módulo agrega al menú principal. */
  menu: Fila[];
  /** Atiende un mensaje cuando el botón tiene su prefijo o la sesión está en este módulo. */
  atender(ctx: Contexto, entrada: Entrada): Promise<void>;
  /** pey confirmó el pago de un cobro de este módulo. Se llama una sola vez por grupo. */
  onPagado?(ctx: Contexto, cobro: Cobro): Promise<void>;
}

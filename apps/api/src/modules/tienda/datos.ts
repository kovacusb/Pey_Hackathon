// Datos que el comercio maneja desde el panel web (/panel): ajustes del bot y catálogo, en SQLite con prefijo tienda_
// (docs/MODULOS.md). Los pedidos y pagos no se duplican: se leen de la tabla `cobros` del núcleo (modulo = 'tienda').
import crypto from "node:crypto";
import { config } from "../../config.ts";
import { celularDe } from "../../core/cobros.ts";
import { db } from "../../core/db.ts";
import { CATALOGO_DEMO, type Producto } from "./catalogo.ts";
import { LIMITES, type Partida } from "./motor.ts";

db.exec(`
  CREATE TABLE IF NOT EXISTS tienda_ajustes (
    clave TEXT PRIMARY KEY,
    valor TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tienda_productos (
    sku             TEXT PRIMARY KEY,
    nombre          TEXT NOT NULL,
    precio_centavos INTEGER NOT NULL,
    disponible      INTEGER NOT NULL DEFAULT 1,
    orden           INTEGER NOT NULL DEFAULT 0
  );
`);

export type Ajustes = { nombre: string; saludo: string; activo: boolean };
export type ProductoPanel = Producto & { disponible: boolean };

const AJUSTES_INICIALES: Ajustes = {
  nombre: "Tiendita La Esquina",
  saludo: "¡Hola! Soy el asistente de Tiendita La Esquina 🛒\nElige un producto y te cobro con CoDi, sin comisión.",
  activo: true,
};

// Primera vez: catálogo de demo (datos ficticios). Si el comercio borra todo, no se vuelve a sembrar.
if (!db.prepare("SELECT 1 FROM tienda_ajustes WHERE clave = 'sembrado'").get()) {
  const ins = db.prepare("INSERT OR IGNORE INTO tienda_productos (sku, nombre, precio_centavos, disponible, orden) VALUES (?, ?, ?, 1, ?)");
  CATALOGO_DEMO.forEach((p, i) => ins.run(p.sku, p.nombre, p.precioCentavos, i));
  db.prepare("INSERT OR REPLACE INTO tienda_ajustes (clave, valor) VALUES ('sembrado', '1')").run();
}

/** Error de validación: el panel lo muestra tal cual. */
export class DatoInvalido extends Error {}

export function leerAjustes(): Ajustes {
  const fila = db.prepare("SELECT valor FROM tienda_ajustes WHERE clave = 'ajustes'").get() as { valor: string } | undefined;
  return fila ? { ...AJUSTES_INICIALES, ...JSON.parse(fila.valor) } : { ...AJUSTES_INICIALES };
}

export function guardarAjustes(entrada: Partial<Record<keyof Ajustes, unknown>>): Ajustes {
  const actual = leerAjustes();
  const nombre = entrada.nombre === undefined ? actual.nombre : String(entrada.nombre).trim();
  const saludo = entrada.saludo === undefined ? actual.saludo : String(entrada.saludo).trim();
  const activo = entrada.activo === undefined ? actual.activo : entrada.activo === true;
  if (!nombre || nombre.length > LIMITES.seccion) throw new DatoInvalido(`El nombre debe tener de 1 a ${LIMITES.seccion} caracteres (límite de WhatsApp).`);
  if (!saludo || saludo.length > 500) throw new DatoInvalido("El saludo debe tener de 1 a 500 caracteres.");
  const nuevos: Ajustes = { nombre, saludo, activo };
  db.prepare("INSERT OR REPLACE INTO tienda_ajustes (clave, valor) VALUES ('ajustes', ?)").run(JSON.stringify(nuevos));
  return nuevos;
}

export function listarProductos(opciones: { soloDisponibles?: boolean } = {}): ProductoPanel[] {
  const filas = db
    .prepare(`SELECT * FROM tienda_productos ${opciones.soloDisponibles ? "WHERE disponible = 1" : ""} ORDER BY orden, rowid`)
    .all() as any[];
  return filas.map((f) => ({ sku: f.sku, nombre: f.nombre, precioCentavos: f.precio_centavos, disponible: f.disponible === 1 }));
}

function validarProducto(nombre: string, precioCentavos: number) {
  if (!nombre || nombre.length > LIMITES.tituloRenglon) {
    throw new DatoInvalido(`El nombre debe tener de 1 a ${LIMITES.tituloRenglon} caracteres (límite de WhatsApp).`);
  }
  if (!Number.isInteger(precioCentavos) || precioCentavos <= 0 || precioCentavos > config.maxCobroCentavos) {
    throw new DatoInvalido(`El precio debe ser mayor a $0 y no pasar del tope de la demo ($${(config.maxCobroCentavos / 100).toFixed(2)}).`);
  }
}

export function crearProducto(e: { nombre?: unknown; precioCentavos?: unknown }): ProductoPanel {
  const nombre = String(e.nombre ?? "").trim();
  const precioCentavos = Number(e.precioCentavos);
  validarProducto(nombre, precioCentavos);
  if (listarProductos().length >= LIMITES.renglones) {
    throw new DatoInvalido(`Máximo ${LIMITES.renglones} productos: es lo que cabe en una lista de WhatsApp.`);
  }
  const sku = `p-${crypto.randomUUID().slice(0, 8)}`;
  const orden = (db.prepare("SELECT COALESCE(MAX(orden), -1) + 1 AS n FROM tienda_productos").get() as { n: number }).n;
  db.prepare("INSERT INTO tienda_productos (sku, nombre, precio_centavos, disponible, orden) VALUES (?, ?, ?, 1, ?)").run(sku, nombre, precioCentavos, orden);
  return { sku, nombre, precioCentavos, disponible: true };
}

export function actualizarProducto(sku: string, e: { nombre?: unknown; precioCentavos?: unknown; disponible?: unknown }): ProductoPanel {
  const actual = listarProductos().find((p) => p.sku === sku);
  if (!actual) throw new DatoInvalido("Ese producto ya no existe.");
  const nombre = e.nombre === undefined ? actual.nombre : String(e.nombre).trim();
  const precioCentavos = e.precioCentavos === undefined ? actual.precioCentavos : Number(e.precioCentavos);
  const disponible = e.disponible === undefined ? actual.disponible : e.disponible === true;
  validarProducto(nombre, precioCentavos);
  db.prepare("UPDATE tienda_productos SET nombre = ?, precio_centavos = ?, disponible = ? WHERE sku = ?").run(nombre, precioCentavos, disponible ? 1 : 0, sku);
  return { sku, nombre, precioCentavos, disponible };
}

export function borrarProducto(sku: string): boolean {
  return db.prepare("DELETE FROM tienda_productos WHERE sku = ?").run(sku).changes === 1;
}

// ---------- Pedidos y pagos (lectura de los cobros del núcleo) ----------

export type EstadoPedido = "pagado" | "pendiente" | "cancelado" | "vencido" | "fallido" | "monto_distinto" | "creando";

export type PedidoPanel = {
  id: string;
  folio: string;
  creadoEn: number;
  pagadoEn: number | null;
  articulos: Partida[];
  centavos: number;
  metodo: "pn" | "qr";
  estado: EstadoPedido;
  simulado: boolean;
  /** Solo los últimos 4 dígitos (AGENTS.md §4). */
  cliente: string;
};

/** Un pedido = un grupo de cobros (push y luego QR son intentos de la misma orden). */
export function listarPedidos(limite = 50): PedidoPanel[] {
  const filas = db.prepare("SELECT * FROM cobros WHERE modulo = 'tienda' ORDER BY seq DESC LIMIT 500").all() as any[];
  const grupos = new Map<string, any[]>();
  for (const f of filas) grupos.set(f.grupo, [...(grupos.get(f.grupo) ?? []), f]);
  return [...grupos.values()].slice(0, limite).map((intentos) => {
    const ultimo = intentos[0];
    const pagado = intentos.find((f) => f.estado === "pagado");
    const ref = pagado ?? ultimo;
    const primero = intentos.at(-1);
    const ultimos4 = celularDe(ultimo.wa_id)?.slice(-4);
    const estado: EstadoPedido = pagado ? "pagado" : ultimo.cancelado === 1 ? "cancelado" : ultimo.estado;
    return {
      id: ultimo.grupo,
      folio: ref.num_ref,
      creadoEn: primero.creado_en,
      pagadoEn: pagado?.pagado_en ?? null,
      articulos: (JSON.parse(ref.payload).partidas ?? []) as Partida[],
      centavos: ref.centavos,
      metodo: ref.metodo,
      estado,
      simulado: pagado?.simulado === 1,
      cliente: ultimos4 ? `•••• ${ultimos4}` : "—",
    };
  });
}

export type Resumen = {
  ventasHoyCentavos: number;
  pagadosHoy: number;
  simuladosHoyCentavos: number;
  pendientes: number;
};

export function resumen(ahora = new Date()): Resumen {
  const hoy = new Date(ahora);
  hoy.setHours(0, 0, 0, 0);
  const pedidos = listarPedidos(500);
  const deHoy = pedidos.filter((p) => p.estado === "pagado" && (p.pagadoEn ?? 0) >= hoy.getTime());
  return {
    ventasHoyCentavos: deHoy.filter((p) => !p.simulado).reduce((s, p) => s + p.centavos, 0),
    pagadosHoy: deHoy.filter((p) => !p.simulado).length,
    simuladosHoyCentavos: deHoy.filter((p) => p.simulado).reduce((s, p) => s + p.centavos, 0),
    pendientes: pedidos.filter((p) => p.estado === "pendiente").length,
  };
}

// Motor de cobros CoDi compartido por todos los módulos.
// - Crea el cobro en pey (push al celular o QR) y conduce la conversación de pago.
// - "Pagado" solo si pey lo confirma: webhook con firma válida o PAID en la API, con el monto esperado (AGENTS.md §3).
// - Una orden (grupo) se entrega una sola vez, aunque se paguen dos intentos (push + QR).
import crypto from "node:crypto";
import { config } from "../config.ts";
import { db } from "./db.ts";
import { mxn, desdePesos } from "./dinero.ts";
import { FalloPey, crearClientePey, type ClientePey } from "./pey/cliente.ts";
import { respuestaPara } from "./whatsapp/enviar.ts";
import type { Cobro, MetodoCobro, SolicitudCobro } from "./tipos.ts";

let pey: ClientePey = crearClientePey({ apiKey: config.pey.apiKey });

/** Solo pruebas: reemplaza el cliente de pey por uno falso (sin red). */
export function usarClientePey(c: ClientePey) {
  pey = c;
}

type AlConfirmar = (cobro: Cobro) => Promise<void>;
let alConfirmar: AlConfirmar = async () => {};

/** El bot registra aquí a quién avisar cuando un pago se confirma (módulo dueño del cobro). */
export function alConfirmarPago(fn: AlConfirmar) {
  alConfirmar = fn;
}

// ---------- Lectura ----------
function aCobro(f: any): Cobro {
  return {
    id: f.id,
    grupo: f.grupo,
    modulo: f.modulo,
    waId: f.wa_id,
    metodo: f.metodo,
    centavos: f.centavos,
    concepto: f.concepto,
    numRef: f.num_ref,
    peyId: f.pey_id,
    estado: f.estado,
    pagadoEn: f.pagado_en,
    peyTxId: f.pey_tx_id,
    rastreo: f.rastreo,
    simulado: f.simulado === 1,
    creadoEn: f.creado_en,
    payload: JSON.parse(f.payload),
  };
}

/** Datos extra que no son parte del contrato público (destino de la push y para quién son los textos). */
function extrasDe(id: string): { destino: string | null; audiencia: "propia" | "tercero" } {
  const f = db.prepare("SELECT destino, audiencia FROM cobros WHERE id = ?").get(id) as any;
  return { destino: f?.destino ?? null, audiencia: f?.audiencia === "tercero" ? "tercero" : "propia" };
}

/** Agrega datos al payload de un cobro (p. ej. la factura emitida). */
export function actualizarPayload(id: string, cambios: Record<string, unknown>) {
  const c = cobroPorId(id);
  if (!c) return;
  db.prepare("UPDATE cobros SET payload = ? WHERE id = ?").run(JSON.stringify({ ...c.payload, ...cambios }), id);
}

export interface FilaPanel extends Cobro {
  cancelado: boolean;
}

/** Últimos cobros para el panel del comercio (más recientes primero). */
export function cobrosRecientes(n = 50, modulo?: string): FilaPanel[] {
  const filas = (modulo
    ? db.prepare("SELECT * FROM cobros WHERE modulo = ? ORDER BY seq DESC LIMIT ?").all(modulo, n)
    : db.prepare("SELECT * FROM cobros ORDER BY seq DESC LIMIT ?").all(n)) as any[];
  return filas.map((f) => ({ ...aCobro(f), cancelado: f.cancelado === 1 }));
}

export function cobroPorId(id: string): Cobro | null {
  const f = db.prepare("SELECT * FROM cobros WHERE id = ?").get(id);
  return f ? aCobro(f) : null;
}

function cobroPorPeyId(peyId: string): Cobro | null {
  const f = db.prepare("SELECT * FROM cobros WHERE pey_id = ? ORDER BY seq DESC LIMIT 1").get(peyId);
  return f ? aCobro(f) : null;
}

function ultimoDelGrupo(grupo: string): Cobro | null {
  const f = db.prepare("SELECT * FROM cobros WHERE grupo = ? ORDER BY seq DESC LIMIT 1").get(grupo);
  return f ? aCobro(f) : null;
}

const grupoPagado = (grupo: string) =>
  Boolean(db.prepare("SELECT 1 FROM cobros WHERE grupo = ? AND estado = 'pagado' LIMIT 1").get(grupo));

export function historial(waId: string, modulo: string, n = 5): Cobro[] {
  return (db.prepare("SELECT * FROM cobros WHERE wa_id = ? AND modulo = ? AND estado = 'pagado' ORDER BY pagado_en DESC LIMIT ?").all(waId, modulo, n) as any[]).map(aCobro);
}

export function pendientesDe(waId: string): Cobro[] {
  return (db.prepare("SELECT * FROM cobros WHERE wa_id = ? AND estado = 'pendiente' ORDER BY seq DESC").all(waId) as any[]).map(aCobro);
}

// ---------- Crear ----------
/** Celular de 10 dígitos a partir del wa_id (521XXXXXXXXXX, 52XXXXXXXXXX o dev55XXXXXXXX). */
export function celularDe(waId: string): string | null {
  const digitos = waId.replace(/\D/g, "");
  return digitos.length >= 10 ? digitos.slice(-10) : null;
}

const minutos = (seg: number) => Math.round(seg / 60);

export async function iniciarCobro(waId: string, modulo: string, s: SolicitudCobro, grupoExistente?: string): Promise<void> {
  const r = respuestaPara(waId);
  // Tope impuesto por el servidor, diga lo que diga el módulo o la interfaz (AGENTS.md §3).
  if (!Number.isInteger(s.centavos) || s.centavos <= 0 || s.centavos > config.maxCobroCentavos) {
    await r.texto(`⚠️ Ese monto no se puede cobrar aquí (máximo ${mxn(config.maxCobroCentavos)} en esta demo).`);
    return;
  }
  let metodo: MetodoCobro = s.metodo;
  if (s.celular !== undefined && !/^\d{10}$/.test(s.celular)) {
    await r.texto("⚠️ El celular debe tener 10 dígitos.");
    return;
  }
  const audiencia = s.audiencia ?? "propia";
  // Push a un tercero solo si el módulo lo pasó explícito (confirmado por la persona del chat); si no, al propio celular.
  const celular = s.celular ?? (audiencia === "propia" ? celularDe(waId) : null);
  if (metodo === "pn" && !celular) metodo = "qr";
  const tercero = audiencia === "tercero";

  const id = crypto.randomUUID();
  const grupo = grupoExistente ?? crypto.randomUUID();
  const ins = db
    .prepare(
      `INSERT INTO cobros (id, grupo, modulo, wa_id, metodo, centavos, concepto, num_ref, estado, payload, creado_en, destino, audiencia)
       VALUES (?, ?, ?, ?, ?, ?, ?, '0', 'creando', ?, ?, ?, ?)`,
    )
    .run(id, grupo, modulo, waId, metodo, s.centavos, s.concepto, JSON.stringify(s.payload), Date.now(), s.celular ?? null, audiencia);
  // Referencia numérica de 1 a 7 dígitos derivada del consecutivo (pey/04).
  const numRef = String(Number(ins.lastInsertRowid) % 10_000_000 || 1);
  db.prepare("UPDATE cobros SET num_ref = ? WHERE id = ?").run(numRef, id);

  await r.texto(tercero ? "⏳ Generando el cobro CoDi…" : "⏳ Generando tu cobro CoDi…");
  const metadata = { cobro: id, modulo };

  try {
    if (metodo === "pn") {
      const push = await pey.crearPush({ centavos: s.centavos, concepto: s.concepto, numRef, celular: celular!, vigenciaSeg: Math.max(360, config.vigenciaPushSeg), metadata });
      db.prepare("UPDATE cobros SET pey_id = ?, estado = 'pendiente', vence_en = ? WHERE id = ?").run(
        push.transactionId, Date.now() + config.vigenciaPushSeg * 1000, id);
      console.log("[cobro] push creada", { cobro: id, transactionId: push.transactionId });
      await r.botones(
        tercero
          ? `📲 *Solicitud enviada al celular •••• ${celular!.slice(-4)}*\nPídele que abra la notificación de su banco y autorice *${mxn(s.centavos)}* con su NIP o huella.\n\n⏱️ Vence en ${minutos(config.vigenciaPushSeg)} min. Te aviso aquí cuando se confirme.`
          : `📲 *Revisa la app de tu banco*\nTe llegó una solicitud CoDi por *${mxn(s.centavos)}*.\nÁbrela y autoriza con tu NIP o huella.\n\n⏱️ Vence en ${minutos(config.vigenciaPushSeg)} min. Te aviso aquí cuando se confirme.`,
        [
          { id: `pago:qr:${grupo}`, titulo: "📷 Mejor un QR" },
          { id: `pago:cancelar:${grupo}`, titulo: "Cancelar" },
        ],
        { pie: tercero ? "¿No le llegó? Muéstrale el QR." : "¿No te llegó? Pide el QR." },
      );
    } else {
      const qr = await pey.crearQr({ centavos: s.centavos, concepto: s.concepto, numRef, vigenciaSeg: config.vigenciaQrSeg === 0 ? 0 : Math.max(360, config.vigenciaQrSeg), metadata });
      db.prepare("UPDATE cobros SET pey_id = ?, estado = 'pendiente', vence_en = ? WHERE id = ?").run(
        qr.id, Date.now() + config.vigenciaQrSeg * 1000, id);
      console.log("[cobro] QR creado", { cobro: id, codiQrId: qr.id });
      if (qr.qrImage) {
        await r.imagen(
          Buffer.from(qr.qrImage.replace(/^data:image\/png;base64,/, ""), "base64"),
          tercero
            ? `📷 Muéstrale este QR a quien te paga (*${mxn(s.centavos)}*)\nLo escanea *desde la app de su banco* → CoDi → Pagar (la cámara normal no sirve).\n⏱️ Vence en ${minutos(config.vigenciaQrSeg)} min`
            : `📷 Paga *${mxn(s.centavos)}* con CoDi\n1. Abre la *app de tu banco* → CoDi → Pagar\n2. Escanea este QR o impórtalo desde tu galería\n⚠️ La cámara del celular no lo paga: solo la app del banco.\n⏱️ Vence en ${minutos(config.vigenciaQrSeg)} min`,
        );
      } else {
        // TODO(⚪): dibujar el QR desde qrString si pey no regresa imagen (pey/04: qrImage puede ser null).
        await r.texto("No pudimos dibujar la imagen del QR. Intenta con la solicitud a tu celular.");
      }
      await r.botones("Te aviso aquí en cuanto se confirme ✅", [
        ...(celular ? [{ id: `pago:pn:${grupo}`, titulo: tercero ? "📲 A su celular" : "📲 A mi celular" }] : []),
        { id: `pago:cancelar:${grupo}`, titulo: "Cancelar" },
      ]);
    }
  } catch (e) {
    const err = e as Error;
    const tipo = e instanceof FalloPey ? e.tipo : err.name;
    console.error("[cobro] fallo al crear", { cobro: id, metodo, tipo, requestId: e instanceof FalloPey ? e.requestId : undefined });
    // Sin reintentos a ciegas (AGENTS.md §3): si la push dio timeout pudo haberse creado; ofrecemos QR, no otra push.
    db.prepare("UPDATE cobros SET estado = 'fallido' WHERE id = ?").run(id);
    const noHabilitada = e instanceof FalloPey && (e.tipo === "INVALID_STATE" || e.tipo === "PEY_CONSISTENCY_ERROR");
    await r.botones(
      noHabilitada
        ? "⚠️ La cuenta de cobro todavía no está habilitada. Intenta más tarde."
        : "⚠️ No pudimos generar el cobro en este momento.",
      [
        ...(metodo === "pn" ? [{ id: `pago:qr:${grupo}`, titulo: "📷 Probar con QR" }] : [{ id: `pago:otro:${grupo}`, titulo: "Reintentar" }]),
        { id: "core:menu", titulo: "Menú" },
      ],
    );
  }
}

/** Botones del flujo de pago: pago:qr|pn|otro|cancelar:<grupo>. Devuelve true si lo atendió. */
export async function atenderBotonPago(waId: string, id: string): Promise<boolean> {
  const [, accion, grupo] = id.split(":");
  if (!grupo) return false;
  const ultimo = ultimoDelGrupo(grupo);
  if (!ultimo || ultimo.waId !== waId) return false;
  const r = respuestaPara(waId);

  if (grupoPagado(grupo)) {
    await r.texto("✅ Esa orden ya está pagada.");
    return true;
  }
  if (accion === "cancelar") {
    db.prepare("UPDATE cobros SET cancelado = 1 WHERE grupo = ?").run(grupo);
    await r.botones("Cobro cancelado. Si alcanzaste a autorizarlo en tu banco, te aviso aquí.", [{ id: "core:menu", titulo: "Menú" }]);
    return true;
  }
  if (accion === "qr" || accion === "pn" || accion === "otro") {
    db.prepare("UPDATE cobros SET cancelado = 0 WHERE grupo = ?").run(grupo);
    const metodo: MetodoCobro = accion === "otro" ? ultimo.metodo : (accion as MetodoCobro);
    const { destino, audiencia } = extrasDe(ultimo.id);
    await iniciarCobro(
      waId,
      ultimo.modulo,
      { centavos: ultimo.centavos, concepto: ultimo.concepto, metodo, payload: ultimo.payload, audiencia, ...(destino ? { celular: destino } : {}) },
      grupo,
    );
    return true;
  }
  return false;
}

// ---------- Confirmar ----------
export interface PagoRecibido {
  txId: string;
  centavos: number;
  rastreo?: string | null;
  simulado?: boolean;
  fuente: "webhook" | "polling" | "simulacion";
}

/** Marca un cobro como pagado una sola vez y avisa al módulo. Seguro ante entregas repetidas. */
export async function confirmarPago(cobroId: string, p: PagoRecibido): Promise<"confirmado" | "repetido" | "duplicado" | "monto_distinto" | "no_encontrado"> {
  const c = cobroPorId(cobroId);
  if (!c) return "no_encontrado";
  if (c.estado === "pagado" || c.estado === "duplicado") return "repetido";

  if (p.centavos !== c.centavos) {
    db.prepare("UPDATE cobros SET estado = 'monto_distinto', pey_tx_id = ? WHERE id = ?").run(p.txId, c.id);
    console.error("[cobro] monto distinto", { cobro: c.id, esperado: c.centavos, recibido: p.centavos });
    await respuestaPara(c.waId).texto("⚠️ Recibimos un pago con un monto distinto al cobro. Lo revisaremos y te contactaremos.");
    return "monto_distinto";
  }

  // Bloque síncrono: SQLite en un solo proceso, sin await entre la revisión y la escritura.
  const yaPagado = grupoPagado(c.grupo);
  const nuevoEstado = yaPagado ? "duplicado" : "pagado";
  let cambios = 0;
  try {
    cambios = Number(
      db.prepare(
        `UPDATE cobros SET estado = ?, pagado_en = ?, pey_tx_id = ?, rastreo = ?, simulado = ?
         WHERE id = ? AND estado IN ('pendiente', 'vencido', 'creando', 'fallido')`,
      ).run(nuevoEstado, Date.now(), p.txId, p.rastreo ?? null, p.simulado ? 1 : 0, c.id).changes,
    );
  } catch {
    return "repetido"; // pey_tx_id único: ese pago ya se aplicó a otro cobro
  }
  if (cambios !== 1) return "repetido";
  console.log("[cobro] pagado", { cobro: c.id, transactionId: p.txId, fuente: p.fuente, estado: nuevoEstado });

  if (yaPagado) {
    await respuestaPara(c.waId).texto(
      `⚠️ Recibimos un segundo pago de ${mxn(c.centavos)} para la misma orden. Escríbenos para gestionar la devolución.`,
    );
    return "duplicado";
  }
  try {
    await alConfirmar(cobroPorId(c.id)!);
  } catch (e) {
    console.error("[cobro] el módulo falló al entregar", { cobro: c.id, error: (e as Error).message });
    await respuestaPara(c.waId).texto("✅ Tu pago se recibió. Tuvimos un problema al generar tu comprobante; lo enviaremos en breve.");
  }
  return "confirmado";
}

/** Webhook de pey ya verificado: codi.qr.payment_received / codi.pn.payment_received (pey/09). */
export async function procesarEventoPey(evento: any): Promise<string> {
  const tipo = evento?.type;
  if (tipo !== "codi.qr.payment_received" && tipo !== "codi.pn.payment_received") return "ignorado";
  const peyId = tipo === "codi.qr.payment_received" ? evento.codiQrId : evento.transactionId;
  const c = peyId ? cobroPorPeyId(String(peyId)) : null;
  if (!c) {
    console.warn("[pey] pago sin cobro conocido", { tipo, transactionId: evento?.transactionId });
    return "sin_cobro";
  }
  return confirmarPago(c.id, {
    txId: String(evento.transactionId),
    centavos: desdePesos(Number(evento.amount)),
    rastreo: evento?.metadata?.trackingKey ?? null,
    fuente: "webhook",
  });
}

// ---------- Polling (plan B si el webhook no llega, K03.6) ----------
async function revisar(c: Cobro & { venceEn: number; cancelado: boolean }) {
  if (!c.peyId) return;
  if (c.metodo === "qr") {
    const pago = (await pey.pagosDelQr(c.peyId)).find((t) => t.status === "PAID");
    if (pago) await confirmarPago(c.id, { txId: pago.id, centavos: desdePesos(pago.amount), rastreo: pago.metadata?.trackingKey ?? null, fuente: "polling" });
  } else {
    const t = await pey.transaccion(c.peyId);
    if (t.status === "PAID") await confirmarPago(c.id, { txId: t.id, centavos: desdePesos(t.amount), rastreo: t.metadata?.trackingKey ?? null, fuente: "polling" });
  }
}

async function vencer(c: Cobro & { cancelado: boolean }) {
  const r = db.prepare("UPDATE cobros SET estado = 'vencido' WHERE id = ? AND estado = 'pendiente'").run(c.id);
  if (r.changes !== 1 || c.cancelado || grupoPagado(c.grupo)) return;
  const otroPendiente = db.prepare("SELECT 1 FROM cobros WHERE grupo = ? AND estado = 'pendiente' LIMIT 1").get(c.grupo);
  if (otroPendiente) return;
  await respuestaPara(c.waId).botones(`⌛ Tu cobro de ${mxn(c.centavos)} venció sin pago.`, [
    { id: `pago:otro:${c.grupo}`, titulo: "Generar otro" },
    { id: "core:menu", titulo: "Menú" },
  ]);
}

let corriendo = false;
export async function ciclo() {
  if (corriendo) return;
  corriendo = true;
  try {
    const filas = db.prepare("SELECT * FROM cobros WHERE estado = 'pendiente' ORDER BY seq").all() as any[];
    const GRACIA_MS = 60_000; // un pago autorizado justo al vencer puede tardar en reflejarse
    for (const f of filas) {
      const c = { ...aCobro(f), venceEn: f.vence_en as number, cancelado: f.cancelado === 1 };
      try {
        await revisar(c);
        if (cobroPorId(c.id)?.estado === "pendiente" && Date.now() > c.venceEn + GRACIA_MS) await vencer(c);
      } catch (e) {
        const err = e as FalloPey;
        console.warn("[polling]", { cobro: c.id, http: err.http, tipo: err.tipo ?? err.message });
      }
    }
  } finally {
    corriendo = false;
  }
}

export function iniciarPolling() {
  if (config.pollingMs <= 0) return;
  setInterval(() => void ciclo(), config.pollingMs).unref();
}

/** Solo /dev: simula el pago de un cobro, marcado como SIMULACIÓN en el comprobante. */
export function simularPago(cobroId: string) {
  const c = cobroPorId(cobroId);
  if (!c) return Promise.resolve("no_encontrado" as const);
  return confirmarPago(cobroId, { txId: `SIM-${crypto.randomUUID()}`, centavos: c.centavos, simulado: true, fuente: "simulacion" });
}

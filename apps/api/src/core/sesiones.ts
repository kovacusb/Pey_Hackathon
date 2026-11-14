import { db } from "./db.ts";
import type { Sesion } from "./tipos.ts";

const CADUCIDAD_MS = 30 * 60_000; // tras 30 min sin actividad, la conversación vuelve a empezar

export function leerSesion(waId: string): Sesion {
  const fila = db.prepare("SELECT modulo, paso, datos, actualizado FROM sesiones WHERE wa_id = ?").get(waId) as any;
  if (!fila || Date.now() - fila.actualizado > CADUCIDAD_MS) return { modulo: null, paso: null, datos: {} };
  return { modulo: fila.modulo, paso: fila.paso, datos: JSON.parse(fila.datos) };
}

export function guardarSesion(waId: string, s: Sesion) {
  db.prepare(
    `INSERT INTO sesiones (wa_id, modulo, paso, datos, actualizado) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(wa_id) DO UPDATE SET modulo = excluded.modulo, paso = excluded.paso, datos = excluded.datos, actualizado = excluded.actualizado`,
  ).run(waId, s.modulo, s.paso, JSON.stringify(s.datos), Date.now());
}

export function borrarSesion(waId: string) {
  db.prepare("DELETE FROM sesiones WHERE wa_id = ?").run(waId);
}

// Almacenamiento persistente con SQLite integrado en Node (node:sqlite). Un solo proceso, escrituras síncronas.
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "../config.ts";

function abrir(ruta: string): DatabaseSync {
  if (ruta !== ":memory:") mkdirSync(dirname(ruta), { recursive: true });
  const db = new DatabaseSync(ruta);
  db.exec(`
    PRAGMA journal_mode = WAL;

    -- Estado de conversación por usuario de WhatsApp.
    CREATE TABLE IF NOT EXISTS sesiones (
      wa_id       TEXT PRIMARY KEY,
      modulo      TEXT,
      paso        TEXT,
      datos       TEXT NOT NULL DEFAULT '{}',
      actualizado INTEGER NOT NULL
    );

    -- Cada cobro CoDi que se pide a pey. "grupo" une los intentos de una misma orden (push y luego QR, reintentos):
    -- la orden se entrega una sola vez aunque se paguen dos intentos.
    CREATE TABLE IF NOT EXISTS cobros (
      seq              INTEGER PRIMARY KEY AUTOINCREMENT,
      id               TEXT NOT NULL UNIQUE,
      grupo            TEXT NOT NULL,
      modulo           TEXT NOT NULL,
      wa_id            TEXT NOT NULL,
      metodo           TEXT NOT NULL,          -- 'qr' | 'pn'
      centavos         INTEGER NOT NULL,
      concepto         TEXT NOT NULL,
      num_ref          TEXT NOT NULL,
      pey_id           TEXT,                   -- IDC del QR o transactionId de la push
      estado           TEXT NOT NULL,          -- creando | pendiente | pagado | duplicado | vencido | fallido | monto_distinto
      cancelado        INTEGER NOT NULL DEFAULT 0,
      vence_en         INTEGER,                -- unix ms
      pagado_en        INTEGER,
      pey_tx_id        TEXT UNIQUE,            -- transactionId del pago confirmado (deduplica)
      rastreo          TEXT,                   -- clave de rastreo de Banxico
      simulado         INTEGER NOT NULL DEFAULT 0,
      payload          TEXT NOT NULL DEFAULT '{}',
      creado_en        INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS cobros_pendientes ON cobros(estado, creado_en);
    CREATE INDEX IF NOT EXISTS cobros_pey ON cobros(pey_id);
    CREATE INDEX IF NOT EXISTS cobros_grupo ON cobros(grupo);

    -- Eventos ya procesados (mensajes de WhatsApp y webhooks de pey) para no ejecutar dos veces lo mismo.
    CREATE TABLE IF NOT EXISTS eventos (
      id        TEXT PRIMARY KEY,
      fuente    TEXT NOT NULL,
      creado_en INTEGER NOT NULL
    );
  `);
  return db;
}

export const db = abrir(config.dbPath);

/** Registra un evento; devuelve false si ya se había visto (entrega repetida). */
export function primeraVez(fuente: string, id: string): boolean {
  const r = db
    .prepare("INSERT OR IGNORE INTO eventos (id, fuente, creado_en) VALUES (?, ?, ?)")
    .run(`${fuente}:${id}`, fuente, Date.now());
  return r.changes === 1;
}

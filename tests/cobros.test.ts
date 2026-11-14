// Pruebas del motor de cobros sin red: base en memoria y usuarios "dev" (los mensajes se capturan, no se envían).
import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "1";

let m: typeof import("../src/core/cobros.ts");
let db: typeof import("../src/core/db.ts")["db"];
const entregados: string[] = [];

before(async () => {
  m = await import("../src/core/cobros.ts");
  db = (await import("../src/core/db.ts")).db;
  m.alConfirmarPago(async (c) => {
    entregados.push(c.id);
  });
});

function crear(id: string, grupo: string, peyId: string, centavos = 1) {
  db.prepare(
    `INSERT INTO cobros (id, grupo, modulo, wa_id, metodo, centavos, concepto, num_ref, pey_id, estado, payload, creado_en)
     VALUES (?, ?, 'svc', 'dev5500000009', 'qr', ?, 'Prueba', '1', ?, 'pendiente', '{}', ?)`,
  ).run(id, grupo, centavos, peyId, Date.now());
}

test("celularDe obtiene 10 dígitos de wa_id mexicanos", () => {
  assert.equal(m.celularDe("5215512345678"), "5512345678");
  assert.equal(m.celularDe("525512345678"), "5512345678");
  assert.equal(m.celularDe("dev5512345678"), "5512345678");
  assert.equal(m.celularDe("dev"), null);
});

test("un pago se confirma una sola vez aunque llegue repetido", async () => {
  crear("c1", "g1", "qr1");
  assert.equal(await m.confirmarPago("c1", { txId: "tx1", centavos: 1, fuente: "webhook" }), "confirmado");
  assert.equal(await m.confirmarPago("c1", { txId: "tx1", centavos: 1, fuente: "polling" }), "repetido");
  assert.deepEqual(entregados.filter((x) => x === "c1"), ["c1"]);
});

test("el mismo transactionId no paga dos cobros", async () => {
  crear("c2", "g2", "qr2");
  assert.equal(await m.confirmarPago("c2", { txId: "tx1", centavos: 1, fuente: "webhook" }), "repetido");
  assert.equal(m.cobroPorId("c2")?.estado, "pendiente");
});

test("segundo pago del mismo grupo (push + QR) se marca duplicado y no se entrega", async () => {
  crear("c3", "g3", "pn3");
  crear("c4", "g3", "qr4");
  assert.equal(await m.confirmarPago("c3", { txId: "tx3", centavos: 1, fuente: "webhook" }), "confirmado");
  assert.equal(await m.confirmarPago("c4", { txId: "tx4", centavos: 1, fuente: "webhook" }), "duplicado");
  assert.ok(!entregados.includes("c4"));
});

test("monto distinto no se entrega", async () => {
  crear("c5", "g5", "qr5", 100);
  assert.equal(await m.confirmarPago("c5", { txId: "tx5", centavos: 1, fuente: "webhook" }), "monto_distinto");
  assert.ok(!entregados.includes("c5"));
});

test("evento de webhook de QR se liga por codiQrId", async () => {
  crear("c6", "g6", "qrIDC6");
  const r = await m.procesarEventoPey({ type: "codi.qr.payment_received", codiQrId: "qrIDC6", transactionId: "tx6", amount: 0.01, metadata: { trackingKey: "RASTREO6" } });
  assert.equal(r, "confirmado");
  assert.equal(m.cobroPorId("c6")?.rastreo, "RASTREO6");
  assert.equal(await m.procesarEventoPey({ type: "bank.account.updated" }), "ignorado");
  assert.equal(await m.procesarEventoPey({ type: "codi.pn.payment_received", transactionId: "desconocido", amount: 1 }), "sin_cobro");
});

test("iniciarCobro rechaza montos sobre el tope sin llamar a pey", async () => {
  const antes = (db.prepare("SELECT COUNT(*) AS n FROM cobros").get() as any).n;
  await m.iniciarCobro("dev5500000009", "svc", { centavos: 50_000, concepto: "Demasiado", metodo: "qr", payload: {} });
  assert.equal((db.prepare("SELECT COUNT(*) AS n FROM cobros").get() as any).n, antes);
});

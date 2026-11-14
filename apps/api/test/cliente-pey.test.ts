// Cliente de pey con un fetch falso: sin red.
import { test } from "node:test";
import assert from "node:assert/strict";
import { FalloPey, crearClientePey } from "../src/core/pey/cliente.ts";

function fetchFalso(status: number, cuerpo: unknown, visto: { url?: string; init?: RequestInit }) {
  return (async (url: string, init: RequestInit) => {
    visto.url = url;
    visto.init = init;
    return new Response(JSON.stringify(cuerpo), { status });
  }) as unknown as typeof fetch;
}

test("crearQr manda pesos con 2 decimales, Bearer y generateImage", async () => {
  const visto: { url?: string; init?: RequestInit } = {};
  const pey = crearClientePey({ apiKey: "llave-falsa", fetch: fetchFalso(201, { id: "abc123", qrString: "{}", qrImage: null }, visto) });
  const r = await pey.crearQr({ centavos: 1, concepto: "x".repeat(60), numRef: "42", vigenciaSeg: 600, metadata: { cobro: "c1" } });
  assert.equal(r.id, "abc123");
  assert.equal(visto.url, "https://api.pey.mx/codi/qr");
  assert.equal((visto.init!.headers as Record<string, string>).authorization, "Bearer llave-falsa");
  const body = JSON.parse(String(visto.init!.body));
  assert.equal(body.amount, 0.01);
  assert.equal(body.concept.length, 40);
  assert.equal(body.generateImage, true);
  assert.equal(body.numRef, "42");
});

test("crearPush manda el celular de 10 dígitos", async () => {
  const visto: { url?: string; init?: RequestInit } = {};
  const pey = crearClientePey({ apiKey: "k", fetch: fetchFalso(200, { transactionId: "01ABC", codiId: "1".repeat(20) }, visto) });
  await pey.crearPush({ centavos: 150, concepto: "Prueba", numRef: "1", celular: "5512345678", vigenciaSeg: 360, metadata: {} });
  const body = JSON.parse(String(visto.init!.body));
  assert.equal(visto.url, "https://api.pey.mx/codi/pn");
  assert.equal(body.amount, 1.5);
  assert.equal(body.phoneNumber, "5512345678");
});

test("un error de pey conserva error.type y requestId", async () => {
  const pey = crearClientePey({ apiKey: "k", fetch: fetchFalso(400, { error: { type: "INVALID_STATE", requestId: "req-1", message: "CoDi no habilitado" } }, {}) });
  await assert.rejects(pey.crearQr({ centavos: 1, concepto: "x", numRef: "1", vigenciaSeg: 0, metadata: {} }), (e: unknown) => {
    assert.ok(e instanceof FalloPey);
    assert.equal(e.http, 400);
    assert.equal(e.tipo, "INVALID_STATE");
    assert.equal(e.requestId, "req-1");
    return true;
  });
});

test("pagosDelQr regresa la lista de items", async () => {
  const pey = crearClientePey({ apiKey: "k", fetch: fetchFalso(200, { items: [{ id: "t1", status: "PAID", amount: 0.01 }], nextToken: null }, {}) });
  assert.deepEqual(await pey.pagosDelQr("abc"), [{ id: "t1", status: "PAID", amount: 0.01 }]);
});

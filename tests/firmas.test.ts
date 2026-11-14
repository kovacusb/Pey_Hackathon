import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { firmaPeyValida } from "../src/core/pey/firma.ts";
import { firmaMetaValida } from "../src/core/whatsapp/recibir.ts";

// Vector de ejemplo de la implementación de referencia de Standard Webhooks (Svix).
const vector = {
  secreto: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
  id: "msg_p5jXN8AQM9LWM0D4loKWxJek",
  timestamp: "1614265330",
  cuerpo: '{"test": 2432232314}',
  firmas: "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
  ahoraSeg: 1614265330,
};

test("pey: acepta la firma del vector de Standard Webhooks", () => {
  assert.equal(firmaPeyValida(vector), true);
});

test("pey: acepta si una de varias firmas es válida", () => {
  assert.equal(firmaPeyValida({ ...vector, firmas: `v1,AAAA ${vector.firmas}` }), true);
});

test("pey: rechaza cuerpo alterado, timestamp viejo y secreto vacío", () => {
  assert.equal(firmaPeyValida({ ...vector, cuerpo: '{"test": 1}' }), false);
  assert.equal(firmaPeyValida({ ...vector, ahoraSeg: 1614265330 + 3600 }), false);
  assert.equal(firmaPeyValida({ ...vector, secreto: "" }), false);
});

test("Meta: valida X-Hub-Signature-256 sobre el cuerpo crudo", () => {
  const secreto = "app-secret-de-prueba";
  const cuerpo = Buffer.from('{"entry":[]}');
  const firma = "sha256=" + crypto.createHmac("sha256", secreto).update(cuerpo).digest("hex");
  assert.equal(firmaMetaValida(secreto, cuerpo, firma), true);
  assert.equal(firmaMetaValida(secreto, Buffer.from('{"entry":[1]}'), firma), false);
  assert.equal(firmaMetaValida(secreto, cuerpo, undefined), false);
});

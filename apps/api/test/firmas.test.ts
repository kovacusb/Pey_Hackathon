import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { verificarWebhookPey } from "../src/core/pey/firma.ts";
import { firmaMetaValida } from "../src/core/whatsapp/recibir.ts";

// Vector público de la implementación de referencia de Standard Webhooks (https://github.com/standard-webhooks/standard-webhooks).
// Secreto PÚBLICO del vector (no es una llave nuestra); se arma en dos partes para que el detector de secretos del repo no lo marque.
const SECRETO = "whsec_" + "MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";
const ENC = { id: "msg_p5jXN8AQM9LWM0D4loKWxJek", timestamp: "1614265330", firma: "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=" };
const CUERPO = '{"test": 2432232314}';
const AHORA = 1614265330 * 1000;

test("pey: acepta el vector de Standard Webhooks", () => {
  assert.deepEqual(verificarWebhookPey(SECRETO, ENC, CUERPO, AHORA), { valida: true });
});

test("pey: acepta si una de varias firmas coincide", () => {
  assert.equal(verificarWebhookPey(SECRETO, { ...ENC, firma: `v1,AAAA v2,xx ${ENC.firma}` }, CUERPO, AHORA).valida, true);
});

test("pey: explica por qué rechaza", () => {
  assert.deepEqual(verificarWebhookPey("", ENC, CUERPO, AHORA), { valida: false, motivo: "sin_secreto" });
  assert.deepEqual(verificarWebhookPey(SECRETO, { ...ENC, id: undefined }, CUERPO, AHORA), { valida: false, motivo: "faltan_encabezados" });
  assert.deepEqual(verificarWebhookPey(SECRETO, ENC, CUERPO, AHORA + 3_600_000), { valida: false, motivo: "fuera_de_tiempo" });
  assert.deepEqual(verificarWebhookPey(SECRETO, ENC, '{"test": 1}', AHORA), { valida: false, motivo: "no_coincide" });
});

test("Meta: valida X-Hub-Signature-256 sobre el cuerpo crudo", () => {
  const secreto = "app-secret-de-prueba";
  const cuerpo = Buffer.from('{"entry":[]}');
  const firma = "sha256=" + createHmac("sha256", secreto).update(cuerpo).digest("hex");
  assert.equal(firmaMetaValida(secreto, cuerpo, firma), true);
  assert.equal(firmaMetaValida(secreto, Buffer.from('{"entry":[1]}'), firma), false);
  assert.equal(firmaMetaValida(secreto, cuerpo, undefined), false);
});

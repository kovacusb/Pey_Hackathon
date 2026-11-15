// Se contesta desde el mismo número del negocio al que escribió la persona (metadata.phone_number_id).
import { test } from "node:test";
import assert from "node:assert/strict";

process.env.DB_PATH = ":memory:";
process.env.WHATSAPP_TOKEN = "token-falso";
process.env.WHATSAPP_PHONE_NUMBER_ID = "111"; // número configurado (p. ej. el de prueba)

test("la respuesta sale del número que recibió el mensaje, no del configurado", async () => {
  const urls: string[] = [];
  globalThis.fetch = (async (url: string) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ messages: [{ id: "x" }] }), { status: 200 });
  }) as unknown as typeof fetch;
  const { extraerMensajes } = await import("../src/core/whatsapp/recibir.ts");
  const { enviar, recordarNumeroNegocio } = await import("../src/core/whatsapp/enviar.ts");

  const [m] = extraerMensajes({ entry: [{ changes: [{ value: { metadata: { phone_number_id: "999" }, contacts: [], messages: [{ id: "w1", from: "5215511112222", type: "text", text: { body: "hola" } }] } }] }] });
  assert.equal(m.numeroNegocio, "999");
  recordarNumeroNegocio(m.waId, m.numeroNegocio);
  await enviar(m.waId, { tipo: "texto", cuerpo: "hola" });
  assert.match(urls.at(-1)!, /\/999\/messages$/);

  await enviar("5215533334444", { tipo: "texto", cuerpo: "sin número recordado" });
  assert.match(urls.at(-1)!, /\/111\/messages$/); // sin dato, usa el configurado
});

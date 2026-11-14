// Flujo completo de la tiendita a través del router y del motor de cobros, con un pey falso (sin red).
import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "1";
process.env.WHATSAPP_TOKEN = "";

const WA = "dev5512345678"; // usuario de prueba: los mensajes se capturan, no se envían
let bot: typeof import("../src/core/bot.ts");
let cobros: typeof import("../src/core/cobros.ts");
let buzon: typeof import("../src/core/whatsapp/enviar.ts")["buzon"];
const creados: { tipo: string; centavos: number }[] = [];

before(async () => {
  bot = await import("../src/core/bot.ts");
  cobros = await import("../src/core/cobros.ts");
  buzon = (await import("../src/core/whatsapp/enviar.ts")).buzon;
  bot.registrarModulo((await import("../src/modules/tienda/index.ts")).tienda);
  cobros.usarClientePey({
    async crearQr(p) {
      creados.push({ tipo: "qr", centavos: p.centavos });
      return { id: "IDC-PRUEBA", qrString: "{}", qrImage: Buffer.from("png").toString("base64") };
    },
    async crearPush(p) {
      creados.push({ tipo: "pn", centavos: p.centavos });
      return { transactionId: "TX-PUSH", codiId: "0".repeat(20) };
    },
    async pagosDelQr() {
      return [];
    },
    async transaccion(id) {
      return { id, status: "PENDING", amount: 0 };
    },
  });
});

const ultimo = () => buzon(WA).at(-1)!.mensaje as any;

test("compra en la tiendita → push → pey confirma → comprobante", async () => {
  await bot.procesarMensaje(WA, null, { tipo: "boton", id: "tienda:inicio" });
  assert.equal(ultimo().tipo, "lista");
  assert.ok(ultimo().secciones[0].filas.every((f: any) => f.id.startsWith("tienda:prod:")));

  await bot.procesarMensaje(WA, null, { tipo: "boton", id: "tienda:prod:chicle" });
  await bot.procesarMensaje(WA, null, { tipo: "boton", id: "tienda:prod:paleta" });
  await bot.procesarMensaje(WA, null, { tipo: "boton", id: "tienda:pagar" });
  assert.ok(ultimo().botones.some((b: any) => b.id === "tienda:push"));

  await bot.procesarMensaje(WA, null, { tipo: "boton", id: "tienda:push" });
  assert.deepEqual(creados.at(-1), { tipo: "pn", centavos: 30 }); // chicle $0.10 + paleta $0.20, del catálogo

  const r = await cobros.procesarEventoPey({ type: "codi.pn.payment_received", transactionId: "TX-PUSH", amount: 0.3, metadata: { trackingKey: "RASTREO" } });
  assert.equal(r, "confirmado");
  assert.match(ultimo().cuerpo, /Pago recibido/);
  assert.match(ultimo().cuerpo, /RASTREO/);
});

test("un texto con la sesión en la tiendita lo atiende la tiendita; 'menú' regresa al principal", async () => {
  await bot.procesarMensaje(WA, null, { tipo: "boton", id: "tienda:inicio" });
  await bot.procesarMensaje(WA, null, { tipo: "texto", texto: "quiero algo" });
  assert.match(ultimo().cuerpo, /Elige un producto|tiendita/);
  await bot.procesarMensaje(WA, null, { tipo: "texto", texto: "menú" });
  assert.equal(ultimo().textoBoton, "Ver opciones");
});

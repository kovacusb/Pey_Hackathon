// Decisiones del 15-nov: servicios y recargas son SIMULACIÓN completa (sin cobro en pey) y el cobro rápido
// cobra el monto real, sin forzar $0.01, hasta el tope MAX_MONTO_MXN.
import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "500";
process.env.DEMO_COBRO_MXN = "0";
delete process.env.SERVICIOS_SIMULADOS;
process.env.WHATSAPP_TOKEN = "";

let bot: typeof import("../src/core/bot.ts");
let cobros: typeof import("../src/core/cobros.ts");
let buzon: typeof import("../src/core/whatsapp/enviar.ts")["buzon"];
const llamadasPey: { tipo: string; centavos: number }[] = [];

before(async () => {
  bot = await import("../src/core/bot.ts");
  cobros = await import("../src/core/cobros.ts");
  buzon = (await import("../src/core/whatsapp/enviar.ts")).buzon;
  bot.registrarModulo((await import("../src/modules/servicios/index.ts")).servicios);
  bot.registrarModulo((await import("../src/modules/p2p/index.ts")).p2p);
  cobros.usarClientePey({
    async crearQr(p) {
      llamadasPey.push({ tipo: "qr", centavos: p.centavos });
      return { id: "IDC-M", qrString: "{}", qrImage: null };
    },
    async crearPush(p) {
      llamadasPey.push({ tipo: "pn", centavos: p.centavos });
      return { transactionId: "TX-M", codiId: "0".repeat(20) };
    },
    async pagosDelQr() {
      return [];
    },
    async transaccion(id) {
      return { id, status: "PENDING", amount: 0 };
    },
  });
});

const ultimo = (wa: string) => buzon(wa).at(-1)!.mensaje as any;

test("servicios: SIMULACIÓN completa, sin llamar a pey, con comprobante marcado", async () => {
  const WA = "dev5500001111";
  const e = (x: any) => bot.procesarMensaje(WA, null, x);
  await e({ tipo: "boton", id: "svc:srv:cfe" });
  await e({ tipo: "texto", texto: "123456789012" });
  assert.match(ultimo(WA).cuerpo, /SIMULACIÓN/);
  assert.deepEqual(ultimo(WA).botones.map((b: any) => b.id), ["svc:pagar:pn", "core:menu"]);
  await e({ tipo: "boton", id: "svc:pagar:pn" });
  assert.equal(llamadasPey.length, 0, "no debe crear Mensajes de Cobro en pey");
  assert.match(ultimo(WA).cuerpo, /SIMULACIÓN · no es un pago real/);
  assert.match(ultimo(WA).cuerpo, /no se movió dinero/);
  await e({ tipo: "boton", id: "svc:historial" });
  assert.match(ultimo(WA).cuerpo, /SIMULACIÓN/);
});

test("cobro rápido: cobra el monto real (no $0.01) y respeta el tope", async () => {
  const WA = "dev5500002222";
  const e = (x: any) => bot.procesarMensaje(WA, null, x);
  await e({ tipo: "boton", id: "p2p:inicio" });
  await e({ tipo: "texto", texto: "800" });
  assert.match(ultimo(WA).cuerpo, /máximo por cobro es \*\$500\.00\*/);
  await e({ tipo: "texto", texto: "125.50" });
  await e({ tipo: "boton", id: "p2p:con:tecnico" });
  assert.doesNotMatch(ultimo(WA).cuerpo, /Demo/);
  await e({ tipo: "boton", id: "p2p:metodo:qr" });
  assert.deepEqual(llamadasPey.at(-1), { tipo: "qr", centavos: 12550 });
});

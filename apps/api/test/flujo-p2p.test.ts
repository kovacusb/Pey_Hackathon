// Cobro rápido + factura, de punta a punta con un pey falso y el facturador SIMULADO (sin red).
import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "1";
process.env.DEMO_COBRO_MXN = "0.01";
process.env.WHATSAPP_TOKEN = "";
delete process.env.FACTURAMA_USUARIO;

const WA = "dev5511112222"; // profesionista
let bot: typeof import("../src/core/bot.ts");
let cobros: typeof import("../src/core/cobros.ts");
let buzon: typeof import("../src/core/whatsapp/enviar.ts")["buzon"];
const pushes: { celular: string; centavos: number }[] = [];

before(async () => {
  bot = await import("../src/core/bot.ts");
  cobros = await import("../src/core/cobros.ts");
  buzon = (await import("../src/core/whatsapp/enviar.ts")).buzon;
  bot.registrarModulo((await import("../src/modules/p2p/index.ts")).p2p);
  cobros.usarClientePey({
    async crearQr() {
      return { id: "IDC-P2P", qrString: "{}", qrImage: Buffer.from("png").toString("base64") };
    },
    async crearPush(p) {
      pushes.push({ celular: p.celular, centavos: p.centavos });
      return { transactionId: "TX-P2P", codiId: "0".repeat(20) };
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
const enviar = (e: { tipo: "texto"; texto: string } | { tipo: "boton"; id: string }) => bot.procesarMensaje(WA, null, e);

test("leerMonto entiende formatos comunes y rechaza basura", async () => {
  const { leerMonto } = await import("../src/modules/p2p/index.ts");
  assert.equal(leerMonto("350"), 35000);
  assert.equal(leerMonto("$1,250.50"), 125050);
  assert.equal(leerMonto("80 pesos"), 8000);
  assert.equal(leerMonto("hola"), null);
  assert.equal(leerMonto("0"), null);
});

test("desglose de IVA cuadra", async () => {
  const { desglose } = await import("../src/core/facturacion/index.ts");
  const d = desglose(35000);
  assert.equal(d.subtotal + d.iva, d.total);
  assert.equal(d.subtotal, 30172);
  assert.equal(d.iva, 4828);
});

test("cobro rápido: push al cliente (con su aceptación) → pago → factura PDF simulada", async () => {
  await enviar({ tipo: "boton", id: "p2p:inicio" });
  await enviar({ tipo: "texto", texto: "$350" });
  assert.equal(ultimo().tipo, "lista");
  await enviar({ tipo: "boton", id: "p2p:con:consulta" });
  assert.match(ultimo().cuerpo, /Consulta médica/);
  assert.match(ultimo().cuerpo, /\$350\.00/);

  await enviar({ tipo: "boton", id: "p2p:metodo:pn" });
  await enviar({ tipo: "texto", texto: "55 9876 5432" });
  assert.match(ultimo().cuerpo, /aceptó/); // pide confirmación explícita antes de mandar la solicitud
  assert.equal(pushes.length, 0);
  await enviar({ tipo: "boton", id: "p2p:enviar" });
  assert.deepEqual(pushes.at(-1), { celular: "5598765432", centavos: 1 }); // al celular del cliente, monto de demo
  assert.match(ultimo().cuerpo, /•••• 5432/);

  assert.equal(await cobros.procesarEventoPey({ type: "codi.pn.payment_received", transactionId: "TX-P2P", amount: 0.01, metadata: { trackingKey: "RASTREOP2P" } }), "confirmado");
  assert.match(ultimo().cuerpo, /Cobro recibido/);
  const facturar = ultimo().botones.find((b: any) => b.id.startsWith("p2p:fac:"));
  assert.ok(facturar);

  await enviar({ tipo: "boton", id: facturar.id });
  await enviar({ tipo: "texto", texto: "abc" }); // RFC inválido
  assert.match(ultimo().cuerpo, /no parece válido/);
  await enviar({ tipo: "texto", texto: "GODE561231GR8" });
  await enviar({ tipo: "texto", texto: "Emilio González Durán" });
  await enviar({ tipo: "texto", texto: "06000" });
  await enviar({ tipo: "boton", id: "p2p:reg:612" });
  await enviar({ tipo: "boton", id: "p2p:uso:D01" });
  assert.match(ultimo().cuerpo, /GODE561231GR8/);
  assert.match(ultimo().cuerpo, /SIMULACIÓN/);

  await enviar({ tipo: "boton", id: "p2p:emitir" });
  const doc = buzon(WA).map((c) => c.mensaje as any).find((m) => m.tipo === "documento");
  assert.ok(doc, "debe mandar el PDF");
  assert.match(doc.nombre, /^Factura-PF-\d+\.pdf$/);
  const pdf = Buffer.from(doc.dataUrl.split(",")[1], "base64").toString("latin1");
  assert.ok(pdf.startsWith("%PDF-1.4"));
  assert.ok(pdf.includes("SIN VALIDEZ FISCAL"));
  assert.ok(pdf.includes("GODE561231GR8"));
  // startxref apunta a la tabla xref
  const inicio = Number(/startxref\n(\d+)/.exec(pdf)![1]);
  assert.equal(pdf.slice(inicio, inicio + 4), "xref");

  // no se factura dos veces
  await enviar({ tipo: "boton", id: facturar.id });
  assert.match(ultimo().cuerpo, /ya tiene la factura/);
});

test("un audio o foto recibe respuesta clara sin romper la sesión", async () => {
  await enviar({ tipo: "boton", id: "p2p:inicio" });
  await bot.procesarMensaje(WA, null, { tipo: "otro" });
  assert.match(ultimo().cuerpo, /solo entiendo texto y botones/);
});

// Lo que un usuario malintencionado (o un juez curioso) intentaría. Prueba de ataque del 15-nov, sin red.
import { test, before } from "node:test";
import assert from "node:assert/strict";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "1000";
process.env.DEMO_COBRO_MXN = "0";
process.env.WHATSAPP_TOKEN = "";

let bot: typeof import("../src/core/bot.ts");
let cobros: typeof import("../src/core/cobros.ts");
let db: typeof import("../src/core/db.ts")["db"];
let buzon: typeof import("../src/core/whatsapp/enviar.ts")["buzon"];
const llamadas: { tipo: string; centavos: number; celular?: string }[] = [];

before(async () => {
  bot = await import("../src/core/bot.ts");
  cobros = await import("../src/core/cobros.ts");
  db = (await import("../src/core/db.ts")).db;
  buzon = (await import("../src/core/whatsapp/enviar.ts")).buzon;
  bot.registrarModulo((await import("../src/modules/servicios/index.ts")).servicios);
  bot.registrarModulo((await import("../src/modules/p2p/index.ts")).p2p);
  let n = 0;
  cobros.usarClientePey({
    async crearQr(p) {
      llamadas.push({ tipo: "qr", centavos: p.centavos });
      return { id: `Q${++n}`, qrString: "{}", qrImage: null };
    },
    async crearPush(p) {
      llamadas.push({ tipo: "pn", centavos: p.centavos, celular: p.celular });
      return { transactionId: `T${++n}`, codiId: "0" };
    },
    async pagosDelQr() {
      return [];
    },
    async transaccion(id) {
      return { id, status: "PENDING", amount: 0 };
    },
  });
});

const ultimo = (wa: string) => (buzon(wa).at(-1)!.mensaje as any).cuerpo as string;
const m = (wa: string, e: any) => bot.procesarMensaje(wa, null, e);
async function hastaMetodo(wa: string, monto: string) {
  await m(wa, { tipo: "boton", id: "p2p:inicio" });
  await m(wa, { tipo: "texto", texto: monto });
  await m(wa, { tipo: "boton", id: "p2p:con:tecnico" });
}

test("un número extranjero nunca se convierte en un celular de México (no se manda push a desconocidos)", () => {
  assert.equal(cobros.celularDe("14155551234"), null); // EE.UU.
  assert.equal(cobros.celularDe("5491123456789"), null); // Argentina
  assert.equal(cobros.celularDe("5215512345678"), "5512345678");
  assert.equal(cobros.celularDe("525512345678"), "5512345678");
});

test("celular escrito por una persona: acepta +52 y formatos comunes, rechaza lo demás", () => {
  assert.equal(cobros.normalizarCelular("+52 55 1234 5678"), "5512345678");
  assert.equal(cobros.normalizarCelular("(55) 1234-5678"), "5512345678");
  assert.equal(cobros.normalizarCelular("+52 1 55 1234 5678"), "5512345678");
  assert.equal(cobros.normalizarCelular("+1 415 555 1234"), null);
  assert.equal(cobros.normalizarCelular("123"), null);
});

test("montos: cero, negativos, exponentes, 3 decimales y arriba del tope se rechazan", async () => {
  const wa = "dev5500000101";
  for (const t of ["0", "0.001", "-50", "1e5", "500.555", "1001", "99999999999999999999"]) {
    await m(wa, { tipo: "boton", id: "p2p:inicio" });
    await m(wa, { tipo: "texto", texto: t });
    assert.match(ultimo(wa), /Escribe solo el monto|máximo por cobro/, `monto ${t}`);
  }
  assert.equal(llamadas.length, 0);
});

test("doble o triple toque en el botón de cobro crea un solo cobro", async () => {
  const wa = "dev5500000102";
  await hastaMetodo(wa, "100");
  const antes = llamadas.length;
  await Promise.all([1, 2, 3].map(() => m(wa, { tipo: "boton", id: "p2p:metodo:qr" })));
  assert.equal(llamadas.length - antes, 1);
});

test("antispam: máximo 3 solicitudes push al mismo celular en 10 minutos", async () => {
  const wa = "dev5500000103";
  const antes = llamadas.filter((l) => l.celular === "5598765432").length;
  for (let i = 0; i < 5; i++) {
    await hastaMetodo(wa, "10");
    await m(wa, { tipo: "boton", id: "p2p:metodo:pn" });
    await m(wa, { tipo: "texto", texto: "+52 55 9876 5432" });
    await m(wa, { tipo: "boton", id: "p2p:enviar" });
  }
  assert.equal(llamadas.filter((l) => l.celular === "5598765432").length - antes, 3);
  assert.match(ultimo(wa), /varias solicitudes a ese celular/);
});

test("botones ajenos, viejos o inventados no cobran ni facturan", async () => {
  const otro = db.prepare("SELECT grupo, id FROM cobros LIMIT 1").get() as { grupo: string; id: string };
  const wa = "dev5500000104";
  const antes = llamadas.length;
  await m(wa, { tipo: "boton", id: `pago:pn:${otro.grupo}` }); // pago de otra persona
  await m(wa, { tipo: "boton", id: `p2p:fac:${otro.id}` }); // factura de otra persona
  assert.match(ultimo(wa), /No encontré ese cobro/);
  await m(wa, { tipo: "boton", id: "svc:recmonto:99999" }); // monto inventado
  await m(wa, { tipo: "boton", id: "svc:pagar:pn" }); // pagar sin confirmar
  await m(wa, { tipo: "boton", id: "p2p:enviar" }); // push sin flujo
  await m(wa, { tipo: "boton", id: "x".repeat(5000) });
  assert.equal(llamadas.length, antes);
});

// Panel del negocio (/panel): ajustes y catálogo que maneja el comercio, y pedidos leídos de los cobros del núcleo.
// Sin red: pey es un cliente falso y WhatsApp se captura en el buzón de /dev.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";

process.env.DB_PATH = ":memory:";
process.env.POLLING_MS = "0";
process.env.MAX_MONTO_MXN = "1";
process.env.WHATSAPP_TOKEN = "";

const WA = "dev5512340000"; // usuario de prueba (ficticio)
let bot: typeof import("../src/core/bot.ts");
let cobros: typeof import("../src/core/cobros.ts");
let datos: typeof import("../src/modules/tienda/datos.ts");
let buzon: typeof import("../src/core/whatsapp/enviar.ts")["buzon"];
let servidor: Server;
let base = "";

before(async () => {
  bot = await import("../src/core/bot.ts");
  cobros = await import("../src/core/cobros.ts");
  datos = await import("../src/modules/tienda/datos.ts");
  buzon = (await import("../src/core/whatsapp/enviar.ts")).buzon;
  bot.registrarModulo((await import("../src/modules/tienda/index.ts")).tienda);
  cobros.usarClientePey({
    async crearQr() {
      return { id: "IDC-PANEL", qrString: "{}", qrImage: Buffer.from("png").toString("base64") };
    },
    async crearPush() {
      return { transactionId: "TX-PANEL", codiId: "0".repeat(20) };
    },
    async pagosDelQr() {
      return [];
    },
    async transaccion(id) {
      return { id, status: "PENDING", amount: 0 };
    },
  });
  const express = (await import("express")).default;
  const { rutasPanel } = await import("../src/modules/tienda/panel.ts");
  const app = express();
  app.use("/panel", rutasPanel());
  await new Promise<void>((listo) => {
    servidor = app.listen(0, () => listo());
  });
  const dir = servidor.address();
  base = `http://127.0.0.1:${typeof dir === "object" && dir ? dir.port : 0}`;
});

after(() => servidor?.close());

const ultimo = () => buzon(WA).at(-1)!.mensaje as any;
const boton = (id: string) => bot.procesarMensaje(WA, "Prueba", { tipo: "boton", id });

test("la primera vez siembra el catálogo de demo y ajustes por defecto", () => {
  assert.equal(datos.listarProductos().length, 8);
  assert.equal(datos.leerAjustes().activo, true);
});

test("validaciones: nombre ≤ 24, precio dentro del tope, máximo 10 productos", () => {
  assert.throws(() => datos.crearProducto({ nombre: "x".repeat(25), precioCentavos: 10 }), datos.DatoInvalido);
  assert.throws(() => datos.crearProducto({ nombre: "Caro", precioCentavos: 101 }), datos.DatoInvalido);
  assert.throws(() => datos.crearProducto({ nombre: "Gratis", precioCentavos: 0 }), datos.DatoInvalido);
  datos.crearProducto({ nombre: "Tortillas", precioCentavos: 50 });
  datos.crearProducto({ nombre: "Huevo", precioCentavos: 45 });
  assert.throws(() => datos.crearProducto({ nombre: "El once", precioCentavos: 10 }), /Máximo 10/);
  assert.throws(() => datos.guardarAjustes({ nombre: "" }), datos.DatoInvalido);
});

test("el bot usa el nombre, el saludo y el catálogo del panel; lo no disponible no aparece", async () => {
  datos.guardarAjustes({ nombre: "Abarrotes Lupita", saludo: "¡Bienvenido a Abarrotes Lupita!" });
  const chicle = datos.listarProductos().find((p) => p.sku === "chicle")!;
  datos.actualizarProducto(chicle.sku, { disponible: false });
  await boton("tienda:inicio");
  const m = ultimo();
  assert.equal(m.tipo, "lista");
  assert.match(m.cuerpo, /Bienvenido a Abarrotes Lupita/);
  assert.equal(m.secciones[0].titulo, "Abarrotes Lupita");
  const titulos = m.secciones[0].filas.map((f: any) => f.titulo);
  assert.ok(titulos.includes("Tortillas"));
  assert.ok(!titulos.includes("Chicle"));
  datos.actualizarProducto(chicle.sku, { disponible: true });
});

test("con la tienda cerrada el bot no toma pedidos", async () => {
  datos.guardarAjustes({ activo: false });
  await boton("tienda:inicio");
  assert.match(ultimo().cuerpo, /está cerrada/);
  datos.guardarAjustes({ activo: true });
});

test("un pedido aparece pendiente y, al simular el pago, como pagado SIMULACIÓN (no cuenta como venta real)", async () => {
  await boton("tienda:inicio");
  await boton("tienda:prod:agua");
  await boton("tienda:pagar");
  await boton("tienda:qr");
  const [pedido] = datos.listarPedidos();
  assert.equal(pedido!.estado, "pendiente");
  assert.equal(pedido!.centavos, 30);
  assert.equal(pedido!.cliente, "•••• 0000");
  assert.deepEqual(pedido!.articulos.map((a) => a.nombre), ["Agua 600 ml"]);
  assert.equal(datos.resumen().pendientes, 1);

  const pendiente = cobros.pendientesDe(WA)[0]!;
  await cobros.simularPago(pendiente.id);
  const [pagado] = datos.listarPedidos();
  assert.equal(pagado!.estado, "pagado");
  assert.equal(pagado!.simulado, true);
  const r = datos.resumen();
  assert.equal(r.ventasHoyCentavos, 0);
  assert.equal(r.simuladosHoyCentavos, 30);
  assert.equal(r.pendientes, 0);
});

test("rutas HTTP del panel: estado, ajustes y productos con errores legibles", async () => {
  const estado = await fetch(`${base}/panel/api/estado`).then((r) => r.json());
  assert.equal(estado.ajustes.nombre, "Abarrotes Lupita");
  assert.equal(estado.topeCentavos, 100);
  assert.ok(Array.isArray(estado.pedidos) && estado.pedidos.length >= 1);

  const html = await fetch(`${base}/panel`);
  assert.equal(html.status, 200);
  assert.match(await html.text(), /Panel del negocio/);

  const malo = await fetch(`${base}/panel/api/productos/chicle`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ precioCentavos: 500 }),
  });
  assert.equal(malo.status, 400);
  assert.match((await malo.json()).error, /tope/);

  const bien = await fetch(`${base}/panel/api/ajustes`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ nombre: "Miscelánea Sol" }),
  });
  assert.equal(bien.status, 200);
  assert.equal(datos.leerAjustes().nombre, "Miscelánea Sol");

  const borrar = await fetch(`${base}/panel/api/productos/no-existe`, { method: "DELETE" });
  assert.equal(borrar.status, 400);
});

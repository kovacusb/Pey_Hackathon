import assert from "node:assert/strict";
import { test } from "node:test";
import { ESTADO_INICIAL, LIMITES, responder, type Contexto, type Estado, type Evento, type Mensaje, type Resultado } from "../src/modules/tienda/motor.ts";
import { CATALOGO_DEMO } from "../src/modules/tienda/catalogo.ts";

const ctx: Contexto = { catalogo: CATALOGO_DEMO, maxMontoCentavos: 100, ultimos4: "5678" };

function lista(m: Mensaje | undefined): Extract<Mensaje, { tipo: "lista" }> {
  if (m?.tipo !== "lista") throw new Error(`se esperaba lista, llegó ${m?.tipo}`);
  return m;
}
function botones(m: Mensaje | undefined): Extract<Mensaje, { tipo: "botones" }> {
  if (m?.tipo !== "botones") throw new Error(`se esperaban botones, llegó ${m?.tipo}`);
  return m;
}
/** Aplica varios eventos seguidos y devuelve el último resultado. */
function conversar(eventos: Evento[], c: Contexto = ctx, inicio: Estado = ESTADO_INICIAL): Resultado {
  let estado = inicio;
  let ultimo: Resultado | undefined;
  for (const [i, e] of eventos.entries()) {
    ultimo = responder(estado, e, c);
    estado = ultimo.estado;
    if (i < eventos.length - 1) assert.equal(ultimo.cobro, undefined, `cobro inesperado en el paso ${i}`);
  }
  if (!ultimo) throw new Error("conversar() necesita al menos un evento");
  return ultimo;
}

test("cualquier texto muestra el menú dentro de los límites de WhatsApp", () => {
  const m = lista(responder(ESTADO_INICIAL, { tipo: "texto", texto: "hola" }, ctx).mensajes[0]);
  assert.ok(m.renglones.length > 0 && m.renglones.length <= LIMITES.renglones);
  for (const r of m.renglones) {
    assert.ok(r.titulo.length <= LIMITES.tituloRenglon, r.titulo);
    assert.ok((r.descripcion ?? "").length <= LIMITES.descripcion);
  }
  assert.ok(m.boton.length <= LIMITES.botonLista);
  assert.ok(m.seccion.length <= LIMITES.seccion);
  assert.ok((m.pie ?? "").length <= LIMITES.pie);
  assert.match(m.cuerpo, /Paga Fácil/);
});

test("elegir un producto lo suma al carrito y ofrece pagar", () => {
  const r = conversar([{ tipo: "lista", id: "prod:chicle" }, { tipo: "lista", id: "prod:chicle" }]);
  assert.deepEqual(r.estado.carrito, { chicle: 2 });
  const m = botones(r.mensajes[0]);
  assert.deepEqual(m.botones.map((b) => b.id), ["mas", "pagar", "vaciar"]);
  for (const b of m.botones) assert.ok(b.titulo.length <= LIMITES.tituloBoton, b.titulo);
  assert.match(m.cuerpo, /Total: \$0\.20/);
});

test("pagar ofrece push (con los últimos 4 dígitos) y QR", () => {
  const r = conversar([{ tipo: "lista", id: "prod:chicle" }, { tipo: "lista", id: "prod:papas" }, { tipo: "boton", id: "pagar" }]);
  assert.equal(r.estado.etapa, "confirmando");
  const m = botones(r.mensajes[0]);
  assert.deepEqual(m.botones.map((b) => b.id), ["push", "qr", "cancelar"]);
  assert.ok(m.botones.length <= LIMITES.botones);
  assert.match(m.cuerpo, /5678/);
  assert.match(m.cuerpo, /\$0\.45/);
});

test("confirmar crea la solicitud de cobro con el monto del catálogo y vacía el carrito", () => {
  const r = conversar([
    { tipo: "lista", id: "prod:chicle" },
    { tipo: "lista", id: "prod:papas" },
    { tipo: "boton", id: "pagar" },
    { tipo: "boton", id: "push" },
  ]);
  assert.deepEqual(r.cobro, {
    canal: "push",
    montoCentavos: 45,
    partidas: [
      { sku: "chicle", nombre: "Chicle", cantidad: 1, precioCentavos: 10 },
      { sku: "papas", nombre: "Papas", cantidad: 1, precioCentavos: 35 },
    ],
  });
  assert.deepEqual(r.estado, { carrito: {}, etapa: "comprando" });
});

test("sin número mexicano no se ofrece push, y el botón push no cobra", () => {
  const sinCel: Contexto = { ...ctx, ultimos4: undefined };
  const pagar = conversar([{ tipo: "lista", id: "prod:agua" }, { tipo: "boton", id: "pagar" }], sinCel);
  assert.deepEqual(botones(pagar.mensajes[0]).botones.map((b) => b.id), ["qr", "cancelar"]);
  const push = responder(pagar.estado, { tipo: "boton", id: "push" }, sinCel);
  assert.equal(push.cobro, undefined);
});

test("un total arriba del tope no llega a confirmación ni a cobro", () => {
  const tres = Array.from({ length: 3 }, (): Evento => ({ tipo: "lista", id: "prod:refresco" }));
  const r = conversar([...tres, { tipo: "boton", id: "pagar" }]);
  assert.equal(r.estado.etapa, "comprando");
  assert.deepEqual(botones(r.mensajes[0]).botones.map((b) => b.id), ["vaciar"]);
  assert.match(botones(r.mensajes[0]).cuerpo, /\$1\.20.*\$1\.00/);
  assert.equal(responder(r.estado, { tipo: "boton", id: "qr" }, ctx).cobro, undefined);
});

test("un botón viejo (sin pasar por Pagar) no cobra", () => {
  const r = conversar([{ tipo: "lista", id: "prod:pan" }, { tipo: "boton", id: "qr" }]);
  assert.equal(r.cobro, undefined);
  assert.equal(r.mensajes[0]?.tipo, "texto");
});

test("un producto que no existe no se agrega", () => {
  const r = responder(ESTADO_INICIAL, { tipo: "lista", id: "prod:no-existe" }, ctx);
  assert.deepEqual(r.estado.carrito, {});
  assert.equal(r.mensajes[0]?.tipo, "texto");
});

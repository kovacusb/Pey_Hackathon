// Router de conversación: decide qué módulo atiende cada mensaje y arma el contexto.
//   1. "hola", "menú", "inicio", "0"   → menú principal
//   2. botón "pago:..."                → motor de cobros (núcleo)
//   3. botón "<modulo>:..."            → ese módulo
//   4. sesión activa en un módulo      → ese módulo (p. ej. esperando que escriba una referencia)
//   5. cualquier otra cosa             → menú principal
import { alConfirmarPago, atenderBotonPago, iniciarCobro } from "./cobros.ts";
import { borrarSesion, guardarSesion, leerSesion } from "./sesiones.ts";
import { respuestaPara } from "./whatsapp/enviar.ts";
import type { Cobro, Contexto, Entrada, Modulo } from "./tipos.ts";

const modulos = new Map<string, Modulo>();

export function registrarModulo(m: Modulo) {
  if (modulos.has(m.id) || m.id === "pago" || m.id === "core") throw new Error(`Prefijo de módulo repetido o reservado: ${m.id}`);
  modulos.set(m.id, m);
}

// Sin \b al final: en JS "ú" no es carácter de palabra y "menú" nunca coincidiría.
const SALUDOS = /^(hola|holi|buenas|buenos dias|buenos días|buenas tardes|buenas noches|menu|menú|inicio|empezar|start|0|hi|hello)(?=$|[\s!.,?¡¿])/i;

export function crearContexto(waId: string, nombre: string | null): Contexto {
  const sesion = leerSesion(waId);
  const ctx: Contexto = {
    waId,
    nombre,
    responder: respuestaPara(waId),
    sesion,
    irA(paso, datos) {
      sesion.paso = paso;
      if (datos) sesion.datos = { ...sesion.datos, ...datos };
      guardarSesion(waId, sesion);
    },
    async menu() {
      borrarSesion(waId);
      sesion.modulo = null;
      sesion.paso = null;
      sesion.datos = {};
      // Negocio independiente: con un solo módulo no hay menú principal; el saludo y «menú» abren ese módulo.
      const unico = modulos.size === 1 ? [...modulos.values()][0] : undefined;
      if (unico) {
        sesion.modulo = unico.id;
        guardarSesion(waId, sesion);
        return unico.atender(ctx, { tipo: "boton", id: `${unico.id}:inicio` });
      }
      await enviarMenu(ctx);
    },
    cobrar(solicitud) {
      return iniciarCobro(waId, sesion.modulo ?? "core", solicitud);
    },
  };
  return ctx;
}

export async function enviarMenu(ctx: Contexto) {
  const filas = [...modulos.values()].flatMap((m) => m.menu);
  const hola = ctx.nombre ? `¡Hola, ${ctx.nombre.split(" ")[0]}! 👋` : "¡Hola! 👋";
  await ctx.responder.lista(
    `${hola} Soy *Paga Fácil*.\nPaga servicios, recargas y compras con CoDi desde aquí: directo desde tu banco y sin comisiones.`,
    "Ver opciones",
    [{ titulo: "¿Qué quieres hacer?", filas }],
    { pie: "Proyecto independiente · cobros vía la API de pey" },
  );
}

async function despachar(waId: string, nombre: string | null, entrada: Entrada) {
  const ctx = crearContexto(waId, nombre);

  if (entrada.tipo === "texto" && SALUDOS.test(entrada.texto ?? "")) return ctx.menu();

  if (entrada.tipo === "boton" && entrada.id) {
    const prefijo = entrada.id.split(":")[0];
    if (entrada.id === "core:menu") return ctx.menu();
    if (prefijo === "pago") {
      if (await atenderBotonPago(waId, entrada.id)) return;
      return ctx.menu();
    }
    const m = modulos.get(prefijo);
    if (m) {
      if (ctx.sesion.modulo !== m.id) {
        ctx.sesion.modulo = m.id;
        ctx.sesion.paso = null;
        ctx.sesion.datos = {};
        guardarSesion(waId, ctx.sesion);
      }
      return m.atender(ctx, entrada);
    }
  }

  const activo = ctx.sesion.modulo ? modulos.get(ctx.sesion.modulo) : undefined;
  if (activo && ctx.sesion.paso) return activo.atender(ctx, entrada);
  return ctx.menu();
}

// Un mensaje a la vez por usuario: evita carreras si toca dos botones seguidos.
const colas = new Map<string, Promise<void>>();

export function procesarMensaje(waId: string, nombre: string | null, entrada: Entrada): Promise<void> {
  const anterior = colas.get(waId) ?? Promise.resolve();
  const siguiente = anterior
    .then(() => despachar(waId, nombre, entrada))
    .catch(async (e) => {
      console.error("[bot] error atendiendo mensaje", (e as Error).message);
      await respuestaPara(waId).botones("😕 Algo falló de nuestro lado. Intenta de nuevo.", [{ id: "core:menu", titulo: "Menú" }]).catch(() => {});
    });
  colas.set(waId, siguiente);
  void siguiente.finally(() => {
    if (colas.get(waId) === siguiente) colas.delete(waId);
  });
  return siguiente;
}

// Cuando pey confirma un pago, se avisa al módulo dueño del cobro (una sola vez por orden).
alConfirmarPago(async (cobro: Cobro) => {
  const m = modulos.get(cobro.modulo);
  const ctx = crearContexto(cobro.waId, null);
  if (m?.onPagado) return m.onPagado(ctx, cobro);
  await ctx.responder.texto(`✅ Pago recibido por ${(cobro.centavos / 100).toFixed(2)} MXN.`);
});

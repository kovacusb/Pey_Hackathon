// Motor de conversación de la tiendita (Paga Fácil): una función pura, sin red ni base de datos.
// Recibe el estado de la conversación y lo que mandó la persona; devuelve el nuevo estado, los mensajes a enviar y,
// solo cuando la persona confirma con un botón, la solicitud de cobro. El monto sale del catálogo, nunca del texto (K03.9).

import { pesos, type Producto } from "./catalogo.ts";

export type Evento =
  | { tipo: "texto"; texto: string }
  | { tipo: "lista"; id: string }
  | { tipo: "boton"; id: string };

export type Renglon = { id: string; titulo: string; descripcion?: string };
export type Boton = { id: string; titulo: string };
export type Mensaje =
  | { tipo: "texto"; texto: string }
  | { tipo: "lista"; cuerpo: string; boton: string; seccion: string; renglones: Renglon[]; pie?: string }
  | { tipo: "botones"; cuerpo: string; botones: Boton[]; pie?: string };

export type Estado = {
  /** sku → cantidad */
  carrito: Record<string, number>;
  etapa: "comprando" | "confirmando";
};

export type Partida = { sku: string; nombre: string; cantidad: number; precioCentavos: number };
export type SolicitudCobro = { canal: "push" | "qr"; montoCentavos: number; partidas: Partida[] };

export type Contexto = {
  catalogo: readonly Producto[];
  maxMontoCentavos: number;
  /** Últimos 4 dígitos del celular de quien escribe, si WhatsApp lo mandó y es mexicano. Sin ellos no se ofrece push. */
  ultimos4?: string | undefined;
  /** Nombre de la tienda (título de la lista, ≤ 24). Lo edita el comercio en el panel. */
  nombreTienda?: string | undefined;
  /** Saludo del bot. Lo edita el comercio en el panel. */
  saludo?: string | undefined;
};

export type Resultado = { estado: Estado; mensajes: Mensaje[]; cobro?: SolicitudCobro };

export const ESTADO_INICIAL: Estado = { carrito: {}, etapa: "comprando" };

// Límites de WhatsApp para mensajes interactivos (Meta, consultado el 2026-11-14): lista con 10 renglones como máximo,
// título de renglón 24, texto del botón de la lista 20, título de sección 24, descripción 72, pie 60; hasta 3 botones de 20.
export const LIMITES = {
  renglones: 10,
  tituloRenglon: 24,
  botonLista: 20,
  seccion: 24,
  descripcion: 72,
  pie: 60,
  botones: 3,
  tituloBoton: 20,
} as const;

const PIE = "Precios de demo · proyecto independiente de pey";

const AYUDA =
  "Soy Paga Fácil: te ayudo a comprar en la tiendita y a pagar con CoDi desde la app de tu banco, sin comisión.\n\n" +
  "Escribe lo que sea para ver los productos. Para pagar necesitas CoDi activo en tu banco.\n\n" +
  "Paga Fácil es un proyecto independiente: no es un producto de pey ni de Banxico.";

function corta(texto: string, max: number): string {
  return texto.length <= max ? texto : `${texto.slice(0, max - 1)}…`;
}

function partidasDe(carrito: Estado["carrito"], catalogo: readonly Producto[]): Partida[] {
  return Object.entries(carrito).flatMap(([sku, cantidad]) => {
    const p = catalogo.find((x) => x.sku === sku);
    return p && cantidad > 0 ? [{ sku, nombre: p.nombre, cantidad, precioCentavos: p.precioCentavos }] : [];
  });
}

function total(partidas: Partida[]): number {
  return partidas.reduce((suma, p) => suma + p.cantidad * p.precioCentavos, 0);
}

function resumen(partidas: Partida[]): string {
  const lineas = partidas.map((p) => `• ${p.cantidad} × ${p.nombre}: ${pesos(p.cantidad * p.precioCentavos)}`);
  return `Tu carrito:\n${lineas.join("\n")}\nTotal: ${pesos(total(partidas))}`;
}

function menu(ctx: Contexto, estado: Estado, saludo: boolean): Mensaje {
  const partidas = partidasDe(estado.carrito, ctx.catalogo);
  const partes: string[] = [];
  if (saludo) partes.push(ctx.saludo || "¡Hola! Soy Paga Fácil, el asistente de la tiendita 🛒\nElige un producto y te cobro con CoDi, sin comisión.");
  if (partidas.length) partes.push(resumen(partidas));
  if (!partes.length) partes.push("Elige un producto:");
  return {
    tipo: "lista",
    cuerpo: partes.join("\n\n"),
    boton: "Ver productos",
    seccion: corta(ctx.nombreTienda || "Tiendita", LIMITES.seccion),
    renglones: ctx.catalogo.slice(0, LIMITES.renglones).map((p) => ({
      id: `prod:${p.sku}`,
      titulo: corta(p.nombre, LIMITES.tituloRenglon),
      descripcion: pesos(p.precioCentavos),
    })),
    pie: PIE,
  };
}

function carritoConBotones(partidas: Partida[], aviso: string): Mensaje {
  return {
    tipo: "botones",
    cuerpo: `${aviso}\n\n${resumen(partidas)}`,
    botones: [
      { id: "mas", titulo: "Agregar más" },
      { id: "pagar", titulo: "Pagar" },
      { id: "vaciar", titulo: "Vaciar carrito" },
    ],
  };
}

export function responder(estado: Estado, evento: Evento, ctx: Contexto): Resultado {
  if (evento.tipo === "texto") {
    if (/^\s*ayuda\s*$/i.test(evento.texto)) {
      return { estado, mensajes: [{ tipo: "texto", texto: AYUDA }, menu(ctx, estado, false)] };
    }
    return { estado: { ...estado, etapa: "comprando" }, mensajes: [menu(ctx, estado, true)] };
  }

  if (evento.tipo === "lista") {
    const sku = evento.id.startsWith("prod:") ? evento.id.slice("prod:".length) : "";
    const producto = ctx.catalogo.find((p) => p.sku === sku);
    if (!producto) {
      return { estado, mensajes: [{ tipo: "texto", texto: "Ese producto ya no está disponible." }, menu(ctx, estado, false)] };
    }
    const carrito = { ...estado.carrito, [sku]: (estado.carrito[sku] ?? 0) + 1 };
    return {
      estado: { carrito, etapa: "comprando" },
      mensajes: [carritoConBotones(partidasDe(carrito, ctx.catalogo), `Agregué 1 × ${producto.nombre}.`)],
    };
  }

  const partidas = partidasDe(estado.carrito, ctx.catalogo);
  const monto = total(partidas);
  const vacio: Estado = { carrito: {}, etapa: "comprando" };

  switch (evento.id) {
    case "mas":
      return { estado: { ...estado, etapa: "comprando" }, mensajes: [menu(ctx, estado, false)] };

    case "vaciar":
    case "cancelar":
      return { estado: vacio, mensajes: [{ tipo: "texto", texto: "Listo, vacié tu carrito." }, menu(ctx, vacio, false)] };

    case "pagar": {
      if (!partidas.length) return { estado, mensajes: [menu(ctx, estado, false)] };
      if (monto > ctx.maxMontoCentavos) {
        return {
          estado: { ...estado, etapa: "comprando" },
          mensajes: [
            {
              tipo: "botones",
              cuerpo: `Tu total (${pesos(monto)}) pasa del tope de esta demo (${pesos(ctx.maxMontoCentavos)}). Vacía el carrito y elige menos productos.`,
              botones: [{ id: "vaciar", titulo: "Vaciar carrito" }],
            },
          ],
        };
      }
      const opciones: string[] = [];
      const botones: Boton[] = [];
      if (ctx.ultimos4) {
        opciones.push(`• *A mi número*: te llega la solicitud de cobro CoDi al celular que termina en ${ctx.ultimos4}.`);
        botones.push({ id: "push", titulo: "A mi número" });
      }
      opciones.push("• *Mándame QR*: guardas la imagen y la abres en CoDi desde la app de tu banco.");
      botones.push({ id: "qr", titulo: "Mándame QR" }, { id: "cancelar", titulo: "Cancelar" });
      return {
        estado: { ...estado, etapa: "confirmando" },
        mensajes: [{ tipo: "botones", cuerpo: `${resumen(partidas)}\n\n¿Cómo quieres pagar con CoDi?\n${opciones.join("\n")}`, botones }],
      };
    }

    case "push":
    case "qr": {
      const canal = evento.id === "push" ? "push" : "qr";
      const valido =
        estado.etapa === "confirmando" &&
        partidas.length > 0 &&
        monto <= ctx.maxMontoCentavos &&
        (canal === "qr" || Boolean(ctx.ultimos4));
      if (!valido) {
        return {
          estado: { ...estado, etapa: "comprando" },
          mensajes: [{ tipo: "texto", texto: "Ese botón ya no aplica." }, menu(ctx, estado, false)],
        };
      }
      return { estado: vacio, mensajes: [], cobro: { canal, montoCentavos: monto, partidas } };
    }

    default:
      return { estado, mensajes: [menu(ctx, estado, false)] };
  }
}

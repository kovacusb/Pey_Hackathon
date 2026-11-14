# Cómo se conectan los módulos

Un solo servidor ([`apps/api`](../apps/api/README.md)), **un webhook de WhatsApp** y **un webhook de pey** para todo. Cada módulo vive en su carpeta y solo habla con el núcleo a través del contrato de [`src/core/tipos.ts`](../apps/api/src/core/tipos.ts). Rutas abajo relativas a `apps/api/`.

```
WhatsApp ──► /api/whatsapp ──────┐                  ┌─► modules/servicios  (svc:)  Módulo 1: servicios y recargas
                                 ├─► core/bot.ts ───┼─► modules/tienda     (tienda:) Módulo 2: tiendita
pey ───────► /api/webhook-pey ───┤   (router)       ├─► modules/p2p        (p2p:)  Módulo 3: cobro rápido + factura
             + polling           └─► core/cobros.ts └─► modules/ayuda      (ayuda:) Centro de ayuda
                                     (cobros CoDi)
```

## Quién es dueño de qué

| Carpeta | Dueño | Regla |
|---|---|---|
| `src/core/`, `src/server.ts`, `src/config.ts` | Todo el equipo | Cambios por PR revisado por ambos. Cambiar `tipos.ts` rompe a todos: avisar antes. |
| `src/modules/servicios/`, `src/modules/ayuda/` | Módulo 1 | Libre |
| `src/modules/tienda/` | Módulo 2 | Libre. `motor.ts` es puro y se prueba solo; `index.ts` lo adapta al núcleo |
| `src/modules/p2p/` | Módulo 3 | Libre |

Así los conflictos de Git solo pueden ocurrir en `core/`, que cambia poco. Cada módulo usa su propio prefijo en los ids de botones y, si necesita tablas, las crea con su prefijo (`tienda_*`, `p2p_*`).

## El contrato (resumen de `tipos.ts`)

```ts
export const miModulo: Modulo = {
  id: "tienda",                                // prefijo de botones: "tienda:..."
  menu: [{ id: "tienda:inicio", titulo: "🛒 Tiendita (demo)", descripcion: "…" }],  // filas del menú principal
  async atender(ctx, entrada) { … },           // botón con prefijo "tienda:" o sesión activa en este módulo
  async onPagado(ctx, cobro) { … },            // pey confirmó el pago (una sola vez por orden)
};
```

Dentro de `atender`:

| Necesitas… | Usa |
|---|---|
| Responder | `ctx.responder.texto()`, `.botones()` (máx. 3, título ≤ 20), `.lista()` (máx. 10 filas, título ≤ 24), `.imagen(png)` |
| Recordar en qué paso va la persona | `ctx.irA("paso", { datos })` y luego `ctx.sesion.paso` / `ctx.sesion.datos` |
| Cobrar | `await ctx.cobrar({ centavos, concepto, metodo: "pn" \| "qr", payload })` |
| Volver al menú | `await ctx.menu()` |

`ctx.cobrar` hace todo el flujo de pago: crea la push o el QR en pey, manda el QR como imagen, ofrece cambiar entre push y QR, cancela, avisa si vence, confirma por webhook o por polling y llama a tu `onPagado` **una sola vez por orden**, aunque se paguen dos intentos. Tu `payload` regresa en `cobro.payload`.

**Reglas de dinero (AGENTS.md §3):** el núcleo rechaza montos sobre `MAX_MONTO_MXN`, y "pagado" solo ocurre si pey lo confirma. En la demo cobra `DEMO_COBRO_MXN` (por defecto $0.01) y muestra el monto real como referencia, diciendo que es demo.

## Para el Módulo 2 (tiendita)

- El motor (`motor.ts`) no sabe nada de WhatsApp ni de pey: recibe `(estado, evento)` y devuelve mensajes y, si la persona confirmó, una solicitud de cobro. El adaptador (`index.ts`) prefija los ids con `tienda:`, guarda el estado en la sesión y llama a `ctx.cobrar`.
- **Panel web del comercio:** `/panel` (`panel.ts`, `panel.html`, `datos.ts`). Ajustes del bot y catálogo en `tienda_ajustes` y `tienda_productos`; pedidos y pagos se leen de `cobros` (`modulo = 'tienda'`), sin duplicarlos. Se monta en `server.ts` solo con `DEV_TOOLS=1` porque aún no tiene inicio de sesión.
- Hoy todo corre en **un solo número de WhatsApp** con menú. Los pedidos y pagos se leen de los cobros del módulo `tienda` (tabla `cobros`, `modulo = 'tienda'`).
- Para cobrarle a un cliente **en el mostrador** sin que le escriba al bot, usa `metodo: "qr"`: el QR llega al chat del comerciante y él se lo muestra al cliente. Con push, el cobro se manda al celular de quien está en el chat (`ctx.waId`); para cobrar a otro celular hará falta una opción en el núcleo (pídela).
- Mandarle el comprobante al cliente por WhatsApp sin que él haya escrito antes requiere una **plantilla aprobada por Meta** (ventana de 24 h). Alternativa sin plantilla: un link `wa.me/<número>?text=...` en el ticket para que el cliente inicie la conversación.

## Probar sin WhatsApp

`cd apps/api && npm run dev` y abre http://localhost:3000/dev. Es el mismo bot y los cobros de pey son reales: la push llega al celular que escribas arriba. "Simular pago" marca el cobro como **SIMULACIÓN** y el comprobante lo dice.

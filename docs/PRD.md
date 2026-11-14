# PRD · peybot

Versión 0.1 · 14-nov-2026 · Estado: alcance acordado, en construcción.

> «peybot» es el nombre de trabajo. ⚪ Falta confirmar con pey que se puede usar «pey» en el nombre (K01.7, pregunta 9). Mientras tanto, el bot y la app dicen que es un proyecto independiente, no un producto de pey (AGENTS.md §4).

## Problema
Una tiendita cobra en efectivo o con transferencias que se "comprueban" con una captura de pantalla. Cobrar con tarjeta le cuesta hasta 3.95 % por venta, y CoDi, que no cobra comisión, casi no se usa: hay 21.8 M de cuentas validadas, pero solo 2.5 M han pagado alguna vez (K04.3, K04.4). Además, pedir y cobrar por WhatsApp se hace a mano.

## Solución
- **peybot (WhatsApp):** el cliente le escribe a la tienda, elige productos de su catálogo y recibe el cobro CoDi: una **notificación push** al mismo número desde el que escribe o, si lo prefiere, un **QR** que importa en la app de su banco. Cuando pey confirma el pago, el bot responde «Pago recibido» y la tienda lo ve.
- **App del comercio (Android):** el dueño configura su bot (nombre, saludo, horario, encendido), su catálogo, y ve pedidos y pagos en tiempo real.
- **Agente (más adelante):** Claude entiende pedidos en texto libre («dame dos papas y un refresco») por medio de herramientas; el código decide precios y montos (K03.9).

## Para quién
- **Comprador:** persona con **CoDi ya activo** en la app de su banco. No hay ruta con tarjeta ni ligas de pago.
- **Comercio del demo:** una tiendita, con datos ficticios.

## Alcance del demo (MVP)
1. Un comercio, un número de WhatsApp y el catálogo de abajo.
2. Flujo de compra: menú → producto → carrito → «Pagar» → «A mi número» (push, `POST /codi/pn`) o «Mándame QR» (`POST /codi/qr`) → webhook de pey verificado → «Pago recibido» en WhatsApp y en la app ([pey/04](../pey/04-api-codi-qr-y-push.md), [pey/09](../pey/09-webhooks.md)).
3. App Android: pantallas Bot, Productos, Pedidos y Pagos.
4. Cobros de $0.01 a $1, con tope impuesto por el servidor (`MAX_MONTO_MXN`).

**Fuera de alcance:** tarjetas y ligas de pago, varios comercios, devoluciones, facturación, NFC.

### Catálogo de demo (precios de prueba)

| SKU | Producto | Precio |
|---|---|---|
| `chicle` | Chicle | $0.10 |
| `paleta` | Paleta de dulce | $0.20 |
| `galleta` | Galletas | $0.25 |
| `agua` | Agua 600 ml | $0.30 |
| `pan` | Pan dulce | $0.30 |
| `papas` | Papas | $0.35 |
| `jugo` | Jugo | $0.35 |
| `refresco` | Refresco | $0.40 |

## Arquitectura

```
Comprador (WhatsApp) ─▶ Meta Cloud API ─▶ POST /api/whatsapp ─▶ motor del bot (+ agente, después)
                                                                      │
App Android (Expo) ◀─▶ API propia (apps/api) ◀─▶ Postgres (catálogo, pedidos, estados, dedupe)
                                                                      │
                                         pey: POST /codi/pn o /codi/qr (servidor, nunca la app)
                                                                      │
App del banco (CoDi) ─ paga ─▶ pey ─▶ POST /api/webhook-pey (firma Standard Webhooks)
                                                                      │
                         «Pago recibido» por WhatsApp + pedido «pagado» en la app ◀┘
```

| Pieza | Tecnología | Carpeta |
|---|---|---|
| API y webhooks | Node 24+ con TypeScript, Hono | `apps/api` |
| App del comercio | Expo (React Native + TypeScript) para Android; la misma base exporta una versión web para la demo pública | `apps/movil` (pendiente) |
| Base de datos | Postgres (Docker en local; servicio administrado al desplegar) | pendiente |
| WhatsApp | WhatsApp Cloud API de Meta (oficial) | — |
| IA | Claude por API, solo en el servidor | pendiente |

## Reglas que el diseño respeta
- **Dinero:** confirmación humana con botón, tope en el servidor, «pagado» solo con `PAID` del cobro o webhook firmado, sin reintentos a ciegas, centavos internos (AGENTS.md §3).
- **Llaves y datos:** llaves solo en el servidor; la app nunca habla con pey. El número de WhatsApp se usa para responder y para la push; los logs solo llevan IDs (AGENTS.md §4).
- **Hackatón:** cobro real en ambiente productivo con reacción a su resultado; integración con pey escrita desde cero en este repo; solo datos propios o ficticios en el demo (K01.8).

## Plan por tareas

| # | Tarea | Listo cuando |
|---|---|---|
| 1 | Bot de WhatsApp sin cobro: webhook verificado, menú, carrito, confirmación | Pruebas pasan; con las credenciales de Meta, el bot responde en tu WhatsApp |
| 2 | Cobro real: cliente de pey nuevo, pedidos en Postgres, push y QR, webhook de pey verificado y deduplicado | Un pago real de $0.01 cambia el pedido a «pagado» y el bot avisa |
| 3 | App Android: Bot, Productos, Pedidos y Pagos contra la API | Se ve en el emulador y en tu teléfono con datos reales del demo |
| 4 | Agente: texto libre → herramientas → carrito | «dos papas y un refresco» arma el carrito correcto; el modelo nunca fija montos |
| 5 | Entrega: despliegue estable, demo pública, video de 3 min, textos y declaración | Todo lo de K01.8 listo antes del 10-dic (postulación) y del 12-dic (entrega) |

## Entregables del hackatón (K01.8)

| Pide la regla | Cómo lo cubrimos |
|---|---|
| Demo pública sin invitación | Versión web de la app (Expo) con credenciales de prueba y número de WhatsApp del bot; ⚪ un número de prueba de Meta solo escribe a 5 destinatarios, así que para jueces hace falta un número real |
| Video de hasta 3 min | Pantalla dividida: WhatsApp del comprador y app del comercio; pago real de $0.01 a $1 |
| Descripción (≤ 500 palabras) e instrucciones (≤ 1000) | Se redactan en la tarea 5 a partir de este PRD |
| Declaración de componentes previos | Base de conocimiento (`conocimiento/`, `pey/`, `codi/`, `docs/REVISION-PEY-2026-11-07.md`): investigación consultada del 5 al 7-nov. Todo el código se escribe desde el 14-nov |

## Riesgos y preguntas abiertas
- **Ambiente productivo de pey:** sin aprobación no hay entrega válida; se pide por orden de llegada (K01.8).
- **Push a un número sin CoDi:** comportamiento no documentado; el QR queda como alternativa (K01.7, pey).
- **Formato del número de WhatsApp:** pey pide 10 dígitos; WhatsApp manda la lada del país (⚪ confirmar con un número mexicano real).
- **Usuarios de WhatsApp sin número visible:** Meta puede omitir el número si la persona usa nombre de usuario; entonces solo se ofrece QR.
- **Nombre «peybot»:** ver la nota del inicio.

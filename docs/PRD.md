# PRD · Paga Fácil

Versión 0.2 · 14-nov-2026 · Estado: alcance acordado, en construcción. Une el PRD de «peybot» (rama `business`) con el de servicios y recargas (rama `core-y-servicios`).

> **Paga Fácil** es un proyecto independiente: cobra con CoDi por medio de la API de pey, pero no es un producto de pey ni de Banxico (AGENTS.md §4). Antes se llamó «peybot»; se cambió para no usar la marca de pey sin permiso (K01.7, pregunta 9).

## Problema
- **Personas:** pagan luz, agua, teléfono y recargas en efectivo, en ventanilla o en la tiendita. CoDi no cobra comisión y casi no se usa: hay 21.8 M de cuentas validadas, pero solo 2.5 M han pagado alguna vez (K04.3, K04.4).
- **Comercios:** una tiendita cobra en efectivo o con transferencias que se "comprueban" con una captura de pantalla. Cobrar con tarjeta le cuesta hasta 3.95 % por venta, y pedir y cobrar por WhatsApp se hace a mano.

## Solución: un solo bot de WhatsApp con módulos
Sin instalar nada, sin comisiones y con botones en lugar de menús eternos. Quien paga autoriza en la app de su banco: una **notificación push** al mismo número desde el que escribe o, si lo prefiere, un **QR** que importa desde la galería.

| # | Módulo | Para quién | Estado (14-nov) |
|---|---|---|---|
| 1 | **Servicios y recargas** (CFE, agua, Telmex, izzi…; Telcel, AT&T…) + **Centro de ayuda** (guías de CoDi, con `video_url` para videos futuros) | Consumidor | Pago al proveedor SIMULADO con cobro CoDi real de $0.01 (`SERVICIOS_COBRO_MXN`; decisión 15-nov). `SERVICIOS_SIMULADOS=0` cobra el recibo completo cuando haya agregador |
| 2 | **Tiendita**: el cliente elige productos, arma su carrito y paga; la tienda lo ve | Comercio y su cliente | Fuera del menú por ahora (15-nov); el código sigue en `src/modules/tienda` |
| 3 | **Cobro rápido P2P + factura express** (consultas, plomería, reparaciones) | Profesionistas independientes | Funcional: QR o push al celular del cliente (con aceptación explícita), factura PDF en el chat. Factura SIMULADA sin credenciales; conector de Facturama listo |

- **App del comercio (Android, módulo 2):** el dueño configura su bot (nombre, saludo, horario, encendido), su catálogo, y ve pedidos y pagos en tiempo real.
- **Agente (más adelante):** Claude entiende pedidos en texto libre («dame dos papas y un refresco») por medio de herramientas; el código decide precios y montos (K03.9).

## Para quién
- **Comprador o pagador:** persona con **CoDi ya activo** en la app de su banco. No hay ruta con tarjeta ni ligas de pago.
- **Comercio del demo:** una tiendita, con datos ficticios.

## Alcance del demo (MVP)
1. Un número de WhatsApp, menú principal con los módulos.
2. **Servicios:** servicio → referencia → adeudo (simulado) → «Pagar» (push, `POST /codi/pn`) o «Pagar con QR» (`POST /codi/qr`) → pey confirma → comprobante. Se cobra `DEMO_COBRO_MXN` ($0.01) y se muestra el monto real del recibo con la etiqueta de demo; el pago al servicio dice SIMULACIÓN.
3. **Tiendita:** menú → producto → carrito → «Pagar» → «A mi número» (push) o «Mándame QR» → webhook de pey verificado → «Pago recibido» en WhatsApp y en la app ([pey/04](../pey/04-api-codi-qr-y-push.md), [pey/09](../pey/09-webhooks.md)).
4. App Android: pantallas Bot, Productos, Pedidos y Pagos.
5. Cobros reales por el monto capturado, con tope configurable impuesto por el servidor (`MAX_MONTO_MXN`); los organizadores pidieron probar con montos mayores a $1 (15-nov).

**Fuera de alcance del demo:** tarjetas y ligas de pago, varios comercios, devoluciones, NFC, pago real a CFE/Telmex (agregador simulado detrás de una interfaz).

### Catálogo de demo de la tiendita (precios de prueba)

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
Persona (WhatsApp) ─▶ Meta Cloud API ─▶ POST /api/whatsapp ─▶ router (core/bot.ts) ─┬─▶ módulo servicios (svc:)
                                                                                    ├─▶ módulo tienda (tienda:) → motor.ts
                                                                                    ├─▶ módulo p2p (p2p:)
                                                                                    └─▶ módulo ayuda (ayuda:)
                                                   motor de cobros (core/cobros.ts) ◀── ctx.cobrar()
                                                                      │
                                         pey: POST /codi/pn o /codi/qr (servidor, nunca la app)
                                                                      │
App del banco (CoDi) ─ paga ─▶ pey ─▶ POST /api/webhook-pey (Standard Webhooks) + polling de respaldo
                                                                      │
                         comprobante por WhatsApp (onPagado del módulo, una sola vez por orden) ◀┘
App Android (Expo) ◀─▶ misma API (apps/api)
```

| Pieza | Tecnología | Carpeta |
|---|---|---|
| API, webhooks y bot | Node 24+ con TypeScript sin compilar, Express 5 | [`apps/api`](../apps/api/README.md) |
| Base de datos | SQLite integrado (`node:sqlite`) para sesiones, cobros y deduplicación; Postgres administrado cuando la app lo necesite | `apps/api/src/core/db.ts` |
| App del comercio | Expo (React Native + TypeScript) para Android; la misma base exporta una versión web para la demo pública | `apps/movil` (pendiente) |
| WhatsApp | WhatsApp Cloud API de Meta (oficial) | — |
| IA | Claude por API, solo en el servidor | pendiente |

Cómo se reparte el trabajo sin conflictos de Git: [MODULOS.md](MODULOS.md).

## Reglas que el diseño respeta
- **Dinero:** confirmación humana con botón, tope en el servidor, «pagado» solo con `PAID` del cobro o webhook firmado, sin reintentos a ciegas, centavos internos (AGENTS.md §3). Una orden se entrega una sola vez aunque se paguen dos intentos (push y QR).
- **Llaves y datos:** llaves solo en el servidor; la app nunca habla con pey. El número de WhatsApp se usa para responder y para la push; los logs solo llevan IDs (AGENTS.md §4).
- **Hackatón:** cobro real en ambiente productivo con reacción a su resultado; integración con pey escrita desde cero en este repo; solo datos propios o ficticios en el demo (K01.8).

## Plan por tareas

| # | Tarea | Listo cuando | Estado |
|---|---|---|---|
| 1 | Bot de WhatsApp: webhook verificado, menú, carrito, confirmación | Pruebas pasan; con las credenciales de Meta, el bot responde en tu WhatsApp | Pruebas ✅ · Meta pendiente |
| 2 | Cobro real: cliente de pey nuevo, push y QR, webhook de pey verificado y deduplicado | Un pago real de $0.01 cambia la orden a «pagado» y el bot avisa | ✅ push real de $0.01 confirmada (14-nov) |
| 3 | App Android: Bot, Productos, Pedidos y Pagos contra la API | Se ve en el emulador y en tu teléfono con datos reales del demo | Panel web `/panel/` listo (pagos y pedidos en tiempo real); Android pendiente |
| 4 | Agente: texto libre → herramientas → carrito | «dos papas y un refresco» arma el carrito correcto; el modelo nunca fija montos | Pendiente |
| 5 | Entrega: despliegue estable, demo pública, video de 3 min, textos y declaración | Todo lo de K01.8 listo antes del 10-dic (postulación) y del 12-dic (entrega) | Render configurado (`render.yaml`) |

## Entregables del hackatón (K01.8)

| Pide la regla | Cómo lo cubrimos |
|---|---|
| Demo pública sin invitación | Número de WhatsApp del bot + chat de pruebas web (`/dev`) + versión web de la app; ⚪ un número de prueba de Meta solo escribe a 5 destinatarios, así que para jueces hace falta un número real |
| Video de hasta 3 min | WhatsApp de quien paga y app del comercio; pago real de $0.01 a $1 |
| Descripción (≤ 500 palabras) e instrucciones (≤ 1000) | Se redactan en la tarea 5 a partir de este PRD |
| Declaración de componentes previos | Base de conocimiento (`conocimiento/`, `pey/`, `codi/`, `docs/REVISION-PEY-2026-11-07.md`): investigación consultada del 5 al 7-nov. Todo el código se escribe desde el 14-nov |

## Riesgos y preguntas abiertas
- **Ambiente productivo de pey:** sin aprobación no hay entrega válida; se pide por orden de llegada (K01.8).
- **Push a un número sin CoDi:** comportamiento no documentado; el QR queda como alternativa (K01.7, pey). La push llegó en BBVA y en otros bancos probados (14-nov).
- **Formato del número de WhatsApp:** pey pide 10 dígitos; WhatsApp manda `52` o `521` + 10 dígitos. El núcleo acepta los dos (`celularDe`) y, para enviar, quita el `1` (⚪ confirmar con el primer mensaje real de Meta).
- **Usuarios de WhatsApp sin número visible:** Meta puede omitir el número si la persona usa nombre de usuario; entonces solo se ofrece QR.
- **Ventana de 24 h de Meta:** avisar a alguien que no escribió primero requiere plantillas aprobadas.
- **Credencial expuesta:** la llave de pey se pegó en un chat el 14-nov; las reglas piden avisar a pey en 24 h si una credencial se compromete (K01.8). Rotarla en el portal.
- **Nombre:** «Paga Fácil» es nombre de trabajo.

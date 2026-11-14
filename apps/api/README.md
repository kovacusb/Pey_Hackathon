# API de Paga Fácil (`apps/api`)

Un solo servidor para todo el bot: webhook de WhatsApp, webhook de pey, router de módulos y motor de cobros CoDi. Qué construimos: [docs/PRD.md](../../docs/PRD.md). Cómo se reparten los módulos: [docs/MODULOS.md](../../docs/MODULOS.md).

## Correr y probar

```bash
cd apps/api
npm install
npm test            # pruebas sin red: Meta y pey se simulan con un fetch o un cliente falso
npm run typecheck
npm run dev         # http://localhost:3000, recarga al guardar y lee ../../.env
```

Abre **http://localhost:3000/dev**: es el mismo bot en el navegador. Los cobros de pey son **reales**: la push llega al celular que escribas arriba. «Simular pago» confirma un cobro sin dinero y el comprobante dice **SIMULACIÓN** (AGENTS.md §3).

## Variables

En `.env` de la raíz del repo (nombres en [`.env.example`](../../.env.example); los valores nunca van al chat):

| Variable | De dónde sale |
|---|---|
| `PEY_API_KEY` | portal.mipey.mx → Desarrollador → Crear API Key |
| `PEY_WEBHOOK_SECRET` | Engrane de la llave → Crear Webhook (URL `…/api/webhook-pey`). Sin él solo se confirma por polling. |
| `MAX_MONTO_MXN`, `DEMO_COBRO_MXN` | Tope por cobro y monto de demo de servicios (por defecto $1 y $0.01) |
| `WHATSAPP_TOKEN` | Meta → tu app → WhatsApp → API Setup: token de acceso. ⚪ El temporal dura unas 24 h. |
| `WHATSAPP_PHONE_NUMBER_ID` | La misma pantalla: «Phone number ID» del número de prueba. |
| `WHATSAPP_APP_SECRET` | App settings → Basic → App secret. Firma cada webhook. |
| `WHATSAPP_VERIFY_TOKEN` | Lo inventas (`openssl rand -hex 16`); lo copias a Meta en el paso 3. |

## Conectar con WhatsApp (Meta)

1. `npm run dev`
2. URL pública HTTPS: un túnel (`cloudflared tunnel --url http://localhost:3000`) o el despliegue en Render ([`render.yaml`](../../render.yaml)). La URL del túnel rápido cambia cada vez que lo arrancas.
3. En Meta, en la configuración del webhook de WhatsApp: URL de callback = `<URL>/api/whatsapp` y token de verificación = tu `WHATSAPP_VERIFY_TOKEN` → verificar y guardar. Después suscríbete al campo **`messages`**. ⚪ Los nombres de las pantallas cambian; lo que importa es que el GET de verificación responda 200.
4. Desde tu WhatsApp (agregado como destinatario del número de prueba), escríbele «hola».

Si la bitácora dice `WhatsApp 400 131030`, tu número no está en la lista de destinatarios permitidos (⚪). Con números de México, el núcleo envía a `52` + 10 dígitos aunque Meta reporte `521` (⚪ confirmar con el primer mensaje real).

## Rutas

| Ruta | Para qué |
|---|---|
| `GET /salud` | Qué está configurado, sin mostrar secretos |
| `GET /api/whatsapp` | Verificación de Meta: `hub.mode=subscribe`, `hub.verify_token` y `hub.challenge` |
| `POST /api/whatsapp` | Mensajes. Firma `X-Hub-Signature-256` verificada sobre el cuerpo crudo; responde 200 de inmediato y atiende cada mensaje una sola vez |
| `POST /api/webhook-pey` | Pagos de pey (Standard Webhooks): firma, ventana de 5 min y deduplicación por `webhook-id` |
| `/dev` | Chat de pruebas (solo con `DEV_TOOLS=1`) |

## Diseño

| Archivo | Qué hace |
|---|---|
| `src/server.ts` | Rutas HTTP (Express) y registro de módulos (el orden define el menú) |
| `src/core/tipos.ts` | **Contrato** entre núcleo y módulos |
| `src/core/bot.ts` | Router: saludo → menú; `pago:` → cobros; `<módulo>:` → ese módulo; sesión activa → su módulo |
| `src/core/cobros.ts` | Cobros CoDi: crea push o QR, cambia entre ellos, cancela, vence, confirma por webhook o polling, entrega una vez por orden |
| `src/core/pey/cliente.ts` · `firma.ts` | Cliente de pey (pesos con 2 decimales, errores con `error.type`) y verificación Standard Webhooks |
| `src/core/whatsapp/` | Envío a la Graph API (`v27.0`, con límites de WhatsApp) y lectura del webhook |
| `src/core/db.ts` | SQLite: sesiones, cobros y eventos ya procesados |
| `src/modules/servicios/` | Módulo 1: servicios y recargas; `agregador.ts` es SIMULACIÓN detrás de una interfaz |
| `src/modules/ayuda/` | Centro de ayuda: guías de CoDi con `video_url` opcional |
| `src/modules/tienda/` | Módulo 2: `motor.ts` (puro: estado + evento → mensajes + cobro), `catalogo.ts` y el adaptador `index.ts` |
| `src/modules/p2p/` | Módulo 3 (por definir) |
| `src/dev/` | Chat de pruebas en el navegador |

La bitácora solo lleva IDs (cobro, `transactionId`, `codiQrId`, `webhook-id`) y montos: nunca números de teléfono ni lo que escribe la persona (AGENTS.md §4).

## Fuentes (consultadas el 2026-11-14 salvo que se indique)

- Meta: [Webhooks, primeros pasos](https://developers.facebook.com/docs/graph-api/webhooks/getting-started) (verificación, firma, reintentos hasta 36 h, HTTPS obligatorio)
- Meta: [Ejemplos de payload de WhatsApp](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples)
- Meta: [Mensajes de lista](https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-list-messages) y [de botones](https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages) (límites)
- pey: [OpenAPI](https://docs.pey.mx/openapi.json) y [webhooks](https://docs.pey.mx/docs/webhooks/introduction), consultados el 2026-11-07 ([pey/04](../../pey/04-api-codi-qr-y-push.md), [pey/07](../../pey/07-api-transacciones.md), [pey/09](../../pey/09-webhooks.md)); `POST /codi/qr`, `POST /codi/pn` y `GET /transaction/{id}` probados en vivo el 2026-11-14
- [Standard Webhooks](https://www.standardwebhooks.com/) (vector de prueba de su implementación de referencia)

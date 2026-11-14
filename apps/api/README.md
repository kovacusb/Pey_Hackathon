# API de peybot (`apps/api`)

Webhook de WhatsApp y motor del bot de la tiendita. Es la **tarea 1** de [docs/PRD.md](../../docs/PRD.md): el bot ya muestra el catálogo, arma el carrito y pide confirmación con botones. El cobro CoDi con pey llega en la tarea 2; mientras tanto, el bot responde que todavía no se cobró nada (no finge un pago).

## Correr y probar

```bash
cd apps/api
npm install
npm test            # pruebas sin red: Meta y pey se simulan con un fetch falso
npm run typecheck
npm run dev         # http://localhost:3000, recarga al guardar y lee ../../.env
```

## Conectar con WhatsApp (Meta)

Variables en `.env` (nombres en [`.env.example`](../../.env.example); los valores nunca van al chat):

| Variable | De dónde sale |
|---|---|
| `WHATSAPP_TOKEN` | Meta → tu app → WhatsApp → API Setup: token de acceso. ⚪ El temporal dura unas 24 h. |
| `WHATSAPP_PHONE_NUMBER_ID` | La misma pantalla: «Phone number ID» del número de prueba. |
| `WHATSAPP_APP_SECRET` | App settings → Basic → App secret. Firma cada webhook. |
| `WHATSAPP_VERIFY_TOKEN` | Ya está generado en tu `.env`. Lo copias a Meta en el paso 3. |

1. `npm run dev`
2. En otra terminal: `cloudflared tunnel --url http://localhost:3000` y copia la URL `https://….trycloudflare.com`. Meta exige HTTPS con certificado válido; el túnel lo da.
3. En Meta, en la configuración del webhook de WhatsApp: URL de callback = `<URL del túnel>/api/whatsapp` y token de verificación = tu `WHATSAPP_VERIFY_TOKEN` → verificar y guardar. Después suscríbete al campo **`messages`**. ⚪ Los nombres de las pantallas cambian; lo que importa es que el GET de verificación responda 200.
4. Desde tu WhatsApp (agregado como destinatario del número de prueba), escríbele «hola».

Notas:
- La URL del túnel rápido cambia cada vez que lo arrancas: actualízala en Meta. Para una URL estable hay que desplegar (tarea 5).
- Si la bitácora dice `Meta respondió 400 (código 131030)`, tu número no está en la lista de destinatarios permitidos (⚪). Con números de México, revisa si Meta lo registró con o sin el «1» después del 52 (⚪).

## Rutas

| Ruta | Para qué |
|---|---|
| `GET /salud` | Responde `{"ok":true}` |
| `GET /api/whatsapp` | Verificación de Meta: `hub.mode=subscribe`, `hub.verify_token` y `hub.challenge` |
| `POST /api/whatsapp` | Mensajes. Firma `X-Hub-Signature-256` verificada sobre el cuerpo crudo; cada mensaje se atiende una sola vez aunque Meta lo reintente |

## Diseño

| Archivo | Qué hace |
|---|---|
| `src/bot.ts` | Motor puro: (estado, evento) → (estado, mensajes, solicitud de cobro). Montos solo del catálogo y nunca arriba de `MAX_MONTO_MXN`. |
| `src/whatsapp.ts` | Firma, lectura del payload y envío a la Graph API (`v27.0`). |
| `src/almacen.ts` | Conversaciones e IDs procesados en memoria. Se pierden al reiniciar: Postgres llega en la tarea 2. |
| `src/app.ts` | Rutas HTTP (Hono) y el punto donde la tarea 2 conectará el cobro con pey. |
| `src/catalogo.ts` | Catálogo de demo (precios de prueba). |

La bitácora solo lleva IDs de mensaje y montos: nunca números de teléfono ni lo que escribe la persona (AGENTS.md §4).

## Fuentes (consultadas el 2026-11-14)

- Meta: [Webhooks, primeros pasos](https://developers.facebook.com/docs/graph-api/webhooks/getting-started) (verificación, firma, reintentos hasta 36 h, HTTPS obligatorio)
- Meta: [Ejemplos de payload de WhatsApp](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples)
- Meta: [Mensajes de lista](https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-list-messages) y [de botones](https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages) (límites)
- pey: celular de 10 dígitos para la push ([pey/04](../../pey/04-api-codi-qr-y-push.md))

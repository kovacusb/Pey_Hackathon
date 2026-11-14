# Despliegue · Paga Fácil

Para el equipo. Hay dos formas de tener una URL pública: un **túnel** desde la laptop (rápido, para probar) y **Render** (estable, para la entrega). Los valores secretos nunca van al repo ni al chat.

## 1. Túnel (desarrollo)

```bash
cd apps/api && npm run dev                                   # terminal 1
~/.local/cloudflared/cloudflared tunnel --url http://localhost:3000   # terminal 2 → copia la URL https://….trycloudflare.com
```
La URL cambia cada vez que reinicias el túnel, y la laptop debe seguir encendida.

## 2. Render (entrega)

1. **dashboard.render.com** → «Sign in with GitHub» → autoriza el repo `Pey_Hackathon`.
2. **New → Blueprint** → elige el repo y la rama (`core-y-servicios`, o `main` cuando se una). Render lee `render.yaml` de la raíz.
3. Te pide los valores marcados como secretos; copia los mismos de tu `.env`:
   - `PEY_API_KEY`
   - `PEY_WEBHOOK_SECRET` (después del paso 4)
   - `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`
   - `DEV_CLAVE`, `PANEL_CLAVE`
   - `FACTURAMA_*` (opcionales)
4. **Apply.** Al terminar te da una URL como `https://paga-facil-xxxx.onrender.com`. Revisa `https://…/salud`.

Notas del plan gratis: se duerme tras unos 15 minutos sin uso (el primer mensaje tarda cerca de 50 s) y **el disco se borra al reiniciar**: las sesiones y el historial del panel empiezan de cero. Para la demo basta; para producción hace falta una base administrada.

## 3. Meta (WhatsApp)

Con la URL definitiva:
1. developers.facebook.com → tu app → **WhatsApp → Configuration → Webhook → Edit**.
2. Callback URL: `https://<URL>/api/whatsapp`. Verify token: el valor de `WHATSAPP_VERIFY_TOKEN`.
3. **Verify and save** → **Webhook fields** → **Subscribe** en `messages`.
4. Token permanente (para que no venza a las 24 h): business.facebook.com → Configuración → Usuarios del sistema → Agregar (admin) → Asignar activos (tu app y la cuenta de WhatsApp) → **Generar token** con `whatsapp_business_messaging` y `whatsapp_business_management`. Ponlo en `WHATSAPP_TOKEN`.

## 4. Webhook de pey

Una llave de pey admite **un solo webhook**: ponlo con la URL definitiva (Render).
1. portal.mipey.mx → **Desarrollador** → engrane de tu llave.
2. URL: `https://<URL>/api/webhook-pey` → **Crear Webhook**.
3. Copia el secreto (`whsec_…`) a `PEY_WEBHOOK_SECRET` (en Render y en tu `.env`).
4. Prueba: haz un pago de $0.01 y revisa en el portal → **Webhook Logs** que la respuesta haya sido `200`.

## 5. Facturama (opcional, facturas timbradas en sandbox)

1. Crea una cuenta de pruebas de Facturama (API Web, sandbox) y configura ahí el emisor de pruebas con su CSD.
2. Llena `FACTURAMA_USUARIO`, `FACTURAMA_CLAVE` y `FACTURAMA_LUGAR_EXPEDICION` (CP del emisor). `FACTURAMA_URL` vacía = sandbox.
3. Sin estas variables, el bot emite facturas **SIMULADAS** (PDF sin validez fiscal), que es lo esperado para la demo.

⚪ La ruta de descarga del PDF de Facturama (`GET /cfdi/pdf/issued/{id}`) no se encontró en la documentación consultada el 14-nov: pruébala con la primera factura real.

## 6. Rotar la llave de pey

La llave actual se compartió en un chat el 14-nov. Las reglas piden avisar a pey en 24 h si una credencial se compromete (K01.8).
1. portal.mipey.mx → Desarrollador → **Crear API Key** nueva (vinculada a la cuenta `codi`).
2. Cambia `PEY_API_KEY` en `.env` y en Render.
3. Vuelve a crear el webhook en la llave nueva (paso 4).
4. Borra la llave vieja.

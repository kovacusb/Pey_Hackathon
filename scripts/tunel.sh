#!/usr/bin/env bash
# Abre un túnel público a localhost:3000 y apunta el webhook de WhatsApp (Meta) a la URL nueva.
# Uso: bash scripts/tunel.sh            (deja el túnel corriendo; Ctrl+C lo cierra)
# Requiere: cloudflared en ~/.local/cloudflared/cloudflared (o en PATH) y en .env WHATSAPP_TOKEN,
#           WHATSAPP_APP_SECRET y WHATSAPP_VERIFY_TOKEN. No imprime secretos.
# Los túneles rápidos de Cloudflare no se recuperan si se corta la red: vuelve a correr este script.
set -uo pipefail
cd "$(dirname "$0")/.."
[ -f .env ] || { echo "Falta .env"; exit 1; }
set -a; source .env; set +a

CF="${CLOUDFLARED:-$HOME/.local/cloudflared/cloudflared}"
command -v "$CF" >/dev/null 2>&1 || CF=cloudflared
LOG="${TMPDIR:-/tmp}/paga-facil-tunel.log"
G="https://graph.facebook.com/${WHATSAPP_GRAPH_VERSION:-v25.0}"

curl -s --max-time 5 localhost:${PORT:-3000}/salud | grep -q '"ok":true' || { echo "El servidor no responde en localhost:${PORT:-3000} (cd apps/api && npm run dev)"; exit 1; }

# HTTP/2 sobre TCP: más estable que QUIC (UDP) en redes de casa y de eventos.
"$CF" tunnel --no-autoupdate --protocol http2 --url "http://localhost:${PORT:-3000}" >"$LOG" 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null' EXIT INT TERM

URL=""
for _ in $(seq 1 60); do
  URL=$(grep -oE "https://[a-z0-9-]+\.trycloudflare\.com" "$LOG" | head -1)
  [ -n "$URL" ] && break
  sleep 0.5
done
[ -n "$URL" ] || { echo "cloudflared no dio URL; revisa $LOG"; exit 1; }
for _ in $(seq 1 40); do curl -s --max-time 5 "$URL/salud" | grep -q '"ok":true' && break; sleep 3; done
echo "URL pública: $URL"
echo "$URL" > "${TMPDIR:-/tmp}/paga-facil-url.txt"

# Apunta el webhook de Meta a la URL nueva (suscripción a nivel app, campo messages).
APP=$(curl -s "$G/debug_token?input_token=$WHATSAPP_TOKEN&access_token=$WHATSAPP_TOKEN" | python3 -c "import json,sys;print(json.load(sys.stdin).get('data',{}).get('app_id',''))")
if [ -n "$APP" ] && [ -n "${WHATSAPP_APP_SECRET:-}" ]; then
  curl -s -X POST "$G/$APP/subscriptions" \
    --data-urlencode "object=whatsapp_business_account" \
    --data-urlencode "callback_url=$URL/api/whatsapp" \
    --data-urlencode "verify_token=$WHATSAPP_VERIFY_TOKEN" \
    --data-urlencode "fields=messages" \
    --data-urlencode "access_token=$APP|$WHATSAPP_APP_SECRET" |
    python3 -c "import json,sys;d=json.load(sys.stdin);print('Webhook de Meta:', 'actualizado' if d.get('success') else d.get('error',{}).get('message'))"
else
  echo "No pude leer la app de Meta: configura el webhook a mano con $URL/api/whatsapp"
fi
echo "Panel: $URL/panel/?clave=<PANEL_CLAVE> · Chat web: $URL/dev/?clave=<DEV_CLAVE>"
wait $PID

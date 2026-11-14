#!/usr/bin/env bash
# Sube las variables de .env como secretos cifrados del repo en GitHub, sin imprimir sus valores.
#
# Uso:  gh auth login              # una vez, si gh no tiene sesión
#       bash scripts/cargar_secretos.sh
#
# Quedan disponibles como variables de entorno para:
#   - Codespaces (agentes que trabajan dentro de un codespace del repo)
#   - GitHub Actions (agentes que corren como Action, p. ej. el de Claude Code)
# Nadie puede leerlas desde el repo ni desde la web de GitHub; solo se pueden reemplazar o borrar.
# Para Vercel, Codex en la nube o Claude Code en la web, cárgalas en la configuración de cada servicio.
set -euo pipefail

cd "$(dirname "$0")/.."
REPO="${REPO:-kovacusb/Pey_Hackathon}"
VARIABLES=(PEY_API_KEY PEY_WEBHOOK_SECRET MAX_MONTO_MXN
           WHATSAPP_TOKEN WHATSAPP_PHONE_NUMBER_ID WHATSAPP_APP_SECRET WHATSAPP_VERIFY_TOKEN
           ANTHROPIC_API_KEY)

[ -f .env ] || { echo "No existe .env (copia .env.example y llénalo)"; exit 1; }
git check-ignore -q .env || { echo "ALTO: .env no está en .gitignore"; exit 1; }

for nombre in "${VARIABLES[@]}"; do
  valor="$(grep -E "^${nombre}=" .env | tail -1 | cut -d= -f2- || true)"
  if [ -z "$valor" ]; then
    echo "· $nombre: vacío en .env, se omite"
    continue
  fi
  for app in codespaces actions; do
    printf '%s' "$valor" | gh secret set "$nombre" --app "$app" --repo "$REPO" >/dev/null
  done
  echo "✓ $nombre → secretos de Codespaces y Actions de $REPO"
done

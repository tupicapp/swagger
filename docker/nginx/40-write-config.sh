#!/bin/sh
set -eu

escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

# Every entry in the Swagger UI definition dropdown is resolved at container
# start from the environment, so the same image serves every environment.
# Values come from helm-charts/app/values*.yaml -> ConfigMap -> envFrom.
emit() {
  printf '  %s: "%s",\n' "$1" "$(escape "$2")"
}

{
  printf 'window.__APP_CONFIG__ = {\n'
  emit IAM_DOCS_URL "${IAM_DOCS_URL:-}"
  emit ACCOUNTS_DOCS_URL "${ACCOUNTS_DOCS_URL:-}"
  emit LIVE_V2_DOCS_URL "${LIVE_V2_DOCS_URL:-}"
  emit LIVE_V3_DOCS_URL "${LIVE_V3_DOCS_URL:-}"
  emit MOMENT_DOCS_URL "${MOMENT_DOCS_URL:-}"
  emit ASSETS_DOCS_URL "${ASSETS_DOCS_URL:-}"
  emit FINANCE_DOCS_URL "${FINANCE_DOCS_URL:-}"
  emit INSIGHTS_DOCS_URL "${INSIGHTS_DOCS_URL:-}"
  emit NOTIFICATIONS_DOCS_URL "${NOTIFICATIONS_DOCS_URL:-}"
  emit CHAIN_DOCS_URL "${CHAIN_DOCS_URL:-}"
  emit GAMES_DOCS_URL "${GAMES_DOCS_URL:-}"
  emit ACADEMY_DOCS_URL "${ACADEMY_DOCS_URL:-}"
  emit DEVELOPERS_DOCS_URL "${DEVELOPERS_DOCS_URL:-}"
  emit PRIMARY_DOCS_NAME "${PRIMARY_DOCS_NAME:-}"
  printf '};\n'
} > /usr/share/nginx/html/config.js

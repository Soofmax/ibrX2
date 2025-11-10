# Payments API (v1) — SmarterLogicWeb

API légère via Fonctions Netlify pour paiements Stripe, versionnée pour la stabilité.

## Base URL

- Production: `https://<site>/.netlify/functions`
- Local: `http://localhost:8888/.netlify/functions` (via `netlify dev`)

## Endpoints

### POST /v1/create-checkout-session

Crée une session Stripe Checkout pour un don fixe.

- Request (JSON):
  - `amount` (entier, enum: [1, 5, 10, 25]) — en EUR
  - `lang` ('fr' | 'en', défaut: 'fr')

- Responses:
  - `200` — `{ "url": "<stripe-checkout-url>" }`
  - `400` — `{ "error": "Invalid amount" }` ou `{ "error": "Invalid JSON payload" }`
  - `405` — Method not allowed
  - `429` — `{ "error": "Too Many Requests" }`
  - `500` — `{ "error": "Stripe secret key not configured" }` ou erreurs Stripe

- CORS:
  - Allowlist via `ALLOWED_ORIGINS`
  - Preflight `OPTIONS`
  - `SITE_URL` pour success/cancel URLs

### POST /v1/stripe-webhook

Webhook Stripe avec vérification de signature et déduplication.

- Headers:
  - `Stripe-Signature: <signature>`

- Responses:
  - `200` — `"ok"` ou `"duplicate"`
  - `400` — `"Missing Stripe-Signature header"` ou erreurs de signature
  - `405` — Method not allowed
  - `500` — `"Stripe secrets not configured"` ou erreurs de traitement

- Idempotence:
  - Redis (Upstash) si configuré (`SET key NX EX ttl`), sinon TTL en mémoire

## Variables d’environnement

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SITE_URL`
- `ALLOWED_ORIGINS`
- `RATE_LIMIT_MAX` (par défaut 20)
- `UPSTASH_REDIS_REST_URL` (optionnel)
- `UPSTASH_REDIS_REST_TOKEN` (optionnel)

## OpenAPI

Voir `docs/api/create-checkout-session.openapi.yaml` pour la spéc du Checkout. Le webhook peut être décrit de la même manière si besoin.
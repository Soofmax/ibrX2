# Payments API (v1)

This project exposes Netlify Functions for Stripe payments. The API is versioned to ensure integration stability.

## Base URL

- Production: `https://<site>/\.netlify/functions`
- Local dev: `http://localhost:8888/.netlify/functions` (when using `netlify dev`)

## Endpoints

### POST /v1/create-checkout-session

Create a Stripe Checkout session for a fixed donation amount.

- Request (JSON):
  - `amount` (integer, enum: [1, 5, 10, 25]) — donation amount in EUR
  - `lang` (string, enum: [fr, en], default: fr)

- Responses:
  - `200` — `{ "url": "<stripe-checkout-url>" }`
  - `400` — `{ "error": "Invalid amount" }` or `{ "error": "Invalid JSON payload" }`
  - `405` — Method not allowed
  - `429` — `{ "error": "Too Many Requests" }`
  - `500` — `{ "error": "Stripe secret key not configured" }` or Stripe errors

- CORS:
  - Restricted to `ALLOWED_ORIGINS` (env)
  - Preflight `OPTIONS` supported
  - `SITE_URL` used for success/cancel URLs (no dynamic Origin/Referer)

### POST /v1/stripe-webhook

Stripe webhook handler with signature verification and durable idempotency when configured.

- Headers:
  - `Stripe-Signature: <signature>`

- Responses:
  - `200` — `"ok"` or `"duplicate"`
  - `400` — `"Missing Stripe-Signature header"` or signature errors
  - `405` — Method not allowed
  - `500` — `"Stripe secrets not configured"` or processing errors

- Idempotency:
  - When `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set, webhook events are deduplicated using Redis (`SET key NX EX ttl`). Fallback to in-memory TTL otherwise.

## Environment Variables

- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `SITE_URL` — canonical site origin
- `ALLOWED_ORIGINS` — allowed CORS origins (comma-separated)
- `RATE_LIMIT_MAX` — rate limit requests/minute (default 20)
- `UPSTASH_REDIS_REST_URL` — Upstash Redis REST URL (optional)
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis REST token (optional)

## OpenAPI

See `docs/api/create-checkout-session.openapi.yaml` for a machine-readable specification of the Checkout endpoint. Webhook specification can be added similarly as needed.
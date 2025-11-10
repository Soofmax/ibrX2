# API — Endpoints Netlify Functions

## v1-create-checkout-session
- Méthode: POST
- Corps:
  {
    "amount": number (1|5|10|25),
    "lang": "fr" | "en"
  }
- Retour:
  {
    "url": string // Stripe Checkout URL
  }
- CORS: allowlist d’origines via `ALLOWED_ORIGINS`

## v1-stripe-webhook
- Méthode: POST
- Headers: `Stripe-Signature` 
- Corps: évènement Stripe (signé)
- Vérification de signature, déduplication, extensible pour persistance

## Spécifications
- OpenAPI (checkout): `docs/api/create-checkout-session.openapi.yaml`

## Sécurité
- Voir `SECURITY.md` pour CORS/Rate Limit/Idempotence
# Configuration

## Variables d’environnement

Créez un fichier `.env` à partir de `.env.example`:

### Client (analytics au choix)
- `VITE_PLAUSIBLE_DOMAIN`
- `VITE_UMAMI_SRC`
- `VITE_UMAMI_WEBSITE_ID`
- `VITE_GA_ID`

### Serveur (Netlify Functions)
- `STRIPE_SECRET_KEY` — clé secrète Stripe
- `SITE_URL` — URL du site (sans slash final)
- `ALLOWED_ORIGINS` — liste d’origines autorisées (CORS)
- `RATE_LIMIT_MAX` — seuil de rate-limit (optionnel)

### Durabilité (optionnel)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Sécurité
- CSP/HSTS headers sont gérés via la config Netlify (`netlify.toml`)
- Ne commitez jamais de secrets
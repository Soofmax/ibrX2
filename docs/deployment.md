# Déploiement — Netlify

## Build/Publish
- Build: `npm run build`
- Publish: `dist/`
- Config: `netlify.toml`
  - Fonctions serverless: `netlify/functions`
  - Headers sécurité (CSP/HSTS/etc.)
  - Redirects

## Variables d’environnement
- Obligatoires:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `SITE_URL`
  - `ALLOWED_ORIGINS`
- Optionnelles durabilité:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Analytics (optionnel):
  - `VITE_PLAUSIBLE_DOMAIN`, `VITE_UMAMI_SRC`, `VITE_UMAMI_WEBSITE_ID`, `VITE_GA_ID`

## Fonts
- Auto-hébergement via `@font-face` (voir `src/index.css`)
- Fichiers WOFF2 à placer dans `public/fonts/` si vous souhaitez des polices custom

## CI/Qualité
- GitHub Actions: lint, typecheck, test (couverture), audit, build
- Security scans: Gitleaks, CodeQL, OSV
- Lighthouse CI (hebdo + manuel)

Gardez la configuration minimale; n’ajoutez des services que si nécessaires.

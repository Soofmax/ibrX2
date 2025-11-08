# Déploiement Netlify

- Build: `npm run build`
- Publish directory: `dist/`
- Netlify configuration: `netlify.toml`
  - Fonctions serverless: `netlify/functions`
  - Headers et CSP (sécurité)
  - Redirects (legacy routes)

Environnements:

- Variables à définir: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SITE_URL`, `ALLOWED_ORIGINS`
- Rate limiting / idempotence durable (optionnel mais recommandé):
  - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Analytics (optionnels): `VITE_PLAUSIBLE_DOMAIN`, `VITE_UMAMI_SRC`, `VITE_UMAMI_WEBSITE_ID`, `VITE_GA_ID`

Fonts:

- Les polices sont configurées pour être auto-hébergées via `@font-face` (voir `src/index.css`).
- Ajoutez les fichiers WOFF2 dans `public/fonts/` (ex: `Caveat.woff2`, `EBGaramond.woff2`).

Tests:

- CI GitHub Actions: build, lint, typecheck, test (avec seuils de couverture), audit
- Scans sécurité: gitleaks (secrets), CodeQL (SAST), OSV-Scanner (CVEs)
- Lighthouse CI (local dist) activé dans le workflow unifié

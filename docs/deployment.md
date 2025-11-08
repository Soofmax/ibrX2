# Déploiement Netlify

- Build: `npm run build`
- Publish directory: `dist/`
- Netlify configuration: `netlify.toml`
  - Fonctions serverless: `netlify/functions`
  - Headers et CSP (sécurité)
  - Redirects (legacy routes)

Environnements:

- Variables à définir: `STRIPE_SECRET_KEY`, `SITE_URL`, `ALLOWED_ORIGINS`
- Analytics (optionnels): `VITE_PLAUSIBLE_DOMAIN`, `VITE_UMAMI_SRC`, `VITE_UMAMI_WEBSITE_ID`, `VITE_GA_ID`

Tests:

- CI GitHub Actions: build, lint, typecheck, test, audit
- Lighthouse CI recommandé (voir `.github/workflows/lighthouse.yml`)

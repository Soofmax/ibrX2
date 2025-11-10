# Déploiement — Production

## Netlify
- Build: `npm run build`
- Publish: `dist/`
- Variables d’environnement: Stripe, CORS, Analytics
- Headers: CSP/HSTS/etc. via `netlify.toml`

## Vérifications
- Lighthouse CI (perf, a11y, best practices, SEO)
- Logs Netlify Functions pour Stripe
- Règles CORS et CSP fonctionnelles
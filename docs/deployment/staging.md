# Déploiement — Staging

## Netlify (préconisé)
- Créez un site Netlify connecté au repo
- Build command: `npm run build`
- Publish directory: `dist`

## Environnements
- Configurez les variables `.env` via Netlify UI (Build & Deploy → Environment)
- Activez headers de sécurité via `netlify.toml`
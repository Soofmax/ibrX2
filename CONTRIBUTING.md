# Contributing — SmarterLogicWeb

Merci pour votre intérêt à contribuer ! Ce projet utilise React 18, TypeScript, Vite, Tailwind et des Fonctions Netlify (Stripe).

## Démarrage

- Node: voir `.nvmrc` (Node 20)
- Installer: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm run test`
- Build: `npm run build`

## Variables d’environnement

Copiez `.env.example` vers `.env` et renseignez:

- Client: `VITE_PLAUSIBLE_DOMAIN`, `VITE_UMAMI_SRC`, `VITE_UMAMI_WEBSITE_ID`, `VITE_GA_ID`
- Serveur: `STRIPE_SECRET_KEY`, `SITE_URL`, `ALLOWED_ORIGINS`, optionnel `RATE_LIMIT_MAX`
- Optionnel durabilité (rate-limit/idempotence): `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Standards de code

- Prettier pour le formatage
- ESLint + TypeScript (strict) — pas de `any` explicite
- Composants petits et réutilisables; évitez les duplications
- Aucun secret dans le code; utilisez des variables d’environnement

## Processus Pull Request

- Branchez depuis `main`
- Ajoutez des tests si pertinent
- Mettez à jour la documentation si le comportement change
- Assurez la réussite CI (lint, typecheck, tests, build, audit)

## Sécurité

- N’exposez aucun secret dans le code ou les logs
- Respectez CSP/CORS
- Lisez `SECURITY.md`

## Code of Conduct

- Respectez le `CODE_OF_CONDUCT.md` (Contributor Covenant)

## License

En contribuant, vous acceptez que vos contributions soient publiées sous licence MIT.

## Contact

- SmarterLogicWeb — https://smarterlogicweb.com
- Email: admin@smarterlogicweb.com
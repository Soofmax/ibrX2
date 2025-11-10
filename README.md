# Transcontinental Trek — SPA React / Stripe / Netlify Functions

<!-- Status & Déploiement -->
[![Website](https://img.shields.io/website?url=https%3A%2F%2Ftranscontinental-trek.netlify.app&label=website&logo=netlify&logoColor=white)](https://transcontinental-trek.netlify.app)
[![Hosting](https://img.shields.io/badge/Hosting-Netlify-00ad9f)](https://www.netlify.com)

<!-- Tech & Standards -->
[![Node](https://img.shields.io/badge/node-20.x-339933?logo=node.js&logoColor=white)](.nvmrc)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<!-- Qualité & Conformité -->
[![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](.github/workflows/unified-ci.yml)
[![A11y](https://img.shields.io/badge/A11y-WCAG_2.1_AA-0a7ea4)](docs/accessibility.md)
[![Security](https://img.shields.io/badge/Security-CSP%2FCORS%2FRate_Limit-8a2be2)](SECURITY.md)
[![Analytics](https://img.shields.io/badge/Analytics-Consent_Gated-orange)](docs/seo.md)

## Quick Start

```bash
# Cloner et démarrer
git clone https://github.com/Soofmax/ibrX2.git
cd ibrX2
npm install
npm run dev
```

Build et preview:
```bash
npm run build
npm run preview
```

## Aperçu

Ajoutez vos captures ou GIFs ici:
- Hero + KPI animés
- Carte "Where am I now?" (play/pause, vitesse, étapes)

## Tech Stack

| Catégorie      | Technologies                                                                 |
|----------------|-------------------------------------------------------------------------------|
| Frontend       | React 18, TypeScript, Vite, Tailwind CSS, React Router DOM, Lucide Icons     |
| Backend        | Netlify Functions (Stripe Checkout + Webhook)                                |
| Sécurité       | Netlify headers (CSP/HSTS/XCTO/XFO), CORS allowlist, rate limiting           |
| Tests/Qualité  | Vitest + Testing Library, ESLint, Prettier, Lighthouse CI                    |
| CI/CD          | GitHub Actions (Unified CI: build, lint, typecheck, tests, audit, Lighthouse)|
| Analytics      | Plausible/Umami/GA (gérés par consentement utilisateur)                      |
| Docs           | Architecture, i18n, SEO, style-guide, déploiement, troubleshooting           |

## Points forts techniques

- Performance
  - Split bundling (Vite), Tailwind JIT, cache long pour assets (Netlify).
  - Support prefers-reduced-motion, optimisations Lighthouse (fonts prévus en self-host).
- Sécurité
  - CSP stricte (sans inline scripts), HSTS, X-Frame-Options, Referrer-Policy.
  - Fonctions Stripe avec CORS verrouillé, rate limiting, déduplication (webhook).
- Qualité
  - CI unifiée: lint, typecheck, tests (couverture), build, audit, CodeQL, Gitleaks, Lighthouse.
- Maintenabilité
  - i18n via context, composants modulaires, types partagés pour flux de paiement.

## Démarrer en local

Prérequis:
- Node 20 (voir `.nvmrc`)
- npm 9+

Commandes utiles:
```bash
npm install
npm run dev       # serveur de dev
npm run test      # tests Vitest
npm run build     # build production
npm run preview   # preview dist/
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
```

## Qualité & CI

- Workflow: `.github/workflows/unified-ci.yml`
  - Jobs: lockfile-regenerate, quality (lint/typecheck/tests/build/size), secret scan (Gitleaks), OSV, CodeQL, Lighthouse, Pages.
  - Rapport Lighthouse rendu hebdomadaire et disponible en artifact (`docs/lighthouse-last.html`).

Lancer localement:
```bash
npm run lint
npm run typecheck
npm run test:coverage
npm run build
```

## Déploiement Netlify

- Build: `npm run build`
- Publish: `dist/`
- Variables d’environnement (Netlify UI):
  - `STRIPE_SECRET_KEY`, `SITE_URL`, `ALLOWED_ORIGINS`, `RATE_LIMIT_MAX` (optionnel)
  - Upstash (optionnel): `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Headers de sécurité et CSP: `netlify.toml`

## SEO: bonnes pratiques (résumé)

- Composant `SEO.tsx`: meta essentielles, OG/Twitter, canonical, JSON‑LD basique.
- Hreflang FR/EN, liens alternates, titres/descriptions cohérents.
- Images optimisées, tailles définies, lazy pour non-critiques.

## Accessibilité (résumé)

- Focus visible (.focus-ring), skip link, clavier OK.
- Composants animés compatibles reduced motion.
- Labelling et aria-live sur la carte.

## Analytics (Consent gating)

- ConsentBanner + injection conditionnelle (Plausible/Umami/GA).
- Stockage du choix (localStorage), activation post-consent.

## Structure du projet

- `src/components/` — UI (Hero, CurrentLocation, Carousels, Donations…)
- `src/i18n/` — context + dictionnaires FR/EN
- `src/services/` — api client (Stripe)
- `netlify/functions/` — endpoints Stripe (checkout + webhook)
- `docs/` — architecture, i18n, SEO, style-guide, deployment, troubleshooting
- `netlify.toml` — headers sécurité, cache, redirects

## Contribution

Nous acceptons les contributions !  
Consultez:
- 📖 [CONTRIBUTING.md](CONTRIBUTING.md)
- ✅ [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

Workflow recommandé:
1. Fork
2. Branche: `feature/xxx`
3. Commits clairs
4. PR vers `main` avec tests et docs

## Licence

- MIT — voir [LICENSE](LICENSE).

## Contact

- SmarterLogicWeb — https://smarterlogicweb.com
- Email: admin@smarterlogicweb.com
- LinkedIn: https://linkedin.com/company/smarterlogicweb

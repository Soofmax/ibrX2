# Architecture — Vue d’ensemble

## Frontend
- React 18 + TypeScript (Vite)
- Routage: React Router DOM
- UI: Tailwind CSS, Lucide Icons
- i18n: context React + dictionnaires FR/EN
- Accessibilité: focus-ring, aria-live, reduced-motion

## Carte animée
- Composant: `src/components/CurrentLocation.tsx`
- Données: `src/data/routeStops.ts`, `src/data/expeditionPlan.ts`
- Contrôles: play/pause, vitesse, étapes, aria-live

## Backend (serverless)
- Netlify Functions
- `create-checkout-session`: Stripe Checkout
- `stripe-webhook`: signature + déduplication
- Sécurité: CORS allowlist, rate limiting, secrets, CSP via Netlify

## CI/CD
- GitHub Actions “Unified CI”
- Jobs: lint, typecheck, tests (couverture), build, audit, size
- Scans: Gitleaks, OSV-Scanner, CodeQL
- Lighthouse (hebdo + manuel)

## Déploiement
- Netlify (dist/)
- Headers de sécurité (Netlify config)
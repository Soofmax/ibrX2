# Security Policy — SmarterLogicWeb

Nous prenons la sécurité au sérieux et apprécions les divulgations responsables.

- Branches supportées: `main` (maintenue activement).
- Signalement d’une vulnérabilité: envoyez un email à [email] (remplacez par votre contact sécurité) ou ouvrez une “GitHub Security Advisory” privée.
- Incluez une description claire, des étapes de reproduction, la version affectée et l’impact potentiel.

## Portée

- Application cliente (React + Vite)
- Fonctions Netlify (Stripe Checkout + Webhook)
- Configuration (Netlify, CI, en-têtes de sécurité CSP/HSTS/etc.)

## Bonnes pratiques en place

- CSP stricte, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- CORS verrouillé (allowlist d’origines + gestion du préflight OPTIONS)
- Rate limiting IP pour la fonction Stripe (durable via Upstash Redis si configuré)
- Secrets via variables d’environnement; aucun secret commité
- CI: lint, typecheck, tests, build, audit, Lighthouse, CodeQL, Gitleaks

## Divulgation de vulnérabilités

1. Ne divulguez pas publiquement avant qu’un correctif ne soit disponible.
2. Fournissez un PoC et les détails de version/environnement.
3. Accusé de réception sous 48h, puis calendrier de remédiation communiqué.

## Scans de sécurité recommandés

- `npm audit` en local et CI
- OSV-Scanner, Snyk (transitifs)
- CodeQL (SAST)
- Secret scanning historique Git via Gitleaks/TruffleHog

## Données & conformité (GDPR)

- Analytics conditionnées au consentement utilisateur (localStorage), configurées via variables.
- Paiements gérés par Stripe Checkout; aucune donnée carte traitée/stockée côté serveur.
- Voir `docs/privacy.md` (à compléter) pour les pratiques de données.

## Contact

- SmarterLogicWeb — https://smarterlogicweb.com
- Sécurité: [email] (remplacez par votre email pro)
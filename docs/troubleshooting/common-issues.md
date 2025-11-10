# Troubleshooting — Problèmes fréquents

## npm ci — lockfile out-of-sync
- Symptom: `npm ci` échoue sur la branche de base
- Fix: utilisez `npm install` dans l’action “compressed-size” (déjà corrigé)

## Tests @testing-library — sélections ambiguës
- Symptom: “Found multiple elements...” pour un bouton
- Fix: utilisez `data-testid` ou scoping via `within()`

## Coverage badge
- Les badges dynamiques nécessitent un service (Codecov/Sonar). Le README utilise un badge indicatif.

## CSP bloque des assets
- Vérifiez les directives `script-src`, `font-src`, `img-src` dans `netlify.toml`

## Stripe — erreurs CORS/JSON
- CORS: configurez `ALLOWED_ORIGINS`
- JSON invalide: la fonction renvoie 400 `Invalid JSON payload`
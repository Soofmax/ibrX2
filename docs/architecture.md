# Architecture — SmarterLogicWeb

Vue d’ensemble compacte pour retrouver ses repères rapidement.

## Stack

- React 18 + TypeScript (Vite)
- React Router DOM (multipage)
- Tailwind CSS
- i18n via contexte (FR/EN)
- SEO via `SEO.tsx`
- Lucide Icons

## Arborescence (résumé)

- `src/components/` — Header, Footer, Hero, BlogPosts, Fleet, Team, Logistics, PracticalInfo, CurrentLocation, Itinerary, Sponsoring, SponsorTargets, SEO
- `src/data/` — blogPosts.ts, routeStops.ts, expeditionPlan.ts
- `src/i18n/` — I18nContext.tsx, dict.ts
- `netlify/functions/` — checkout + webhook (Stripe)
- `docs/` — guides et références

## Routage

- `/` Accueil
- `/itinerary`
- `/fleet`
- `/team`
- `/logistics`
- `/practical`
- `/blog`
- `/sponsors`
- `/sponsor-targets`
- `/support`
- `/contact`
- `/privacy`, `/terms` (si présents)
- 404

## Composants clés

- SEO: title, description, path, image, lang, siteName → ajoute title/meta/canonical/OG/Twitter/JSON-LD
- CurrentLocation:
  - Carte SVG animée, stops via `routeStops.ts`
  - Lecture/Pause, vitesse, prev/next
  - Ferry: style distinct + icône
  - ETA: estimation via `useETA()` (documenté dans le hook)
  - A11y: aria-live, tooltips focusables, reduced-motion

## Styles globaux

- Tailwind default + utilitaire `.focus-ring`
- `prefers-reduced-motion` respecté
- `scroll-mt-24` pour header fixe

## Données

- BlogPosts: liste typée (title/excerpt/date/image/category)
- RouteStops: ordre + `modeToNext` (road/ferry)
- ExpeditionPlan: km totaux, mois estimés

## i18n (aperçu)

- `useI18n()` → `{ lang, setLang, t }`
- `t(key)` retourne FR/EN
- `localStorage('lang')` + html lang mis à jour
- Bonnes pratiques: voir `docs/i18n.md`

## Ajouts fréquents

- Nouvelles pages: route + Header/Footer + `SEO`
- Nouvelles sections: garder padding/espacement cohérents
- Contenus: stocker dans `src/data/…` et importer

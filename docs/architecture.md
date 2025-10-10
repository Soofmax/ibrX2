# Architecture

Objectif: décrire la structure du projet, les routes, les composants clés et où brancher les contenus.

## Stack

- React 18 + TypeScript (Vite)
- React Router DOM (site multipage)
- Tailwind CSS
- i18n via contexte maison (FR/EN)
- SEO léger via SEO.tsx
- Lucide Icons

## Arborescence (résumé)

- src/components
  - Header, Footer, Hero
  - BlogPosts, Fleet, Team, Logistics, PracticalInfo
  - CurrentLocation (carte animée)
  - Itinerary, Sponsoring, SponsorTargets
  - SEO (gestion balises head)
- src/data
  - blogPosts.ts — articles statiques
  - routeStops.ts — étapes de la carte (ordre + mode ferry)
  - expeditionPlan.ts — chiffres globaux (km, mois)
- src/i18n
  - I18nContext.tsx — dictionnaires FR/EN, persistance
- public
  - (favicons, manifest si ajoutés)
- docs
  - (cette documentation)

## Routage

- "/" — Accueil (Hero, Blog teaser…)
- "/itinerary" — Itinéraire (CurrentLocation + Itinerary)
- "/fleet" — Flotte
- "/team" — Équipe
- "/logistics" — Logistique
- "/practical" — Infos pratiques
- "/blog" — Blog (liste statique)
- "/sponsors" — Sponsoring
- "/sponsor-targets" — Cibles sponsors
- "/support" — Soutien
- "/contact" — Contact & FAQ
- "/privacy", "/terms" — Légal (si présents)
- 404 — page non trouvée

## Composants clés

- Header
  - Nav desktop/mobile, aria-current pour la page active
  - Bascule FR/EN, background vert sombre, texte blanc
- Footer
  - Liens légaux, réseaux, quick links
- SEO
  - Props: title, description, path, image, lang, siteName
  - Ajoute title/meta/canonical/OG/Twitter/JSON-LD
- CurrentLocation
  - Carte SVG animée; stops depuis routeStops.ts
  - Contrôles: Lecture/Pause, vitesse, étape précédente/suivante
  - Ferry: segment pointillé + icône bateau + badge
  - ETA simulée (affichée clairement comme estimation)
  - A11y: tooltips focusables, aria-live, prefers-reduced-motion

## Styles globaux

- Tailwind config défaut (pas de palette custom)
- index.css:
  - .focus-ring utilitaire
  - media query prefers-reduced-motion
  - scroll-mt-24 pour compenser le header fixe

## Données

- BlogPosts: tableau typé d’articles (title, excerpt, date, image, category)
- RouteStops: liste ordonnée d’étapes (label, modeToNext road/ferry)
- ExpeditionPlan: agrégats (km totaux, mois, par continents si besoin)

## Internationalisation (aperçu)

- useI18n(): { lang, setLang, t }
- t(key) retourne une string depuis fr/en
- Persistance: localStorage('lang'), html lang mis à jour
- Bonnes pratiques d’ajout: docs/i18n.md

## Ajouts fréquents

- Nouvelles pages: définir la route, réutiliser Header/Footer, brancher SEO avec title/description/path
- Nouvelles sections: garder le rythme (py-24), card p-8, gap-8, focus-ring
- Contenus: placer dans src/data/… et importer depuis les composants

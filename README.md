# Transcontinental Trek — Documentation et Guide du Projet

Ce dépôt contient une application React + TypeScript (Vite) stylée avec Tailwind CSS. Elle présente l’expédition “Transcontinental Trek” avec un site multipage, une i18n FR/EN, une carte animée, un blog statique et des pages sponsors/logistique/pratique.

## 1) Démarrage

- Prérequis: Node 18+ (recommandé), npm 9+
- Installer les dépendances:
  npm install
- Lancer en développement:
  npm run dev
- Construire la version de production:
  npm run build
- Prévisualiser le build:
  npm run preview

Notes:
- Un avertissement “Browserslist: caniuse-lite is outdated” peut s’afficher; c’est non bloquant. Pour l’actualiser:
  npx update-browserslist-db@latest

## 2) Pile technique

- React 18 + TypeScript
- Vite 5
- React Router DOM (site multipage)
- Tailwind CSS (thème ambre/stone + accent vert sur la carte)
- Lucide Icons
- i18n maison (context React)
- SEO léger via composant SEO.tsx (ajout dynamique des balises head)

## 3) Structure du projet

- src/components: composants UI (Header, Footer, Hero, BlogPosts, CurrentLocation, Fleet, Team…)
- src/pages: pages routées (si présent)
- src/data: données statiques (blogPosts, routeStops, expeditionPlan)
- src/i18n: I18nContext (dictionnaires FR/EN, persistence locale)
- src/index.css: styles globaux, utilitaires focus, reduced-motion
- public/: assets statiques (favicons/manifest si ajoutés)
- docs/: documentation détaillée (architecture, i18n, contenu, carte, déploiement…)

## 4) Couleurs et style

Palette Tailwind (valeurs par défaut):
- Ambre (amber-50 … amber-700) : teinte principale et CTA
- Stone (stone-50/100/200/600/700/800/900) : neutres et textes
- Accents: orange-600, rose-50/200/600, green-100/600, red-600, white/black
- Header/Footer: fond vert sombre (green-900/950), texte blanc (contraste)
- Carte: points de ville en vert “apple” (#16A34A), tracé ambre (#d97706)

Accessibilité:
- Utilitaire .focus-ring (outline accessible)
- Préférence reduced-motion prise en compte
- Skip link, aria-current, aria-live pour la carte

## 5) i18n (FR/EN)

- Contexte: src/i18n/I18nContext.tsx
- Clé d’accès: const { t, lang, setLang } = useI18n()
- Persistance: localStorage('lang'), html lang synchronisé
- Ajout de clés: docs/i18n.md
- Traduction des données (articles, bios, specs): voir docs/content.md

## 6) SEO

- Composant SEO.tsx (manipule DOM pour balises meta/OG/Twitter/canonical/JSON-LD)
- À utiliser par page (titre, description, image, path)
- Détails: docs/seo.md

## 7) Carte animée

- Composant: src/components/CurrentLocation.tsx
- Données: src/data/routeStops.ts (ordre, modeToNext ferry), src/data/expeditionPlan.ts (kilométrage)
- Contrôles: play/pause, vitesse, étapes, tooltips, ferry, aria-live
- Détails, personnalisation, migration Mapbox: docs/map.md

## 8) Déploiement

- Netlify (recommandé)
- Build: npm run build, publish: dist/
- Erreurs courantes: voir docs/deployment.md

## 9) Contribution

- Conventions de code (TS + React + Tailwind), PR propres, i18n obligatoire pour nouveaux libellés
- Voir docs/contributing.md

Liens utiles:
- docs/architecture.md — Architecture et routes
- docs/i18n.md — Internationalisation
- docs/content.md — Gestion des contenus (blog, team, fleet)
- docs/seo.md — SEO par page
- docs/accessibility.md — Accessibilité
- docs/style-guide.md — Design system et styles
- docs/map.md — Carte animée et données itinéraire
- docs/deployment.md — Déploiement Netlify
- docs/contributing.md — Contribuer
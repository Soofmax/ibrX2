# Carte animée — SmarterLogicWeb

Vue d’ensemble de `CurrentLocation` et des données d’itinéraire.

## Composant et données
- Composant: `src/components/CurrentLocation.tsx`
- Données: `src/data/routeStops.ts`, `src/data/expeditionPlan.ts`

## Contrôles
- Lecture/Pause (bouton data-testid="toggle-play")
- Vitesse (sélecteur simple)
- Étapes précédente/suivante
- Tooltips, badge ferry, aria-live

## ETA (simplifiée)
- `useETA()` calcule une estimation basée sur la progression SVG et la vitesse moyenne.
- Documenté dans `src/hooks/useETA.ts`.

Conseil: Gardez les animations modérées, et respectez `prefers-reduced-motion`.

# Accessibilité — SmarterLogicWeb

Objectif: garder une UX accessible, compréhensible, et agréable, sans surcharger la base.

## Principes appliqués

- Skip link “Aller au contenu” en haut de page
- Focus visible (utilitaire `.focus-ring` via Tailwind)
- Respect de `prefers-reduced-motion` pour animations
- Aria-live pour la carte (mise à jour des étapes)
- Couleurs et contrastes conformes pour les éléments clés

## Vérifications rapides

- 1 H1 par page, hiérarchie titres cohérente
- Navigation clavier complète
- Alt text pertinents pour les images
- États focus/hover actifs et visibles

## Audit (Lighthouse / Pa11y)

- Lighthouse CI hebdo (non bloquant) pour indicateurs a11y
- Pa11y: à configurer si besoin (non inclus par défaut pour éviter la surcharge)

Conseil: Ajouter Pa11y seulement si nécessaire et maintenir une liste courte d’URL clés.

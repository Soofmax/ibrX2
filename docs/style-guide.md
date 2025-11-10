# Guide de style — SmarterLogicWeb

Objectif: garder des conventions simples et lisibles.

## UI (Tailwind 3.x)
- Palette: ambre (CTA), verts foncés (header/footer), neutres stone
- Typo: système (sans serif), polices custom en option
- Animations: modérées, respect de `prefers-reduced-motion`
- Composants: réutilisables, responsive, éviter les duplications (factoriser carrousels)

## Conventions
- Padding vertical des sections: `py-24`
- Cartes: `p-8`, `rounded`, `shadow` léger
- Focus: `.focus-ring` visible
- Icônes: Lucide, taille cohérente (`w-5 h-5` ou `w-6 h-6`)

Gardez la base légère; ajoutez des tokens/design system seulement si nécessaire.

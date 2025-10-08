# Contenus (blog, équipe, flotte)

Guide pour éditer les contenus sans casser le design.

## Blog (src/data/blogPosts.ts)

Schéma actuel (exemple):
- id: string
- title: string
- excerpt: string
- date: string (affiché tel quel)
- image: URL
- category: string

Recommandation pour bilingue:
- title, excerpt, category en objets localisés:
  title: { fr: string, en: string }
  excerpt: { fr: string, en: string }
  category: { fr: string, en: string }

Utilisation:
- Dans BlogPosts.tsx:
  const pick = (x) =&gt; (typeof x === 'string' ? x : (x[lang] ?? x.fr))
  const title = pick(post.title)
  const excerpt = pick(post.excerpt)
  const category = pick(post.category)

Images:
- Utiliser images hébergées (pexels…) avec compression et paramètre w= pour srcSet
- Alt: utiliser title (ou un alt spécifique si besoin)

## Équipe (src/components/Team.tsx)

Schéma interne (extrait):
- name: string
- role: t('team.role.…')
- bio: string
- icon: React Icon

Recommandation:
- Déporter dans src/data/team.ts si vous préférez “tout data”
- Bilingue pour bio:
  bio: { fr: string, en: string }
- Les rôles sont déjà via i18n

## Flotte (src/components/Fleet.tsx)

Recommandation:
- Déporter dans src/data/fleet.ts pour éviter de dupliquer les cartes
- Schéma:
  {
    id: 'nomad-1',
    name: { fr: 'Camion restauré — Nomad', en: 'Restored Truck — Nomad' },
    summary: { fr: 'Texte FR…', en: 'EN text…' },
    image: 'https://…',
    specs: [
      { label: { fr: 'Moteur', en: 'Engine' }, value: '6 cyl.' },
      { label: { fr: 'Suspension', en: 'Suspension' }, value: 'Renforcée' },
      …
    ]
  }

Utilisation:
- pick(lang) sur name/summary/label

## Itinéraire et carte

- Étapes: src/data/routeStops.ts
  - label (affiché sur la carte), modeToNext: 'road'|'ferry'
  - Définir l’ordre exact
  - Pauses spécifiques (ms) possibles si vous ajoutez une propriété pauseMs
- Totaux expédition: src/data/expeditionPlan.ts
  - distanceKm total, mois estimés

## Sponsors/Support

- Texte de valeur/CTA via i18n (UI)
- Liens de dons à fournir (PayPal, Patreon, Tipeee, Ulule)
- Si boutique prévue: lister items dans src/data/shop.ts (schéma simple: id, title FR/EN, price, image)

## Bonnes pratiques

- Garder les images légères (compressées) et utiliser srcSet/sizes.
- Toujours fournir un fallback FR pour les champs localisés.
- Noms propres non traduits (pays, marques si souhaité), à confirmer selon votre charte.
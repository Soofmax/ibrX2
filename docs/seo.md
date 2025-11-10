# SEO — SmarterLogicWeb

Objectif: une structure simple et maintenable, avec un composant unique `SEO.tsx`.

## Utilisation

Dans une page:
```tsx
import SEO from '../components/SEO';

<SEO
  title={t('hero.title1') + ' — Transcontinental Trek'}
  description={t('blog.tagline')}
  path={location.pathname}
  image="https://example.com/og-image.jpg"
  lang={lang}
  siteName="Transcontinental Trek"
/>
```

Props:
- title: obligatoire
- description?: optionnel
- path?: ex: '/itinerary'
- image?: URL absolue
- lang?: 'fr' | 'en' (défaut 'fr')
- siteName?: défaut 'Transcontinental Trek'

## Ajouts par SEO.tsx

- document.title
- meta description
- canonical
- Open Graph (site_name, title, description, url, image, locale)
- Twitter card
- JSON-LD (WebSite)

## Bonnes pratiques

- Un titre unique par page (court et descriptif)
- Description 140–160 caractères
- Image OG 1200x630
- Respect de la langue active (lang={lang})

Sitemap/robots: gérés via Netlify ou script dédié si nécessaire (préférer la simplicité).

## Alternative

react-helmet-async si vous préférez le mode déclaratif. Ajoutez uniquement si besoin (éviter la surcharge).

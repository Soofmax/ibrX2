# SEO (par page)

Le projet fournit un composant léger SEO.tsx qui ajoute dynamiquement les balises nécessaires.

## Utilisation

Dans une page/composant de page:
- import SEO from '../components/SEO'
- Rendre le composant en haut de la page:
  &lt;SEO
    title={t('hero.title1') + ' — Transcontinental Trek'}
    description={t('blog.tagline')}
    path={location.pathname}
    image="https://…/og-image.jpg"
    lang={lang}
    siteName="Transcontinental Trek"
  /&gt;

Props:
- title: string (obligatoire)
- description?: string
- path?: string (ex: '/itinerary')
- image?: string (URL absolue)
- lang?: 'fr' | 'en' (défaut 'fr')
- siteName?: string (défaut 'Transcontinental Trek')

## Ce que SEO.tsx ajoute

- document.title
- meta name="description"
- link rel="canonical"
- Open Graph (og:type, og:site_name, og:title, og:description, og:url, og:image, og:locale)
- Twitter (card, title, description, image)
- JSON-LD (WebSite: name, url, inLanguage, description)

## Bonnes pratiques

- Titre unique par page, court et descriptif
- Description 140–160 caractères, claire
- Image OG 1200x630 si possible
- Utiliser la langue active (lang={lang})
- Pour le blog, prévoir une image OG par article si vous passez à un système de pages d’article
- Ajouter un sitemap.xml et robots.txt (optionnel), gérés via Netlify ou build script dédié

## Option: react-helmet-async

Si vous préférez gérer les balises via React Helmet:
- Installer react-helmet-async
- Wrapper l’app dans &lt;HelmetProvider&gt;
- Remplacer SEO.tsx par un composant Helmet
- Avantage: code plus déclaratif; Inconvénient: dépendance en plus
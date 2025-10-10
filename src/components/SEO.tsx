import { useEffect } from 'react';

type GeoProps = {
  region?: string;
  placename?: string;
  position?: { lat: number; lon: number };
};

type Props = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  lang?: 'fr' | 'en';
  siteName?: string;
  geo?: GeoProps;
};

function ensureMetaByName(name: string, content?: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureMetaByProperty(property: string, content?: string) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureLinkRel(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function ensureHrefLangLink(hreflang: string, href: string) {
  let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  path,
  image,
  lang = 'fr',
  siteName = 'WanderGlobers',
  geoops) {
  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location
        ? `${window.location.origin}`
        : 'https://example.com';
    const canonical = path
      ? `${origin}${path}`
      : typeof window !== 'undefined'
        ? window.location.href
        : origin;
    const ogLocale = lang === 'en' ? 'en_US' : 'fr_FR';
    const fallbackImage =
      image ||
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1200';

    // Title and description
    document.title = title;
    ensureMetaByName('description', description || '');

    // Canonical
    ensureLinkRel('canonical', canonical);
    // hreflang alternates
    ensureHrefLangLink(lang, canonical);
    ensureHrefLangLink(lang === 'en' ? 'fr' : 'en', canonical);
    // Basic robots
    ensureMetaByName('robots', 'index,follow');

    // Open Graph
    ensureMetaByProperty('og:type', 'website');
    ensureMetaByProperty('og:site_name', siteName);
    ensureMetaByProperty('og:title', title);
    ensureMetaByProperty('og:description', description || '');
    ensureMetaByProperty('og:url', canonical);
    ensureMetaByProperty('og:image', fallbackImage);
    ensureMetaByProperty('og:locale', ogLocale);
    ensureMetaByProperty('og:locale:alternate', lang === 'en' ? 'fr_FR'
    // Twitter
    ensureMetaByName('twitter:card', 'summary_large_image');
    ensureMetaByName('twitter:title', title);
    ensureMetaByName('twitter:description', description || '');
    ensureMetaByName('twitter:image', fallbackImage);

    // JSON-LD (Website)
    const ldId = 'ld-website';
    let ld = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = ldId;
      document.head.appendChild(ld);
    }
    const ldPayload = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: canonical,
      inLanguage: lang,
      description: description || '',
    };
    ld.text = JSON.stringify(ldPayload);

    // Geo meta tags and Place JSON-LD (optional)
    if (geo) {
      const { region, placename, position } = geo;
      ensureMetaByName('geo.region', region);
      ensureMetaByName('geo.placename', placename);
      if (position) {
        const { lat, lon } = position;
        const posStr = `${lat};${lon}`;
        ensureMetaByName('geo.position', posStr);
        ensureMetaByName('ICBM', `${lat}, ${lon}`);

        // JSON-LD Place with coordinates
        const ldPlaceId = 'ld-place';
        let ldPlace = document.getElementById(ldPlaceId) as HTMLScriptElement | null;
        if (!ldPlace) {
          ldPlace = document.createElement('script');
          ldPlace.type = 'application/ld+json';
          ldPlace.id = ldPlaceId;
          document.head.appendChild(ldPlace);
        }
        const placePayload = {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: siteName,
          url: canonical,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: lat,
            longitude: lon,
          },
        };
        ldPlace.text = JSON.stringify(placePayload);
      }
    }

    // Optional analytics: Plausible / Umami / Google Analytics (configurable via Vite env)
    const { VITE_PLAUSIBLE_DOMAIN, VITE_UMAMI_SRC, VITE_UMAMI_WEBSITE_ID, VITE_GA_ID } = import.meta
      .env;

    if (VITE_PLAUSIBLE_DOMAIN && !document.getElementById('plausible-script')) {
      const s = document.createElement('script');
      s.defer = true;
      s.id = 'plausible-script';
      s.setAttribute('data-domain', VITE_PLAUSIBLE_DOMAIN);
      s.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(s);
    }

    if (VITE_UMAMI_SRC && VITE_UMAMI_WEBSITE_ID && !document.getElementById('umami-script')) {
      const s = document.createElement('script');
      s.defer = true;
      s.id = 'umami-script';
      s.setAttribute('data-website-id', VITE_UMAMI_WEBSITE_ID);
      s.src = VITE_UMAMI_SRC;
      document.head.appendChild(s);
    }

    if (VITE_GA_ID && !document.getElementById('ga-script')) {
      const s = document.createElement('script');
      s.async = true;
      s.id = 'ga-script';
      s.src = `https://www.googletagmanager.com/gtag/js?id=${VITE_GA_ID}`;
      document.head.appendChild(s);

      if (!document.getElementById('ga-init')) {
        const init = document.createElement('script');
        init.id = 'ga-init';
        init.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${VITE_GA_ID}');
        `;
        document.head.appendChild(init);
      }
    }
  }, [title, description, path, image, lang, siteName]);

  return null;
}

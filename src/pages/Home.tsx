import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { useI18n } from '../i18n/useI18n';
import SocialSection from '../components/SocialSection';
import NewsletterSection from '../components/NewsletterSection';

export default function Home() {
  const { lang, t } = useI18n();

  return (
    <div className="min-h-[60vh]">
      <SEO
        title={t('seo.homeTitle')}
        description={t('seo.homeDesc')}
        path="/"
        lang={lang}
        siteName={t('header.siteName')}
        geo={{
          region: 'FR-IDF',
          placename: lang === 'fr' ? 'Paris, France' : 'Paris, France',
          position: { lat: 48.8566, lon: 2.3522 },
        }}
      />
      <Hero />
      <SocialSection />
      <NewsletterSection />
    </div>
  );
}

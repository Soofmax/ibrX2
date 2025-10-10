import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { useI18n } from '../i18n/useI18n';

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
      />
      <Hero />
    </div>
  );
}

import Sponsoring from '../components/Sponsoring';
import SponsorTargets from '../components/SponsorTargets';
import SEO from '../components/SEO';
import { useI18n } from '../i18n/useI18n';

export default function SponsorsPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <SEO
        title={t('sponsors.heading')}
        description={t('sponsors.tagline')}
        path="/sponsors"
        lang={lang}
        siteName={t('header.siteName')}
      />
      <Sponsoring />
      <SponsorTargets />
    </>
  );
}

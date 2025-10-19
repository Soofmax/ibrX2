import SponsorTargets from '../components/SponsorTargets';
import SEO from '../components/SEO';
import { useI18n } from '../i18n/useI18n';

export default function SponsorTargetsPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <SEO
        title={t('nav.targets')}
        description={t('sponsors.tagline')}
        path="/sponsor-targets"
        lang={lang}
        siteName={t('header.siteName')}
      />
      <SponsorTargets />
    </>
  );
}

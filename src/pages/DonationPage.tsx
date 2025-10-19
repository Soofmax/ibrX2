import SEO from '../components/SEO';
import DonationSection from '../components/donation/DonationSection';
import { useI18n } from '../i18n/useI18n';

export default function DonationPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <SEO
        title={t('donation.title')}
        description={t('donation.description')}
        path="/donation"
        lang={lang}
      />
      <main>
        <DonationSection />
      </main>
    </>
  );
}

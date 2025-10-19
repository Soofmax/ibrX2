import EuropeCarousel from '../components/EuropeCarousel';
import Itinerary from '../components/Itinerary';
import { useI18n } from '../i18n/useI18n';

export default function ItineraryPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-12">
      <section className="px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-handwritten text-stone-900 mb-4">
            {t('itinerary.heading')}
          </h1>
        </div>
      </section>
      <EuropeCarousel />
      <Itinerary />
    </div>
  );
}

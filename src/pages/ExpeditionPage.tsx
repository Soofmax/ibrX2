import { useI18n } from '../i18n/useI18n';
import Team from '../components/Team';
import Fleet from '../components/Fleet';

export default function ExpeditionPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-12">
      <section className="px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-handwritten text-stone-900 mb-4">
            {t('expedition.h1')}
          </h1>
          <p className="text-lg text-stone-700 font-serif max-w-3xl mx-auto">
            {t('expedition.intro')}
          </p>
        </div>
      </section>

      {/* Section: Team */}
      <div className="animate-fade-in">
        <Team />
      </div>

      {/* Section: Fleet */}
      <div className="animate-fade-in">
        <Fleet />
      </div>
    </div>
  );
}

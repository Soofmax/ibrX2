import { Map, CalendarDays, Globe2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Itinerary() {
  const { t } = useI18n();

  return (
    <section id="itinerary" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-green-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-24 left-10 w-72 h-72 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Globe2 className="text-green-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            {t('itinerary.heading')}
          </h2>
          <p className="text-xl text-stone-600 font-serif">{t('itinerary.tagline')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Map className="text-green-600" size={24} />
                <h3 className="text-2xl font-handwritten text-stone-900">{t('itinerary.routeTitle')}</h3>
              </div>
              <p className="text-stone-700 font-serif leading-relaxed">
                Europe → Asie → Amériques → Océanie → Afrique. {t('itinerary.tagline')}
              </p>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-stone-200 to-green-100">
              <iframe
                title="Carte interactive"
                className="w-full h-full"
                src="https://www.google.com/maps/d/u/0/embed?mid=1tC2w_demo_map"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="text-green-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">{t('itinerary.calendarTitle')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Europe</span>
                <span>Avril — Juin 2026 (Londres → Istanbul)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Amériques</span>
                <span>Juillet 2026 — Février 2027 (Rio → Alaska)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Océanie</span>
                <span>Mars — Juin 2027 (Sydney → Nouvelle-Zélande)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Asie</span>
                <span>Juillet — Décembre 2027 (Singapour → Kazakhstan)</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Afrique</span>
                <span>Janvier — Juin 2028 (Le Caire → Cape Town)</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-stone-600 font-serif">
                {t('itinerary.points')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
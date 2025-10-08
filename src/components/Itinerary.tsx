import { Map, CalendarDays, Globe2, Download } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { expeditionPlan, expeditionTotals } from '../data/expeditionPlan';
import { generateCSVRoute, generateJSONRoute, downloadText } from '../utils/routeExport';

export default function Itinerary() {
  const { t } = useI18n();

  return (
    <section id="itinerary" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-24 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Globe2 className="text-amber-600 mx-auto" size={48} />
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
                <Map className="text-amber-600" size={24} />
                <h3 className="text-2xl font-handwritten text-stone-900">{t('itinerary.routeTitle')}</h3>
              </div>
              <p className="text-stone-700 font-serif leading-relaxed">
                Europe → Amériques → Océanie → Asie → Afrique → Retour Europe. {t('itinerary.tagline')}
              </p>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-stone-200 to-amber-100">
              <iframe
                title="Carte interactive"
                className="w-full h-full"
                src="https://www.google.com/maps/d/u/0/embed?mid=1tC2w_demo_map"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-8">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">{t('itinerary.calendarTitle')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Europe</span>
                <span>~3 mois • ~9 000 km</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Amériques</span>
                <span>~8 mois • ~28 000 km</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Océanie</span>
                <span>~1 mois • ~4 000 km</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Asie</span>
                <span>~6 mois • ~23 000 km</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Afrique</span>
                <span>~8 mois • ~32 000 km</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Retour</span>
                <span>~0,5 mois • ~1 500 km</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-stone-600 font-serif">
                {t('itinerary.points')}
              </p>
            </div>
          </div>
        </div>

        {/* Optimized roadmap table */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl border border-amber-200 p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-handwritten text-stone-900">Roadmap de l’expédition (optimisée)</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-secondary px-4 py-2"
                onClick={() => downloadText('route.csv', generateCSVRoute(), 'text/csv')}
                aria-label="Télécharger le parcours au format CSV"
              >
                <Download size={16} className="mr-1" /> CSV
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4 py-2"
                onClick={() => downloadText('route.json', generateJSONRoute(), 'application/json')}
                aria-label="Télécharger le parcours au format JSON"
              >
                <Download size={16} className="mr-1" /> JSON
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-left font-serif text-sm">
              <thead>
                <tr className="text-stone-600">
                  <th className="py-3 pr-4">Continent</th>
                  <th className="py-3 pr-4">Pays traversés (ordre logique)</th>
                  <th className="py-3 pr-4">Pays non couverts</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Temps (mois)</th>
                  <th className="py-3 pr-4 whitespace-nowrap">Distance (km)</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {expeditionPlan.map((row, idx) => (
                  <tr key={idx} className="border-t border-stone-200">
                    <td className="py-3 pr-4 font-semibold text-stone-900">{row.continent}</td>
                    <td className="py-3 pr-4 text-stone-700">{row.covered}</td>
                    <td className="py-3 pr-4 text-stone-700">{row.notCovered}</td>
                    <td className="py-3 pr-4 text-stone-800">{row.months}</td>
                    <td className="py-3 pr-4 text-stone-800">{row.distanceKm.toLocaleString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-stone-700">
            <p>
              Total Global : <span className="font-semibold">{expeditionTotals.distanceKm.toLocaleString('fr-FR')} km</span>,
              <span className="font-semibold"> {expeditionTotals.months} mois</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
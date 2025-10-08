import { Map, CalendarDays, Globe2 } from 'lucide-react';

export default function Itinerary() {
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
            Itinéraire Détaillé
          </h2>
          <p className="text-xl text-stone-600 font-serif">Un parcours transcontinental, étape par étape</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Map className="text-amber-600" size={24} />
                <h3 className="text-2xl font-handwritten text-stone-900">Trajet Global</h3>
              </div>
              <p className="text-stone-700 font-serif leading-relaxed">
                Un itinéraire en plusieurs continents, avec des étapes clés: Europe → Asie → Amériques → Océanie → Afrique.
                Les passages sensibles et les saisons sont pris en compte pour maximiser sécurité et météo favorables.
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
              <h3 className="text-2xl font-handwritten text-stone-900">Calendrier indicatif</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Europe</span>
                <span>Avril — Juin 2026</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Asie</span>
                <span>Juillet — Octobre 2026</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Amériques</span>
                <span>Janvier — Mai 2027</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Océanie</span>
                <span>Juin — Août 2027</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Afrique</span>
                <span>Septembre — Décembre 2027</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-stone-600 font-serif">
                Points forts: Alpes, Salar de Uyuni, Outback, Route de la Soie, Serengeti. Les dates restent flexibles selon
                conditions locales, visas et logistique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
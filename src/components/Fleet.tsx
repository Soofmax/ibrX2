import { Truck, Wrench } from 'lucide-react';

export default function Fleet() {
  return (
    <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 bg-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Truck className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            La Flotte
          </h2>
          <p className="text-xl text-stone-600 font-serif">2–3 véhicules restaurés, optimisés pour l’overlanding</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Véhicule A — 4x4 utilitaire',
              specs: ['Suspensions renforcées', 'Réservoir carburant étendu', 'Tente de toit', 'Protection sous-châssis'],
              image: 'https://images.pexels.com/photos/3716332/pexels-photo-3716332.jpeg?auto=compress&cs=tinysrgb&w=800'
            },
            {
              name: 'Véhicule B — Confort longue distance',
              specs: ['Aménagement nuit/jour', 'Panneaux solaires 400W', 'Réservoirs d’eau 100L', 'Navigation GPS double'],
              image: 'https://images.pexels.com/photos/3033210/pexels-photo-3033210.jpeg?auto=compress&cs=tinysrgb&w=800'
            },
            {
              name: 'Véhicule C — Polyvalent',
              specs: ['Pneus tout-terrain', 'Treuil 12 000 lb', 'Support roues de secours', 'Kit compresseur'],
              image: 'https://images.pexels.com/photos/3889614/pexels-photo-3889614.jpeg?auto=compress&cs=tinysrgb&w=800'
            }
          ].map((v, i) => (
            <article key={i} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-200">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-stone-500 mb-3">
                  <Wrench size={16} className="text-amber-600" />
                  <span className="font-serif">Restauration & modifications</span>
                </div>
                <h3 className="text-2xl font-handwritten text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {v.name}
                </h3>
                <ul className="space-y-2 mb-4">
                  {v.specs.map((s, idx) => (
                    <li key={idx} className="text-stone-700 font-serif leading-relaxed">• {s}</li>
                  ))}
                </ul>
                <button type="button" className="bg-stone-900 hover:bg-stone-800 text-amber-50 font-serif px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl focus-ring">
                  Voir plus
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
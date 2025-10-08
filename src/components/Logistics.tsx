import { BadgeDollarSign, ShieldAlert, Fuel } from 'lucide-react';

export default function Logistics() {
  return (
    <section id="logistics" className="py-24 px-4 sm:px-6 lg:px-8 bg-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <ShieldAlert className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            Logistique & Préparation
          </h2>
          <p className="text-xl text-stone-600 font-serif">Budget, défis, équipements — concis et pratique</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <BadgeDollarSign className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">Budget estimatif</h3>
            </div>
            <p className="text-stone-700 font-serif mb-3">Fourchette: 220 000 – 425 000 € pour 2–3 véhicules.</p>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Carburant, ferrys, visas, assurances</li>
              <li>• Maintenance, pièces, pneus</li>
              <li>• Hébergement, nourriture, communications</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">Défis & solutions</h3>
            </div>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Frontières & documents (Carnet de Passages)</li>
              <li>• Carburant rare en zones isolées (réserves planifiées)</li>
              <li>• Conflits / météo (itinéraires alternatifs)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Fuel className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">Équipement</h3>
            </div>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Pneus tout-terrain, treuil, compresseur</li>
              <li>• Panneaux solaires 400W, batteries, frigo</li>
              <li>• Réservoirs d’eau 100L, filtration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
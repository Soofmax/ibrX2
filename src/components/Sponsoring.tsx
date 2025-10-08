import { Handshake, Store } from 'lucide-react';

export default function Sponsoring() {
  return (
    <section id="sponsors" className="py-24 px-4 sm:px-6 lg:px-8 bg-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Handshake className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            Sponsoring & Partenariats
          </h2>
          <p className="text-xl text-stone-600 font-serif">Visibilité, contenus, engagements — gagnant-gagnant</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-handwritten text-stone-900 mb-3">Proposition de valeur</h3>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Logos sur véhicules et contenus</li>
              <li>• Mentions dans le journal de bord et les réseaux</li>
              <li>• Production de photos/vidéos dédiées</li>
            </ul>
            <button type="button" className="mt-6 bg-stone-900 hover:bg-stone-800 text-amber-50 font-serif px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl focus-ring">
              Demander le media kit
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Store className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">Boutique (optionnel)</h3>
            </div>
            <p className="text-stone-700 font-serif">T-shirts, stickers et cartes postales pour soutenir l’expédition.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { FileCheck2, Stethoscope, LifeBuoy } from 'lucide-react';

export default function PracticalInfo() {
  return (
    <section id="practical" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-24 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <FileCheck2 className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            Infos Pratiques
          </h2>
          <p className="text-xl text-stone-600 font-serif">Ressources overlanding, visas, sécurité</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-handwritten text-stone-900 mb-3">Ressources Overlanding</h3>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Forums spécialisés</li>
              <li>• Applications de points d’intérêt et bivouacs</li>
              <li>• Guides de pistes par région</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <LifeBuoy className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">Visas & Permis</h3>
            </div>
            <p className="text-stone-700 font-serif">Documents clés: Carnet de Passages, permis internationaux, autorisations spécifiques selon pays.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Stethoscope className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">Santé & Sécurité</h3>
            </div>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Vaccins nécessaires selon zones</li>
              <li>• Assurance voyage & évacuation</li>
              <li>• Procédures en checkpoints</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
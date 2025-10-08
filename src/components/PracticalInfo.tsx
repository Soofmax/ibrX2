import { FileCheck2, Stethoscope, LifeBuoy } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function PracticalInfo() {
  const { t } = useI18n();

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
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-lime-800 mb-4">
            {t('practical.heading')}
          </h2>
          <p className="text-xl text-stone-600 font-serif">{t('practical.tagline')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-handwritten text-lime-800 mb-3">{t('practical.resources')}</h3>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>
                <a
                  href="https://expeditionportal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline"
                >
                  Expedition Portal
                </a>
              </li>
              <li>
                <a
                  href="https://www.ioverlander.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline"
                >
                  iOverlander
                </a>
              </li>
              <li>
                <a
                  href="https://overlandjournal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline"
                >
                  Overland Journal
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <LifeBuoy className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-lime-800">{t('practical.visas')}</h3>
            </div>
            <p className="text-stone-700 font-serif">
              Carnet de Passages (~500 €/véhicule), permis C (PTAC &gt; 7,5 t) et PCI, visas anticipés (ex: Chine/Soudan) avec guides locaux si requis.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Stethoscope className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-lime-800">{t('practical.health')}</h3>
            </div>
            <ul className="space-y-2 text-stone-700 font-serif">
              <li>• Vaccins selon zones (ex: fièvre jaune, prophylaxie malaria)</li>
              <li>• Assurance évacuation médicale (ex: Global Rescue)</li>
              <li>• Consignes: éviter zones instables, procédés en checkpoints, convoi groupé</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
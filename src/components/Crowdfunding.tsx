import { Coffee, Gift, Heart, Sparkles, Check } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Crowdfunding() {
  const { t } = useI18n();

  return (
    <section id="support" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-900 to-stone-800 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Sparkles className="text-green-400 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-green-50 mb-6">
            {t('support.heading')}
          </h2>
          <p className="text-xl text-green-100/90 font-serif max-w-3xl mx-auto leading-relaxed">
            {t('support.tagline')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-green-50 to-lime-50 rounded-3xl shadow-2xl p-8 border-2 border-green-200 hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-5 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <Coffee className="text-white" size={36} />
              </div>
            </div>

            <h3 className="text-3xl font-handwritten text-stone-900 mb-3 text-center">
              {t('support.spontaneous')}
            </h3>

            <p className="text-stone-700 font-serif mb-6 text-center leading-relaxed text-lg">
              Un café pour la route — chaque contribution aide à maintenir l’expédition.
            </p>

            <div className="bg-white rounded-2xl p-4 mb-6 border border-green-200">
              <p className="text-center font-serif text-stone-600 mb-2">{t('support.from')}</p>
              <p className="text-center text-4xl font-handwritten text-green-700">5€</p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span>{t('support.oneTime')}</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span>{t('support.thanks')}</span>
              </li>
            </ul>

            <button type="button" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg focus-ring">
              {t('support.paypal')}
            </button>
          </div>

          <div className="group bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-2xl p-8 border-4 border-green-500 hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white text-sm font-serif px-4 py-1 rounded-full shadow-lg">Populaire</span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-5 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <Gift className="text-white" size={36} />
              </div>
            </div>

            <h3 className="text-3xl font-handwritten text-green-50 mb-3 text-center">
              {t('support.contrib')}
            </h3>

            <p className="text-green-100/90 font-serif mb-6 text-center leading-relaxed text-lg">
              Contenus exclusifs, accès anticipé et récompenses pour les soutiens réguliers.
            </p>

            <div className="bg-stone-800/50 rounded-2xl p-4 mb-6 border border-green-500/30">
              <p className="text-center font-serif text-green-200 mb-2">Dès</p>
              <p className="text-center text-4xl font-handwritten text-green-400">10€<span className="text-xl">{t('support.perMonth')}</span></p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-green-50 font-serif">
                <Check size={18} className="text-green-400 flex-shrink-0" />
                <span>Behind-the-scenes</span>
              </li>
              <li className="flex items-center gap-2 text-green-50 font-serif">
                <Check size={18} className="text-green-400 flex-shrink-0" />
                <span>Accès anticipé aux posts</span>
              </li>
              <li className="flex items-center gap-2 text-green-50 font-serif">
                <Check size={18} className="text-green-400 flex-shrink-0" />
                <span>Conseils mensuels</span>
              </li>
              <li className="flex items-center gap-2 text-green-50 font-serif">
                <Check size={18} className="text-green-400 flex-shrink-0" />
                <span>Communauté</span>
              </li>
            </ul>

            <button type="button" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-xl text-lg focus-ring">
              {t('support.rewards')}
            </button>
          </div>

          <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 border-2 border-rose-200 hover:shadow-rose-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-full p-5 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <Heart className="text-rose-50" size={36} />
              </div>
            </div>

            <h3 className="text-3xl font-handwritten text-stone-900 mb-3 text-center">
              {t('support.partner')}
            </h3>

            <p className="text-stone-700 font-serif mb-6 text-center leading-relaxed text-lg">
              Soutien via Tipeee ou Ulule pour les contributions récurrentes et l’accès communauté.
            </p>

            <div className="bg-white rounded-2xl p-4 mb-6 border border-rose-200">
              <p className="text-center font-serif text-stone-600 mb-2">{t('support.flex')}</p>
              <p className="text-center text-4xl font-handwritten text-rose-600">{t('support.free')}</p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-rose-600 flex-shrink-0" />
                <span>{t('support.choose')}</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-rose-600 flex-shrink-0" />
                <span>{t('support.cancel')}</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-rose-600 flex-shrink-0" />
                <span>{t('support.community')}</span>
              </li>
            </ul>

            <button type="button" className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-rose-50 font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg focus-ring">
              {t('support.visit')}
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="text-center mb-4">
            <p className="text-green-100/90 font-serif">{t('support.availableSoon')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://paypal.me/TranscontinentalTrek" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">PayPal</a>
            <a href="https://patreon.com/TranscontinentalTrek" target="_blank" rel="noopener noreferrer" className="bg-stone-800 hover:bg-stone-700 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">Patreon</a>
            <a href="https://tipeee.com/transcontinental-trek" target="_blank" rel="noopener noreferrer" className="bg-rose-600 hover:bg-rose-500 text-rose-50 font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">Tipeee</a>
            <a href="https://ulule.com/transcontinental-trek" target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-500 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">Ulule</a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Coffee, Gift, Heart, Sparkles, Check } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { useState } from 'react';

export default function Crowdfunding() {
  const { t, lang } = useI18n();

  // Jerrican donation state (local, for visualization)
  const [selected, setSelected] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const goal = 50; // € to fill one jerrican (visual goal)
  const fillPercent = Math.min(Math.round((total / goal) * 100), 100);

  const donateWithPaypal = () => {
    // Open PayPal.me with the selected amount; integration can be replaced later
    window.open(`https://paypal.me/TranscontinentalTrek/${selected}`, '_blank', 'noopener,noreferrer');
    setTotal((v) => v + selected);
  };

  const donateWithStripe = () => {
    // Placeholder for Stripe Checkout integration
    alert(lang === 'fr' ? 'Paiement Stripe bientôt disponible.' : 'Stripe payment will be available soon.');
    setTotal((v) => v + selected);
  };

  return (
    <section
      id="support"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-900 to-stone-800 relative overflow-hidden scroll-mt-24"
    >
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

        {/* Jerrican pay-per-km donation section */}
        <section className="mb-16 bg-stone-800/60 rounded-3xl border border-green-700 p-6 sm:p-8 shadow-xl">
          <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
            <div>
              <h3 className="text-3xl font-handwritten text-green-50 mb-2">{t('support.jerry.title')}</h3>
              <p className="text-green-100/90 font-serif mb-4">{t('support.jerry.subtitle')}</p>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-stone-900/60 border border-green-700 text-green-100 font-serif px-3 py-2 rounded-full">
                  <span className="font-semibold">{t('support.jerry.goal')}</span>
                  <span className="font-handwritten text-green-400">{goal}€</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-stone-900/60 border border-green-700 text-green-100 font-serif px-3 py-2 rounded-full">
                  <span className="font-semibold">{t('support.jerry.filled')}</span>
                  <span className="font-handwritten text-green-400">{fillPercent}%</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-stone-900/60 border border-green-700 text-green-100 font-serif px-3 py-2 rounded-full">
                  <span className="font-semibold">{t('support.jerry.total')}</span>
                  <span className="font-handwritten text-green-400">{total}€</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {[1, 5, 10].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelected(amt)}
                    aria-pressed={selected === amt}
                    className={`px-4 py-2 rounded-full font-serif transition-all focus-ring ${
                      selected === amt
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-stone-900 text-green-100 border border-green-700 hover:bg-stone-700'
                    }`}
                  >
                    {amt}€
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={donateWithPaypal}
                  className="bg-green-600 hover:bg-green-500 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring"
                >
                  {t('support.jerry.payPaypal')} ({selected}€)
                </button>
                <button
                  type="button"
                  onClick={donateWithStripe}
                  className="bg-stone-900 hover:bg-stone-800 text-green-100 font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg border border-green-700 focus-ring"
                >
                  {t('support.jerry.payStripe')} ({selected}€)
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72">
                {/* Simple SVG jerrican */}
                <svg viewBox="0 0 120 140" className="w-full h-full">
                  {/* Body */}
                  <path
                    d="M20 30 L85 30 L100 45 L100 125 L20 125 Z"
                    fill="#0f172a"
                    stroke="#16a34a"
                    strokeWidth="2"
                  />
                  {/* Handle */}
                  <path d="M60 15 L85 15 L95 25 L70 25 Z" fill="#0f172a" stroke="#16a34a" strokeWidth="2" />
                  {/* X pattern */}
                  <path d="M28 55 L92 115 M92 55 L28 115" stroke="#1e293b" strokeWidth="4" opacity="0.7" />
                  {/* Fill (clip to body area) */}
                  <clipPath id="jerry-clip">
                    <path d="M20 30 L85 30 L100 45 L100 125 L20 125 Z" />
                  </clipPath>
                  <g clipPath="url(#jerry-clip)">
                    <rect x="20" y="125" width="80" height="95" fill="#22c55e" />
                    <rect
                      x="20"
                      width="80"
                      fill="#22c55e"
                      // Height based on fillPercent
                      y={125 - (95 * fillPercent) / 100}
                      height={(95 * fillPercent) / 100}
                    />
                  </g>
                  {/* Label */}
                  <text x="60" y="135" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="serif">
                    {fillPercent}% {t('support.jerry.filledShort')}
                  </text>
                </svg>
              </div>
            </div>
            <div className="text-center mt-3 text-green-100 font-serif">
              ≈ {total} {t('support.jerry.kmEq')}
            </div>
          </div>
        </section>

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

            <button
              type="button"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg focus-ring"
            >
              {t('support.paypal')}
            </button>
          </div>

          <div className="group bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-2xl p-8 border-4 border-green-500 hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white text-sm font-serif px-4 py-1 rounded-full shadow-lg">
                Populaire
              </span>
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
              <p className="text-center text-4xl font-handwritten text-green-400">
                10€<span className="text-xl">{t('support.perMonth')}</span>
              </p>
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

            <button
              type="button"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-xl text-lg focus-ring"
            >
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
              <p className="text-center text-4xl font-handwritten text-rose-600">
                {t('support.free')}
              </p>
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

            <button
              type="button"
              className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-rose-50 font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg focus-ring"
            >
              {t('support.visit')}
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="text-center mb-4">
            <p className="text-green-100/90 font-serif">{t('support.availableSoon')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://paypal.me/TranscontinentalTrek"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring"
            >
              PayPal
            </a>
            <a
              href="https://patreon.com/TranscontinentalTrek"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-800 hover:bg-stone-700 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring"
            >
              Patreon
            </a>
            <a
              href="https://tipeee.com/transcontinental-trek"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-600 hover:bg-rose-500 text-rose-50 font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring"
            >
              Tipeee
            </a>
            <a
              href="https://ulule.com/transcontinental-trek"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-500 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring"
            >
              Ulule
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

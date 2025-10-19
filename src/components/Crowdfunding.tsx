import { Coffee, Gift, Heart, Sparkles, Check } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { useEffect, useState } from 'react';
import JerricanIcon from './icons/JerricanIcon';
import DonationForm from './donation/DonationForm';
import Jerrican from './donation/Jerrican';
import type { Vehicle, DonationFormData } from '../types/donation';

export default function Crowdfunding() {
  const { t, lang } = useI18n();

  // Jerrican donation state (local, for visualization)
  const [selected, setSelected] = useState<number>(5);
  const [total, setTotal] = useState<number>(50); // start with a full jerrycan (simulation)
  const goal = 50; // € to fill one jerrican (visual goal)
  const fillPercent = Math.min(Math.round((total / goal) * 100), 100);

  // Vehicles status (from Donation page, merged here)
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: t('donation.vehicle1'), percentage: 100, contributors: 1, state: 'full' },
    { id: 2, name: t('donation.vehicle2'), percentage: 65, contributors: 13, state: 'in-progress' },
    { id: 3, name: t('donation.vehicle3'), percentage: 0, contributors: 0, state: 'empty' },
  ]);

  // Update vehicle names on language change
  useEffect(() => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        name:
          v.id === 1
            ? t('donation.vehicle1')
            : v.id === 2
            ? t('donation.vehicle2')
            : t('donation.vehicle3'),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleDonationSubmit = (donationData: DonationFormData) => {
    // Simulate donation process (payment integration can plug here later)
    alert(
      `${t('donation.thankYou')} ${donationData.amount}€ ${t('donation.forVehicle')} ${donationData.selectedVehicle}!`
    );

    // Update vehicle state similarly to DonationSection
    setVehicles((prev) => {
      const updated = [...prev];
      const idx = updated.findIndex((v) => v.id === donationData.selectedVehicle);
      if (idx !== -1) {
        const donationPercentage = (donationData.amount / 25000) * 100;
        updated[idx].percentage = Math.min(100, updated[idx].percentage + donationPercentage);
        updated[idx].contributors += 1;
        if (updated[idx].percentage === 100) {
          updated[idx].state = 'full';
        } else if (updated[idx].percentage > 0) {
          updated[idx].state = 'in-progress';
        }
      }
      return updated;
    });
  };

  const donateWithPaypal = () => {
    // Simulation uniquement: pas de redirection externe
    alert(
      lang === 'fr'
        ? `Simulation de don ${selected}€ (PayPal)`
        : `Simulated donation €${selected} (PayPal)`
    );
    setTotal((v) => v + selected);
  };

  const donateWithStripe = () => {
    // Simulation uniquement: pas d'appel backend Stripe
    alert(
      lang === 'fr'
        ? `Simulation de don ${selected}€ (Stripe)`
        : `Simulated donation €${selected} (Stripe)`
    );
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

          {/* New H1 and impact paragraph */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-green-50 mb-4">
            {t('support.h1')}
          </h1>
          <p className="text-lg sm:text-xl text-green-100/90 font-serif max-w-3xl mx-auto leading-relaxed mb-6">
            {t('support.h1Desc')}
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-handwritten text-green-50 mb-4">
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
              <h3 className="text-3xl font-handwritten text-green-50 mb-2">
                {t('support.jerry.title')}
              </h3>
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

            <div className="flex justify-center gap-6 flex-wrap">
              {/* Slot 1: Full jerrican with avatar */}
              <div className="relative w-40 h-60 sm:w-48 sm:h-72 mx-auto mb-4">
                <JerricanIcon
                  fillPercentage={100}
                  className="w-full h-full"
                  ariaLabel={lang === 'fr' ? 'Jerrican complet' : 'Full jerrycan'}
                />
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80"
                  alt={lang === 'fr' ? 'Convoyeur' : 'Convoyer'}
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-3 left-0 w-full text-center font-serif font-bold text-green-100 text-sm select-none">
                  100% {t('support.jerry.filledShort')}
                </div>
              </div>

              {/* Slot 2: In-progress jerrican */}
              <div className="relative w-40 h-60 sm:w-48 sm:h-72 mx-auto mb-4">
                <JerricanIcon
                  fillPercentage={fillPercent}
                  className="w-full h-full"
                  ariaLabel={lang === 'fr' ? 'Jerrican en cours' : 'In-progress jerrican'}
                />
                <div className="absolute bottom-3 left-0 w-full text-center font-serif font-bold text-green-100 text-sm select-none">
                  {fillPercent}% {t('support.jerry.filledShort')}
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-green-100 font-serif">
              ≈ {total} {t('support.jerry.kmEq')}
            </div>
          </div>
        </section>

        {/* Vehicles status (from /donation) */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-handwritten text-green-50">Statut des véhicules</h3>
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center gap-8">
            {vehicles.map((vehicle) => (
              <Jerrican key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="mt-8">
            <DonationForm onSubmit={handleDonationSubmit} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-green-50 to-lime-50 rounded-3xl shadow-2xl p-8 border-2 border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-5 group-hover:scale-105 transition-transform duration-300 shadow-xl">
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

          <div className="group bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-2xl p-8 border-4 border-green-500 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white text-sm font-serif px-4 py-1 rounded-full shadow-lg">
                Populaire
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-5 group-hover:scale-105 transition-transform duration-300 shadow-2xl">
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

          <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 border-2 border-rose-200 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-full p-5 group-hover:scale-105 transition-transform duration-300 shadow-xl">
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

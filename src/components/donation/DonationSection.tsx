import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import Jerrican from './Jerrican';
import DonationForm from './DonationForm';
import type { Vehicle, DonationFormData } from '../../types/donation';

export default function DonationSection() {
  const { t, lang } = useI18n();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: t('donation.vehicle1'), percentage: 100, contributors: 1, state: 'full' },
    { id: 2, name: t('donation.vehicle2'), percentage: 65, contributors: 13, state: 'in-progress' },
    { id: 3, name: t('donation.vehicle3'), percentage: 0, contributors: 0, state: 'empty' },
  ]);

  // Update names on language change
  useEffect(() => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        name:
          v.id === 1 ? t('donation.vehicle1') : v.id === 2 ? t('donation.vehicle2') : t('donation.vehicle3'),
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleDonationSubmit = (donationData: DonationFormData) => {
    // Simulate donation process (payment integration can plug here)
    alert(
      `${t('donation.thankYou')} ${donationData.amount}€ ${t('donation.forVehicle')} ${donationData.selectedVehicle}!`
    );

    // Update vehicle state
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

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-stone-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-handwritten text-stone-900 mb-4">{t('donation.title')}</h2>
          <p className="text-lg text-stone-700 font-serif max-w-3xl mx-auto">{t('donation.description')}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center gap-8 mb-16">
          {vehicles.map((vehicle) => (
            <Jerrican key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <DonationForm onSubmit={handleDonationSubmit} />
      </div>
    </section>
  );
}
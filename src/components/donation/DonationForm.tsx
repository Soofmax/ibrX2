import { useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import type { DonationFormData } from '../../types/donation';

type Props = {
  onSubmit: (data: DonationFormData) => void;
};

export default function DonationForm({ onSubmit }: Props) {
  const { t } = useI18n();
  const [formData, setFormData] = useState<DonationFormData>({
    amount: 2.5,
    customAmount: '',
    selectedVehicle: 1,
  });

  const predefinedAmounts = [2.5, 5, 10, 25];

  const handleAmountSelect = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      amount,
      customAmount: '',
    }));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      customAmount: value,
      amount: value ? parseFloat(value) : 0,
    }));
  };

  const handleVehicleSelect = (vehicleId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedVehicle: vehicleId,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalAmount = formData.customAmount ? parseFloat(formData.customAmount) : formData.amount;

    if (finalAmount > 0) {
      onSubmit({
        ...formData,
        amount: finalAmount,
      });
    } else {
      alert(t('donation.invalidAmount'));
    }
  };

  const getSelectedAmount = () => {
    return formData.customAmount ? parseFloat(formData.customAmount) : formData.amount;
  };

  const buttonLabel = `${t('donation.donateButtonPrefix')} ${getSelectedAmount().toFixed(2)} €`;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-stone-200">
      <h3 className="text-3xl font-handwritten text-center text-stone-800 mb-8">
        {t('donation.formTitle')}
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Predefined donation options */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`px-6 py-3 border-2 rounded-full font-serif font-bold transition-colors duration-300 focus-ring ${
                !formData.customAmount && formData.amount === amount
                  ? 'bg-amber-600 border-amber-600 text-white'
                  : 'border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white'
              }`}
              aria-pressed={!formData.customAmount && formData.amount === amount}
            >
              {amount} €
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <input
              type="number"
              value={formData.customAmount}
              onChange={handleCustomAmountChange}
              placeholder={t('donation.customAmount')}
              min="1"
              step="0.5"
              className="w-48 px-4 py-3 border-2 border-stone-300 rounded-full text-center focus:outline-none focus:border-amber-600 focus-ring font-serif"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500">€</span>
          </div>
        </div>

        {/* Vehicle selection */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {[1, 2, 3].map((vehicleId) => (
            <button
              key={vehicleId}
              type="button"
              onClick={() => handleVehicleSelect(vehicleId)}
              className={`px-6 py-3 border-2 rounded-full font-serif font-bold transition-colors duration-300 focus-ring ${
                formData.selectedVehicle === vehicleId
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white'
              }`}
              aria-pressed={formData.selectedVehicle === vehicleId}
            >
              {t(`donation.vehicle${vehicleId}` as const)}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold py-4 rounded-full transition-colors duration-300 text-lg focus-ring"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
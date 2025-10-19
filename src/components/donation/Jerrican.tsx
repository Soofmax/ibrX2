import { useI18n } from '../../i18n/useI18n';
import type { Vehicle } from '../../types/donation';

type Props = {
  vehicle: Vehicle;
};

export default function Jerrican({ vehicle }: Props) {
  const { t } = useI18n();

  const getFillStyles = () => {
    return {
      height: `${vehicle.percentage}%`,
      backgroundColor: vehicle.percentage === 100 ? '#16a34a' : '#22c55e',
      transition: 'height 0.5s ease',
    } as const;
  };

  const getCrossVisibility = () => {
    return vehicle.state === 'empty' || vehicle.state === 'in-progress' ? 'visible' : 'hidden';
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-handwritten mb-4 text-stone-800">{vehicle.name}</h3>

      <div className="relative w-48 h-72 mx-auto mb-4 border-4 border-stone-800 rounded-lg bg-white overflow-hidden">
        {/* Fill */}
        <div className="absolute bottom-0 w-full" style={getFillStyles()} />

        {/* Outline */}
        <div className="absolute inset-0 border-4 border-stone-800 rounded-md pointer-events-none" />

        {/* Cross */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-stone-800 font-bold pointer-events-none select-none"
          style={{ visibility: getCrossVisibility() }}
          aria-hidden={getCrossVisibility() === 'hidden'}
        >
          ✕
        </div>

        {/* Percentage */}
        <div className="absolute bottom-3 left-0 w-full text-center font-serif font-bold text-stone-800 text-lg pointer-events-none select-none">
          {vehicle.percentage}%
        </div>
      </div>

      <p className="text-stone-600 font-serif text-sm">
        {vehicle.contributors}{' '}
        {vehicle.contributors === 1
          ? t('donation.contributorsSing')
          : t('donation.contributorsPlur')}
      </p>
    </div>
  );
}

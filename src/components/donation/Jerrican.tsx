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
        {/* Inline keyframes for wave animation (scoped) */}
        <style>
          {`
            @keyframes jerryWave {
              0% { background-position: 0 0; }
              100% { background-position: 200% 0; }
            }
          `}
        </style>

        {/* Avatar placeholder when full */}
        {vehicle.state === 'full' && (
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-green-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-serif">
            WG
          </div>
        )}

        {/* Fill with subtle moving pattern */}
        <div className="absolute bottom-0 w-full" style={getFillStyles()}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 4px, transparent 4px, transparent 8px)',
              backgroundSize: '200% 200%',
              animation: 'jerryWave 4s linear infinite',
            }}
            aria-hidden="true"
          />
        </div>

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

import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/useI18n';
import { Navigation, MapPin } from 'lucide-react';

type City = {
  name: string;
  region: 'Nord' | 'Centre' | 'Sud';
};

const cities: City[] = [
  { name: 'Paris (France)', region: 'Centre' },
  { name: 'Londres (Royaume-Uni)', region: 'Nord' },
  { name: 'Berlin (Allemagne)', region: 'Nord' },
  { name: 'Madrid (Espagne)', region: 'Sud' },
  { name: 'Rome (Italie)', region: 'Sud' },
  { name: 'Lisbonne (Portugal)', region: 'Sud' },
  { name: 'Amsterdam (Pays-Bas)', region: 'Nord' },
  { name: 'Vienne (Autriche)', region: 'Centre' },
  { name: 'Prague (Tchéquie)', region: 'Centre' },
  { name: 'Copenhague (Danemark)', region: 'Nord' },
];

function WeatherLayer({ region }: { region: City['region'] }) {
  // Affiche une météo simple selon la région
  // Nord: pluie légère, Centre: nuages, Sud: soleil
  if (region === 'Sud') {
    return (
      <g>
        <circle cx="780" cy="80" r="34" fill="#f59e0b" opacity="0.9" />
        <circle cx="780" cy="80" r="58" fill="#f59e0b" opacity="0.25" />
      </g>
    );
  }
  if (region === 'Nord') {
    // pluie: lignes obliques
    const drops = Array.from({ length: 20 }, (_, i) => ({
      x: 120 + i * 35,
      y: 90 + (i % 5) * 18,
    }));
    return (
      <g stroke="#3b82f6" strokeWidth="2" opacity="0.35">
        {drops.map((d, i) => (
          <line key={i} x1={d.x} y1={d.y} x2={d.x + 10} y2={d.y + 20} />
        ))}
      </g>
    );
  }
  // Centre: nuages
  return (
    <g fill="#ffffff" opacity="0.85">
      <ellipse cx="220" cy="110" rx="60" ry="20" />
      <ellipse cx="260" cy="110" rx="40" ry="16" />
      <ellipse cx="600" cy="80" rx="50" ry="18" />
      <ellipse cx="640" cy="80" rx="35" ry="14" />
    </g>
  );
}

export default function EuropeCarousel(): JSX.Element {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const baseMs = 1800;
    const stepMs = baseMs / (speedMultiplier || 1);
    const timer = setTimeout(() => {
      setIdx((i) => (i + 1) % cities.length);
    }, stepMs);
    return () => clearTimeout(timer);
  }, [idx, playing, speedMultiplier]);

  const itemWidth = 300;
  const visibleCount = 3;
  const containerWidth = itemWidth * visibleCount;
  const translateX = -(idx * itemWidth) + (containerWidth / 2 - itemWidth / 2);
  const current = cities[idx];

  const prev = () => setIdx((i) => (i - 1 + cities.length) % cities.length);
  const next = () => setIdx((i) => (i + 1) % cities.length);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-stone-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <Navigation className="text-amber-600 mx-auto animate-pulse" size={44} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-handwritten text-stone-900 mb-2">
            {t('current.heading')}
          </h2>
          <p className="text-lg text-stone-600 font-serif">{t('current.subtitle')}</p>
        </div>

        {/* Scène cartoon minimale derrière le carrousel */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 mb-8">
          <svg
            className="w-full h-[240px]"
            viewBox="0 0 1000 240"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Scène météo"
          >
            <defs>
              <linearGradient id="skyGradEU" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="1000" height="240" fill="url(#skyGradEU)" />
            {/* Terre stylisée */}
            <rect x="0" y="180" width="1000" height="60" fill="#86efac" />
            {/* Météo selon la ville active */}
            <WeatherLayer region={current.region} />
          </svg>
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-center gap-3 mb-6 font-serif">
          <button
            type="button"
            className="btn btn-secondary px-4 py-2"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
          >
            {playing ? t('current.pause') : t('current.play')}
          </button>
          <div className="flex items-center gap-1">
            <span className="text-stone-600 text-sm mr-1">{t('current.speedLabel')}</span>
            {[0.5, 1, 1.5, 2, 3].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSpeedMultiplier(v)}
                className={`px-2 py-1 rounded-full text-sm border ${speedMultiplier === v ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-50'}`}
                aria-label={`${t('current.speedLabel')} ${v}x`}
              >
                {v}x
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-secondary px-3 py-2" onClick={prev}>
            ◀
          </button>
          <button type="button" className="btn btn-primary px-3 py-2" onClick={next}>
            ▶
          </button>
        </div>

        {/* Carrousel lisible */}
        <div
          className="relative mx-auto overflow-hidden rounded-2xl bg-white shadow-xl border border-stone-200"
          style={{ width: containerWidth }}
        >
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {cities.map((s, i) => {
              const active = i === idx;
              return (
                <div
                  key={`${s.name}-${i}`}
                  className={`shrink-0 px-4 py-6 border-r border-stone-100 ${active ? 'bg-amber-50' : 'bg-white'}`}
                  style={{ width: itemWidth }}
                  aria-current={active ? 'true' : undefined}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${active ? 'bg-amber-200' : 'bg-stone-200'}`}>
                      <MapPin
                        className={`${active ? 'text-amber-700' : 'text-stone-700'}`}
                        size={22}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-handwritten ${active ? 'text-stone-900' : 'text-stone-800'}`}
                      >
                        {s.name}
                      </h3>
                      <p className="text-sm text-stone-600 font-serif">Région: {s.region}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* État accessible */}
        <div aria-live="polite" className="sr-only">
          {t('map.nextDestination')}: {current.name}
        </div>
      </div>
    </section>
  );
}

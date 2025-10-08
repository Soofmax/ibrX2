import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/useI18n';
import { routeStops } from '../data/routeStops';
import { Navigation, MapPin } from 'lucide-react';

type Stop = {
  name: string;
  continent: string;
};

const stops: Stop[] = routeStops.map((rs) => ({
  name: rs.label,
  continent: rs.continent,
}));

export default function SimpleCurrentLocation(): JSX.Element {
  const { t } = useI18n();

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const baseMs = 1800; // durée entre changements
    const stepMs = baseMs / (speedMultiplier || 1);
    const timer = setTimeout(() => {
      setIdx((i) => (i + 1) % stops.length);
    }, stepMs);
    return () => clearTimeout(timer);
  }, [idx, playing, speedMultiplier]);

  const itemWidth = 260; // px
  const visibleCount = 5;
  const containerWidth = itemWidth * visibleCount;
  const translateX = -(idx * itemWidth) + (containerWidth / 2 - itemWidth / 2);

  const prev = () => setIdx((i) => (i - 1 + stops.length) % stops.length);
  const next = () => setIdx((i) => (i + 1) % stops.length);

  return (
    <section id="map" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <Navigation className="text-amber-600 mx-auto" size={40} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-handwritten text-stone-900 mb-2">
            {t('current.heading')}
          </h2>
          <p className="text-lg text-stone-600 font-serif">{t('current.subtitle')}</p>
        </div>

        {/* Contrôles */}
        <div className="flex items-center justify-center gap-3 mb-6">
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

        {/* Carrousel simplifié */}
        <div className="relative mx-auto overflow-hidden rounded-2xl bg-white shadow-xl border border-stone-200" style={{ width: containerWidth }}>
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {stops.map((s, i) => {
              const active = i === idx;
              return (
                <div
                  key={`${s.name}-${i}`}
                  className={`shrink-0 w-[${itemWidth}px] px-4 py-6 border-r border-stone-100 ${active ? 'bg-amber-50' : 'bg-white'}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${active ? 'bg-amber-200' : 'bg-stone-200'}`}>
                      <MapPin className={`${active ? 'text-amber-700' : 'text-stone-700'}`} size={22} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-handwritten ${active ? 'text-stone-900' : 'text-stone-800'}`}>{s.name}</h3>
                      <p className="text-sm text-stone-600 font-serif">{s.continent}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* État accessible */}
        <div aria-live="polite" className="sr-only">
          {t('map.lastStep')}: {stops[(idx - 1 + stops.length) % stops.length].name}. {t('map.nextDestination')}: {stops[idx].name}.
        </div>
      </div>
    </section>
  );
}
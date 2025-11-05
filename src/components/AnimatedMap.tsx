import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/useI18n';
import { routeStops } from '../data/routeStops';
import { Navigation, Ship } from 'lucide-react';

/**
 * Animated cartoon-style globe with a van circling around.
 * Minimal info, playful visuals.
 */
export default function AnimatedMap(): JSX.Element {
  const { t } = useI18n();

  // Animation state
  const [playing, setPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [angle, setAngle] = useState(0); // degrees 0..360

  const rafRef = useRef<number | null>(null);
  const prevRef = useRef<number>(0);

  // Stops shown as rotating highlights (current based on angle)
  const stops = routeStops;
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseDegPerSec = prefersReducedMotion ? 15 : 40; // rotation speed of van around globe
    const speedDegPerSec = baseDegPerSec * (speedMultiplier || 1);

    const tick = (time: number) => {
      if (!prevRef.current) prevRef.current = time;
      const dt = (time - prevRef.current) / 1000;
      prevRef.current = time;

      if (playing) {
        setAngle((a) => {
          const next = a + speedDegPerSec * dt;
          return next % 360;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      prevRef.current = 0;
    };
  }, [playing, speedMultiplier]);

  // Map angle to stop index (divide circle evenly by stops length)
  useEffect(() => {
    const sector = 360 / Math.max(1, stops.length);
    const idx = Math.floor(angle / sector) % stops.length;
    setCurrentStopIndex(idx);
  }, [angle, stops.length]);

  // Van position on circle
  const globeCx = 500;
  const globeCy = 260;
  const orbitR = 150;
  const rad = (angle * Math.PI) / 180;
  const vanX = globeCx + orbitR * Math.cos(rad);
  const vanY = globeCy + orbitR * Math.sin(rad);
  const vanAngle = angle + 90;

  // Gentle bounce
  const bounce = Math.sin((angle * Math.PI) / 90) * 2;

  const currentStop = stops[currentStopIndex];
  const nextStop = stops[(currentStopIndex + 1) % stops.length];

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

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-6 font-serif">
          <button
            type="button"
            className="btn btn-secondary px-4 py-2"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            aria-label={playing ? t('current.pauseAria') : t('current.playAria')}
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
        </div>

        {/* Cartoon Globe Scene */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
          <svg
            className="w-full h-[520px]"
            viewBox="0 0 1000 520"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={t('current.svgAriaLabel')}
          >
            <defs>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect x="0" y="0" width="1000" height="520" fill="url(#skyGrad)" />

            {/* Sun */}
            <g filter="url(#softGlow)">
              <circle cx="820" cy="100" r="36" fill="#f59e0b" opacity="0.85" />
              <circle cx="820" cy="100" r="60" fill="#f59e0b" opacity="0.25" />
            </g>

            {/* Clouds */}
            <g fill="#ffffff" opacity="0.9">
              <ellipse cx="220" cy="110" rx="60" ry="20" />
              <ellipse cx="260" cy="110" rx="40" ry="16" />
              <ellipse cx="600" cy="80" rx="50" ry="18" />
              <ellipse cx="640" cy="80" rx="35" ry="14" />
            </g>

            {/* Ground strip */}
            <rect x="0" y="430" width="1000" height="90" fill="#86efac" />

            {/* Globe (ocean) */}
            <g filter="url(#softGlow)">
              <circle
                cx={globeCx}
                cy={globeCy}
                r="160"
                fill="url(#oceanGrad)"
                stroke="#0ea5e9"
                strokeWidth="4"
              />
            </g>

            {/* Simple continents (cartoon blobs) */}
            <g fill="#65a30d" opacity="0.9">
              <path d="M 470 210 C 440 220 430 250 450 270 C 470 290 500 290 520 270 C 540 250 520 220 495 215 Z" />
              <path d="M 560 260 C 540 270 540 300 560 310 C 580 320 610 300 600 280 C 590 260 580 255 560 260 Z" />
              <path d="M 450 320 C 430 325 430 350 450 360 C 470 370 500 360 495 340 C 490 325 470 315 450 320 Z" />
            </g>

            {/* Orbit path */}
            <circle
              cx={globeCx}
              cy={globeCy}
              r={orbitR}
              fill="none"
              stroke="#d97706"
              strokeWidth="3"
              strokeDasharray="8 6"
              opacity="0.75"
            />

            {/* Ferry marker for fun when currentStop.modeToNext === 'ferry' */}
            {currentStop?.modeToNext === 'ferry' && (
              <g transform={`translate(${globeCx - 200}, ${globeCy - 120})`} opacity="0.9">
                <Ship size={16} color="#0ea5e9" />
              </g>
            )}

            {/* Van */}
            <g
              transform={`translate(${vanX}, ${vanY + bounce}) rotate(${vanAngle})`}
              filter="url(#softGlow)"
            >
              <rect x="-16" y="-10" width="32" height="18" rx="3" fill="#1C1917" />
              <rect x="0" y="-8" width="14" height="12" rx="2" fill="#F59E0B" />
              <circle cx="-8" cy="10" r="4" fill="#0f172a" />
              <circle cx="8" cy="10" r="4" fill="#0f172a" />
            </g>

            {/* Current + next label, centered below globe */}
            <text
              x={globeCx}
              y={globeCy + 190}
              fontSize="20"
              fill="#1C1917"
              textAnchor="middle"
              fontFamily="serif"
            >
              {currentStop?.label}
            </text>
            <text
              x={globeCx}
              y={globeCy + 212}
              fontSize="14"
              fill="#64748b"
              textAnchor="middle"
              fontFamily="serif"
            >
              {t('map.nextDestination')}: {nextStop?.label}
            </text>
          </svg>
        </div>

        {/* Accessible state text */}
        <div aria-live="polite" className="sr-only">
          {t('map.lastStep')}: {currentStop?.label}. {t('map.nextDestination')}: {nextStop?.label}.
        </div>
      </div>
    </section>
  );
}

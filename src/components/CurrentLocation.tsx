import { MapPin, Navigation, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

type Stop = { name: string; t: number; tooltip: string; pauseMs?: number };

const stops: Stop[] = [
  { name: 'Londres', t: 0.00, tooltip: 'Départ symbolique de l’épopée' },
  { name: 'Istanbul', t: 0.09, tooltip: 'Pont entre Europe et Asie', pauseMs: 7000 },
  { name: 'Rio de Janeiro', t: 0.18, tooltip: 'Vibrations sud-américaines' },
  { name: 'La Paz', t: 0.27, tooltip: 'Aventure en haute altitude (Salar de Uyuni)', pauseMs: 10000 },
  { name: 'Mexico', t: 0.36, tooltip: 'Culture vibrante et histoire' },
  { name: 'Anchorage', t: 0.45, tooltip: 'Frontière nordique sauvage' },
  { name: 'Sydney', t: 0.54, tooltip: 'Plongée dans l’Outback (Uluru)', pauseMs: 10000 },
  { name: 'Auckland', t: 0.63, tooltip: 'Terres maories majestueuses' },
  { name: 'Singapour', t: 0.72, tooltip: 'Hub moderne de l’Asie' },
  { name: 'Ulaanbaatar', t: 0.81, tooltip: 'Steppes infinies du Gobi' },
  { name: 'Le Caire', t: 0.90, tooltip: 'Porte vers l’Afrique (Serengeti)', pauseMs: 10000 },
  { name: 'Cape Town', t: 1.00, tooltip: 'Fin d’une odyssée légendaire', pauseMs: 15000 },
];

export default function CurrentLocation() {
  const { t } = useI18n();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [positions, setPositions] = useState<{ x: number; y: number; name: string; t: number; tooltip: string }[]>([]);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const pts = stops.map((s) => {
      const p = path.getPointAtLength(s.t * length);
      return { x: p.x, y: p.y, name: s.name, t: s.t, tooltip: s.tooltip };
    });
    setPositions(pts);
  }, []);

  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Progress units per second by segment (adapted by region/country)
    const segmentSpeeds = [0.06, 0.10, 0.04, 0.06, 0.07, 0.10, 0.08, 0.10, 0.06, 0.07, 0.06]; // last segment fallback
    const defaultStopMs = 1500;
    const path = pathRef.current;
    if (!path) return;

    let rafId = 0;
    let prev = performance.now();
    let p = progress;
    let currentIdx = currentStopIndex;

    const tick = (time: number) => {
      const dt = (time - prev) / 1000;
      prev = time;

      if (time < pauseUntilRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const prevP = p;
      const speedPerSec = prefersReducedMotion ? 0 : (segmentSpeeds[currentIdx] ?? 0.06);
      p += speedPerSec * dt;
      if (p >= 1) p = 0;

      // detect crossing a stop
      const nextIdx = stops.findIndex((s) => s.t > prevP && s.t <= p + 0.0001);
      if (nextIdx !== -1) {
        const ms = stops[nextIdx].pauseMs ?? defaultStopMs;
        pauseUntilRef.current = time + ms;
        currentIdx = nextIdx;
      }

      setCurrentStopIndex(currentIdx);
      setProgress(p);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Compute van transform
  const vanTransform = (() => {
    const path = pathRef.current;
    if (!path) return { x: 120, y: 280, angle: 0 };
    const length = path.getTotalLength();
    const p1 = path.getPointAtLength(progress * length);
    const p2 = path.getPointAtLength(Math.min(progress * length + 1, length));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    return { x: p1.x, y: p1.y, angle };
  })();

  const lastStop = stops[currentStopIndex]?.name ?? stops[0].name;
  const nextStop = stops[currentStopIndex + 1]?.name ?? stops[0].name;

  const jumpTo = (tval: number, idx: number) => {
    setProgress(tval);
    setCurrentStopIndex(idx);
    const ms = stops[idx].pauseMs ?? 1500;
    pauseUntilRef.current = performance.now() + ms;
  };

  return (
    <section id="map" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Navigation className="text-amber-600 mx-auto animate-pulse" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            {t('current.heading')}
          </h2>
          <p className="text-xl text-stone-600 font-serif">{t('current.subtitle')}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 transform hover:scale-[1.01] transition-transform duration-500">
          <div className="relative aspect-video bg-gradient-to-br from-stone-200 to-amber-100 overflow-hidden">
            {/* Legend for accessibility */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-white/90 border border-amber-200 rounded-xl p-4 shadow-lg font-serif">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-5 bg-stone-900 rounded-sm"></div>
                  <span className="text-stone-900 font-semibold">Van</span>
                </div>
                <p className="text-stone-700 text-sm">État: <span className="font-semibold">dynamique</span></p>
                <p className="text-stone-700 text-sm">Vitesse: <span className="font-semibold">variable</span></p>
              </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f4" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <rect width="1000" height="500" fill="url(#mapGradient)"/>

              <path
                ref={pathRef}
                d="M 120,280 Q 200,220 300,240 T 500,250 Q 650,260 750,240 T 880,250"
                stroke="#d97706"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,8"
                opacity="0.7"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="36"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              {positions.map((p, idx) => (
                <g
                  key={p.name}
                  transform={`translate(${p.x}, ${p.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => jumpTo(p.t, idx)}
                  onMouseEnter={() => {
                    const tip = document.getElementById('map-tooltip');
                    if (tip) {
                      tip.style.left = `${p.x}px`;
                      tip.style.top = `${p.y - 24}px`;
                      tip.innerHTML = `<div class='bg-white/95 border border-amber-200 text-stone-900 rounded-xl shadow-xl px-3 py-2'>
                        <div class='font-serif text-sm font-semibold'>${p.name}</div>
                        <div class='font-serif text-xs text-stone-600'>${p.tooltip}</div>
                      </div>`;
                      tip.style.display = 'block';
                    }
                  }}
                  onMouseLeave={() => {
                    const tip = document.getElementById('map-tooltip');
                    if (tip) tip.style.display = 'none';
                  }}
                >
                  <circle r="10" fill="#16A34A" opacity="0.7" />
                  <text x="14" y="-12" fontSize="14" fill="#1C1917" fontFamily="serif">{p.name}</text>
                </g>
              ))}

              <g transform={`translate(${vanTransform.x}, ${vanTransform.y}) rotate(${vanTransform.angle})`} filter="url(#glow)">
                <rect x="-15" y="-10" width="30" height="18" rx="3" fill="#1C1917" />
                <rect x="5" y="-8" width="14" height="12" rx="2" fill="#F59E0B" />
                <circle cx="-8" cy="10" r="4" fill="#0f172a" />
                <circle cx="8" cy="10" r="4" fill="#0f172a" />
              </g>

              <foreignObject x="0" y="0" width="1000" height="500">
                <div xmlns="http://www.w3.org/1999/xhtml" id="map-tooltip" style="position:absolute; display:none; transform:translate(-50%, -110%); z-index:30; pointer-events:none;"></div>
              </foreignObject>

              <text x="500" y="380" fontSize="24" fill="#16A34A" textAnchor="middle" fontFamily="serif" fontStyle="italic">
                {t('current.svgTitle')}
              </text>
              <text x="500" y="410" fontSize="16" fill="#a8a29e" textAnchor="middle" fontFamily="serif">
                {t('current.svgSubtitle')}
              </text>
            </svg>
          </div>

          <div className="p-8 bg-gradient-to-br from-white to-amber-50/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="text-green-600" size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 font-serif mb-1">{t('current.lastStop')}</p>
                    <h3 className="text-2xl font-handwritten text-stone-900 mb-1">{lastStop}</h3>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar size={14} />
                      <span className="font-serif">—</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Navigation className="text-amber-700" size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-serif mb-1">{t('current.nextDestination')}</p>
                    <h3 className="text-2xl font-handwritten text-stone-900 mb-1">{nextStop}</h3>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar size={14} />
                      <span className="font-serif">—</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-stone-600 font-serif">Cliquez sur une ville sur la carte pour simuler un arrêt.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

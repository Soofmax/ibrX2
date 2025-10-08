import { MapPin, Navigation, Calendar, Ship } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { routeStops } from '../data/routeStops';
import { expeditionTotals } from '../data/expeditionPlan';

type Stop = {
  name: string;
  t: number;
  tooltip: string;
  pauseMs?: number;
  continent: string;
  modeToNext?: 'road' | 'ferry';
};

// Build an evenly spaced sequence of stops along the path based on the route order.
const stops: Stop[] = (() => {
  const n = routeStops.length;
  return routeStops.map((rs, idx) => ({
    name: rs.label,
    continent: rs.continent,
    t: n <= 1 ? 0 : idx / (n - 1),
    tooltip: rs.label,
    modeToNext: rs.modeToNext,
    // Pause durations can be tuned later per key capitals
    pauseMs: undefined,
  }));
})();

export default function CurrentLocation() {
  const { t, lang } = useI18n();
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';

  const pathRef = useRef<SVGPathElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [positions, setPositions] = useState<{ x: number; y: number; name: string; t: number; tooltip: string }[]>([]);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [segments, setSegments] = useState<{ points: string; ferry: boolean; mid: { x: number; y: number }; pxLen: number }[]>([]);
  const [totalPxLen, setTotalPxLen] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const pts = stops.map((s) => {
      const p = path.getPointAtLength(s.t * length);
      return { x: p.x, y: p.y, name: s.name, t: s.t, tooltip: s.tooltip };
    });
    setPositions(pts);

    // Build polylines per segment for styling (ferry dashed) and compute pixel lengths
    const segs: { points: string; ferry: boolean; mid: { x: number; y: number }; pxLen: number }[] = [];
    let total = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      const L1 = a.t * length;
      const L2 = b.t * length;
      const n = 24;
      const arr: { x: number; y: number }[] = [];
      for (let j = 0; j <= n; j++) {
        const l = L1 + ((L2 - L1) * j) / n;
        const pt = path.getPointAtLength(l);
        arr.push({ x: pt.x, y: pt.y });
      }
      let pxLen = 0;
      for (let k = 0; k < arr.length - 1; k++) {
        const dx = arr[k + 1].x - arr[k].x;
        const dy = arr[k + 1].y - arr[k].y;
        pxLen += Math.hypot(dx, dy);
      }
      total += pxLen;
      const mid = arr[Math.floor(arr.length / 2)];
      segs.push({
        points: arr.map((p) => `${p.x},${p.y}`).join(' '),
        ferry: a.modeToNext === 'ferry',
        mid,
        pxLen,
      });
    }
    setSegments(segs);
    setTotalPxLen(total);
  }, []);

  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const defaultStopMs = 1200;
    const path = pathRef.current;
    if (!path) return;

    let rafId = 0;
    let prev = performance.now();
    let p = progress;
    let currentIdx = currentStopIndex;

    const tick = (time: number) => {
      const dt = (time - prev) / 1000;
      prev = time;

      // Respect reduced motion and pause/play state
      if (!playing || prefersReducedMotion) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (time < pauseUntilRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const prevP = p;
      const mode = stops[currentIdx]?.modeToNext ?? 'road';
      const base = 0.06;
      const ferryFactor = mode === 'ferry' ? 1.15 : 1.0;
      const speedPerSec = base * ferryFactor * (speedMultiplier || 1);

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
  }, [playing, speedMultiplier]);

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

  const bounce = Math.sin(progress * Math.PI * 12) * 2;

  const lastStop = stops[currentStopIndex]?.name ?? stops[0].name;
  const nextStop = stops[currentStopIndex + 1]?.name ?? stops[0].name;

  // ETA simulation
  const averageKmPerDay = 250; // configurable
  const scaleKmPerPx = totalPxLen > 0 ? expeditionTotals.distanceKm / totalPxLen : 0;

  const etaInfo = (() => {
    if (!pathRef.current || segments.length === 0) return null;
    const currIdx = Math.min(currentStopIndex, segments.length - 1);
    const currStop = stops[currIdx];
    const next = stops[currIdx + 1] ?? stops[currIdx]; // fallback
    const seg = segments[currIdx];

    const path = pathRef.current;
    const length = path.getTotalLength();
    const Lcurr = currStop.t * length;
    const Lnext = next.t * length;
    const Lnow = progress * length;

    const segSpan = Math.max(1, Lnext - Lcurr);
    const localT = Math.min(1, Math.max(0, (Lnow - Lcurr) / segSpan));

    const pxRemaining = seg.pxLen * (1 - localT);
    const kmRemaining = pxRemaining * scaleKmPerPx;

    const travelDays = kmRemaining / averageKmPerDay;
    const pauseMs = (next.pauseMs ?? 0);
    const pauseDays = pauseMs / (1000 * 60 * 60 * 24);

    const totalDays = travelDays + pauseDays;
    const etaMs = totalDays * 24 * 60 * 60 * 1000;
    const etaDate = new Date(Date.now() + etaMs);

    return { kmRemaining, etaDate, isFerry: currStop.modeToNext === 'ferry' };
  })();

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
          <div
            className="relative aspect-video bg-gradient-to-br from-stone-200 to-amber-100 overflow-hidden"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
                setPlaying((p) => !p);
              } else if (e.key === 'ArrowRight') {
                const next = (currentStopIndex + 1) % stops.length;
                jumpTo(stops[next].t, next);
              } else if (e.key === 'ArrowLeft') {
                const prev = currentStopIndex > 0 ? currentStopIndex - 1 : 0;
                jumpTo(stops[prev].t, prev);
              }
            }}
          >
            {/* Controls */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-white/90 border border-amber-200 rounded-xl p-3 shadow-lg font-serif flex items-center gap-2">
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
            </div>
            {/* Legend with segment type and ETA */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-white/90 border border-amber-200 rounded-xl p-4 shadow-lg font-serif min-w-[240px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-stone-900 rounded-sm"></div>
                    <span className="text-stone-900 font-semibold">Van</span>
                  </div>
                  {etaInfo?.isFerry && (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                      <Ship size={14} /> {t('current.ferry')}
                    </span>
                  )}
                </div>
                <p className="text-stone-700 text-sm">{t('current.state')} <span className="font-semibold">{playing ? t('current.moving') : t('current.paused')}</span></p>
                <p className="text-stone-700 text-sm">{t('current.speedLabel')} <span className="font-semibold">{speedMultiplier}×</span> ({t('current.speedModelFmt').replace('{n}', String(averageKmPerDay))})</p>
                {etaInfo && (
                  <div className="mt-2 text-stone-700 text-sm">
                    <p>{t('current.distanceRemaining')} <span className="font-semibold">{Math.round(etaInfo.kmRemaining).toLocaleString(locale)} {t('current.km')}</span></p>
                    <p>{t('current.etaNext')} <span className="font-semibold">{etaInfo.etaDate.toLocaleString(locale, { weekday: 'short', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</span></p>
                    <p className="text-amber-700 text-xs italic mt-1">{t('current.etaSimulated')}</p>
                  </div>
                )}
              </div>
            </div>

            <svg
              className="w-full h-full"
              viewBox="0 0 1000 500"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={t('current.svgAriaLabel')}
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f4" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="1000" height="500" fill="url(#mapGradient)"/>
              {/* Styled per-segment route (solid for road, dashed for ferry) */}
              {segments.map((seg, i) => {
                const active = i === Math.min(currentStopIndex, segments.length - 1);
                return (
                  <g key={i}>
                    <polyline
                      points={seg.points}
                      fill="none"
                      stroke="#d97706"
                      strokeOpacity={seg.ferry ? 0.6 : 0.85}
                      strokeWidth={active ? 5 : 3}
                      strokeDasharray={seg.ferry ? '8 6' : undefined}
                      filter="url(#glow)"
                    />
                    {seg.ferry && (
                      <g transform={`translate(${seg.mid.x}, ${seg.mid.y})`} opacity="0.9">
                        <path d="M -10 0 L 10 0 L 6 -6 L -8 -6 Z" fill="#d97706" stroke="#b45309" strokeWidth="0.5" />
                        <rect x="-2" y="-10" width="4" height="4" fill="#1C1917" />
                      </g>
                    )}
                  </g>
                );
              })}

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
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.name}. ${p.tooltip}. ${t('current.cityAriaSuffix')}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      jumpTo(p.t, idx);
                    }
                  }}
                  onFocus={() => {
                    const tip = document.getElementById('map-tooltip');
                    if (tip) {
                      const ferry = stops[idx]?.modeToNext === 'ferry'
                        ? `<div class='font-serif text-[10px] text-amber-700 mt-1'>${t('current.nextFerrySegment')}</div>`
                        : '';
                      tip.style.left = `${p.x}px`;
                      tip.style.top = `${p.y - 24}px`;
                      tip.innerHTML = `<div class='bg-white/95 border border-amber-200 text-stone-900 rounded-xl shadow-xl px-3 py-2'>
                        <div class='font-serif text-sm font-semibold'>${p.name}</div>
                        <div class='font-serif text-xs text-stone-600'>${p.tooltip}</div>
                        ${ferry}
                      </div>`;
                      tip.style.display = 'block';
                    }
                  }}
                  onBlur={() => {
                    const tip = document.getElementById('map-tooltip');
                    if (tip) tip.style.display = 'none';
                  }}
                  onMouseEnter={() => {
                    const tip = document.getElementById('map-tooltip');
                    if (tip) {
                      const ferry = stops[idx]?.modeToNext === 'ferry' ? `<div class='font-serif text-[10px] text-amber-700 mt-1'>${t('current.nextFerrySegment')}</div>` : '';
                      tip.style.left = `${p.x}px`;
                      tip.style.top = `${p.y - 24}px`;
                      tip.innerHTML = `<div class='bg-white/95 border border-amber-200 text-stone-900 rounded-xl shadow-xl px-3 py-2'>
                        <div class='font-serif text-sm font-semibold'>${p.name}</div>
                        <div class='font-serif text-xs text-stone-600'>${p.tooltip}</div>
                        ${ferry}
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

              <g transform={`translate(${vanTransform.x}, ${vanTransform.y + bounce}) rotate(${vanTransform.angle})`} filter="url(#glow)">
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
            <div aria-live="polite" className="sr-only">
              {
                etaInfo
                  ? `${t('map.lastStep')}: ${lastStop}. ${t('map.nextDestination')}: ${nextStop}. ${t('current.distanceRemaining')} ${Math.round(etaInfo.kmRemaining).toLocaleString(locale)} ${t('current.km')}. ${t('current.etaNext')} ${etaInfo.etaDate.toLocaleString(locale)}. ${etaInfo.isFerry ? t('current.ferry') + '. ' : ''}${t('current.etaSimulatedShort')}`
                  : `${t('map.lastStep')}: ${lastStop}. ${t('map.nextDestination')}: ${nextStop}.`
              }
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-white to-amber-50/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <MapPin className="text-amber-700" size={28} />
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
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-secondary px-4 py-2"
                  onClick={() => {
                    const prev = currentStopIndex > 0 ? currentStopIndex - 1 : 0;
                    jumpTo(stops[prev].t, prev);
                  }}
                >
                  {t('current.prevStep')}
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-5 py-2"
                  onClick={() => {
                    const next = (currentStopIndex + 1) % stops.length;
                    jumpTo(stops[next].t, next);
                  }}
                >
                  {t('current.nextStep')}
                </button>
              </div>
              <p className="text-stone-600 font-serif mt-2">
                {t('current.help')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );


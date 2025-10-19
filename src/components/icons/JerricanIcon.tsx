import { useId, useMemo } from 'react';

type Props = {
  // Percentage of fill from 0 to 100
  fillPercentage: number;
  // Optional className to size/style the SVG externally (e.g., w-40 h-60)
  className?: string;
  // Optional accessible label
  ariaLabel?: string;
};

/**
 * Reusable SVG jerrican icon prepared for animation.
 * The fill level is controlled via the fillPercentage prop (0..100).
 */
export default function JerricanIcon({ fillPercentage, className, ariaLabel }: Props) {
  const clipId = useId();
  const pct = useMemo(() => {
    if (Number.isNaN(fillPercentage)) return 0;
    return Math.max(0, Math.min(100, Math.round(fillPercentage)));
  }, [fillPercentage]);

  // Body geometry constants (kept identical to existing inline SVG)
  const bodyBottomY = 125;
  const bodyFillHeight = 95;
  const currentFillHeight = (bodyFillHeight * pct) / 100;
  const currentFillY = bodyBottomY - currentFillHeight;
  const waveY = Math.max(30, currentFillY - 8);

  return (
    <svg viewBox="0 0 120 140" className={className} aria-label={ariaLabel}>
      {/* Body */}
      <path d="M20 30 L85 30 L100 45 L100 125 L20 125 Z" fill="#0f172a" stroke="#16a34a" strokeWidth="2" />
      {/* Handle */}
      <path d="M60 15 L85 15 L95 25 L70 25 Z" fill="#0f172a" stroke="#16a34a" strokeWidth="2" />
      {/* X pattern */}
      <path d="M28 55 L92 115 M92 55 L28 115" stroke="#1e293b" strokeWidth="4" opacity="0.7" />

      {/* Fill (clip to body area) */}
      <clipPath id={clipId}>
        <path d="M20 30 L85 30 L100 45 L100 125 L20 125 Z" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {/* Base background */}
        <rect x="20" y="125" width="80" height="95" fill="#22c55e" />
        {/* Actual fill driven by percentage */}
        <rect x="20" width="80" fill="#22c55e" y={currentFillY} height={currentFillHeight} />
        {/* Wave shimmer near the surface */}
        <rect x="20" y={waveY} width="80" height="12" fill="rgba(255,255,255,0.25)">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-20 0" dur="2s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}
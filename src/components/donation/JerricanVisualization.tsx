import { memo, useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

type Props = {
  targetAmount: number;
  currentAmount: number;
  label: string;
  isCompleted?: boolean;
  delay?: number;
  ariaLabel?: string;
};

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function JerricanVisualizationBase({
  targetAmount,
  currentAmount,
  label,
  isCompleted = false,
  delay = 0,
  ariaLabel,
}: Props) {
  const percent = clamp(Math.floor((currentAmount / Math.max(1, targetAmount)) * 100));
  const gradId = useId();
  const clipId = useId();
  const width = 120;
  const height = 160;
  const innerX = 16;
  const innerY = 32;
  const innerW = 88;
  const innerH = 110;

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Compute animated rect position anchored bottom
  const targetHeight = Math.round((percent / 100) * innerH);
  const targetY = innerY + innerH - targetHeight;

  const waveY = targetY - 2; // just above the liquid

  const fillRef = useRef<SVGRectElement | null>(null);
  const count = useCountUp(percent, { duration: 2000, startOnMount: true });

  return (
    <div
      className="inline-flex flex-col items-center gap-2"
      role="group"
      aria-label={
        ariaLabel ||
        `${label}, objectif ${targetAmount}€, actuellement ${currentAmount}€, ${percent}% complété`
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        aria-label={ariaLabel || label}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="drop-shadow-md"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00A86B" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#7FE5B5" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect x={innerX} y={innerY} rx={8} width={innerW} height={innerH} />
          </clipPath>
        </defs>

        {/* Outer jerrican container */}
        <g>
          {/* body */}
          <rect x={12} y={24} width={96} height={120} rx={12} fill="transparent" stroke="#14532D" strokeWidth={3} />
          {/* handle */}
          <rect x={26} y={10} width={40} height={16} rx={6} fill="transparent" stroke="#14532D" strokeWidth={3} />
        </g>

        {/* Liquid fill (animated) */}
        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            ref={fillRef}
            initial={{ height: 0, y: innerY + innerH }}
            animate={{ height: targetHeight, y: targetY }}
            transition={{ duration: reduce ? 0 : 2, ease: 'easeOut', delay }}
            x={innerX}
            width={innerW}
            fill={`url(#${gradId})`}
            style={{ willChange: 'height, transform' }}
            onAnimationComplete={() => {
              if (fillRef.current) fillRef.current.style.willChange = 'auto';
            }}
          />
          {/* Subtle wave on top */}
          <motion.path
            d={`M ${innerX} ${waveY} C ${innerX + 24} ${waveY - 3}, ${innerX + 56} ${waveY + 3}, ${innerX + innerW} ${waveY}`}
            fill="none"
            stroke="#7FE5B5"
            strokeWidth={2}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={reduce ? undefined : { x: [-5, 5, -5] }}
            transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* Completed badge (pulse once) */}
        {isCompleted && (
          <motion.g
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.2, 1] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <circle cx={96} cy={18} r={12} fill="#16a34a" />
            <text x={96} y={22} textAnchor="middle" fontSize="12" fill="#fff">✓</text>
          </motion.g>
        )}
      </svg>

      {/* Stats below */}
      <div className="text-center">
        <div className="font-handwritten text-white text-[1.5rem] leading-tight">{label}</div>
        <div className="font-serif text-sm">
          <span className="text-green-500 font-bold">{Math.floor(currentAmount)}€</span>
          <span className="text-white"> / {Math.floor(targetAmount)}€</span>
        </div>
        <div ref={count.ref as unknown as React.RefObject<HTMLDivElement>} className="font-handwritten text-green-400 text-[2.5rem] leading-none">
          {count.value}%
        </div>
      </div>
    </div>
  );
}

export default memo(JerricanVisualizationBase);
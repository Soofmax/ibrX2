import { memo, useRef } from 'react';
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

  // Visual constants (tuned for the imported SVG aspect ratio)
  const boxW = 160;
  const boxH = 200;

  // Approximate inner cavity of the jerrican as percentages of the box
  const innerLeft = Math.round(boxW * 0.23);
  const innerTop = Math.round(boxH * 0.26);
  const innerWidth = Math.round(boxW * 0.54);
  const innerHeight = Math.round(boxH * 0.62);

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Compute animated fill anchored to bottom of the inner cavity
  const targetHeight = Math.round((percent / 100) * innerHeight);
  const targetTop = innerTop + innerHeight - targetHeight;

  const fillRef = useRef<HTMLDivElement | null>(null);
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
      {/* Container with jerrycan image and animated fill overlay */}
      <div
        className="relative drop-shadow-md"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        style={{ width: boxW, height: boxH }}
      >
        {/* Decorative jerrican image from /public */}
        <img
          src="/Design sans titre_20251104_230832_0000.svg"
          alt={ariaLabel || label}
          width={boxW}
          height={boxH}
          loading="lazy"
          style={{
            width: boxW,
            height: boxH,
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
          }}
        />

        {/* Animated liquid fill clipped to an approximate inner cavity */}
        <motion.div
          ref={fillRef}
          initial={{ height: 0, top: innerTop + innerHeight }}
          animate={{ height: targetHeight, top: targetTop }}
          transition={{ duration: reduce ? 0 : 2, ease: 'easeOut', delay }}
          style={{
            position: 'absolute',
            left: innerLeft,
            width: innerWidth,
            borderRadius: 10,
            background:
              'linear-gradient(180deg, #7FE5B5 0%, #16a34a 50%, #0e7a45 100%)',
            willChange: 'height, top',
            // Clip the fill to the jerrican cavity (approximation)
            clipPath:
              'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
          onAnimationComplete={() => {
            if (fillRef.current) fillRef.current.style.willChange = 'auto';
          }}
        />

        {/* Completed badge */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.2, 1] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              width: 24,
              height: 24,
              borderRadius: 9999,
              backgroundColor: '#16a34a',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: 14,
            }}
          >
            ✓
          </motion.div>
        )}
      </div>

      {/* Stats below */}
      <div className="text-center">
        <div className="font-handwritten text-white text-[1.5rem] leading-tight">{label}</div>
        <div className="font-serif text-sm">
          <span className="text-green-500 font-bold">{Math.floor(currentAmount)}€</span>
          <span className="text-white"> / {Math.floor(targetAmount)}€</span>
        </div>
        <div
          ref={count.ref as unknown as React.RefObject<HTMLDivElement>}
          className="font-handwritten text-green-400 text-[2.5rem] leading-none"
        >
          {count.value}%
        </div>
      </div>
    </div>
  );
}

export default memo(JerricanVisualizationBase);

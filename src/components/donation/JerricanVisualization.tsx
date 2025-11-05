import { memo, useRef, useMemo } from 'react';
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
  const innerLeft = Math.round(boxW * 0.27);
  const innerTop = Math.round(boxH * 0.38);
  const innerWidth = Math.round(boxW * 0.46);
  const innerHeight = Math.round(boxH * 0.4);
  const cornerRadius = 12;
  const waveHeight = 10;

  // Bubble specs for subtle liquid animation inside the cavity
  const bubbleSpecs = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        leftPct: 6 + ((i * 12) % 88),
        size: 6 + (i % 3) * 3,
        delay: i * 0.35,
      })),
    []
  );

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Compute animated fill anchored to bottom of the inner cavity
  const targetHeight = Math.round((percent / 100) * innerHeight);

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
          src="/jerrican-transparent.svg"
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

        {/* Cavity wrapper with rounded corners for a cleaner fill */}
        <div
          style={{
            position: 'absolute',
            left: innerLeft,
            top: innerTop,
            width: innerWidth,
            height: innerHeight,
            borderRadius: cornerRadius,
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Base liquid fill (anchored bottom) */}
          <motion.div
            ref={fillRef}
            initial={{ height: 0 }}
            animate={{ height: targetHeight }}
            transition={{ duration: reduce ? 0 : 1.4, ease: 'easeOut', delay }}
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              background: 'linear-gradient(180deg, #22c55e 0%, #16a34a 55%, #0b4d32 100%)',
              willChange: 'height',
            }}
            onAnimationComplete={() => {
              if (fillRef.current) fillRef.current.style.willChange = 'auto';
            }}
          />

          {/* Animated wave surface inside the cavity */}
          {!reduce && targetHeight > 0 && (
            <motion.svg
              width={innerWidth}
              height={waveHeight}
              viewBox={`0 0 ${innerWidth} ${waveHeight}`}
              style={{
                position: 'absolute',
                left: 0,
                top: Math.max(0, innerHeight - targetHeight - Math.floor(waveHeight / 2)),
                overflow: 'visible',
                zIndex: 3,
              }}
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d={`M 0 ${waveHeight / 2} C ${innerWidth * 0.25} 0, ${
                  innerWidth * 0.75
                } ${waveHeight}, ${innerWidth} ${waveHeight / 2}`}
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={2}
              />
            </motion.svg>
          )}

          {/* Subtle bubbles rising */}
          {!reduce &&
            bubbleSpecs.map((b, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${b.leftPct}%`,
                  bottom: 4,
                  width: b.size,
                  height: b.size,
                  borderRadius: 9999,
                  background: 'rgba(255,255,255,0.25)',
                  filter: 'blur(0.2px)',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
                animate={{ y: [0, -(innerHeight - 8)], opacity: [0, 1, 0] }}
                transition={{
                  duration: 3 + (i % 3) * 0.6,
                  repeat: Infinity,
                  delay: b.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </div>

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

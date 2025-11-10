type Props = {
  className?: string;
  ariaLabel?: string;
};

/**
 * Logo mark (white monochrome) designed for green backgrounds.
 * Strokes use currentColor, so apply `text-white` on the SVG via className.
 */
export default function LogoMark({ className, ariaLabel }: Props) {
  const cls = ['text-white', className || 'w-[36px] h-[36px]'].filter(Boolean).join(' ');

  return (
    <svg
      className={cls}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    >
      {/* Globe */}
      <circle cx={22} cy={22} r={18} fill="none" stroke="currentColor" strokeWidth={3} />
      {/* Parallels / Meridians */}
      <ellipse cx={22} cy={22} rx={14} ry={6} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
      <path d="M14 6 A 18 18 0 0 0 14 38" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
      <path d="M30 6 A 18 18 0 0 0 30 38" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1.5} />
      {/* Route + arrival point */}
      <path d="M6 28 C 14 16, 24 30, 38 14" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={38} cy={14} r={2.4} fill="currentColor" />
    </svg>
  );
}
import { useEffect, useRef, useState } from 'react';

type Options = {
  duration?: number;
  easing?: (t: number) => number;
  startOnMount?: boolean;
};

export function useCountUp(target: number, options: Options = {}) {
  const { duration = 2000, easing = easeOutExpo, startOnMount = false } = options;
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const startAnimation = () => {
      if (started.current) return;
      started.current = true;
      const startTs = performance.now();
      const step = (ts: number) => {
        const p = Math.min((ts - startTs) / duration, 1);
        const eased = easing(p);
        setValue(Math.floor(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (startOnMount) {
      startAnimation();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            startAnimation();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, easing, startOnMount]);

  return { ref, value };
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
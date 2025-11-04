import { ChevronDown, ArrowRight, Globe, Route, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { useEffect, useState, useRef, useMemo } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const goSupport = () => navigate('/support');
  const goItinerary = () => navigate('/itinerary');

  // Typing effect for H1 (no CSS changes, now i18n)
  const titleFull = t('hero.titleAnimated');
  const [typedTitle, setTypedTitle] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [parallaxY, setParallaxY] = useState(0);

  // Countdown to Jan 1, 2032
  const [countdown, setCountdown] = useState({ y: 0, mo: 0, d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const targetDate = new Date('2032-01-01T00:00:00');
    const dayMs = 1000 * 60 * 60 * 24;
    const hourMs = 1000 * 60 * 60;
    const minuteMs = 1000 * 60;

    const tick = () => {
      const now = new Date();
      if (now >= targetDate) {
        setCountdown({ y: 0, mo: 0, d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      let years = targetDate.getFullYear() - now.getFullYear();
      let months = targetDate.getMonth() - now.getMonth();
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      // Build anchor date (now + years + months)
      let anchor = new Date(
        now.getFullYear() + years,
        now.getMonth() + months,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      // Adjust if we overshot due to month length differences
      if (anchor > targetDate) {
        months -= 1;
        if (months < 0) {
          years -= 1;
          months += 12;
        }
        anchor = new Date(
          now.getFullYear() + years,
          now.getMonth() + months,
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        );
      }
      const diffMs = targetDate.getTime() - anchor.getTime();
      const d = Math.floor(diffMs / dayMs);
      const h = Math.floor((diffMs % dayMs) / hourMs);
      const m = Math.floor((diffMs % hourMs) / minuteMs);
      const s = Math.floor((diffMs % minuteMs) / 1000);
      setCountdown({ y: years, mo: months, d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Particles positions for subtle animated dots
  const particles = useMemo(() => {
    const count = 24;
    return Array.from({ length: count }).map(() => {
      const top = `${Math.floor(Math.random() * 90) + 5}%`;
      const left = `${Math.floor(Math.random() * 90) + 5}%`;
      const size = `${Math.floor(Math.random() * 6) + 3}px`;
      const dur = `${(Math.random() * 6 + 8).toFixed(1)}s`;
      const delay = `${(Math.random() * 2).toFixed(1)}s`;
      return { top, left, size, dur, delay };
    });
  }, []);

  // Set fetchpriority attribute (lowercase) to avoid React warning while preserving behavior
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute('fetchpriority', 'high');
    }
  }, []);

  // Very light parallax on the hero image (disabled if reduced motion)
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const offset = Math.min(y * 0.03, 30); // max 30px
        setParallaxY(offset);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reset state on title change
    setTypedTitle('');
    setShowCaret(true);

    if (prefersReducedMotion) {
      setTypedTitle(titleFull);
      setShowCaret(false);
      return;
    }

    let i = 0;
    const typing = setInterval(() => {
      if (i < titleFull.length - 1) {
        i++;
        setTypedTitle(titleFull.slice(0, i));
      } else {
        clearInterval(typing);
        // Petite pause avant d'afficher le dernier caractère
        setTimeout(() => {
          i = titleFull.length;
          setTypedTitle(titleFull.slice(0, i));
          setShowCaret(false);
        }, 250);
      }
    }, 130);

    const blink = setInterval(() => setShowCaret((c) => !c), 700);

    return () => {
      clearInterval(typing);
      clearInterval(blink);
    };
  }, [titleFull]);

  // Scroll reveal for elements with .reveal
  useEffect(() => {
    const root = document.getElementById('home');
    if (!root) return;
    const nodes = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // KPI counters animation effect
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const nf = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US');

    const animateCounter = (el: HTMLElement, target: number, duration = 1500) => {
      if (prefersReducedMotion) {
        el.textContent = nf.format(target);
        return;
      }
      const start = performance.now();
      const from = 0;
      const step = (ts: number) => {
        const p = Math.min((ts - start) / duration, 1);
        const val = Math.floor(from + (target - from) * p);
        el.textContent = nf.format(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const nums = document.querySelectorAll<HTMLElement>('.info-card .info-number[data-count]');
    nums.forEach((el) => {
      const parent = el.closest('.info-card');
      if (!parent) return;
      const target = Number(el.dataset.count || '0');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animateCounter(el, target);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      io.observe(parent);
    });
  }, [lang]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-amber-900"></div>
        <div className="absolute inset-0 animated-gradient opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920"
            srcSet="
              https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=640 640w,
              https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1280 1280w,
              https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920 1920w
            "
            sizes="100vw"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            ref={imgRef}
            style={{ objectPosition: '50% 35%', transform: `translateY(${parallaxY}px)` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-green-900/40"></div>
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, idx) => (
            <span
              key={idx}
              className="particle"
              style={{
                top: p.top,
                left: p.left,
                ['--size' as any]: p.size,
                ['--dur' as any]: p.dur,
                ['--delay' as any]: p.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-handwritten text-amber-50 mb-6 animate-title-reveal drop-shadow-2xl leading-tight"
          aria-label={titleFull}
        >
          {typedTitle}
          <span aria-hidden="true" className="text-amber-400">
            {showCaret ? '|' : ' '}
          </span>
        </h1>

        {/* Countdown */}
        <div className="max-w-4xl mx-auto mb-6 reveal">
          <p className="text-amber-100/90 font-serif mb-2">{t('countdown.startsIn')}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div
              className="countdown-card bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="countdown-number text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.y).padStart(2, '0')}
              </div>
              <div className="countdown-label text-xs text-amber-100/80 font-serif uppercase">
                {t(countdown.y === 1 ? 'countdown.year' : 'countdown.years')}
              </div>
            </div>
            <div
              className="countdown-card bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
              style={{ animationDelay: '1s' }}
            >
              <div className="countdown-number text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.mo).padStart(2, '0')}
              </div>
              <div className="countdown-label text-xs text-amber-100/80 font-serif uppercase">
                {t(countdown.mo === 1 ? 'countdown.month' : 'countdown.months')}
              </div>
            </div>
            <div
              className="countdown-card bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
              style={{ animationDelay: '1.2s' }}
            >
              <div className="countdown-number text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.d).padStart(2, '0')}
              </div>
              <div className="countdown-label text-xs text-amber-100/80 font-serif uppercase">
                {t(countdown.d === 1 ? 'countdown.day' : 'countdown.days')}
              </div>
            </div>
            <div
              className="countdown-card bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
              style={{ animationDelay: '1.4s' }}
            >
              <div className="countdown-number text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.h).padStart(2, '0')}
              </div>
              <div className="countdown-label text-xs text-amber-100/80 font-serif uppercase">
                {t(countdown.h === 1 ? 'countdown.hour' : 'countdown.hours')}
              </div>
            </div>
            <div
              className="countdown-card bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
              style={{ animationDelay: '1.6s' }}
            >
              <div className="countdown-number text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.m).padStart(2, '0')}
              </div>
              <div className="countdown-label text-xs text-amber-100/80 font-serif uppercase">
                {t('countdown.minutes')}
              </div>
            </div>
            <div
              className="countdown-card bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all"
              style={{ animationDelay: '1.8s' }}
            >
              <div className="countdown-number text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.s).padStart(2, '0')}
              </div>
              <div className="countdown-label text-xs text-amber-100/80 font-serif uppercase">
                {t('countdown.seconds')}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl text-amber-100/90 font-serif max-w-4xl mx-auto mb-8 leading-relaxed reveal drop-shadow-lg">
          {t('hero.subtitle')}
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto mb-12 reveal">
          <p className="text-xl sm:text-2xl text-amber-100/90 font-serif leading-relaxed drop-shadow-lg">
            {t('hero.p1')}
          </p>
          <p className="text-xl sm:text-2xl text-amber-100/90 font-serif leading-relaxed drop-shadow-lg">
            {t('hero.p2')}
          </p>
          <p className="text-xl sm:text-2xl text-amber-100/90 font-serif leading-relaxed drop-shadow-lg">
            {t('hero.p3')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <button
            type="button"
            onClick={goSupport}
            className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-amber-50 font-serif px-10 py-5 rounded-full text-lg transition-all hover:scale-105 shadow-2xl hover:shadow-green-500/50 overflow-hidden focus-ring btn-shimmer btn-ripple"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {t('hero.ctaSupport')}
              <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <button
            type="button"
            onClick={goItinerary}
            className="bg-stone-800/50 hover:bg-stone-700/50 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 text-amber-50 font-serif px-10 py-5 rounded-full text-lg transition-all hover:scale-105 shadow-2xl focus-ring"
          >
            {t('hero.ctaExplore')}
          </button>
        </div>

        {/* KPI strip under CTAs */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto reveal">
          <div className="info-card reveal flex items-center gap-3">
            <span className="info-icon">
              <Globe size={20} />
            </span>
            <div>
              <p className="text-stone-900 font-handwritten text-xl">{t('hero.kpi.distance')}</p>
              <p className="text-stone-700 font-serif text-sm">{t('hero.kpi.distanceDesc')}</p>
            </div>
          </div>
          <div className="info-card reveal px-5 py-4 flex items-center gap-3">
            <span className="info-icon">
              <Route size={20} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="info-number" data-count="5">
                  0
                </span>
              </div>
              <p className="text-stone-700 font-serif text-sm">{t('hero.kpi.continentsDesc')}</p>
            </div>
          </div>
          <div className="info-card reveal px-5 py-4 flex items-center gap-3">
            <span className="info-icon">
              <Truck size={20} />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="info-number" data-count="3">
                  0
                </span>
              </div>
              <p className="text-stone-700 font-serif text-sm">{t('hero.kpi.trucksDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goItinerary}
        aria-label={t('hero.chevronAria')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-amber-400 animate-bounce cursor-pointer hover:text-amber-300 transition-colors focus-ring"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
}

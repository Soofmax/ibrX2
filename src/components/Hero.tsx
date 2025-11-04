import { ChevronDown, ArrowRight, Globe, Route, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const goSupport = () => navigate('/support');
  const goItinerary = () => navigate('/itinerary');

  // Typing effect for H1 (no CSS changes, now i18n)
  const titleFull = t('hero.titleAnimated');
  const [typedTitle, setTypedTitle] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [parallaxY, setParallaxY] = useState(0);

  // Countdown to Jan 1, 2032
  const [countdown, setCountdown] = useState({ y: 0, mo: 0, d: 0, h: 0 });
  useEffect(() => {
    const targetDate = new Date('2032-01-01T00:00:00');
    const tick = () => {
      const now = new Date();
      if (now >= targetDate) {
        setCountdown({ y: 0, mo: 0, d: 0, h: 0 });
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
      const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const h = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setCountdown({ y: years, mo: months, d, h });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
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

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-amber-900"></div>
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
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-block mb-6 px-6 py-2 bg-amber-600/20 backdrop-blur-sm rounded-full border border-amber-500/30 animate-fade-in">
          <p className="text-amber-300 font-serif text-sm tracking-wider">{t('hero.pretitle')}</p>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl font-handwritten text-amber-50 mb-6 animate-fade-in drop-shadow-2xl leading-tight"
          aria-label={titleFull}
        >
          {typedTitle}
          <span aria-hidden="true" className="text-amber-400">
            {showCaret ? '|' : ' '}
          </span>
        </h1>

        {/* Countdown */}
        <div className="max-w-4xl mx-auto mb-6 animate-fade-in">
          <p className="text-amber-100/90 font-serif mb-2">
            {t('countdown.startsIn')}:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all">
              <div className="text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.y).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-100/80 font-serif uppercase">
                {t('countdown.years')}
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all">
              <div className="text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.mo).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-100/80 font-serif uppercase">
                {t('countdown.months')}
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all">
              <div className="text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.d).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-100/80 font-serif uppercase">
                {t('countdown.days')}
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all">
              <div className="text-3xl sm:text-4xl text-amber-50 font-mono tracking-widest">
                {String(countdown.h).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-100/80 font-serif uppercase">
                {t('countdown.hours')}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl text-amber-100/90 font-serif max-w-4xl mx-auto mb-8 leading-relaxed animate-fade-in drop-shadow-lg">
          {t('hero.subtitle')}
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto mb-12 animate-fade-in">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <button
            type="button"
            onClick={goSupport}
            className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-amber-50 font-serif px-10 py-5 rounded-full text-lg transition-all hover:scale-105 shadow-2xl hover:shadow-green-500/50 overflow-hidden focus-ring"
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
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in">
          <div className="bg-white/80 border border-amber-200 rounded-2xl px-5 py-4 text-left flex items-center gap-3 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:rotate-[1deg] hover:shadow-2xl">
            <Globe className="text-green-700" size={24} />
            <div>
              <p className="text-stone-900 font-handwritten text-xl">{t('hero.kpi.distance')}</p>
              <p className="text-stone-700 font-serif text-sm">{t('hero.kpi.distanceDesc')}</p>
            </div>
          </div>
          <div className="bg-white/80 border border-amber-200 rounded-2xl px-5 py-4 text-left flex items-center gap-3 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:rotate-[1deg] hover:shadow-2xl">
            <Route className="text-green-700" size={24} />
            <div>
              <p className="text-stone-900 font-handwritten text-xl">{t('hero.kpi.continents')}</p>
              <p className="text-stone-700 font-serif text-sm">{t('hero.kpi.continentsDesc')}</p>
            </div>
          </div>
          <div className="bg-white/80 border border-amber-200 rounded-2xl px-5 py-4 text-left flex items-center gap-3 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:rotate-[1deg] hover:shadow-2xl">
            <Truck className="text-green-700" size={24} />
            <div>
              <p className="text-stone-900 font-handwritten text-xl">{t('hero.kpi.trucks')}</p>
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

import { Menu, X, Compass } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const lastScrollY = useRef(0);
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 2);
      const prev = lastScrollY.current;
      if (y > prev + 4) {
        setCompact(true);
      } else if (y < prev - 4) {
        setCompact(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setMoreOpen(false);
  };

  const navClass = (path: string) =>
    `px-5 py-2 rounded-full transition-all font-serif focus-ring ${
      location.pathname === path
        ? 'bg-green-600 text-white active-underline'
        : 'text-white hover:bg-green-600 hover:scale-105'
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-[1000] transition-all duration-300 ease-in-out animate-slide-down ${
        scrolled
          ? 'bg-[rgba(45,95,63,0.9)] backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.1)] border-b border-white/10'
          : 'bg-[rgba(45,95,63,0.9)] backdrop-blur-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] border-b border-white/10'
      } ${compact ? 'h-[50px]' : 'h-[60px] sm:h-[65px] md:h-[70px]'}`}
    >
      <div className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 ${compact ? 'py-1' : 'py-2 sm:py-3'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => go('/')}>
            <Compass
              className="text-green-500 transition-transform duration-300 hover:scale-105 hover:rotate-[5deg]"
              size={36}
            />
            <span className="text-2xl sm:text-3xl font-handwritten text-white drop-shadow-lg">
              {t('header.siteName')}
            </span>
          </div>

          <nav
            className="hidden md:flex space-x-1 bg-white/10 rounded-full px-4 py-1 backdrop-blur-sm border border-white/10"
            aria-label="Primary"
          >
            <button
              type="button"
              aria-current={location.pathname === '/' ? 'page' : undefined}
              onClick={() => go('/')}
              className={navClass('/')}
            >
              {t('nav.home')}
            </button>
            <button
              type="button"
              aria-current={location.pathname === '/itinerary' ? 'page' : undefined}
              onClick={() => go('/itinerary')}
              className={navClass('/itinerary')}
            >
              {t('nav.itinerary')}
            </button>
            <button
              type="button"
              aria-current={location.pathname === '/expedition' ? 'page' : undefined}
              onClick={() => go('/expedition')}
              className={navClass('/expedition')}
            >
              {t('nav.expedition')}
            </button>
            <button
              type="button"
              aria-current={location.pathname === '/contact' ? 'page' : undefined}
              onClick={() => go('/contact')}
              className={navClass('/contact')}
            >
              {t('nav.contact')}
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                className="px-5 py-2 rounded-full transition-all font-serif focus-ring text-white hover:bg-green-600 hover:scale-105"
              >
                {t('nav.more')}
              </button>
              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-56 bg-green-900/90 rounded-xl shadow-lg backdrop-blur-sm p-2 border border-green-700"
                >
                  <button
                    type="button"
                    onClick={() => go('/logistics')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-white font-serif hover:bg-green-700 focus-ring"
                  >
                    {t('nav.logistics')}
                  </button>

                  <button
                    type="button"
                    onClick={() => go('/blog')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-white font-serif hover:bg-green-700 focus-ring"
                  >
                    {t('nav.blog')}
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/sponsor-targets')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-white font-serif hover:bg-green-700 focus-ring"
                  >
                    {t('nav.targets')}
                  </button>
                  <button
                    type="button"
                    onClick={() => go('/support')}
                    className="block w-full text-left px-4 py-2 rounded-lg text-white font-serif hover:bg-green-700 focus-ring"
                  >
                    {t('nav.support')}
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-white bg-stone-800/50 px-3 py-2 rounded-full backdrop-blur-sm focus-ring"
              aria-label={t('header.toggleLanguageAria')}
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white border border-white/20 bg-[rgba(45,95,63,0.35)] w-[30px] h-[30px] rounded-full backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 focus-ring"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[900] bg-black/40 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav
              id="mobile-menu"
              className={`md:hidden fixed z-[1001] right-0 ${compact ? 'top-[50px]' : 'top-[60px] sm:top-[65px] md:top-[70px]'} w-72 sm:w-80 h-[calc(100vh-60px)] sm:h-[calc(100vh-65px)] md:h-[calc(100vh-70px)] p-4 bg-[rgba(45,95,63,0.85)] border-l border-white/10 backdrop-blur-lg rounded-l-2xl animate-slide-in-right flex flex-col space-y-2`}
              aria-label="Mobile"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-serif">{t('header.language')}</span>
                <button
                  type="button"
                  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                  className="text-white bg-green-700/70 px-3 py-1 rounded-full focus-ring"
                >
                  {lang === 'fr' ? 'FR' : 'EN'}
                </button>
              </div>
              <button
                type="button"
                aria-current={location.pathname === '/' ? 'page' : undefined}
                onClick={() => go('/')}
                className={navClass('/')}
              >
                {t('nav.home')}
              </button>
              <button
                type="button"
                aria-current={location.pathname === '/itinerary' ? 'page' : undefined}
                onClick={() => go('/itinerary')}
                className={navClass('/itinerary')}
              >
                {t('nav.itinerary')}
              </button>
              <button
                type="button"
                aria-current={location.pathname === '/expedition' ? 'page' : undefined}
                onClick={() => go('/expedition')}
                className={navClass('/expedition')}
              >
                {t('nav.expedition')}
              </button>

              <button
                type="button"
                aria-current={location.pathname === '/logistics' ? 'page' : undefined}
                onClick={() => go('/logistics')}
                className={navClass('/logistics')}
              >
                {t('nav.logistics')}
              </button>
              
              <button
                type="button"
                aria-current={location.pathname === '/blog' ? 'page' : undefined}
                onClick={() => go('/blog')}
                className={navClass('/blog')}
              >
                {t('nav.blog')}
              </button>
              
              <button
                type="button"
                aria-current={location.pathname === '/sponsor-targets' ? 'page' : undefined}
                onClick={() => go('/sponsor-targets')}
                className={navClass('/sponsor-targets')}
              >
                {t('nav.targets')}
              </button>
              <button
                type="button"
                aria-current={location.pathname === '/support' ? 'page' : undefined}
                onClick={() => go('/support')}
                className={navClass('/support')}
              >
                {t('nav.support')}
              </button>
              <button
                type="button"
                aria-current={location.pathname === '/contact' ? 'page' : undefined}
                onClick={() => go('/contact')}
                className={navClass('/contact')}
              >
                {t('nav.contact')}
              </button>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

import { Menu, X, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navClass = (path: string) =>
    `px-5 py-2 rounded-full transition-all font-serif focus-ring ${
      location.pathname === path
        ? 'bg-green-600 text-white active-underline'
        : 'text-white hover:bg-green-600 hover:scale-105'
    }`;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-green-900/95 backdrop-blur-md shadow-2xl'
        : 'bg-gradient-to-b from-stone-900/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => go('/')}>
            <Compass className="text-green-500 group-hover:rotate-180 transition-transform duration-700" size={32} />
            <h1 className="text-2xl sm:text-3xl font-handwritten text-white drop-shadow-lg">
              {t('header.siteName')}
            </h1>
          </div>

          <nav className="hidden md:flex space-x-1 bg-green-800/40 rounded-full px-2 py-2 backdrop-blur-sm" aria-label="Primary">
            <button type="button" aria-current={location.pathname === '/' ? 'page' : undefined} onClick={() => go('/')} className={navClass('/')}>
              {t('nav.home')}
            </button>
            <button type="button" aria-current={location.pathname === '/itinerary' ? 'page' : undefined} onClick={() => go('/itinerary')} className={navClass('/itinerary')}>
              {t('nav.itinerary')}
            </button>
            <button type="button" aria-current={location.pathname === '/fleet' ? 'page' : undefined} onClick={() => go('/fleet')} className={navClass('/fleet')}>
              {t('nav.fleet')}
            </button>
            <button type="button" aria-current={location.pathname === '/team' ? 'page' : undefined} onClick={() => go('/team')} className={navClass('/team')}>
              {t('nav.team')}
            </button>
            <button type="button" aria-current={location.pathname === '/logistics' ? 'page' : undefined} onClick={() => go('/logistics')} className={navClass('/logistics')}>
              {t('nav.logistics')}
            </button>
            <button type="button" aria-current={location.pathname === '/practical' ? 'page' : undefined} onClick={() => go('/practical')} className={navClass('/practical')}>
              {t('nav.practical')}
            </button>
            <button type="button" aria-current={location.pathname === '/blog' ? 'page' : undefined} onClick={() => go('/blog')} className={navClass('/blog')}>
              {t('nav.blog')}
            </button>
            <button type="button" aria-current={location.pathname === '/sponsors' ? 'page' : undefined} onClick={() => go('/sponsors')} className={navClass('/sponsors')}>
              {t('nav.sponsors')}
            </button>
            <button type="button" aria-current={location.pathname === '/sponsor-targets' ? 'page' : undefined} onClick={() => go('/sponsor-targets')} className={navClass('/sponsor-targets')}>
              {t('nav.targets')}
            </button>
            <button type="button" aria-current={location.pathname === '/support' ? 'page' : undefined} onClick={() => go('/support')} className={navClass('/support')}>
              {t('nav.support')}
            </button>
            <button type="button" aria-current={location.pathname === '/contact' ? 'page' : undefined} onClick={() => go('/contact')} className={navClass('/contact')}>
              {t('nav.contact')}
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-white bg-stone-800/50 px-3 py-2 rounded-full backdrop-blur-sm focus-ring"
              aria-label="Toggle language"
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white bg-green-800/50 p-2 rounded-full backdrop-blur-sm focus-ring"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white bg-green-800/50 p-2 rounded-full backdrop-blur-sm focus-ring"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4 pb-4 flex flex-col space-y-2 bg-green-800/40 rounded-xl p-4 backdrop-blur-sm animate-fade-in" aria-label="Mobile">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-serif">Langue</span>
              <button type="button" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-white bg-green-700 px-3 py-1 rounded-full focus-ring">
                {lang === 'fr' ? 'FR' : 'EN'}
              </button>
            </div>
            <button type="button" aria-current={location.pathname === '/' ? 'page' : undefined} onClick={() => go('/')} className={navClass('/')}>
              {t('nav.home')}
            </button>
            <button type="button" aria-current={location.pathname === '/itinerary' ? 'page' : undefined} onClick={() => go('/itinerary')} className={navClass('/itinerary')}>
              {t('nav.itinerary')}
            </button>
            <button type="button" aria-current={location.pathname === '/fleet' ? 'page' : undefined} onClick={() => go('/fleet')} className={navClass('/fleet')}>
              {t('nav.fleet')}
            </button>
            <button type="button" aria-current={location.pathname === '/team' ? 'page' : undefined} onClick={() => go('/team')} className={navClass('/team')}>
              {t('nav.team')}
            </button>
            <button type="button" aria-current={location.pathname === '/logistics' ? 'page' : undefined} onClick={() => go('/logistics')} className={navClass('/logistics')}>
              {t('nav.logistics')}
            </button>
            <button type="button" aria-current={location.pathname === '/practical' ? 'page' : undefined} onClick={() => go('/practical')} className={navClass('/practical')}>
              {t('nav.practical')}
            </button>
            <button type="button" aria-current={location.pathname === '/blog' ? 'page' : undefined} onClick={() => go('/blog')} className={navClass('/blog')}>
              {t('nav.blog')}
            </button>
            <button type="button" aria-current={location.pathname === '/sponsors' ? 'page' : undefined} onClick={() => go('/sponsors')} className={navClass('/sponsors')}>
              {t('nav.sponsors')}
            </button>
            <button type="button" aria-current={location.pathname === '/sponsor-targets' ? 'page' : undefined} onClick={() => go('/sponsor-targets')} className={navClass('/sponsor-targets')}>
              {t('nav.targets')}
            </button>
            <button type="button" aria-current={location.pathname === '/support' ? 'page' : undefined} onClick={() => go('/support')} className={navClass('/support')}>
              {t('nav.support')}
            </button>
            <button type="button" aria-current={location.pathname === '/contact' ? 'page' : undefined} onClick={() => go('/contact')} className={navClass('/contact')}>
              {t('nav.contact')}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

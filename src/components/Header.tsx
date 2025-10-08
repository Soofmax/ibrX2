import { Menu, X, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const labels = {
    home: lang === 'fr' ? 'Accueil' : 'Home',
    itinerary: lang === 'fr' ? 'Itinéraire' : 'Itinerary',
    fleet: lang === 'fr' ? 'Flotte' : 'Fleet',
    team: lang === 'fr' ? 'Équipe' : 'Team',
    logistics: lang === 'fr' ? 'Logistique' : 'Logistics',
    practical: lang === 'fr' ? 'Infos pratiques' : 'Practical',
    blog: lang === 'fr' ? 'Blog' : 'Blog',
    sponsors: lang === 'fr' ? 'Sponsors' : 'Sponsors',
    support: lang === 'fr' ? 'Soutien' : 'Support',
    contact: lang === 'fr' ? 'Contact' : 'Contact',
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-stone-900/95 backdrop-blur-md shadow-2xl'
        : 'bg-gradient-to-b from-stone-900/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <Compass className="text-amber-500 group-hover:rotate-180 transition-transform duration-700" size={32} />
            <h1 className="text-2xl sm:text-3xl font-handwritten text-amber-50 drop-shadow-lg">
              World Tour
            </h1>
          </div>

          <nav className="hidden md:flex space-x-1 bg-stone-800/50 rounded-full px-2 py-2 backdrop-blur-sm" aria-label="Primary">
            <button type="button" onClick={() => scrollToSection('home')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.home}
            </button>
            <button type="button" onClick={() => scrollToSection('map')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.itinerary}
            </button>
            <button type="button" onClick={() => scrollToSection('fleet')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.fleet}
            </button>
            <button type="button" onClick={() => scrollToSection('team')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.team}
            </button>
            <button type="button" onClick={() => scrollToSection('logistics')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.logistics}
            </button>
            <button type="button" onClick={() => scrollToSection('practical')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.practical}
            </button>
            <button type="button" onClick={() => scrollToSection('blog')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.blog}
            </button>
            <button type="button" onClick={() => scrollToSection('sponsors')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.sponsors}
            </button>
            <button type="button" onClick={() => scrollToSection('support')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.support}
            </button>
            <button type="button" onClick={() => scrollToSection('contact')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              {labels.contact}
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-amber-50 bg-stone-800/50 px-3 py-2 rounded-full backdrop-blur-sm focus-ring"
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
              className="md:hidden text-amber-50 bg-stone-800/50 p-2 rounded-full backdrop-blur-sm focus-ring"
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
            className="md:hidden text-amber-50 bg-stone-800/50 p-2 rounded-full backdrop-blur-sm focus-ring"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4 pb-4 flex flex-col space-y-2 bg-stone-800/50 rounded-xl p-4 backdrop-blur-sm animate-fade-in" aria-label="Mobile">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-50 font-serif">Langue</span>
              <button type="button" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-amber-50 bg-stone-700 px-3 py-1 rounded-full focus-ring">
                {lang === 'fr' ? 'FR' : 'EN'}
              </button>
            </div>
            <button type="button" onClick={() => scrollToSection('home')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.home}
            </button>
            <button type="button" onClick={() => scrollToSection('map')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.itinerary}
            </button>
            <button type="button" onClick={() => scrollToSection('fleet')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.fleet}
            </button>
            <button type="button" onClick={() => scrollToSection('team')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.team}
            </button>
            <button type="button" onClick={() => scrollToSection('logistics')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.logistics}
            </button>
            <button type="button" onClick={() => scrollToSection('practical')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.practical}
            </button>
            <button type="button" onClick={() => scrollToSection('blog')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.blog}
            </button>
            <button type="button" onClick={() => scrollToSection('sponsors')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.sponsors}
            </button>
            <button type="button" onClick={() => scrollToSection('support')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.support}
            </button>
            <button type="button" onClick={() => scrollToSection('contact')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              {labels.contact}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

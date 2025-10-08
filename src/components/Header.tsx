import { Menu, X, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
              Your Name: World Tour
            </h1>
          </div>

          <nav className="hidden md:flex space-x-1 bg-stone-800/50 rounded-full px-2 py-2 backdrop-blur-sm" aria-label="Primary">
            <button type="button" onClick={() => scrollToSection('home')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('blog')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              Blog
            </button>
            <button type="button" onClick={() => scrollToSection('map')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              Map
            </button>
            <button type="button" onClick={() => scrollToSection('support')} className="px-5 py-2 text-amber-50 hover:bg-amber-600 rounded-full transition-all font-serif hover:scale-105 focus-ring">
              Support
            </button>
          </nav>

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
            <button type="button" onClick={() => scrollToSection('home')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('blog')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              Blog
            </button>
            <button type="button" onClick={() => scrollToSection('map')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              Map
            </button>
            <button type="button" onClick={() => scrollToSection('support')} className="text-amber-50 hover:bg-amber-600 transition-all font-serif text-left px-4 py-2 rounded-lg focus-ring">
              Support
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { useEffect, useState } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const goSupport = () => navigate('/support');
  const goItinerary = () => navigate('/itinerary');

  // Typing effect for H1 (no CSS changes)
  const titleFull = 'Périple Mondial des Capitales';
  const [typedTitle, setTypedTitle] = useState('');
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setTypedTitle(titleFull.slice(0, i));
      if (i >= titleFull.length) {
        clearInterval(typing);
      }
    }, 50);

    const blink = setInterval(() => setShowCaret((c) => !c), 500);

    return () => {
      clearInterval(typing);
      clearInterval(blink);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900"></div>
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
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50"></div>
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
          <span aria-hidden="true" className="text-amber-400">{showCaret ? '|' : ' '}</span>
        </h1>

        <h2 className="text-2xl sm:text-3xl text-amber-100/90 font-serif max-w-4xl mx-auto mb-8 leading-relaxed animate-fade-in drop-shadow-lg">
          Suivez notre périple à travers les routes, à travers les villes, à travers les pays, à travers le monde...
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto mb-12 animate-fade-in">
          <p className="text-xl sm:text-2xl text-amber-100/90 font-serif leading-relaxed drop-shadow-lg">
            En 2032, l'aventure WanderGlobers commencera. Un périple de 60 000 km à travers 5 continents pour relier un maximum de capitales mondiales par la route.
          </p>
          <p className="text-xl sm:text-2xl text-amber-100/90 font-serif leading-relaxed drop-shadow-lg">
            À bord de trois camions Mercedes légendaires, dont deux robustes 1113, notre convoi tracera cette odyssée.
          </p>
          <p className="text-xl sm:text-2xl text-amber-100/90 font-serif leading-relaxed drop-shadow-lg">
            L'aventure commence maintenant. Rejoignez-nous, suivez les préparatifs et soutenez la mission pour 2032.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <button
            type="button"
            onClick={goSupport}
            className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-serif px-10 py-5 rounded-full text-lg transition-all hover:scale-105 shadow-2xl hover:shadow-amber-500/50 overflow-hidden focus-ring"
          >
            <span className="relative z-10">{t('hero.ctaSupport')}</span>
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
      </div>

      <button
        type="button"
        onClick={goItinerary}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-amber-400 animate-bounce cursor-pointer hover:text-amber-300 transition-colors focus-ring"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
}

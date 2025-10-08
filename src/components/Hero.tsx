import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSupport = () => {
    const element = document.getElementById('support');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const element = document.getElementById('map');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900"></div>
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/50"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-block mb-6 px-6 py-2 bg-amber-600/20 backdrop-blur-sm rounded-full border border-amber-500/30 animate-fade-in">
          <p className="text-amber-300 font-serif text-sm tracking-wider">AROUND THE WORLD JOURNEY</p>
        </div>

        <h2 className="text-5xl sm:text-6xl lg:text-8xl font-handwritten text-amber-50 mb-8 animate-fade-in drop-shadow-2xl leading-tight">
          The Adventure of a Lifetime,
          <span className="block text-amber-400 mt-2">Step by Step</span>
        </h2>

        <p className="text-xl sm:text-2xl text-amber-100/90 font-serif max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in drop-shadow-lg">
          Follow my journey around the globe, discover my stories and join this incredible adventure. Welcome aboard!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <button
            onClick={scrollToSupport}
            className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-serif px-10 py-5 rounded-full text-lg transition-all hover:scale-105 shadow-2xl hover:shadow-amber-500/50 overflow-hidden"
          >
            <span className="relative z-10">Support the Adventure</span>
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <button
            onClick={scrollToNext}
            className="bg-stone-800/50 hover:bg-stone-700/50 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 text-amber-50 font-serif px-10 py-5 rounded-full text-lg transition-all hover:scale-105 shadow-2xl"
          >
            Explore My Journey
          </button>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-amber-400 animate-bounce cursor-pointer hover:text-amber-300 transition-colors"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
}

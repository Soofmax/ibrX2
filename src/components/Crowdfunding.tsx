import { Coffee, Gift, Heart, Sparkles, Check } from 'lucide-react';

export default function Crowdfunding() {
  return (
    <section id="support" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-900 to-stone-800 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Sparkles className="text-amber-400 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-amber-50 mb-6">
            Soutenir l’expédition
          </h2>
          <p className="text-xl text-amber-100/90 font-serif max-w-3xl mx-auto leading-relaxed">
            Votre soutien rend ce projet possible. Don ponctuel ou contribution régulière, chaque geste compte — merci d’être de l’aventure !
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl p-8 border-2 border-amber-200 hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-full p-5 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <Coffee className="text-amber-50" size={36} />
              </div>
            </div>

            <h3 className="text-3xl font-handwritten text-stone-900 mb-3 text-center">
              Don spontané
            </h3>

            <p className="text-stone-700 font-serif mb-6 text-center leading-relaxed text-lg">
              Un café pour la route — chaque contribution aide à maintenir l’expédition.
            </p>

            <div className="bg-white rounded-2xl p-4 mb-6 border border-amber-200">
              <p className="text-center font-serif text-stone-600 mb-2">À partir de</p>
              <p className="text-center text-4xl font-handwritten text-amber-700">5€</p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-amber-600 flex-shrink-0" />
                <span>Don unique</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-amber-600 flex-shrink-0" />
                <span>Message de remerciement</span>
              </li>
            </ul>

            <button type="button" className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-50 font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg focus-ring">
              Envoyer via PayPal
            </button>
          </div>

          <div className="group bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-2xl p-8 border-4 border-amber-500 hover:shadow-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-amber-500 text-white text-sm font-serif px-4 py-1 rounded-full shadow-lg">Populaire</span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-full p-5 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <Gift className="text-white" size={36} />
              </div>
            </div>

            <h3 className="text-3xl font-handwritten text-amber-50 mb-3 text-center">
              Devenir contributeur
            </h3>

            <p className="text-amber-100/90 font-serif mb-6 text-center leading-relaxed text-lg">
              Contenus exclusifs, accès anticipé et récompenses pour les soutiens réguliers.
            </p>

            <div className="bg-stone-800/50 rounded-2xl p-4 mb-6 border border-amber-500/30">
              <p className="text-center font-serif text-amber-200 mb-2">Dès</p>
              <p className="text-center text-4xl font-handwritten text-amber-400">10€<span className="text-xl">/mois</span></p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-amber-50 font-serif">
                <Check size={18} className="text-amber-400 flex-shrink-0" />
                <span>Behind-the-scenes</span>
              </li>
              <li className="flex items-center gap-2 text-amber-50 font-serif">
                <Check size={18} className="text-amber-400 flex-shrink-0" />
                <span>Accès anticipé aux posts</span>
              </li>
              <li className="flex items-center gap-2 text-amber-50 font-serif">
                <Check size={18} className="text-amber-400 flex-shrink-0" />
                <span>Conseils mensuels</span>
              </li>
              <li className="flex items-center gap-2 text-amber-50 font-serif">
                <Check size={18} className="text-amber-400 flex-shrink-0" />
                <span>Communauté</span>
              </li>
            </ul>

            <button type="button" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-xl text-lg focus-ring">
              Voir les récompenses
            </button>
          </div>

          <div className="group bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-2xl p-8 border-2 border-rose-200 hover:shadow-rose-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-full p-5 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <Heart className="text-rose-50" size={36} />
              </div>
            </div>

            <h3 className="text-3xl font-handwritten text-stone-900 mb-3 text-center">
              Plateformes partenaires
            </h3>

            <p className="text-stone-700 font-serif mb-6 text-center leading-relaxed text-lg">
              Soutien via Tipeee ou Ulule pour les contributions récurrentes et l’accès communauté.
            </p>

            <div className="bg-white rounded-2xl p-4 mb-6 border border-rose-200">
              <p className="text-center font-serif text-stone-600 mb-2">Flexible</p>
              <p className="text-center text-4xl font-handwritten text-rose-600">Libre</p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-rose-600 flex-shrink-0" />
                <span>Montant au choix</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-rose-600 flex-shrink-0" />
                <span>Annulation à tout moment</span>
              </li>
              <li className="flex items-center gap-2 text-stone-700 font-serif">
                <Check size={18} className="text-rose-600 flex-shrink-0" />
                <span>Communauté engagée</span>
              </li>
            </ul>

            <button type="button" className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-rose-50 font-serif px-6 py-4 rounded-full transition-all hover:scale-105 shadow-lg text-lg focus-ring">
              Visiter la page
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="text-center mb-4">
            <p className="text-amber-100/90 font-serif">Plateformes de dons disponibles (bientôt):</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="bg-amber-600 hover:bg-amber-500 text-amber-50 font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">PayPal</a>
            <a href="#" className="bg-stone-800 hover:bg-stone-700 text-amber-50 font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">Patreon</a>
            <a href="#" className="bg-rose-600 hover:bg-rose-500 text-rose-50 font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">Tipeee</a>
            <a href="#" className="bg-orange-600 hover:bg-orange-500 text-white font-serif px-5 py-3 rounded-full transition-all hover:scale-105 shadow-lg focus-ring">Ulule</a>
          </div>
        </div>
      </div>
    </section>
  );
}

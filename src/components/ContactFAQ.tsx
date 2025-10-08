import { MailQuestion, HelpCircle } from 'lucide-react';

export default function ContactFAQ() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-24 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <MailQuestion className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            Contact & FAQ
          </h2>
          <p className="text-xl text-stone-600 font-serif">Sponsors, presse, co-aventuriers — parlons-en</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-handwritten text-stone-900 mb-3">Formulaire de contact</h3>
            <form className="space-y-3">
              <input className="w-full px-4 py-3 rounded-xl border border-stone-200 font-serif focus-ring text-stone-900" placeholder="Nom" />
              <input className="w-full px-4 py-3 rounded-xl border border-stone-200 font-serif focus-ring text-stone-900" placeholder="Email" />
              <textarea className="w-full px-4 py-3 rounded-xl border border-stone-200 font-serif focus-ring text-stone-900" placeholder="Message" rows={5} />
              <button type="button" className="bg-stone-900 hover:bg-stone-800 text-amber-50 font-serif px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl focus-ring">
                Envoyer
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="text-amber-600" size={24} />
              <h3 className="text-2xl font-handwritten text-stone-900">FAQ</h3>
            </div>
            <ul className="space-y-3 text-stone-700 font-serif">
              <li>
                <strong className="font-handwritten text-stone-900">Pourquoi des véhicules restaurés ?</strong><br />
                Pour la fiabilité, la durabilité et l’adaptabilité aux terrains variés.
              </li>
              <li>
                <strong className="font-handwritten text-stone-900">Comment gérez-vous les imprévus ?</strong><br />
                Itinéraires alternatifs, suivi météo, documents prêts, partenaires locaux.
              </li>
              <li>
                <strong className="font-handwritten text-stone-900">Puis-je rejoindre une étape ?</strong><br />
                Oui, selon disponibilité et compatibilité logistique; contactez-nous.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
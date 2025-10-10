import { Target, Link, Info } from 'lucide-react';

export default function SponsorTargets() {
  const targets = [
    {
      category: 'Pneus & Suspensions',
      why: ['Fiabilité sur longue distance', 'Performance en sable/neige/gravier', 'Sécurité'],
      sites: ['https://example.com'],
      openness: 'Ouvert aux marques concurrentes selon compatibilité technique',
    },
    {
      category: 'Treuils & Accessoires de récupération',
      why: [
        'Extraction en terrains difficiles',
        'Robustesse & maintenance',
        'Sécurité de l’équipe',
      ],
      sites: ['https://example.com'],
      openness: 'Ouvert aux solutions équivalentes',
    },
    {
      category: 'Navigation & Cartographie',
      why: ['GPS avancé', 'Cartes hors-ligne', 'Intégration route'],
      sites: ['https://example.com'],
      openness: 'API/SDK bienvenus (Google/Mapbox/alternatives)',
    },
    {
      category: 'Communication & Connectivité',
      why: ['Suivi convoi', 'Upload de contenus (YouTube/Blog)', 'Coordination sécurité'],
      sites: ['https://example.com'],
      openness: 'Solutions satellite/cellulaire acceptées',
    },
    {
      category: 'Énergie & Réfrigération',
      why: ['Autonomie électrique', 'Confort alimentaire', 'Fiabilité en climat extrême'],
      sites: ['https://example.com'],
      openness: 'Ouvert aux gammes équivalentes',
    },
    {
      category: 'Pièces & Outils',
      why: ['Maintenance préventive', 'Réparations terrain', 'Longévité des véhicules'],
      sites: ['https://example.com'],
      openness: 'Multimarques selon disponibilité',
    },
    {
      category: 'Assurance & Sécurité',
      why: ['Evacuation médicale', 'Couverture internationale', 'Confiance partenaires'],
      sites: ['https://example.com'],
      openness: 'Ouvert à toute proposition internationale',
    },
    {
      category: 'Apparel & Boutique',
      why: ['Financement communautaire', 'Visibilité des sponsors', 'Soutien du projet'],
      sites: ['https://example.com'],
      openness: 'Co-branding possible',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Target className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            Cibles Sponsors
          </h2>
          <p className="text-xl text-stone-600 font-serif">
            Partenaires souhaités, raisons et ouverture aux alternatives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {targets.map((t, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all"
            >
              <h3 className="text-2xl font-handwritten text-stone-900 mb-3">{t.category}</h3>
              <div className="flex items-center gap-2 text-stone-600 font-serif mb-3">
                <Info size={18} className="text-amber-600" /> Pourquoi ?
              </div>
              <ul className="space-y-2 font-serif text-stone-700 mb-4">
                {t.why.map((w, idx) => (
                  <li key={idx}>• {w}</li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-stone-600 font-serif mb-2">
                <Link size={18} className="text-amber-600" /> Sites (placeholder)
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {t.sites.map((s, idx) => (
                  <a
                    key={idx}
                    href={s}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline font-serif"
                  >
                    {s}
                  </a>
                ))}
              </div>
              <p className="text-stone-600 font-serif mb-4">
                <strong>Ouverture:</strong> {t.openness}
              </p>
              <a
                href="mailto:sponsors@transcontinentaltrek.com"
                className="inline-block bg-stone-900 hover:bg-stone-800 text-amber-50 font-serif px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl focus-ring"
              >
                Proposer un partenariat
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Users, Compass, Wrench, MapPinned } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function Team() {
  const { t } = useI18n();

  const members = [
    {
      name: 'Alex',
      role: t('team.role.lead'),
      bio: 'Passionné d’overlanding, Alex planifie cette aventure depuis 5 ans et excelle en logistique.',
      icon: Compass,
    },
    {
      name: 'Marie',
      role: t('team.role.nav'),
      bio: 'Experte en GPS et moteurs Cummins, Marie a traversé l’Asie en 4x4.',
      icon: MapPinned,
    },
    {
      name: 'Sam',
      role: t('team.role.mech'),
      bio: 'Conducteur aguerri, Sam capture l’épopée pour YouTube et les sponsors.',
      icon: Wrench,
    },
    {
      name: 'Logistique',
      role: t('team.role.log'),
      bio: 'Budget, ferrys, assurances — coordination et intendance du convoi.',
      icon: Users,
    },
  ];

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-24 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Users className="text-amber-600 mx-auto" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            {t('team.heading')}
          </h2>
          <p className="text-xl text-stone-600 font-serif">{t('team.tagline')}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <m.icon className="text-amber-600" size={24} />
                <h3 className="text-2xl font-handwritten text-stone-900">{m.name}</h3>
              </div>
              <p className="text-stone-700 font-serif">{m.role}</p>
              <p className="text-stone-600 font-serif mt-2">{m.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button type="button" className="bg-stone-900 hover:bg-stone-800 text-amber-50 font-serif px-10 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-xl focus-ring">
            {t('team.join')}
          </button>
        </div>
      </div>
    </section>
  );
}
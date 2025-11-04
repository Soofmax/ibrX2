import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import JerricanVisualization from '../components/donation/JerricanVisualization';
import { useI18n } from '../i18n/useI18n';
import SEO from '../components/SEO';
import { AlertTriangle, Star } from 'lucide-react';

type Jerry = {
  id: string;
  name: string;
  target: number;
  current: number;
};

const LS_KEY = 'wg_jerricans_v1';

function loadJerricansFromLocalStorage(defaults: Jerry[]): Jerry[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Jerry[];
    // Validate shape minimally
    if (!Array.isArray(parsed)) return defaults;
    return parsed.map((j, i) => ({
      id: j.id || defaults[i]?.id || `j${i + 1}`,
      name: j.name || defaults[i]?.name || `Véhicule ${i + 1}`,
      target: typeof j.target === 'number' ? j.target : defaults[i]?.target || 50,
      current: typeof j.current === 'number' ? j.current : defaults[i]?.current || 0,
    }));
  } catch {
    return defaults;
  }
}

function saveJerricansToLocalStorage(data: Jerry[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function percent(j: Jerry) {
  return Math.min(100, Math.floor((j.current / Math.max(1, j.target)) * 100));
}

export default function DonationsPage() {
  const { t, lang } = useI18n();
  const defaults: Jerry[] = useMemo(
    () => [
      { id: 'veh1', name: lang === 'fr' ? 'Véhicule 1' : 'Vehicle 1', target: 50, current: 35 },
      { id: 'veh2', name: lang === 'fr' ? 'Véhicule 2' : 'Vehicle 2', target: 80, current: 15 },
      { id: 'veh3', name: lang === 'fr' ? 'Véhicule 3' : 'Vehicle 3', target: 100, current: 64 },
    ],
    [lang]
  );
  const [jerricans, setJerricans] = useState<Jerry[]>(() =>
    loadJerricansFromLocalStorage(defaults)
  );
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedJerryId, setSelectedJerryId] = useState<string>(() => {
    const js = loadJerricansFromLocalStorage(defaults);
    const least = [...js].sort((a, b) => percent(a) - percent(b))[0];
    return least.id;
  });
  const [showThanks, setShowThanks] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    saveJerricansToLocalStorage(jerricans);
  }, [jerricans]);

  useEffect(() => {
    // When language changes, sync names but keep amounts
    setJerricans((prev) =>
      prev.map((j) => {
        const def = defaults.find((d) => d.id === j.id);
        return { ...j, name: def?.name || j.name };
      })
    );
  }, [defaults]);

  const totalTarget = jerricans.reduce((sum, j) => sum + j.target, 0);
  const totalCurrent = jerricans.reduce((sum, j) => sum + j.current, 0);
  const totalPercent = Math.min(100, Math.floor((totalCurrent / Math.max(1, totalTarget)) * 100));

  const amountToUse = selectedAmount ?? (customAmount ? Math.max(0, Number(customAmount)) : 0);

  const setPresetAmount = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const onCustomAmount = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleDonation = (via: 'paypal' | 'stripe') => {
    const amt = amountToUse;
    if (!amt || amt <= 0) return;
    setJerricans((prev) => {
      const next = prev.map((j) =>
        j.id === selectedJerryId ? { ...j, current: j.current + amt } : j
      );
      return next;
    });
    const selectedJerry = jerricans.find((j) => j.id === selectedJerryId);
    const newVal = (selectedJerry?.current || 0) + amt;
    const willComplete = selectedJerry
      ? newVal >= selectedJerry.target && percent(selectedJerry) < 100
      : false;

    // Show thanks overlay
    setShowThanks(
      lang === 'fr'
        ? `Merci infiniment ! Grâce à vous, le financement de ${selectedJerry?.name} avance${willComplete ? ' et atteint son objectif 🎉' : ' !'}`
        : `Thank you! Your support advances funding for ${selectedJerry?.name}${willComplete ? ' and reaches its goal 🎉' : '!'}`
    );
    setTimeout(() => setShowThanks(null), 2800);

    // Confetti celebration
    if (willComplete) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1600);
    }
  };

  const resetAll = () => {
    saveJerricansToLocalStorage(defaults);
    setJerricans(loadJerricansFromLocalStorage(defaults));
  };

  useEffect(() => {
    // Default select least filled on mount and whenever jerricans change significantly
    const least = [...jerricans].sort((a, b) => percent(a) - percent(b))[0];
    if (least && least.id !== selectedJerryId) {
      setSelectedJerryId(least.id);
    }
  }, [jerricans, selectedJerryId]);

  return (
    <section id="donations" className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-10 text-white">
      <SEO
        title={
          lang === 'fr'
            ? 'Soutenir l’expédition — WanderGlobers'
            : 'Support the Expedition — WanderGlobers'
        }
        description={
          lang === 'fr'
            ? 'Chaque kilomètre compte — visualisez la progression des objectifs via des jerricans animés.'
            : 'Every kilometer counts — visualize goal progress via animated jerrycans.'
        }
        path="/donations"
      />

      {/* Simulation banner */}
      <div className="simulation-banner">
        <AlertTriangle />{' '}
        {lang === 'fr'
          ? 'Mode Simulation : les paiements ne sont pas réels pour le moment.'
          : 'Simulation Mode: payments are not real for now.'}
        <button type="button" className="ml-4 underline" onClick={resetAll}>
          {lang === 'fr' ? 'Reset' : 'Reset'}
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 text-green-400">
          <Star /> <Star /> <Star />
        </div>
        <h1 className="font-handwritten text-4xl md:text-[3.5rem] mt-2">
          {lang === 'fr'
            ? 'Soutenez l’expédition, chaque kilomètre compte !'
            : 'Support the expedition, every kilometer counts!'}
        </h1>
        <p className="font-serif text-base md:text-lg text-white/90 leading-relaxed mt-3 mx-auto max-w-[600px]">
          {lang === 'fr'
            ? 'Vos dons financent le carburant, l’entretien des véhicules et les visas nécessaires pour traverser les 5 continents.'
            : 'Your donations fund fuel, vehicle maintenance, and visas needed to cross 5 continents.'}
        </p>
      </div>

      {/* Global progress bar */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${totalPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <div className="progress-text">{totalPercent}%</div>
        </div>
        <div className="mt-2 text-center font-serif">
          {lang === 'fr'
            ? `${Math.floor(totalCurrent)}€ collectés sur ${Math.floor(totalTarget)}€ objectif`
            : `${Math.floor(totalCurrent)}€ raised of ${Math.floor(totalTarget)}€ goal`}
        </div>
      </div>

      {/* Jerricans grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center mb-12">
        {jerricans.map((j, idx) => {
          const isCompleted = percent(j) >= 100;
          return (
            <motion.div
              key={j.id}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <JerricanVisualization
                targetAmount={j.target}
                currentAmount={j.current}
                label={j.name}
                isCompleted={isCompleted}
                delay={idx * 0.2}
                ariaLabel={
                  lang === 'fr'
                    ? `Financement ${j.name}, objectif ${j.target} euros, actuellement ${j.current} euros collectés, ${percent(j)} pourcent complété`
                    : `Funding ${j.name}, goal ${j.target} euros, currently ${j.current} euros raised, ${percent(j)} percent complete`
                }
              />
            </motion.div>
          );
        })}
      </div>

      {/* Selection card */}
      <div className="max-w-4xl mx-auto donation-card">
        {/* Amount presets */}
        <div className="grid grid-cols-4 gap-3">
          {[1, 5, 10, 25].map((a) => (
            <motion.button
              key={a}
              type="button"
              aria-pressed={selectedAmount === a}
              onClick={() => setPresetAmount(a)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`pill ${selectedAmount === a ? 'selected' : ''}`}
            >
              {a}€
            </motion.button>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="number"
            min={1}
            placeholder={lang === 'fr' ? 'Montant personnalisé €' : 'Custom amount €'}
            value={customAmount}
            onChange={(e) => onCustomAmount(e.target.value)}
            className="w-full rounded-2xl px-4 py-3 bg-white text-stone-900 font-serif"
          />
        </div>

        {/* Jerry selection */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {jerricans.map((j) => (
            <div key={j.id} className="relative">
              <motion.button
                type="button"
                aria-pressed={selectedJerryId === j.id}
                onClick={() => setSelectedJerryId(j.id)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`pill w-full ${selectedJerryId === j.id ? 'selected' : ''}`}
                title={
                  lang === 'fr'
                    ? 'Carburant, entretien, visas — votre don fait avancer le véhicule.'
                    : 'Fuel, maintenance, visas — your donation advances the vehicle.'
                }
              >
                <div className="flex flex-col items-center">
                  <span>{j.name}</span>
                  <span className="text-xs opacity-80">{percent(j)}%</span>
                </div>
              </motion.button>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl py-4 text-lg font-serif focus-ring"
            onClick={() => handleDonation('paypal')}
          >
            {lang === 'fr' ? 'Donner via PayPal' : 'Donate via PayPal'} ({amountToUse || 0}€)
          </button>
          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl py-4 text-lg font-serif focus-ring"
            onClick={() => handleDonation('stripe')}
          >
            {lang === 'fr' ? 'Donner via Stripe' : 'Donate via Stripe'} ({amountToUse || 0}€)
          </button>
        </div>
      </div>

      {/* Impact cards */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { amt: 5, title: lang === 'fr' ? '50 km de carburant' : '50 km of fuel', icon: '⛽' },
          { amt: 10, title: lang === 'fr' ? "1 repas pour l'équipe" : '1 team meal', icon: '🍲' },
          {
            amt: 25,
            title: lang === 'fr' ? 'Entretien significatif' : 'Significant maintenance',
            icon: '🛠️',
          },
        ].map((c, i) => (
          <div key={i} className="bg-white/90 rounded-2xl p-6 shadow-md text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl">
              {c.icon}
            </div>
            <h3 className="font-handwritten text-stone-900 mt-3">
              {lang === 'fr' ? `${c.amt}€` : `${c.amt}€`}
            </h3>
            <p className="font-serif text-stone-700">{c.title}</p>
          </div>
        ))}
      </div>

      {/* Thanks modal */}
      {showThanks && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md text-center">
            <div className="text-green-600 text-3xl">❤</div>
            <div className="mt-2 font-serif text-stone-900">{showThanks}</div>
          </div>
        </div>
      )}

      {/* Confetti overlay */}
      {showConfetti && (
        <div className="confetti">
          {Array.from({ length: 40 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.2;
            const color = ['#16a34a', '#22c55e', '#7FE5B5', '#FFD700', '#FFA500'][i % 5];
            const style = {
              left: `${left}%`,
              top: `-10px`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
            } as React.CSSProperties;
            return <span key={i} className="confetti-piece" style={style} />;
          })}
        </div>
      )}
    </section>
  );
}

import { motion } from 'framer-motion';

type Props = {
  lang: 'fr' | 'en';
  selectedAmount: number | null;
  customAmount: string;
  onPreset: (val: number) => void;
  onCustomChange: (val: string) => void;
};

export default function AmountSelector({
  lang,
  selectedAmount,
  customAmount,
  onPreset,
  onCustomChange,
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {[1, 5, 10, 25].map((a) => (
          <motion.button
            key={a}
            type="button"
            aria-pressed={selectedAmount === a}
            onClick={() => onPreset(a)}
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
          onChange={(e) => onCustomChange(e.target.value)}
          className="w-full rounded-2xl px-4 py-3 bg-white text-stone-900 font-serif"
        />
      </div>
    </div>
  );
}

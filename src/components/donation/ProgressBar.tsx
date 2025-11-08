import { motion } from 'framer-motion';

type Props = {
  percent: number;
  label: string;
};

export default function ProgressBar({ percent, label }: Props) {
  return (
    <div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="progress-text">{percent}%</div>
      </div>
      <div className="mt-2 text-center font-serif">{label}</div>
    </div>
  );
}
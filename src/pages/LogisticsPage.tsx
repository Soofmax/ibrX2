import { useState } from 'react';
import { useI18n } from '../i18n/useI18n';
import { ShieldAlert, FileCheck2 } from 'lucide-react';
import Logistics from '../components/Logistics';
import PracticalInfo from '../components/PracticalInfo';

export default function LogisticsPage() {
  const { t } = useI18n();
  const [tab, setTab] = useState<'logistics' | 'practical'>('logistics');

  return (
    <div className="space-y-12">
      {/* Page heading and tabs */}
      <section className="px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center mb-6">
          <h1 className="text-5xl sm:text-6xl font-handwritten text-stone-900 mb-4">
            {t('logistics.h1')}
          </h1>
          <div
            role="tablist"
            aria-label="Logistics tabs"
            className="inline-flex items-center gap-2 bg-white/80 border border-stone-200 rounded-full p-1 shadow-lg"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'logistics'}
              onClick={() => setTab('logistics')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-serif transition-all focus-ring ${
                tab === 'logistics'
                  ? 'bg-amber-600 border border-amber-600 text-white shadow-md'
                  : 'bg-white/0 border border-amber-500/30 text-amber-700 hover:bg-white/20'
              }`}
            >
              <ShieldAlert size={18} className="text-amber-600" />
              {t('nav.logistics')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'practical'}
              onClick={() => setTab('practical')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-serif transition-all focus-ring ${
                tab === 'practical'
                  ? 'bg-amber-600 border border-amber-600 text-white shadow-md'
                  : 'bg-white/0 border border-amber-500/30 text-amber-700 hover:bg-white/20'
              }`}
            >
              <FileCheck2 size={18} className="text-amber-600" />
              {t('nav.practical')}
            </button>
          </div>
        </div>
      </section>

      {/* Tab content */}
      {tab === 'logistics' ? <Logistics /> : <PracticalInfo />}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-amber-50">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl sm:text-7xl font-handwritten text-stone-900 mb-4">404</h1>
        <h2 className="text-3xl font-handwritten text-stone-900 mb-3">{t('notfound.title')}</h2>
        <p className="text-stone-600 font-serif mb-8">{t('notfound.text')}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-stone-900 hover:bg-stone-800 text-amber-50 font-serif px-10 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-xl focus-ring"
        >
          {t('notfound.back')}
        </button>
      </div>
    </section>
  );
}
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

export default function NewsletterSection() {
  const { t } = useI18n();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet; keep interaction light
  };

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <h3 id="newsletter-title" className="newsletter-title">
        {t('footer.dontMiss')}
      </h3>
      <p className="newsletter-description">{t('footer.newsletterIntro')}</p>
      <form className="newsletter-form" onSubmit={onSubmit}>
        <input
          type="email"
          className="newsletter-input"
          placeholder={t('footer.emailPlaceholder')}
          aria-label={t('footer.emailPlaceholder')}
          required
        />
        <button type="submit" className="newsletter-button">
          <span>{t('footer.subscribe')}</span>
          <ArrowRight className="arrow" size={18} />
        </button>
      </form>
    </section>
  );
}

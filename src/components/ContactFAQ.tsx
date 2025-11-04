import { Handshake } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { useMemo, useState } from 'react';

type FaqItem = { q: string; a: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lightweight analytics helper that works with Plausible, Umami or Google Analytics if present
function trackEvent(name: string, props?: Record<string, unknown>) {
  const w = window as unknown as {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    umami?: { track?: (event: string, params?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
  };
  if (w.plausible) w.plausible(name, props ? { props } : undefined);
  if (w.umami?.track) w.umami.track(name, props);
  if (w.gtag) w.gtag('event', name, props || {});
}

export default function ContactFAQ() {
  const { t } = useI18n();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const maxChars = 500;
  const remaining = Math.max(0, maxChars - message.length);
  const emailValid = EMAIL_RE.test(email);
  const nameValid = name.trim().length > 0;
  const messageValid = message.trim().length >= 20;

  const faq: FaqItem[] = useMemo(
    () => [
      { q: t('contact.q1'), a: t('contact.a1') },
      { q: t('contact.q2'), a: t('contact.a2') },
      { q: t('contact.q3'), a: t('contact.a3') },
      { q: 'Quel permis pour conduire ?', a: 'Permis C (PTAC > 7,5 t) et PCI pour l’international.' },
      { q: 'Comment suivre l’expédition ?', a: 'Via notre blog, X (#TranscontinentalTrek) et YouTube.' },
      { q: 'Comment soutenir ?', a: 'Dons via Patreon/PayPal ou sponsoring — contactez-nous.' },
    ],
    [t]
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('contact_submit_attempt', { valid: nameValid && emailValid && messageValid });
    if (!nameValid || !emailValid || !messageValid) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setOk(true);
    setName('');
    setEmail('');
    setMessage('');
    trackEvent('contact_submit_success', { source: 'contact_page' });
  };

  return (
    <section id="contact" className="scroll-mt-24">
      {/* Contact hero */}
      <div className="contact-hero">
        <div className="contact-icon" aria-hidden="true">
          {/* SVG enveloppe avec flap animé au hover */}
          <svg viewBox="0 0 100 100" role="img" aria-label="Contact">
            <rect x="15" y="30" width="70" height="40" rx="8" fill="#FFA500" />
            <polygon className="envelope-flap" points="15,30 50,55 85,30" fill="#FFD700" />
            <polyline points="15,70 50,45 85,70" fill="none" stroke="#d97706" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="contact-title">{t('contact.heading')}</h1>
        <p className="contact-subtitle">{t('contact.tagline')}</p>
      </div>

      {/* Contact form premium */}
      <div className="contact-form-section">
        <h2 className="form-title">{t('contact.form')}</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              {t('contact.name')}
            </label>
            <input
              id="name"
              className={`form-input ${nameValid ? 'valid' : ''}`}
              placeholder={t('contact.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameValid && <span className="valid-icon">✓</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              {t('contact.email')}
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${email.length ? (emailValid ? 'valid' : 'invalid') : ''}`}
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailValid && <span className="valid-icon">✓</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              className={`form-textarea ${message.length ? (messageValid ? 'valid' : 'invalid') : ''}`}
              placeholder={t('contact.message')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              maxLength={maxChars}
              required
            />
            <div className="char-counter" aria-live="polite">
              {remaining} caractères restants
            </div>
          </div>

          <button
            type="submit"
            className={`form-submit ${loading ? 'loading' : ''}`}
            disabled={loading || !nameValid || !emailValid || !messageValid}
          >
            {loading ? 'Envoi en cours' : t('contact.send')}
          </button>

          <div className={`form-success ${ok ? 'show' : ''}`}>
            Message envoyé. Nous vous répondrons rapidement.
          </div>
        </form>
      </div>

      {/* CTA sponsors/partenaires */}
      <div className="contact-cta">
        <div className="contact-cta-content">
          <h3 className="contact-cta-title">Vous souhaitez nous soutenir ?</h3>
          <p className="contact-cta-text">
            Dons via Patreon/PayPal, sponsoring, partenariats — ensemble, rendons cette aventure
            possible !
          </p>
          <div className="contact-cta-buttons">
            <a
              href="/support"
              className="cta-button cta-button-primary"
              onClick={() => trackEvent('contact_cta_donate')}
            >
              <span>Faire un don</span>
              <Handshake />
            </a>
            <a
              href="/sponsor-targets"
              className="cta-button cta-button-secondary"
              onClick={() => trackEvent('contact_cta_sponsor')}
            >
              <span>Devenir sponsor</span>
              <Handshake />
            </a>
          </div>
        </div>
      </div>

      {/* FAQ interactive */}
      <div className="faq-section">
        <div className="faq-header">
          <div className="faq-icon" aria-hidden="true">
            ?
          </div>
          <h3 className="faq-title">{t('contact.faq')}</h3>
          <p className="faq-subtitle">Questions fréquentes — réponses claires et directes</p>
        </div>

        <div>
          {faq.map((item, idx) => {
            const active = activeFaq === idx;
            return (
              <div className={`faq-item ${active ? 'active' : ''}`} key={idx}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={active}
                  onClick={() => {
                    setActiveFaq(active ? null : idx);
                    trackEvent('faq_toggle', { index: idx + 1, question: item.q });
                  }}
                >
                  <span className="faq-number">{idx + 1}</span>
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </button>
                <div className="faq-answer" aria-hidden={!active}>
                  <div className="faq-answer-content">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

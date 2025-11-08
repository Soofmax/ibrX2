import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/useI18n';

export default function ConsentBanner() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem('wg_consent_analytics') : null;
      setVisible(stored === null); // show only if no decision yet
    } catch {
      // if localStorage not available, don't show
      setVisible(false);
    }
  }, []);

  function accept() {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wg_consent_analytics', 'true');
      }
    } catch {}
    setVisible(false);
  }

  function decline() {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('wg_consent_analytics', 'false');
      }
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  const text =
    lang === 'fr'
      ? "Nous utilisons des cookies pour mesurer l'audience (Plausible/Umami/GA). Acceptez-vous le dépôt de cookies à des fins d'analyse ?"
      : 'We use cookies for analytics (Plausible/Umami/GA). Do you consent to analytics cookies?';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-4xl m-4 rounded-lg border border-amber-700 bg-white/90 backdrop-blur p-4 shadow-lg">
        <p className="text-sm mb-3">{text}</p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors text-sm"
          >
            {lang === 'fr' ? 'Accepter' : 'Accept'}
          </button>
          <button
            onClick={decline}
            className="px-3 py-2 rounded border border-amber-600 text-amber-700 bg-white hover:bg-amber-50 transition-colors text-sm"
          >
            {lang === 'fr' ? 'Refuser' : 'Decline'}
          </button>
        </div>
      </div>
    </div>
  );
}
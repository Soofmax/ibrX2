import { useMemo, useState, useEffect, ReactNode } from 'react';
import { I18nContext, type I18nContextValue, type Lang } from './useI18n';
import { fr, en } from './dict';
import { checkI18nConsistency } from './check';

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
      if (saved === 'fr' || saved === 'en') return saved;
      const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
      return nav.startsWith('en') ? 'en' : 'fr';
    } catch {
      return 'fr';
    }
  });

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lang', lang);
      }
    } catch {
      // no-op
    }
  }, [lang]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      checkI18nConsistency(fr as Record<string, string>, en as Record<string, string>);
    }
  }, []);

  const dict = lang === 'fr' ? fr : en;

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => dict[key] ?? key,
    }),
    [lang, dict]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
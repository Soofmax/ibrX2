import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import I18nProvider from './i18n/context';

// Preconnect hints for performance (fonts + hero images host)
(function addPreconnects() {
  if (typeof document === 'undefined') return;
  const ensure = (href: string, crossOrigin?: string) => {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  };
  ensure('https://fonts.googleapis.com');
  ensure('https://fonts.gstatic.com', 'anonymous');
  ensure('https://images.pexels.com');
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>
);

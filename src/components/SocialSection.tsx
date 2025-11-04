import { Camera, Youtube, Instagram, Images } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { useEffect, useRef } from 'react';

export default function SocialSection() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const icons = Array.from(container.querySelectorAll('.social-icon'));
    icons.forEach((el, idx) => {
      setTimeout(() => el.classList.add('active'), 100 + idx * 120);
    });
  }, []);

  return (
    <section className="social-section">
      <h3 className="social-title">{t('header.siteName')}</h3>
      <p className="social-tagline">{t('footer.aboutText')}</p>
      <div className="social-icons" ref={containerRef} aria-label="Social links">
        <a href="#" className="social-icon" aria-label="YouTube">
          <Youtube size={28} />
        </a>
        <a href="#" className="social-icon" aria-label="Instagram">
          <Instagram size={26} />
        </a>
        <a href="#" className="social-icon" aria-label="Gallery">
          <Images size={26} />
        </a>
        <a href="#" className="social-icon" aria-label="Camera">
          <Camera size={26} />
        </a>
      </div>
    </section>
  );
}

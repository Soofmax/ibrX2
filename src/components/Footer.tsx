import { Youtube, Instagram, Facebook, Mail, Send, Compass, Camera } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';

export default function Footer() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Newsletter subscription coming soon!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Compass className="text-amber-400" size={36} />
              <h3 className="text-3xl font-handwritten text-amber-400">{t('header.siteName')}</h3>
            </div>
            <p className="text-white/80 font-serif leading-relaxed mb-6">{t('footer.aboutText')}</p>
            <div className="flex gap-3">
              <a
                href="https://youtube.com/@TranscontinentalTrek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-stone-700 hover:bg-red-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg focus-ring"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://instagram.com/transcontinentaltrek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-stone-700 hover:bg-pink-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg focus-ring"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com/TranscontinentalTrek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-stone-700 hover:bg-blue-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg focus-ring"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://snapchat.com/add/transcontinentaltrek"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                className="bg-stone-700 hover:bg-green-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg focus-ring"
              >
                <Camera size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-handwritten mb-6 text-amber-400">{t('footer.quick')}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-white/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform focus-ring"
                >
                  {t('footer.about')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="text-white/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform focus-ring"
                >
                  {t('footer.tips')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="text-white/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform focus-ring"
                >
                  {t('footer.gallery')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="text-white/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform focus-ring"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-handwritten mb-4 text-amber-400">
              {t('footer.dontMiss')}
            </h3>
            <p className="text-white/80 font-serif mb-4 text-sm leading-relaxed">
              {t('footer.newsletterIntro')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-stone-900 font-serif focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-6 py-4 rounded-full font-serif transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 focus-ring"
              >
                <span>{t('footer.subscribe')}</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="footer-copyright font-serif text-white/70 text-center md:text-left">
              {t('footer.copyright')}
            </p>
            <nav className="footer-links" aria-label="Legal links">
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="footer-link font-serif focus-ring"
              >
                {t('footer.privacy')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/terms')}
                className="footer-link font-serif focus-ring"
              >
                {t('footer.terms')}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Youtube, Instagram, Facebook, Mail, Send, Compass } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Newsletter subscription coming soon!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-stone-800 to-stone-900 text-amber-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Compass className="text-amber-400" size={36} />
              <h3 className="text-3xl font-handwritten text-amber-400">World Tour</h3>
            </div>
            <p className="text-amber-100/80 font-serif leading-relaxed mb-6">
              Following the wind, collecting stories, and sharing adventures from every corner of the globe.
            </p>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-700 hover:bg-red-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-700 hover:bg-pink-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-700 hover:bg-blue-600 p-3 rounded-full transition-all hover:scale-110 hover:rotate-6 shadow-lg"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-handwritten mb-6 text-amber-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-amber-100/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform">
                  About Me
                </button>
              </li>
              <li>
                <button className="text-amber-100/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform">
                  Travel Tips
                </button>
              </li>
              <li>
                <button className="text-amber-100/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button className="text-amber-100/80 hover:text-amber-400 transition-colors font-serif hover:translate-x-2 inline-block transition-transform">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-handwritten mb-4 text-amber-400">Don't miss any step!</h3>
            <p className="text-amber-100/80 font-serif mb-4 text-sm leading-relaxed">
              Get weekly updates with new stories, travel tips, and exclusive content delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-full text-stone-900 font-serif focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-6 py-4 rounded-full font-serif transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Subscribe Now</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-serif text-amber-100/70 text-center md:text-left">
              © 2025 Your Name. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-amber-100/70 hover:text-amber-400 transition-colors font-serif">
                Privacy Policy
              </button>
              <button className="text-amber-100/70 hover:text-amber-400 transition-colors font-serif">
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

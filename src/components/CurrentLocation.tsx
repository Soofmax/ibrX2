import { MapPin, Navigation, Calendar } from 'lucide-react';

export default function CurrentLocation() {
  return (
    <section id="map" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Navigation className="text-amber-600 mx-auto animate-pulse" size={48} />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-handwritten text-stone-900 mb-4">
            Où suis-je maintenant ?
          </h2>
          <p className="text-xl text-stone-600 font-serif">Suivre le vent, une destination à la fois</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 transform hover:scale-[1.01] transition-transform duration-500">
          <div className="relative aspect-video bg-gradient-to-br from-stone-200 to-amber-100 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f4" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <path id="routePath" d="M 120,280 Q 200,220 300,240 T 500,250 Q 650,260 750,240 T 880,250" />
                <g id="vanIcon">
                  <rect x="-15" y="-10" width="30" height="18" rx="3" fill="#1C1917" />
                  <rect x="5" y="-8" width="14" height="12" rx="2" fill="#F59E0B" />
                  <circle cx="-8" cy="10" r="4" fill="#0f172a" />
                  <circle cx="8" cy="10" r="4" fill="#0f172a" />
                </g>
              </defs>

              <rect width="1000" height="500" fill="url(#mapGradient)"/>

              <path
                d="M 120,280 Q 200,220 300,240 T 500,250 Q 650,260 750,240 T 880,250"
                stroke="#d97706"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,8"
                opacity="0.7"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="36"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              <g>
                <use href="#vanIcon">
                  <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#routePath" />
                  </animateMotion>
                </use>
              </g>

              <circle cx="120" cy="280" r="10" fill="#78350f" opacity="0.5">
                <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="240" r="10" fill="#78350f" opacity="0.5">
                <animate attributeName="r" values="10;12;10" dur="2s" begin="0.3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="500" cy="250" r="10" fill="#78350f" opacity="0.5">
                <animate attributeName="r" values="10;12;10" dur="2s" begin="0.6s" repeatCount="indefinite"/>
              </circle>
              <circle cx="750" cy="240" r="10" fill="#78350f" opacity="0.5">
                <animate attributeName="r" values="10;12;10" dur="2s" begin="0.9s" repeatCount="indefinite"/>
              </circle>

              <g transform="translate(880, 250)" filter="url(#glow)">
                <circle r="20" fill="#dc2626" opacity="0.3">
                  <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle r="15" fill="#b45309"/>
                <path
                  d="M 0,-30 L -10,-10 L 0,-5 L 10,-10 Z"
                  fill="#dc2626"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </g>

              <text x="500" y="380" fontSize="24" fill="#78350f" textAnchor="middle" fontFamily="serif" fontStyle="italic">
                Carte de l’itinéraire (animation de van)
              </text>
              <text x="500" y="410" fontSize="16" fill="#a8a29e" textAnchor="middle" fontFamily="serif">
                Suivi en direct à venir
              </text>
            </svg>
          </div>

          <div className="p-8 bg-gradient-to-br from-white to-amber-50/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="text-green-600" size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 font-serif mb-1">Dernière étape</p>
                    <h3 className="text-2xl font-handwritten text-stone-900 mb-1">Paris, France</h3>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar size={14} />
                      <span className="font-serif">21 mars 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-200 p-3 rounded-full">
                    <Navigation className="text-amber-700" size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-amber-700 font-serif mb-1">Prochaine destination</p>
                    <h3 className="text-2xl font-handwritten text-stone-900 mb-1">Barcelone, Espagne</h3>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar size={14} />
                      <span className="font-serif">28 mars 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

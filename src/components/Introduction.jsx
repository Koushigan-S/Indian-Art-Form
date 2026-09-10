import React from 'react';
import { Clock, MapPin, Compass, Sparkles } from 'lucide-react';

export default function Introduction() {
  const principles = [
    {
      code: "01",
      title: "TIME",
      subtitle: "Millennia of Continuous Evolution",
      description: "From Harappan lost-wax metallurgy in 2500 BCE to contemporary living folk practices, Indian art never froze into a fossilized canon. It absorbed, adapted, and synthesized with each era.",
      icon: Clock,
      accent: "#C1522E"
    },
    {
      code: "02",
      title: "PLACE",
      subtitle: "The Soil of Regional Identity",
      description: "The basalt cliffs of Maharashtra, the granite riverbanks of Thanjavur, the fertile plains of Mithila, and the desert courts of Rajasthan all gave birth to radically distinct visual idioms.",
      icon: MapPin,
      accent: "#C59E4E"
    },
    {
      code: "03",
      title: "TRADITION",
      subtitle: "Living Heritage & Shared Memory",
      description: "Art was not confined to museum pedestals; it breathed through wedding chambers, harvest dances, temple rituals, and sacred manuscripts—passed through communal hands over centuries.",
      icon: Compass,
      accent: "#1D253A"
    }
  ];

  return (
    <section id="introduction" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
      {/* Editorial Chapter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] font-cinzel text-terracotta block mb-3">
            02 • Curatorial Essay
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-rich max-w-3xl leading-[1.15]">
            India never had a <span className="italic font-normal text-terracotta">single visual language</span>.
          </h2>
        </div>
        <div className="md:max-w-md">
          <p className="font-sans text-sm text-ink-muted leading-relaxed">
            Instead, it flourished as a polyphonic conversation across civilizations, dynasties, sacred philosophies, court ateliers, tribal forests, and everyday domestic spaces.
          </p>
        </div>
      </div>

      {/* 2500 BCE → TODAY Chronological Journey Bar */}
      <div className="my-16 p-8 rounded-2xl bg-parchment-200/70 border border-gold/30 shadow-inner relative overflow-hidden">
        {/* Subtle background decorative text */}
        <div className="absolute right-4 bottom-1 font-cinzel text-7xl font-bold text-ink-rich/[0.03] select-none pointer-events-none">
          CHRONOS
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-2xl md:text-3xl font-bold text-terracotta">
              2500 BCE
            </span>
            <span className="text-xs uppercase tracking-widest text-ink-faint font-sans block">
              Mohenjo-daro Bronze Age
            </span>
          </div>

          {/* Animated Connecting Line with Pulsing Nodes */}
          <div className="flex-1 w-full flex items-center px-4 relative">
            <div className="h-[2px] w-full bg-gradient-to-r from-terracotta via-gold to-heritage-indigo rounded-full relative">
              <div className="absolute -top-1 left-1/4 w-2.5 h-2.5 rounded-full bg-terracotta border-2 border-parchment animate-pulse" />
              <div className="absolute -top-1 left-1/2 w-2.5 h-2.5 rounded-full bg-gold border-2 border-parchment" />
              <div className="absolute -top-1 left-3/4 w-2.5 h-2.5 rounded-full bg-heritage-indigo border-2 border-parchment" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <span className="font-cinzel text-2xl md:text-3xl font-bold text-heritage-indigo">
                TODAY
              </span>
              <span className="text-xs uppercase tracking-widest text-ink-faint font-sans block">
                Living Traditions
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Key Milestone Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-6 pt-6 border-t border-ink/10 text-center">
          {[
            { era: "Harappan", date: "c. 2500 BCE" },
            { era: "Ajanta Murals", date: "c. 200 BCE" },
            { era: "Chola Bronzes", date: "c. 900 CE" },
            { era: "Mughal Folios", date: "c. 1550 CE" },
            { era: "Mithila Folk", date: "c. 1800 CE" },
            { era: "Warli Tribal", date: "Contemporary" },
          ].map((item, idx) => (
            <div key={idx} className="p-2 rounded bg-parchment-50/60 border border-ink/5">
              <span className="font-cinzel text-xs font-semibold text-ink-rich block">{item.era}</span>
              <span className="text-[10px] text-ink-faint font-sans block mt-0.5">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The Three Guiding Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.code}
              className="p-8 rounded-2xl bg-parchment-50 border border-ink/10 hover:border-gold transition-all duration-300 shadow-sm hover:shadow-museum flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-cinzel text-2xl font-bold text-gold/80 group-hover:text-terracotta transition-colors">
                    {p.code}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-parchment-200 flex items-center justify-center text-ink-soft group-hover:bg-terracotta/10 group-hover:text-terracotta transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-cinzel text-lg font-bold tracking-wider text-ink-rich mb-1">
                  {p.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-terracotta font-sans font-medium mb-4">
                  {p.subtitle}
                </p>
                <p className="text-xs text-ink-muted leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-ink/5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink-faint font-sans">
                <span>Pillar of Analysis</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>CLA-I Core</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

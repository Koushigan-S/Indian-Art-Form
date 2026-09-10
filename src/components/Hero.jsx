import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { playSubtleClick } from '../utils/audio';

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleLetters = ['K', 'A', 'L', 'A'];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 md:px-12 pt-28 pb-12 overflow-hidden bg-linen"
    >
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-80" />

      {/* Parallax Decorative Sacred Geometry (SVG Line Art) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        }}
      >
        {/* Large Decorative Mandala / Architectural Ring */}
        <svg
          viewBox="0 0 800 800"
          className="w-[90vw] max-w-[720px] h-auto opacity-[0.14] stroke-ink-rich animate-spin-very-slow"
          fill="none"
          strokeWidth="1"
        >
          <circle cx="400" cy="400" r="380" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="340" />
          <circle cx="400" cy="400" r="280" strokeDasharray="12 12" />
          <circle cx="400" cy="400" r="220" />
          <circle cx="400" cy="400" r="140" />
          <polygon points="400,60 740,400 400,740 60,400" />
          <polygon points="160,160 640,160 640,640 160,640" strokeDasharray="6 6" />
          {/* Subtle petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path
              key={deg}
              d="M400,400 Q430,280 400,220 Q370,280 400,400"
              transform={`rotate(${deg} 400 400)`}
              strokeWidth="0.8"
            />
          ))}
        </svg>

        {/* Outer Warli & Temple Chevron Accents */}
        <div
          className="absolute w-full max-w-4xl h-full flex justify-between items-center px-8 opacity-20 pointer-events-none hidden md:flex transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${-mouseOffset.x * 0.6}px, ${-mouseOffset.y * 0.6}px, 0)`,
          }}
        >
          {/* Left subtle vertical temple pillar motif */}
          <div className="w-12 h-96 border-l border-r border-dashed border-gold flex flex-col justify-between py-6">
            <span className="text-[10px] font-cinzel text-ink-muted -rotate-90 origin-left">BHARAT</span>
            <span className="text-[9px] font-sans text-terracotta tracking-widest -rotate-90 origin-left">2500 BCE</span>
          </div>

          {/* Right subtle vertical motif */}
          <div className="w-12 h-96 border-l border-r border-dashed border-gold flex flex-col justify-between py-6 items-end">
            <span className="text-[10px] font-cinzel text-ink-muted rotate-90 origin-right">PARAMPARA</span>
            <span className="text-[9px] font-sans text-terracotta tracking-widest rotate-90 origin-right">PRESENT</span>
          </div>
        </div>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-parchment-50/80 backdrop-blur-sm text-ink-muted text-xs tracking-[0.25em] uppercase font-sans mb-2">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>CLA-I Digital Museum Archive</span>
          <span className="text-gold">•</span>
          <span>CO1 & CO2</span>
        </div>
      </div>

      {/* Central Editorial Typographic Monument */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl my-auto py-8">
        {/* Sanskrit Root Title */}
        <div className="text-xs uppercase tracking-[0.4em] font-cinzel text-terracotta mb-3 font-semibold">
          कला • Visual Heritage of the Subcontinent
        </div>

        {/* Letter-by-letter reveal Title */}
        <h1 className="font-cinzel text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-[0.18em] sm:tracking-[0.22em] text-ink-rich flex items-center justify-center drop-shadow-sm leading-none select-none">
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-700 hover:text-terracotta hover:-translate-y-2 cursor-default"
              style={{
                animationDelay: `${index * 150}ms`,
                textShadow: '0 4px 18px rgba(25, 21, 19, 0.06)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div className="mt-6 sm:mt-8 space-y-3">
          <p className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-ink font-normal tracking-wide">
            “A Living Journey Through Indian Art”
          </p>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-ink-muted max-w-lg mx-auto leading-relaxed">
            From ancient bronze to living folk traditions.
          </p>
        </div>

        {/* Editorial Subtext Badge */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs font-sans text-ink-faint tracking-widest uppercase">
          <span>Indus Valley</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>Ajanta</span>
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
          <span>Chola</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>Mughal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
          <span>Folk Traditions</span>
        </div>
      </div>

      {/* Bottom Explore Call to Action */}
      <div className="relative z-10 flex flex-col items-center pb-2">
        <a
          href="#introduction"
          onClick={playSubtleClick}
          data-cursor="ENTER"
          className="group flex flex-col items-center gap-2 text-ink-muted hover:text-terracotta transition-colors focus:outline-none"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-cinzel font-semibold text-ink-faint group-hover:text-terracotta transition-colors">
            Explore The Archive
          </span>
          <div className="w-8 h-8 rounded-full border border-ink/20 group-hover:border-terracotta flex items-center justify-center transition-all duration-300 group-hover:translate-y-1">
            <ArrowDown className="w-4 h-4 text-ink-muted group-hover:text-terracotta" />
          </div>
        </a>
      </div>
    </section>
  );
}

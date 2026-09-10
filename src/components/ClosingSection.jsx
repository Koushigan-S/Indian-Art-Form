import React from 'react';
import { ArrowUp, Sparkles, Award, ExternalLink, Heart } from 'lucide-react';
import { playSubtleClick } from '../utils/audio';

export default function ClosingSection() {
  const scrollToTop = () => {
    playSubtleClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="closing" className="relative pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/15 text-ink overflow-hidden">
      {/* Editorial Monumental Statement */}
      <div className="max-w-4xl mx-auto text-center space-y-8 mb-24">
        <span className="text-[11px] uppercase tracking-[0.35em] font-cinzel text-terracotta font-semibold block">
          08 • Curatorial Conclusion
        </span>

        <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-normal text-ink-rich leading-[1.1]">
          “Art does not stay in the past.”
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 font-cinzel text-xl sm:text-2xl tracking-[0.15em] text-terracotta font-bold">
          <span>IT TRAVELS.</span>
          <span className="hidden sm:inline text-gold">•</span>
          <span>IT TRANSFORMS.</span>
          <span className="hidden sm:inline text-gold">•</span>
          <span>IT SURVIVES.</span>
        </div>

        <p className="font-cormorant italic text-2xl sm:text-3xl text-ink-muted max-w-2xl mx-auto leading-relaxed pt-4">
          “Indian art is not a single style. It is a conversation across time.”
        </p>
      </div>

      {/* Museum Credits & Academic Submission Badge Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-parchment-200/70 border border-gold/40 shadow-museum grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-terracotta tracking-widest uppercase">
            <Award className="w-4 h-4" />
            <span>CLA-I Art History Digital Submission</span>
          </div>

          <h3 className="font-cinzel text-3xl font-extrabold tracking-wider text-ink-rich">
            KALA
          </h3>

          <p className="font-sans text-xs text-ink-muted leading-relaxed max-w-xl">
            A comprehensive digital exhibition created for the CLA-I Indian Art History assignment. Unifying Course Outcome 1 (Interactive Timeline & Map Cartography) and Course Outcome 2 (Regional Painting Fusion: Warli × Kalamkari) into one award-winning digital editorial museum experience.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-sans text-ink-faint">
            <span className="px-2.5 py-1 rounded bg-parchment-50 border border-ink/10">CO1: Interactive Timeline</span>
            <span className="px-2.5 py-1 rounded bg-parchment-50 border border-ink/10">CO1: Interactive Map</span>
            <span className="px-2.5 py-1 rounded bg-parchment-50 border border-ink/10">CO2: Regional Fusion</span>
            <span className="px-2.5 py-1 rounded bg-parchment-50 border border-ink/10">Behance Case Study</span>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center space-y-4">
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="group flex items-center gap-2 px-5 py-3 rounded-full bg-ink-rich text-parchment-50 font-cinzel text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors shadow-md"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Minimal Copyright Bar */}
      <div className="pt-8 border-t border-ink/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-ink-faint text-center md:text-left">
        <div className="flex items-center gap-2">
          <span>KALA Archive</span>
          <span>•</span>
          <span>Living Journey Through Indian Art</span>
        </div>
        <div className="flex items-center gap-2 font-cinzel font-semibold text-ink-rich tracking-wider text-[11px] sm:text-xs">
          <span className="text-terracotta">Koushigan Srinivasan</span>
          <span className="text-gold">•</span>
          <span>RA2411003012117</span>
        </div>
        <div>
          <span>Preserving Cultural Memory • 2500 BCE to Present</span>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { fusionData } from '../data/fusionData';
import { playSubtleClick } from '../utils/audio';
import { Sparkles, Info, ZoomIn, Layers, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function FusionSection() {
  const [activeHotspot, setActiveHotspot] = useState(fusionData.hotspots[0]);
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'warli' | 'kalamkari'

  return (
    <section id="fusion" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10 bg-parchment-100/40">
      {/* Editorial Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-cinzel text-terracotta mb-3 font-semibold">
          <span>06 • Activity Three (CO2)</span>
          <span className="text-gold">•</span>
          <span>Regional Painting Fusion</span>
        </div>
        <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-rich leading-tight">
          {fusionData.title}
        </h2>
        <p className="font-cormorant italic text-2xl sm:text-3xl text-terracotta mt-2">
          “{fusionData.subtitle}”
        </p>
        <p className="font-sans text-sm text-ink-muted mt-4 leading-relaxed">
          {fusionData.leadText}
        </p>
      </div>

      {/* Centerpiece Artwork Interactive Viewer */}
      <div className="relative rounded-3xl overflow-hidden bg-parchment-300 border-2 border-gold/50 shadow-2xl mb-16">
        {/* Archival Artwork Image: aspect-[4/3] on mobile for immersive viewport presence, aspect-[16/9] on desktop (LOCKED) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[640px] overflow-hidden group">
          <img
            src={fusionData.image}
            alt="Warli and Kalamkari Fusion Artwork"
            className="w-full h-full object-cover object-center select-none"
          />

          {/* Interactive Pulsing Hotspot Pins */}
          {fusionData.hotspots.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => {
                  playSubtleClick();
                  setActiveHotspot(spot);
                }}
                data-cursor="HOTSPOT"
                style={{
                  top: `${spot.y}%`,
                  left: `${spot.x}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin focus:outline-none transition-transform duration-300 min-w-[36px] min-h-[36px] flex items-center justify-center ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                }`}
                aria-label={spot.title}
              >
                {/* Hotspot Ring Animation */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    isSelected
                      ? 'bg-terracotta text-parchment-50 border-parchment-50 shadow-lg ring-4 ring-gold/50'
                      : 'bg-ink-rich/80 text-gold border-gold backdrop-blur-sm hover:bg-terracotta hover:text-parchment-50'
                  }`}
                >
                  <span className="font-cinzel text-xs font-bold">{spot.number}</span>
                </div>

                {/* Micro tooltip label (desktop hover) */}
                <span className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded bg-ink-rich/90 backdrop-blur-sm text-parchment-50 text-[10px] whitespace-nowrap font-sans uppercase tracking-wider opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none border border-gold/30">
                  {spot.shortTag}
                </span>
              </button>
            );
          })}

          {/* Top Left Artwork Badge */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-ink-rich/85 backdrop-blur-md border border-gold/40 text-parchment-50 text-[11px] sm:text-xs font-cinzel tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span>EXHIBITION CENTERPIECE • 5 HOTSPOTS</span>
          </div>
        </div>

        {/* Mobile Hotspot Quick Selector Strip (Allows effortless tapping without depending on hover) */}
        <div className="flex items-center gap-2 overflow-x-auto p-3 bg-parchment-200/90 border-t border-gold/30 scrollbar-none sm:hidden">
          {fusionData.hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => {
                playSubtleClick();
                setActiveHotspot(spot);
              }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-cinzel font-semibold transition-all shrink-0 ${
                activeHotspot?.id === spot.id
                  ? 'bg-terracotta text-parchment-50 shadow-sm border border-terracotta'
                  : 'bg-parchment-50 text-ink-muted border border-ink/10'
              }`}
            >
              <span className="mr-1 text-gold font-bold">#{spot.number}</span>
              {spot.shortTag}
            </button>
          ))}
        </div>

        {/* Floating Active Hotspot Annotation Dossier Banner */}
        {activeHotspot && (
          <div className="p-5 sm:p-8 bg-parchment-50 border-t border-gold/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 transition-all duration-300">
            <div className="space-y-1.5 sm:space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-terracotta text-parchment-50 font-cinzel text-[10px] font-bold">
                  HOTSPOT {activeHotspot.number}
                </span>
                <span className="text-xs uppercase tracking-wider font-sans font-semibold text-gold-dark">
                  {activeHotspot.category}
                </span>
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-ink-rich">
                {activeHotspot.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-parchment-200 border border-ink/10 text-xs font-sans text-ink-muted text-center">
                <span className="block text-[10px] text-ink-faint uppercase font-cinzel">Focus Mode</span>
                <span className="font-semibold text-terracotta">{activeHotspot.shortTag}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Handcrafted Fusion Artwork Submission ("Done by Koushigan Srinivasan") */}
      <div className="relative rounded-3xl overflow-hidden bg-parchment-300 border-2 border-gold/50 shadow-2xl mb-16">
        {/* Archival Artwork Image Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[660px] overflow-hidden bg-[#F6ECD9] flex items-center justify-center p-2 sm:p-5">
          <img
            src="/assets/warli_kalamkari_student_fusion.jpg"
            alt="Hand-drawn Warli and Kalamkari Regional Painting Fusion by Koushigan Srinivasan"
            className="w-full h-full object-contain object-center rounded-2xl shadow-sm"
          />

          {/* Top Left Badge */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-ink-rich/85 backdrop-blur-md border border-gold/40 text-parchment-50 text-[11px] sm:text-xs font-cinzel tracking-wider flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>ORIGINAL CREATIVE SYNTHESIS • CO2 ACTIVITY</span>
          </div>

          {/* Top Right "Done by" Badge */}
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-lg bg-parchment-50/95 backdrop-blur-md border border-gold/40 text-terracotta text-[11px] sm:text-xs font-cinzel font-bold tracking-wider shadow-sm hidden xs:flex items-center gap-1.5">
            <span className="text-ink-muted font-sans font-normal text-[10px]">Done by:</span>
            <span>Koushigan Srinivasan</span>
          </div>
        </div>

        {/* Archival Attestation & Caption Dossier */}
        <div className="p-5 sm:p-7 bg-parchment-50 border-t border-gold/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-terracotta text-parchment-50 font-cinzel text-[10px] font-bold tracking-widest uppercase">
                CLA-I STUDENT SUBMISSION
              </span>
              <span className="text-xs uppercase tracking-wider font-sans font-semibold text-gold-dark">
                Regional Painting Fusion
              </span>
            </div>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-ink-rich">
              Warli × Kalamkari: Creative Composition
            </h3>
            <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
              Original hand-drawn synthesis integrating Warli geometric triangular figures, ritual village life, and celestial solar motifs with Kalamkari circular mandala flora and organic ornamentation.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <div className="px-5 py-3 rounded-2xl bg-parchment-200/80 border border-gold/40 flex flex-col sm:items-end shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] font-cinzel text-ink-faint font-semibold">
                Done by
              </span>
              <span className="font-cinzel text-base font-bold text-terracotta tracking-wider">
                Koushigan Srinivasan
              </span>
              <span className="text-xs font-mono font-semibold text-ink-rich">
                RA2411003012117
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Split Comparative Breakdown: Warli vs Kalamkari */}
      <div className="my-16">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-cinzel text-terracotta font-semibold">
            Comparative Aesthetic Anatomy
          </span>
          <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-ink-rich mt-1">
            Two Visual Philosophies in Contrast
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Central 'X' decorative emblem on large screens (LOCKED) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-parchment-50 border-2 border-gold shadow-md items-center justify-center font-cinzel font-bold text-terracotta z-10 text-lg">
            ×
          </div>

          {/* Warli Column */}
          <div className="p-6 sm:p-8 rounded-2xl bg-parchment-50 border-2 border-terracotta/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-terracotta font-bold block">
                    Tradition A
                  </span>
                  <h4 className="font-playfair text-2xl font-bold text-ink-rich">
                    {fusionData.comparative.warli.name}
                  </h4>
                </div>
                <span className="text-xs text-ink-faint font-sans">{fusionData.comparative.warli.origin}</span>
              </div>

              <p className="text-xs text-ink-muted mb-6 italic font-serif">
                Medium: {fusionData.comparative.warli.medium}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fusionData.comparative.warli.pillars.map((pillar, i) => (
                  <div key={i} className="p-4 rounded-xl bg-parchment-200/50 border border-ink/5">
                    <span className="font-cinzel text-xs font-bold text-terracotta block mb-1">
                      {pillar.label}
                    </span>
                    <p className="font-sans text-xs text-ink-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Central 'X' separator on mobile stacked view */}
          <div className="flex lg:hidden items-center justify-center -my-3">
            <div className="w-10 h-10 rounded-full bg-parchment-50 border-2 border-gold shadow-md flex items-center justify-center font-cinzel font-bold text-terracotta text-base">
              ×
            </div>
          </div>

          {/* Kalamkari Column */}
          <div className="p-6 sm:p-8 rounded-2xl bg-parchment-50 border-2 border-gold/50 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-gold-dark font-bold block">
                    Tradition B
                  </span>
                  <h4 className="font-playfair text-2xl font-bold text-ink-rich">
                    {fusionData.comparative.kalamkari.name}
                  </h4>
                </div>
                <span className="text-xs text-ink-faint font-sans">{fusionData.comparative.kalamkari.origin}</span>
              </div>

              <p className="text-xs text-ink-muted mb-6 italic font-serif">
                Medium: {fusionData.comparative.kalamkari.medium}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fusionData.comparative.kalamkari.pillars.map((pillar, i) => (
                  <div key={i} className="p-4 rounded-xl bg-parchment-200/50 border border-ink/5">
                    <span className="font-cinzel text-xs font-bold text-gold-dark block mb-1">
                      {pillar.label}
                    </span>
                    <p className="font-sans text-xs text-ink-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Fusion Synthesis Essay */}
      <div className="p-8 sm:p-12 rounded-3xl bg-parchment-50 border border-gold/40 shadow-museum relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-cinzel text-terracotta font-bold block mb-2">
              Curatorial Synthesis
            </span>
            <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-ink-rich">
              {fusionData.synthesisEssay.heading}
            </h3>
          </div>

          <div className="space-y-4 font-sans text-sm text-ink-soft leading-relaxed pt-4 border-t border-ink/10">
            {fusionData.synthesisEssay.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4 text-xs font-cinzel text-ink-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-terracotta" />
              <span>CO2 Requirement Satisfied</span>
            </div>
            <div className="text-ink-faint">
              Geometric Rigor Meets Organic Abundance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

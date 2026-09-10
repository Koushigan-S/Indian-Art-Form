import React from 'react';
import { artifacts } from '../data/artifactsData';
import { playSubtleClick } from '../utils/audio';
import { Sparkles, Eye, Maximize2 } from 'lucide-react';

export default function CabinetExplorer({ onSelectArtifact }) {
  return (
    <section id="cabinet" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10 bg-parchment-100/50">
      {/* Editorial Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-[11px] uppercase tracking-[0.3em] font-cinzel text-terracotta block mb-3 font-semibold">
          04 • Curatorial Cabinet
        </span>
        <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-rich leading-tight">
          Six Traditions. <span className="italic font-normal text-terracotta">Six Visual Languages.</span>
        </h2>
        <p className="font-sans text-sm text-ink-muted mt-4 leading-relaxed">
          Step inside the digital archive repository. Each archival tile represents an unbroken visual genealogy—from the mathematical bronzes of the Indus to the spiritual communal circles of the Sahyadri forests.
        </p>
      </div>

      {/* Collectible Museum Cabinet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artifacts.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              playSubtleClick();
              onSelectArtifact(item);
            }}
            data-cursor="INSPECT"
            className="group relative rounded-2xl overflow-hidden bg-parchment-50 border border-ink/10 hover:border-gold hover:shadow-museum-hover transition-all duration-500 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Archive Metadata Header */}
            <div className="p-5 flex items-center justify-between border-b border-ink/5 bg-parchment-200/50 z-10 relative">
              <span className="font-cinzel text-xs font-bold text-terracotta tracking-widest">
                {item.archiveId}
              </span>
              <span className="text-[11px] font-sans text-ink-faint tracking-wider uppercase">
                {item.year}
              </span>
            </div>

            {/* Archival Artwork Viewer */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-rich">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-90"
                loading="lazy"
              />

              {/* Hover Overlay with Metadata Reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-rich/90 via-ink-rich/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-parchment-50">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-cinzel font-semibold mb-1">
                  {item.type}
                </span>
                <p className="text-xs text-parchment-200 line-clamp-2 font-sans mb-3">
                  {item.why}
                </p>
                <div className="flex items-center gap-2 text-xs font-cinzel font-semibold text-terracotta-light">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Full Archival Dossier</span>
                </div>
              </div>

              {/* Subtle Ornamental Frame Corner Accent */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold/40 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold/40 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold/40 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold/40 pointer-events-none" />
            </div>

            {/* Bottom Caption Frame */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3 bg-parchment-50">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ink-faint font-sans block mb-1">
                  {item.period}
                </span>
                <h3 className="font-playfair text-xl font-bold text-ink-rich group-hover:text-terracotta transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-ink/5 flex items-center justify-between text-xs font-sans text-ink-muted">
                <span>{item.location}</span>
                <span className="text-gold font-cinzel text-[11px] font-semibold">Examine →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

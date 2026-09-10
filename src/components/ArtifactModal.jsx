import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Tag, Info, Compass, Sparkles, BookOpen, Layers } from 'lucide-react';
import { playSubtleClick } from '../utils/audio';

export default function ArtifactModal({ artifact, isOpen, onClose, onPrev, onNext }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'context' | 'significance'
  const [showOriginalSvg, setShowOriginalSvg] = useState(false);

  // Handle ESC key press and left/right arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (onPrev) onPrev();
      } else if (e.key === 'ArrowRight') {
        if (onNext) onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !artifact) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-ink-rich/80 backdrop-blur-md animate-modal"
      onClick={(e) => {
        // Light dismiss on backdrop click
        if (e.target === e.currentTarget) {
          playSubtleClick();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-parchment-100 rounded-2xl shadow-2xl border border-gold/40 flex flex-col overflow-hidden text-ink">
        {/* Top Ornate Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 bg-parchment-200/80">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-terracotta text-parchment-50 font-cinzel text-[11px] font-bold tracking-widest uppercase">
              {artifact.archiveId}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-ink-muted">
              {artifact.period}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next Quick Scrub Buttons */}
            <button
              onClick={() => {
                playSubtleClick();
                onPrev();
              }}
              data-cursor="PREV"
              className="p-1.5 rounded-full hover:bg-parchment-300 text-ink-muted hover:text-ink transition-colors"
              title="Previous Artifact (Left Arrow)"
              aria-label="Previous Artifact"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                playSubtleClick();
                onNext();
              }}
              data-cursor="NEXT"
              className="p-1.5 rounded-full hover:bg-parchment-300 text-ink-muted hover:text-ink transition-colors"
              title="Next Artifact (Right Arrow)"
              aria-label="Next Artifact"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="w-[1px] h-4 bg-ink/20 mx-1" />

            {/* Close Button */}
            <button
              onClick={() => {
                playSubtleClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-parchment-50 border border-ink/15 text-ink hover:text-terracotta hover:border-terracotta transition-all"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two-column Editorial Layout */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Presentation Frame */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-parchment-300 border border-ink/10 shadow-md group">
              {showOriginalSvg ? (
                <div
                  className="w-full h-full flex items-center justify-center p-6 bg-parchment-200"
                  dangerouslySetInnerHTML={{ __html: artifact.svg }}
                />
              ) : (
                <img
                  src={artifact.image}
                  alt={artifact.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* View Toggle: Archival Photograph vs Vector Diagram */}
              <button
                onClick={() => {
                  playSubtleClick();
                  setShowOriginalSvg(!showOriginalSvg);
                }}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-ink-rich/80 backdrop-blur-sm text-parchment-50 text-[10px] tracking-wider uppercase font-sans border border-gold/40 hover:bg-terracotta transition-colors flex items-center gap-1.5 shadow"
              >
                <Layers className="w-3 h-3 text-gold" />
                <span>{showOriginalSvg ? 'View Museum Photo' : 'View Vector Schema'}</span>
              </button>
            </div>

            {/* Archival Metadata Capsule */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-parchment-50 border border-ink/10 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ink-faint block font-sans">
                  Origin Era
                </span>
                <span className="font-cinzel font-semibold text-terracotta block mt-0.5">
                  {artifact.year}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ink-faint block font-sans">
                  Classification
                </span>
                <span className="font-sans font-medium text-ink-rich block mt-0.5">
                  {artifact.type}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ink-faint block font-sans">
                  Medium & Technique
                </span>
                <span className="font-sans text-ink-muted block mt-0.5">
                  {artifact.medium}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ink-faint block font-sans">
                  Key Location
                </span>
                <span className="font-sans text-ink-muted block mt-0.5">
                  {artifact.location}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {artifact.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-parchment-200 border border-gold/30 text-ink-muted text-xs font-sans flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-gold" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Historical Context & Curatorial Analysis */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Title & Chronology */}
              <div className="border-b border-ink/10 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] font-cinzel text-terracotta font-semibold">
                  {artifact.year} • {artifact.type}
                </span>
                <h2 id="modal-title" className="font-playfair text-3xl sm:text-4xl font-bold text-ink-rich mt-1">
                  {artifact.title}
                </h2>
              </div>

              {/* Curatorial Tabs */}
              <div className="flex border-b border-ink/10 my-4 text-xs font-cinzel tracking-wider uppercase">
                <button
                  onClick={() => {
                    playSubtleClick();
                    setActiveTab('overview');
                  }}
                  className={`pb-2 mr-6 transition-colors relative font-semibold ${
                    activeTab === 'overview'
                      ? 'text-terracotta border-b-2 border-terracotta'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Overview & Details
                </button>
                <button
                  onClick={() => {
                    playSubtleClick();
                    setActiveTab('context');
                  }}
                  className={`pb-2 mr-6 transition-colors relative font-semibold ${
                    activeTab === 'context'
                      ? 'text-terracotta border-b-2 border-terracotta'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Historical Context
                </button>
                <button
                  onClick={() => {
                    playSubtleClick();
                    setActiveTab('significance');
                  }}
                  className={`pb-2 transition-colors relative font-semibold ${
                    activeTab === 'significance'
                      ? 'text-terracotta border-b-2 border-terracotta'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Why It Matters
                </button>
              </div>

              {/* Tab Content Panels */}
              <div className="space-y-4 text-sm text-ink-soft leading-relaxed font-sans">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-base text-ink-rich font-serif italic">
                      "{artifact.desc}"
                    </p>
                    {artifact.details && (
                      <div className="p-4 rounded-xl bg-parchment-50 border border-ink/10 space-y-2">
                        <span className="text-[11px] uppercase tracking-wider font-cinzel font-bold text-terracotta block">
                          Visual Analysis & Features
                        </span>
                        <ul className="space-y-1.5 text-xs text-ink-muted">
                          {artifact.details.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-gold mt-0.5">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'context' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-terracotta font-cinzel text-xs uppercase tracking-wider font-bold">
                      <BookOpen className="w-4 h-4" />
                      <span>Civilizational Background</span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {artifact.context}
                    </p>
                    {artifact.details?.technique && (
                      <div className="mt-4 p-3 rounded-lg bg-parchment-200/60 border-l-2 border-gold text-xs">
                        <span className="font-semibold text-ink-rich block">Metallurgy / Execution:</span>
                        <span className="text-ink-muted">{artifact.details.technique}</span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'significance' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gold font-cinzel text-xs uppercase tracking-wider font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Art Historical Impact</span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted font-medium">
                      {artifact.why}
                    </p>
                    {artifact.details?.significance && (
                      <p className="text-xs text-ink-soft bg-parchment-50 p-4 rounded-xl border border-ink/10">
                        {artifact.details.significance}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Footer Navigation */}
            <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
              <button
                onClick={() => {
                  playSubtleClick();
                  onPrev();
                }}
                data-cursor="PREV"
                className="flex items-center gap-2 text-xs font-cinzel uppercase tracking-wider text-ink-muted hover:text-terracotta transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← Previous</span>
              </button>

              <span className="text-[11px] font-sans text-ink-faint tracking-widest">
                Press ESC to close
              </span>

              <button
                onClick={() => {
                  playSubtleClick();
                  onNext();
                }}
                data-cursor="NEXT"
                className="flex items-center gap-2 text-xs font-cinzel uppercase tracking-wider text-ink-muted hover:text-terracotta transition-colors"
              >
                <span>Next →</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

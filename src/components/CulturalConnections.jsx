import React, { useState } from 'react';
import { culturalConnectionsData } from '../data/connectionsData';
import { playSubtleClick } from '../utils/audio';
import { Network, Sparkles, BookOpen, Heart, Sun, Activity, ArrowRight } from 'lucide-react';

export default function CulturalConnections() {
  const [selectedThemeId, setSelectedThemeId] = useState(culturalConnectionsData.themes[0].id);

  const activeTheme = culturalConnectionsData.themes.find((t) => t.id === selectedThemeId) || culturalConnectionsData.themes[0];

  const icons = {
    storytelling: BookOpen,
    nature: Sun,
    community: Heart,
    spirituality: Activity,
  };

  return (
    <section id="connections" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
      {/* Chapter Title Bar */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-cinzel text-terracotta mb-3 font-semibold">
          <span>07 • Cross-Tradition Matrix</span>
          <span className="text-gold">•</span>
          <span>Interwoven Concept Network</span>
        </div>
        <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-rich leading-tight">
          {culturalConnectionsData.title}
        </h2>
        <p className="font-cormorant italic text-2xl sm:text-3xl text-gold-dark mt-2">
          “{culturalConnectionsData.subtitle}”
        </p>
        <p className="font-sans text-sm text-ink-muted mt-4 leading-relaxed">
          {culturalConnectionsData.lead}
        </p>
      </div>

      {/* Interactive Theme Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {culturalConnectionsData.themes.map((theme) => {
          const Icon = icons[theme.id] || Sparkles;
          const isSelected = theme.id === selectedThemeId;

          return (
            <button
              key={theme.id}
              onClick={() => {
                playSubtleClick();
                setSelectedThemeId(theme.id);
              }}
              data-cursor="SELECT"
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all border ${
                isSelected
                  ? 'bg-ink-rich text-parchment-50 border-gold shadow-md'
                  : 'bg-parchment-50 text-ink-muted border-ink/15 hover:border-gold hover:text-ink'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-gold' : 'text-terracotta'}`} />
              <span>{theme.title}</span>
            </button>
          );
        })}
      </div>

      {/* Network Concept Visualization Panel */}
      <div className="p-8 sm:p-12 rounded-3xl bg-parchment-50 border border-gold/40 shadow-museum">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-cinzel text-terracotta font-bold block mb-1">
            Universal Principle
          </span>
          <h3 className="font-playfair text-3xl font-bold text-ink-rich mb-2">
            {activeTheme.title} — {activeTheme.descriptor}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
            {activeTheme.description}
          </p>
        </div>

        {/* Interconnected Tradition Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {activeTheme.nodes.map((node, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-parchment-200/50 border border-ink/10 hover:border-gold hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.color }} />
                  <span className="text-[10px] font-cinzel font-bold tracking-widest text-ink-faint uppercase">
                    NODE 0{idx + 1}
                  </span>
                </div>
                <h4 className="font-playfair text-xl font-bold text-ink-rich mb-2 group-hover:text-terracotta transition-colors">
                  {node.tradition}
                </h4>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  {node.role}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-ink/5 flex items-center gap-1 text-[10px] font-cinzel text-terracotta tracking-wider uppercase font-semibold">
                <span>Tradition Expression</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

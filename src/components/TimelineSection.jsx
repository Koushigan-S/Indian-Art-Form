import React, { useState } from 'react';
import { artifacts } from '../data/artifactsData';
import { playSubtleClick } from '../utils/audio';
import { Sparkles, ArrowUpRight, Filter, Compass } from 'lucide-react';

export default function TimelineSection({ onSelectArtifact }) {
  const [selectedTag, setSelectedTag] = useState('ALL');

  const allTags = ['ALL', 'Bronze', 'Murals', 'Manuscripts', 'Folk Art', 'Sculpture'];

  const filteredArtifacts = selectedTag === 'ALL'
    ? artifacts
    : artifacts.filter(item => item.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase())));

  return (
    <section id="timeline" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
      {/* Chapter Title Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-cinzel text-terracotta mb-3 font-semibold">
            <span>03 • Activity One (CO1)</span>
            <span className="text-gold">•</span>
            <span>Chronological Archives</span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-rich leading-tight">
            Interactive Indian Art <span className="italic font-normal text-terracotta">Timeline</span>
          </h2>
          <p className="font-sans text-sm text-ink-muted mt-3 max-w-2xl leading-relaxed">
            Trace the six foundational visual milestones of Indian art history. Click any artifact card to open the expanded archival dossier containing deep historical context, significance, and metallurgy details.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs uppercase tracking-wider font-cinzel text-ink-faint flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-gold" />
            Filter:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                playSubtleClick();
                setSelectedTag(tag);
              }}
              data-cursor="FILTER"
              className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition-all ${
                selectedTag === tag
                  ? 'bg-terracotta text-parchment-50 shadow-sm border border-terracotta'
                  : 'bg-parchment-100 text-ink-muted border border-ink/15 hover:border-gold hover:text-ink'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Central Spine & Timeline Cards */}
      <div className="relative">
        {/* Central Spine Line on desktop */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-terracotta via-gold to-heritage-indigo opacity-30" />

        <div className="space-y-12 sm:space-y-16">
          {filteredArtifacts.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Marker on Spine */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-parchment-100 border-2 border-gold text-terracotta shadow-md z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse" />
                </div>

                {/* Timeline Card */}
                <div className="w-full lg:w-[calc(50%-40px)]">
                  <div
                    onClick={() => {
                      playSubtleClick();
                      onSelectArtifact(item);
                    }}
                    data-cursor="OPEN"
                    className="group relative p-6 sm:p-7 rounded-2xl bg-parchment-50 border border-ink/10 hover:border-gold hover:shadow-museum-hover transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Corner Archive Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-widest uppercase bg-parchment-200 text-terracotta border border-terracotta/20">
                          {item.archiveId}
                        </span>
                        <span className="text-xs font-cinzel font-bold text-terracotta">
                          {item.year}
                        </span>
                      </div>

                      <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-sans text-ink-faint group-hover:text-terracotta transition-colors">
                        <span>Examine Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    {/* Card Media Preview + Editorial Text */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      {/* Image Thumbnail Frame */}
                      <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-parchment-200 border border-ink/10 relative shadow-sm">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-ink-rich/10 group-hover:opacity-0 transition-opacity" />
                      </div>

                      {/* Content Details */}
                      <div className="sm:col-span-7 space-y-2">
                        <div className="text-[11px] uppercase tracking-widest text-ink-faint font-sans">
                          {item.type} • {item.period}
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-ink-rich group-hover:text-terracotta transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-sans text-xs text-ink-muted leading-relaxed line-clamp-3">
                          {item.desc}
                        </p>

                        {/* Tag Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-full bg-parchment-200 text-[10px] font-sans text-ink-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Hover Glow Accent */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-terracotta to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Empty spacer for the alternating column on desktop */}
                <div className="hidden lg:block w-[calc(50%-40px)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

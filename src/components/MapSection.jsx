import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { mapLocations } from '../data/mapLocationsData';
import { playSubtleClick } from '../utils/audio';
import { MapPin, Navigation, Compass, Sparkles, RotateCcw, ChevronRight, Tag } from 'lucide-react';

export default function MapSection() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedLocation, setSelectedLocation] = useState(mapLocations[0]);
  const [activeLocationId, setActiveLocationId] = useState(mapLocations[0].id);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // prevent double init in React strict mode

    // Center coordinates for the Indian Subcontinent
    const initialCenter = [22.5, 79.0];
    const initialZoom = 5;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: true,
      scrollWheelZoom: false, // Prevent accidental page scroll hijacking
    });

    // Custom OpenStreetMap Parchment / Sepia Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors | KALA Archive',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Create Custom Heritage Markers
    markersRef.current = mapLocations.map((loc) => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker-wrapper',
        html: `
          <div class="custom-map-marker ${loc.id === mapLocations[0].id ? 'active' : ''}" id="marker-${loc.id}">
            <div class="marker-ring"></div>
            <div class="marker-dot"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(loc.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        playSubtleClick();
        handleSelectLocation(loc, false);
      });

      return { id: loc.id, marker };
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSelectLocation = (loc, shouldPan = true) => {
    setSelectedLocation(loc);
    setActiveLocationId(loc.id);

    // Update marker active styles in DOM
    mapLocations.forEach((item) => {
      const el = document.getElementById(`marker-${item.id}`);
      if (el) {
        if (item.id === loc.id) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    if (shouldPan && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(loc.coordinates, 8, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  };

  const handleResetMap = () => {
    playSubtleClick();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.5, 79.0], 5, {
        duration: 1.0,
      });
    }
  };

  return (
    <section id="map" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
      {/* Chapter Title Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-cinzel text-terracotta mb-3 font-semibold">
            <span>05 • Activity Two (CO1)</span>
            <span className="text-gold">•</span>
            <span>Cartographic Archive</span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-rich leading-tight">
            Art Has a <span className="italic font-normal text-terracotta">Geography</span>.
          </h2>
          <p className="font-sans text-sm text-ink-muted mt-3 max-w-2xl leading-relaxed">
            Trace the sacred places where visual traditions were born, transformed and preserved. Click each terracotta marker or select from the regional catalog to inspect its geographical art history.
          </p>
        </div>

        {/* Counter Badge & Reset Button */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-parchment-50 border border-gold/30 text-xs font-cinzel font-bold text-terracotta flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-ping" />
            <span>8 Historical Locations</span>
          </div>
          <button
            onClick={handleResetMap}
            data-cursor="RESET"
            className="p-2.5 rounded-xl bg-parchment-50 border border-ink/15 hover:border-gold text-ink-muted hover:text-ink text-xs transition-colors shadow-sm flex items-center gap-1.5"
            title="Reset to whole India view"
            aria-label="Reset Map"
          >
            <RotateCcw className="w-4 h-4 text-gold" />
            <span className="hidden sm:inline font-sans uppercase tracking-wider text-[10px]">
              Reset View
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal Quick Location Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {mapLocations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => {
              playSubtleClick();
              handleSelectLocation(loc, true);
            }}
            data-cursor="FOCUS"
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all border ${
              activeLocationId === loc.id
                ? 'bg-ink-rich text-parchment-50 border-gold shadow-md font-semibold'
                : 'bg-parchment-50 text-ink-muted border-ink/10 hover:border-gold hover:text-ink'
            }`}
          >
            <span className="mr-1.5 text-gold">•</span>
            {loc.name}
          </button>
        ))}
      </div>

      {/* Main Map + Floating Editorial Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Leaflet Map Frame (col-span-7 or 8) */}
        <div className="lg:col-span-7 xl:col-span-8 relative rounded-2xl overflow-hidden border border-gold/40 shadow-museum bg-parchment-200">
          {/* Map Container */}
          <div
            ref={mapContainerRef}
            className="parchment-map w-full h-[520px] sm:h-[600px] z-10"
            style={{ width: '100%' }}
          />

          {/* Floating Subtle Map Legend on Top Left */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none bg-parchment-50/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-ink/10 shadow text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
              <span className="font-cinzel text-[11px] font-bold text-ink-rich">OpenStreetMap Cartography</span>
            </div>
            <span className="text-[10px] font-sans text-ink-faint block mt-0.5">
              Click markers to inspect art tradition
            </span>
          </div>
        </div>

        {/* Floating Custom Editorial Panel (col-span-5 or 4) */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-parchment-50 border border-gold/40 shadow-museum-hover transition-all duration-300 relative overflow-hidden">
            {/* Top Region Badge */}
            <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-terracotta tracking-widest uppercase">
                <MapPin className="w-4 h-4 text-terracotta" />
                <span>{selectedLocation.region}</span>
              </div>
              <span className="text-[11px] font-sans text-ink-faint uppercase tracking-wider">
                {selectedLocation.period}
              </span>
            </div>

            {/* Location Title & Tradition */}
            <div className="space-y-3 mb-6">
              <h3 className="font-playfair text-3xl font-bold text-ink-rich">
                {selectedLocation.name}
              </h3>
              <div className="inline-block px-3 py-1 rounded-md bg-parchment-200 border border-gold/30 text-xs font-cinzel font-semibold text-terracotta">
                {selectedLocation.tradition}
              </div>
            </div>

            {/* Historical Narrative (Preserving Original Reference Content) */}
            <div className="space-y-4 text-sm text-ink-muted font-sans leading-relaxed">
              <p className="font-serif italic text-base text-ink-soft">
                "{selectedLocation.description}"
              </p>
              <p className="text-xs leading-relaxed text-ink-muted">
                {selectedLocation.extendedDetails}
              </p>
            </div>

            {/* Masterpiece Callout Box */}
            <div className="mt-6 p-4 rounded-xl bg-parchment-200/70 border border-ink/10 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-cinzel font-bold text-terracotta block">
                Signature Heritage Site / Artwork
              </span>
              <span className="font-sans font-medium text-xs text-ink-rich block">
                {selectedLocation.keyMasterpiece}
              </span>
            </div>

            {/* Location Tag Pills */}
            <div className="flex flex-wrap gap-1.5 mt-6 pt-6 border-t border-ink/10">
              {selectedLocation.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-parchment-100 border border-ink/10 text-[11px] font-sans text-ink-muted flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-gold" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Focus Action Button */}
            <div className="mt-6 pt-4">
              <button
                onClick={() => {
                  playSubtleClick();
                  handleSelectLocation(selectedLocation, true);
                }}
                data-cursor="ZOOM"
                className="w-full py-2.5 px-4 rounded-xl bg-terracotta hover:bg-terracotta-dark text-parchment-50 text-xs uppercase tracking-widest font-cinzel font-semibold transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>Focus Location On Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

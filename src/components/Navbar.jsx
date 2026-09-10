import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Compass, Clock, MapPin, Sparkles, Share2 } from 'lucide-react';
import { toggleAmbientSound, playSubtleClick } from '../utils/audio';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    playSubtleClick();
    const playing = toggleAmbientSound((state) => {
      setIsMuted(!state);
    });
    setIsMuted(!playing);
  };

  const navLinks = [
    { label: 'Timeline', href: '#timeline', code: '01' },
    { label: 'Cabinet', href: '#cabinet', code: '02' },
    { label: 'Map', href: '#map', code: '03' },
    { label: 'Fusion', href: '#fusion', code: '04' },
    { label: 'Connections', href: '#connections', code: '05' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-parchment-100/90 backdrop-blur-md border-b border-ink/10 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={playSubtleClick}
            className="flex items-center gap-3 group focus:outline-none"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center bg-parchment-50 group-hover:border-terracotta transition-colors">
              <span className="font-cinzel text-xs font-bold text-terracotta">क</span>
            </div>
            <div>
              <span className="font-cinzel font-extrabold text-xl tracking-[0.2em] text-ink-rich block leading-none">
                KALA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-ink-faint font-sans block mt-1">
                Indian Art Archive
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={playSubtleClick}
                data-cursor="GOTO"
                className="text-xs uppercase tracking-[0.2em] font-medium text-ink-muted hover:text-terracotta transition-colors relative py-1 group"
              >
                <span className="text-[9px] text-gold/70 mr-1 font-cinzel">{link.code}</span>
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Utility Actions: Ambient Sound + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              data-cursor="AUDIO"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink/15 hover:border-gold text-ink-muted hover:text-ink text-xs transition-all bg-parchment-50/70"
              title={isMuted ? 'Play ambient heritage drone' : 'Mute ambient sound'}
              aria-label="Toggle ambient museum soundscape"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-ink-faint" />
              ) : (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-terracotta animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-ping" />
                </div>
              )}
              <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-sans">
                {isMuted ? 'Sound Off' : 'Sound On'}
              </span>
            </button>

            {/* Animated Mobile Hamburger Button (Morphs into an X) */}
            <button
              onClick={() => {
                playSubtleClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden min-w-[44px] min-h-[44px] w-11 h-11 flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-ink/15 text-ink hover:text-terracotta bg-parchment-50/90 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2 bg-terracotta' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-terracotta' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scroll Reading Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-ink/5">
          <div
            className="h-full bg-gradient-to-r from-terracotta to-gold transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer Menu (Fullscreen Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-parchment-100/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden animate-modal">
          {/* Top Brand & Close Bar */}
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl font-black tracking-widest text-ink-rich">KALA</span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold">• Archive</span>
            </div>
            <button
              onClick={() => {
                playSubtleClick();
                setMobileMenuOpen(false);
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full border border-ink/15 text-ink hover:text-terracotta bg-parchment-50 shadow-sm"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-terracotta" />
            </button>
          </div>

          {/* Navigation Items (TIMELINE, MAP, FUSION, ABOUT) */}
          <div className="space-y-2 my-auto py-6">
            <p className="font-cinzel text-[11px] tracking-[0.3em] text-terracotta uppercase mb-4 font-semibold">
              Exhibition Navigation
            </p>
            {[
              { label: 'TIMELINE', href: '#timeline', code: '01', desc: 'Chronological Milestones (CO1)' },
              { label: 'MAP', href: '#map', code: '02', desc: 'Geographical Traditions (CO1)' },
              { label: 'FUSION', href: '#fusion', code: '03', desc: 'Warli × Kalamkari Synthesis (CO2)' },
              { label: 'ABOUT', href: '#introduction', code: '04', desc: 'Curatorial Framework & Philosophy' },
              { label: 'CABINET', href: '#cabinet', code: '05', desc: 'Archival Vault & Artifact Dossiers' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  playSubtleClick();
                  setMobileMenuOpen(false);
                }}
                className="flex flex-col py-3 text-ink hover:text-terracotta transition-colors border-b border-ink/5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-cinzel font-bold tracking-wider group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                  <span className="text-xs font-sans font-bold text-gold">{link.code}</span>
                </div>
                <span className="text-[11px] font-sans text-ink-faint mt-0.5">{link.desc}</span>
              </a>
            ))}
          </div>

          {/* Bottom Attribution Footer */}
          <div className="pt-4 border-t border-ink/10 text-xs text-ink-muted flex flex-col space-y-1">
            <p className="font-cormorant italic text-sm text-ink-soft">CLA-I • Indian Art History Archive</p>
            <p className="text-[11px] text-terracotta font-cinzel font-semibold tracking-wider">
              Koushigan Srinivasan • RA2411003012117
            </p>
          </div>
        </div>
      )}
    </>
  );
}

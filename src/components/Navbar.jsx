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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playSubtleClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-md border border-ink/10 text-ink hover:text-terracotta"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-parchment-100/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden">
          <div className="space-y-6">
            <p className="font-cinzel text-xs tracking-[0.3em] text-terracotta uppercase mb-4">
              Archive Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  playSubtleClick();
                  setMobileMenuOpen(false);
                }}
                className="block text-2xl font-cinzel tracking-wider text-ink hover:text-terracotta transition-colors"
              >
                <span className="text-sm font-sans text-gold mr-3">{link.code}</span>
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-ink/10 text-xs text-ink-muted">
            <p className="font-cormorant italic text-sm">CLA-I • Indian Art History Archive</p>
            <p className="mt-1 text-[11px] text-ink-faint">CO1 & CO2 Interactive Showcase</p>
          </div>
        </div>
      )}
    </>
  );
}

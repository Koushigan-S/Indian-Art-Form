import React, { useEffect, useState } from 'react';

export default function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => {
            if (onFinished) onFinished();
          }, 600);
          return 100;
        }
        // Smooth museum loading progression
        const step = Math.floor(Math.random() * 20) + 10;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-parchment-100 text-ink transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle decorative background ring */}
      <div className="absolute w-72 h-72 rounded-full border border-gold/20 animate-spin-very-slow pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full border border-terracotta/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Sanskrit / Museum seal */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/40 text-terracotta text-sm font-cinzel">
          कला
        </div>

        <h1 className="font-cinzel text-5xl md:text-6xl font-black tracking-[0.25em] text-ink-rich mb-2">
          KALA
        </h1>

        <p className="font-cormorant italic text-lg md:text-xl text-ink-muted tracking-wide mb-8">
          Opening the archive...
        </p>

        {/* Thin Gold & Terracotta Progress Bar */}
        <div className="w-56 h-[2px] bg-parchment-300 relative overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-terracotta via-gold to-terracotta transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-ink-faint font-sans">
          <span>Digital Heritage</span>
          <span className="text-gold">•</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

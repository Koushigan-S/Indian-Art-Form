import React, { useEffect, useState } from 'react';

export default function Loader({ onFinished }) {
  const [elapsed, setElapsed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user accessibility preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const startTime = performance.now();
    let animFrameId;

    const tick = (now) => {
      const currentElapsed = now - startTime;
      setElapsed(currentElapsed);

      // At 4.7s: central content subtly scales down
      if (currentElapsed >= 4700 && !isShrinking) {
        setIsShrinking(true);
      }

      // At 4.8s: entire preloader begins dissolving into the hero
      if (currentElapsed >= 4800 && !isExiting) {
        setIsExiting(true);
      }

      // At 5.05s: complete the transition cleanly
      if (currentElapsed >= 5050) {
        if (onFinished) onFinished();
        return;
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [onFinished, isShrinking, isExiting]);

  // Exact 5-second progress percentage
  const progressPercent = Math.min(100, (elapsed / 5000) * 100);

  // Staged text & element animation state thresholds
  const showMandala = elapsed >= 50;
  const showTitle = elapsed >= 600;
  const showSubtitle = elapsed >= 1300;
  const showDesc = elapsed >= 2000;
  const showCredits = elapsed >= 2600;
  const isDecelerating = elapsed >= 4500;

  return (
    <aside
      role="status"
      aria-label="Loading KALA Indian Art Archive"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-parchment-100 text-ink overflow-hidden select-none transition-all duration-300 ease-out ${
        isExiting
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-90" />

      {/* Subtle Archival Corner Framing Marks */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/40 pointer-events-none hidden sm:block" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/40 pointer-events-none hidden sm:block" />

      {/* Archival Classification Watermark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] uppercase font-cinzel tracking-[0.35em] text-ink-faint/60 pointer-events-none">
        National Archive • CLA-I Digital Exhibition
      </div>

      {/* ========================================================================= */}
      {/* CENTERPIECE: LARGE ROTATING INTRICATE INDIAN MANDALA                     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`relative w-[90vw] sm:w-[75vw] lg:w-[62vw] max-w-[740px] aspect-square flex items-center justify-center transition-opacity duration-800 ease-out ${
            showMandala ? 'opacity-20 md:opacity-25' : 'opacity-0'
          }`}
        >
          {/* Outer Ornamental Mandala (Clockwise 0° → 360° over 5s) */}
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full text-terracotta fill-none"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : `mandalaSpin 5000ms ${isDecelerating ? 'ease-out' : 'linear'} infinite`,
              transformOrigin: '50% 50%',
            }}
          >
            {/* Outer Geometric Perimeter & Beaded Rim */}
            <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
            <circle cx="400" cy="400" r="365" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="400" cy="400" r="350" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 6" />

            {/* 24-Petal Lotus Outer Arch Layer */}
            {[...Array(24)].map((_, i) => (
              <g key={`petal-${i}`} transform={`rotate(${i * 15} 400 400)`}>
                <path
                  d="M400,35 M388,68 Q400,45 412,68 Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="rgba(193, 82, 46, 0.04)"
                />
                <path
                  d="M400,68 L400,105"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
                <circle cx="400" cy="50" r="2.5" fill="currentColor" />
              </g>
            ))}

            {/* Concentric Geometric Trellis & Diamond Ring */}
            <circle cx="400" cy="400" r="295" stroke="currentColor" strokeWidth="1" />
            {[...Array(36)].map((_, i) => (
              <line
                key={`ray-${i}`}
                x1="400"
                y1="105"
                x2="400"
                y2="135"
                stroke="currentColor"
                strokeWidth="0.8"
                transform={`rotate(${i * 10} 400 400)`}
              />
            ))}
            <circle cx="400" cy="400" r="265" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />

            {/* Middle 12-Flourish Arabesque Floral Arches */}
            {[...Array(12)].map((_, i) => (
              <path
                key={`flourish-${i}`}
                d="M400,400 Q435,220 400,140 Q365,220 400,400"
                stroke="currentColor"
                strokeWidth="1"
                fill="rgba(197, 158, 78, 0.03)"
                transform={`rotate(${i * 30} 400 400)`}
              />
            ))}
          </svg>

          {/* Inner Ornamental Ring (Counter-Clockwise 0° → -180° over 5s) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 500 500"
              className="w-[62%] h-[62%] text-gold-dark fill-none"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `innerCounterSpin 5000ms ${isDecelerating ? 'ease-out' : 'linear'} infinite`,
                transformOrigin: '50% 50%',
              }}
            >
              <circle cx="250" cy="250" r="210" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" />
              <circle cx="250" cy="250" r="190" stroke="currentColor" strokeWidth="1" />
              
              {/* 8-Fold Star Ashtakon Geometry */}
              <polygon
                points="250,60 384,194 250,328 116,194"
                stroke="currentColor"
                strokeWidth="1"
              />
              <polygon
                points="250,60 384,194 250,328 116,194"
                stroke="currentColor"
                strokeWidth="1"
                transform="rotate(45 250 250)"
              />

              {/* Inner Sacred Rosette Core */}
              <circle cx="250" cy="250" r="90" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="45" stroke="currentColor" strokeWidth="1" />
              <circle cx="250" cy="250" r="6" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTER EDITORIAL TEXT: STAGED REVEAL                                      */}
      {/* ========================================================================= */}
      <div
        className={`relative z-10 my-auto flex flex-col items-center text-center px-6 max-w-2xl transition-transform duration-500 ease-out ${
          isShrinking ? 'scale-[0.97]' : 'scale-100'
        }`}
      >
        {/* Sanskrit Cultural Seal */}
        <div
          className={`mb-4 inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold/50 bg-parchment-50/80 backdrop-blur-sm text-terracotta text-sm font-cinzel transition-all duration-700 ${
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          कला
        </div>

        {/* Main Title: KALA (0.6s – 1.5s) */}
        <h1
          className={`font-cinzel text-6xl sm:text-7xl md:text-8xl font-black tracking-[0.22em] text-ink-rich leading-none transition-all duration-700 ease-out select-none ${
            showTitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{ textShadow: '0 4px 20px rgba(25, 21, 19, 0.08)' }}
        >
          KALA
        </h1>

        {/* Subtitle: "A Living Journey Through Indian Art" (1.3s – 2.2s) */}
        <p
          className={`font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-terracotta font-medium tracking-wide mt-4 transition-all duration-700 ease-out ${
            showSubtitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          “A Living Journey Through Indian Art”
        </p>

        {/* Description: Blur-to-sharp transition (2.0s – 3.0s) */}
        <p
          className={`font-sans text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mx-auto mt-4 transition-all duration-800 ease-out ${
            showDesc
              ? 'opacity-100 blur-0 translate-y-0'
              : 'opacity-0 blur-sm translate-y-3'
          }`}
        >
          Explore the stories, traditions and visual languages that shaped India's artistic heritage.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: EDITORIAL LOADING BAR & STUDENT CREDITS                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-md px-6 pb-6 md:pb-9 flex flex-col items-center text-center space-y-4">
        {/* Loading Indicator: OPENING THE ARCHIVE */}
        <div className="w-full flex flex-col items-center space-y-2">
          <div className="flex items-center justify-between w-56 text-[10px] uppercase font-cinzel tracking-[0.25em] text-ink-faint">
            <span>Opening The Archive</span>
            <span className="text-gold font-sans font-semibold text-[9px]">{Math.round(progressPercent)}%</span>
          </div>

          {/* Thin Horizontal Progress Line (0% → 100% over exactly 5.0 seconds) */}
          <div className="w-56 h-[2px] bg-ink/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-terracotta via-gold to-terracotta transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bottom Student Attribution Credit (2.6s – 3.0s fade + upward reveal) */}
        <div
          className={`transition-all duration-700 ease-out pt-1 ${
            showCredits
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="font-cinzel text-xs md:text-sm tracking-[0.2em] font-semibold text-ink-soft">
            <span className="text-terracotta">Koushigan Srinivasan</span>
            <span className="text-gold mx-2">•</span>
            <span className="text-ink-rich">RA2411003012117</span>
          </p>
        </div>
      </div>

      {/* Keyframe Styles for Smooth Rotations */}
      <style>{`
        @keyframes mandalaSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes innerCounterSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-180deg);
          }
        }
      `}</style>
    </aside>
  );
}

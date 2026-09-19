import React, { useEffect, useState } from 'react';

export default function Loader({ onFinished }) {
  const [elapsed, setElapsed] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Total loading duration: Exactly 3.0 seconds (3000ms)
  const TOTAL_DURATION = 3000;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const startTime = performance.now();
    let animFrameId;
    let finishedTriggered = false;

    const tick = (now) => {
      const currentElapsed = now - startTime;
      setElapsed(currentElapsed);

      // At 2.75s: central content subtly scales
      if (currentElapsed >= 2750 && !isShrinking) {
        setIsShrinking(true);
      }

      // At 2.85s: entire preloader begins dissolving into the hero
      if (currentElapsed >= 2850 && !isExiting) {
        setIsExiting(true);
      }

      // At 3.0s: complete the transition into the main website cleanly (run once)
      if (currentElapsed >= TOTAL_DURATION && !finishedTriggered) {
        finishedTriggered = true;
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

  // Exact 3.0-second progress percentage
  const progressPercent = Math.min(100, (elapsed / TOTAL_DURATION) * 100);

  // Staged text & element animation state thresholds calibrated for 3.0s
  const showMandala = elapsed >= 40;
  const showTitle = elapsed >= 300;
  const showSubtitle = elapsed >= 750;
  const showDesc = elapsed >= 1200;
  const showCredits = elapsed >= 1450;
  const isDecelerating = elapsed >= 2600;

  return (
    <aside
      role="status"
      aria-label="Loading KRITI Indian Art Archive"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-parchment-100 text-ink overflow-hidden select-none transition-all duration-300 ease-out ${
        isExiting
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Background Paper Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-80" />

      {/* Subtle Archival Corner Framing Marks */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/50 pointer-events-none hidden sm:block" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/50 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/50 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/50 pointer-events-none hidden sm:block" />

      {/* Archival Classification Watermark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] uppercase font-cinzel tracking-[0.35em] text-ink-faint/70 pointer-events-none whitespace-nowrap">
        National Archive • CLA-I Digital Exhibition
      </div>

      {/* ========================================================================= */}
      {/* CENTERPIECE: COLORFUL KERALA ONAM POOKKALAM MANDALA                       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`relative w-[92vw] sm:w-[78vw] lg:w-[64vw] max-w-[760px] aspect-square flex items-center justify-center transition-opacity duration-600 ease-out ${
            showMandala ? 'opacity-80 sm:opacity-90' : 'opacity-0'
          }`}
        >
          {/* Outer Colorful Pookkalam Floral Mandala (Clockwise 0° → 360° over 3.0s) */}
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full filter drop-shadow-md"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : `mandalaSpin 3000ms ${isDecelerating ? 'ease-out' : 'linear'} infinite`,
              transformOrigin: '50% 50%',
            }}
          >
            <defs>
              {/* Kerala Onam Floral Gradients */}
              <linearGradient id="marigoldOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#E65100" />
              </linearGradient>

              <linearGradient id="chethiRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5252" />
                <stop offset="100%" stopColor="#B71C1C" />
              </linearGradient>

              <linearGradient id="jamanthiYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF59D" />
                <stop offset="100%" stopColor="#FBC02D" />
              </linearGradient>

              <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#66BB6A" />
                <stop offset="100%" stopColor="#1B5E20" />
              </linearGradient>

              <linearGradient id="shankhuViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7E57C2" />
                <stop offset="100%" stopColor="#311B92" />
              </linearGradient>

              <linearGradient id="chemparathyPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EC407A" />
                <stop offset="100%" stopColor="#880E4F" />
              </linearGradient>

              <radialGradient id="centerSunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF176" />
                <stop offset="60%" stopColor="#FB8C00" />
                <stop offset="100%" stopColor="#D84315" />
              </radialGradient>
            </defs>

            {/* Base Circular Petal Bed */}
            <circle cx="400" cy="400" r="390" fill="#FFF9C4" opacity="0.3" />
            <circle cx="400" cy="400" r="380" stroke="#FF6F00" strokeWidth="2.5" fill="none" strokeDasharray="4 6" />

            {/* Layer 1: Outer Chethi Scarlet Red & Marigold Orange Petals (24 Petals) */}
            {[...Array(24)].map((_, i) => (
              <g key={`outer-petal-${i}`} transform={`rotate(${i * 15} 400 400)`}>
                <path
                  d="M400,20 Q422,65 400,105 Q378,65 400,20 Z"
                  fill={i % 2 === 0 ? "url(#chethiRed)" : "url(#marigoldOrange)"}
                  stroke="#FFD54F"
                  strokeWidth="0.8"
                  opacity="0.9"
                />
                <circle cx="400" cy="32" r="3.5" fill="#FFE082" />
              </g>
            ))}

            {/* Layer 2: Ring of Golden Marigold Yellow Points (36 Points) */}
            <circle cx="400" cy="400" r="325" fill="none" stroke="#F57F17" strokeWidth="2" />
            {[...Array(36)].map((_, i) => (
              <g key={`mid-jamanthi-${i}`} transform={`rotate(${i * 10} 400 400)`}>
                <polygon
                  points="400,85 410,125 400,120 390,125"
                  fill="url(#jamanthiYellow)"
                  stroke="#E65100"
                  strokeWidth="0.5"
                />
              </g>
            ))}

            {/* Layer 3: Fresh Emerald Leaf / Tulsi Scalloped Ring (24 Leaves) */}
            <circle cx="400" cy="400" r="275" fill="none" stroke="#2E7D32" strokeWidth="2" strokeDasharray="6 4" />
            {[...Array(24)].map((_, i) => (
              <path
                key={`leaf-${i}`}
                d="M400,125 Q420,158 400,185 Q380,158 400,125 Z"
                fill="url(#leafGreen)"
                stroke="#A5D6A7"
                strokeWidth="0.6"
                transform={`rotate(${i * 15 + 7.5} 400 400)`}
                opacity="0.88"
              />
            ))}

            {/* Layer 4: Royal Violet Shankhupushpam Lotus Ring (16 Petals) */}
            {[...Array(16)].map((_, i) => (
              <path
                key={`violet-lotus-${i}`}
                d="M400,180 Q430,230 400,265 Q370,230 400,180 Z"
                fill="url(#shankhuViolet)"
                stroke="#D1C4E9"
                strokeWidth="0.75"
                transform={`rotate(${i * 22.5} 400 400)`}
                opacity="0.9"
              />
            ))}

            {/* Layer 5: Crimson Chemparathy (Hibiscus) Arabesque Stars */}
            {[...Array(12)].map((_, i) => (
              <path
                key={`crimson-star-${i}`}
                d="M400,240 Q425,290 400,320 Q375,290 400,240 Z"
                fill="url(#chemparathyPink)"
                stroke="#FF80AB"
                strokeWidth="0.6"
                transform={`rotate(${i * 30 + 15} 400 400)`}
              />
            ))}
          </svg>

          {/* Inner Counter-Rotating Rosette (Opposite Direction 0° → -180° over 3.0s) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 500 500"
              className="w-[58%] h-[58%] filter drop-shadow"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `innerCounterSpin 3000ms ${isDecelerating ? 'ease-out' : 'linear'} infinite`,
                transformOrigin: '50% 50%',
              }}
            >
              {/* Outer Golden Turmeric Circle */}
              <circle cx="250" cy="250" r="215" fill="none" stroke="#FFB300" strokeWidth="2.5" strokeDasharray="4 6" />

              {/* 8-Pointed Ashtadala Sacred Lotus in Bright Marigold & Vermilion */}
              {[...Array(8)].map((_, i) => (
                <g key={`inner-lotus-${i}`} transform={`rotate(${i * 45} 250 250)`}>
                  <path
                    d="M250,55 Q285,125 250,175 Q215,125 250,55 Z"
                    fill="url(#centerSunGlow)"
                    stroke="#FFF59D"
                    strokeWidth="1.2"
                  />
                  <circle cx="250" cy="72" r="3" fill="#D50000" />
                </g>
              ))}

              {/* Center Radiant Core Bindu */}
              <circle cx="250" cy="250" r="68" fill="url(#chethiRed)" stroke="#FFEE58" strokeWidth="2" />
              <circle cx="250" cy="250" r="42" fill="url(#marigoldOrange)" stroke="#FFF" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="20" fill="#FFEB3B" />
              <circle cx="250" cy="250" r="7" fill="#B71C1C" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTER EDITORIAL TEXT (With subtle parchment shield for sharp legibility) */}
      {/* ========================================================================= */}
      <div
        className={`relative z-10 my-auto flex flex-col items-center text-center px-6 max-w-xl transition-transform duration-400 ease-out ${
          isShrinking ? 'scale-[0.97]' : 'scale-100'
        }`}
      >
        {/* Parchment glass backing shield so text stays 100% readable over colorful mandala */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-parchment-100/90 backdrop-blur-md border border-gold/40 shadow-xl flex flex-col items-center">
          {/* Sanskrit Cultural Seal */}
          <div
            className={`mb-2 sm:mb-3 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/60 bg-parchment-50 text-terracotta text-xs sm:text-sm font-cinzel transition-all duration-500 shadow-sm ${
              showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            कृति
          </div>

          {/* Main Title: KRITI (0.3s – 0.8s) */}
          <h1
            className={`font-cinzel text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.16em] sm:tracking-[0.22em] text-ink-rich leading-none transition-all duration-500 ease-out select-none ${
              showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ textShadow: '0 2px 14px rgba(15, 23, 42, 0.1)' }}
          >
            KRITI
          </h1>

          {/* Subtitle: "The Living Archive of Indian Masterpieces" (0.75s – 1.3s) */}
          <p
            className={`font-cormorant italic text-xl sm:text-3xl text-terracotta font-semibold tracking-wide mt-2.5 sm:mt-3 transition-all duration-500 ease-out ${
              showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            “The Living Archive of Indian Masterpieces”
          </p>

          {/* Description: Blur-to-sharp transition (1.2s – 1.8s) */}
          <p
            className={`font-sans text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mx-auto mt-2 sm:mt-3 transition-all duration-500 ease-out ${
              showDesc ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-2'
            }`}
          >
            Explore the masterpieces, sacred forms and visual languages that shaped India's artistic heritage.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: EDITORIAL LOADING BAR & STUDENT CREDITS (SINGLE LINE)     */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-xl px-4 pb-5 md:pb-8 flex flex-col items-center text-center space-y-2.5 sm:space-y-3">
        {/* Loading Indicator: OPENING THE ARCHIVE */}
        <div className="w-full flex flex-col items-center space-y-1.5">
          <div className="flex items-center justify-between w-52 sm:w-56 text-[10px] uppercase font-cinzel tracking-[0.22em] sm:tracking-[0.25em] text-ink-faint">
            <span>Opening The Archive</span>
            <span className="text-gold font-sans font-semibold text-[9px]">{Math.round(progressPercent)}%</span>
          </div>

          {/* Thin Horizontal Progress Line (0% → 100% over exactly 3.0 seconds) */}
          <div className="w-52 sm:w-56 h-[2px] bg-ink/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-terracotta via-gold to-terracotta transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bottom Student Attribution Credits */}
        <div
          className={`transition-all duration-500 ease-out pt-0.5 sm:pt-1 w-full flex flex-col items-center justify-center space-y-1 ${
            showCredits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] font-semibold text-ink-soft whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center">
            <span className="text-terracotta font-bold">Koushigan Srinivasan</span>
            <span className="text-gold mx-1.5 sm:mx-2">•</span>
            <span className="text-ink-rich font-bold">RA2411003012117</span>
          </p>
          <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] font-semibold text-ink-soft whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center">
            <span className="text-terracotta font-bold">Madan Suriya</span>
            <span className="text-gold mx-1.5 sm:mx-2">•</span>
            <span className="text-ink-rich font-bold">RA2411003012108</span>
          </p>
          <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] font-semibold text-ink-soft whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center">
            <span className="text-terracotta font-bold">Sreedharan V A</span>
            <span className="text-gold mx-1.5 sm:mx-2">•</span>
            <span className="text-ink-rich font-bold">RA2411003012116</span>
          </p>
          <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] font-semibold text-ink-soft whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center">
            <span className="text-terracotta font-bold">Karthick T</span>
            <span className="text-gold mx-1.5 sm:mx-2">•</span>
            <span className="text-ink-rich font-bold">RA2411003012145</span>
          </p>
        </div>
      </div>

      {/* Keyframe Styles for Kerala Onam Mandala 3.0s Spin */}
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

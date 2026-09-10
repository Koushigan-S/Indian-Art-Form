import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or screens smaller than 1024px
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check what is being hovered
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || 'VIEW');
      } else {
        const interactive = e.target.closest('button, a, input, select, .card, [role="button"]');
        if (interactive) {
          setIsHovered(true);
          setCursorText('');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out border ${
          isHovered
            ? cursorText
              ? 'w-20 h-20 bg-ink-rich/90 text-parchment-100 border-gold shadow-lg backdrop-blur-sm scale-100'
              : 'w-10 h-10 bg-terracotta/20 border-terracotta scale-125'
            : 'w-4 h-4 bg-terracotta border-parchment-50 shadow-sm'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest uppercase font-cinzel text-center px-1">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

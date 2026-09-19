/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#FAF8F2',
          50: '#FFFFFF',
          100: '#FAF8F4',
          200: '#F4EFE6',
          300: '#EAE2D2',
          400: '#DDD2BD',
          dark: '#E2D7BF',
        },
        ink: {
          DEFAULT: '#0F172A',
          rich: '#080C14',
          soft: '#1E293B',
          muted: '#475569',
          faint: '#64748B',
          border: 'rgba(15, 23, 42, 0.12)',
        },
        terracotta: {
          DEFAULT: '#D95B1E',
          light: '#F59E0B',
          dark: '#9A3412',
          wash: '#FEF3C7',
        },
        gold: {
          DEFAULT: '#D97706',
          light: '#FBBF24',
          dark: '#92400E',
          faint: 'rgba(217, 119, 6, 0.16)',
        },
        heritage: {
          indigo: '#0F172A',
          peacock: '#0284C7',
          malachite: '#047857',
          ochre: '#D97706',
          vermilion: '#E11D48',
          madder: '#991B1B',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'museum': '0 20px 45px -15px rgba(15, 23, 42, 0.10), 0 0 1px 1px rgba(15, 23, 42, 0.05)',
        'museum-hover': '0 30px 65px -20px rgba(15, 23, 42, 0.20), 0 0 1px 1px rgba(217, 91, 30, 0.25)',
        'parchment-inset': 'inset 0 2px 8px rgba(15, 23, 42, 0.06)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-very-slow': 'spin 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

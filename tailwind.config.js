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
          DEFAULT: '#F7F3EB',
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F4ECE1',
          300: '#EBDDCB',
          400: '#DEC9B0',
          dark: '#E8DEC8',
        },
        ink: {
          DEFAULT: '#191513',
          rich: '#110E0C',
          soft: '#2D2622',
          muted: '#5A4F48',
          faint: '#8E8278',
          border: 'rgba(45, 38, 34, 0.12)',
        },
        terracotta: {
          DEFAULT: '#C1522E',
          light: '#D96944',
          dark: '#9B391A',
          wash: '#FAF0EB',
        },
        gold: {
          DEFAULT: '#C59E4E',
          light: '#DFC07E',
          dark: '#99742B',
          faint: 'rgba(197, 158, 78, 0.15)',
        },
        heritage: {
          indigo: '#1D253A',
          malachite: '#26483C',
          ochre: '#D4963B',
          vermilion: '#B83222',
          madder: '#8B2621',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'museum': '0 20px 40px -15px rgba(25, 21, 19, 0.08), 0 0 1px 1px rgba(25, 21, 19, 0.04)',
        'museum-hover': '0 30px 60px -20px rgba(25, 21, 19, 0.16), 0 0 1px 1px rgba(193, 82, 46, 0.2)',
        'parchment-inset': 'inset 0 2px 8px rgba(25, 21, 19, 0.06)',
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

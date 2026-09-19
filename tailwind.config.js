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
          DEFAULT: '#F4F8F5',
          50: '#FFFFFF',
          100: '#F8FAF8',
          200: '#EBF3EE',
          300: '#DCE8DF',
          400: '#C6D8CB',
          dark: '#B9CCBF',
        },
        ink: {
          DEFAULT: '#0B1E16',
          rich: '#05130D',
          soft: '#132E23',
          muted: '#3A5649',
          faint: '#5D7A6C',
          border: 'rgba(11, 30, 22, 0.12)',
        },
        terracotta: {
          DEFAULT: '#15803D',
          light: '#22C55E',
          dark: '#0F5132',
          wash: '#ECFDF5',
        },
        gold: {
          DEFAULT: '#B5943B',
          light: '#D4B859',
          dark: '#6E561E',
          faint: 'rgba(181, 148, 59, 0.18)',
        },
        heritage: {
          indigo: '#062319',
          peacock: '#0D9488',
          malachite: '#15803D',
          ochre: '#B5943B',
          vermilion: '#10B981',
          madder: '#047857',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'museum': '0 20px 45px -15px rgba(11, 30, 22, 0.10), 0 0 1px 1px rgba(11, 30, 22, 0.05)',
        'museum-hover': '0 30px 65px -20px rgba(11, 30, 22, 0.20), 0 0 1px 1px rgba(21, 128, 61, 0.25)',
        'parchment-inset': 'inset 0 2px 8px rgba(11, 30, 22, 0.06)',
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

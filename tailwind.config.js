module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        saas: {
          black: '#0A0A0A',
          darker: '#121212',
          dark: '#1A1A1A',
          DEFAULT: '#232323',
          light: '#2A2A2A',
          lighter: '#333333',
          blue: '#0284c7', // Single blue accent color
          'blue-light': '#38bdf8',
          'blue-dark': '#0369a1',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.8s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.8s ease-out forwards',
        'slideInRight': 'slideInRight 1s ease-out forwards',
        'slideInLeft': 'slideInLeft 1s ease-out forwards',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 0.3 }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to right, #0369a1, #0284c7)',
        'blue-to-dark': 'linear-gradient(to bottom, #0284c7, #0A0A0A)',
        'dark-gradient': 'linear-gradient(to bottom, #0A0A0A, #121212)',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
        'blue-glow': 'radial-gradient(circle at center, rgba(2, 132, 199, 0.15), transparent 70%)',
      },
      boxShadow: {
        'blue': '0 0 20px rgba(2, 132, 199, 0.15)',
        'blue-lg': '0 0 30px rgba(2, 132, 199, 0.25)',
        'blue-inner': 'inset 0 0 10px rgba(2, 132, 199, 0.1)',
      },
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'float-1': 'float1 8s ease-in-out infinite',
        'float-2': 'float2 12s ease-in-out infinite',
        'twinkle-1': 'twinkle1 4s ease-in-out infinite',
        'twinkle-2': 'twinkle2 6s ease-in-out infinite',
        'twinkle-3': 'twinkle3 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle1: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.8' },
        },
        twinkle2: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        twinkle3: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.6' },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -15px) rotate(5deg)' },
          '50%': { transform: 'translate(-5px, 10px) rotate(-5deg)' },
          '75%': { transform: 'translate(-15px, -5px) rotate(3deg)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-15px, 10px) rotate(-3deg)' },
          '66%': { transform: 'translate(10px, -15px) rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};
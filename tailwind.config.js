/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'zoom-in-out': 'zoom-in-out 5s ease-in-out infinite',
      },
      keyframes: {
        'zoom-in-out': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      background: {
        'radial-gradient': 'radial-gradient(circle at center, transparent 30%, transparent 70%, white/90 100%)',
      },
    },
  },
  plugins: [],
};
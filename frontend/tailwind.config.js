/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dcebff',
          200: '#b9d7ff',
          300: '#8fbfff',
          400: '#5fa3ff',
          500: '#2f86ff',
          600: '#1b6ae6',
          700: '#1553b3',
          800: '#113f85',
          900: '#0d2b57'
        }
      }
    }
  },
  plugins: [],
};

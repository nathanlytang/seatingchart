/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        numerals: ['Georgia', '"Times New Roman"', 'serif'],
      },
      colors: {
        cream: {
          50: '#fbf7f1',
          100: '#f6efe3',
          200: '#ebdfc7',
        },
        blush: {
          100: '#f6e1dc',
          200: '#ecc5bc',
          400: '#c98c80',
          500: '#b87366',
          600: '#9a5a4e',
        },
        sage: {
          400: '#9fae96',
          600: '#6b7a63',
          700: '#586850',
        },
        ink: '#3b2f2a',
        pearl: '#fafafa',
        bone: '#f4f1ec',
        graphite: {
          400: '#8a8680',
          600: '#5b5752',
          800: '#2b2926',
        },
        champagne: {
          200: '#ead9b8',
          400: '#c8a96a',
          500: '#b08d4a',
          600: '#8c6e35',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(75, 50, 40, 0.18)',
      },
    },
  },
  plugins: [],
};

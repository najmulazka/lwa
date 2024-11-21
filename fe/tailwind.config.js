/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        120: '120px',
      },
      fontSize: {
        10: '10px',
      },
      maxWidth: {
        '200px': '200px',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        h1: {
          fontSize: '32px',
          '@screen md': {
            fontSize: '40px',
          },
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '24px',
          '@screen md': {
            fontSize: '32px',
          },
        },
        h3: {
          fontSize: '16px',
          '@screen md': {
            fontSize: '20px',
          },
        },
      });
    },
  ],
};

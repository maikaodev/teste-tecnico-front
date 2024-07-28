/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/vuetify/dist/vuetify.esm.js',
    'node_modules/@mdi/font/css/materialdesignicons.css',
  ],
  theme: {
    colors: {
      'background-primary': '##dde3ca',
      'background-secondary': '#7c8071',
      'background-button-primary': '#487aa1',
      'font-primary': '#3d3c3b',
      'font-secondary': '#b2d9f7',
    },
    extend: {
      keyframes: {
        'slide-in-elliptic-left-fwd': {
          '0%': {
            transform: 'translateX(-800px) rotateY(30deg) scale(0)',
            'transform-origin': '-100% 50%',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0) rotateY(0) scale(1)',
            'transform-origin': '1800px 50%',
            opacity: '1',
          },
        },
      },
      animation: {
        'slide-in-elliptic-left-fwd':
          'slide-in-elliptic-left-fwd 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};


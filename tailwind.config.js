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
      'back-primary': 'rgb(241,231,213)',
      'back-secondary': 'rgb(144,119,97)',
      'button-primary': 'rgb(162,95,82)',
      'font-primary': 'rgb(89,73,64)',
      'font-secondary': 'rgb(241,231,213)',
      'border-primary': 'rgb(144,119,97)',
      'border-secondary': 'rgb(241,231,213)',
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


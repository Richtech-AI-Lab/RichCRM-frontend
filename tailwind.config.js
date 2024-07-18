const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],

  theme: {
    extend: {
      boxShadow: {
        'full': 'rgba(0, 0, 0, 0.2) 0px 0px 6px',
      }
    },
    colors: {
      'primary': '#375398',
      'title': "#092C4C",
      'label': "#49454F",
      'bg-input': "#E6E9EE",
      'bg-body': '#F6F6F6',
      'active': '#DEE5F8',
      'text-red': '#FF7676',
      'text-blue': {
        100: "#2B40FF",
        200: "#514EF3",
        300: '#8785FA',
        400: '#178EFB',
      },
      'secondary': {
        100: "#2A343D",
        200: "#3F3F3F",
        300: "#858585",
        400: '#606060',
        500: '#1D192B',
        600: '#919191',
      },
      'border': '#D2D2D2',
      'stroke': '#79747E',
      'card': {
        100: '#F2F2F2',
        200: '#ECECEC',
      },
      'badge-green': '#ABE8AE',
      'badge-yellow': '#FFD08A',
      'badge-blue': '#95DEE3',
      'badge-pink': '#D3B3E7',
      'select': '#F7F2FA',
      'select-text': '#49454F',
      'bg-pink': '#E8DEF8',
      'progress': '#F1F2F4',
      'progress-active': '#BAD4FF',
      'text-purple': '#65558F',
      ...colors,
    },
  },
  plugins: [flowbite.plugin()],
};

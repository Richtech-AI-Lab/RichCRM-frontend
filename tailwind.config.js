const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

/**   @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],

  theme: {
    extend: {
      boxShadow: {
        'full': 'rgba(0, 0, 0, 0.2) 0px 0px 6px',
        'card': '0px 3px 8px rgba(0, 14, 73, 0.15);',
        'shadow-light': '0px 1px 4px 0px rgba(0, 14, 73, 0.15)',
      }
    },
    colors: {
      'primary': '#375398',
      'primary2': '#366093',
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
        200: "#002110",
        300: "#858585",
        400: '#606060',
        500: '#1D192B',
        600: '#919191',
        700: '#42474F',
        800: '#1A1C1F',
        900: '#8D919A',
      },
      'border': '#D2D2D2',
      'stroke': '#79747E',
      'card': {
        100: '#F2F2F2',
        200: '#ECECEC',
        300: '#E8E8EC',
      },
      'badge-green': '#A4EDBB',
      'badge-yellow': '#FFD187',
      'badge-blue': '#95DEE3',
      'badge-pink': '#D3B3E7',
      'badge-red': '#ff9f94',
      'select': '#F7F2FA',
      'select-text': '#49454F',
      'bg-pink': '#E8DEF8',
      'progress': '#F1F2F4',
      'progress-active': '#BAD4FF',
      'text-purple': '#65558F',
      'badge-gray': '#E2E2E7',
      'input-surface': '#F3F3F8',
      'active-blue': '#C5DCFF',
      'active-blue-text': '#033B6B',
      'bg-gray': {
        100: '#E2E2E7',
      },
      'error': '#CF0505',
      ...colors,
    },
  },
  plugins: [flowbite.plugin()],
};

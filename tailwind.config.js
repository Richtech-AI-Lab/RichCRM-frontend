const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],

  theme: {
    extend: {},
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
      ...colors,
    },
  },
  plugins: [flowbite.plugin()],
};
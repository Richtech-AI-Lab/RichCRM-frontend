const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],

  theme: {
    extend: {},
    colors: {
      'title': "#092C4C",
      'label': "#49454F",
      'bg-input': "#E6E9EE",
      'bg-body': '#F6F6F6',
      'active': '#DEE5F8',
      'text-red': '#FF7676',
      'text-blue': '#2B40FF',
      'secondary': {
        100: "#2A343D",
        200: "#3F3F3F",
        300: "#858585",
        400: '#606060',
        500: '#1D192B',
      },
      ...colors,
    },
  },
  plugins: [flowbite.plugin()],
};

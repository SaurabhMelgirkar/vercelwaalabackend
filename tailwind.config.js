/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tedx-red': '#EB0028',
        'tedx-black': '#000000',
        'tedx-white': '#FFFFFF',
      },
      fontFamily: {
        'tedx': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

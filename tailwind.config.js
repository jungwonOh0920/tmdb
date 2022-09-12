/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ['Ubuntu'],
        Silkscreen: ['Silkscreen', 'cursive']
      }
    },
  },
  plugins: [],
}

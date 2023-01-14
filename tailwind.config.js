/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  theme: {
    screens: {
        'mm': '360px',
        'tb': '550px',
        'lt': '1100px',
        'dt': '1500px'
    },
    extend: {},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lilac': '#af98bd',
        'red-danger': {
          DEFAULT: '#e02022',
          lighten: '#f02022',
          darken: '#d02022',
        }
      }
    },
  },
  plugins: [],
}

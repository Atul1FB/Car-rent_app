/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Tailwind blue-600
        'primary-dark': '#1D4ED8',
        borderColor: '#E5E7EB', // gray-200
      },
    },
  },
  plugins: [], // <- Leave this empty or remove entirely
};
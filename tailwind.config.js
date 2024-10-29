/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#1a1a1a',
        'button-blue': '#5799ef',
        'button-grey': '#2c2c2c',
        'button-hover': '#30353c'
      },
    },
  },
  plugins: [],
}
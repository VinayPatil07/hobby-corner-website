/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'navy-base': '#0a2342',
        'tangerine-accent': '#e46d02',
        'muted-cerulean': '#14527b',
        'soft-gray-blue': '#f1f5f9',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], 
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
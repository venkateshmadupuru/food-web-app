/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Roboto", "sans-serif"], serif: ["Lora", "serif"] },
    },
  },
  plugins: [],
};

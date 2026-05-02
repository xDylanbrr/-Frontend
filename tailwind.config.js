/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        "primary-accent": "#EF4444",
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
        "text-light": "#333333",
        "text-dark": "#F0F2F5",
        "section-light": "#F0F2F5",
        "section-dark": "#19212e",
        "border-light": "#E0E0E0",
        "border-dark": "#3a4351",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};

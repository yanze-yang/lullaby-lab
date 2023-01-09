/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/hero-min.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "media",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(90deg, rgba(13,37,65,0.14891894257703087) 33%, rgba(25,50,79,1) 74%, rgba(19,37,58,1) 100%), url('/hero-min.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "media",
};

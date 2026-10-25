/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00A878",
        navy: "#071E3B",
        background: "#F5F8FC",
      },
    },
  },
  plugins: [],
};

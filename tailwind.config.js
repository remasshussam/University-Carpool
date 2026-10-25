module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1A9A4A",
        navy: "#0B3C4D",
      },
    },
  },
  plugins: [],
};
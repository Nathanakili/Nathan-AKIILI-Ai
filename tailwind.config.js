module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A84FF",
        accent: "#6C63FF",
        glass: "rgba(255,255,255,0.06)"
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
}

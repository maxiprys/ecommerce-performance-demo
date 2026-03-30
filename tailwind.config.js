module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B",
        secondary: "#64748B",
        tertiary: "#FF6F61",
        neutral: "#F8FAFC",
      },
      // opcional: sombras suaves o transiciones que combinen
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        md: "0.5rem",
      },
    },
  },
  plugins: [],
};
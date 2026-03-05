module.exports = {
  content: ["./index.html", "./scripts/**/*.js"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "769px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      animation: {
        testspin: "testspin 5s linear infinite",
      },
      keyframes: {
        testspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
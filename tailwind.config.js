module.exports = {
  content: ["./index.html", "./scripts/**/*.js"],
  theme: {
    screens: {
      sm: "640px",
      md: { raw: "(min-width: 1025px), (min-width: 769px) and (orientation: landscape)" },
      lg: { raw: "(min-width: 1025px), (min-width: 769px) and (orientation: landscape)" },
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        orange: {
          400: "#FF5733",
          500: "#FF5733",
          600: "#FF5733",
        },
      },
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

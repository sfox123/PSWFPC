/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        footer: "repeat(6, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        footer: "repeat(2, minmax(0, 1fr))",
      },
      animation: {
        scroll: "scroll 25s linear infinite",
      },
      colors: {
        primary: "#ff4500",
        secondary: {
          100: "#e2e2d5",
          200: "#888883",
        },
        jetblack: "#434343",
      },
    },
  },
  plugins: [],
};

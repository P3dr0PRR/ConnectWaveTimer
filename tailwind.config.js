/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono"', "monospace"],
      },
      backgroundImage: {
        "tcpi-gradient": "linear-gradient(#6d94bf, #446e9b 50%, #3e648d)",
        "tcpi-gradient-hover": "linear-gradient(#5a7ca2, #516e99 50%, #385a7f)",
      },
      colors: {
        tcpi: {
          100: "#7c9fc5",
          200: "#7396bc",
          300: "#6b8dbc",
          400: "#6285ad",
          500: "#5a7ca2",
          600: "#516e99",
          700: "#49698f",
          800: "#406281",
          900: "#385a7f",
          DEFAULT: "#557aa1",
        },
      },
      width: {
        30: "9rem",
      },
    },
  },
  plugins: [],
};

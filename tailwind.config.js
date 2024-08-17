import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      "mid-tab": { max: "400px" },
      ...defaultTheme.screens,
    },
    boxShadow: {
      custom: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
      ...defaultTheme.boxShadow,
    },
  },
  plugins: [],
};

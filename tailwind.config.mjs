/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#91A7BC",
          lighter: "#C8D3DD",
          "lightest-1": "#E9EDF2",
          "lightest-2": "#F4F6F8",
          dark: "#1A3C5B",
          darkest: "#11283C",
          DEFAULT: "#225079",
        },
        secondary: {
          light: "#C8EB5D",
          DEFAULT: "#AECC53",
        },
      },
    },
  },
  plugins: [],
};

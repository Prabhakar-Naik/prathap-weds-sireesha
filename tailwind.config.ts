import type { Config } from "tailwindcss";
const typography = require("@tailwindcss/typography");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography], // added typography plugin
  theme: {
    extend: {
      lineHeight: {
        15: "3.5rem",
      },
      colors: {
        primary: "#FFEFCD",
        secondary: "#A58E74",
        accent: "#E09132",
        text: "#424530",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
    },
  },
};
export default config;

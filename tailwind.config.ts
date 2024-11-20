import type { Config } from "tailwindcss";
const typography = require("@tailwindcss/typography");
const tailwindAnimate = require("tailwindcss-animate");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography, tailwindAnimate], // added typography plugin
  theme: {
    extend: {
      lineHeight: {
        15: "3.5rem",
      },
      colors: {
        primary: "#F5EFFF",
        secondary: "#DFCCFB",
        accent: "#EF9C66",
        text: "#624E88",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
      screens: {
        tall: { raw: "(min-height: 800px)" },
      },
    },
  },
};
export default config;

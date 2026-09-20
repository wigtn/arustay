import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#F2ECE3",
          100: "#EADFCC",
          200: "#D5C6B5",
          300: "#d9c6a7",
          400: "#c2a478",
          500: "#a88759",
          600: "#8c6e45",
          700: "#6f5637",
          800: "#53402a",
          900: "#382c1d",
        },
        ink: {
          DEFAULT: "#6B4B3E",
          soft: "#62564F",
          mute: "#62564F",
        },
        brown: { deep: "#4F372F" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gold: "#F5D10D",
          black: "#1A1A1A",
          dark: "#121212",
        },
        secondary: {
          gray: "#A0A0A0",
        }
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";
import typography from "@tailwindcss/typography";

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
          "gold-light": "#FDE68A",
          "gold-dark": "#C8A600",
          black: "#1A1A1A",
          dark: "#121212",
          surface: "#F8F6F3",
        },
        secondary: {
          gray: "#A0A0A0",
          "gray-dark": "#6B7280",
        }
      },
      boxShadow: {
        'gold': '0 4px 20px -4px rgba(245, 209, 13, 0.3)',
        'gold-lg': '0 8px 32px -4px rgba(245, 209, 13, 0.35)',
        'dark-lg': '0 8px 32px -4px rgba(0, 0, 0, 0.4)',
        'inner-gold': 'inset 0 1px 0 0 rgba(245, 209, 13, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-16px) rotate(1deg)' },
          '66%': { transform: 'translateY(8px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 209, 13, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 209, 13, 0.4)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), typography()],
}

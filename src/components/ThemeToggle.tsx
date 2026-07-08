"use client";

import React from "react";
import { useTheme } from "../lib/theme";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary-gray hover:text-primary-gold hover:bg-primary-gold/10 transition-all duration-200 border border-transparent hover:border-primary-gold/20"
    >
      {theme === "dark" ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
    </button>
  );
}

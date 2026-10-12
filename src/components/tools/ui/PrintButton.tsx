"use client";

import React from "react";
import { FaPrint } from "react-icons/fa";

interface PrintButtonProps {
  label?: string;
}

/** Prints the current page. Used by checklist-style tools. */
export default function PrintButton({ label = "Print this page" }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-primary-gold/40 transition-colors print:hidden"
    >
      <FaPrint className="text-primary-gold" />
      {label}
    </button>
  );
}

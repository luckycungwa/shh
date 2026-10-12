"use client";

import React from "react";

interface YesNoChipsProps {
  value: string;
  onChange: (value: string) => void;
  yesLabel?: string;
  noLabel?: string;
  disabled?: boolean;
}

/**
 * Yes/No control. Answers stay as plain strings so each tool can store them in
 * its own answer object without a shared boolean convention.
 */
export default function YesNoChips({
  value,
  onChange,
  yesLabel = "Yes",
  noLabel = "No",
  disabled,
}: YesNoChipsProps) {
  const options: [string, string][] = [
    ["yes", yesLabel],
    ["no", noLabel],
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([val, label]) => (
        <button
          key={val}
          type="button"
          disabled={disabled}
          aria-pressed={value === val}
          onClick={() => onChange(val)}
          className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors disabled:opacity-50 ${
            value === val
              ? "bg-primary-black text-white border-primary-black dark:bg-primary-gold dark:text-primary-black dark:border-primary-gold"
              : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

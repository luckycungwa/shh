"use client";

import React from "react";

interface MoneyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  autoFocus?: boolean;
}

/**
 * Rand amount field. Keeps the raw string in state so a partially typed figure
 * is not rewritten under the user's cursor, and clamps input to digits.
 */
export default function MoneyInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
  autoFocus,
}: MoneyInputProps) {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-bold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-primary-gold">
        <span className="pl-4 text-sm text-gray-400">R</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoFocus={autoFocus}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
          className="w-full bg-transparent px-2 py-3 text-sm text-gray-900 dark:text-white focus:outline-none"
        />
      </div>
      {hint && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
}

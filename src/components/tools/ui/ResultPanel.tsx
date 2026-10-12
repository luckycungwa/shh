import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaSearch } from "react-icons/fa";

export type ResultTone = "info" | "check" | "warn";

interface ResultPanelProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  tone?: ResultTone;
  /** Bullet points under the body, e.g. the reasons behind a verdict. */
  findings?: { label: string; verdict: string; detail?: string }[];
  children?: React.ReactNode;
}

const TONE_STYLES: Record<ResultTone, string> = {
  info: "border-primary-gold/30 bg-primary-gold/5",
  check: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10",
  warn: "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10",
};

const TONE_ICONS: Record<ResultTone, React.ElementType> = {
  info: FaSearch,
  check: FaCheckCircle,
  warn: FaExclamationTriangle,
};

/**
 * Tool output panel. The tone colours and icons are the same ones the existing
 * tools already use, so results read consistently across the site.
 */
export default function ResultPanel({ title, body, tone = "info", findings, children }: ResultPanelProps) {
  const Icon = TONE_ICONS[tone];

  return (
    <div className={`space-y-4 rounded-2xl border p-5 ${TONE_STYLES[tone]}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 flex-shrink-0 text-primary-gold" />
        <div className="space-y-2">
          <p className="font-black text-lg text-gray-900 dark:text-white">{title}</p>
          {body && <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>}
        </div>
      </div>

      {findings && findings.length > 0 && (
        <ul className="space-y-2 pl-8">
          {findings.map((f) => (
            <li key={f.label} className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-800 dark:text-gray-200">{f.label}:</span> {f.verdict}
              {f.detail && <span className="block text-xs text-gray-500 dark:text-gray-500">{f.detail}</span>}
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}

/** Small note used under a result to say what the tool could not check. */
export function ResultNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
      <FaInfoCircle className="mt-0.5 flex-shrink-0" />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { FaCalculator, FaExclamationCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { getFact } from "../../lib/canonical-facts";

const factOrNull = (key: string): string | null => {
  const raw = getFact(key);
  return raw.startsWith("{{") || raw.trim() === "" ? null : raw;
};

const daysOrNull = (key: string): number | null => {
  const raw = factOrNull(key);
  if (raw === null) return null;
  const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};

const APPEAL_WINDOW_DAYS = daysOrNull("appeal_lodgement_window_days");
const HELPLINE = factOrNull("sassa_helpline");

type AppealResult = {
  deadline: string;
  daysLeft: number;
  passed: boolean;
  windowDays: number;
};

export default function AppealDeadlineCalculator() {
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<AppealResult | null>(null);

  const compute = () => {
    if (APPEAL_WINDOW_DAYS === null || !dateStr) return;
    const decline = new Date(dateStr + "T00:00:00");
    if (isNaN(decline.getTime())) return;
    const deadline = new Date(decline);
    deadline.setDate(decline.getDate() + APPEAL_WINDOW_DAYS);
    const now = new Date();
    const msPerDay = 86_400_000;
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / msPerDay);
    setResult({
      deadline: deadline.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }),
      daysLeft,
      passed: daysLeft < 0,
      windowDays: APPEAL_WINDOW_DAYS,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary-gold/10 p-2 rounded-xl">
          <FaCalculator className="text-primary-gold text-xl" />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">SRD Appeal Deadline Calculator</h2>
      </div>

      {APPEAL_WINDOW_DAYS === null ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Our verified data does not currently include the appeal window, so this calculator cannot work out a
          deadline. Confirm the deadline on the official SRD appeals portal before relying on any date.
        </p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          An SRD appeal must be lodged within {APPEAL_WINDOW_DAYS} days of the decision. Enter the decision date
          to see the estimated last day to appeal. This is a guide only - always confirm on the official SRD
          appeals portal.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
        <button
          onClick={compute}
          disabled={APPEAL_WINDOW_DAYS === null}
          className="bg-primary-black text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div
          className={
            result.passed
              ? "flex items-start gap-3 p-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
              : "flex items-start gap-3 p-4 rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
          }
        >
          {result.passed ? (
            <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
          ) : (
            <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <p className="font-bold text-gray-900 dark:text-white">
              {result.passed
                ? `Your ${result.windowDays}-day appeal window has likely closed`
                : `You have about ${result.daysLeft} day${result.daysLeft === 1 ? "" : "s"} left to appeal`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Estimated last day to appeal: <strong>{result.deadline}</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <FaInfoCircle /> {result.passed
                ? `The SRD rules do not provide a late-appeal route. Apply again for a later month if you qualify${HELPLINE ? `, or contact SASSA on ${HELPLINE}` : ""}.`
                : "The portal enforces the cutoff. Do not wait until the last day in case the portal is unavailable."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

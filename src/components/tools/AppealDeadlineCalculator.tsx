"use client";

import React, { useState } from "react";
import { FaCalculator, FaExclamationCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

// Honest appeal-deadline estimator. SRD appeals must generally be submitted
// within 30 days of the decline decision. No data leaves the browser.
export default function AppealDeadlineCalculator() {
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<{ deadline: string; daysLeft: number; passed: boolean } | null>(null);

  const compute = () => {
    if (!dateStr) return;
    const decline = new Date(dateStr + "T00:00:00");
    if (isNaN(decline.getTime())) return;
    const deadline = new Date(decline);
    deadline.setDate(decline.getDate() + 30);
    const now = new Date();
    const msPerDay = 86_400_000;
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / msPerDay);
    setResult({
      deadline: deadline.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }),
      daysLeft,
      passed: daysLeft < 0,
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

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        SRD appeals must generally be submitted within 30 days of the decline decision. Enter the date your
        application was declined to see your estimated last day to appeal. This is a guide only — always confirm
        on the official SRD appeals portal.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
        <button
          onClick={compute}
          className="bg-primary-black text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors"
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
                ? "Your 30-day appeal window has likely closed"
                : `You have about ${result.daysLeft} day${result.daysLeft === 1 ? "" : "s"} left to appeal`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Estimated last day to appeal: <strong>{result.deadline}</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <FaInfoCircle /> If the window has closed, contact SASSA on 0800 60 10 11 — in limited cases late
              appeals may still be considered.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

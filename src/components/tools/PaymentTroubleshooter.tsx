"use client";

import React, { useState } from "react";
import { FaSearch, FaArrowRight, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

type Status = "" | "approved" | "pending" | "declined" | "unsure";
type HasPayDay = "" | "yes" | "no";
type Passed = "" | "yes" | "no";

// Guided, honest diagnostic for a missing SRD payment. Recommends real actions
// (wait 2-5 business days, check portal, contact SASSA, appeal) without any
// financial or affiliate advice.
export default function PaymentTroubleshooter() {
  const [status, setStatus] = useState<Status>("");
  const [hasPayDay, setHasPayDay] = useState<HasPayDay>("");
  const [passed, setPassed] = useState<Passed>("");
  const [days, setDays] = useState<string>("");

  const reset = () => {
    setStatus("");
    setHasPayDay("");
    setPassed("");
    setDays("");
  };

  let advice: { title: string; body: string; tone: "info" | "warn" | "ok" } | null = null;

  if (status === "declined") {
    advice = {
      tone: "warn",
      title: "Your application was declined",
      body: "You can appeal within 30 days of the decline on the official SRD appeals portal (srd.sassa.gov.za/appeals). Check our appeal guide for step-by-step help.",
    };
  } else if (status === "pending") {
    advice = {
      tone: "info",
      title: "Still pending — no action needed yet",
      body: "Pending means SASSA is still verifying your information. If it has been pending for more than 30 days, contact SASSA on 0800 60 10 11.",
    };
  } else if (status === "approved") {
    if (hasPayDay === "no") {
      advice = {
        tone: "info",
        title: "Approved, but no Pay Day yet",
        body: "A Pay Day date is usually assigned later in the month. Check the portal again after the 20th. Your money is safe once a date appears.",
      };
    } else if (hasPayDay === "yes") {
      if (passed === "no") {
        advice = {
          tone: "ok",
          title: "Pay Day is still in the future",
          body: "Your payment is scheduled. SASSA pays in batches across the last week of the month — your date is when the money should land.",
        };
      } else if (passed === "yes") {
        const d = parseInt(days, 10);
        if (!isNaN(d) && d < 5) {
          advice = {
            tone: "ok",
            title: "Give it a few business days",
            body: "Banks and Postbank can take 2–5 business days to reflect a payment after the Pay Day. Check again in a day or two before contacting anyone.",
          };
        } else {
          advice = {
            tone: "warn",
            title: "It has been 5+ days — time to act",
            body: "If your status says Paid but the money has not arrived after 5 business days, confirm the bank details on your application, then contact SASSA on 0800 60 10 11 with your ID number ready.",
          };
        }
      }
    }
  } else if (status === "unsure") {
    advice = {
      tone: "info",
      title: "First, check your real status",
      body: "Before troubleshooting, check your current SRD status on the official portal or via USSD (*120*69277#). The status message tells you what to do next.",
    };
  }

  const toneClass =
    advice?.tone === "warn"
      ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10"
      : advice?.tone === "ok"
      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
      : "border-primary-gold/30 bg-primary-gold/5";

  const ToneIcon = advice?.tone === "warn" ? FaExclamationTriangle : advice?.tone === "ok" ? FaCheckCircle : FaSearch;

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary-gold/10 p-2 rounded-xl">
          <FaSearch className="text-primary-gold text-xl" />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">Missing Payment Troubleshooter</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">1. What is your current SRD status?</p>
          <div className="flex flex-wrap gap-2">
            {([
              ["approved", "Approved"],
              ["pending", "Pending"],
              ["declined", "Declined"],
              ["unsure", "Not sure"],
            ] as [Status, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setStatus(val); setHasPayDay(""); setPassed(""); setDays(""); }}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                  status === val
                    ? "bg-primary-black text-white border-primary-black"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {status === "approved" && (
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">2. Do you have a Pay Day date?</p>
            <div className="flex flex-wrap gap-2">
              {([
                ["yes", "Yes"],
                ["no", "No"],
              ] as [HasPayDay, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => { setHasPayDay(val); setPassed(""); setDays(""); }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    hasPayDay === val
                      ? "bg-primary-black text-white border-primary-black"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === "approved" && hasPayDay === "yes" && (
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">3. Has that Pay Day passed?</p>
            <div className="flex flex-wrap gap-2">
              {([
                ["yes", "Yes"],
                ["no", "No"],
              ] as [Passed, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => { setPassed(val); setDays(""); }}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    passed === val
                      ? "bg-primary-black text-white border-primary-black"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === "approved" && hasPayDay === "yes" && passed === "yes" && (
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              4. How many business days since the Pay Day?
            </p>
            <input
              type="number"
              min={0}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="e.g. 3"
              className="w-32 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
            />
          </div>
        )}
      </div>

      {advice && (
        <div className={`flex items-start gap-3 p-4 rounded-2xl border ${toneClass}`}>
          <ToneIcon className="text-primary-gold mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{advice.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{advice.body}</p>
          </div>
        </div>
      )}

      {(status || hasPayDay || passed || days) && (
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-gold transition-colors"
        >
          <FaArrowRight className="rotate-180" /> Start over
        </button>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import { getFact } from "../../lib/canonical-facts";
import { ResultPanel, ResultNote } from "./ui";

// The fraud hotline and the official status channels come from
// canonical-facts.json so this tool can never disagree with the rest of the
// site; a missing fact drops the sentence rather than showing a placeholder.
const factOrNull = (key: string): string | null => {
  const raw = getFact(key);
  return raw.startsWith("{{") || raw.trim() === "" ? null : raw;
};

const HELPLINE = factOrNull("sassa_helpline");
const HELPLINE_TEL = HELPLINE ? `tel:${HELPLINE.replace(/[^\d+]/g, "")}` : null;
const USSD = factOrNull("ussd_srd_status");
const SRD_HOST = factOrNull("srd_portal_url")?.replace(/^https?:\/\//, "") ?? null;

interface Signal {
  id: string;
  label: string;
  why: string;
  test: RegExp;
}

/**
 * Deterministic pattern checks, not a verdict. Every sign here is drawn from the
 * guidance SASSA and the South African Government publish about grant scams.
 * The tool never says a message is genuine and never accuses anyone — it lists
 * the patterns it found and what to do about them.
 */
const SIGNALS: Signal[] = [
  {
    id: "payment",
    label: "Asks for money or a fee",
    why: "SASSA applications and payments are free. Nobody may charge you to release, speed up or process a grant.",
    test: /\b(pay|payment|paying|fee|fees|deposit|e-?wallet|admin fee|processing fee|release fee|clearance fee)\b/i,
  },
  {
    id: "suspicious-link",
    label: "A link or web address that is not on an official .gov.za site",
    why: "Official SASSA pages live on a .gov.za address only (sassa.gov.za, srd.sassa.gov.za). Impersonation sites use names that sound official but are not government addresses.",
    test: /(https?:\/\/(?![^\s/]*\.gov\.za)|www\.(?!sassa\.gov\.za)|bit\.ly|tinyurl\.com|t\.me\/|\b[\w-]+\.(?:co\.za|com|net|org|info|site|online|xyz)\b)/i,
  },
  {
    id: "personal-info",
    label: "Asks for a PIN, OTP, password or banking details",
    why: "SASSA and Postbank never ask for your card PIN, a one-time PIN, your password or your banking details in a message.",
    test: /\b(pin|otp|one[- ]?time (?:pin|password)|password|cvv|card number|account number|banking details|bank details|verify your (?:details|account|identity)|confirm your (?:details|identity))\b/i,
  },
  {
    id: "urgency",
    label: "Creates urgency or threatens suspension",
    why: "Real grant processes do not run to a deadline set in a message. Pressure to act immediately is a common scam tactic.",
    test: /\b(urgent(?:ly)?|immediately|act now|final (?:warning|notice)|last chance|expir(?:es|ing|e)|before (?:midnight|the deadline|\d)|within \d+ (?:hours?|days?)|today only|hurry|suspended|cancell?ed|lose your grant|cut off)\b/i,
  },
  {
    id: "extra-payment",
    label: "Promises extra or double payment",
    why: "Grant amounts change only when announced in the Budget. Extra or double payments are never released through an SMS or message.",
    test: /\b(double|extra|bonus|top[- ]?up|once[- ]?off|increase your grant|back[- ]?pay|additional (?:payment|grant|amount))\b/i,
  },
  {
    id: "threat",
    label: "Threatens arrest, court or blacklisting",
    why: "SASSA does not threaten beneficiaries by message. Warnings of arrest, summons or blacklisting are used to frighten you into paying or sharing information.",
    test: /\b(arrest(?:ed)?|police case|legal action|court|summons|blacklist(?:ed|ing)?)\b/i,
  },
];

export default function ScamMessageChecker() {
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const text = message.trim();
  const matched = showResult ? SIGNALS.filter((s) => s.test.test(text)) : [];

  const tone = matched.length === 0 ? "info" : "warn";
  const title =
    matched.length === 0
      ? "No common scam signs found in this text"
      : matched.length === 1
        ? "1 possible scam sign found"
        : `${matched.length} possible scam signs found`;

  const body =
    matched.length === 0
      ? "Nothing in this text matches the common patterns we check for. That is not proof the message is genuine — if you did not expect it, verify only through the official SASSA channels before you act."
      : "This message matches patterns that appear in reported SASSA scams. Treat it as unsafe until you confirm it through an official channel. Do not pay, do not click any link, and do not share your PIN, OTP or banking details.";

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary-gold/10 p-2 rounded-xl">
          <FaShieldAlt className="text-primary-gold text-xl" />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">Check a message</h2>
      </div>

      <div className="space-y-2">
        <label htmlFor="scam-message" className="text-sm font-bold text-gray-700 dark:text-gray-300">
          Paste the message you received
        </label>
        <textarea
          id="scam-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste the SMS, WhatsApp or email text here. Nothing you type leaves your browser."
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowResult(true)}
        disabled={text === ""}
        className="w-full sm:w-auto bg-primary-black text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Check this message
      </button>

      {showResult && (
        <div className="space-y-4">
          <ResultPanel
            tone={tone}
            title={title}
            body={body}
            findings={matched.map((s) => ({ label: s.label, verdict: "Found", detail: s.why }))}
          >
            <div className="space-y-2 rounded-2xl bg-white/60 dark:bg-gray-900/40 p-4">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">What to do now</p>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0 text-primary-gold" />
                  <span>
                    Check your real status only on the official channels
                    {SRD_HOST ? ` — the SRD portal (${SRD_HOST})` : ""}
                    {USSD ? ` or USSD ${USSD}` : ""}
                    {HELPLINE ? `, or the SASSA helpline on ${HELPLINE}` : ""}.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-0.5 flex-shrink-0 text-primary-gold" />
                  <span>
                    Report suspected fraud
                    {HELPLINE ? (
                      <>
                        {" "}
                        to the SASSA fraud hotline on{" "}
                        <a href={HELPLINE_TEL ?? undefined} className="font-bold text-primary-gold hover:underline">
                          {HELPLINE}
                        </a>
                      </>
                    ) : (
                      " to the SASSA fraud hotline"
                    )}{" "}
                    — you can report anonymously. See{" "}
                    <NextLink href="/scam-alert" className="font-bold text-primary-gold hover:underline">
                      how to report a scam
                    </NextLink>
                    .
                  </span>
                </li>
              </ul>
            </div>
          </ResultPanel>

          <ResultNote>
            This is a pattern check on the words in your message, not a fraud investigation. It cannot
            confirm a message is genuine, and it cannot see links, attachments or who really sent it. A real
            SASSA message can still look unusual — judge it by the official channels, not by this result.
          </ResultNote>
        </div>
      )}

      {!showResult && (
        <p className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaInfoCircle className="mt-0.5 flex-shrink-0 text-primary-gold" />
          <span>
            The check looks for {SIGNALS.length} patterns that appear in reported SASSA scams — money requests,
            suspicious links, requests for a PIN or OTP, urgency, promises of extra payment and threats. It does
            not send your message anywhere.
          </span>
        </p>
      )}

      {showResult && matched.length === 0 && (
        <p className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaExclamationTriangle className="mt-0.5 flex-shrink-0 text-primary-gold" />
          <span>No result from this tool says a message is safe. Only an official channel can confirm your status.</span>
        </p>
      )}
    </div>
  );
}

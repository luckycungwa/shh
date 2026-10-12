import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { FaExclamationTriangle } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import ToolShell from "../../../components/tools/ui/ToolShell";
import ScamMessageChecker from "../../../components/tools/ScamMessageChecker";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { getFact } from "../../../lib/canonical-facts";

// Contact details and the official status channels come from
// canonical-facts.json so this page can never disagree with the other tools; a
// missing fact drops the sentence rather than surfacing a placeholder.
const factOrNull = (key: string): string | null => {
  const raw = getFact(key);
  return raw.startsWith("{{") || raw.trim() === "" ? null : raw;
};

const HELPLINE = factOrNull("sassa_helpline");
const USSD = factOrNull("ussd_srd_status");
const SRD_HOST = factOrNull("srd_portal_url")?.replace(/^https?:\/\//, "") ?? null;

export const metadata: Metadata = buildMetadata({
  title: "SASSA Scam Message Checker (2026)",
  description:
    "Paste a suspicious SASSA SMS, WhatsApp or email and see the patterns found in reported scams. Free, independent and nothing you type leaves your browser.",
  path: "/tools/scam-message-checker",
});

const faqs = [
  {
    q: "Will SASSA ever ask me to pay for a grant?",
    a: `No. Applying for and receiving a SASSA grant is free, and Postbank does not charge you to activate or replace a card. Anyone who asks for a fee to release or speed up a payment is running a scam and should be reported to the SASSA fraud hotline${HELPLINE ? ` on ${HELPLINE}` : ""}.`,
  },
  {
    q: "How do I report a SASSA scam or fraud?",
    a: `Report it to the SASSA fraud hotline${HELPLINE ? ` on ${HELPLINE}` : ""} — you can stay anonymous. If identity theft or card misuse is involved, also report it at your nearest police station (SAPS). Our scam alerts page has the full steps.`,
  },
  {
    q: "Can this tool tell me whether a SASSA message is real?",
    a: "No. It checks the words in a message against patterns found in reported scams. It cannot see links or attachments, who really sent the message, or whether a claim is true. Use it to decide what to check, then confirm only through official SASSA channels.",
  },
  {
    q: "How can I confirm my SRD or grant status safely?",
    a: `Check your status only on the official channels${SRD_HOST ? ` — the SRD portal (${SRD_HOST})` : ""}${USSD ? `, by USSD ${USSD}` : ""}, or by contacting SASSA directly. Never confirm your status by clicking a link in an SMS.`,
  },
];

interface RedFlag {
  id: string;
  title: string;
  description: string;
}

interface RedFlagsContent {
  title: string;
  intro: string;
  flags: RedFlag[];
}

interface KnownScam {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: string;
  reportedDate: string;
  indicators: string[];
}

export default function ScamMessageCheckerPage() {
  const prevention = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public/data/scamPrevention.json"), "utf8")
  ) as { redFlags: RedFlagsContent };
  const known = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public/data/newScams.json"), "utf8")
  ) as KnownScam[];
  const recent = [...known].sort((a, b) => b.reportedDate.localeCompare(a.reportedDate));

  return (
    <ToolShell
      title="Scam Message Checker"
      intro={
        <>
          Received a message about your SASSA grant that does not feel right? Paste it below to see which
          patterns found in reported scams appear in the text. It is free, independent, and nothing you type
          leaves your browser.
        </>
      }
      path="/tools/scam-message-checker"
      schema={
        <>
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", slug: "/" },
              { name: "Tools", slug: "/tools" },
              { name: "Scam Message Checker", slug: "/tools/scam-message-checker" },
            ])}
          />
          <JsonLd data={faqPageSchema(faqs)} />
        </>
      }
      disclaimer={
        <>
          This tool checks the words in a message against patterns found in reported SASSA scams. It is not a
          fraud investigation, it cannot confirm whether a message is real, and it is not affiliated with SASSA.
          Confirm everything through the official SASSA channels.
        </>
      }
      nextSteps={[
        {
          title: "Scam and fraud alerts",
          url: "/scam-alert",
          description: "The latest schemes circulating and the steps to report them.",
        },
        {
          title: "SASSA contact details",
          url: "/contact",
          description: "Official phone numbers, offices and the online portals.",
        },
      ]}
    >
      <div className="space-y-10">
        <ScamMessageChecker />

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Common red flags</h2>
          <p className="text-gray-600 dark:text-gray-400">{prevention.redFlags.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevention.redFlags.flags.map((flag) => (
              <div
                key={flag.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-1"
              >
                <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaExclamationTriangle className="flex-shrink-0 text-primary-gold" /> {flag.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{flag.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Recently reported scam patterns</h2>
          <p className="text-gray-600 dark:text-gray-400">
            These are patterns reported during 2026. Read them before you act on any message about your grant.
          </p>
          <div className="space-y-4">
            {recent.map((scam) => (
              <div
                key={scam.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{scam.title}</h3>
                  <span
                    className={`flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase ${
                      scam.severity === "critical"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}
                  >
                    {scam.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{scam.description}</p>
                {scam.indicators.length > 0 && (
                  <>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 pt-1">Signs to look for</p>
                    <ul className="space-y-1">
                      {scam.indicators.map((indicator) => (
                        <li
                          key={indicator}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-gold" />
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </ToolShell>
  );
}

import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import StatusMeaningExplorer, { type ExplorerStatus } from "../../../components/tools/StatusMeaningExplorer";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { getFact } from "../../../lib/canonical-facts";

// Appeal windows and contact details come from canonical-facts.json so this
// page never disagrees with the appeal deadline tool; a missing fact renders
// without a number rather than a placeholder.
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
const APPEALS_PORTAL_HOST = factOrNull("appeals_portal_url")?.replace(/^https?:\/\//, "") ?? null;
const APPEALS_PORTAL_REF = APPEALS_PORTAL_HOST ? ` (${APPEALS_PORTAL_HOST})` : "";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Status Meaning Explorer (2026)",
  description: "What does your SASSA or SRD status mean? Look up Approved, Pending, Declined, Bank Details Pending and more — with the right next step.",
  path: "/tools/status-explorer",
});

const DECLINED_FAQ =
  APPEAL_WINDOW_DAYS !== null
    ? `Your application did not pass the check for this month (often the income threshold). You can appeal within ${APPEAL_WINDOW_DAYS} days on the official SASSA SRD Appeals Portal${APPEALS_PORTAL_REF} if you disagree.`
    : "Your application did not pass the check for this month (often the income threshold). You can appeal on the official SASSA SRD Appeals Portal if you disagree with the decision.";

const faqs = [
  { q: "What does 'Approved' mean for my SRD grant?", a: "Approved means you qualified for this month's payment. Check your Pay Day date — money is usually released in the last week of the month." },
  { q: "What does 'Pending' mean?", a: `Pending means SASSA is still verifying your details for the current month. No action needed unless it has been pending for more than 30 days${HELPLINE ? ` — then contact SASSA on ${HELPLINE}` : ""}.` },
  { q: "What does 'Bank Details Pending' mean?", a: "SASSA cannot pay you because your banking details are unverified or rejected. Update them on srd.sassa.gov.za and wait for verification." },
  { q: "What does 'Declined' mean?", a: DECLINED_FAQ },
];

interface StatusMeaningRow {
  slug: string;
  status_label: string;
  what_it_means: string;
  how_to_fix?: { title: string; content: string }[];
}

// Short plain-English preview for the explorer card; the full text lives on
// the status guide page itself.
const preview = (text: string): string => {
  const t = (text || "").trim();
  if (t.length <= 220) return t;
  const cut = t.slice(0, 220);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return stop > 100 ? cut.slice(0, stop + 1) : `${cut.trimEnd()}…`;
};

function loadStatuses(): ExplorerStatus[] {
  const rows: StatusMeaningRow[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public/data/status-meanings.json"), "utf8")
  );
  return rows
    .map((r) => ({
      slug: r.slug,
      label: r.status_label,
      meaning: preview(r.what_it_means),
      fixes: (r.how_to_fix ?? []).filter((f) => f && f.title && f.content),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export default function StatusExplorerPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Tools", slug: "/tools" },
        { name: "Status Meaning Explorer", slug: "/tools/status-explorer" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <NextLink href="/status-check" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-gold transition-colors">
        <FaArrowLeft /> Back to status check
      </NextLink>

      <header className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight">SASSA Status Meaning Explorer</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Not sure what your status means? Select it to get a plain-English explanation and the right action to
          take next.
        </p>
      </header>

      <StatusMeaningExplorer statuses={loadStatuses()} />

      <p className="text-sm text-gray-400">
        For the complete breakdown of any status — including how long it lasts and who to contact — open the full
        guide linked under each status above.
      </p>

      <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <span className="font-bold text-gray-600 dark:text-gray-400">Related tools:</span>
        <NextLink href="/tools/payment-troubleshooter" className="font-bold text-primary-gold hover:underline">
          Missing payment troubleshooter
        </NextLink>
        <NextLink href="/payment-calendar" className="font-bold text-primary-gold hover:underline">
          Payment calendar
        </NextLink>
      </div>
    </div>
  );
}

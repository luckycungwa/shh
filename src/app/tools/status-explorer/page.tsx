import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import StatusMeaningExplorer from "../../../components/tools/StatusMeaningExplorer";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Status Meaning Explorer (2026)",
  description: "What does your SASSA or SRD status mean? Look up Approved, Pending, Declined, Bank Details Pending and more — with the right next step.",
  path: "/tools/status-explorer",
});

const faqs = [
  { q: "What does 'Approved' mean for my SRD grant?", a: "Approved means you qualified for this month's payment. Check your Pay Day date — money is usually released in the last week of the month." },
  { q: "What does 'Pending' mean?", a: "Pending means SASSA is still verifying your details for the current month. No action needed unless it has been pending for more than 30 days." },
  { q: "What does 'Bank Details Pending' mean?", a: "SASSA cannot pay you because your banking details are unverified or rejected. Update them on srd.sassa.gov.za and wait for verification." },
  { q: "What does 'Declined' mean?", a: "Your application did not pass the check for this month (often the income threshold). You can appeal within 30 days if you disagree." },
];

export default function StatusExplorerPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Tools", slug: "/tools/status-explorer" },
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

      <StatusMeaningExplorer />

      <p className="text-sm text-gray-400">
        For the complete breakdown of any status — including how long it lasts and who to contact — open the full
        guide linked under each status above.
      </p>
    </div>
  );
}
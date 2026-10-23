import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import AppealDeadlineCalculator from "../../../components/tools/AppealDeadlineCalculator";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { getFact } from "../../../lib/canonical-facts";

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
  title: "SRD Appeal Deadline Calculator (2026)",
  description: "Work out your last day to appeal a declined SRD grant. Free, independent tool - no data leaves your browser.",
  path: "/tools/appeal-deadline",
});

const faqs = [
  {
    q: "How long do I have to appeal a declined SRD grant?",
    a: APPEAL_WINDOW_DAYS !== null
      ? `You have ${APPEAL_WINDOW_DAYS} days from the date of the decision to lodge an appeal on the official SRD appeals portal${APPEALS_PORTAL_REF}. The portal enforces the cutoff, and the SRD rules do not provide a late-appeal route.`
      : "The appeal window for a declined SRD grant is set by regulation. Check the official SRD appeals portal for the deadline.",
  },
  {
    q: "What if I missed the appeal deadline?",
    a: `The SRD appeal rules say an appeal lodged after the 90-day period will not be considered. You cannot reopen that month by appeal. Submit a new SRD application for a later month if you still qualify${HELPLINE ? `, and contact SASSA on ${HELPLINE} if you need help` : ""}.`,
  },
  {
    q: "Where do I submit my appeal?",
    a: `Submit the appeal on the official SRD appeals portal${APPEALS_PORTAL_HOST ? ` at ${APPEALS_PORTAL_HOST}` : ""}. Enter your 13-digit ID number, the 10-digit phone number on your application and the 6-digit PIN sent to that phone.`,
  },
];

const headerLead =
  APPEAL_WINDOW_DAYS !== null
    ? `If your SRD application was declined, you have ${APPEAL_WINDOW_DAYS} days from the decision date to appeal. Use this tool to estimate your last day.`
    : "If your SRD application was declined, use this tool to estimate your appeal deadline.";

export default function AppealDeadlinePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Tools", slug: "/tools" },
        { name: "Appeal Deadline Calculator", slug: "/tools/appeal-deadline" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <NextLink href="/status-check" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-gold transition-colors">
        <FaArrowLeft /> Back to status check
      </NextLink>

      <header className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight">SRD Appeal Deadline Calculator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {headerLead}{" "}
          It is free, independent, and nothing you enter leaves your browser.
        </p>
      </header>

      <AppealDeadlineCalculator />

      <p className="text-sm text-gray-400">
        {APPEAL_WINDOW_DAYS !== null
          ? `This calculator estimates the ${APPEAL_WINDOW_DAYS}-day appeal window from the decision date.`
          : "This calculator estimates your appeal deadline from the official appeal window."}{" "}
        Always confirm the exact deadline on the official SRD appeals portal{APPEALS_PORTAL_REF}. SASSA Help Hub
        is an independent, unofficial resource.
      </p>

      <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <span className="font-bold text-gray-600 dark:text-gray-400">Related tools:</span>
        <NextLink href="/status/declined" className="font-bold text-primary-gold hover:underline">
          Find your decline reason &amp; fix
        </NextLink>
        <NextLink href="/appeals" className="font-bold text-primary-gold hover:underline">
          Full appeal guide
        </NextLink>
      </div>
    </div>
  );
}

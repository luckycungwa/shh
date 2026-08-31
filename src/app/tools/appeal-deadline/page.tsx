import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import AppealDeadlineCalculator from "../../../components/tools/AppealDeadlineCalculator";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "SRD Appeal Deadline Calculator (2026)",
  description: "Work out your last day to appeal a declined SRD R370 grant. Free, independent tool — no data leaves your browser.",
  path: "/tools/appeal-deadline",
});

const faqs = [
  { q: "How long do I have to appeal a declined SRD grant?", a: "You generally have 30 days from the date of the decline decision to submit an appeal on the official SRD appeals portal." },
  { q: "What if I missed the 30-day deadline?", a: "Contact SASSA on 0800 60 10 11 — in limited cases late appeals may still be considered, but this is not guaranteed." },
  { q: "Where do I submit my appeal?", a: "Submit your appeal on the official SRD appeals portal at srd.sassa.gov.za/appeals/appeal or visit a SASSA office." },
];

export default function AppealDeadlinePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Tools", slug: "/tools/status-explorer" },
        { name: "Appeal Deadline Calculator", slug: "/tools/appeal-deadline" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <NextLink href="/status-check" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-gold transition-colors">
        <FaArrowLeft /> Back to status check
      </NextLink>

      <header className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight">SRD Appeal Deadline Calculator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          If your SRD R370 application was declined, you usually have 30 days to appeal. Use this tool to estimate
          your deadline. It is free, independent, and nothing you enter leaves your browser.
        </p>
      </header>

      <AppealDeadlineCalculator />

      <p className="text-sm text-gray-400">
        This calculator gives an estimate based on a 30-day window. Always confirm the exact deadline on the
        official SRD appeals portal (srd.sassa.gov.za/appeals). SASSA Help Hub is an independent, unofficial
        resource.
      </p>
    </div>
  );
}
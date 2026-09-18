import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import PaymentTroubleshooter from "../../../components/tools/PaymentTroubleshooter";
import { buildMetadata } from "../../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Missing SASSA Payment Troubleshooter (2026)",
  description: "Why hasn't your SASSA or SRD payment arrived? Answer a few questions to see the most likely cause and what to do next.",
  path: "/tools/payment-troubleshooter",
});

const faqs = [
  { q: "My SRD status says Approved but I haven't been paid — why?", a: "An Approved status means you qualified, but the Pay Day date may not be assigned yet. Payments are released in batches during the last week of the month." },
  { q: "How long does it take for the money to reflect after Pay Day?", a: "Banks and Postbank typically take 1 to 3 business days to reflect the payment. If the money has not arrived after 3 business days, confirm your banking details and contact SASSA." },
  { q: "What if my banking details are wrong?", a: "Update your banking details on srd.sassa.gov.za. SASSA will verify them before the next payment run." },
];

export default function PaymentTroubleshooterPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Tools", slug: "/tools/status-explorer" },
        { name: "Payment Troubleshooter", slug: "/tools/payment-troubleshooter" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <NextLink href="/payment-calendar" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-gold transition-colors">
        <FaArrowLeft /> Back to payment calendar
      </NextLink>

      <header className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight">Missing Payment Troubleshooter</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Approved but no money? Work through a few quick questions to see the most likely reason and the right
          next step. This tool gives guidance only — it is not affiliated with SASSA.
        </p>
      </header>

      <PaymentTroubleshooter />

      <p className="text-sm text-gray-400">
        Payments can take 1 to 3 business days to reflect after your Pay Day. If you are still missing money after
        3 business days, confirm your banking details on the SRD portal and contact SASSA on 0800 60 10 11.
      </p>
    </div>
  );
}
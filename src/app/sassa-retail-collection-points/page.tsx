import React from "react";
import type { Metadata } from "next";
import { Chip, Divider } from "@/components/ui/nextui";
import { FaStore, FaShoppingCart, FaMobileAlt, FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { breadcrumbSchema, articleSchema, faqPageSchema } from "../../lib/schema";
import { getCurrentYearString } from "../../lib/config";
import NextStepCard from "../../components/affiliate/NextStepCard";

const currentYear = getCurrentYearString();
const lastUpdated = "2026-09-23";

export const metadata: Metadata = buildMetadata({
  title: `SASSA Grant Collection Points in ${currentYear}: Shoprite, Checkers, Pick n Pay & More`,
  description: `Where to collect your SASSA grant in ${currentYear}: Shoprite, Checkers, Pick n Pay, Boxer, Usave and Spar. How grantees collect at retail, SMS codes, and safety tips for payment day.`,
  path: "/sassa-retail-collection-points",
});

export default function RetailCollectionPointsPage() {
  const faqs = [
    {
      q: "Where can I collect my SASSA grant?",
      a: "You can collect your SASSA grant at a bank (if paid into a bank account) or at participating retail stores and Postbank service points. The main retail collection points are Shoprite, Checkers, Usave, Pick n Pay, Boxer and Spar, plus SASSA/Postbank pay points.",
    },
    {
      q: "Do I need SMS to collect my grant at Shoprite or Checkers?",
      a: "Yes. For retail collection you normally wait for the SMS with your collection code (and confirmation that your payment is available) before going to the store. Do not go to the store until you have received this SMS, to avoid wasted trips and long queues.",
    },
    {
      q: "Can I use a SASSA Gold Card or Postbank Black Card to pay at a shop?",
      a: "Yes, once your payment is loaded onto your card you can pay for purchases at the store. Note that the SASSA Gold Card stopped working after 31 August 2026 — every beneficiary now uses the free Postbank Black Card, which is still available at Postbank service points with your ID.",
    },
    {
      q: "What ID do I need to collect my grant at a retail point?",
      a: "You will need your original South African ID (or temporary ID) plus your SASSA/Postbank card if you collect on it. The store may ask you to provide your ID to verify you before releasing the cash.",
    },
  ];

  const stores = [
    { name: "Shoprite", note: "Pays out cash grants and accepts the SASSA/Postbank card for purchases." },
    { name: "Checkers", note: "Cash payout and card payments available at participating stores." },
    { name: "Pick n Pay", note: "Cash collection and card use at participating outlets." },
    { name: "Boxer", note: "Cash payout and card acceptance at Boxer stores." },
    { name: "Usave", note: "Cash collection available at participating Usave stores." },
    { name: "Spar", note: "Select Spar stores offer grant collection — check your local branch." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={articleSchema("SASSA Grant Retail Collection Points", "Where to collect your SASSA grant at Shoprite, Checkers, Pick n Pay, Boxer, Usave and Spar — plus SMS codes, ID rules and safety tips.", "/sassa-retail-collection-points", "Lucky Cungwa", lastUpdated)} />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Grant Collection Points", slug: "/sassa-retail-collection-points" },
      ])} />

      <header className="text-center mb-14 space-y-6">
        <Chip color="primary" variant="flat" className="font-bold uppercase">Collecting Your Grant</Chip>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Where to Collect Your SASSA Grant <span className="text-primary-gold">{currentYear}</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          You don&rsquo;t always need a bank — millions of grantees collect at retail stores. Here&rsquo;s how it works, which stores, and how to collect safely.
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-14">
        <div className="p-8 rounded-3xl bg-primary-gold/5 border border-primary-gold/20 mb-8">
          <h2 className="text-2xl font-black mb-3 flex items-center gap-2"><FaStore className="text-primary-gold" /> How Retail Collection Works</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            When you collect your grant at a retail point instead of a bank, SASSA loads your payment onto your SASSA/Postbank card. On your payment day, you go to a participating store and the cashier pays out your grant — or you use the card to pay for groceries directly.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            For cash payout you usually need your <strong>original ID</strong> and the <strong>SMS collection code</strong>. Only head to the store once you receive the SMS confirming your money is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary-gold/10 flex items-center justify-center text-primary-gold"><FaShoppingCart /></div>
                <h3 className="text-lg font-bold">{s.name}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="p-8 rounded-3xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2"><FaCheckCircle /> How to Collect — Step by Step</h3>
          <ol className="space-y-3 text-green-800 dark:text-green-300 leading-relaxed list-decimal pl-5">
            <li>Check your status on the official portal to confirm your &ldquo;Pay Day&rdquo; date.</li>
            <li>Wait for the <strong>SMS with your collection code</strong> — don&rsquo;t go to the store before it arrives.</li>
            <li>Take your <strong>original ID (or temporary ID)</strong> and your SASSA/Postbank card.</li>
            <li>Go to a participating store (Shoprite, Checkers, Pick n Pay, Boxer, Usave or Spar).</li>
            <li>Request your cash payout, or use your card to pay for your groceries.</li>
            <li>Take your money/card and receipt, count your cash before leaving the till.</li>
          </ol>
        </div>
        <div className="p-8 rounded-3xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-4 flex items-center gap-2"><FaExclamationTriangle /> Safety Tips on Payment Day</h3>
          <ul className="space-y-3 text-yellow-800 dark:text-yellow-300 leading-relaxed">
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Don&rsquo;t carry cash visibly, and avoid counting it in public.</li>
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Go with someone you trust, especially early in the month when queues are long.</li>
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Never hand your card or PIN to a stranger who offers to "help".</li>
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Avoid going immediately at opening time on payday — later in the day is usually quieter.</li>
          </ul>
        </div>
      </div>

      <div className="p-8 mb-12 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border-l-8 border-blue-500 max-w-4xl mx-auto">
        <h3 className="font-black text-blue-900 dark:text-blue-400 mb-2 text-xl flex items-center gap-2"><FaMobileAlt /> Don&rsquo;t Have Your SMS?</h3>
        <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
          If you have not received your collection SMS, your payment may not be ready yet, or the number on your application may be inactive. Check your status on the official portal first. If your phone number has changed, see our <NextLink href="/guides/lost-phone-number" className="underline font-bold">lost phone number guide</NextLink> before heading to a store.
        </p>
      </div>

      <NextStepCard
        pagePath="/sassa-retail-collection-points"
        items={[
          { title: "Check my payment dates", url: "/payment-calendar", description: "Know your Pay Day" },
          { title: "Check my SRD status", url: "/status-check", description: "Confirm approval and Pay Day" },
          { title: "About the Postbank Black Card", url: "/lost-sassa-card-or-id", description: "Gold Card migration & replacement" },
          { title: "Report a collection-point scam", url: "/scam-alert", description: "Stay safe at the till" },
        ]}
      />

      <section className="max-w-4xl mx-auto space-y-8 mt-16">
        <Divider />
        <div>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <p className="font-bold mb-2">{f.q}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
          Independent, unofficial guide. Store participation can vary by branch — confirm with your local store or SASSA before relying on a specific outlet. Last reviewed {lastUpdated}.
        </p>
      </section>
    </div>
  );
}

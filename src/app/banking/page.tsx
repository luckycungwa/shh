import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Chip, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { FaExternalLinkAlt, FaMoneyCheckAlt, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { faqPageSchema, breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Banking & Payment Methods — How to Receive Your Grant",
  description: "Learn how to receive your SASSA grant: bank transfer, Postbank, cash send at Shoprite, Checkers, Pick n Pay and Boxer, Capitec, TymeBank, eKYC verification, and updating your phone number.",
  path: "/banking",
});

interface BankingMethod {
  slug: string;
  provider: string;
  title: string;
  description: string;
}

function readAll(): BankingMethod[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/banking-methods.json"), "utf8"));
  } catch {
    return [];
  }
}

const categoryMeta: Record<string, { group: string; tag: string; summary: string }> = {
  "bank-transfer": { group: "Direct to Bank", tag: "Bank Account", summary: "Receive your grant directly into any major SA bank account." },
  postbank: { group: "Postbank", tag: "Postbank", summary: "SASSA's preferred payment partner — collect at Post Office or via cash send." },
  "cash-send-shoprite": { group: "Retail Cash Send", tag: "Cash Send", summary: "Collect in cash at any Shoprite store using your collection SMS." },
  "cash-send-checkers": { group: "Retail Cash Send", tag: "Cash Send", summary: "Collect in cash at any Checkers store using your collection SMS." },
  "cash-send-pick-n-pay": { group: "Retail Cash Send", tag: "Cash Send", summary: "Collect in cash at any Pick n Pay store using your collection SMS." },
  "cash-send-boxer": { group: "Retail Cash Send", tag: "Cash Send", summary: "Collect in cash at any Boxer store using your collection SMS." },
  capitec: { group: "Direct to Bank", tag: "Bank Account", summary: "Receive your grant into a Capitec bank account." },
  tymebank: { group: "Direct to Bank", tag: "Bank Account", summary: "Receive your grant into a free TymeBank account." },
  "ekyc-biometric": { group: "Verification", tag: "Verification", summary: "Complete your eKYC facial verification link to unlock your grant." },
  "update-phone-number": { group: "Verification", tag: "Update Details", summary: "Change or update your phone number on the SRD portal." },
};

const faqs = [
  { q: "Can I receive my SASSA grant in any bank account?", a: "Yes, as long as it is a South African bank account registered in your own name and the holder name matches your ID. All major banks — Absa, FNB, Standard Bank, Nedbank, Capitec, TymeBank and Postbank — can receive SASSA payments." },
  { q: "What is SASSA cash send?", a: "Cash send lets you collect your grant in cash at retail stores like Shoprite, Checkers, Pick n Pay, and Boxer. SASSA sends you an SMS with a collection code, and you present it with your ID at the store's money counter." },
  { q: "Why does my status say 'Bank Details Pending'?", a: "It means your application is approved in principle but SASSA cannot verify your banking details. Update your details on the SRD portal and verification usually completes within 3 to 7 working days." },
  { q: "Do I have to use Postbank?", a: "No. Postbank is SASSA's preferred partner, but you can choose any registered SA bank account or collect your grant via retail cash send at a participating store." },
];

export default function BankingHubPage() {
  const methods = readAll();
  const groups = ["Direct to Bank", "Postbank", "Retail Cash Send", "Verification"];
  const grouped = groups.map((g) => ({
    group: g,
    items: methods.filter((m) => categoryMeta[m.slug]?.group === g),
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Banking & Payments", slug: "/banking" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Banking & Payments</span>
      </nav>

      <header className="space-y-6 mb-12">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">Payment Guide</Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          SASSA Banking & Payment Methods
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          How you receive your SASSA grant matters. Choose a direct bank account, Postbank, or retail cash send,
          and learn how to update your details, verify your identity, and fix payment delays.
        </p>
      </header>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaInfoCircle className="text-primary-gold" /> Your payment options at a glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <p className="font-bold text-primary-gold flex items-center gap-2"><FaMoneyCheckAlt /> Bank Transfer</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Paid directly into your bank account. Fast and safe.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <p className="font-bold text-primary-gold flex items-center gap-2"><FaMoneyCheckAlt /> Retail Cash Send</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Collect cash at Shoprite, Checkers, Pick n Pay, or Boxer.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <p className="font-bold text-primary-gold flex items-center gap-2"><FaMoneyCheckAlt /> Postbank</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">SASSA's preferred partner — free account for benefits.</p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {grouped.map(({ group, items }) => (
          <section key={group}>
            <h2 className="text-2xl font-bold mb-6">{group}</h2>
            {items.length === 0 ? (
              <p className="text-gray-500">No entries in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((m) => (
                  <NextLink key={m.slug} href={`/banking/${m.slug}`} className="block group">
                    <Card className="p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/30">
                      <CardBody className="p-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <Chip color="primary" variant="flat" size="sm" className="font-bold uppercase text-xs">{categoryMeta[m.slug]?.tag}</Chip>
                          <FaExternalLinkAlt className="text-gray-300 group-hover:text-primary-gold transition-colors text-xs" />
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-primary-gold transition-colors">{m.provider}</h3>
                        <p className="text-sm text-gray-500">{categoryMeta[m.slug]?.summary || m.description}</p>
                      </CardBody>
                    </Card>
                  </NextLink>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <Divider className="my-16" />

      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-black text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-primary-gold flex items-start gap-3">
                <FaQuestionCircle className="mt-1 flex-shrink-0" /> {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-20">
        <Card className="bg-primary-black text-white p-12 rounded-[2rem]">
          <CardBody className="space-y-6">
            <h2 className="text-3xl font-black">Not Sure How to Receive Your Payment?</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Check your status first, then choose the payment method that works for you.</p>
            <Button as={NextLink} href="/status-check" color="primary" className="font-bold px-10 py-7 text-lg">Check SASSA Status</Button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

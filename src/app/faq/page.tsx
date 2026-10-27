import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Chip, Divider } from "@/components/ui/nextui";
import { FaQuestionCircle, FaSearch, FaExternalLinkAlt } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { resolveTemplates } from "../../lib/canonical-facts";
import { faqPageSchema } from "../../lib/schema";
import { getCurrentYearString } from "../../lib/config";

const curYear = getCurrentYearString();

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  linkedPage?: { label: string; url: string };
}

const CATEGORY_ORDER = [
  "SRD application",
  "SRD status",
  "payments",
  "banking",
  "appeals",
  "eligibility",
  "scams & security",
  "other grants",
];

const CATEGORY_LABELS: Record<string, string> = {
  "SRD application": "SRD Applications",
  "SRD status": "SRD Status & Checks",
  payments: "Payments & Amounts",
  banking: "Banking & Payment Methods",
  appeals: "Appeals",
  eligibility: "Eligibility & Documents",
  "scams & security": "Scams & Security",
  "other grants": "Other SASSA Grants",
};

export const metadata: Metadata = buildMetadata({
  title: "SASSA FAQ — Answers to Your Grant Questions",
  description: `Find answers to common questions about SASSA grants, payments, applications, appeals, and more. Updated for ${curYear}.`,
  path: "/faq",
});

export default function FAQPage() {
  const faqsPath = path.join(process.cwd(), "public/data/faqs.json");
  const faqs: FAQItem[] = JSON.parse(fs.readFileSync(faqsPath, "utf8"));

  const grouped = faqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
    const cat = faq.category || "other grants";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  const orderedCategories = CATEGORY_ORDER.filter(c => grouped[c]);

  const faqData = faqs.map(f => ({ q: resolveTemplates(f.question), a: resolveTemplates(f.answer) }));

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd data={faqPageSchema(faqData)} />

      <header className="text-center mb-12">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs mb-4">{faqs.length} Questions</Chip>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Everything you need to know about SASSA grants, payments, applications, appeals, and more. Our answers are updated regularly to reflect the latest {curYear} policy changes.
        </p>
      </header>

      <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-3xl border border-yellow-100 dark:border-yellow-800 mb-12 flex items-start gap-4">
        <FaSearch className="text-yellow-600 mt-1 flex-shrink-0" />
        <div>
          <p className="font-bold text-yellow-800 dark:text-yellow-400">How to use this FAQ</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
            Questions are grouped by category. Click any question to expand the answer. Use your browser&apos;s search (Ctrl+F or Cmd+F) to find specific topics quickly. If you cannot find your answer here, try our <NextLink href="/guides" className="underline font-bold">detailed guides</NextLink> or <NextLink href="/contact" className="underline font-bold">contact us</NextLink>.
          </p>
        </div>
      </div>

      <div className="space-y-16">
        {orderedCategories.map((category) => {
          const items = grouped[category];
          return (
          <section key={category} id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="scroll-mt-24">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-3xl font-bold">{CATEGORY_LABELS[category] || category}</h2>
              <Chip size="sm" variant="flat" color="primary">{items.length} questions</Chip>
            </div>
            <div className="space-y-4">
              {items.map((faq) => (
                <details
                  key={faq.id}
                  className="group border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all"
                >
                  <summary className="flex items-center gap-3 p-5 cursor-pointer list-none font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors [&::-webkit-details-marker]:hidden">
                    <FaQuestionCircle className="text-primary-gold flex-shrink-0" />
                    <span>{faq.question}</span>
                  </summary>
                  <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none"
                       dangerouslySetInnerHTML={{ __html: resolveTemplates(faq.answer).replace(/<h4(\s[^>]*)?>/gi, "<h3$1>").replace(/<\/h4>/gi, "</h3>") }}
                    />
                    {faq.linkedPage && (
                      <NextLink
                        href={faq.linkedPage.url}
                        className="inline-flex items-center gap-2 mt-4 text-primary-gold font-semibold underline"
                      >
                        {faq.linkedPage.label} <FaExternalLinkAlt className="text-xs" />
                      </NextLink>
                    )}
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {faq.tags.map((tag, i) => (
                          <Chip key={i} size="sm" variant="flat" className="text-[10px]">{tag}</Chip>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                      Last updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          );
        })}
      </div>

      <Divider className="my-16" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
        <Card className="bg-primary-black text-white p-8">
          <CardBody className="flex flex-col items-center text-center gap-4">
            <FaQuestionCircle className="text-4xl text-primary-gold" />
            <h3 className="text-xl font-bold">Did not find your answer?</h3>
            <p className="text-secondary-gray">I'm constantly updating this database with new {curYear} policy changes.</p>
            <a
              href="/contact"
              className="bg-primary-gold text-primary-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Ask a Question
            </a>
          </CardBody>
        </Card>
        <Card className="bg-primary-black text-white p-8">
          <CardBody className="flex flex-col items-center text-center gap-4">
            <FaExternalLinkAlt className="text-4xl text-primary-gold" />
            <h3 className="text-xl font-bold">Need Step-by-Step Help?</h3>
            <p className="text-secondary-gray">Our detailed guides walk you through applications, appeals, and banking updates.</p>
            <a
              href="/guides"
              className="bg-primary-gold text-primary-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Browse Guides
            </a>
          </CardBody>
        </Card>
      </section>

      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500">
          <strong>Editorial note:</strong> SASSA Help Hub is an independent, unofficial information resource and is not affiliated with the South African Social Security Agency.
          See our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink> and{" "}
          <NextLink href="/sources-policy" className="text-primary-gold underline">Sources Policy</NextLink>.
        </p>
      </div>
    </div>
  );
}

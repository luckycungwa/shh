import React from "react";
import type { Metadata } from "next";
import { Chip, Divider } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { buildSearchIndex } from "../../lib/search-index";
import type { SearchRecord } from "../../lib/search";
import { breadcrumbSchema, faqPageSchema } from "../../lib/schema";
import SearchBox from "../../components/tools/SearchBox";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Search SASSA Help Hub — Find Guides, Statuses & Payment Info",
    description: "Search all SASSA Help Hub guides, status meanings, decline reasons, banking methods, appeals, payment dates and FAQs in one place.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const index: SearchRecord[] = buildSearchIndex();
  const faqs = [
    { q: "How do I search the site?", a: "Type any keyword — for example 'appeal', 'bank details', 'payment date', 'SRD' or 'WhatsApp' — into the search box. Results appear instantly as you type." },
    { q: "What can I search for?", a: "You can search the full step-by-step guides, every grant status meaning, decline reasons, banking and payment methods, appeal steps, monthly payment dates, and the complete FAQ list." },
    { q: "The site is unofficial — is the info reliable?", a: "Content is researched and edited by humans and checked against official SASSA sources where available. Where we cannot confirm something, we clearly mark it as unverified or projected rather than presenting it as fact." },
  ];
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Search", slug: "/search" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Search</span>
      </nav>

      <header className="space-y-6 mb-10">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">
          <FaSearch className="mr-1" /> Site Search
        </Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Search SASSA Help Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Find guides, status meanings, decline reasons, banking methods, appeals, payment dates and FAQs in one place.
        </p>
      </header>

      <SearchBox index={index} />

      <Divider className="my-16" />

      <section className="space-y-8">
        <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-primary-gold">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

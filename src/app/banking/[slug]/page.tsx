import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Divider } from "@nextui-org/react";
import { FaClock, FaPhone, FaExternalLinkAlt, FaMoneyCheckAlt, FaStore, FaQuestionCircle } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import AffiliateCTA from "../../../components/affiliate/AffiliateCTA";
import NextStepCard from "../../../components/affiliate/NextStepCard";
import EntityLinks from "../../../components/EntityLinks";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema } from "../../../lib/schema";
import { nextStepsFor } from "../../../lib/entities";

interface BankingMethod {
  slug: string;
  provider: string;
  title: string;
  description: string;
  intro: string;
  how_it_works: string[];
  banks_supported?: { name: string; note: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  who_to_contact: { label: string; value: string }[];
  sources: string[];
  related: string[];
  has_cta: boolean;
  last_updated: string;
  author: string;
}

function readAll(): BankingMethod[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/banking-methods.json"), "utf8"));
}

export function generateStaticParams() {
  return readAll().map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const method = readAll().find((m) => m.slug === params.slug);
  if (!method) return { title: "Payment Method Not Found" };
  const url = `https://www.sassahelphub.co.za/banking/${params.slug}`;
  return {
    title: method.title,
    description: method.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: method.title,
      description: method.description,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: method.title,
      description: method.description,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default function BankingMethodPage({ params }: { params: { slug: string } }) {
  const method = readAll().find((m) => m.slug === params.slug);
  if (!method) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(method.title, method.description, `/banking/${method.slug}`, method.author, method.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Banking & Payment Methods", slug: "/banking" },
        { name: method.provider, slug: `/banking/${method.slug}` },
      ])} />
      <JsonLd data={howToSchema(method.title, method.description, method.steps)} />
      {method.faqs && method.faqs.length > 0 && (
        <JsonLd data={faqPageSchema(method.faqs)} />
      )}

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/banking" className="hover:text-primary-gold">Banking & Payments</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[250px]">{method.provider}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">
            Payment Method
          </Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{method.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{method.description}</p>
          <EditorialMeta lastVerified={method.last_updated} author={method.author} />
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <FaMoneyCheckAlt className="text-primary-gold" /> How This Payment Method Works
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{method.intro}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <ul className="space-y-4">
            {method.how_it_works.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {method.banks_supported && method.banks_supported.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Supported Payment Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {method.banks_supported.map((b, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-start gap-3">
                  <FaStore className="text-primary-gold mt-1" />
                  <div>
                    <p className="font-bold">{b.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{b.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Step-by-Step</h2>
          <div className="space-y-6">
            {method.steps.map((step, i) => (
              <div key={i} className="relative pl-12 border-l-2 border-gray-100 dark:border-gray-800 pb-2">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FaPhone className="text-primary-gold" /> Who To Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {method.who_to_contact.map((contact, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-sm">{contact.label}</p>
                <p className="text-primary-gold font-medium">{contact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {method.sources.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaExternalLinkAlt className="text-primary-gold" /> Sources & References
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This payment guide was researched and verified against the following official sources:
            </p>
            <ul className="space-y-4">
              {method.sources.map((url, i) => (
                <li key={i} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <span className="break-all">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary-gold">Visit Website</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {method.faqs && method.faqs.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaQuestionCircle className="text-primary-gold" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {method.faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-3 text-primary-gold">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <AdNetworkLoader />

        {method.has_cta && (
          <AffiliateCTA
            vertical="banking"
            pagePath={`/banking/${method.slug}`}
            title="Are you choosing a bank for your grant?"
            description="SASSA does not require a specific commercial bank. If you're comparing low-fee accounts available in South Africa, explore your options."
            ctaLabel="Compare bank accounts"
            placement="banking_bottom"
          />
        )}

        <NextStepCard
          pagePath={`/banking/${method.slug}`}
          items={
            (nextStepsFor("banking", method.slug) || method.related.map((slug: string) => ({
              title: slug.split("/").pop()?.replace(/-/g, " ") || slug,
              url: slug,
            }))) as { title: string; url: string }[]
          }
        />

        <EntityLinks
          links={[
            { title: "How to check your SRD status", url: "/status-check" },
            { title: "View the payment calendar", url: "/payment-calendar" },
            { title: "Compare other payment methods", url: "/banking" },
          ]}
          pagePath={`/banking/${method.slug}`}
        />

        <Divider />
        <EditorialFooter lastUpdated={method.last_updated} author={method.author} />
      </article>
    </div>
  );
}

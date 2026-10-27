import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Divider } from "@/components/ui/nextui";
import { FaPhone, FaExternalLinkAlt, FaQuestionCircle, FaMoneyCheckAlt, FaClock } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import NextStepCard from "../../../components/affiliate/NextStepCard";
import EntityLinks from "../../../components/EntityLinks";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema } from "../../../lib/schema";
import { nextStepsFor } from "../../../lib/entities";
import { clampTitle, clampDescription } from "../../../lib/seo";

interface AppealPage {
  slug: string;
  title: string;
  description: string;
  step_label: string;
  intro: string;
  how_it_works: string[];
  portal?: { name: string; url: string; note: string };
  steps: { title: string; text: string }[];
  timeline?: { stage: string; days: string; note: string }[];
  faqs: { q: string; a: string }[];
  who_to_contact: { label: string; value: string }[];
  sources: string[];
  related: string[];
  has_cta: boolean;
  last_updated: string;
}

function readAll(): AppealPage[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/appeals.json"), "utf8"));
}

export function generateStaticParams() {
  return readAll().map((a) => ({ step: a.slug }));
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ step: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  const page = readAll().find((a) => a.slug === params.step);
  if (!page) return { title: "Appeal Guide Not Found" };
  const url = `https://www.sassahelphub.co.za/appeals/${params.step}`;
  const title = clampTitle(page.title);
  const description = clampDescription(page.description);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: "article", siteName: "SASSA Help Hub", locale: "en_ZA", images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }] },
    twitter: { card: "summary_large_image", title, description, images: ["https://www.sassahelphub.co.za/logo.png"] },
  };
}

export default async function AppealPage({ params: paramsPromise }: { params: Promise<{ step: string }> }) {
  const params = await paramsPromise;
  const page = readAll().find((a) => a.slug === params.step);
  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(page.title, page.description, `/appeals/${page.slug}`, "Lucky Cungwa", page.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Appeals", slug: "/appeals" },
        { name: page.step_label, slug: `/appeals/${page.slug}` },
      ])} />
      <JsonLd data={howToSchema(page.title, page.description, page.steps)} />
      {page.faqs && page.faqs.length > 0 && <JsonLd data={faqPageSchema(page.faqs)} />}

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/appeals" className="hover:text-primary-gold">Appeals</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[250px]">{page.step_label}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="danger" variant="flat" className="font-bold uppercase text-xs">Appeal Guide</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{page.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{page.description}</p>
          <EditorialMeta lastVerified={page.last_updated} author="Lucky Cungwa" />
        </header>

        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border-l-8 border-red-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <FaMoneyCheckAlt className="text-primary-gold" /> Overview
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{page.intro}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <ul className="space-y-4">
            {page.how_it_works.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {page.portal && (
          <section className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FaExternalLinkAlt className="text-primary-gold" /> Official {page.portal.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{page.portal.note}</p>
            <a href={page.portal.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-gold underline break-all">{page.portal.url}</a>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Step-by-Step</h2>
          <div className="space-y-6">
            {page.steps.map((step, i) => (
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

        {page.timeline && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FaClock className="text-primary-gold" /> Appeal Timeline</h2>
            <div className="space-y-3">
              {page.timeline.map((t, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-3">
                  <Chip size="sm" variant="flat" color="primary" className="font-bold">{t.days}</Chip>
                  <div>
                    <p className="font-bold">{t.stage}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><FaPhone className="text-primary-gold" /> Who To Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.who_to_contact.map((contact, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-sm">{contact.label}</p>
                <p className="text-primary-gold font-medium">{contact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {page.sources.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaExternalLinkAlt className="text-primary-gold" /> Sources & References
            </h2>
            <ul className="space-y-4">
              {page.sources.map((url, i) => (
                <li key={i} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <span className="break-all">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary-gold">Visit Website</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {page.faqs && page.faqs.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaQuestionCircle className="text-primary-gold" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {page.faqs.map((faq, i) => (
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

        <NextStepCard
          pagePath={`/appeals/${page.slug}`}
          items={
            (nextStepsFor("appeal", page.slug) || page.related.map((slug: string) => ({
              title: slug.split("/").pop()?.replace(/-/g, " ") || slug,
              url: slug,
            }))) as { title: string; url: string }[]
          }
        />

        <EntityLinks
          links={[
            { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
            { title: "Common decline reasons & fixes", url: "/status/declined" },
            { title: "SRD status meanings", url: "/status" },
          ]}
          pagePath={`/appeals/${page.slug}`}
        />

        <Divider />
        <EditorialFooter lastUpdated={page.last_updated} author="Lucky Cungwa" />
      </article>
    </div>
  );
}

import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Divider } from "@nextui-org/react";
import { FaExclamationTriangle, FaCheckCircle, FaClock } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import { articleSchema, breadcrumbSchema, howToSchema } from "../../../lib/schema";
import { resolveTemplates } from "../../../lib/canonical-facts";
import EntityLinks from "../../../components/EntityLinks";
import { clampTitle, clampDescription } from "../../../lib/seo";

interface DeclineReason {
  slug: string;
  title: string;
  description: string;
  decline_code: string;
  what_it_means: string;
  common_triggers: string[];
  how_to_fix: { step: string; detail: string }[];
  appeal_deadline: string;
  success_rate: string;
  tags: string[];
  last_updated: string;
  author: string;
  related_statuses: string[];
}

export function generateStaticParams() {
  const data: DeclineReason[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/decline-reasons.json"), "utf8"));
  return data.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data: DeclineReason[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/decline-reasons.json"), "utf8"));
  const reason = data.find((r) => r.slug === params.slug);
  if (!reason) return { title: "Decline Reason Not Found" };
  const url = `https://www.sassahelphub.co.za/decline-reason/${params.slug}`;
  const title = clampTitle(reason.title);
  const description = clampDescription(reason.description);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: "article", siteName: "SASSA Help Hub", locale: "en_ZA", images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default function DeclineReasonPage({ params }: { params: { slug: string } }) {
  const all: DeclineReason[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/decline-reasons.json"), "utf8"));
  const reason = all.find((r) => r.slug === params.slug);
  if (!reason) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(reason.title, reason.description, `/decline-reason/${reason.slug}`, reason.author, reason.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SRD Grant", slug: "/grants/srd-r370-grant" },
        { name: "Declined", slug: "/status/declined" },
        { name: reason.decline_code, slug: `/decline-reason/${reason.slug}` },
      ])} />
      {reason.how_to_fix?.length > 0 && (
        <JsonLd data={howToSchema(
          `How to fix a "${reason.decline_code}" SRD decline`,
          reason.description,
          reason.how_to_fix.map((s) => ({ title: s.step, text: s.detail })),
        )} />
      )}

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/status/declined" className="hover:text-primary-gold">Declined</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[250px]">{reason.decline_code}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <div className="flex gap-3">
            <Chip color="danger" variant="flat" className="font-bold uppercase text-xs">Decline Reason</Chip>
            <Chip color="warning" variant="flat" className="font-mono text-xs">{reason.decline_code}</Chip>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{reason.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{reason.description}</p>
          <EditorialMeta lastVerified={reason.last_updated} author={reason.author} />
        </header>

        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border-l-8 border-red-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaExclamationTriangle className="text-red-500" /> What This Decline Reason Means</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{resolveTemplates(reason.what_it_means)}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Common Triggers</h2>
          <div className="space-y-4">
            {reason.common_triggers.map((trigger, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 dark:text-gray-300">{trigger}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">How to Fix It</h2>
          <div className="space-y-6">
            {reason.how_to_fix.map((fix, i) => (
              <div key={i} className="relative pl-12 border-l-2 border-gray-100 dark:border-gray-800 pb-2">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-lg">{i + 1}</div>
                <h3 className="text-xl font-bold mb-2">{fix.step}</h3>
                <p className="text-gray-600 dark:text-gray-400">{fix.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold flex items-center gap-2 mb-2"><FaClock className="text-primary-gold" /> Appeal Deadline</h3>
            <p className="text-gray-700 dark:text-gray-300">{reason.appeal_deadline}</p>
          </section>
          <section className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-200 dark:border-green-900">
            <h3 className="font-bold flex items-center gap-2 mb-2"><FaCheckCircle className="text-green-600" /> Appeal Guidance</h3>
            <p className="text-gray-700 dark:text-gray-300">{reason.success_rate}</p>
          </section>
        </div>

        {reason.related_statuses.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-xl font-bold mb-4">Related Pages</h2>
              <div className="flex flex-wrap gap-3">
                {reason.related_statuses.map((slug, i) => (
                  <a key={i} href={slug} className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">
                    {slug.split("/").pop()?.replace(/-/g, " ") || slug}
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        <AdNetworkLoader />

        <EntityLinks
          links={[
            { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
            { title: "Reconsideration explained", url: "/appeals/reconsideration" },
            { title: "Check your appeal status", url: "/appeals/appeal-status-check" },
            { title: "Appeal deadline calculator", url: "/tools/appeal-deadline" },
            { title: "Check if you still qualify (means test)", url: "/tools/means-test-calculator" },
            { title: "All decline reasons & fixes", url: "/status/declined" },
          ]}
          pagePath={`/decline-reason/${reason.slug}`}
        />

        <Divider />
        <EditorialFooter lastUpdated={reason.last_updated} author={reason.author} />
      </article>
    </div>
  );
}

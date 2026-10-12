import React from "react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FaArrowRight, FaWrench } from "react-icons/fa";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { breadcrumbSchema, faqPageSchema } from "../../lib/schema";
import { getToolsByCluster, getActiveTools } from "../../lib/tools/registry";
import { VERTICAL_HUBS } from "../../lib/entities";

export const metadata: Metadata = buildMetadata({
  title: "Free SASSA Tools — Check Status, Payments & Appeals",
  description:
    "Free SASSA Help Hub tools in one place. Check what your status means, work out why a payment has not arrived, calculate your appeal deadline, and see which grant requirements you may meet.",
  path: "/tools",
});

const faqs = [
  {
    q: "Do these tools apply for a SASSA grant for me?",
    a: "No. The tools explain the published rules and help you work out what to ask or do next. An application is only submitted through the official SASSA channels.",
  },
  {
    q: "Are the answers from SASSA itself?",
    a: "No. SASSA Help Hub is an independent information site. Tools use the published rules and figures, show you where each figure came from, and never present an estimate as a decision.",
  },
  {
    q: "Where should I check my real grant status?",
    a: "Check your live status on the official SRD portal or by dialling the SASSA USSD code. The Status Meaning Explorer here explains what the words on that screen mean.",
  },
];

export default function ToolsHubPage() {
  const groups = getToolsByCluster();
  const toolCount = getActiveTools().length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", slug: "/" },
          { name: "Tools", slug: "/tools" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqs)} />

      <header className="space-y-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-gold">
          <FaWrench /> Tools
        </p>
        <h1 className="text-4xl font-black tracking-tight">SASSA Help Hub Tools</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Pick the tool that matches your situation. Each one takes a minute, works in your browser,
          and links you to the full guide afterwards.
        </p>
      </header>

      {groups.map(({ cluster, tools }) => (
        <section key={cluster.id} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black">{cluster.label}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cluster.blurb}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <NextLink
                key={tool.slug}
                href={tool.path}
                className="group flex flex-col gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 hover:border-primary-gold/40 transition-colors"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-black text-gray-900 dark:text-white">{tool.title}</span>
                  <FaArrowRight className="flex-shrink-0 text-xs text-primary-gold opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tool.tagline}
                </span>
              </NextLink>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Not sure where to start?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VERTICAL_HUBS.map((hub) => (
            <NextLink
              key={hub.url}
              href={hub.url}
              className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-4 py-3 text-sm font-bold text-gray-800 dark:text-gray-200 hover:border-primary-gold/40 transition-colors"
            >
              {hub.title}
              <FaArrowRight className="flex-shrink-0 text-xs text-primary-gold" />
            </NextLink>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center gap-3 p-4 cursor-pointer list-none font-bold hover:bg-gray-50 dark:hover:bg-gray-800/50 [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
              </summary>
              <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <p className="text-sm text-gray-400 dark:text-gray-500">
        {toolCount} tools available. New tools are added when they are finished and checked against
        official sources — we do not list tools that are not ready.
      </p>
    </div>
  );
}

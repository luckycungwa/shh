import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Chip, Divider } from "@nextui-org/react";
import { FaClock, FaPhone, FaExternalLinkAlt, FaLink, FaBan, FaQuestionCircle, FaMobileAlt, FaGlobe, FaWhatsapp } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import AffiliateCTA from "../../../components/affiliate/AffiliateCTA";
import NextStepCard from "../../../components/affiliate/NextStepCard";
import EntityLinks from "../../../components/EntityLinks";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { ctaCopyFor } from "../../../lib/affiliate";
import { resolveTemplates } from "../../../lib/canonical-facts";
import { nextStepsFor } from "../../../lib/entities";
import { clampTitle, clampDescription } from "../../../lib/seo";

interface StatusMeaning {
  slug: string;
  status_label: string;
  title: string;
  description: string;
  what_it_means: string;
  why_it_happens: string[];
  how_to_fix: { title: string; content: string }[];
  what_not_to_do?: string[];
  how_long: string;
  who_to_contact: { label: string; value: string }[];
  check_methods?: { label: string; value: string }[];
  faqs?: { q: string; a: string }[];
  sources: string[];
  related: string[];
  last_updated: string;
  author: string;
}

const DEFAULT_CHECK_METHODS = [
  { label: "Online (SRD Portal)", value: "srd.sassa.gov.za — log in with your ID number and registered phone number" },
  { label: "USSD (Zero Data)", value: "Dial *120*69277# from any cellphone — free, no data or airtime needed" },
  { label: "WhatsApp", value: "Chat with SASSA on 082 601 0111 to check your status" },
  { label: "Moya App (Zero Data)", value: "Use the Moya app — SASSA status uses zero data" },
  { label: "SMS", value: "SMS your ID number to 32147 to receive your status update" },
];

export function generateStaticParams() {
  const data: StatusMeaning[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/status-meanings.json"), "utf8"));
  return data.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data: StatusMeaning[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/status-meanings.json"), "utf8"));
  const status = data.find((s) => s.slug === params.slug);
  if (!status) return { title: "Status Not Found" };
  const url = `https://www.sassahelphub.co.za/status/${params.slug}`;
  const title = clampTitle(resolveTemplates(status.title));
  const description = clampDescription(resolveTemplates(status.description));
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default function StatusMeaningPage({ params }: { params: { slug: string } }) {
  const data: StatusMeaning[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/status-meanings.json"), "utf8"));
  const status = data.find((s) => s.slug === params.slug);
  if (!status) notFound();

  const checkMethods = status.check_methods && status.check_methods.length ? status.check_methods : DEFAULT_CHECK_METHODS;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(resolveTemplates(status.title), resolveTemplates(status.description), `/status/${status.slug}`, status.author, status.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Status Meanings", slug: "/status" },
        { name: status.status_label, slug: `/status/${status.slug}` },
      ])} />
      {status.faqs && status.faqs.length > 0 && (
        <JsonLd data={faqPageSchema(status.faqs)} />
      )}

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/status" className="hover:text-primary-gold">Status Meanings</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{status.status_label}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">
            Status Meaning
          </Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {resolveTemplates(status.title)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {resolveTemplates(status.description)}
          </p>
          <EditorialMeta lastVerified={status.last_updated} author={status.author} />
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-4">What This Status Means</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{resolveTemplates(status.what_it_means)}</p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
            <FaMobileAlt className="text-primary-gold" /> How To Check This Status
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Checking your "{status.status_label}" status is free and takes less than a minute. Choose whichever method works for you:
          </p>
          <div className="space-y-4">
            {checkMethods.map((m, i) => (
              <div key={i} className="flex gap-3 items-start bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="text-primary-gold mt-0.5">
                  {m.label.toLowerCase().includes("whatsapp") ? <FaWhatsapp /> : m.label.toLowerCase().includes("ussd") || m.label.toLowerCase().includes("sms") ? <FaMobileAlt /> : <FaGlobe />}
                </span>
                <div>
                  <p className="font-bold text-sm">{m.label}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{m.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-5">
            You cannot change your status using these tools — only check it. To change your banking details or appeal, use the actions below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Why It Happens</h2>
          <ul className="space-y-4">
            {status.why_it_happens.map((reason, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 dark:text-gray-300">{reason}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">What To Do</h2>
          <div className="space-y-6">
            {status.how_to_fix.map((step, i) => (
              <div key={i} className="relative pl-12 border-l-2 border-gray-100 dark:border-gray-800 pb-2">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.content}</p>
              </div>
            ))}
          </div>
        </section>

        {status.what_not_to_do && status.what_not_to_do.length > 0 && (
          <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border-l-8 border-red-500">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-800 dark:text-red-300">
              <FaBan /> What NOT To Do
            </h2>
            <ul className="space-y-4">
              {status.what_not_to_do.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FaClock className="text-primary-gold" /> How Long It Takes
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{resolveTemplates(status.how_long)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaPhone className="text-primary-gold" /> Who To Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {status.who_to_contact.map((contact, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-sm">{contact.label}</p>
                <p className="text-primary-gold font-medium">{contact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {status.sources.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaLink className="text-primary-gold" /> Sources & References
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This status guide was researched and verified against the following official sources:
            </p>
            <ul className="space-y-4">
              {status.sources.map((url, i) => (
                <li key={i} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <span className="break-all">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  <Button as="a" href={url} target="_blank" rel="noopener noreferrer" size="sm" variant="flat" color="primary">
                    Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {status.faqs && status.faqs.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaQuestionCircle className="text-primary-gold" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {status.faqs.map((faq, i) => (
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

        {status.slug === "bank-details-pending" && (() => {
          const copy = ctaCopyFor("banking");
          return (
            <AffiliateCTA
              vertical="banking"
              pagePath={`/status/${status.slug}`}
              title={copy.title}
              description={copy.description}
              ctaLabel={copy.ctaLabel}
              placement="status_bottom"
            />
          );
        })()}

        <NextStepCard
          pagePath={`/status/${status.slug}`}
          items={
            (nextStepsFor("status", status.slug) || status.related.map((slug: string) => ({
              title: slug.split("/").pop()?.replace(/-/g, " ") || slug,
              url: slug,
            }))) as { title: string; url: string }[]
          }
        />

        <EntityLinks
          links={[
            { title: "How to check your SRD status", url: "/status-check" },
            { title: "View the payment calendar", url: "/payment-calendar" },
            { title: "Banking & payment methods", url: "/banking" },
            { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
          ]}
          pagePath={`/status/${status.slug}`}
        />

        {status.related.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-xl font-bold mb-4">Related Articles</h2>
              <div className="flex flex-wrap gap-3">
                {status.related.map((slug, i) => (
                  <a key={i} href={slug} className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">
                    {slug.split("/").pop()?.replace(/-/g, " ") || slug}
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />
        <EditorialFooter lastUpdated={status.last_updated} author={status.author} />
      </article>
    </div>
  );
}

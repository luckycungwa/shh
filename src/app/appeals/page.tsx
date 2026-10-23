import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Chip, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { FaExternalLinkAlt, FaQuestionCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { faqPageSchema, breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "SASSA SRD Appeal Guide: How to Appeal",
  description: "How to appeal a declined SASSA SRD grant on the official portal. Check the 90-day deadline, lodge with your ID, phone and PIN, and track the tribunal outcome.",
  path: "/appeals",
});

interface AppealPage {
  slug: string;
  title: string;
  description: string;
  step_label: string;
}

function readAll(): AppealPage[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/appeals.json"), "utf8"));
  } catch {
    return [];
  }
}

const faqs = [
  { q: "Where do I appeal a SASSA SRD rejection?", a: "Lodge the appeal on the official SASSA SRD appeals portal at https://srd.sassa.gov.za/appeals/appeal. Enter your 13-digit ID number and the 10-digit phone number used for your SRD application, then enter the 6-digit PIN sent to that phone. There is no separate reconsideration step that must be completed first. For the full process, see /guides/appeal-guide." },
  { q: "How long do I have to appeal?", a: "You have 90 days from the date of the decision to lodge an appeal. The SRD appeal rules do not provide a late-appeal route. Use /tools/appeal-deadline to estimate the last day, then confirm the cutoff on the official portal." },
  { q: "How long does an appeal take?", a: "The Independent Tribunal must finalise the appeal within 90 days of receiving it. That is a deadline for the tribunal, not a guarantee of an earlier decision. The outcome is communicated electronically and recorded against the month on the appeals portal." },
  { q: "Can I appeal more than once?", a: "You can lodge one appeal per declined month. The portal rejects a second appeal for the same period. If your circumstances change, submit a new SRD application for a later month rather than trying to reopen the same month." },
  { q: "Can I add new evidence to my appeal?", a: "No. The SRD appeal rules say you may only rely on information and evidence that was available to SASSA when you applied. The tribunal reassesses the existing record; it is not a document-upload process." },
];

function renderAnswer(text: string) {
  return text.split(/(\/[a-z0-9][a-z0-9/-]*)/i).map((part, i) =>
    /^\/[a-z0-9]/i.test(part) ? (
      <NextLink key={i} href={part} className="underline font-bold text-primary-gold hover:no-underline">
        {part}
      </NextLink>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export default function AppealsHubPage() {
  const pages = readAll();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Appeals", slug: "/appeals" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Appeals</span>
      </nav>

      <header className="space-y-6 mb-12">
        <Chip color="danger" variant="flat" className="font-bold uppercase text-xs">Appeal Guide</Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          How to Appeal a Denied SASSA Grant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          Got your SRD application declined? You can appeal the specific month within 90 days of the decision.
          These guides cover lodging on the official portal, checking the outcome and understanding the timeline.
        </p>
      </header>

      <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 mb-12">
        <p className="font-bold text-red-800 dark:text-red-200">Important: appeal within 90 days</p>
        <p className="text-red-700 dark:text-red-100 text-sm mt-1">
          You have <strong>90 days</strong> from the decision date to lodge an appeal on the official portal{" "}
          <a href="https://srd.sassa.gov.za/appeals/appeal" className="underline font-bold" target="_blank" rel="noopener noreferrer">https://srd.sassa.gov.za/appeals/appeal</a>.
          The Independent Tribunal must then finalise the appeal within 90 days of receiving it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {pages.map((p) => (
          <NextLink key={p.slug} href={`/appeals/${p.slug}`} className="block group">
            <Card className="p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-red-500/30 h-full">
              <CardBody className="p-0 space-y-3">
                <div className="flex items-center justify-between">
                  <Chip color="danger" variant="flat" size="sm" className="font-bold uppercase text-xs">{p.step_label}</Chip>
                  <FaExternalLinkAlt className="text-gray-300 group-hover:text-red-500 transition-colors text-xs" />
                </div>
                <h2 className="text-lg font-bold group-hover:text-primary-gold transition-colors leading-snug">{p.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
              </CardBody>
            </Card>
          </NextLink>
        ))}
      </div>

      <div className="rounded-2xl bg-primary-gold/5 border border-primary-gold/20 p-6 mb-12">
        <p className="font-bold text-lg mb-1">Need the full walkthrough?</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Our step-by-step guide covers finding the declined month, the 90-day deadline, what the tribunal can
          reassess, and how to track the outcome. See the <NextLink href="/guides/appeal-guide" className="underline font-bold text-primary-gold">official SRD appeal guide</NextLink>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <NextLink href="/tools/appeal-deadline" className="group block p-6 rounded-2xl border border-primary-gold/20 bg-primary-gold/5 hover:border-primary-gold/40 transition-colors">
          <p className="font-black text-lg group-hover:text-primary-gold transition-colors">Appeal Deadline Calculator</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Work out your last day to appeal from the decision date.</p>
        </NextLink>
        <NextLink href="/status/declined" className="group block p-6 rounded-2xl border border-primary-gold/20 bg-primary-gold/5 hover:border-primary-gold/40 transition-colors">
          <p className="font-black text-lg group-hover:text-primary-gold transition-colors">Find your decline reason &amp; fix</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">See why you were declined and what to check next.</p>
        </NextLink>
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
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{renderAnswer(faq.a)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-20">
        <Card className="bg-primary-black text-white p-12 rounded-[2rem]">
          <CardBody className="space-y-6">
            <h2 className="text-3xl font-black">Ready to Appeal?</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Lodge the appeal for the declined month on the official portal with your ID number, the phone number on your application and the PIN sent to that phone.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as="a" href="https://srd.sassa.gov.za/appeals/appeal" target="_blank" rel="noopener noreferrer" color="primary" className="font-bold px-8 py-6 text-lg">Go to Official Appeal Portal</Button>
              <Button as="a" href="/appeals/appeal-status-check" variant="bordered" className="font-bold px-8 py-6 text-lg text-white border-white/40">Check an Appeal Status</Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

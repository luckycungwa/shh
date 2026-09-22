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
  title: "SASSA SRD Appeal Guide — How to Appeal a Rejection",
  description: "How to appeal a declined SASSA SRD grant on the ITSAA portal. Step-by-step guides for submitting an appeal, checking appeal status, deadlines, and timelines.",
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
  { q: "Where do I appeal a SASSA SRD rejection?", a: "Start by asking SASSA to reconsider the decision on the official SRD portal at srd.sassa.gov.za. If the reconsideration is refused, appeal to the Independent Tribunal (ITSAA) on the official appeals portal at srd-appeals.dsd.gov.za using your ID number and the phone number linked to your application. For the full step-by-step process, see our in-depth appeal guide at /guides/appeal-guide." },
  { q: "How long do I have to appeal?", a: "For a reconsideration, act within the window shown on the SRD portal after your decline (SASSA asks you to request it quickly). If that is refused, you have 90 days from the date of the reconsideration outcome to appeal to the Tribunal (ITSAA). See the appeal deadline calculator at /tools/appeal-deadline." },
  { q: "How long does an appeal take?", a: "Reconsideration outcomes are usually sent within about 30 days. Tribunal (ITSAA) appeals usually take 60 to 90 days to be processed, and some complex appeals take longer. Track progress on srd-appeals.dsd.gov.za." },
  { q: "Can I appeal more than once?", a: "You get one reconsideration and one tribunal appeal per rejection. Do not reapply for the same decline - a decline is reassessed each month anyway, and re-submitting can reset your cycle. If your status specifically asks for a reapplication (such as 'Reapplication Pending'), see /guides/srd-reapplication." },
];

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
          Got your SRD application rejected? You can appeal. Follow our step-by-step guides
          to submit your appeal on the ITSAA portal, check your status, and understand the timeline.
        </p>
      </header>

      <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 mb-12">
        <p className="font-bold text-red-800 dark:text-red-200">Important: appeal on time</p>
        <p className="text-red-700 dark:text-red-100 text-sm mt-1">
          You have <strong>90 days</strong> from the decline date to submit your appeal on the
          official portal <a href="https://srd-appeals.dsd.gov.za" className="underline font-bold" target="_blank" rel="noopener noreferrer">srd-appeals.dsd.gov.za</a>. Appeals take 60 to 90 days to process.
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
          Our step-by-step guide covers finding your exact decline reason, gathering evidence, submitting the reconsideration, and appealing to ITSAA. See the <NextLink href="/guides/appeal-guide" className="underline font-bold text-primary-gold">official SRD appeal guide</NextLink>.
        </p>
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
            <h2 className="text-3xl font-black">Ready to Appeal?</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">First ask SASSA for a reconsideration on the official SRD portal. If that is refused, submit your tribunal appeal on the ITSAA portal with your ID number and the phone number on your application.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as="a" href="https://srd-appeals.dsd.gov.za" target="_blank" rel="noopener noreferrer" color="primary" className="font-bold px-8 py-6 text-lg">Go to ITSAA Appeal Portal</Button>
              <Button as="a" href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" variant="bordered" className="font-bold px-8 py-6 text-lg text-white border-white/40">Request Reconsideration</Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Card, CardHeader, CardBody, Button, Chip, Divider } from "@nextui-org/react";
import { FaBook, FaClock, FaArrowRight, FaGraduationCap, FaSearch, FaFilter, FaLightbulb, FaQuestionCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";
import { faqPageSchema } from "../../lib/schema";

const curYear = getCurrentYearString();

export const metadata: Metadata = buildMetadata({
  title: `SASSA Grant Guides ${curYear} — Step-by-Step Application Help`,
  description: `Comprehensive guides for all SASSA grants in ${curYear}. Learn how to apply, appeal, change banking details, check your status, and resolve common problems.`,
  path: "/guides",
});

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
}

const guideCategories = [
  { label: "All Guides", value: "all" },
  { label: "Apply for a Grant", value: "Apply for a Grant" },
  { label: "Appeals & Reconsideration", value: "Appeals & Reconsideration" },
  { label: "Banking & Payments", value: "Banking & Payments" },
  { label: "Apps, USSD & WhatsApp", value: "Apps, USSD & WhatsApp" },
  { label: "Eligibility & Requirements", value: "Eligibility & Requirements" },
  { label: "Manage Your Grant", value: "Manage Your Grant" },
  { label: "Manage Your Account", value: "Manage Your Account" },
  { label: "Money, Insurance & Jobs", value: "Money, Insurance & Jobs" },
  { label: "Safety & Scams", value: "Safety & Scams" },
];

const faqs = [
  { q: "What is the easiest way to apply for a SASSA grant?", a: "The easiest way is online via the official SRD portal at srd.sassa.gov.za or via the SASSA WhatsApp line at 082 601 0111. Both methods guide you step by step." },
  { q: "How long does a SASSA grant application take?", a: "The online application takes about 15 minutes. SASSA then processes applications on a monthly cycle, with status updates typically available after the 15th of each month." },
  { q: "Can I apply for multiple SASSA grants?", a: "No. You can only receive one social grant at a time. The SRD R370 grant is specifically for those not receiving any other form of government support." },
  { q: "What documents do I need to apply for a SASSA grant?", a: "You need your 13-digit South African ID number (or refugee/asylum permit), a valid cellphone number, and your banking details for payment." },
];

export default function GuidesListPage({ searchParams }: { searchParams?: { cat?: string } }) {
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");
  const guides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, "utf8"));

  const active = (searchParams && searchParams.cat) || "all";
  const filteredGuides = active === "all" ? guides : guides.filter((g) => g.category === active);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={faqPageSchema(faqs)} />

      <header className="text-center mb-16 space-y-4">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">{guides.length} Guides</Chip>
        <h1 className="text-5xl font-black tracking-tight">SASSA Application Guides</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Simplified, step-by-step instructions to help you navigate the SASSA ecosystem in {curYear}. Whether you are applying for the first time, appealing a decline, or updating your details, we have you covered.
        </p>
      </header>

      <div className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/20 mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaLightbulb className="text-primary-gold" /> How to Use These Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="font-black text-primary-gold">1. Find Your Topic</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Browse by category or scroll through all guides. Each guide is clearly labeled with its difficulty level and estimated time.</p>
          </div>
          <div className="space-y-2">
            <p className="font-black text-primary-gold">2. Follow Step by Step</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Each guide breaks down the process into numbered steps with practical tips you won't find on the official SASSA site.</p>
          </div>
          <div className="space-y-2">
            <p className="font-black text-primary-gold">3. Take Action</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Use the official links provided to complete your application, appeal, or update. Bookmark guides you need to revisit.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {guideCategories.map((cat) => {
          const isActive = cat.value === active;
          const href = cat.value === "all" ? "/guides" : `/guides?cat=${encodeURIComponent(cat.value)}`;
          return (
            <NextLink
              key={cat.value}
              href={href}
              className={`font-bold cursor-pointer hover:scale-105 transition-transform text-sm px-4 py-2 rounded-full ${
                isActive
                  ? "bg-primary-gold text-primary-black"
                  : "bg-primary-gold/10 text-primary-gold border border-primary-gold/20"
              }`}
            >
              {cat.label}
            </NextLink>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} as={NextLink} href={`/guides/${guide.id}`} className="group p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary-gold/40 transition-all h-full cursor-pointer">
            <CardHeader className="flex-col items-start gap-2 p-0 mb-6">
               <Chip size="sm" variant="flat" color="secondary" className="font-bold uppercase text-[10px]">
                  {guide.category}
               </Chip>
               <h3 className="text-2xl font-bold leading-tight">{guide.title}</h3>
            </CardHeader>
            <CardBody className="p-0 flex-grow">
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3">{guide.description}</p>
               <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                     <p className="flex items-center gap-1"><FaClock /> {guide.estimatedTime}</p>
                     <p className="flex items-center gap-1"><FaGraduationCap /> {guide.difficulty}</p>
                  </div>
                  <span className="inline-flex items-center justify-center font-bold rounded-xl px-4 py-2 text-sm bg-primary-gold text-primary-black group-hover:bg-primary-gold-light transition-colors">
                    Start Guide
                  </span>
               </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-16 space-y-8">
        <h2 className="text-3xl font-black text-center">New & Featured Guides</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Recently added guides for 2026</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.filter((g) => [
            "sim-replacement-south-africa",
            "affordable-data-bundles-south-africa",
            "ways-to-make-extra-income-south-africa",
            "free-skills-courses-south-africa",
            "funeral-cover-south-africa-comparison",
            "what-does-funeral-cover-cost",
            "compare-financial-options-south-africa",
          ].includes(g.id)).map((guide) => (
            <Card key={guide.id} as={NextLink} href={`/guides/${guide.id}`} className="group p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary-gold/40 transition-all h-full cursor-pointer">
              <CardHeader className="flex-col items-start gap-2 p-0 mb-4">
                <Chip size="sm" variant="flat" color="secondary" className="font-bold uppercase text-[10px]">
                  {guide.category}
                </Chip>
                <h3 className="text-xl font-bold leading-tight">{guide.title}</h3>
              </CardHeader>
              <CardBody className="p-0 flex-grow">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">{guide.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <p className="flex items-center gap-1"><FaClock /> {guide.estimatedTime}</p>
                    <p className="flex items-center gap-1"><FaGraduationCap /> {guide.difficulty}</p>
                  </div>
                  <span className="inline-flex items-center justify-center font-bold rounded-xl px-4 py-2 text-sm bg-primary-gold text-primary-black group-hover:bg-primary-gold-light transition-colors">
                    Start Guide
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <Divider className="my-20" />

      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-black text-center">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center">Quick answers to the most common SASSA grant questions.</p>
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
            <h2 className="text-3xl font-black">Need More Help?</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Every SASSA situation is different. If you cannot find the guide you need, drop me a message or visit the official SASSA website.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as={NextLink} href="/contact" color="primary" className="font-bold px-8 py-6">Contact Us</Button>
              <Button as={NextLink} href="/faq" variant="bordered" className="font-bold px-8 py-6 text-white border-white/20 hover:border-white/40">Browse All FAQs</Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

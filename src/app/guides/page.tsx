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
  { label: "Applications", value: "Applications" },
  { label: "Appeals", value: "Appeals" },
  { label: "Banking", value: "Banking" },
  { label: "Technology", value: "Technology" },
  { label: "Eligibility", value: "Eligibility" },
  { label: "Grant Management", value: "Grant Management" },
  { label: "Scam Alert", value: "Scam Alert" },
  { label: "Reference", value: "Reference" },
  { label: "Account Management", value: "Account Management" },
  { label: "Card Services", value: "Card Services" },
];

const faqs = [
  { q: "What is the easiest way to apply for a SASSA grant?", a: "The easiest way is online via the official SRD portal at srd.sassa.gov.za or via the SASSA WhatsApp line at 082 601 0111. Both methods guide you step by step." },
  { q: "How long does a SASSA grant application take?", a: "The online application takes about 15 minutes. SASSA then processes applications on a monthly cycle, with status updates typically available after the 15th of each month." },
  { q: "Can I apply for multiple SASSA grants?", a: "No. You can only receive one social grant at a time. The SRD R370 grant is specifically for those not receiving any other form of government support." },
  { q: "What documents do I need to apply for a SASSA grant?", a: "You need your 13-digit South African ID number (or refugee/asylum permit), a valid cellphone number, and your banking details for payment." },
];

export default function GuidesListPage() {
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");
  const guides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, "utf8"));



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
        {guideCategories.map((cat) => (
          <Chip
            key={cat.value}
            variant={cat.value === "all" ? "solid" : "flat"}
            color="primary"
            className="font-bold cursor-pointer hover:scale-105 transition-transform"
          >
            {cat.label}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Card key={guide.id} className="p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all h-full">
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
                  <Button as={NextLink} href={`/guides/${guide.id}`} color="primary" variant="solid" className="font-bold">
                    Start Guide
                  </Button>
               </div>
            </CardBody>
          </Card>
        ))}
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

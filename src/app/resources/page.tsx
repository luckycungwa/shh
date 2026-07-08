import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Card, CardHeader, CardBody, Button, Chip, Divider, Input } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaSearch, FaExternalLinkAlt, FaQuestionCircle, FaInfoCircle, FaCheckCircle, FaBuilding } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { faqPageSchema, governmentOfficeSchema } from "../../lib/schema";
import { SITE_CONFIG } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: "SASSA Office Locator — Find Offices Near You",
  description: "Find your nearest SASSA office across all 9 provinces. Get addresses, phone numbers, opening hours, and services offered.",
  path: "/resources",
});

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  province: string;
}

const faqs = [
  { q: "What documents must I bring to a SASSA office?", a: "Bring your original 13-digit South African ID book or smart ID card. For specific grants, you may also need: proof of income (payslip), medical certificate (disability grant), child's birth certificate (child support), or court order (foster child grant). Always call ahead to confirm exact requirements." },
  { q: "What are SASSA office opening hours?", a: "Most SASSA offices are open Monday to Friday from 07:30 to 16:00. Some larger offices open at 08:00. Offices are closed on weekends and public holidays. Arrive early (before 09:00) to avoid the longest queues." },
  { q: "Can I apply for a SASSA grant at any office?", a: "Yes. You can apply at any SASSA office regardless of which province you live in. However, your application will be processed by the office that serves your area of residence." },
  { q: "What services can I access at a SASSA office?", a: "SASSA offices handle: new grant applications, appeals and queries, banking detail updates, phone number changes, grant restoration requests, SASSA card replacement, and general inquiries about your grant status." },
];

export default function ResourcesPage() {
  const officesPath = path.join(process.cwd(), "public/data/resources.json");
  const allOffices: Office[] = JSON.parse(fs.readFileSync(officesPath, "utf8"));

  const provinces = Array.from(new Set(allOffices.map(o => o.province)));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {allOffices.slice(0, 10).map((office, i) => (
        <JsonLd key={i} data={governmentOfficeSchema(
          `${office.name} SASSA Office`,
          office.address,
          office.name,
          office.province,
          "",
          office.phone,
          "Mo-Fr 07:30-16:00"
        )} />
      ))}
      <JsonLd data={faqPageSchema(faqs)} />

      <header className="text-center mb-16 space-y-4">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">{allOffices.length} Offices</Chip>
        <h1 className="text-5xl font-black tracking-tight">SASSA Office Locator</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Find your nearest SASSA branch or service point across South Africa. Browse by province or search for a specific office.
        </p>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 max-w-2xl mx-auto mt-6">
          <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
            <FaBuilding /> Prefer a province-by-province directory? Visit our <NextLink href="/sassa-offices" className="font-bold underline hover:no-underline">SASSA Offices by Province</NextLink> page.
          </p>
        </div>
      </header>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-900 dark:text-blue-400">
          <FaInfoCircle /> Before You Visit a SASSA Office
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800 dark:text-blue-300">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="mt-1 text-blue-500 flex-shrink-0" />
            <p><strong>Bring your ID</strong> — Original 13-digit ID book or smart ID card is required for all services.</p>
          </div>
          <div className="flex items-start gap-3">
            <FaCheckCircle className="mt-1 text-blue-500 flex-shrink-0" />
            <p><strong>Go early</strong> — Offices open at 07:30–08:00. Arrive before 09:00 to avoid peak queues.</p>
          </div>
          <div className="flex items-start gap-3">
            <FaCheckCircle className="mt-1 text-blue-500 flex-shrink-0" />
            <p><strong>Try online first</strong> — Many services (status checks, banking updates) are available online without visiting an office.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-12">
        <section className="max-w-3xl mx-auto w-full">
           <Input
              size="lg"
              placeholder="Search by city or province..."
              startContent={<FaSearch className="text-gray-400" />}
              className="shadow-xl"
           />
        </section>

        <div className="flex flex-wrap gap-2 justify-center">
          {provinces.map((prov) => (
            <Chip key={prov} variant="flat" color="primary" className="font-bold cursor-pointer hover:scale-105 transition-transform">
              {prov}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {allOffices.slice(0, 12).map((office, i) => (
             <Card key={i} className="p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <CardHeader className="flex-col items-start gap-2 p-0 mb-6">
                   <Chip size="sm" color="primary" variant="flat" className="font-bold uppercase text-[10px]">
                      {office.province}
                   </Chip>
                   <h3 className="text-2xl font-bold leading-tight">{office.name}</h3>
                </CardHeader>
                <CardBody className="p-0 space-y-6">
                   <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="mt-1 text-primary-gold" />
                      <p>{office.address}</p>
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold">
                      <FaPhoneAlt className="text-primary-gold" />
                      <a href={`tel:${office.phone}`} className="hover:underline">{office.phone}</a>
                   </div>
                   <Divider />
                   <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                      <p className="flex items-center gap-1"><FaClock /> 07:30 - 16:00</p>
                      <Button size="sm" color="primary" variant="flat">Get Directions</Button>
                   </div>
                </CardBody>
             </Card>
           ))}
        </div>

        <section className="py-12 space-y-8">
           <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 text-center">
              <CardBody className="space-y-6">
                 <h2 className="text-3xl font-bold">Can&apos;t Visit an Office?</h2>
                 <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    Many SASSA services can now be performed online or via WhatsApp. Check our digital application guide first.
                 </p>
                 <Button as={NextLink} href="/guides/srd-grant" color="primary" variant="solid" className="font-bold px-8 py-6">
                    View Digital Guides <FaExternalLinkAlt className="ml-2 text-xs" />
                 </Button>
              </CardBody>
           </Card>

           <Divider />

           <section className="max-w-4xl mx-auto space-y-8">
             <h2 className="text-4xl font-black text-center">Frequently Asked Questions</h2>
             <p className="text-gray-600 dark:text-gray-400 text-center">Everything you need to know before visiting a SASSA office.</p>
             <div className="space-y-4">
               {faqs.map((faq, i) => (
                 <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                   <h3 className="font-bold mb-2 text-primary-gold flex items-start gap-2">
                     <FaQuestionCircle className="mt-0.5 flex-shrink-0" /> {faq.q}
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                 </div>
               ))}
             </div>
           </section>
        </section>
      </div>
    </div>
  );
}

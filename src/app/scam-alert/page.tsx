import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { Card, CardHeader, CardBody, Chip, Divider, Button } from "@nextui-org/react";
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";
import { breadcrumbSchema } from "../../lib/schema";
import { getFact } from "../../lib/canonical-facts";
import JsonLd from "../../components/JsonLd";

// The fraud hotline comes from canonical-facts.json so this page can never
// disagree with the tools or the FAQ pages; a missing fact drops the number
// rather than showing a placeholder.
const factOrNull = (key: string): string | null => {
  const raw = getFact(key);
  return raw.startsWith("{{") || raw.trim() === "" ? null : raw;
};

const HELPLINE = factOrNull("sassa_helpline");
const HELPLINE_TEL = HELPLINE ? `tel:${HELPLINE.replace(/[^\d+]/g, "")}` : null;

export const metadata: Metadata = buildMetadata({
  title: `SASSA Scam Alerts ${getCurrentYearString()} — Protect Yourself from Fraud`,
  description: `Stay informed about the latest SASSA-related scams in ${getCurrentYearString()}. Learn how to identify fake SASSA websites, SMS phishing, and fraud attempts.`,
  path: "/scam-alert",
});

interface Scam {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: string;
  reportedDate: string;
}

export default function ScamAlertPage() {
  const scamsPath = path.join(process.cwd(), "public/data/scams.json");
  const scams: Scam[] = JSON.parse(fs.readFileSync(scamsPath, "utf8"));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Scam Alerts", slug: "/scam-alert" },
      ])} />
      <header className="text-center mb-16 space-y-4">
        <Chip color="danger" variant="shadow" className="font-bold uppercase animate-pulse">Live Alerts</Chip>
        <h1 className="text-5xl font-black tracking-tight">SASSA Scam & Fraud Alerts</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           {`Protect yourself from the latest fraudulent schemes targeting grant beneficiaries in ${getCurrentYearString()}.`}
        </p>
      </header>

      <div className="grid gap-12">
        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[2rem] border-2 border-red-200 dark:border-red-800">
           <h2 className="text-3xl font-bold text-red-800 dark:text-red-400 mb-6 flex items-center gap-3">
              <FaShieldAlt /> How to Spot a Scam
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                 <p className="font-bold flex items-center gap-2"><FaExclamationCircle className="text-red-500" /> Unofficial Links</p>
                 <p className="text-sm text-gray-600">SASSA only uses .gov.za websites. Never click on links ending in .com, .net, or bit.ly.</p>
              </div>
              <div className="space-y-2">
                 <p className="font-bold flex items-center gap-2"><FaExclamationCircle className="text-red-500" /> Fees for Application</p>
                 <p className="text-sm text-gray-600">SASSA applications are 100% FREE. Anyone asking for money to 'speed up' your grant is a scammer.</p>
              </div>
              <div className="space-y-2">
                 <p className="font-bold flex items-center gap-2"><FaExclamationCircle className="text-red-500" /> Card Swapping</p>
                 <p className="text-sm text-gray-600">Never hand your SASSA card or PIN to anyone, even someone claiming to be an official.</p>
              </div>
           </div>
           <p className="text-sm text-gray-600 mt-6">
              Not sure whether a message you received is real?{" "}
              <NextLink href="/tools/scam-message-checker" className="font-bold text-red-700 dark:text-red-400 hover:underline">
                 Check it with the Scam Message Checker
              </NextLink>
              .
           </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {scams.map((scam) => (
             <Card key={scam.id} className="p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <CardHeader className="justify-between items-start p-0 mb-6">
                   <div>
                      <Chip size="sm" color={scam.severity === "critical" ? "danger" : "warning"} variant="flat" className="font-bold uppercase text-[10px] mb-2">
                         {scam.severity}
                      </Chip>
                      <h3 className="text-2xl font-bold leading-tight">{scam.title}</h3>
                   </div>
                   <FaExclamationTriangle className={scam.severity === "critical" ? "text-red-500 text-3xl" : "text-amber-500 text-3xl"} />
                </CardHeader>
                <CardBody className="p-0">
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{scam.description}</p>
                   <Divider className="my-4" />
                   <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                      <p>Type: {scam.type}</p>
                      <p>Reported: {new Date(scam.reportedDate).toLocaleDateString()}</p>
                   </div>
                </CardBody>
             </Card>
           ))}
        </div>

        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800">
           <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FaCheckCircle /> How to Report SASSA Fraud
           </h2>
           <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              SASSA fraud includes applying for a grant with false information, not telling SASSA about a change in
              your circumstances, someone using your SASSA card without permission, or a moneylender keeping your
              SASSA card as security for a loan. If you suspect fraud, report it — you can do so anonymously.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                 <p className="font-bold flex items-center gap-2"><FaExclamationCircle className="text-red-500" /> SASSA Fraud Hotline</p>
                 <p className="text-sm text-gray-600">Call the toll-free fraud hotline{HELPLINE ? <> on <strong>{HELPLINE}</strong></> : ""}. You do not have to give your name.</p>
              </div>
              <div className="space-y-2">
                 <p className="font-bold flex items-center gap-2"><FaExclamationCircle className="text-red-500" /> Nearest SASSA Office</p>
                 <p className="text-sm text-gray-600">Report it in person at your nearest SASSA office. Staff can log the case for investigation.</p>
              </div>
              <div className="space-y-2">
                 <p className="font-bold flex items-center gap-2"><FaExclamationCircle className="text-red-500" /> SAPS</p>
                 <p className="text-sm text-gray-600">For fraud involving identity theft or card misuse, report it at your nearest police station (SAPS).</p>
              </div>
           </div>
           <p className="text-sm text-gray-500 mt-6">
              Provide as much detail as you can — dates, amounts, and the person or service involved. Reporting
              suspected fraud protects your community and the grant system.
           </p>
        </section>

        <section className="text-center py-12">
           <Card className="bg-primary-black text-white p-6 sm:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold opacity-10 rounded-full -mr-32 -mt-32"></div>
              <CardBody className="relative z-10 space-y-6">
                 <h2 className="text-4xl font-black">Been Scammed?</h2>
                 <p className="text-xl text-secondary-gray max-w-2xl mx-auto">
                    Report it immediately to SASSA and the South African Police Service (SAPS).
                 </p>
                  <div className="flex flex-wrap justify-center gap-6">
                     <Button
                        as="a"
                        href={HELPLINE_TEL ?? "/contact"}
                        color="primary"
                        className="font-bold px-8 py-6 whitespace-normal"
                        size="lg"
                     >
                        {HELPLINE ? `Call SASSA Fraud: ${HELPLINE}` : "SASSA Contact Details"}
                     </Button>
                     <Button
                        as="a"
                        href="https://www.saps.gov.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="bordered"
                        className="text-white border-white/30 font-bold px-8 py-6"
                        size="lg"
                     >
                        Contact SAPS
                     </Button>
                  </div>
              </CardBody>
           </Card>
        </section>
      </div>
    </div>
  );
}

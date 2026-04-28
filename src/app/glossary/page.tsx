import React from "react";
import fs from "fs";
import path from "path";
import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Divider, Chip } from "@nextui-org/react";
import { FaBook, FaSearch, FaInfoCircle } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SASSA Glossary: Terms, Definitions & Grant Meanings 2026",
  description: "A comprehensive dictionary of SASSA terms. Understand Meanings of status codes, Means Test, eKYC, and more technical grant terminology.",
};

interface GlossaryTerm {
  term: string;
  definition: string;
}

export default function GlossaryPage() {
  const glossaryPath = path.join(process.cwd(), "public/data/glossary.json");
  const glossary: GlossaryTerm[] = JSON.parse(fs.readFileSync(glossaryPath, "utf8"));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Glossary</BreadcrumbItem>
      </Breadcrumbs>

      <header className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          SASSA <span className="text-primary-gold">Glossary 2026</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          The most complete directory of South African social security terminology.
          Understand the complex language of grants, status codes, and legal requirements.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {glossary.map((item, i) => (
          <Card key={i} className="border border-gray-100 dark:border-gray-800 hover:border-primary-gold/50 transition-all shadow-sm">
            <CardBody className="p-8 space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold leading-tight">{item.term}</h2>
                <FaBook className="text-primary-gold flex-shrink-0" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.definition}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <section className="mt-20 p-12 bg-primary-black text-white rounded-[3rem] space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <FaInfoCircle size={200} />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <Chip color="primary" variant="flat" className="font-bold">EXPERT ADVICE</Chip>
          <h2 className="text-3xl font-black">Why understanding these terms matters</h2>
          <p className="text-lg text-secondary-gray leading-relaxed">
            Many SASSA applications are declined not because of eligibility, but because users misinterpret the
            technical requirements. For example, failing to understand the <strong>Means Test</strong> threshold
            is the #1 reason for "Alternative Income" rejections.
          </p>
          <p className="text-lg text-secondary-gray leading-relaxed">
            Our glossary is updated weekly to reflect the latest changes in SASSA policy and the 2026 Integrity Rollout.
          </p>
        </div>
      </section>
    </div>
  );
}

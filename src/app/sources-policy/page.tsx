import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { FaBook, FaExternalLinkAlt, FaFileAlt, FaGlobe } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import { getCurrentMonthYearKey } from "../../lib/config";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Sources Policy — Where Our Information Comes From",
  description: "SASSA Help Hub sources policy: how we select, cite, and verify official sources for all content about SASSA grants and South African social security.",
  path: "/sources-policy",
});

export default function SourcesPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Sources Policy", slug: "/sources-policy" },
      ])} />
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Sources Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Where we get our information and how we ensure it is reliable.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaBook className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Primary Sources We Use</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            We prioritize official, primary sources for all factual information. The following sources form the foundation of our content:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FaGlobe className="text-primary-gold" /> SASSA Official</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Primary source for grant amounts, eligibility criteria, application procedures, and official announcements.</p>
              <a href="https://www.sassa.gov.za" target="_blank" className="text-primary-gold underline text-sm mt-2 inline-block">sassa.gov.za <FaExternalLinkAlt className="inline ml-1 text-xs" /></a>
            </Card>
            <Card className="p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FaGlobe className="text-primary-gold" /> SRD Portal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dedicated portal for SRD R370 grant applications, status checks, and banking detail updates.</p>
              <a href="https://srd.sassa.gov.za" target="_blank" className="text-primary-gold underline text-sm mt-2 inline-block">srd.sassa.gov.za <FaExternalLinkAlt className="inline ml-1 text-xs" /></a>
            </Card>
            <Card className="p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FaGlobe className="text-primary-gold" /> Department of Social Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Policy documents, budget speeches, and legislative updates affecting social grants.</p>
              <a href="https://www.dsd.gov.za" target="_blank" className="text-primary-gold underline text-sm mt-2 inline-block">dsd.gov.za <FaExternalLinkAlt className="inline ml-1 text-xs" /></a>
            </Card>
            <Card className="p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FaGlobe className="text-primary-gold" /> South African Government</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Official government gazettes, parliamentary briefings, and national legislation.</p>
              <a href="https://www.gov.za" target="_blank" className="text-primary-gold underline text-sm mt-2 inline-block">gov.za <FaExternalLinkAlt className="inline ml-1 text-xs" /></a>
            </Card>
          </div>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaFileAlt className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Secondary Sources</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            In some cases, we reference secondary sources such as reputable South African news outlets for reporting on SASSA announcements, parliamentary proceedings, or grant-related developments. These are always clearly attributed and linked.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            When information comes from community knowledge (commonly understood procedures that may not be formally documented), we label it as such and encourage readers to verify with official channels.
          </p>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaExternalLinkAlt className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">How We Cite Sources</h2>
          </div>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p>Every article includes a numbered list of official references at the bottom.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p>Links to official sources open in a new tab for independent verification.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p>Where specific figures are cited (grant amounts, income thresholds), the date of verification is noted.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p>We distinguish between officially confirmed information and information that is projected or estimated.</p>
            </li>
          </ul>
        </section>

        <Card className="bg-gray-50 dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700">
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                             <strong>Last updated:</strong> {getCurrentMonthYearKey()}. Read our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>, <NextLink href="/fact-checking-policy" className="text-primary-gold underline">Fact-Checking Policy</NextLink>, and <NextLink href="/corrections-policy" className="text-primary-gold underline">Corrections Policy</NextLink>.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

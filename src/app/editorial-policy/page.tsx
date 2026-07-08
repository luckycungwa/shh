import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { FaPenFancy, FaClock, FaLink, FaUsers } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import { getCurrentMonthYearKey } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy — How We Create Content",
  description: "Our editorial standards: how SASSA Help Hub researches, writes, reviews, and updates content about SASSA grants and social security in South Africa.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Editorial Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          How we create, review, and maintain content at SASSA Help Hub.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaPenFancy className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Our Editorial Standards</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            SASSA Help Hub is committed to providing accurate, clear, and actionable information about South African social grants. Every piece of content we publish follows these principles:
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>Accuracy first:</strong> All factual claims are verified against official sources including SASSA, the Department of Social Development, and published government gazettes before publication.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>Plain language:</strong> We translate complex policy language into clear, simple steps that any South African can follow, regardless of education level or first language.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>User-first:</strong> Content is organized around what beneficiaries actually need to know and do, not around what looks good in a search engine.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>Independence:</strong> We are not affiliated with SASSA or any government department. Our editorial decisions are made independently, free from external influence.</p>
            </li>
          </ul>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaUsers className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Who Creates Our Content</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our content is created by a dedicated team of South African researchers and writers with expertise in social welfare policy. Each piece of content is reviewed by at least one other team member before publication to ensure accuracy and clarity.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Every article includes the author or editorial team attribution and the date it was last reviewed, so you know who stands behind the information.
          </p>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaClock className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Update & Review Process</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            SASSA policies, grant amounts, and payment schedules change. We track these changes through:
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>Monthly reviews:</strong> Payment dates and grant amounts are reviewed at the start of each month against the latest SASSA announcements.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>Event-driven updates:</strong> When SASSA announces policy changes, budget adjustments, or system updates, affected pages are updated within 7 days.</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>User feedback:</strong> If a reader reports an error via our <NextLink href="/corrections-policy" className="text-primary-gold underline">corrections page</NextLink>, we investigate and update within 48 hours.</p>
            </li>
          </ul>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaLink className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Linking & Attribution</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Every article that makes a factual claim about SASSA policy, grant amounts, eligibility criteria, or payment dates includes a link to the official source. We primarily reference:
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>The official SASSA website (<a href="https://www.sassa.gov.za" className="text-primary-gold underline" target="_blank">sassa.gov.za</a>)</li>
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>The SRD grant portal (<a href="https://srd.sassa.gov.za" className="text-primary-gold underline" target="_blank">srd.sassa.gov.za</a>)</li>
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>The Department of Social Development (<a href="https://www.dsd.gov.za" className="text-primary-gold underline" target="_blank">dsd.gov.za</a>)</li>
            <li className="flex gap-3"><span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>Published government gazettes and parliamentary briefings</li>
          </ul>
        </section>

        <Card className="bg-gray-50 dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700">
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                             <strong>Last updated:</strong> {getCurrentMonthYearKey()}. Read our <NextLink href="/fact-checking-policy" className="text-primary-gold underline">Fact-Checking Policy</NextLink>, <NextLink href="/sources-policy" className="text-primary-gold underline">Sources Policy</NextLink>, and <NextLink href="/corrections-policy" className="text-primary-gold underline">Corrections Policy</NextLink>.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

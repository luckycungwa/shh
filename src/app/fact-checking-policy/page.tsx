import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { FaSearch, FaCheckDouble, FaExclamationTriangle, FaSync } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Fact-Checking Policy — How We Verify Information",
  description: "Our rigorous fact-checking process: how SASSA Help Hub verifies every claim about SASSA grants, payment dates, and social security policies.",
  path: "/fact-checking-policy",
});

export default function FactCheckingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Fact-Checking Policy", slug: "/fact-checking-policy" },
      ])} />
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Fact-Checking Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          How we verify every piece of information before it reaches you.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaSearch className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Our Commitment to Accuracy</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            We understand that our readers rely on this information to make financial decisions. SASSA Help Hub maintains a strict fact-checking process that applies to every article, guide, and news update we publish.
          </p>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaCheckDouble className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Our Fact-Checking Process</h2>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Source Verification</h3>
                <p className="text-gray-600 dark:text-gray-400">Factual claims are checked against official sources where available: government websites, published gazettes, parliamentary records, or direct SASSA announcements. Where a claim cannot be confirmed against an official source, it is marked as unverified rather than presented as confirmed.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quality Review</h3>
                <p className="text-gray-600 dark:text-gray-400">Before publication, content is checked against our editorial standards for accuracy, clarity, and helpfulness. Corrections are published promptly under our corrections policy.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sourcing Transparency</h3>
                <p className="text-gray-600 dark:text-gray-400">All articles include visible references to the sources used. Readers can verify claims independently by following the official links provided at the end of each article.</p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">What We Cannot Verify</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Some information about individual grant applications, specific decline reasons, or personal account status cannot be verified by us because we do not have access to SASSA&apos;s internal systems. We are clear when information comes from user reports or community knowledge, and we distinguish this from officially verified information.
          </p>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaSync className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">When We Get It Wrong</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            If we publish incorrect information, we correct it promptly and transparently. Our <NextLink href="/corrections-policy" className="text-primary-gold underline">Corrections Policy</NextLink> explains how errors are reported, investigated, and rectified. Every correction is noted with the date of change and a summary of what was corrected.
          </p>
        </section>

        <Card className="bg-gray-50 dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700">
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                             <strong>Last updated:</strong> 10 August 2026. Read our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>, <NextLink href="/sources-policy" className="text-primary-gold underline">Sources Policy</NextLink>, and <NextLink href="/corrections-policy" className="text-primary-gold underline">Corrections Policy</NextLink>.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

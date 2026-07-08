import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { FaBug, FaCheckCircle, FaEnvelope, FaHistory } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import { getCurrentMonthYearKey } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Corrections Policy — How Errors Are Fixed",
  description: "SASSA Help Hub corrections policy: how we handle, investigate, and correct errors in our content about SASSA grants and social security.",
  path: "/corrections-policy",
});

export default function CorrectionsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Corrections Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          How we handle mistakes and keep our content reliable.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaBug className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Our Commitment to Corrections</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Despite our rigorous editorial process, errors can occur. When they do, we correct them promptly, transparently, and with a clear record of what changed and why.
          </p>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Reporting an Error</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            If you believe any content on SASSA Help Hub contains inaccurate information, please contact us immediately. The fastest way to report an error is:
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>Email:</strong> Send details of the error to our team via our <NextLink href="/contact" className="text-primary-gold underline">contact page</NextLink> with the subject line &quot;Correction Request.&quot;</p>
            </li>
            <li className="flex gap-3">
              <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
              <p><strong>What to include:</strong> The URL of the page with the error, a description of what is incorrect, and (if possible) a link to the correct information from an official source.</p>
            </li>
          </ul>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">How We Handle Corrections</h2>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Investigation</h3>
                <p className="text-gray-600 dark:text-gray-400">We investigate all correction requests within 48 hours. Our team verifies the claim against official sources.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Correction</h3>
                <p className="text-gray-600 dark:text-gray-400">If the error is confirmed, the content is updated immediately. A correction notice is added at the bottom of the page noting the date and nature of the change.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Notification</h3>
                <p className="text-gray-600 dark:text-gray-400">If the error was reported by a reader, we reply to confirm the correction has been made.</p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FaHistory className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">Correction Log</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Significant corrections to published content are logged below. Minor edits (typos, formatting) are not tracked individually.
          </p>
          <Card className="bg-gray-50 dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700">
            <CardBody>
              <p className="text-gray-500 italic">No corrections logged yet. This page will be updated as changes are made.</p>
            </CardBody>
          </Card>
        </section>

        <Card className="bg-gray-50 dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700">
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                             <strong>Last updated:</strong> {getCurrentMonthYearKey()}. Read our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>, <NextLink href="/fact-checking-policy" className="text-primary-gold underline">Fact-Checking Policy</NextLink>, and <NextLink href="/sources-policy" className="text-primary-gold underline">Sources Policy</NextLink>.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

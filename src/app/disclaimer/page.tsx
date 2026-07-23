import React from 'react';
import type { Metadata } from "next";
import { Card, CardHeader, CardBody, Divider, Button, Link } from "@nextui-org/react";
import { FaExclamationTriangle, FaExternalLinkAlt, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString, getCurrentMonthYearKey } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer — Independent SASSA Information Resource",
  description: "SASSA Help Hub is an independent, unofficial information portal. We are not affiliated with SASSA or any government department.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const siteUrl = "https://www.sassahelphub.co.za";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Legal Disclaimer</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Important notice regarding our relationship with SASSA.
        </p>
      </header>

      <div className="grid gap-12">
        <Card className="border-4 border-red-500 bg-red-50 dark:bg-red-900/10 p-8 shadow-2xl">
          <CardHeader className="flex gap-4 items-center">
            <FaExclamationTriangle className="text-4xl text-red-600 dark:text-red-400 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 uppercase tracking-tighter">
              Not a Government Entity
            </h2>
          </CardHeader>
          <Divider className="bg-red-200 dark:bg-red-800 my-4" />
          <CardBody>
             <p className="text-xl font-bold text-red-700 dark:text-red-400 mb-6 leading-relaxed">
               SASSA Help Hub (sassahelphub.co.za) is an independent, unofficial information portal. We are NOT SASSA, we are NOT affiliated with, endorsed by, or representing the South African Social Security Agency (SASSA), the Department of Social Development, or any other government department of South Africa.
             </p>
             <p className="text-lg text-red-600 dark:text-red-300">
               We do not process grant applications, we do not have access to the SASSA payment system, and we do not provide official legal or financial advice.
             </p>
          </CardBody>
        </Card>

        <section className="space-y-12">
           <div className="flex items-center gap-3">
             <FaShieldAlt className="text-primary-gold text-2xl" />
             <h2 className="text-3xl font-bold">Purpose of This Website</h2>
           </div>
           <div className="prose max-w-none text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
             <p>
               This website is created and maintained for educational and informational purposes only. We aim to help South African citizens navigate the complexities of social grants by providing simplified guides, payment dates, and news summaries.
             </p>
             <p>
               While we strive to provide the most accurate and up-to-date information for {getCurrentYearString()}, the official and final word on any SASSA grant application, status, or policy rests solely with SASSA and the Department of Social Development.
             </p>
           </div>
        </section>

        <Divider className="my-8" />

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <FaQuestionCircle className="text-primary-gold text-2xl" />
            <h2 className="text-3xl font-bold">How to Verify Information</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
             To ensure the accuracy of the information you receive, always verify details against these official sources:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card isHoverable className="p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-lg mb-4">Official SRD Portal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">The only official place to apply for the SRD R370 grant and check your status online.</p>
                <Button as={NextLink} href="https://srd.sassa.gov.za" target="_blank" color="primary" variant="flat">
                  Visit srd.sassa.gov.za <FaExternalLinkAlt className="ml-2 text-xs" />
                </Button>
             </Card>

             <Card isHoverable className="p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-lg mb-4">Official SASSA Website</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Access official policy documents, grant thresholds, and public announcements from SASSA.</p>
                <Button as={NextLink} href="https://www.sassa.gov.za" target="_blank" color="primary" variant="flat">
                  Visit sassa.gov.za <FaExternalLinkAlt className="ml-2 text-xs" />
                </Button>
             </Card>
          </div>
        </section>

        <Card className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8">
           <CardBody>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                 Last updated: {getCurrentMonthYearKey()}. By using this website, you acknowledge that you have read, understood, and agreed to this disclaimer. All content on sassahelphub.co.za is subject to change without notice.
              </p>
           </CardBody>
        </Card>
      </div>
    </div>
  );
}

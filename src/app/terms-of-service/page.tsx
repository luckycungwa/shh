import React from 'react';
import type { Metadata } from "next";
import { Gavel, Scale, AlertCircle } from 'lucide-react';
import { Card, CardBody, Divider } from "@nextui-org/react";
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service \u2014 Using SASSA Help Hub's Free Resources",
  description: "Terms and conditions for using SASSA Help Hub. Your rights and obligations when accessing our independent, free SASSA grant information resource.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  const lastUpdated = "10 August 2026";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Terms of Service", slug: "/terms-of-service" },
      ])} />
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Terms and Conditions for using SASSA Help Hub.
        </p>
        <p className="mt-4 text-xs font-bold text-primary-gold uppercase tracking-widest">
          Last updated: {lastUpdated}
        </p>
      </header>

      <div className="grid gap-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-primary-gold" />
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use SASSA Help Hub if you do not accept all of the terms and conditions stated on this page.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-primary-gold" />
            <h2 className="text-2xl font-bold">2. Use of Information</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            The information provided on SASSA Help Hub is for general informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-l-8 border-primary-gold p-6 shadow-sm">
             <CardBody className="text-lg font-bold">
               Any reliance you place on such information is therefore strictly at your own risk.
             </CardBody>
          </Card>
        </section>

        <Divider className="my-8" />

        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3. User Conduct</h3>
          <p className="text-gray-700 dark:text-gray-300">Users are prohibited from:</p>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li>Using the website in any way that is, or may be, damaging to the website.</li>
            <li>Using the website in any way that impacts user access to the website.</li>
            <li>Using the website contrary to applicable laws and regulations.</li>
            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4. Intellectual Property</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Unless otherwise stated, SASSA Help Hub and/or its licensors own the intellectual property rights for all material on SASSA Help Hub. All intellectual property rights are reserved. You may view and/or print pages from sassahelphub.co.za for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-100 dark:border-gray-800">
            <p className="font-bold mb-4">You must not:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Republish material from sassahelphub.co.za</li>
              <li>Sell, rent, or sub-license material from sassahelphub.co.za</li>
              <li>Reproduce, duplicate, or copy material from sassahelphub.co.za</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5. Limitation of Liability</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            In no event shall SASSA Help Hub, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise.
          </p>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">6. Governing Law</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of South Africa, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>
      </div>
    </div>
  );
}

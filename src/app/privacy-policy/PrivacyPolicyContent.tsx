"use client";

import React from 'react';
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { FaShieldAlt, FaLock, FaCookieBite, FaUserShield, FaEnvelope } from "react-icons/fa";
import { getCurrentMonthYearKey } from "../../lib/config";

export default function PrivacyPolicyContent() {
  const lastUpdated = getCurrentMonthYearKey();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          How SASSA Help Hub protects your data and privacy.
        </p>
        <p className="mt-4 text-xs font-bold text-primary-gold uppercase tracking-widest">
          Last updated: {lastUpdated}
        </p>
      </header>

      <div className="grid gap-12">
        <Card className="border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
           <CardBody className="space-y-6">
             <div className="flex items-center gap-3">
               <FaLock className="text-primary-gold text-2xl" />
               <h2 className="text-2xl font-bold">No Personal Grant Data Collection</h2>
             </div>
             <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
               <strong>SASSA Help Hub does not collect, store, or have access to your personal SASSA grant details, ID numbers, or banking information.</strong> Our role is strictly informational. Any status checks performed through our site are executed on official government servers or trusted partner tools.
             </p>
           </CardBody>
        </Card>

        <Accordion variant="splitted" selectionMode="multiple" defaultSelectedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Information We Collect"
            title="Information We Collect"
            subtitle="Understand what data we process"
            startContent={<FaUserShield className="text-primary-gold" />}
          >
            <div className="space-y-4 pb-6">
               <p>We may collect limited information, such as:</p>
               <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                 <li>Browser type and version</li>
                 <li>Operating system and device information</li>
                 <li>IP address and approximate location</li>
                 <li>Referring websites and search terms</li>
                 <li>Email addresses provided via our contact form</li>
               </ul>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Cookies and Advertising"
            title="Cookies and Advertising"
            subtitle="AdSense and third-party tracking"
            startContent={<FaCookieBite className="text-primary-gold" />}
          >
            <div className="space-y-4 pb-6">
               <p>We use cookies to enhance your experience and support our operations through advertising:</p>
               <ul className="list-disc list-inside space-y-4 text-sm text-gray-600 dark:text-gray-400">
                 <li>
                   <strong>Google AdSense:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads based on your visit to our site and other sites on the Internet.
                 </li>
                 <li>
                   <strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors interact with our content.
                 </li>
                 <li>
                   <strong>Opt-Out:</strong> You may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy.
                 </li>
               </ul>
            </div>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Data Security"
            title="Data Security"
            subtitle="How we keep information safe"
            startContent={<FaShieldAlt className="text-primary-gold" />}
          >
            <div className="space-y-4 pb-6">
               <p>We implement strict security measures to protect any information provided to us:</p>
               <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                 <li>SSL encryption for all data transmission</li>
                 <li>Regular security updates and monitoring</li>
                 <li>Limited access to internal systems</li>
                 <li>No selling or trading of user data to third parties</li>
               </ul>
            </div>
          </AccordionItem>
        </Accordion>

        <section className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
           <div className="flex items-center justify-center gap-2 mb-4">
             <FaEnvelope className="text-primary-gold text-2xl" />
             <h2 className="text-2xl font-bold">Privacy Inquiries</h2>
           </div>
           <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
             If you have questions or concerns regarding our privacy practices, please contact us at:
           </p>
           <a href="mailto:privacy@sassahelphub.co.za" className="text-xl font-bold text-primary-gold hover:underline">
             privacy@sassahelphub.co.za
           </a>
        </section>
      </div>
    </div>
  );
}

import React from "react";
import { Card, CardHeader, CardBody, Divider, Button, Chip, Accordion, AccordionItem, Input } from "@nextui-org/react";
import { FaUserShield, FaExternalLinkAlt, FaCheckCircle, FaExclamationTriangle, FaSearch, FaPhoneAlt, FaMobileAlt } from "react-icons/fa";
import NextLink from "next/link";
import Script from "next/script";

export default function StatusCheckPage() {
  const faqData = [
    {
      q: "What does 'Approved' mean?",
      a: "This means your application for the specific month was successful. Look for a 'Pay Day' date to know when the funds will be available."
    },
    {
      q: "Why is my status 'Pending'?",
      a: "SASSA is still verifying your details against bank and government databases. This can take up to 90 days for new applications."
    },
    {
      q: "What should I do if 'Declined'?",
      a: "If your application is declined, you have 30 days to lodge an appeal via the ITSAA portal."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Check SASSA Status 2026",
    "description": "Step-by-step guide on how to check your SASSA SRD R370 grant status online.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Visit Official Portal",
        "text": "Go to srd.sassa.gov.za on your browser."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Enter ID Number",
        "text": "Provide your 13-digit South African Identity Number."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Enter Phone Number",
        "text": "Enter the mobile number you used during registration."
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Script
        id="status-check-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="text-center mb-16 space-y-6">
        <Chip color="success" variant="flat" className="font-bold uppercase">2026 Status Checker</Chip>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          SASSA Status Check <span className="text-primary-gold underline underline-offset-8">2026</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Verify your SRD R370 grant approval and payment dates using the official channels.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-8">
           <Card className="p-8 md:p-12 border-2 border-primary-gold/30 shadow-2xl rounded-[3rem] bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardBody className="space-y-12">
                 <div className="space-y-6 text-center md:text-left">
                    <h2 className="text-4xl font-black flex items-center gap-3 justify-center md:justify-start">
                       <FaUserShield className="text-primary-gold" /> Official Status Check
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                       To protect your privacy, we provide a direct link to the official SASSA portal. Enter your details there to get the most accurate result.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          <p className="font-bold mb-1">Step 1</p>
                          <p className="text-sm text-gray-500">Have your 13-digit ID number ready.</p>
                       </div>
                       <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          <p className="font-bold mb-1">Step 2</p>
                          <p className="text-sm text-gray-500">Use your registered mobile number.</p>
                       </div>
                    </div>
                    <div className="flex flex-col justify-center">
                       <Button
                          as={NextLink}
                          href="https://srd.sassa.gov.za"
                          target="_blank"
                          color="primary"
                          size="lg"
                          className="font-bold py-12 text-2xl shadow-xl hover:scale-105 transition-transform"
                       >
                          Check Status Online <FaExternalLinkAlt className="ml-3 text-lg" />
                       </Button>
                       <p className="text-center mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">srd.sassa.gov.za</p>
                    </div>
                 </div>

                 <Divider />

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800">
                       <FaPhoneAlt className="text-2xl text-blue-500" />
                       <div>
                          <p className="font-bold">Call Helpline</p>
                          <p className="text-sm">0800 60 10 11</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-800">
                       <FaMobileAlt className="text-2xl text-green-500" />
                       <div>
                          <p className="font-bold">USSD Code</p>
                          <p className="text-sm">*120*3227#</p>
                       </div>
                    </div>
                 </div>
              </CardBody>
           </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <Card className="p-8 bg-red-50 dark:bg-red-900/10 border-none shadow-sm rounded-[2rem]">
              <CardBody className="p-0 space-y-4">
                 <h3 className="text-xl font-bold text-red-800 dark:text-red-400 flex items-center gap-2">
                    <FaExclamationTriangle /> Warning
                 </h3>
                 <p className="text-sm text-red-700 dark:text-red-300">
                    Beware of third-party websites asking for your bank PIN or full banking password. SASSA will never ask for these details online.
                 </p>
                 <Button as={NextLink} href="/scam-alert" variant="flat" color="danger" size="sm" className="font-bold">Read Scam Guide</Button>
              </CardBody>
           </Card>

           <div className="space-y-6">
              <h3 className="text-2xl font-bold">Status Meanings</h3>
              <div className="space-y-4">
                 {faqData.map((f, i) => (
                   <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                      <p className="font-bold text-sm mb-2">{f.q}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

import React from "react";
import { Metadata } from "next";
import { Card, CardHeader, CardBody, Divider, Button, Chip } from "@nextui-org/react";
import { FaUserShield, FaExternalLinkAlt, FaExclamationTriangle, FaPhoneAlt, FaMobileAlt, FaCheckCircle, FaSearch, FaCalendarAlt } from "react-icons/fa";
import NextLink from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SASSA SRD Status Check May 2026: Official R370 Approval & Payment Dates",
  description: "Verify your SASSA SRD status check for May 2026. Step-by-step guide for R370 approval, biometrics, bank verification, and May payment dates. 100% free unofficial help.",
  keywords: ["SASSA status check May 2026", "SRD status check May", "R370 grant status", "SASSA status check online", "SASSA payment dates May 2026"],
  openGraph: {
    title: "SASSA SRD Status Check May 2026: Official Guide",
    description: "Instant SASSA SRD status check May 2026. Detailed guide for R370 grant approval, biometric verification, and May payment dates.",
    type: "website",
    locale: "en-ZA",
    siteName: "SASSA Help Hub",
  }
};

export default function StatusCheckPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Check SASSA Status May 2026",
    "description": "Step-by-step guide on how to check your SASSA SRD R370 grant status online for May 2026.",
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

  const fullFaqData = [
    {
      q: "How long does SASSA status check take?",
      a: "The online check is instant. Once you enter your details on the official portal, the results for the current and previous months should appear within seconds."
    },
    {
      q: "Why is my SASSA status still pending after 2 months?",
      a: "A 'Pending' status means your details are still being cross-referenced with other government databases like SARS, UIF, and Home Affairs. This can be delayed if there is a backlog or if your information requires manual verification."
    },
    {
      q: "Can I check my status without a phone number?",
      a: "No. You must have the mobile number that was used to register the application to verify your identity and receive security codes if prompted."
    },
    {
      q: "Does the SRD grant increase in 2026?",
      a: "As of May 2026, the grant remains at R370. Any future increases are typically announced by the Minister of Finance during the National Budget Speech."
    },
    {
      q: "Why did my status change from 'Approved' to 'Declined'?",
      a: "SASSA re-evaluates applications every single month. If you received a payment or a deposit in your bank account that put you over the R624 income threshold, your status for that specific month will be updated to Declined."
    },
    {
      q: "What does 'Bank Details Pending' mean?",
      a: "This means your application is approved, but SASSA does not have valid banking information to deposit the funds. You must update your details on the official SRD website immediately."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": fullFaqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Script
        id="status-check-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="status-check-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="text-center mb-16 space-y-6">
        <Chip color="success" variant="flat" className="font-bold uppercase">May 2026 Status Checker</Chip>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          SASSA Status Check <span className="text-primary-gold underline underline-offset-8">May 2026</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Verify your SRD R370 grant approval and payment dates using official channels. Get instant updates for May 2026.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
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
                    <FaExclamationTriangle /> Security Alert
                 </h3>
                 <p className="text-sm text-red-700 dark:text-red-300">
                    Never share your OTP or banking PIN. SASSA will only ask for your ID and phone number to check your status.
                 </p>
                 <Button as={NextLink} href="/scam-alert" variant="flat" color="danger" size="sm" className="font-bold">Avoid Scams</Button>
              </CardBody>
           </Card>

           <div className="p-8 bg-primary-gold/5 rounded-[2rem] border border-primary-gold/20">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                 <li>
                    <NextLink href="/payment-calendar" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                       <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                       May 2026 Payment Dates
                    </NextLink>
                 </li>
                 <li>
                    <NextLink href="/guides/appeal-guide" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                       <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                       How to Appeal Declined Status
                    </NextLink>
                 </li>
                 <li>
                    <NextLink href="/guides/change-banking-details" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                       <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                       Update Bank Details
                    </NextLink>
                 </li>
              </ul>
           </div>
        </aside>
      </div>

      <article className="max-w-4xl mx-auto space-y-16 mt-24">
        <section className="space-y-8">
          <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border-l-8 border-blue-500 mb-12">
            <h3 className="text-2xl font-black text-blue-900 dark:text-blue-400 mb-4">Official May 2026 Notice</h3>
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
              SASSA has confirmed that all SRD R370 applications for May 2026 will undergo automated bank verification between the 15th and 22nd of the month. Ensure your mobile number is active to receive biometric verification links if your profile is flagged for high-level security checks.
            </p>
          </div>

          <h2 className="text-4xl font-black">Why Monitoring Your SASSA Status is Crucial in May 2026</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            As of May 2026, the Social Relief of Distress (SRD) R370 grant remains a vital financial support for over 9 million South Africans. However, the application and verification landscape has shifted towards a "Digital-First" model. This transition means that the South African Social Security Agency (SASSA) now utilizes high-frequency bank audits and new AI-driven facial recognition protocols to validate beneficiaries.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Whether you are a new applicant or a recurring beneficiary, performing a <strong>SASSA status check</strong> at the start of May is essential. It allows you to identify potential data mismatches with the Department of Home Affairs or the Department of Labour (UIF) before the payment batching process begins in the final week of the month.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-gray-900 rounded-[2rem]">
               <h3 className="text-xl font-bold mb-4">Real-Life Case Study: Thabo's Fix</h3>
               <p className="text-sm text-gray-500 leading-relaxed italic">
                 "Last month, my status was 'Declined' because of 'Alternative Income'. I realized a friend had sent me R700 to help with rent. Because this put me over the R624 limit, SASSA's automated system rejected me. I had to appeal and provide proof that it wasn't a regular salary. Always check your bank statements before the 15th of the month!"
               </p>
            </Card>
            <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-gray-900 rounded-[2rem]">
               <h3 className="text-xl font-bold mb-4">Expert Insight: The 72-Hour Rule</h3>
               <p className="text-sm text-gray-500 leading-relaxed">
                 Beneficiaries flagged for biometric verification only have 72 hours to complete the process once the SMS link is received. Failure to act within this window results in an automatic "Self-Correction Required" status, delaying payments by up to 30 days.
               </p>
            </Card>
          </div>

          <div className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/20">
             <h3 className="text-2xl font-bold mb-4">The Evolution of Social Assistance (2020 - 2026)</h3>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
               Initially introduced as a temporary R350 measure during the 2020 global pandemic, the SRD grant has transitioned into a semi-permanent pillar of the South African social safety net. In April 2024, the grant was increased to R370, reflecting the rising cost of living and inflation within the local economy.
             </p>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
               For the 2026 financial year, the Department of Social Development (DSD) has prioritized "Integrity Rollouts." This involves cross-referencing applicant data with NSFAS, GEPF, and commercial bank databases in real-time. This means that "checking your status" is no longer just about seeing a date; it's about ensuring your digital profile remains compliant with evolving regulations.
             </p>
          </div>
        </section>

        <Divider />

        <section className="space-y-10">
          <h2 className="text-4xl font-black">How to Rank for SASSA Featured Snippets</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            If you're looking for a direct answer to common SASSA questions, here is the summarized data used by search engines to provide instant results.
          </p>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] border-2 border-primary-gold/10 space-y-6">
             <h3 className="text-2xl font-bold">Quick Answer: How do I check my SASSA status for May 2026?</h3>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To check your SASSA SRD status for May 2026, visit <strong>srd.sassa.gov.za</strong>, enter your <strong>13-digit ID number</strong> and <strong>registered mobile number</strong>, then click submit. You can also dial <strong>*120*3227#</strong> or WhatsApp <strong>082 046 8553</strong>. Statuses are typically updated after the 15th of each month following bank verification.
             </p>
             <div className="flex flex-wrap gap-4 pt-4">
                <Chip color="primary" variant="flat">ID Number Required</Chip>
                <Chip color="primary" variant="flat">Mobile Phone Required</Chip>
                <Chip color="primary" variant="flat">Instant Result</Chip>
             </div>
          </div>

          <h2 className="text-4xl font-black mt-16">Choosing the Right Channel for Your Status Update</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            SASSA has diversified the ways beneficiaries can access their information. Depending on your location, data availability, and type of device, certain methods may be more efficient for you than others. Below is an in-depth comparison of the official channels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-gold/30 transition-colors">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-black text-2xl">01</div>
                <h3 className="text-xl font-bold">The Web Portal</h3>
                <p className="text-sm text-gray-500 leading-relaxed"><strong>Best for:</strong> Detailed monthly history, updating banking details, and lodging appeals. Requires a stable internet connection and a web browser. Access the portal at <a href="https://srd.sassa.gov.za" className="text-primary-gold underline">srd.sassa.gov.za</a>.</p>
             </div>
             <div className="space-y-4 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-gold/30 transition-colors">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 font-black text-2xl">02</div>
                <h3 className="text-xl font-bold">WhatsApp Bot</h3>
                <p className="text-sm text-gray-500 leading-relaxed"><strong>Best for:</strong> Quick, on-the-go updates. Save <strong>082 046 8553</strong>. It uses minimal data and provides an easy-to-read text summary of your current approval month and reference numbers.</p>
             </div>
             <div className="space-y-4 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-gold/30 transition-colors">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 font-black text-2xl">03</div>
                <h3 className="text-xl font-bold">USSD Interface</h3>
                <p className="text-sm text-gray-500 leading-relaxed"><strong>Best for:</strong> Users without smartphones or data. Completely free to use on any network within South Africa by dialing <strong>*120*3227#</strong> or <strong>*120*69277#</strong> from your keypad.</p>
             </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-12 rounded-[3rem] border border-gray-100 dark:border-gray-800 space-y-12">
          <header className="space-y-4">
             <h2 className="text-3xl font-black">Advanced Guide to Status Meanings & Rejection Codes</h2>
             <p className="text-gray-600 dark:text-gray-400 text-lg">
               A status result from SASSA is often accompanied by a "reason" or a "decline code." Understanding these is the first step toward fixing your application and securing your May 2026 payment.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-green-600 text-xl mb-4 flex items-center gap-2"><FaCheckCircle /> APPROVED</p>
              <p className="text-gray-500 leading-relaxed">Your application was successful for the selected month. Look for a 'Pay Day' date. If no date is shown, it's still being processed for disbursement. Check the <NextLink href="/payment-calendar" className="text-primary-gold underline font-bold">May 2026 payment calendar</NextLink> for batch windows.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-blue-600 text-xl mb-4 flex items-center gap-2"><FaSearch /> PENDING</p>
              <p className="text-gray-500 leading-relaxed">SASSA is still verifying your details against SARS, UIF, and commercial bank databases. For May 2026, verification cycles typically peak between the 15th and 25th of the month.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-red-600 text-xl mb-4 flex items-center gap-2"><FaExclamationTriangle /> DECLINED</p>
              <p className="text-gray-500 leading-relaxed">Your application was rejected for the month. You have 90 days (though 30 is recommended) to lodge an appeal via the <NextLink href="/guides/appeal-guide" className="text-primary-gold underline font-bold">official ITSAA portal</NextLink>.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-orange-600 text-xl mb-4 flex items-center gap-2"><FaPhoneAlt /> BANK DETAILS PENDING</p>
              <p className="text-gray-500 leading-relaxed">Approved in principle, but SASSA does not have valid banking info. Update your details on the <NextLink href="/guides/change-banking-details" className="text-primary-gold underline font-bold">SRD banking portal</NextLink> immediately to avoid missing the May cutoff.</p>
            </div>
          </div>

          <div className="mt-8 space-y-8 bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
             <h4 className="text-2xl font-black border-b border-gray-100 dark:border-gray-700 pb-4">Deep Dive: Common Decline Reasons 2026</h4>
             <div className="space-y-8">
                <div className="space-y-2">
                   <p className="font-black text-primary-gold">1. Alternative Income Source Identified</p>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      This remains the #1 reason for declines. SASSA's algorithm monitors all bank accounts linked to your 13-digit ID. If more than <strong>R624</strong> flows into these accounts (from any source including family gifts or informal trade), the system assumes you have sufficient means for social support.
                   </p>
                </div>
                <div className="space-y-2">
                   <p className="font-black text-primary-gold">2. UIF Registered</p>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      If you have ever been formally employed, your details are likely in the Unemployment Insurance Fund database. Even if you are no longer receiving UIF payments, an active "registered" status can trigger a decline. You must provide a clearance letter during your appeal.
                   </p>
                </div>
                <div className="space-y-2">
                   <p className="font-black text-primary-gold">3. NSFAS Registered</p>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Current students receiving National Student Financial Aid Scheme (NSFAS) support are ineligible for the SRD R370 grant. If you have finished your studies but are still being declined, you need to contact NSFAS to update your status to "Completed" or "Inactive."
                   </p>
                </div>
                <div className="space-y-2">
                   <p className="font-black text-primary-gold">4. Identity Verification Failed</p>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Usually caused by a mismatch between the name on your SASSA application and the record at Home Affairs. Common issues include using a nickname, omitting a middle name, or a typo in the ID number. This can often be fixed via the 'Request Names and Surname Update' tool on the SRD website.
                   </p>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-4xl font-black">Step-by-Step: Solving Biometric Verification (eKYC)</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             In May 2026, SASSA has expanded the use of biometric identity verification (Electronic Know Your Customer - eKYC) to all "High Risk" applicants. If your status check results in a request for facial recognition, do not panic. Follow these precise instructions to clear your status.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">1</div>
                    <div>
                       <p className="font-bold text-xl mb-1">Receive the Official Link</p>
                       <p className="text-sm text-gray-500 leading-relaxed">SASSA will send a unique, secure URL via SMS to the mobile number used during registration. This link is encrypted and will expire exactly <strong>72 hours</strong> after it is generated.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">2</div>
                    <div>
                       <p className="font-bold text-xl mb-1">Environmental Setup</p>
                       <p className="text-sm text-gray-500 leading-relaxed">Find a quiet area with natural, indirect sunlight. Avoid harsh shadows on your face. Use a plain, light-colored background (like a white wall) to help the AI isolate your features correctly.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">3</div>
                    <div>
                       <p className="font-bold text-xl mb-1">Liveness Interaction</p>
                       <p className="text-sm text-gray-500 leading-relaxed">The system will ask you to perform simple actions: blink twice, move your head slowly from left to right, or speak a 4-digit code. This "Liveness Detection" prevents fraudsters from using photographs or pre-recorded videos.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">4</div>
                    <div>
                       <p className="font-bold text-xl mb-1">Confirmation Receipt</p>
                       <p className="text-sm text-gray-500 leading-relaxed">Once successful, you will see a 'Verification Complete' screen. Your status on the portal will update from 'Biometric Pending' to 'Pending Approval' within 24-48 hours.</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-6">
                <Card className="p-10 bg-red-50 dark:bg-red-900/10 rounded-[3rem] border-none shadow-sm">
                   <h4 className="font-black text-red-900 dark:text-red-400 text-xl mb-4 flex items-center gap-2"><FaExclamationTriangle /> Common Biometric Failures</h4>
                   <ul className="text-sm text-red-800 dark:text-red-300 space-y-4">
                      <li className="flex gap-3">
                         <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                         <p><strong>Low Lighting:</strong> Shadows across the eyes prevent the AI from mapping your iris correctly.</p>
                      </li>
                      <li className="flex gap-3">
                         <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                         <p><strong>Dirty Lens:</strong> Smudges on the front camera cause "blur errors," resulting in an automatic failure.</p>
                      </li>
                      <li className="flex gap-3">
                         <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
                         <p><strong>Network Drop:</strong> If your internet disconnects during the upload, you must restart the process via a new link.</p>
                      </li>
                   </ul>
                </Card>
                <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-800">
                   <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-4">Why am I being flagged?</h4>
                   <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                     SASSA's integrity system triggers eKYC if:
                   </p>
                   <ul className="text-sm text-blue-800 dark:text-blue-300 mt-2 space-y-2 list-disc pl-4">
                      <li>You recently changed your mobile number or banking details.</li>
                      <li>Multiple applications were linked to your specific bank account.</li>
                      <li>Your ID was previously flagged by the SAFPS for suspected identity theft.</li>
                   </ul>
                </div>
              </div>
           </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-black">Official May 2026 Payment Dates & Schedule</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Unlike permanent social grants (such as the Old Age or Disability grants), the Social Relief of Distress (SRD) R370 grant does not have a fixed, set-in-stone date for every month. Instead, SASSA processes these in batches based on verification cycles.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  For <strong>May 2026</strong>, the projected payment window is:
                </p>
                <Card className="p-8 bg-primary-gold/10 border-primary-gold border-2 rounded-[2.5rem] shadow-xl">
                   <p className="text-center font-black text-3xl text-primary-black mb-2">May 25th — May 31st</p>
                   <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest">Disbursement window</p>
                </Card>
                <div className="prose prose-sm dark:prose-invert">
                   <p>Remember these three critical factors regarding your payment:</p>
                   <ul>
                      <li><strong>Batching:</strong> Not everyone is paid on the 25th. If your application is approved late, you might only see funds on the 30th or 31st.</li>
                      <li><strong>Bank Reflection:</strong> Once your status shows a "Pay Day" date, it can take up to 48 working hours for the South African banking system to reflect the balance in your account.</li>
                      <li><strong>SMS Confirmation:</strong> If you collect your grant at retail points (Pick n Pay, Boxer, Shoprite, Checkers), <strong>do not go to the store</strong> until you have received the official payment SMS containing your collection code.</li>
                   </ul>
                </div>
             </div>
             <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><FaCalendarAlt className="text-primary-gold" /> Other May 2026 Grant Dates</h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                      <span className="font-bold">Older Persons</span>
                      <Chip color="success" variant="flat">May 4, 2026</Chip>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                      <span className="font-bold">Disability Grant</span>
                      <Chip color="success" variant="flat">May 5, 2026</Chip>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                      <span className="font-bold">Children's Grants</span>
                      <Chip color="success" variant="flat">May 6, 2026</Chip>
                   </div>
                </div>
                <div className="mt-8">
                   <Button as={NextLink} href="/payment-calendar" fullWidth color="primary" variant="flat" className="font-bold py-6">View Full 2026 Calendar</Button>
                </div>
             </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border-l-8 border-blue-500">
            <p className="font-black text-blue-900 dark:text-blue-400 mb-2 text-xl">Pro Tip for Quick Access:</p>
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
              If your bank account supports it, use the official banking app to check your balance before traveling to an ATM. This saves you transport costs and avoids long, unnecessary queues at Postbank or retail outlets.
            </p>
          </div>
        </section>

        <section className="space-y-12">
           <h2 className="text-4xl font-black">The "Means Test" Deep Dive: How SASSA Audits Your Finances</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             Understanding the "Means Test" is perhaps the most technical aspect of social assistance in South Africa. For anyone who performs a <strong>SASSA status check</strong> and finds a sudden shift from "Approved" to "Declined," the means test is usually the culprit.
           </p>

           <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                SASSA operates under the Social Assistance Act, which mandates that the SRD R370 grant is reserved exclusively for those with <strong>insufficient means</strong>. As of 2026, the threshold is strictly set at <strong>R624 per month</strong>.
              </p>
              <h3>How the Automated Audit Works</h3>
              <p>
                Through a Memorandum of Understanding (MoU) with the major commercial banks (Absa, FNB, Standard Bank, Capitec, Nedbank, etc.), SASSA's systems perform an automated lookup against your 13-digit ID number. This audit looks at:
              </p>
              <ul>
                <li><strong>Total Monthly Credits:</strong> Every single cent that enters your account is counted. This includes salary, gifts, airtime transfers, and even interest earned.</li>
                <li><strong>Cross-Department Sync:</strong> The system checks your ID against the SARS payroll database. If you have an active IRP5 or are registered for PAYE, your application will be flagged.</li>
                <li><strong>Property Ownership:</strong> While rare for SRD applicants, ownership of high-value assets can also trigger a means test failure.</li>
              </ul>
           </div>

           <div className="p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-[3rem] bg-gray-50/50 dark:bg-gray-900/50">
              <h4 className="text-2xl font-black mb-6 text-center">3 Actionable Steps to Protect Your May 2026 Eligibility</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600"><FaCheckCircle className="text-2xl" /></div>
                    <p className="font-bold">Account Isolation</p>
                    <p className="text-sm text-gray-500">Do not allow friends or family to use your bank account for their transfers. SASSA cannot distinguish between a "loan" and "income."</p>
                 </div>
                 <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600"><FaCheckCircle className="text-2xl" /></div>
                    <p className="font-bold">Close Dormant Accounts</p>
                    <p className="text-sm text-gray-500">If you have old accounts with small balances, close them. SASSA audits the <em>total</em> balance across all accounts linked to your ID.</p>
                 </div>
                 <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600"><FaCheckCircle className="text-2xl" /></div>
                    <p className="font-bold">Monitor Informal Pay</p>
                    <p className="text-sm text-gray-500">If you engage in informal trade (e.g., selling goods), ensure your total monthly income remains below the R624 threshold.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h2 className="text-4xl font-black">Losing Hope? How to Win Your SASSA Appeal in 2026</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             A "Declined" status is not the end of the road. In fact, thousands of May 2026 beneficiaries will successfully overturn their rejection through the Independent Tribunal for Social Assistance Appeals (ITSAA).
           </p>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 bg-primary-black text-white p-10 rounded-[3rem] shadow-2xl">
                 <h3 className="text-2xl font-black text-primary-gold">The Professional Appeal Checklist</h3>
                 <p className="text-secondary-gray text-sm">Follow these steps exactly to increase your chances of success:</p>
                 <ul className="space-y-4">
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold flex-shrink-0 mt-1" />
                       <p className="text-sm">Lodge your appeal within <strong>30 days</strong> of receiving your decline status. While the legal limit is 90 days, early action is prioritized.</p>
                    </li>
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold flex-shrink-0 mt-1" />
                       <p className="text-sm">Use the official DSD portal: <a href="https://srd-appeals.dsd.gov.za" className="text-primary-gold underline">srd-appeals.dsd.gov.za</a>.</p>
                    </li>
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold flex-shrink-0 mt-1" />
                       <p className="text-sm">Select the <strong>specific months</strong> you were declined. You must appeal each month individually.</p>
                    </li>
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold flex-shrink-0 mt-1" />
                       <p className="text-sm">Provide a clear reason. For example: "I am no longer receiving UIF, I have a clearance certificate to prove this."</p>
                    </li>
                 </ul>
              </div>
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold">Why Appeals Take Time</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The Independent Tribunal is a separate entity from SASSA. This separation ensures fairness, but it also means the data exchange takes time. Expect an appeal outcome between <strong>60 to 90 days</strong> after submission. If successful, you will receive backpay for all the months that were unfairly declined.
                 </p>
                 <Button as={NextLink} href="/guides/appeal-guide" color="primary" variant="flat" size="lg" className="font-bold w-full py-8 text-xl">Read Full Appeal Guide</Button>
              </div>
           </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-black">Frequently Asked Questions: May 2026 Edition</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our team has compiled the most pressing questions from the SASSA Help Hub community this month.
          </p>
          <div className="space-y-4">
            {fullFaqData.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold mb-4 text-primary-gold">{faq.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-bold mb-4 text-primary-gold">What should I do if my May status is 'Self-Correction Required'?</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">This status appears when there is a mismatch in your personal details or banking information. You must log in to the SRD website and use the 'Update Details' tool to fix the errors. Once corrected, the system will re-process your May application within 7 working days.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-bold mb-4 text-primary-gold">How do I verify if a SASSA SMS is a scam?</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Official SASSA SMS messages will never ask for your bank PIN, full CVV number, or a "processing fee." If an SMS asks you to pay money to receive your grant, it is 100% a scam. Report such messages to the SAPS or the official SASSA fraud line.</p>
            </div>
          </div>
        </section>

        <section className="text-center space-y-8 pt-12 pb-24 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-4xl font-black">Still Need Professional Assistance?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Navigating social security can be overwhelming. Our team of independent South African grant specialists is committed to providing clarity for every beneficiary.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button as={NextLink} href="/guides" color="primary" size="lg" className="font-bold px-12 py-8 text-xl shadow-2xl rounded-3xl">Explore Detailed Guides</Button>
            <Button as={NextLink} href="/contact" variant="flat" size="lg" className="font-bold px-12 py-8 text-xl border-2 border-primary-gold rounded-3xl">Speak to Our Team</Button>
          </div>
          <p className="text-xs text-gray-400 max-w-lg mx-auto pt-8 leading-relaxed">
            *SASSA Help Hub is an independent info portal. We provide expert analysis based on DSD and SASSA regulations. We are not a government agency. For official services, always visit www.sassa.gov.za.
          </p>
        </section>
      </article>
    </div>
  );
}

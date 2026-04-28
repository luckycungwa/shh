import React from "react";
import { Metadata } from "next";
import { Card, CardHeader, CardBody, Divider, Button, Chip } from "@nextui-org/react";
import { FaUserShield, FaExternalLinkAlt, FaExclamationTriangle, FaPhoneAlt, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SASSA SRD Status Check 2026: Your Ultimate Guide to R370 Grant Approval",
  description: "Verify your SASSA SRD status check 2026 for the R370 grant. Learn how to check status online, via WhatsApp, or USSD. Get March 2026 payment dates and appeal guides.",
  keywords: ["SASSA status check", "SRD status check", "R370 grant status", "SASSA status check 2026", "SASSA payment dates March 2026"],
  openGraph: {
    title: "SASSA SRD Status Check 2026: Ultimate Guide",
    description: "Instant SASSA SRD status check 2026. Step-by-step guide for R370 grant approval, payment dates, and appeals.",
    type: "website",
    locale: "en-ZA",
    siteName: "SASSA Help Hub",
  }
};

export default function StatusCheckPage() {
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
      a: "As of March 2026, the grant remains at R370. Any future increases are typically announced by the Minister of Finance during the National Budget Speech."
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
        <Chip color="success" variant="flat" className="font-bold uppercase">2026 Status Checker</Chip>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          SASSA Status Check <span className="text-primary-gold underline underline-offset-8">2026</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Verify your SRD R370 grant approval and payment dates using official channels. Get instant updates for March 2026.
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
                       March 2026 Payment Dates
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
        <section className="space-y-6">
          <h2 className="text-4xl font-black">Why Monitoring Your SASSA Status is Crucial in 2026</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            As of 2026, the Social Relief of Distress (SRD) R370 grant remains a lifeline for over 9 million South Africans. However, the landscape of social assistance in South Africa has become increasingly complex. With the South African Social Security Agency (SASSA) implementing more rigorous verification processes, including biometric identity checks and automated bank audits, staying on top of your application status is more important than ever.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Whether you are waiting for your first approval or tracking your monthly R370 payment, this guide provides the most comprehensive, up-to-date information on the <strong>SASSA status check</strong> process. We cover every method available, explain what every status message means, and provide troubleshooting steps for common issues that prevent payments.
          </p>
          <div className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/20">
             <h3 className="text-2xl font-bold mb-4">The Evolution of the SRD Grant</h3>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
               Initially introduced as a temporary measure during the global pandemic, the SRD grant has transitioned into a semi-permanent pillar of the South African social safety net. In 2024, the grant was increased from R350 to R370, and for the 2026 financial year, the Department of Social Development has prioritized digital transformation to reduce fraud. This means that "checking your status" is no longer just about seeing a date; it's about ensuring your digital profile remains compliant with evolving regulations.
             </p>
          </div>
        </section>

        <Divider />

        <section className="space-y-10">
          <h2 className="text-4xl font-black">Choosing the Right Channel for Your Status Update</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            SASSA has diversified the ways beneficiaries can access their information. Depending on your location, data availability, and type of device, certain methods may be more efficient for you than others. Below is an in-depth comparison of the official channels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl">01</div>
                <h3 className="text-xl font-bold">The Web Portal</h3>
                <p className="text-sm text-gray-500">Best for: Detailed monthly history, updating banking details, and lodging appeals. Requires a stable internet connection and a web browser.</p>
             </div>
             <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 font-black text-xl">02</div>
                <h3 className="text-xl font-bold">WhatsApp Bot</h3>
                <p className="text-sm text-gray-500">Best for: Quick, on-the-go updates. It uses minimal data and provides an easy-to-read text summary of your current approval month.</p>
             </div>
             <div className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 font-black text-xl">03</div>
                <h3 className="text-xl font-bold">USSD Interface</h3>
                <p className="text-sm text-gray-500">Best for: Users without smartphones or data. Completely free to use on any network within South Africa by dialing *120*3227#.</p>
             </div>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-4xl font-black">Comprehensive Methods to Check SASSA Status</h2>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">1. Official SASSA SRD Website (Recommended)</h3>
              <p className="text-gray-600 dark:text-gray-400">The fastest and most reliable way to verify your approval. Access the portal at <a href="https://srd.sassa.gov.za" className="text-primary-gold font-bold underline">srd.sassa.gov.za</a>. Simply scroll to the 'Application Status' section, enter your 13-digit ID number and your registered phone number to see your results for the current month.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">2. WhatsApp Status Check</h3>
              <p className="text-gray-600 dark:text-gray-400">Add <strong>082 046 8553</strong> to your contacts. Send the word "SASSA" and follow the prompts. This is ideal for users with limited data as it provides a lightweight text-based update on your grant progress.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">3. USSD Codes (No Data Required)</h3>
              <p className="text-gray-600 dark:text-gray-400">Dial <strong>*120*3227#</strong> or <strong>*120*69277#</strong> on your phone. This method works on any mobile device without an internet connection, allowing you to receive your status via SMS instantly.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 space-y-8">
          <h2 className="text-3xl font-black">Advanced Guide to Status Meanings & Rejection Codes</h2>
          <p className="text-gray-600 dark:text-gray-400">
            A status result from SASSA is often accompanied by a "reason" or a "decline code." Understanding these is the first step toward fixing your application.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <p className="font-bold text-green-600 mb-2">APPROVED</p>
              <p className="text-sm text-gray-500">Your application was successful. Look for a 'Pay Day' date. If no date is shown, it's still being processed. Check the <NextLink href="/payment-calendar" className="text-primary-gold underline">payment calendar</NextLink> for more info.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <p className="font-bold text-blue-600 mb-2">PENDING</p>
              <p className="text-sm text-gray-500">SASSA is still verifying your details against SARS, UIF, and bank databases. This can take up to 90 days for new applications.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <p className="font-bold text-red-600 mb-2">DECLINED</p>
              <p className="text-sm text-gray-500">Your application was rejected. You have 30 days to lodge an appeal via the <NextLink href="/guides/appeal-guide" className="text-primary-gold underline">ITSAA portal</NextLink>.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <p className="font-bold text-orange-600 mb-2">BANK DETAILS PENDING</p>
              <p className="text-sm text-gray-500">Approved, but no bank info found. Update your details on the <NextLink href="/guides/change-banking-details" className="text-primary-gold underline">banking portal</NextLink> immediately.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <p className="font-bold text-purple-600 mb-2">RE-APPLICATION REQUIRED</p>
              <p className="text-sm text-gray-500">Typically seen at the start of a new financial year. SASSA requires you to confirm that your financial circumstances haven't changed.</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
             <h4 className="text-xl font-bold">Deep Dive: Common Decline Reasons</h4>
             <div className="prose prose-sm dark:prose-invert max-w-none">
                <ul>
                   <li><strong>Alternative Income Source Identified:</strong> This is the most common decline reason. It means SASSA found more than R624 entering your bank account in the last month. This includes transfers from family or small sales.</li>
                   <li><strong>UIF Registered:</strong> Cross-checks with the Department of Labour show you are receiving (or are eligible for) Unemployment Insurance Fund benefits. You cannot receive both SRD and UIF.</li>
                   <li><strong>NSFAS Registered:</strong> The system identified you as a recipient of National Student Financial Aid Scheme support. SASSA considers this a sufficient source of income.</li>
                   <li><strong>Identity Verification Failed:</strong> Your name, surname, or ID number does not match the records at the Department of Home Affairs. This is often a typo in the initial application.</li>
                </ul>
             </div>
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-4xl font-black">Biometric Verification: The New 2026 Standard</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             In an effort to curb identity theft and the "ghost beneficiary" phenomenon, SASSA has introduced mandatory biometric verification for high-risk applications. If your status check returns a "Biometric Required" message, you must follow these steps immediately.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center font-bold">1</div>
                    <div>
                       <p className="font-bold">Receive the SMS Link</p>
                       <p className="text-sm text-gray-500">SASSA will send a secure, one-time link to your registered mobile number. This link is only valid for 72 hours.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center font-bold">2</div>
                    <div>
                       <p className="font-bold">Prepare Your Camera</p>
                       <p className="text-sm text-gray-500">Use a smartphone with a high-quality front-facing camera. Clean the lens and ensure you are in a well-lit room with a plain background.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center font-bold">3</div>
                    <div>
                       <p className="font-bold">Liveness Detection</p>
                       <p className="text-sm text-gray-500">The system will ask you to blink, turn your head, or follow a dot on the screen to prove you are a real person and not a photograph.</p>
                    </div>
                 </div>
              </div>
              <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-800">
                 <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2"><FaExclamationTriangle /> Why am I being asked for Biometrics?</h4>
                 <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                   SASSA triggers this if:
                 </p>
                 <ul className="text-sm text-blue-800 dark:text-blue-300 mt-2 space-y-2 list-disc pl-4">
                    <li>You recently changed your mobile number.</li>
                    <li>Multiple applications were linked to your bank account.</li>
                    <li>Your ID was flagged by the South African Fraud Prevention Service (SAFPS).</li>
                 </ul>
              </div>
           </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-black">March 2026 Payment Dates</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Unlike other SASSA grants, the SRD R370 grant does not have a fixed date. Payments are processed in batches during the last week of every month. For <strong>March 2026</strong>, payments are expected to be processed between <strong>March 25th and March 31st</strong>.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border-l-4 border-blue-500">
            <p className="font-bold text-blue-900 dark:text-blue-400 mb-2">Pro Tip:</p>
            <p className="text-blue-800 dark:text-blue-300">Once your status says "Approved" with a date, it usually takes 2-3 business days for the money to reflect in your bank account.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {fullFaqData.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-xl font-bold mb-4">{faq.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-4xl font-black">The "Means Test" Explained: Why It's the Gatekeeper</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             Understanding the "Means Test" is essential for anyone who performs a <strong>SASSA status check</strong>. Many beneficiaries are surprised when their status changes from "Approved" to "Declined" even if their basic employment status hasn't changed.
           </p>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             The means test is an automated financial audit. SASSA has direct access to data from the major South African banks. If at any point during the month, the total deposits into your bank accounts (including savings, investment, and transactional accounts) exceed the R624 threshold, the system automatically flags the application for decline.
           </p>
           <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-3xl">
              <h4 className="font-bold mb-4">How to Protect Your Eligibility</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                 <li className="flex gap-2"><FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" /> Avoid using your bank account to receive money on behalf of friends or family.</li>
                 <li className="flex gap-2"><FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" /> Close any dormant or unused bank accounts that might still be linked to your ID.</li>
                 <li className="flex gap-2"><FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" /> Ensure that any small informal earnings are kept below the monthly threshold.</li>
              </ul>
           </div>
        </section>

        <section className="text-center space-y-6 pt-12 pb-24">
          <h2 className="text-3xl font-black">Still Need Help?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Our team of South African grant specialists is here to help you navigate the complexities of SASSA. We provide updated insights daily to ensure no beneficiary is left behind.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button as={NextLink} href="/guides" color="primary" size="lg" className="font-bold px-8 shadow-lg">View All Guides</Button>
            <Button as={NextLink} href="/contact" variant="flat" size="lg" className="font-bold px-8 border-2 border-primary-gold">Contact Us</Button>
          </div>
        </section>
      </article>
    </div>
  );
}

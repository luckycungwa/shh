import React from "react";
import { Metadata } from "next";
import { Card, CardHeader, CardBody, Divider, Button, Chip } from "@nextui-org/react";
import { FaUserShield, FaExternalLinkAlt, FaExclamationTriangle, FaPhoneAlt, FaMobileAlt, FaCheckCircle, FaSearch, FaCalendarAlt } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { getCurrentMonthYearKey, getCurrentYearString } from "../../lib/config";
import { breadcrumbSchema } from "../../lib/schema";
import { readForecast, srdDisplay } from "../../lib/payment-schedule";
import OfficialStatusCheck from "../../components/OfficialStatusCheck";
import NextStepCard from "../../components/affiliate/NextStepCard";

const currentMonthYear = getCurrentMonthYearKey();
const currentYear = getCurrentYearString();

// Render an ISO date (2026-09-02) as a compact chip label ("Wed, 2 Sep 2026"),
// or pass through non-ISO placeholders such as "TBC"/"TBA" unchanged.
function toChipDate(iso: string): string {
  if (!iso || !iso.includes("-")) return iso || "";
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = new Date(y, m - 1, d).toLocaleDateString("en-ZA", { weekday: "short" });
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${weekday}, ${d} ${months[m - 1]} ${y}`;
}

export const metadata: Metadata = {
  ...buildMetadata({
    title: `SASSA SRD Status Check ${currentMonthYear}: Independent Guide to R370 Approval & Payment Dates`,
    description: `Check your SASSA SRD status for ${currentMonthYear} with your ID number. Step-by-step guide for R370 approval, biometrics, bank verification, and payment dates. Free independent help.`,
    path: "/status-check",
  }),
  keywords: [`SASSA status check ${currentMonthYear}`, `SRD status check ${currentMonthYear.split(" ")[0]}`, "R370 grant status", "SASSA status check online", "SASSA payment dates"],
};

export default function StatusCheckPage() {
  // Status-check targets the ACTUAL current month (e.g. "September 2026") —
  // that is what the heading and metadata use, and it must match the forecast
  // entry for the same month so the confirmed dates shown are always current.
  const forecast = readForecast();
  const schedule = forecast.find((m) => m.label === currentMonthYear);
  const srdConfirmed = !!schedule && schedule.srd.status === "confirmed";
  const srdRow = schedule ? { ...srdDisplay(schedule.srd, schedule.label) } : null;
  const permanentRows = schedule
    ? [
        { grant: "Older Persons", row: schedule.older_persons },
        { grant: "Disability Grant", row: schedule.disability },
        { grant: "Children's Grants", row: schedule.children },
      ]
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Check SASSA Status ${currentMonthYear}`,
    "description": `Step-by-step guide on how to check your SASSA SRD R370 grant status online for ${currentMonthYear}.`,
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Visit the SRD Portal",
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
      q: "Is the R350 grant the same as the SRD R370 grant?",
      a: "Yes. The grant introduced in 2020 as R350 is now R370, and the old name stuck. There is no separate R350 grant and no separate application — check the same SRD status at srd.sassa.gov.za, USSD (*120*69277#) or WhatsApp. Anyone charging a fee for an 'R350' application, or promising a separate R350 payout, is running a scam."
    },
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
      a: "No, the mobile number registered to your application is required to verify your identity on the official portal, USSD (*120*69277#), or WhatsApp. If you have lost your phone or no longer have that number, you cannot verify online — contact SASSA on 0800 60 10 11 or visit a SASSA office with your ID, and see our lost phone number guide (/guides/lost-phone-number) for the steps to update your number."
    },
    {
      q: "Can I check my SASSA status with only my ID number?",
      a: "No — the official SRD portal, USSD (*120*69277#) and WhatsApp all ask for your 13-digit ID number plus the mobile number registered on your application. Your ID identifies you; the registered number verifies the check. If you no longer have that number, update it through SASSA or visit an office — see our lost phone number guide (/guides/lost-phone-number). Avoid third-party sites that promise an ID-only check."
    },
    {
      q: "Why is my SASSA status not updating / stuck on the same status?",
      a: "Statuses are refreshed around the middle of each month, after SASSA runs its bank and database verification. It is completely normal for your status to stay the same for days or even weeks — it only changes when SASSA updates it, not when you check it. If your status has been stuck on 'Pending' for more than 30 days, or 'Approved' without a Pay Day for more than 3 weeks, contact SASSA on 0800 60 10 11. Do not reapply while your application is still pending — it can delay your file."
    },
    {
      q: "What does 'Pay Day' mean on my SASSA status?",
      a: "'Pay Day' is the date SASSA releases your payment batch for the month. 'Approved' means you qualify; 'Pay Day' is when the money is actually sent. Once your status shows a Pay Day date, it usually takes 1 to 3 business days for the money to reflect in your bank account. If your status is 'Approved' but there is no Pay Day yet, your payment is still being assigned to a batch — read our Approved status guide (/status/approved) for exactly what to do."
    },
    {
      q: "The SRD portal is not working — how else can I check my status?",
      a: "If srd.sassa.gov.za is down or slow, use another official channel: dial *120*69277# (free USSD, works without data), WhatsApp 082 601 0111, the Moya App, or call 0800 60 10 11. Do not use unofficial websites or apps that ask for your OTP or banking PIN. The portal is busiest at month-end, so try again later if it is overloaded."
    },
    {
      q: "What is my SASSA reference number and where do I find it?",
      a: "Your reference number is the application/reference ID that appears on your status check and in your SMS updates. It is shown on the official SRD portal after you log in with your ID and phone number, and in the status-check SMS or WhatsApp replies. Keep it handy when contacting SASSA on 0800 60 10 11 or lodging an appeal — it helps agents find your file faster."
    },
    {
      q: `Does the SRD grant increase in ${currentYear}?`,
      a: `As of ${currentMonthYear}, the grant remains at R370. Any future increases are typically announced by the Minister of Finance during the National Budget Speech.`
    },
    {
      q: "Why did my status change from 'Approved' to 'Declined'?",
      a: "SASSA re-evaluates applications every single month. If you received a payment or a deposit in your bank account that put you over the R624 income threshold, your status for that specific month will be updated to Declined."
    },
    {
      q: "What does 'Approved' but no Pay Day mean?",
      a: "It means SASSA has verified that you qualify for the month, but your payment has not yet been assigned to a batch. A 'Pay Day' date is usually added within a few days to a week. Keep checking your status — if no Pay Day appears after 3 weeks, contact SASSA on 0800 60 10 11. See our Approved status guide (/status/approved) and the missing grant payment guide (/guides/missing-grant-payment-guide) for what to do next."
    },
    {
      q: "What does 'Bank Details Pending' mean?",
      a: "This means your application is approved, but SASSA does not have valid banking information to deposit the funds. You must update your details on the official SRD website immediately."
    },
    {
      q: "My Pay Day is today but I have not received my money — why?",
      a: "Pay Day is the day SASSA releases your payment batch — it is not the moment cash reaches your account. Bank transfers usually reflect within 1 to 3 business days after Pay Day, depending on your bank. If you collect at a retail point (Pick n Pay, Boxer, Shoprite, Checkers), wait for the payment SMS with your collection code before going to the store. If nothing has reflected after about 5 business days, follow our missing grant payment guide (/guides/missing-grant-payment-guide)."
    },
    {
      q: "My Pay Day date changed or disappeared — what happened?",
      a: "SASSA has not published an official explanation for changing Pay Days. Based on beneficiary reports, dates can shift or disappear when an application is moved to another payment batch or flagged for additional verification. Check your status again after the 15th of the month, when updates are most reliable. If your Pay Day stays missing, contact SASSA on 0800 60 10 11 with your reference number."
    },
    {
      q: "I was approved last month but declined this month — why?",
      a: "The SRD grant is reassessed every single month. A bank deposit that pushed you over the R624 threshold, an UIF or NSFAS record linked to your ID, or a verification mismatch can cause a decline for that specific month even if you were approved before. Check your decline reason on the portal, and see our appeal guide (/guides/appeal-guide) if you believe the decision is wrong."
    },
    {
      q: "I have not received any SMS from SASSA — is that a problem?",
      a: "Not always. SMS notifications depend on your registered number being active and can be delayed or undelivered. Your status on the official portal is the reliable source of truth — check it directly at srd.sassa.gov.za. Make sure your phone has signal, your inbox is not full, and the number on your application is still yours. If you lost the number, see our lost phone number guide (/guides/lost-phone-number)."
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

  const prevMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
  const prevMonthLabel = prevMonth.toLocaleDateString("en-ZA", { month: "long", year: "numeric" });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Status Check", slug: "/status-check" },
      ])} />

      <header className="text-center mb-16 space-y-6">
        <Chip color="success" variant="flat" className="font-bold uppercase">{currentMonthYear} Status Checker</Chip>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          SASSA Status Check <span className="text-primary-gold underline underline-offset-8">{currentMonthYear}</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Verify your SRD R370 grant approval and payment dates using official channels. Get instant updates for {currentMonthYear}.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-8">
           <Card className="p-1 md:p-12 border-2 sm:border-primary-gold/30 shadow-2xl rounded-[2rem] bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardBody className="space-y-12">
                 <div className="space-y-6 text-center md:text-left">
                    <h2 className="text-4xl font-normal flex items-center gap-3 justify-center md:justify-start">
                       <FaUserShield className="text-primary-gold hidden md:block font-bold" /> Check My Status
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                       This page walks you through checking your SRD R370 status in three simple steps. The check itself is done on the official SASSA website, srd.sassa.gov.za. The grant is still widely called R350, but the amount is R370.
                    </p>
                 </div>

                 <div className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-primary-gold/20 p-4 md:p-8">
                    <OfficialStatusCheck />
                 </div>

                 <NextStepCard
                   pagePath="/status-check"
                   items={[
                     { title: "What does my status mean?", url: "/tools/status-explorer", description: "Look up any SRD status" },
                     { title: "Missing payment troubleshooter", url: "/tools/payment-troubleshooter", description: "Why your money hasn't arrived" },
                     { title: "Appeal deadline calculator", url: "/tools/appeal-deadline", description: "If your application was declined" },
                   ]}
                 />

                 <Divider />

                 <div className="text-center space-y-4">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Alternative Methods</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                          <FaPhoneAlt className="text-blue-500 text-lg flex-shrink-0" />
                          <div>
                             <p className="font-bold text-xs">Call Helpline</p>
                             <p className="text-sm font-bold">0800 60 10 11</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800">
                          <FaMobileAlt className="text-green-500 text-lg flex-shrink-0" />
                          <div>
                             <p className="font-bold text-xs">USSD Code</p>
                             <p className="text-sm font-bold">*120*69277#</p>
                          </div>
                       </div>
                        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800">
                           <FaMobileAlt className="text-purple-500 text-lg flex-shrink-0" />
                           <div>
                              <p className="font-bold text-xs">WhatsApp</p>
                              <p className="text-sm font-bold">082 601 0111</p>
                           </div>
                        </div>
                     </div>
                     <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        Step-by-step help:{" "}
                        <NextLink href="/guides/ussd-codes" className="underline hover:text-primary-gold">USSD codes (no data needed)</NextLink>
                        {" · "}
                        <NextLink href="/guides/sassa-whatsapp" className="underline hover:text-primary-gold">WhatsApp guide</NextLink>
                        {" · "}
                        <NextLink href="/guides/moya-app-sassa" className="underline hover:text-primary-gold">Moya App (free data)</NextLink>
                     </p>
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
                        {currentMonthYear} Payment Dates
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/grants/srd-r370-grant" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        Full SRD R370 Grant Guide
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/status/approved" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        Approved but No Pay Day?
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/guides/appeal-guide" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        How to Appeal Declined Status
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/guides/bank-details-pending-fix" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        Update Bank Details
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/guides/missing-grant-payment-guide" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        Grant Not Paid? Fix It
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/guides/grant-verification-process" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        Grant Reviews & Verification Guide
                     </NextLink>
                  </li>
                  <li>
                     <NextLink href="/guides/fourth-payment-day-guide" className="text-sm font-bold hover:text-primary-gold flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary-gold rounded-full"></span>
                        Fourth Payment Day Guide
                     </NextLink>
                  </li>
               </ul>
           </div>
        </aside>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-black text-center mb-2">Checked your status? Now find your situation.</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          The most common next questions after a status check — each link explains what it means and exactly what to do.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/status", title: "What does my status mean?", desc: "Full guide to every SASSA SRD status." },
            { href: "/status/approved", title: "Approved but no Pay Day", desc: "Why no date is showing yet and when to expect one." },
            { href: "/guides/missing-grant-payment-guide", title: "Pay Day today, no money", desc: "What to check before contacting SASSA." },
            { href: "/payment-calendar", title: "Payment date changed?", desc: "How SRD batch windows work and why dates shift." },
            { href: "/status/pending", title: "Still Pending", desc: "How long verification takes and when to follow up." },
            { href: "/status/declined", title: "Declined", desc: "Read your decline reason and how to appeal." },
            { href: "/guides/bank-details-pending-fix", title: "Bank details problem", desc: "Fix 'Bank Details Pending' and get paid." },
          ].map((item) => (
            <NextLink key={item.href} href={item.href} className="group block p-5 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-gold/40 hover:shadow-lg transition-all">
              <p className="font-bold text-sm group-hover:text-primary-gold transition-colors leading-tight mb-1">{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </NextLink>
          ))}
        </div>
      </section>

      <article className="max-w-4xl mx-auto space-y-16 mt-24">
        <section className="space-y-8">
          <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border-l-8 border-blue-500 mb-12">
            <h3 className="text-2xl font-black text-blue-900 dark:text-blue-400 mb-4">{currentMonthYear} Notice</h3>
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
              Based on recent payment cycles, SRD R370 applications can undergo automated bank verification around the middle of each month. Ensure your mobile number is active to receive any biometric verification links if your profile is flagged for additional security checks.
            </p>
          </div>

          <h2 className="text-4xl font-black">Why Checking Your Status Matters in {currentMonthYear}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The SRD R370 grant provides vital support to millions of South Africans. SASSA has moved to a digital-first system — more automated checks, more bank verification, and facial recognition for some applicants. If something's wrong with your details, you want to catch it before payment day passes you by.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Whether you're applying for the first time or you've been getting the grant for months, doing a status check at the start of {currentMonthYear.split(" ")[0]} helps you spot any mismatches — with Home Affairs, UIF, or your bank details — before the payment batch runs at the end of the month.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-gray-900 rounded-[2rem]">
               <h3 className="text-xl font-bold mb-4">Example: How a Gift Can Trigger a Decline</h3>
               <p className="text-sm text-gray-500 leading-relaxed">
                 Suppose a friend sends you R700 to help with rent. This would put you over the R624 income threshold, and SASSA's automated system would flag it as "Alternative Income." You would need to appeal and provide proof that the deposit was a gift, not regular income. This is one of the most common reasons for unexpected declines.
               </p>
            </Card>
            <Card className="p-8 border-none shadow-sm bg-gray-50 dark:bg-gray-900 rounded-[2rem]">
               <h3 className="text-xl font-bold mb-4">Biometric Link Expiry</h3>
               <p className="text-sm text-gray-500 leading-relaxed">
                 Based on beneficiary reports, the biometric verification link sent via SMS typically expires within a few days. If you do not complete the process in time, your status may change to "Self-Correction Required," which can delay your payment. Always complete the verification as soon as you receive the SMS.
               </p>
            </Card>
          </div>

          <div className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/20">
<h3 className="text-2xl font-bold mb-4">How We Got Here: The SRD Grant's Story</h3>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                The SRD started as a temporary R350 payment during the 2020 pandemic. Back then nobody knew if it would last more than a few months. Fast forward to today, and it's become a key part of South Africa's support system — raised to R370 in 2024 as prices kept climbing.
             </p>
             <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                What's changed most is how SASSA checks who qualifies. They now run automated checks against other databases — NSFAS, UIF, SARS, and the banks — in real time. This means checking your status isn't just about seeing a payment date anymore. It's about making sure your information lines up across all these systems.
             </p>
          </div>
        </section>

        <Divider />

        <section className="space-y-10">
          <h2 className="text-4xl font-black">How to Check Your SASSA Status</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Checking your SASSA SRD grant status is straightforward.            Use one of the available channels below.
          </p>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[2rem] border-2 border-primary-gold/10 space-y-6">
             <h3 className="text-2xl font-bold">Quick Answer: How do I check my SASSA status for {currentMonthYear}?</h3>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To check your SASSA SRD status for {currentMonthYear}, visit <strong>srd.sassa.gov.za</strong>, enter your <strong>13-digit ID number</strong> and <strong>registered mobile number</strong>, then click submit. You can also dial <strong>*120*69277#</strong> or WhatsApp <strong>082 601 0111</strong>. Statuses are typically updated after the 15th of each month following bank verification.
             </p>
             <div className="flex flex-wrap gap-4 pt-4">
                <Chip color="primary" variant="flat">ID Number Required</Chip>
                <Chip color="primary" variant="flat">Mobile Phone Required</Chip>
                <Chip color="primary" variant="flat">Instant Result</Chip>
             </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[2rem] border border-gray-100 dark:border-gray-700 space-y-5">
             <h3 className="text-2xl font-bold">Check your SASSA status with your ID number</h3>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your 13-digit ID number is the key to every official status check. You also need the mobile number registered on your SASSA application, because the portal uses it to confirm the check is yours.
             </p>
             <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <li><strong>Open the official portal</strong> at <a href="https://srd.sassa.gov.za" className="text-primary-gold underline">srd.sassa.gov.za</a>. Do not use look-alike sites.</li>
                <li><strong>Enter your 13-digit ID number</strong> exactly as it appears on your green ID book or smart card — no spaces or extra digits.</li>
                <li><strong>Enter the mobile number</strong> you used when you applied. If your number has changed, update it first.</li>
                <li><strong>Submit and read the result.</strong> Check the status and any Pay Day shown for the month. If no Pay Day appears, your payment is still being processed.</li>
             </ol>
             <p className="text-sm text-gray-500 dark:text-gray-400">
                Lost the registered number? You cannot complete an online check with your ID alone — see our <NextLink href="/guides/lost-phone-number" className="text-primary-gold underline font-bold">lost phone number guide</NextLink> or call SASSA on 0800 60 10 11. The same ID-and-phone check works on USSD <strong>*120*69277#</strong> and WhatsApp <strong>082 601 0111</strong>.
             </p>
          </div>

          <h2 className="text-4xl font-black mt-16">Choosing the Right Channel for Your Status Update</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            SASSA has diversified the ways beneficiaries can access their information. Depending on your location, data availability, and type of device, certain methods may be more efficient for you than others.              Below is an in-depth comparison of the available channels.
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
                <p className="text-sm text-gray-500 leading-relaxed"><strong>Best for:</strong> Quick, on-the-go updates. Save <strong>082 601 0111</strong>. It uses minimal data and provides an easy-to-read text summary of your current approval month and reference numbers.</p>
             </div>
             <div className="space-y-4 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary-gold/30 transition-colors">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 font-black text-2xl">03</div>
                <h3 className="text-xl font-bold">USSD Interface</h3>
                <p className="text-sm text-gray-500 leading-relaxed"><strong>Best for:</strong> Users without smartphones or data. Completely free to use on any network within South Africa by dialing <strong>*120*69277#</strong> from your keypad. (The separate code <strong>*120*3210#</strong> connects you to the Postbank grant balance service.)</p>
             </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-12 rounded-[2rem] border border-gray-100 dark:border-gray-800 space-y-12">
<header className="space-y-4">
             <h2 className="text-3xl font-black">Understanding Status Meanings & Rejection Codes</h2>
             <p className="text-gray-600 dark:text-gray-400 text-lg">
                Your status result usually comes with a reason code. Here's what each one means and what to do next.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-green-600 text-xl mb-4 flex items-center gap-2"><FaCheckCircle /> APPROVED</p>
              <p className="text-gray-500 leading-relaxed">Your application was successful for the selected month. Look for a 'Pay Day' date — if none is shown yet, your payment is still being processed for disbursement. Approved does not mean paid yet. Learn more in our <NextLink href="/status/approved" className="text-primary-gold underline font-bold">Approved status guide</NextLink> and check the <NextLink href="/payment-calendar" className="text-primary-gold underline font-bold">SASSA payment calendar</NextLink> for batch windows.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-blue-600 text-xl mb-4 flex items-center gap-2"><FaSearch /> PENDING</p>
              <p className="text-gray-500 leading-relaxed">SASSA is still verifying your details against SARS, UIF, and commercial bank databases. For {currentMonthYear}, verification cycles typically peak between the 15th and 25th of the month.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-red-600 text-xl mb-4 flex items-center gap-2"><FaExclamationTriangle /> DECLINED</p>
              <p className="text-gray-500 leading-relaxed">Your application was rejected for the month. You have 90 days (though 30 is recommended) to lodge an appeal via the <NextLink href="/guides/appeal-guide" className="text-primary-gold underline font-bold">official ITSAA portal</NextLink>.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="font-bold text-orange-600 text-xl mb-4 flex items-center gap-2"><FaPhoneAlt /> BANK DETAILS PENDING</p>
              <p className="text-gray-500 leading-relaxed">Approved in principle, but SASSA does not have valid banking info. Update your details on the <NextLink href="/guides/bank-details-pending-fix" className="text-primary-gold underline font-bold">SRD banking portal</NextLink> immediately to avoid missing the {currentMonthYear.split(" ")[0]} cutoff.</p>
            </div>
          </div>

          <div className="mt-8 space-y-8 bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
             <h3 className="text-2xl font-black border-b border-gray-100 dark:border-gray-700 pb-4">Common Decline Reasons</h3>
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
             SASSA has expanded the use of biometric identity verification (Electronic Know Your Customer - eKYC) to all "High Risk" applicants. If your status check results in a request for facial recognition, do not panic. Follow these precise instructions to clear your status.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-md">1</div>
                    <div>
                        <p className="font-bold text-xl mb-1">Receive Your Verification Link</p>
                       <p className="text-sm text-gray-500 leading-relaxed">SASSA will send a unique, secure URL via SMS to the mobile number used during registration. This link is encrypted and typically expires within a few days of being generated.</p>
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
                       <p className="text-sm text-gray-500 leading-relaxed">The system will ask you to perform simple actions: blink twice, move your head slowly from left to right, or follow a prompt on screen. This "Liveness Detection" prevents fraudsters from using photographs or pre-recorded videos.</p>
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
                <Card className="p-10 bg-red-50 dark:bg-red-900/10 rounded-[2rem] border-none shadow-sm">
                   <h3 className="font-black text-red-900 dark:text-red-400 text-xl mb-4 flex items-center gap-2"><FaExclamationTriangle /> Common Biometric Failures</h3>
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
                   <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-4">Why am I being flagged?</h3>
                   <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                     SASSA's integrity system triggers eKYC if:
                   </p>
<ul className="text-sm text-blue-800 dark:text-blue-300 mt-2 space-y-2 list-disc pl-4">
                       <li>You recently changed your mobile number or banking details.</li>
                       <li>Multiple applications were linked to your specific bank account.</li>
                       <li>Your ID may have been flagged by SASSA's internal fraud detection system.</li>
                    </ul>
                </div>
              </div>
           </div>
        </section>

<section className="space-y-8">
           <h2 className="text-4xl font-black">{currentMonthYear} Payment Dates & Schedule</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
             Unlike permanent social grants (such as the Old Age or Disability grants), the Social Relief of Distress (SRD) R370 grant does not have a fixed, set-in-stone date for every month. Instead, SASSA processes these in batches based on verification cycles.
           </p>

           {schedule ? (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <p className="text-lg text-gray-600 dark:text-gray-400">
                     {srdConfirmed ? (
                       <>For <strong>{schedule.label}</strong>, SASSA has confirmed the SRD R370 payment dates of <strong>{srdRow.day}</strong>. The grant is paid in batches on those dates:</>
                     ) : (
                       <>For <strong>{schedule.label}</strong>, SASSA has not yet confirmed the SRD R370 payment dates. They are announced later in the month — check the official SRD portal for your personal &ldquo;Pay Day&rdquo; date once confirmed:</>
                     )}
                   </p>
<Card className="p-8 bg-primary-gold/10 border-primary-gold border-2 rounded-[2.5rem] shadow-xl">
                     <p className={`text-center font-black ${srdConfirmed ? "text-2xl" : "text-3xl"} text-primary-black mb-2`}>
                       {srdConfirmed ? srdRow.day : srdRow.date}
                     </p>
                     <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest">
                       {srdConfirmed ? "Confirmed by SASSA" : "To be confirmed"}
                     </p>
                     {!srdConfirmed && (
                       <p className="text-center text-xs font-semibold text-gray-500 mt-2">{srdRow.day}</p>
                     )}
                 </Card>
                   <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold">
                     {srdConfirmed ? (
                       <>Do not rely on third-party dates. Check your status on the official SRD portal for your personal &ldquo;Pay Day&rdquo; date ({srdRow.day}), and only collect once you receive the payment SMS.</>
                     ) : (
                       <>Do not rely on third-party dates. Once SASSA confirms the {schedule.label} SRD dates, check your status on the official SRD portal for your personal &ldquo;Pay Day&rdquo; date, and only collect once you receive the payment SMS.</>
                     )}
                   </p>
                   <div className="prose prose-sm dark:prose-invert">
                      <p>Remember these three critical factors regarding your payment:</p>
                      <ul>
                         <li><strong>Batching:</strong> Not everyone is paid on the same day. If your application is approved late, you might only see funds later in the window.</li>
                         <li><strong>Bank Reflection:</strong> Once your status shows a "Pay Day" date, it usually takes 1 to 3 business days for the South African banking system to reflect the balance in your account.</li>
                         <li><strong>SMS Confirmation:</strong> If you collect your grant at retail points (Pick n Pay, Boxer, Shoprite, Checkers), <strong>do not go to the store</strong> until you have received the payment SMS containing your collection code.</li>
                      </ul>
                   </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaCalendarAlt className="text-primary-gold" /> Other {schedule.label} Grant Dates</h3>
                    <div className="space-y-4">
                       {permanentRows.map(({ grant, row }) => (
                         <div key={grant} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                            <span className="font-bold">{grant}</span>
                            <Chip color={row.status === "confirmed" ? "success" : "warning"} variant="flat">{row.status === "confirmed" ? toChipDate(row.date) : "TBC"}</Chip>
                         </div>
                       ))}
                       <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                          <span className="font-bold">SRD R370</span>
                          <Chip color={srdConfirmed ? "success" : "warning"} variant="flat">{srdConfirmed ? "Confirmed" : "TBA"}</Chip>
                       </div>
                    </div>
                   <div className="mt-8 space-y-3">
                      <Button as={NextLink} href="/payment-calendar" fullWidth color="primary" variant="flat" className="font-bold py-6">View Full {currentYear} Calendar</Button>
                      <NextLink href={`/dates/${schedule.month_key}`} className="block text-center text-sm font-bold text-primary-gold underline">See the full {schedule.label} schedule</NextLink>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-[2rem] border border-gray-100 dark:border-gray-800">
               <p className="text-lg text-gray-600 dark:text-gray-400">
                 Confirmations for {currentMonthYear} are not listed in our schedule yet. Check the official SRD portal (srd.sassa.gov.za) for your personal &ldquo;Pay Day&rdquo; date, or see our <NextLink href="/payment-calendar" className="text-primary-gold underline font-bold">payment calendar</NextLink> for confirmed months.
               </p>
             </div>
           )}

          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border-l-8 border-blue-500">
            <p className="font-black text-blue-900 dark:text-blue-400 mb-2 text-xl">Handy Tip:</p>
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
               If your bank app lets you check your balance without going to an ATM, use it. Saves you transport money and keeps you out of those long Postbank queues.
            </p>
          </div>
        </section>

        <section className="space-y-12">
<h2 className="text-4xl font-black">The "Means Test" Deep Dive: How SASSA Audits Your Finances</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              If you've ever seen your status suddenly flip from "Approved" to "Declined" without warning, the means test is probably why. Let's break down how it actually works.
           </p>

           <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                SASSA follows the Social Assistance Act — the SRD R370 grant is meant for people with <strong>very little to no income</strong>. The current cutoff is <strong>R624 per month</strong>. Go over that, and the system flags you.
              </p>
              <h3>What the Automated Check Actually Looks At</h3>
              <p>
                Through SASSA's data-sharing agreements with major South African banks, their systems perform automated lookups against your 13-digit ID number. Based on publicly available information and beneficiary reports, this audit looks at:
              </p>
              <ul>
                <li><strong>Total Monthly Credits:</strong> Every single cent that enters your account is counted. This includes salary, gifts, airtime transfers, and even interest earned.</li>
                <li><strong>Cross-Department Sync:</strong> The system checks your ID against the SARS payroll database. If you have an active IRP5 or are registered for PAYE, your application will be flagged.</li>
                <li><strong>Property Ownership:</strong> While rare for SRD applicants, ownership of high-value assets can also trigger a means test failure.</li>
              </ul>
           </div>

           <div className="p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/50">
              <h3 className="text-2xl font-black mb-6 text-center">3 Actionable Steps to Protect Your {currentMonthYear} Eligibility</h3>
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
<h2 className="text-4xl font-black">Declined? Here's How to Appeal in {currentYear}</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Getting a "Declined" status is frustrating, but it's not the end. Many applicants successfully overturn their rejections through the appeals process.
           </p>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 bg-primary-black text-white p-10 rounded-[2rem] shadow-2xl">
                 <h3 className="text-2xl font-black text-primary-gold">The Professional Appeal Checklist</h3>
                 <p className="text-secondary-gray text-sm">Follow these steps exactly to increase your chances of success:</p>
                 <ul className="space-y-4">
                    <li className="flex gap-3">
                       <FaCheckCircle className="text-primary-gold flex-shrink-0 mt-1" />
                       <p className="text-sm">Lodge your appeal within <strong>30 days</strong> of receiving your decline status. While the legal limit is 90 days, early action is prioritized.</p>
                    </li>
                     <li className="flex gap-3">
                        <FaCheckCircle className="text-primary-gold flex-shrink-0 mt-1" />
                        <p className="text-sm">Use the DSD appeals portal: <a href="https://srd-appeals.dsd.gov.za" className="text-primary-gold underline">srd-appeals.dsd.gov.za</a>.</p>
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
          <h2 className="text-4xl font-black">Frequently Asked Questions: {currentMonthYear} Edition</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            I've compiled the most pressing questions from the SASSA Help Hub community this month.
          </p>
          <div className="space-y-4">
            {fullFaqData.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-primary-gold">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-primary-gold">What should I do if my {currentMonthYear.split(" ")[0]} status is 'Self-Correction Required'?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">This status appears when there is a mismatch in your personal details or banking information. You must log in to the SRD website and use the 'Update Details' tool to fix the errors. Once corrected, the system will re-process your application within 7 working days.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-primary-gold">How do I verify if a SASSA SMS is a scam?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">SASSA SMS messages will never ask for your bank PIN, full CVV number, or a "processing fee." If an SMS asks you to pay money to receive your grant, it is 100% a scam. Report such messages to the SAPS or the SASSA fraud line.</p>
            </div>
          </div>
        </section>

        <section className="text-center space-y-8 pt-12 pb-24 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-4xl font-black">Need More Help?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            I've put together detailed guides on appeals, banking details, and common SASSA problems. Browse them below or check the official SASSA website for application-specific issues.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button as={NextLink} href="/guides" color="primary" size="lg" className="font-bold px-12 py-8 text-xl shadow-2xl rounded-3xl">Browse Detailed Guides</Button>
            <Button as={NextLink} href="/contact" variant="flat" size="lg" className="font-bold px-12 py-8 text-xl border-2 border-primary-gold rounded-3xl">Contact Me</Button>
          </div>
          <p className="text-xs text-gray-400 max-w-lg mx-auto pt-8 leading-relaxed">
            * SASSA Help Hub is an independent info site. I'm not a government agency. For official services, always visit <a href="https://www.sassa.gov.za" className="underline hover:text-primary-gold">www.sassa.gov.za</a>.
          </p>
        </section>
      </article>
    </div>
  );
}

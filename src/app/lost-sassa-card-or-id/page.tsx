import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Chip, Divider, Button } from "@nextui-org/react";
import { FaIdCard, FaExclamationTriangle, FaShieldAlt, FaCreditCard, FaCheckCircle, FaPhoneAlt, FaMapMarkerAlt, FaRegBell } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { breadcrumbSchema, articleSchema, faqPageSchema } from "../../lib/schema";
import { getCurrentYearString } from "../../lib/config";
import { getFact } from "../../lib/canonical-facts";
import NextStepCard from "../../components/affiliate/NextStepCard";

const currentYear = getCurrentYearString();
const lastUpdated = "2026-09-18";
const goldCardFact = getFact("sassa_gold_card");
const blackCardFact = getFact("postbank_black_card");
const replacementCost = getFact("card_replacement_cost");

export const metadata: Metadata = buildMetadata({
  title: `Lost SASSA Card or ID in ${currentYear}? What to Do Now`,
  description: `Lost or stolen SASSA Gold Card or SA ID in ${currentYear}? How to report it, replace your card for free at Postbank, protect your grant from fraud, and get your money without the card.`,
  path: "/lost-sassa-card-or-id",
});

export default function LostSassaCardOrIdPage() {
  const faqs = [
    {
      q: "What should I do first if my SASSA card is lost or stolen?",
      a: "Report the loss immediately. Contact the Postbank call centre, report it to your nearest police station (you will need a case number or affidavit), and notify SASSA on 0800 60 10 11. Reporting quickly protects your grant from being withdrawn fraudulently.",
    },
    {
      q: "How much does it cost to replace a SASSA card?",
      a: "Replacing a SASSA/Postbank card at a designated Postbank service point is free of charge. If anyone asks you to pay a fee to replace or 'reactivate' your card, it is a scam.",
    },
    {
      q: "Can I still get my grant money without my card?",
      a: `Yes, in most cases. If your grant is paid into a bank account you can still access it by card or app for that account. If you rely on the SASSA/Postbank card, you can usually collect or receive your payment through an alternative method while you wait for a replacement — contact SASSA on 0800 60 10 11 to confirm the options for your specific case.`,
    },
    {
      q: "What is the Postbank Black Card and do I need one?",
      a: `${blackCardFact} The SASSA Gold Card stopped working after 31 August 2026, so every beneficiary must use a Postbank Black Card to access their funds. The replacement is still free at Postbank service points, well after the deadline.`,
    },
    {
      q: "What if my ID is stolen, not just my card?",
      a: "A stolen ID puts you at risk of identity theft. Report it to the police (get a case number), report it to the Department of Home Affairs to block misuse and apply for a replacement, and let SASSA know so your grant records are flagged.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={articleSchema("Lost SASSA Card or ID: What to Do", "How to report a lost or stolen SASSA card or SA ID, replace it free, protect your grant from fraud, and access money while waiting.", "/lost-sassa-card-or-id", "Lucky Cungwa", lastUpdated)} />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Lost Card or ID", slug: "/lost-sassa-card-or-id" },
      ])} />

      <header className="text-center mb-14 space-y-6">
        <Chip color="danger" variant="flat" className="font-bold uppercase">Don't Panic — Here's What to Do</Chip>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Lost or Stolen SASSA Card or ID? <span className="text-primary-gold">Act Fast.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Losing your SASSA Gold Card or ID is stressful, but your grant is protected if you act quickly. Here&rsquo;s the exact order of steps to take.
        </p>
      </header>

      <div className="p-8 mb-14 rounded-3xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
        <p className="font-black text-red-800 dark:text-red-400 mb-3 flex items-center gap-2 text-xl"><FaExclamationTriangle /> Act quickly to protect your grant</p>
        <p className="text-red-700 dark:text-red-300 leading-relaxed">
          A lost or stolen SASSA card means someone else could try to withdraw your money. Do steps 1 and 2 on the same day to minimise the risk. Remember: replacement is free, and anyone who asks you to pay is a scammer.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 mb-16">
        {[
          { step: "1", title: "Report it to Postbank immediately", body: "Contact the Postbank call centre on 0800 53 54 64 (or the USSD/ATM service) to report the card as lost or stolen and request a block. This stops anyone from using it. Keep a note of the date and time of your report.", icon: <FaCreditCard /> },
          { step: "2", title: "Open a police case", body: "Visit your nearest police station with your ID (or as much information as you have) to report the loss/theft. You will receive a case number or affidavit — keep it; you may need it to replace the card and to prove fraud if money is taken.", icon: <FaShieldAlt /> },
          { step: "3", title: "Notify SASSA", body: "Call SASSA on 0800 60 10 11 to flag your grant record, especially if the card is linked to how you receive payment. They can advise on protecting the grant and confirming your current payment method.", icon: <FaPhoneAlt /> },
          { step: "4", title: "Replace the card for free", body: `Visit a designated Postbank service point (located inside Shoprite, Checkers, Usave, Pick n Pay, Boxer or Spar) with your valid SA ID or temporary ID to get a replacement. ${replacementCost}`, icon: <FaMapMarkerAlt /> },
        ].map((s, i) => (
          <div key={i} className="flex gap-6 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black text-xl shadow-md">{s.step}</div>
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><span className="text-primary-gold">{s.icon}</span> {s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-3xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-400 mb-3 flex items-center gap-2"><FaRegBell /> Card Migration: What It Means Now</h3>
          <p className="text-yellow-800 dark:text-yellow-300 leading-relaxed mb-3">{goldCardFact}</p>
          <p className="text-yellow-800 dark:text-yellow-300 leading-relaxed">{blackCardFact}</p>
          <p className="text-sm text-yellow-700 mt-3">
            If you replace a lost card today, you get the Postbank Black Card directly &mdash; no need to migrate a second time.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2"><FaIdCard /> Keep Your Money Flowing While You Wait</h3>
          <ul className="text-blue-800 dark:text-blue-300 space-y-3 leading-relaxed">
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> If your grant is paid into a bank account, you can keep using that account&rsquo;s card or app — no action needed.</li>
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Confirm your payment method is up to date on the SRD portal so a new card isn&rsquo;t a blocker.</li>
            <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Ask SASSA whether an alternative collection option applies while your replacement is processed.</li>
          </ul>
        </div>
      </div>

      <NextStepCard
        pagePath="/lost-sassa-card-or-id"
        items={[
          { title: "Report a scam or identity theft", url: "/scam-alert", description: "What to do if someone uses your details" },
          { title: "Check a suspicious message", url: "/tools/scam-message-checker", description: "See if a payment or ID request is a scam" },
          { title: "Check / update my status", url: "/status-check", description: "Make sure your payment is on track" },
          { title: "Update my payment method", url: "/guides/bank-details-pending-fix", description: "Confirm how you receive your grant" },
          { title: "Find a Postbank/SASSA service point", url: "/sassa-offices", description: "Locate a replacement card point" },
        ]}
      />

      <section className="max-w-4xl mx-auto space-y-8 mt-16">
        <Divider />
        <div>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <p className="font-bold mb-2">{f.q}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
          Independent, unofficial guide. Card migration and replacement details last reviewed {lastUpdated}; confirm with Postbank/SASSA on the phone before acting. We are not affiliated with SASSA or Postbank.
        </p>
      </section>
    </div>
  );
}

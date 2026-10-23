import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Chip, Divider, Button } from "@nextui-org/react";
import { FaCoins, FaUserCheck, FaCalendarAlt, FaFileSignature, FaInfoCircle, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { breadcrumbSchema, articleSchema, faqPageSchema } from "../../lib/schema";
import { getCurrentYearString } from "../../lib/config";
import { getFact } from "../../lib/canonical-facts";
import NextStepCard from "../../components/affiliate/NextStepCard";

const currentYear = getCurrentYearString();
const lastUpdated = "2026-09-18";
const srdAmount = getFact("srd_grant_amount");
const incomeLimit = getFact("srd_income_limit");
const ageMin = getFact("srd_age_range_min");
const ageMax = getFact("srd_age_range_max");
const extensionDate = getFact("srd_extension_date");

export const metadata: Metadata = buildMetadata({
  title: `How Much Is the SASSA SRD Grant in ${currentYear}? (R370, R624 Limit)`,
  description: `The SRD R370 grant pays ${srdAmount}/month in ${currentYear}, with an income limit of ${incomeLimit}/month. Who qualifies, when it ends (${extensionDate}), and what the amount means for you. Verified facts.`,
  path: "/how-much-is-srd-grant",
});

export default function HowMuchIsSrdGrantPage() {
  const faqs = [
    {
      q: `How much is the SASSA SRD grant in ${currentYear}?`,
      a: `The SRD R370 grant pays ${srdAmount} per month to qualifying applicants aged ${ageMin} to ${ageMax}. This has been the amount since April 2024, and there has been no official announcement of an increase for ${currentYear}.`,
    },
    {
      q: "How much can I earn and still get the SRD grant?",
      a: `To qualify for the SRD grant you may not earn more than ${incomeLimit} per month. If your total monthly deposits and income go above this limit, your application for that month will be declined.`,
    },
    {
      q: "Is the SRD grant permanent?",
      a: `No. The SRD grant is a temporary relief grant that must be extended by the Minister of Finance. The current extension runs until ${extensionDate}. You must also re-qualify every month, as SASSA re-checks your income and records monthly.`,
    },
    {
      q: "Why do people still call it the R350 grant if the amount is R370?",
      a: "The SRD grant started as R350 in 2020 during the COVID-19 pandemic and was called the 'R350 grant'. It was raised to R370 from April 2024, but the old name stuck. It is the same grant at the same official application: srd.sassa.gov.za. If someone tells you the grant 'went back to R350' or asks you to pay to get the 'new' R370, that is a scam.",
    },
    {
      q: "Do I have to reapply for the SRD grant every month?",
      a: "No, but you are automatically re-assessed each month. Your bank account, income and government records are checked again every cycle, so your status can change from one month to the next even if you do not reapply.",
    },
    {
      q: "Why was I declined if my income is below R624?",
      a: "A decline does not always mean you earned too much. Other reasons include a UIF or NSFAS record linked to your ID, an identity-verification mismatch with Home Affairs, or a transaction pattern that SASSA flagged. Check your decline reason and lodge a free appeal if you believe the decision is wrong.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={articleSchema(`How Much Is the SASSA SRD Grant in ${currentYear}?`, `The SRD R370 grant pays ${srdAmount}/month with a ${incomeLimit} income limit, running to ${extensionDate}. Verified facts on amount, eligibility and payment.`, "/how-much-is-srd-grant", "Lucky Cungwa", lastUpdated)} />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "How Much Is the SRD Grant?", slug: "/how-much-is-srd-grant" },
      ])} />

      <header className="text-center mb-14 space-y-6">
        <Chip color="warning" variant="flat" className="font-bold uppercase">Verified Answer</Chip>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          How Much Is the SASSA SRD Grant in <span className="text-primary-gold">{currentYear}?</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          The short answer: you receive <strong className="text-primary-gold">{srdAmount} per month</strong>, if your income is below {incomeLimit}. Here is exactly what that means.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
        <div className="p-8 rounded-3xl bg-gray-900 dark:bg-gray-800 text-white text-center shadow-xl">
          <div className="w-14 h-14 mx-auto bg-primary-gold rounded-2xl flex items-center justify-center text-primary-black text-2xl mb-4"><FaCoins /></div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Monthly amount</p>
          <p className="text-5xl font-black text-primary-gold my-2">{srdAmount}</p>
          <p className="text-sm text-gray-400">Per month, paid into your bank account</p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-4"><FaUserCheck /></div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Income limit</p>
          <p className="text-5xl font-black dark:text-white my-2">{incomeLimit}</p>
          <p className="text-sm text-gray-500">Maximum monthly income to qualify</p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-2xl flex items-center justify-center text-2xl mb-4"><FaCalendarAlt /></div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Current extension until</p>
          <p className="text-3xl font-black dark:text-white my-3 leading-tight">{extensionDate}</p>
          <p className="text-sm text-gray-500">Grant must be renewed by the Minister</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <section className="space-y-8">
          <h2 className="text-3xl font-black">Where Does the R370 Amount Come From?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The SRD grant was introduced in 2020 as a temporary R350 monthly payment during the COVID-19 pandemic. It was raised from <strong>R350 to R370</strong> in 2024 to keep up with rising prices. The amount and the R624 income limit are confirmed in the national budget announced by the Minister of Finance, most recently verified against the {currentYear} Budget.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Any future increase is typically announced during the annual National Budget Speech. Until such an announcement, the amount stays at <strong>{srdAmount}</strong> — do not fall for messages claiming the grant has gone up or down, as most of those are scams.
          </p>

          <div className="p-8 rounded-3xl bg-primary-gold/5 border border-primary-gold/20">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><FaInfoCircle className="text-primary-gold" /> Who Qualifies for the {srdAmount} Amount?</h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-3 leading-relaxed">
              <li className="flex gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> You are aged between <strong>{ageMin} and {ageMax}</strong>.</li>
              <li className="flex gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> You are unemployed or earn below <strong>{incomeLimit} per month</strong>.</li>
              <li className="flex gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> You do not receive another social grant, UIF, or NSFAS funding.</li>
              <li className="flex gap-3"><FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" /> You are a South African citizen, permanent resident, or refugee, and live in South Africa.</li>
            </ul>
          </div>
        </section>

        <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border-l-8 border-blue-500">
          <p className="font-black text-blue-900 dark:text-blue-400 mb-2">Important: the amount vs. what you actually receive</p>
          <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
            {srdAmount} is your monthly grant. It is paid via bank transfer, or you can collect it at a retail point (Pick n Pay, Boxer, Shoprite, Checkers). No fees are deducted from your grant — if someone asks you to pay a fee to "release" or "unlock" your R370, it is a scam.
          </p>
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl font-black">What the R624 Income Limit Really Means</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The SRD grant is meant for people with very little or no income. SASSA checks your bank accounts and other records each month. If more than <strong>{incomeLimit}</strong> flows through accounts linked to your ID in a month, the system assumes you do not need the grant and declines you for that month.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            This includes money you might not think of as "income" — a family member sending you money, a stokvel payout, informal sales, or interest earned. If you are declined for this reason and the record is wrong, you can appeal the month within 90 days; the appeal reassesses the information SASSA already had, so new proof cannot be added.
          </p>
          <NextStepCard
            pagePath="/how-much-is-srd-grant"
            items={[
              { title: "Check my SRD status", url: "/status-check", description: "See if you qualify this month" },
              { title: "Read the full SRD grant guide", url: "/grants/srd-r370-grant", description: "Application, eligibility and payments" },
              { title: "Declined? How to appeal", url: "/guides/appeal-guide", description: "Free appeal on the ITSAA portal" },
              { title: "Do I qualify? Use the checker", url: "/eligibility-check", description: "Basic eligibility questions" },
            ]}
          />
        </section>

        <Divider />

        <section className="space-y-6">
          <h2 className="text-3xl font-black">When Will I Actually Be Paid?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The SRD payment does not have a fixed date every month. SASSA processes it in a batch window in the last week of the month, and each beneficiary gets a "Pay Day" date on their status check once approved. After Pay Day, the money usually reflects in your bank within 1 to 3 business days.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Check your status for your personal Pay Day date rather than relying on third-party schedules, and only go to a retail point to collect once you receive the payment SMS.
          </p>
          <Button as={NextLink} href="/payment-calendar" color="primary" variant="flat" className="font-bold">View the Payment Calendar</Button>
        </section>

        <Divider />

        <section className="space-y-6">
          <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <p className="font-bold mb-2">{f.q}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
          Independent, unofficial guide. Amounts and limits verified against the {currentYear} Budget and official DSD/SASSA announcements, last reviewed {lastUpdated}. We are not affiliated with SASSA.
        </p>
      </div>
    </div>
  );
}

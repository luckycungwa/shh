import React from "react";
import type { Metadata } from "next";
import { Chip, Divider } from "@nextui-org/react";
import JsonLd from "../../components/JsonLd";
import EditorialFooter from "../../components/EditorialFooter";
import { breadcrumbSchema } from "../../lib/schema";
import { SITE_CONFIG, getCurrentYearString } from "../../lib/config";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `SASSA Glossary: Complete Guide to Grant Terms & Definitions ${getCurrentYearString()}`,
  description: "Understand every SASSA term: SRD, means test, ITSAA, Pay Day, eKYC, USSD, and 50+ more terms explained in plain South African English.",
  path: "/glossary",
  ogType: "article",
});

const terms = [
  { term: "SRD", definition: "Social Relief of Distress — a temporary monthly grant of R370 for unemployed South Africans aged 18–59 who have no income or financial support." },
  { term: "Means Test", definition: "An assessment SASSA uses to check your income and assets against a threshold. If your means exceed the threshold, you do not qualify for the grant." },
  { term: "Income Threshold", definition: `The maximum monthly income you can earn and still qualify for a grant. For the SRD grant, the threshold is R624 per month as of ${getCurrentYearString()}.` },
  { term: "ITSAA", definition: "Independent Tribunal for Social Assistance Appeals — an independent body separate from SASSA that reviews grant appeals and makes binding decisions." },
  { term: "Pay Day", definition: "The specific date assigned to your approved grant when SASSA processes payment. It appears on your SRD status page next to your approved status." },
  { term: "eKYC", definition: "Electronic Know Your Customer — a digital identity verification process that may include facial recognition (taking a selfie) to confirm your identity." },
  { term: "OTP", definition: "One-Time PIN — a 6-digit code sent via SMS to verify your identity when logging into the SRD portal or completing an application." },
  { term: "USSD", definition: "Unstructured Supplementary Service Data — short codes like *120*69277# that work on any phone without internet to check your SASSA grant status." },
  { term: "RICA", definition: "Regulation of Interception of Communications Act — a South African law requiring all SIM cards to be registered with your ID number and proof of address." },
  { term: "SC19 Form", definition: "The official name of the SRD grant application form. It is available only online at srd.sassa.gov.za." },
  { term: "Back Pay", definition: "Money paid to you for months you were incorrectly declined. If your appeal is approved, SASSA pays you for all the months you missed." },
  { term: "Life Certification", definition: `An annual process where SASSA confirms you are still alive and eligible. In ${getCurrentYearString()}, this can be done digitally via the SASSA self-service portal.` },
  { term: "Self-Service Portal", definition: `SASSA's online system introduced in ${getCurrentYearString()} that allows beneficiaries to complete life certification, update profiles, and check status without visiting an office.` },
  { term: "Postbank", definition: "The state-owned bank that manages SASSA grant payments. Postbank issues the SASSA Gold Card (now Black Card) for grant collections." },
  { term: "SASSA Gold Card", definition: `A payment card previously issued by SASSA for grant collections. Replaced by the Postbank Black Card in 2025/${getCurrentYearString()}.` },
  { term: "Postbank Black Card", definition: "The current official SASSA grant payment card issued by Postbank. Used to withdraw grants at Post Office branches, ATMs, and retailers." },
  { term: "Cash Send", definition: "An SRD grant payment method that allows you to collect your R370 at Pick n Pay or Boxer stores using an SMS code, without needing a bank account." },
  { term: "NSFAS", definition: "National Student Financial Aid Scheme — if SASSA detects you are registered with NSFAS, your SRD grant application will be declined." },
  { term: "UIF", definition: "Unemployment Insurance Fund — if you are receiving UIF payments, you cannot receive the SRD grant for the same month." },
  { term: "SARS", definition: "South African Revenue Service — SASSA cross-checks your ID number with SARS records to see if you are registered for PAYE tax." },
  { term: "Declined", definition: "A status meaning your application did not meet SASSA's requirements for that month. You can appeal a decline within 90 days." },
  { term: "Pending", definition: "The most common SASSA status. It means your application is being verified against government databases. Most applications stay Pending for 1 to 4 weeks." },
  { term: "Referred", definition: "A status meaning your application was flagged for manual human review because the automated system could not make a decision." },
  { term: "Bank Details Pending", definition: "A status meaning your grant is approved but SASSA cannot pay you because your banking details are missing, invalid, or unverified." },
  { term: "Identity Verification Failed", definition: "A decline reason meaning your name or ID number does not match Department of Home Affairs records." },
  { term: "Income Source Detected", definition: "The most common decline reason for SRD applications. It means SASSA found deposits in your bank account exceeding R624 for the month." },
  { term: "BIS", definition: "Basic Income Support — a proposed permanent grant that may replace the SRD grant after March 2027. Details have not been finalised." },
  { term: "Care Dependency Grant", definition: "A SASSA grant of R2,400 per month for caregivers of children with severe disabilities who require full-time care." },
  { term: "Grant-in-Aid", definition: "A supplementary grant of R580 per month for Old Age or Disability grant recipients who need full-time care from another person." },
  { term: "War Veterans Grant", definition: "A SASSA grant of R2,420 per month for South Africans who served in World War II or the Korean War and meet the means test." },
];

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": `SASSA Glossary ${getCurrentYearString()}`,
    "description": "Complete glossary of SASSA grant terms and definitions.",
    "url": `${SITE_CONFIG.url}/glossary`,
    "mainEntityOfPage": `${SITE_CONFIG.url}/glossary`,
    "hasDefinedTerm": terms.map((t) => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition,
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Glossary", slug: "/glossary" },
      ])} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Glossary</span>
      </nav>

      <article>
        <header className="space-y-6 mb-12">
          <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">Reference</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            SASSA Glossary: 30+ Terms Explained
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Every SASSA grant term you will encounter, explained in plain South African English. From SRD to ITSAA, means test to Postbank Black Card.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {terms.map((t, i) => (
            <div key={i} id={t.term.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl hover:shadow-lg transition-shadow">
              <p className="font-bold text-primary-gold text-sm mb-1">{t.term}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{t.definition}</p>
            </div>
          ))}
        </div>

        <Divider className="my-12" />
        <EditorialFooter lastUpdated="10 August 2026" author="Lucky Cungwa" />
      </article>
    </div>
  );
}

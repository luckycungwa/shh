import React from "react";
import type { Metadata } from "next";
import { Chip } from "@nextui-org/react";
import { FaBook, FaPenFancy, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Authors — SASSA Grant Specialists",
  description: "Meet the team behind SASSA Help Hub: Themba Phakathi and Zanele Nkosi, South African benefit specialists with years of experience covering SASSA grants, payments, and applications.",
  path: "/authors",
});

const authors = [
  {
    name: "Themba Phakathi",
    role: "Senior SASSA Grant Specialist",
    initials: "TP",
    bio: "Themba Phakathi has been covering South Africa's social grant system since 2019. He specialises in the SRD R370 grant, application processes, appeals, and eligibility requirements. Themba has written extensively about the monthly means test, income thresholds, and the ITSAA appeals process. His work focuses on helping unemployed South Africans navigate the SRD system and successfully appeal declined applications. He also covers SASSA technology tools including USSD codes, the Moya App, and biometric verification.",
    topics: ["SRD R370 Grant", "Appeals & Declined Applications", "Eligibility & Means Test", "Technology Tools (USSD, Moya, Biometrics)", "Grant Comparisons", "Document Checklists", "Postbank Card Migration"],
    contentCount: "20+ grant guides, 4 decline reason analyses, 4 grant detail pages",
    color: "bg-blue-500",
  },
  {
    name: "Zanele Nkosi",
    role: "SASSA Benefits & Banking Specialist",
    initials: "ZN",
    bio: "Zanele Nkosi specialises in SASSA payment methods, banking details, account management, and grant-specific guides. She has deep knowledge of how SASSA's payment system works — from bank verification to Postbank Black Cards, Cash Send, and retail collection. Zanele writes step-by-step guides for lost phone numbers, life certification, grant reinstatement, and fraud protection. She also covers child-specific grants including Child Support, Foster Child, and Care Dependency grants, as well as province-specific SASSA challenges.",
    topics: ["Banking Details & Payment Methods", "Account Management (Phone, Life Cert, Reinstatement)", "Child Support, Foster Child & Care Dependency Grants", "SRD Monthly Reassessment", "Scam Prevention & Online Security", "Province-Specific SASSA Guides", "Grant Suspension & Reinstatement"],
    contentCount: "10+ user guides, 4 grant detail pages, 4 decline reason analyses, 9 province guides",
    color: "bg-green-500",
  },
];

export default function AuthorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs mb-4">
          Meet the Team
        </Chip>
        <h1 className="text-5xl font-black tracking-tight mb-6">
          Our Authors
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Every guide on SASSA Help Hub is written by a real person with years of experience covering South Africa's social grant system. Our authors are independent specialists who verify every fact against official SASSA and government sources.
        </p>
      </header>

      <div className="space-y-16">
        {authors.map((author) => (
          <section key={author.name} className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
            <div className="text-center md:text-left">
              <div className={`w-24 h-24 ${author.color} rounded-3xl flex items-center justify-center mx-auto md:mx-0 mb-4`}>
                <span className="text-3xl font-black text-white">{author.initials}</span>
              </div>
              <h2 className="text-2xl font-black">{author.name}</h2>
              <p className="text-sm text-primary-gold font-bold mt-1">{author.role}</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <Chip size="sm" variant="flat" color="primary" startContent={<FaBook />}>
                  {author.contentCount.split(",")[0]}
                </Chip>
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-2">About</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{author.bio}</p>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-2">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {author.topics.map((topic) => (
                    <Chip key={topic} size="sm" variant="flat" className="text-xs">
                      {topic}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500">
                  <FaShieldAlt className="inline mr-1 text-primary-gold" />
                  All content is fact-checked against official SASSA and government sources. See our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>.
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 text-center p-10 bg-primary-gold/5 rounded-3xl border border-primary-gold/10">
        <FaPhoneAlt className="text-3xl text-primary-gold mx-auto mb-4" />
        <h2 className="text-2xl font-black mb-3">Need to Verify Something?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
          All information on this site is for guidance only. For official decisions about your grant, contact SASSA directly.
        </p>
        <p className="text-sm text-gray-500">
          SASSA Helpline: <strong className="text-primary-gold">0800 60 10 11</strong>
        </p>
      </section>
    </div>
  );
}
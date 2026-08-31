import React from "react";
import type { Metadata } from "next";
import { Chip } from "@nextui-org/react";
import { FaPenFancy, FaShieldAlt, FaSearch, FaCheckCircle, FaLink, FaEnvelope } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About the SASSA Help Hub Editorial Team",
  description: "Meet the team behind SASSA Help Hub — an independent, unofficial information resource documenting South Africa's social grant system.",
  path: "/authors",
});

const authors = [
  {
    name: "SASSA Help Hub Editorial Team",
    role: "Independent, unofficial public-information resource",
    initials: "SH",
    bio: "SASSA Help Hub is an independent, unofficial public-information resource. It is not affiliated with SASSA, the Department of Social Development, or any government agency. The resource exists to help people navigate South Africa's social grant system by explaining official announcements, payment schedules, eligibility rules, and application and appeal processes in plain language, always linking to the official sources where available. Content is researched and edited by the SASSA Help Hub editorial team and reviewed against official sources where available.",
    topics: ["SRD R370 Grant", "Appeals & Declined Applications", "Eligibility & Means Test", "Payment Schedules & Banking", "All SASSA Grant Types", "Province-Specific Guides", "Scam Prevention"],
    color: "bg-primary-gold",
  },
];

const verificationProcess = [
  "Facts are checked against official sources where available — sassa.gov.za, srd.sassa.gov.za, srd-appeals.dsd.gov.za, services.sassa.gov.za, gov.za, and treasury.gov.za — and the sources are listed on the relevant page.",
  "Grant amounts, income thresholds, and effective dates are drawn from a single canonical facts table so the same figure is never stated differently across two pages.",
  "Each page records its last-updated date, and guides are reviewed when SASSA announces changes to amounts, thresholds, or processes.",
  "Where a claim cannot be confirmed against an official source, the page says so instead of guessing.",
  "Decline-reason and status guides describe SASSA's published decline codes and processing rules, without presenting unconfirmed statistics.",
];

const policies = [
  { title: "Editorial Policy", href: "/editorial-policy" },
  { title: "Fact-Checking Policy", href: "/fact-checking-policy" },
  { title: "Sources Policy", href: "/sources-policy" },
  { title: "Corrections Policy", href: "/corrections-policy" },
];

export default function AuthorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Authors", slug: "/authors" },
      ])} />
      <header className="text-center mb-16">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs mb-4">
          About
        </Chip>
        <h1 className="text-5xl font-black tracking-tight mb-6">
          About the Author
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          SASSA Help Hub is an independent, unofficial resource. Content is researched and edited by the SASSA Help Hub editorial team and checked against official sources where available.
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
                  SASSA Help Hub is independent and unofficial. Content is checked against official sources where available. See our <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>.
                </p>
              </div>
            </div>
          </section>
        ))}

        <section className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <FaSearch className="text-primary-gold" /> How We Research & Verify
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            This site exists because grant information is scattered, confusing, and frequently wrong online. Our process for every guide:
          </p>
          <ul className="space-y-3">
            {verificationProcess.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                <FaCheckCircle className="text-primary-gold mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <FaPenFancy className="text-primary-gold" /> Transparency & Independence
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To be fully transparent: SASSA Help Hub is an independent, unofficial publication. It is not a government website, and it is not affiliated with SASSA, the Department of Social Development, or any government agency. It documents public information released by the official agencies, explains it in plain language, and links to primary sources so readers can check the work. No payment is accepted from government departments or third parties for coverage, and there are no paid promotional articles on this site.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {policies.map((policy) => (
              <NextLink key={policy.href} href={policy.href} className="inline-flex items-center gap-2 text-sm font-bold bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full hover:text-primary-gold transition-colors">
                <FaLink className="text-primary-gold text-xs" /> {policy.title}
              </NextLink>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16 text-center p-10 bg-primary-gold/5 rounded-3xl border border-primary-gold/10">
        <FaEnvelope className="text-3xl text-primary-gold mx-auto mb-4" />
        <h2 className="text-2xl font-black mb-3">Found a Mistake or Missing Information?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
          Tell us about it. We correct errors promptly and publicly under our corrections policy. For official decisions about your grant, contact SASSA directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NextLink href="/contact" className="inline-flex items-center gap-2 font-bold bg-primary-gold text-primary-black px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
            <FaEnvelope /> Contact the Editor
          </NextLink>
          <div>
            <p className="text-sm text-gray-500">
              SASSA Helpline: <strong className="text-primary-gold">0800 60 10 11</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
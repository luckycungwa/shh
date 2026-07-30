import React from "react";
import type { Metadata } from "next";
import { Chip } from "@nextui-org/react";
import { FaBook, FaPenFancy, FaShieldAlt, FaPhoneAlt } from "react-icons/fa";
import NextLink from "next/link";
import { buildMetadata } from "../../lib/seo";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About the Author — Lucky Cungwa",
  description: "SASSA Help Hub is created by Lucky Cungwa, an independent researcher and writer covering South Africa's social grant system, SASSA payments, and application processes.",
  path: "/authors",
});

const authors = [
  {
    name: "Lucky Cungwa",
    role: "SASSA Grant Researcher & Writer",
    initials: "LC",
    bio: "Lucky Cungwa is an independent researcher and writer who has been tracking and documenting South Africa's social grant system since 2020. He created SASSA Help Hub to provide clear, practical guidance for grant applicants navigating the SRD R370, Child Support Grant, Old Age Pension, and other SASSA programmes. Lucky's work involves monitoring SASSA announcements, analysing payment trends, compiling province-specific information, and breaking down complex eligibility rules into straightforward steps. He is committed to helping South Africans access the social grants they are entitled to.",
    topics: ["SRD R370 Grant", "Appeals & Declined Applications", "Eligibility & Means Test", "Payment Schedules & Banking", "All SASSA Grant Types", "Province-Specific Guides", "Scam Prevention"],
    contentCount: "30+ grant guides, 4 decline reason analyses, 9 province guides",
    color: "bg-primary-gold",
  },
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
          Every guide on SASSA Help Hub is written by me, with information checked against official SASSA and government sources.
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
                  All content is fact-checked against official SASSA and government sources. See my <NextLink href="/editorial-policy" className="text-primary-gold underline">Editorial Policy</NextLink>.
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
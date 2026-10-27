import React from "react";
import type { Metadata } from "next";
import { LinkButton, Chip, Card, CardBody, Divider } from "@/components/ui/nextui";
import { FaExternalLinkAlt, FaQuestionCircle, FaInfoCircle, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";
import { faqPageSchema, breadcrumbSchema } from "../../lib/schema";

const curYear = getCurrentYearString();

export const metadata: Metadata = buildMetadata({
  title: `All SASSA Grants ${curYear}: Complete Guides for Every Grant Type`,
  description: `Browse complete guides for every SASSA grant: SRD R370, Old Age Pension R2,400, Disability R2,400, Child Support R580, Foster Child R1,300, Care Dependency R2,400, Grant-in-Aid R580, and War Veterans R2,420.`,
  path: "/grants",
});

const grants = [
  { slug: "srd-r370-grant", name: "SRD R370 Grant", amount: "R370/month", desc: "For unemployed South Africans aged 18–59 with no income.", color: "warning" as const },
  { slug: "old-age-pension", name: "Old Age Pension", amount: "R2,400/month", desc: "For citizens aged 60+ who pass the means test.", color: "primary" as const },
  { slug: "disability-grant", name: "Disability Grant", amount: "R2,400/month", desc: "For adults with a medical disability preventing employment.", color: "secondary" as const },
  { slug: "child-support-grant", name: "Child Support Grant", amount: "R580/month", desc: "For primary caregivers of children under 18.", color: "success" as const },
  { slug: "foster-child-grant", name: "Foster Child Grant", amount: "R1,300/month", desc: "For foster parents with a children's court order.", color: "danger" as const },
  { slug: "care-dependency-grant", name: "Care Dependency Grant", amount: "R2,400/month", desc: "For caregivers of children with severe disabilities.", color: "warning" as const },
  { slug: "grant-in-aid", name: "Grant-in-Aid", amount: "R580/month", desc: "Supplementary grant for Old Age/Disability recipients needing care.", color: "primary" as const },
  { slug: "war-veterans-grant", name: "War Veterans Grant", amount: "R2,420/month", desc: "For WWII and Korean War veterans.", color: "danger" as const },
];

const faqs = [
  { q: `What is the maximum SASSA grant amount in ${curYear}?`, a: `The highest standard grant is the War Veterans Grant at R2,420/month. The Old Age Pension (75+) and Disability Grant both pay R2,420/month. The SRD R370 grant is the lowest at R370/month.` },
  { q: "Can I receive more than one SASSA grant?", a: "Generally no. You can only receive one social grant at a time, except for specific supplementary grants like Grant-in-Aid, which can be added to an existing Old Age or Disability Grant." },
  { q: "How do I know which SASSA grant I qualify for?", a: "Your eligibility depends on your age, income, assets, household composition, and specific circumstances. Use the eligibility criteria on each grant page to determine which grant fits your situation." },
  { q: "When do SASSA grant amounts increase?", a: "Grant increases are announced in the February National Budget and take effect on 1 April each year. The SRD R370 grant has not increased since April 2024." },
];

export default function GrantsListingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Grants", slug: "/grants" },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Grants</span>
      </nav>

      <header className="space-y-6 mb-12">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">Grants</Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          All SASSA Grants {curYear}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Complete guides for every SASSA grant type. Compare amounts, eligibility, and application processes side by side.
        </p>
      </header>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-900 dark:text-blue-400">
          <FaInfoCircle /> Understanding SASSA Grants
        </h2>
        <p className="text-blue-800 dark:text-blue-300 leading-relaxed mb-4">
          SASSA administers two categories of grants: <strong>permanent grants</strong> (Old Age, Disability, Child Support, Foster Child, Care Dependency, Grant-in-Aid, War Veterans) which are paid monthly on a fixed schedule, and the <strong>temporary SRD R370 grant</strong> which is paid in the last week of each month.
        </p>
        <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
          To qualify for any grant, you must pass the <strong>means test</strong> which evaluates your income and assets. Each grant has specific age, health, or caregiving requirements. Click any grant below to see full eligibility criteria and application steps. You can also{" "}
          <NextLink href="/tools/means-test-calculator" className="font-bold text-primary-gold hover:underline">
            compare your income and assets against each grant&apos;s means-test thresholds
          </NextLink>{" "}
          in our calculator before you read on.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grants.map((g, i) => (
          <NextLink key={i} href={`/grants/${g.slug}`} className="block group">
            <Card className="p-6 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/30">
              <CardBody className="p-0 space-y-3">
                <div className="flex items-center justify-between">
                  <Chip color={g.color} variant="flat" size="sm" className="font-bold">{g.amount}</Chip>
                  <FaExternalLinkAlt className="text-gray-300 group-hover:text-primary-gold transition-colors text-xs" />
                </div>
                <h2 className="text-xl font-bold group-hover:text-primary-gold transition-colors">{g.name}</h2>
                <p className="text-sm text-gray-500">{g.desc}</p>
              </CardBody>
            </Card>
          </NextLink>
        ))}
      </div>

      <Divider className="my-16" />

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Quick Grant Comparison</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">Use this table to quickly compare grant types, amounts, and who qualifies.</p>
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="p-4 text-left font-black uppercase text-xs">Grant Type</th>
                <th className="p-4 text-left font-black uppercase text-xs">Monthly Amount</th>
                <th className="p-4 text-left font-black uppercase text-xs">Key Requirement</th>
                <th className="p-4 text-left font-black uppercase text-xs">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {grants.map((g, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="p-4 font-bold">{g.name}</td>
                  <td className="p-4">{g.amount}</td>
                  <td className="p-4 text-gray-500 text-xs">{g.desc.split(".")[0]}.</td>
                  <td className="p-4 text-xs">Last week of month (SRD) or 2nd working day (permanent)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider className="my-16" />

      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl font-black text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-primary-gold flex items-start gap-3">
                <FaQuestionCircle className="mt-1 flex-shrink-0" /> {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-20">
        <Card className="bg-primary-black text-white p-12 rounded-[2rem]">
          <CardBody className="space-y-6">
            <h2 className="text-3xl font-black">Not Sure Which Grant Applies to You?</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Take our eligibility check or browse the detailed guide for each grant type.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <LinkButton href="/eligibility-check" color="primary" className="font-bold px-8 py-6">Check Eligibility</LinkButton>
              <LinkButton href="/guides/apply-sassa-grants" variant="bordered" className="font-bold px-8 py-6 text-white border-white/20 hover:border-white/40">How to Apply</LinkButton>
              <LinkButton href="/guides" variant="bordered" className="font-bold px-8 py-6 text-white border-white/20 hover:border-white/40">View All Guides</LinkButton>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

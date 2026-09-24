import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhone, FaQuestionCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";

interface Province {
  slug: string;
  name: string;
  capital: string;
  description: string;
  srd_challenges: string;
  main_offices: { town: string; address?: string; phone?: string; verified?: boolean }[];
  district_offices: { town: string; address?: string; phone?: string; verified?: boolean }[];
  collection_points: { retailer: string; towns: string[] }[];
  payment_collection: string;
  regional_office?: { town: string; address?: string; phone?: string; hours?: string };
  last_updated: string;
}

function readProvinces(): Province[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
}

function slugifyCity(town: string) {
  return town.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return readProvinces().map((p) => ({ province: p.slug }));
}

export function generateMetadata({ params }: { params: { province: string } }): Metadata {
  const province = readProvinces().find((p) => p.slug === params.province);
  if (!province) return { title: "Province Not Found" };
  const title = `SASSA Offices in ${province.name} — Contact Details & Locations`;
  const description = `Find SASSA offices in ${province.name}. Addresses, phone numbers, contact details, grant collection points and office hours for all ${province.name} SASSA branches.`;
  const url = `https://www.sassahelphub.co.za/sassa-offices/${params.province}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: "article", siteName: "SASSA Help Hub", locale: "en_ZA", images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }] },
    twitter: { card: "summary_large_image", title, description, images: ["https://www.sassahelphub.co.za/logo.png"] },
  };
}

export default function ProvinceOfficesPage({ params }: { params: { province: string } }) {
  const province = readProvinces().find((p) => p.slug === params.province);
  if (!province) notFound();

  const title = `SASSA Offices in ${province.name} — Contact Details & Locations`;
  const description = `Find SASSA offices in ${province.name}. Addresses, phone numbers, contact details, grant collection points and office hours for all ${province.name} SASSA branches.`;

  const faqs = [
    { q: `Where is the main SASSA office in ${province.name}?`, a: `The SASSA regional office for ${province.name} is in ${province.regional_office?.town || province.capital}. You can also visit district offices listed on this page. All SASSA offices handle grant applications, status queries, and appeals.` },
    { q: `What services does a SASSA office in ${province.name} provide?`, a: `SASSA offices in ${province.name} handle grant applications, SRD applications, status queries, updating personal details, appeals, and disability grant assessments.` },
    { q: "Do I need to visit a SASSA office in person?", a: "Many services like SRD applications and status checks can be done online (srd.sassa.gov.za) or via WhatsApp (082 601 0111). Visit a branch only when you need to update documents or for services that cannot be done online." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(title, description, `/sassa-offices/${province.slug}`, "Lucky Cungwa", province.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SASSA Offices", slug: "/sassa-offices" },
        { name: province.name, slug: `/sassa-offices/${province.slug}` },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/sassa-offices" className="hover:text-primary-gold">SASSA Offices</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{province.name}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">Province Office Guide</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-4">About SASSA Offices in {province.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            SASSA services in {province.name} run through the regional office in {province.regional_office?.town || province.capital} plus the main and district branches listed below. Offices handle grant and SRD applications, status queries, updating personal details, appeals, and assessments.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Before travelling, many things — applications, status checks and banking changes — can be done online. Need eligibility facts and application steps instead of addresses? See the <NextLink href={`/province/${province.slug}`} className="underline font-bold">SASSA grants guide for {province.name}</NextLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Main SASSA Offices in {province.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {province.main_offices.map((o, i) => (
              <NextLink key={i} href={`/sassa-offices/${province.slug}/${slugifyCity(o.town)}`} className="block group">
                <Card className="p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/30 h-full">
                  <CardBody className="p-0 space-y-2">
                    <p className="font-bold text-lg group-hover:text-primary-gold transition-colors">{o.town}</p>
                    {o.verified === true && o.address && (
                      <p className="flex items-center gap-2 text-sm text-gray-500"><FaMapMarkerAlt className="text-primary-gold flex-shrink-0" /> {o.address}</p>
                    )}
                    {o.verified === true && o.phone && (
                      <p className="flex items-center gap-2 text-sm text-gray-500"><FaPhone className="text-primary-gold flex-shrink-0" /> {o.phone}</p>
                    )}
                    {o.verified !== true && (
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Details not independently verified — call SASSA on 0800 60 10 11 to confirm before travelling.</p>
                    )}
                    <span className="text-xs font-bold text-primary-gold group-hover:underline">View office details</span>
                  </CardBody>
                </Card>
              </NextLink>
            ))}
          </div>
        </section>

        {province.district_offices.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">District Offices in {province.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {province.district_offices.map((o, i) => (
                <NextLink key={i} href={`/sassa-offices/${province.slug}/${slugifyCity(o.town)}`} className="block group">
                  <Card className="p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/30 h-full">
                    <CardBody className="p-0 space-y-2">
                      <p className="font-bold text-lg group-hover:text-primary-gold transition-colors">{o.town}</p>
                      {o.verified === true && o.address && (
                        <p className="flex items-center gap-2 text-sm text-gray-500"><FaMapMarkerAlt className="text-primary-gold flex-shrink-0" /> {o.address}</p>
                      )}
                      {o.verified === true && o.phone && (
                        <p className="flex items-center gap-2 text-sm text-gray-500"><FaPhone className="text-primary-gold flex-shrink-0" /> {o.phone}</p>
                      )}
                      {o.verified !== true && (
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Details not independently verified — call SASSA on 0800 60 10 11 to confirm before travelling.</p>
                      )}
                      <span className="text-xs font-bold text-primary-gold group-hover:underline">View office details</span>
                    </CardBody>
                  </Card>
                </NextLink>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">Where to Collect Grants in {province.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{province.payment_collection}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {province.collection_points.map((cp, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-primary-gold mb-2">{cp.retailer}</p>
                <p className="text-sm text-gray-500">{cp.towns.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Visiting a SASSA Office in {province.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">What to bring</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Your South African ID (or the ID of the beneficiary)</li>
                <li>Any SASSA SMS or letter about your application</li>
                <li>Proof of residence in {province.name}</li>
                <li>Bank details if you need to change your payment method</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tips for a faster visit</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Offices are busiest in the first and last weeks of the month — mid-month visits are quicker</li>
                <li>Come early if you must queue; bring water and make a plan for the day</li>
                <li>Do not pay third parties to "help" you — SASSA office services are free</li>
                <li>Try the online channels below before travelling</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <Chip variant="flat">Helpline: 0800 60 10 11</Chip>
            <Chip variant="flat">WhatsApp: 082 601 0111</Chip>
            <Chip variant="flat">SRD portal: srd.sassa.gov.za</Chip>
          </div>
        </section>

        <Divider />
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-3 text-primary-gold flex items-start gap-3"><FaQuestionCircle className="mt-1 flex-shrink-0" /> {faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <Card className="bg-primary-black text-white p-10 rounded-[2rem]">
            <CardBody className="space-y-5">
              <h2 className="text-2xl font-black">Looking for a specific office?</h2>
              <p className="text-secondary-gray">Check your grant status online first — you may not need to visit a branch. Need eligibility or application facts instead? See the grants guide for {province.name}.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button as={NextLink} href="/status-check" color="primary" className="font-bold px-8 py-6">Check SASSA Status</Button>
                <Button as={NextLink} href={`/province/${province.slug}`} variant="bordered" className="font-bold px-8 py-6 text-white border-white/20 hover:border-white/40">SASSA Grants in {province.name}</Button>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />
        <EditorialFooter lastUpdated="23 September 2026" author="Lucky Cungwa" />
      </article>
    </div>
  );
}

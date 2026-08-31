import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Divider } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhone, FaClock, FaLightbulb, FaQuestionCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../../../components/JsonLd";
import EditorialFooter from "../../../../components/EditorialFooter";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "../../../../lib/schema";

interface OfficeCity {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  description: string;
  localTips: string[];
  verified?: boolean;
}

interface ProvinceShort {
  slug: string;
  name: string;
  capital: string;
  main_offices: { town: string; address: string; phone: string; verified?: boolean }[];
  district_offices: { town: string; address: string; phone: string; verified?: boolean }[];
}

const PROVINCE_NAMES: Record<string, string> = {
  "eastern-cape": "Eastern Cape",
  "free-state": "Free State",
  gauteng: "Gauteng",
  "kwazulu-natal": "KwaZulu-Natal",
  limpopo: "Limpopo",
  mpumalanga: "Mpumalanga",
  "north-west": "North West",
  "northern-cape": "Northern Cape",
  "western-cape": "Western Cape",
};

function citySlug(city: string) {
  const clean = city.replace(/\s*\(.*?\)\s*/g, " ").trim();
  return clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readOfficeCities(): OfficeCity[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/officeCities.json"), "utf8"));
  } catch {
    return [];
  }
}

function readProvinces(): ProvinceShort[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  const cities = readOfficeCities();
  const provinces = readProvinces();
  const params: { province: string; city: string }[] = [];

  for (const c of cities) {
    const pSlug = provinces.find((p) => p.name === c.province)?.slug;
    if (pSlug) params.push({ province: pSlug, city: slugify(c.city) });
  }

  for (const p of provinces) {
    const cityEntries = [...p.main_offices, ...(p.district_offices || [])];
    for (const o of cityEntries) {
      const cSlug = citySlug(o.town);
      if (!params.some((x) => x.province === p.slug && x.city === cSlug)) {
        params.push({ province: p.slug, city: cSlug });
      }
    }
  }
  return params;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateMetadata({ params }: { params: { province: string; city: string } }): Metadata {
  const provinceName = PROVINCE_NAMES[params.province] || params.province;
  const display = params.city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = `SASSA Office in ${display}, ${provinceName} — Address & Contact`;
  const description = `Find the SASSA office in ${display}, ${provinceName}. Get the address, phone number, services offered and tips for visiting. Check your grant status online instead where possible.`;
  const url = `https://www.sassahelphub.co.za/sassa-offices/${params.province}/${params.city}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title, description, url, type: "article", siteName: "SASSA Help Hub", locale: "en_ZA", images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }] },
    twitter: { card: "summary_large_image", title, description, images: ["https://www.sassahelphub.co.za/logo.png"] },
  };
}

export default function CityOfficePage({ params }: { params: { province: string; city: string } }) {
  const provinceName = PROVINCE_NAMES[params.province];
  const cities = readOfficeCities();
  const provinces = readProvinces();
  const province = provinces.find((p) => p.slug === params.province);

  const officeCity = cities.find((c) => c.province === provinceName && slugify(c.city) === params.city);

  const provinceOfficeEntry =
    province &&
    [...province.main_offices, ...(province.district_offices || [])].find((o) => citySlug(o.town) === params.city);

  if (!provinceName || (!officeCity && !provinceOfficeEntry)) notFound();

  const display = params.city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = `SASSA Office in ${display}, ${provinceName} — Address & Contact`;
  const description = `Find the SASSA office in ${display}, ${provinceName}. Get the address, phone number, services offered and tips for visiting.`;

  const address = officeCity?.address || provinceOfficeEntry?.address || "";
  const phone = officeCity?.phone || provinceOfficeEntry?.phone || "";
  const verified = officeCity?.verified ?? provinceOfficeEntry?.verified ?? false;
  const tips = officeCity?.localTips || [];
  const summary = officeCity?.description || `The SASSA office in ${display}, ${provinceName} provides grant applications, SRD applications, status queries and appeal assistance.`;

  const faqs = [
    { q: `Where is the SASSA office in ${display}?`, a: `The SASSA office in ${display} is located at ${address}. Always confirm the address and hours before travelling, as offices can relocate or change hours.` },
    { q: `How do I contact the SASSA office in ${display}?`, a: `You can call the ${display} SASSA office on ${phone}. For general SASSA queries, call the national helpline 0800 60 10 11.` },
    { q: "Do I need to visit this SASSA office in person?", a: "Many services can be done remotely: SRD applications and status checks at srd.sassa.gov.za, or via WhatsApp on 082 601 0111. Visit the branch only for services you cannot do online." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(title, description, `/sassa-offices/${params.province}/${params.city}`, "Lucky Cungwa", "2026-08-31")} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SASSA Offices", slug: "/sassa-offices" },
        { name: provinceName, slug: `/sassa-offices/${params.province}` },
        { name: display, slug: `/sassa-offices/${params.province}/${params.city}` },
      ])} />
      <JsonLd data={faqPageSchema(faqs)} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/sassa-offices" className="hover:text-primary-gold">SASSA Offices</a>
        <span>/</span>
        <a href={`/sassa-offices/${params.province}`} className="hover:text-primary-gold">{provinceName}</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{display}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">SASSA Office</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            SASSA Office in {display}, {provinceName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </header>

        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
          {!verified && (
            <div className="mb-6 p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 text-sm text-amber-800 dark:text-amber-200">
              <strong>Details not yet independently verified.</strong> The address and phone below may be out of date.
              Please confirm with the SASSA national helpline (<span className="font-bold">0800 60 10 11</span>) before travelling to this office.
            </div>
          )}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-primary-gold mt-1" />
              <div>
                <p className="font-bold text-sm">Address</p>
                <p className="text-gray-600 dark:text-gray-400">{address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhone className="text-primary-gold mt-1" />
              <div>
                <p className="font-bold text-sm">Phone</p>
                <p className="text-gray-600 dark:text-gray-400">{phone || "Contact SASSA helpline 0800 60 10 11"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaClock className="text-primary-gold mt-1" />
              <div>
                <p className="font-bold text-sm">Hours</p>
                <p className="text-gray-600 dark:text-gray-400">Mon–Fri 07:30–16:00 (verify before visiting)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">About This Office</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{summary}</p>
        </section>

        {tips.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FaLightbulb className="text-primary-gold" /> Visitor Tips</h2>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>{tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">Save yourself a visit</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            You can check your SRD grant status online at <span className="font-bold">srd.sassa.gov.za</span>,
            via WhatsApp at <span className="font-bold">082 601 0111</span>, or USSD
            <span className="font-bold"> *120*69277#</span> — no branch visit needed for most queries.
          </p>
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

        {province && (
          <section>
            <h2 className="text-2xl font-bold mb-6">More SASSA Offices in {provinceName}</h2>
            <div className="flex flex-wrap gap-3">
              {[...province.main_offices, ...(province.district_offices || [])].map((o, i) => (
                <NextLink key={i} href={`/sassa-offices/${province.slug}/${citySlug(o.town)}`} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-bold hover:bg-primary-gold hover:text-primary-black transition-colors">
                  {o.town}
                </NextLink>
              ))}
            </div>
          </section>
        )}

        <Divider />
        <EditorialFooter lastUpdated="31 August 2026" author="Lucky Cungwa" />
      </article>
    </div>
  );
}

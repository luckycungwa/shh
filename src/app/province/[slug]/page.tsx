import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Divider } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhone, FaInfoCircle } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import { articleSchema, breadcrumbSchema } from "../../../lib/schema";
import { resolveTemplates } from "../../../lib/canonical-facts";
import { getCurrentYearString } from "../../../lib/config";

interface Province {
  slug: string;
  name: string;
  capital: string;
  population_served: string;
  description: string;
  srd_challenges: string;
  main_offices: { town: string; address: string; phone: string }[];
  districts: string[];
  payment_collection: string;
  last_updated: string;
}

export function generateStaticParams() {
  const data: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  return data.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  const province = data.find((p) => p.slug === params.slug);
  if (!province) return { title: "Province Not Found" };
  const url = `https://www.sassahelphub.co.za/province/${params.slug}`;
  return {
    title: `SASSA Grants in ${province.name}: Offices, Payments & SRD Guide ${getCurrentYearString()}`,
    description: `Complete guide to SASSA grants in ${province.name}. ${province.population_served}. Office addresses, SRD challenges, payment collection points across ${province.districts.length} districts.`,
    alternates: { canonical: url },
    openGraph: {
      title: `SASSA Grants in ${province.name}: Offices, Payments & SRD Guide ${getCurrentYearString()}`,
      description: `Complete guide to SASSA grants in ${province.name}. ${province.population_served}.`,
      url,
      type: "article",
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
  };
}

export default function ProvincePage({ params }: { params: { slug: string } }) {
  const all: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  const province = all.find((p) => p.slug === params.slug);
  if (!province) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(`SASSA Grants in ${province.name}`, province.description, `/province/${province.slug}`, "Zanele Nkosi", province.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SASSA Offices", slug: "/sassa-offices" },
        { name: province.name, slug: `/province/${province.slug}` },
      ])} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <a href="/sassa-offices" className="hover:text-primary-gold">SASSA Offices</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{province.name}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">Province Guide</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            SASSA Grants in {province.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {province.description.split(".")[0]}.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 border-y border-gray-100 dark:border-gray-800 py-4">
            <span>Capital: {province.capital}</span>
            <span>Beneficiaries: {province.population_served}</span>
            <span>Districts: {province.districts.length}</span>
          </div>
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaInfoCircle className="text-blue-600" /> About {province.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{resolveTemplates(province.description)}</p>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-2xl border-l-8 border-amber-500">
          <h2 className="text-2xl font-bold mb-4">Unique SRD Challenges in {province.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{province.srd_challenges}</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">SASSA Offices in {province.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {province.main_offices.map((office, i) => (
              <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <p className="font-bold text-primary-gold mb-3">{office.town}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2"><FaMapMarkerAlt className="flex-shrink-0" /> {office.address}</p>
                  <p className="flex items-center gap-2"><FaPhone className="flex-shrink-0" /> {office.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">District Municipalities</h2>
          <div className="flex flex-wrap gap-2">
            {province.districts.map((d, i) => (
              <Chip key={i} variant="flat" size="sm">{d}</Chip>
            ))}
          </div>
        </section>

        <section className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border-l-8 border-green-500">
          <h2 className="text-2xl font-bold mb-4">Payment Collection in {province.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{province.payment_collection}</p>
        </section>

        <Divider />
        <EditorialFooter lastUpdated={province.last_updated} author="Lucky Cungwa" />
      </article>
    </div>
  );
}

import React from "react";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { Chip, Divider } from "@/components/ui/nextui";
import { FaMapMarkerAlt, FaPhone, FaClock, FaSearch } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import EditorialFooter from "../../components/EditorialFooter";
import { breadcrumbSchema } from "../../lib/schema";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: `SASSA Offices by Province: Contact Details & Locations ${getCurrentYearString()}`,
  description: "Find your nearest SASSA office in all 9 provinces. Contact numbers, addresses, operating hours, and services offered at each provincial SASSA office.",
  path: "/sassa-offices",
  ogType: "article",
});

interface ProvinceOffice {
  town: string;
  address?: string;
  phone?: string;
  hours?: string;
  verified?: boolean;
}

interface ProvinceDirectory {
  name: string;
  capital: string;
  description: string;
  offices: ProvinceOffice[];
}

const provinces: ProvinceDirectory[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8")
).map((p: any) => ({
  name: p.name,
  capital: p.capital,
  description: p.description,
  offices: [
    ...(p.regional_office
      ? [{ town: `${p.regional_office.town} (Regional Office)`, address: p.regional_office.address, phone: p.regional_office.phone, hours: p.regional_office.hours, verified: true }]
      : []),
    ...(p.main_offices || []).map((o: any) => ({ town: o.town, address: o.address, phone: o.phone, verified: o.verified })),
    ...(p.district_offices || []).map((o: any) => ({ town: o.town, address: o.address, phone: o.phone, verified: o.verified })),
  ],
}));

export default function SassaOfficesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SASSA Offices", slug: "/sassa-offices" },
      ])} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">SASSA Offices</span>
      </nav>

      <article>
        <header className="space-y-6 mb-12">
          <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">Directory</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            SASSA Offices by Province
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Find contact details and addresses for SASSA offices in all nine South African provinces. Visit your nearest office to apply for grants, update details, or appeal decisions.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center justify-center gap-2">
              <FaSearch /> Looking for a quick search by city name? Try our <NextLink href="/resources" className="font-bold underline hover:no-underline">SASSA Office Locator</NextLink> with real-time search and filter.
            </p>
          </div>
        </header>

        <div className="space-y-8">
          {provinces.map((province, pi) => (
            <section key={pi} id={province.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-black">{province.name}</h2>
                <Chip size="sm" variant="flat" color="default">{province.capital}</Chip>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{province.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {province.offices.map((office, oi) => (
                  <div key={oi} className="border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <p className="font-bold text-primary-gold mb-2">{office.town}</p>
                    <div className="space-y-1.5 text-sm text-gray-500">
                      {office.verified === true && office.address && (
                        <p className="flex items-center gap-2"><FaMapMarkerAlt className="flex-shrink-0" /> {office.address}</p>
                      )}
                      {office.verified === true && office.phone && (
                        <p className="flex items-center gap-2"><FaPhone className="flex-shrink-0" /> {office.phone}</p>
                      )}
                      {office.verified === true && office.hours && (
                        <p className="flex items-center gap-2"><FaClock className="flex-shrink-0" /> {office.hours}</p>
                      )}
                      {office.verified !== true && (
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Details not independently verified — call SASSA on 0800 60 10 11 to confirm before travelling.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Divider className="my-12" />
        <EditorialFooter lastUpdated="10 August 2026" author="Lucky Cungwa" />
      </article>
    </div>
  );
}

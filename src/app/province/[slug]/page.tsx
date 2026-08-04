import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chip, Divider, Card, CardBody } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhone, FaInfoCircle, FaBuilding, FaStore, FaRegClock, FaExternalLinkAlt } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import { articleSchema, breadcrumbSchema, governmentOfficeSchema } from "../../../lib/schema";
import { resolveTemplates } from "../../../lib/canonical-facts";
import { getCurrentYearString } from "../../../lib/config";
import NextLink from "next/link";

interface Office {
  town: string;
  address: string;
  phone: string;
}

interface CollectionPoint {
  retailer: string;
  towns: string[];
}

interface RegionalOffice {
  town: string;
  address: string;
  phone: string;
  hours: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Province {
  slug: string;
  name: string;
  capital: string;
  population_served: string;
  description: string;
  srd_challenges: string;
  main_offices: Office[];
  district_offices?: Office[];
  districts: string[];
  collection_points?: CollectionPoint[];
  regional_office?: RegionalOffice;
  coordinates?: Coordinates;
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
    robots: { index: true, follow: true },
    openGraph: {
      title: `SASSA Grants in ${province.name}: Offices, Payments & SRD Guide ${getCurrentYearString()}`,
      description: `Complete guide to SASSA grants in ${province.name}. ${province.population_served}.`,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `SASSA Grants in ${province.name}: Offices, Payments & SRD Guide ${getCurrentYearString()}`,
      description: `Complete guide to SASSA grants in ${province.name}. ${province.population_served}.`,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default function ProvincePage({ params }: { params: { slug: string } }) {
  const all: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  const province = all.find((p) => p.slug === params.slug);
  if (!province) notFound();

  const mapUrl = province.coordinates
    ? `https://maps.google.com/maps?q=${province.coordinates.lat},${province.coordinates.lng}&z=10&output=embed`
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(`SASSA Grants in ${province.name}`, province.description, `/province/${province.slug}`, "Lucky Cungwa", province.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SASSA Offices", slug: "/sassa-offices" },
        { name: province.name, slug: `/province/${province.slug}` },
      ])} />

      {province.regional_office && province.coordinates && (
        <JsonLd data={governmentOfficeSchema(
          `SASSA Regional Office ${province.name}`,
          province.regional_office.address,
          province.regional_office.town,
          province.name,
          "",
          province.regional_office.phone,
          province.regional_office.hours,
          province.coordinates.lat,
          province.coordinates.lng,
        )} />
      )}

      <nav className="text-sm text-gray-500 mb-8 flex gap-2 flex-wrap">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500 uppercase font-bold">Capital</p>
              <p className="font-bold">{province.capital}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500 uppercase font-bold">Beneficiaries</p>
              <p className="font-bold text-primary-gold">{province.population_served}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500 uppercase font-bold">Districts</p>
              <p className="font-bold">{province.districts.length}</p>
            </div>
            {province.main_offices && (
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-500 uppercase font-bold">SASSA Offices</p>
                <p className="font-bold">{province.main_offices.length}</p>
              </div>
            )}
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

        {province.regional_office && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><FaBuilding className="text-primary-gold" /> Regional SASSA Office</h2>
            <Card className="bg-primary-black text-white p-8 rounded-[2rem] border-none shadow-2xl">
              <CardBody className="p-0 space-y-4">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary-gold flex-shrink-0" />
                  <div>
                    <p className="font-bold">{province.regional_office.town}</p>
                    <p className="text-sm text-secondary-gray">{province.regional_office.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-primary-gold flex-shrink-0" />
                  <a href={`tel:${province.regional_office.phone.replace(/\s/g, '')}`} className="text-sm hover:text-primary-gold">{province.regional_office.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <FaRegClock className="text-primary-gold flex-shrink-0" />
                  <p className="text-sm text-secondary-gray">{province.regional_office.hours}</p>
                </div>
                {mapUrl && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-gray-700">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0, filter: "invert(0)" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`SASSA Regional Office ${province.name}`}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-6">SASSA Main Offices in {province.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {province.main_offices.map((office, i) => (
              <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <p className="font-bold text-primary-gold mb-3">{office.town}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2"><FaMapMarkerAlt className="flex-shrink-0" /> {office.address}</p>
                  <p className="flex items-center gap-2"><FaPhone className="flex-shrink-0" /> <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-primary-gold">{office.phone}</a></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {province.district_offices && province.district_offices.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6">District SASSA Offices</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="p-4 font-black uppercase text-xs">Town</th>
                    <th className="p-4 font-black uppercase text-xs">Address</th>
                    <th className="p-4 font-black uppercase text-xs">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {province.district_offices.map((o, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-4 font-bold text-sm">{o.town}</td>
                      <td className="p-4 text-sm text-gray-500">{o.address}</td>
                      <td className="p-4 text-sm text-primary-gold"><a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-6">District Municipalities</h2>
          <div className="flex flex-wrap gap-2">
            {province.districts.map((d, i) => (
              <Chip key={i} variant="flat" size="sm">{d}</Chip>
            ))}
          </div>
        </section>

        {province.collection_points && province.collection_points.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><FaStore className="text-green-600" /> Cash Collection Points</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {province.collection_points.map((cp, i) => (
                <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800">
                  <p className="font-bold text-green-600 mb-3">{cp.retailer}</p>
                  <div className="flex flex-wrap gap-1">
                    {cp.towns.map((t, j) => (
                      <Chip key={j} size="sm" variant="flat" color="success">{t}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border-l-8 border-green-500">
          <h2 className="text-2xl font-bold mb-4">Payment Collection in {province.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{province.payment_collection}</p>
        </section>

        <AdNetworkLoader />

        <Divider />
        <EditorialFooter lastUpdated={province.last_updated} author="Lucky Cungwa" />
      </article>
    </div>
  );
}

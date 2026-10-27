import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkButton, Chip, Divider, Card, CardBody } from "@/components/ui/nextui";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaBuilding,
  FaRegClock,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import { articleSchema, breadcrumbSchema, governmentOfficeSchema } from "../../../lib/schema";
import { resolveTemplates, getFact } from "../../../lib/canonical-facts";
import { getCurrentYearString } from "../../../lib/config";
import NextLink from "next/link";
import { clampTitle, clampDescription } from "../../../lib/seo";

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
  main_offices?: { town: string }[];
  districts: string[];
  regional_office?: RegionalOffice;
  coordinates?: Coordinates;
  payment_collection: string;
  last_updated: string;
}

const grants = [
  { slug: "srd-r370-grant", name: "SRD R370 Grant", amount: "R370/month", desc: "For unemployed South Africans aged 18–59 with no income." },
  { slug: "old-age-pension", name: "Old Age Pension", amount: "R2,400/month", desc: "For citizens aged 60+ who pass the means test." },
  { slug: "disability-grant", name: "Disability Grant", amount: "R2,400/month", desc: "For adults with a medical disability preventing employment." },
  { slug: "child-support-grant", name: "Child Support Grant", amount: "R580/month", desc: "For primary caregivers of children under 18." },
  { slug: "foster-child-grant", name: "Foster Child Grant", amount: "R1,300/month", desc: "For foster parents with a children's court order." },
  { slug: "care-dependency-grant", name: "Care Dependency Grant", amount: "R2,400/month", desc: "For caregivers of children with severe disabilities." },
  { slug: "grant-in-aid", name: "Grant-in-Aid", amount: "R580/month", desc: "Supplementary grant for Old Age/Disability recipients needing care." },
  { slug: "war-veterans-grant", name: "War Veterans Grant", amount: "R2,420/month", desc: "For WWII and Korean War veterans." },
];

export function generateStaticParams() {
  const data: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  return data.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  const data: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  const province = data.find((p) => p.slug === params.slug);
  if (!province) return { title: "Province Not Found" };
  const url = `https://www.sassahelphub.co.za/province/${params.slug}`;
  const title = clampTitle(`SASSA Grants in ${province.name} ${getCurrentYearString()}: Eligibility & How to Apply`);
  const desc = clampDescription(`Which SASSA grants are available in ${province.name}? ${province.population_served}. Eligibility facts, application help, payment collection and direct links to the ${province.name} SASSA office directory.`);
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: desc,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default async function ProvincePage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const all: Province[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
  const province = all.find((p) => p.slug === params.slug);
  if (!province) notFound();

  const mapUrl = province.coordinates
    ? `https://maps.google.com/maps?q=${province.coordinates.lat},${province.coordinates.lng}&z=10&output=embed`
    : null;

  const officeTowns = (province.main_offices || []).map((o) => o.town);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(`SASSA Grants in ${province.name}`, province.description, `/province/${province.slug}`, "Lucky Cungwa", province.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Grants", slug: "/grants" },
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
        <a href="/grants" className="hover:text-primary-gold">Grants</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{province.name}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">Province Grants Guide</Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            SASSA Grants in {province.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {resolveTemplates(province.description)}
          </p>
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
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-500 uppercase font-bold">Grants Covered</p>
              <p className="font-bold">{grants.length}</p>
            </div>
          </div>
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaInfoCircle className="text-blue-600" /> Who Qualifies for Grants in {province.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Every SASSA grant uses a means test, so eligibility depends on your age, income, assets and household circumstances rather than which province you live in. The same national rules apply in {province.name}: the SRD R370 grant is for unemployed applicants aged {getFact("srd_age_range_min")} to {getFact("srd_age_range_max")} earning under {getFact("srd_income_limit")} per month, while the permanent grants (Old Age, Disability, Child Support and others) each have their own income and asset thresholds.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Most grant applications are submitted online or at any SASSA office, and payments are made directly to a bank account or collected at participating retailers — you are not tied to one office or town in {province.name}.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><FaClipboardList className="text-primary-gold" /> Grants You Can Apply For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grants.map((g, i) => (
              <NextLink key={i} href={`/grants/${g.slug}`} className="block group">
                <Card className="p-5 hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 group-hover:border-primary-gold/30">
                  <CardBody className="p-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <Chip color="warning" variant="flat" size="sm" className="font-bold">{g.amount}</Chip>
                      <FaExternalLinkAlt className="text-gray-300 group-hover:text-primary-gold transition-colors text-xs" />
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary-gold transition-colors">{g.name}</h3>
                    <p className="text-sm text-gray-500">{g.desc}</p>
                  </CardBody>
                </Card>
              </NextLink>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Each grant page has its own eligibility criteria, required documents and step-by-step application instructions. Start with the <NextLink href="/guides/apply-sassa-grants" className="underline font-bold">how-to-apply guide</NextLink> or the <NextLink href="/grants" className="underline font-bold">full grants comparison</NextLink>.
          </p>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-2xl border-l-8 border-amber-500">
          <h2 className="text-2xl font-bold mb-4">Unique SRD Challenges in {province.name}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{province.srd_challenges}</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">How to Apply for Help in {province.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextLink href="/eligibility-check" className="block group border border-gray-100 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 hover:border-primary-gold/30 transition-all">
              <FaCheckCircle className="text-2xl text-primary-gold mb-3" />
              <p className="font-bold group-hover:text-primary-gold transition-colors">Check eligibility</p>
              <p className="text-sm text-gray-500 mt-1">See which grants you may qualify for in about a minute.</p>
            </NextLink>
            <NextLink href="/guides/apply-sassa-grants" className="block group border border-gray-100 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 hover:border-primary-gold/30 transition-all">
              <FaClipboardList className="text-2xl text-primary-gold mb-3" />
              <p className="font-bold group-hover:text-primary-gold transition-colors">Application steps</p>
              <p className="text-sm text-gray-500 mt-1">Documents needed, where to submit and how to follow up.</p>
            </NextLink>
            <NextLink href="/status-check" className="block group border border-gray-100 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 hover:border-primary-gold/30 transition-all">
              <FaSearch className="text-2xl text-primary-gold mb-3" />
              <p className="font-bold group-hover:text-primary-gold transition-colors">Track your application</p>
              <p className="text-sm text-gray-500 mt-1">Check SRD or grant status, pay dates and appeal results.</p>
            </NextLink>
          </div>
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
            <p className="text-sm text-gray-500 mt-4">
              Full addresses, phone numbers and verification status for every local and district office in {province.name} are on the{" "}
              <NextLink href={`/sassa-offices/${province.slug}`} className="underline font-bold text-primary-gold">
                {province.name} SASSA office directory
              </NextLink>.
            </p>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-6">District Municipalities in {province.name}</h2>
          <div className="flex flex-wrap gap-2">
            {province.districts.map((d, i) => (
              <Chip key={i} variant="flat" size="sm">{d}</Chip>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">SASSA Offices & Contact in {province.name}</h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For office visits, use the dedicated directory — it lists each local office town with verified addresses and phone numbers where available, plus practical visiting guidance:
            </p>
            <LinkButton href={`/sassa-offices/${province.slug}`} color="primary" className="font-bold">
              Open {province.name} office directory
            </LinkButton>
            {officeTowns.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {officeTowns.map((t, i) => (
                  <Chip key={i} size="sm" variant="flat" color="default">{t}</Chip>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-5">
              Can't visit? Call SASSA on <a href="tel:0800601011" className="underline font-bold text-primary-gold">0800 60 10 11</a> (toll free), WhatsApp {getFact("sassa_whatsapp_number")} for the self-service flow, or use USSD <strong>{getFact("ussd_srd_status")}</strong> to check your SRD status.
            </p>
          </div>
        </section>

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

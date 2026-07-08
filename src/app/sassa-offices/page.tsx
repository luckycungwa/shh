import React from "react";
import type { Metadata } from "next";
import { Chip, Divider } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhone, FaClock, FaSearch } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import EditorialFooter from "../../components/EditorialFooter";
import { breadcrumbSchema } from "../../lib/schema";
import { buildMetadata } from "../../lib/seo";
import { getCurrentYearString, getCurrentMonthYearKey } from "../../lib/config";

export const metadata: Metadata = buildMetadata({
  title: `SASSA Offices by Province: Contact Details & Locations ${getCurrentYearString()}`,
  description: "Find your nearest SASSA office in all 9 provinces. Contact numbers, addresses, operating hours, and services offered at each provincial SASSA office.",
  path: "/sassa-offices",
  ogType: "article",
});

const provinces = [
  {
    name: "Eastern Cape",
    capital: "Bhisho",
    description: "The Eastern Cape has over 30 SASSA local offices serving communities across the province. The provincial office coordinates grant distribution for one of South Africa's largest beneficiary populations.",
    offices: [
      { town: "Bhisho (Provincial Office)", address: "Independence Avenue, Bhisho", phone: "040 608 7100", hours: "Mon–Fri 07:30–16:00" },
      { town: "Port Elizabeth (Gqeberha)", address: "80 Buckingham Road, Gqeberha", phone: "041 408 6000", hours: "Mon–Fri 07:30–16:00" },
      { town: "East London", address: "3 Hill Street, East London", phone: "043 705 8000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Mthatha", address: "Victoria Street, Mthatha", phone: "047 532 6001", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "Free State",
    capital: "Bloemfontein",
    description: "The Free State provincial SASSA office oversees grant distribution across the province, with local offices in all district municipalities.",
    offices: [
      { town: "Bloemfontein (Provincial Office)", address: "61 St Andrew Street, Bloemfontein", phone: "051 410 4000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Welkom", address: "Stateway Road, Welkom", phone: "057 357 9000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Bethlehem", address: "Cnr Church & Muller Street, Bethlehem", phone: "058 303 5600", hours: "Mon–Fri 07:30–16:00" },
      { town: "Sasolburg", address: "Cnr Steen & Kokerboom Street, Sasolburg", phone: "016 970 7000", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "Gauteng",
    capital: "Johannesburg",
    description: "As South Africa's most populous province, Gauteng has the highest number of SASSA offices and beneficiaries. The provincial office handles over 7 million social grant recipients.",
    offices: [
      { town: "Johannesburg (Provincial Office)", address: "78 Marshall Street, Johannesburg", phone: "011 241 8000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Pretoria", address: "262 Lilian Ngoyi Street, Pretoria", phone: "012 315 7000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Soweto", address: "1656 Mooki Street, Orlando East, Soweto", phone: "011 935 5600", hours: "Mon–Fri 07:30–16:00" },
      { town: "Tembisa", address: "3278 Reverend Naude Street, Tembisa", phone: "011 921 6600", hours: "Mon–Fri 07:30–16:00" },
      { town: "Vereeniging", address: "32 Beaconsfield Road, Vereeniging", phone: "016 430 0500", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "KwaZulu-Natal",
    capital: "Pietermaritzburg",
    description: "KwaZulu-Natal has one of the largest social grant beneficiary populations. The provincial office coordinates payments through local offices in all districts.",
    offices: [
      { town: "Pietermaritzburg (Provincial Office)", address: "181 Church Street, Pietermaritzburg", phone: "033 341 8000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Durban", address: "191 Anton Lembede Street, Durban", phone: "031 312 3000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Richards Bay", address: "Cnr Kruger & West Street, Richards Bay", phone: "035 780 6000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Ladysmith", address: "125 Murchison Street, Ladysmith", phone: "036 637 7000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Port Shepstone", address: "182 Bisset Street, Port Shepstone", phone: "039 688 9000", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "Limpopo",
    capital: "Polokwane",
    description: "Limpopo province has a high concentration of rural SASSA beneficiaries. The provincial office focuses on reaching remote communities through mobile office units.",
    offices: [
      { town: "Polokwane (Provincial Office)", address: "95 Marshall Street, Polokwane", phone: "015 230 2000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Tzaneen", address: "Cnr Agatha & Peace Street, Tzaneen", phone: "015 306 8600", hours: "Mon–Fri 07:30–16:00" },
      { town: "Lebowakgomo", address: "Block A, Lebowakgomo", phone: "015 632 4000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Thohoyandou", address: "Old parliamentary Building, Thohoyandou", phone: "015 963 2000", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "Mpumalanga",
    capital: "Mbombela (Nelspruit)",
    description: "Mpumalanga's SASSA provincial office coordinates grant distribution across three district municipalities, serving a mix of urban and rural communities.",
    offices: [
      { town: "Mbombela (Provincial Office)", address: "30 Branders Street, Mbombela", phone: "013 754 5000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Witbank (eMalahleni)", address: "Cnr Mandela & Oos Streets, eMalahleni", phone: "013 690 8000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Secunda", address: "Cnr FW De Klerk & Syfer Road, Secunda", phone: "017 634 9000", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "North West",
    capital: "Mahikeng",
    description: "North West province's SASSA offices serve a widespread rural population. The provincial office coordinates with local offices and mobile units.",
    offices: [
      { town: "Mahikeng (Provincial Office)", address: "Cnr University & Albert Luthuli Drive, Mahikeng", phone: "018 397 3000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Rustenburg", address: "80 Nelson Mandela Drive, Rustenburg", phone: "014 590 6000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Klerksdorp", address: "Cnr Margaretha & CR Swart Street, Klerksdorp", phone: "018 468 7000", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "Northern Cape",
    capital: "Kimberley",
    description: "As South Africa's largest but least populated province, Northern Cape SASSA offices serve far-flung communities across vast distances.",
    offices: [
      { town: "Kimberley (Provincial Office)", address: "1 Compound Road, Kimberley", phone: "053 831 6000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Upington", address: "Cnr Scott & Mark Street, Upington", phone: "054 331 9000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Springbok", address: "Hospital Street, Springbok", phone: "027 718 2000", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
  {
    name: "Western Cape",
    capital: "Cape Town",
    description: "The Western Cape SASSA provincial office manages grant distribution through local offices across the province, including metro and rural offices.",
    offices: [
      { town: "Cape Town (Provincial Office)", address: "9 Dorp Street, Cape Town", phone: "021 469 7000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Stellenbosch", address: "23 Bird Street, Stellenbosch", phone: "021 887 3000", hours: "Mon–Fri 07:30–16:00" },
      { town: "George", address: "70 Courtney Street, George", phone: "044 803 7000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Worcester", address: "54 High Street, Worcester", phone: "023 348 3000", hours: "Mon–Fri 07:30–16:00" },
      { town: "Khayelitsha", address: "Cnr Spine & Bonga Road, Khayelitsha", phone: "021 361 2400", hours: "Mon–Fri 07:30–16:00" },
    ],
  },
];

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
                      <p className="flex items-center gap-2"><FaMapMarkerAlt className="flex-shrink-0" /> {office.address}</p>
                      <p className="flex items-center gap-2"><FaPhone className="flex-shrink-0" /> {office.phone}</p>
                      <p className="flex items-center gap-2"><FaClock className="flex-shrink-0" /> {office.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Divider className="my-12" />
        <EditorialFooter lastUpdated={getCurrentMonthYearKey()} author="Zanele Nkosi" />
      </article>
    </div>
  );
}

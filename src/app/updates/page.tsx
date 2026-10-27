import fs from "fs";
import path from "path";
import React from "react";
import { Metadata } from "next";
import { buildMetadata } from "../../lib/seo";
import { LinkButton, Card, CardHeader, CardBody, Chip, Divider } from "@/components/ui/nextui";
import { FaNewspaper, FaClock, FaArrowRight, FaRss, FaBell, FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import { getCurrentYearString } from "../../lib/config";
import { isIndexableUpdate } from "../../lib/updates";
import JsonLd from "../../components/JsonLd";
import { breadcrumbSchema } from "../../lib/schema";

const curYear = getCurrentYearString();

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: string;
  urgent: boolean;
}

export const metadata: Metadata = buildMetadata({
  title: `SASSA Grant Updates & Information ${curYear}`,
  description: `Stay informed with the latest SASSA announcements, grant increases, and system updates for ${curYear}. Independent guide.`,
  path: "/updates",
});

export default function UpdatesListPage() {
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8"));

  const filtered = updates
    .filter((u: any) => isIndexableUpdate(u))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const alertFreshnessWindow = 90 * 24 * 60 * 60 * 1000;
  const isFreshAlert = (u: Update) => new Date(u.date).getTime() >= Date.now() - alertFreshnessWindow;
  const alerts = filtered.filter(u => u.type === "alert" && isFreshAlert(u));
  const news = filtered.filter(u => u.type !== "alert" || !isFreshAlert(u));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Updates", slug: "/updates" },
      ])} />
      <header className="text-center mb-16 space-y-4">
        <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">{filtered.length} Articles</Chip>
        <h1 className="text-5xl font-black tracking-tight">SASSA Grant Updates & Information {curYear}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Stay informed with the latest SASSA announcements, grant increases, payment schedule changes, and system updates. We track and explain every important development so you never miss what matters.
        </p>
      </header>

      <div className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/20 mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaRss className="text-primary-gold" /> Why Follow SASSA Updates?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="font-black text-primary-gold">Grant Changes</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Grant amounts, eligibility criteria, and application processes can change with little notice. We track every announcement.</p>
          </div>
          <div className="space-y-2">
            <p className="font-black text-primary-gold">System Outages</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">The SRD portal and USSD codes occasionally experience downtime. We report outages and workarounds as they happen.</p>
          </div>
          <div className="space-y-2">
            <p className="font-black text-primary-gold">Scam Warnings</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">New SASSA-related scams emerge regularly. Our scam alerts help you avoid losing money to fraudsters.</p>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-2"><FaBell className="text-red-500" /> Urgent Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alerts.map((update) => (
              <Card key={update.id} className="p-0 border-2 border-red-200 dark:border-red-800 overflow-hidden shadow-lg h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white p-6 relative">
                  <Chip color="danger" className="absolute top-4 right-4 font-bold uppercase text-[10px]">ALERT</Chip>
                  <h3 className="text-xl font-bold leading-tight mt-4">{update.title}</h3>
                </CardHeader>
                <CardBody className="p-8 flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">{update.summary}</p>
                  <div className="flex items-center justify-between text-xs font-bold text-secondary-gray mt-auto">
                    <p className="flex items-center gap-1"><FaClock /> {new Date(update.date).toLocaleDateString()}</p>
                    <LinkButton href={`/updates/${update.id}`} size="sm" color="danger" variant="flat">
                      Read Alert
                    </LinkButton>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-black mb-6 flex items-center gap-2"><FaNewspaper className="text-primary-gold" /> Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((update) => (
            <Card key={update.id} className="p-0 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-2xl transition-all h-full flex flex-col">
              <CardHeader className="bg-primary-black text-white p-6 relative">
                  <Chip color="primary" className="absolute top-4 right-4 font-bold uppercase text-[10px]">
                     Update
                  </Chip>
                 <h3 className="text-xl font-bold leading-tight mt-4">{update.title}</h3>
              </CardHeader>
              <CardBody className="p-8 flex-grow">
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">{update.summary}</p>
                 <div className="flex items-center justify-between text-xs font-bold text-secondary-gray mt-auto">
                    <p className="flex items-center gap-1"><FaClock /> {new Date(update.date).toLocaleDateString()}</p>
                    <LinkButton href={`/updates/${update.id}`} size="sm" color="primary" variant="flat">
                      Read More
                    </LinkButton>
                 </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-20" />

      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800">
          <FaInfoCircle className="text-3xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">How We Source Our Updates</h2>
          <p className="text-blue-800 dark:text-blue-300 leading-relaxed max-w-2xl mx-auto">
            Our editorial team monitors official SASSA communication channels, the Department of Social Development, National Treasury budget announcements, and reputable South African news sources. Every update includes links to official sources where possible. See our <NextLink href="/sources-policy" className="underline font-bold">Sources Policy</NextLink> for details.
          </p>
        </div>
      </section>

      <section className="text-center mt-16">
        <Card className="bg-primary-black text-white p-12 rounded-[2rem]">
          <CardBody className="space-y-6">
            <h2 className="text-3xl font-black">Never Miss an Update</h2>
            <p className="text-secondary-gray max-w-xl mx-auto">Bookmark this page and check back regularly for the latest SASSA news and alerts.</p>
            <LinkButton href="/status-check" color="primary" className="font-bold px-8 py-6">Check Your Grant Status</LinkButton>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

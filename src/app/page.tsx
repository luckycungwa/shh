import fs from "fs";
import path from "path";
import React from "react";
import { Button, Card, CardBody, CardHeader, Chip, Link } from "@nextui-org/react";
import { FaShieldAlt, FaNewspaper, FaCalendarAlt, FaQuestionCircle, FaArrowRight, FaCreditCard, FaMobileAlt as FaSmartphone, FaFileSignature, FaUserCheck, FaUsers, FaMapMarkerAlt, FaClock, FaCheckCircle, FaRegBell } from "react-icons/fa";
import NextLink from "next/link";
import { getCurrentMonthLabel, getCurrentYearString } from "../lib/config";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "SASSA Help Hub - Your Unofficial SASSA Resource",
  description: `Your friendly, independent guide to SASSA grants, payment dates, and fraud protection. Updated for ${getCurrentYearString()} with SRD R370 news, status checks, and scam alerts.`,
  path: "",
  ogType: "website",
  noTemplate: true,
});

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: string;
  urgent: boolean;
}

export default function HomePage() {
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8")).slice(0, 3);

  const paymentDatesPath = path.join(process.cwd(), "public/data/paymentDates.json");
  const paymentDates: { grant: string; date: string; day: string }[] = JSON.parse(fs.readFileSync(paymentDatesPath, "utf8"));

  const tools = [
    {
      title: "Change Banking Details",
      description: "Update your bank account for SRD R370 payments to avoid delays.",
      icon: <FaCreditCard className="text-2xl" />,
      link: "/guides/change-banking-details",
    },
    {
      title: "Change Phone Number",
      description: "Lost your registered number? Follow our guide to update it safely.",
      icon: <FaSmartphone className="text-2xl" />,
      link: "/guides/srd-grant",
    },
    {
      title: "Lodge an Appeal",
      description: "If your grant was declined, you must submit an appeal within 90 days.",
      icon: <FaFileSignature className="text-2xl" />,
      link: "/guides/appeal-guide",
    },
    {
      title: "Biometric Verification",
      description: `New for ${getCurrentYearString()}: Complete your facial recognition for enhanced security.`,
      icon: <FaUserCheck className="text-2xl" />,
      link: "/guides/biometric-verification-guide",
    },
  ];

  const stats = [
    { label: "Beneficiaries Helped", value: "2000+", icon: <FaUsers /> },
    { label: "Scams Prevented", value: "100+", icon: <FaShieldAlt /> },
    { label: "SASSA Offices", value: "200+", icon: <FaMapMarkerAlt /> },
    { label: "Updated Daily", value: getCurrentYearString(), icon: <FaClock /> },
  ];

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="relative bg-primary-black min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 via-transparent to-primary-dark"></div>
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute inset-0 bg-shimmer"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary-gold/5 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary-gold/5 blur-3xl animate-float-slow"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-gold/10 border border-primary-gold/20 text-primary-gold text-sm font-semibold mb-8 animate-fade-in-down">
              <FaRegBell className="animate-shimmer" />
              Updated for {getCurrentMonthLabel()}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.05]">
              Navigate SASSA with{" "}
              <span className="text-gradient underline decoration-primary-gold/30 underline-offset-8 decoration-2">
                Clarity
              </span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-gray/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Your friendly, independent guide to South African social grants, payment dates, and fraud protection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as={NextLink}
                href="/status-check"
                size="lg"
                className="font-bold px-10 py-7 text-lg bg-primary-gold text-primary-black hover:bg-primary-gold-light shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
              >
                Check SASSA Status <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                as={NextLink}
                href="/payment-calendar"
                variant="bordered"
                size="lg"
                className="font-bold px-10 py-7 text-lg text-white border-white/20 hover:border-primary-gold/50 hover:bg-white/5 transition-all duration-300"
              >
                {`Payment Dates ${getCurrentYearString()}`}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment Dates Strip ── */}
      <section className="relative bg-gradient-to-r from-primary-gold via-primary-gold-dark to-primary-gold py-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-8 lg:mb-0 lg:absolute lg:left-6 lg:top-1/2 lg:-translate-y-1/2">
            <div className="text-center lg:text-left">
              <p className="text-primary-black/60 text-xs font-bold uppercase tracking-[0.2em]">Payment Schedule</p>
              <h2 className="text-3xl lg:text-4xl font-black text-primary-black leading-tight italic">{getCurrentMonthLabel()}</h2>
            </div>
          </div>
          <div className="lg:ml-72 grid grid-cols-2 md:grid-cols-4 gap-3">
            {paymentDates.map((p, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col items-center text-center shadow-sm hover:bg-white/30 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-[9px] font-black uppercase text-primary-black/60 tracking-wider mb-1">{p.grant}</p>
                <p className="text-2xl font-black text-primary-black leading-none">{new Date(p.date).getDate()}</p>
                <p className="text-[9px] font-bold text-primary-black/70 uppercase tracking-tight mt-0.5">{p.day}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-primary-surface dark:bg-primary-dark border-y border-primary-gold/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-gold/5 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-gold/10 flex items-center justify-center text-primary-gold shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-black text-primary-black dark:text-white leading-none">{stat.value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-secondary-gray mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Callout ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-black via-primary-black to-primary-dark border border-primary-gold/10 shadow-dark-lg glow-gold">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary-gold/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-gold/5 blur-2xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-3xl text-primary-gold shrink-0">
              <FaShieldAlt />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Independent & Trusted</h2>
              <p className="text-secondary-gray mt-2 max-w-xl">
                We are South Africans helping South Africans. Our goal is to simplify grant information so you never miss a payment.
              </p>
            </div>
            <Button as={NextLink} href="/about" className="font-bold px-8 py-6 bg-primary-gold/10 text-primary-gold border border-primary-gold/20 hover:bg-primary-gold/20 transition-all shrink-0">
              Learn Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* ── Essential Tools ── */}
      <section className="max-w-7xl mx-auto px-6 py-28 w-full">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-gold mb-3">Quick Actions</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">Essential SASSA Tools</h2>
          <p className="text-lg text-secondary-gray-dark dark:text-secondary-gray mt-3 max-w-xl mx-auto">
            Step-by-step guides for the most common SASSA tasks — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <NextLink key={i} href={tool.link} className="group block">
              <div className="relative h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/0 via-primary-gold/0 to-primary-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary-gold group-hover:h-full transition-all duration-300 rounded-r"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-xl text-primary-gold group-hover:bg-primary-gold group-hover:text-primary-black transition-all duration-300 mb-6">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{tool.title}</h3>
                  <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">{tool.description}</p>
                  <div className="flex items-center gap-2 mt-6 text-sm font-bold text-primary-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Open Guide <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      </section>

      {/* ── Latest Updates ── */}
      <section className="bg-primary-surface dark:bg-primary-dark/80 py-28 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-gold mb-3">Stay Informed</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">
                Latest Grant Updates
              </h2>
               <p className="text-secondary-gray-dark dark:text-secondary-gray mt-3">{`Stay informed with the latest SASSA announcements for ${getCurrentYearString()}.`}</p>
            </div>
            <Button as={NextLink} href="/updates" variant="bordered" className="font-bold border-primary-gold/30 text-primary-gold hover:bg-primary-gold/10 shrink-0">
              View All Updates <FaArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((update) => (
              <NextLink key={update.id} href={`/updates/${update.id}`} className="group block">
                <div className="h-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                  <div className={`h-2 ${update.type === "alert" ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gradient-to-r from-primary-gold to-primary-gold-light"}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Chip
                        variant="flat"
                        size="sm"
                        className={`font-bold uppercase text-[10px] ${update.type === "alert" ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : "bg-primary-gold/10 text-primary-gold"}`}
                      >
                        {update.type === "alert" ? "⚠ Alert" : "Update"}
                      </Chip>
                      <p className="text-[11px] font-semibold text-secondary-gray flex items-center gap-1">
                        <FaClock /> {new Date(update.date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <h3 className="text-base font-bold leading-snug mb-3 group-hover:text-primary-gold transition-colors line-clamp-2 dark:text-white">
                      {update.title}
                    </h3>
                    <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed line-clamp-3">
                      {update.summary}
                    </p>
                    <div className="flex items-center gap-1.5 mt-5 text-sm font-bold text-primary-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Full Story <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-6 py-28 w-full">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-gold via-primary-gold-dark to-primary-gold p-12 md:p-16 text-center shadow-dark-lg">
          <div className="absolute inset-0 bg-grid opacity-10"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-primary-black mb-4 tracking-tight">Still Need Assistance?</h2>
            <p className="text-lg text-primary-black/80 max-w-lg mx-auto mb-10">
              Explore our comprehensive FAQ database or get in touch with our team for guidance on your grant application.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as={NextLink}
                href="/faq"
                size="lg"
                className="font-bold px-10 py-7 text-lg bg-primary-black text-white hover:bg-primary-black/90 shadow-xl hover:shadow-2xl transition-all"
              >
                Browse FAQs <FaQuestionCircle className="ml-2" />
              </Button>
              <Button
                as={NextLink}
                href="/contact"
                variant="bordered"
                size="lg"
                className="font-bold px-10 py-7 text-lg border-primary-black/30 text-primary-black hover:bg-primary-black/10"
              >
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

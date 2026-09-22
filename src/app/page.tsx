import fs from "fs";
import path from "path";
import React from "react";
import { Button, Card, CardBody, CardHeader, Chip, Link } from "@nextui-org/react";
import { FaShieldAlt, FaCalendarAlt, FaQuestionCircle, FaArrowRight, FaCreditCard, FaMobileAlt as FaSmartphone, FaFileSignature, FaUserCheck, FaUsers, FaClock, FaCheckCircle, FaRegBell, FaFileAlt } from "react-icons/fa";
import NextLink from "next/link";
import { getCurrentMonthLabel, getCurrentYearString } from "../lib/config";
import { buildMetadata } from "../lib/seo";
import { getFact } from "../lib/canonical-facts";
import HeroCarousel from "../components/HeroCarousel";

export const metadata = buildMetadata({
  title: "SASSA Help Hub — 2026 Payment Dates, SRD R370 Status Check & Grant Guides",
  description: `Independent, unofficial SASSA guides for South Africans: 2026 grant payment dates, SRD R370 status checks, application steps, appeal help, and scam alerts — simplified and free.`,
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
  const allUpdates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8"));
  const updates = allUpdates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).filter(u => new Date(u.date) >= new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)).slice(0, 3);
  if (updates.length < 3) {
    const allSorted = allUpdates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
    updates.push(...allSorted.filter(u => !updates.find(x => x.id === u.id)).slice(0, 3 - updates.length));
  }

  const paymentDatesPath = path.join(process.cwd(), "public/data/paymentDates.json");
  const paymentDates: { grant: string; date: string; day: string }[] = JSON.parse(fs.readFileSync(paymentDatesPath, "utf8"));

  const tools = [
    {
      title: "How to Apply",
      description: "Step-by-step guide to applying for any SASSA grant, online or in person.",
      icon: <FaFileAlt className="text-2xl" />,
      link: "/guides/apply-sassa-grants",
    },
    {
      title: "Change Banking Details",
      description: "Update your bank account for SRD R370 payments to avoid delays.",
      icon: <FaCreditCard className="text-2xl" />,
      link: "/guides/bank-details-pending-fix",
    },
    {
      title: "Change Phone Number",
      description: "Lost your registered number? Follow our guide to update it safely.",
      icon: <FaSmartphone className="text-2xl" />,
      link: "/guides/lost-phone-number",
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
      link: "/guides/biometric-fix-guide",
    },
  ];

  const stats = [
    { label: "Grants Covered", value: "8", icon: <FaUsers /> },
    { label: "Independent Resource", value: "Reliable", icon: <FaShieldAlt /> },
    { label: "Payment Calendar", value: "Monthly", icon: <FaCalendarAlt /> },
    { label: "latest updates", value: getCurrentYearString(), icon: <FaClock /> },
  ];

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="relative bg-primary-black min-h-[85vh] flex items-center overflow-hidden">
        <HeroCarousel />
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
                <p className="text-2xl font-black text-primary-black leading-none">{p.date === "TBC" ? "TBC" : new Date(p.date).getDate()}</p>
                <p className="text-[9px] font-bold text-primary-black/70 uppercase tracking-tight mt-0.5">{p.day}</p>
              </div>
            ))}
          </div>
          <p className="lg:ml-72 mt-4 text-xs font-semibold text-primary-black/70">
            Main grant payments run 2&ndash;4 September 2026. SASSA has confirmed the <strong>SRD R370 payment dates of 23 and 25 September 2026</strong>. The fourth payment day for grants under review remains unconfirmed &mdash; check your status for your personal &ldquo;Pay Day&rdquo; date and see the <a href="/dates/september-2026" className="underline font-bold">full September schedule</a>. Avoid long queues by withdrawing later in the day or using a retail point.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-primary-surface dark:bg-primary-dark border-y border-primary-gold/5 mb-4">
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">Independent & Unofficial</h2>
              <p className="text-secondary-gray mt-2 max-w-xl">
                SASSA Help Hub is an unofficial, independent information resource. We are not affiliated with the South African Social Security Agency.
              </p>
            </div>
            <Button as={NextLink} href="/about" className="font-bold px-8 py-6 bg-primary-gold/10 text-primary-gold border border-primary-gold/20 hover:bg-primary-gold/20 transition-all shrink-0">
              Learn Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* ── What do you need help with? (problem-first) ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-gold mb-3">Start Here</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">What do you need help with?</h2>
          <p className="text-lg text-secondary-gray-dark dark:text-secondary-gray mt-3 max-w-xl mx-auto">
            Pick the situation that matches yours and we&rsquo;ll point you to the exact help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "I want to apply for a grant", href: "/guides/apply-sassa-grants", icon: <FaFileAlt className="text-xl" /> },
            { title: "I want to check my SRD status", href: "/status-check", icon: <FaUserCheck className="text-xl" /> },
            { title: "My grant was declined — how do I appeal?", href: "/appeals/how-to-appeal", icon: <FaFileSignature className="text-xl" /> },
            { title: "When will I be paid?", href: "/payment-calendar", icon: <FaCalendarAlt className="text-xl" /> },
            { title: "I need to change my banking details", href: "/banking/update-phone-number", icon: <FaCreditCard className="text-xl" /> },
            { title: "My payment hasn't arrived", href: "/guides/missing-grant-payment-guide", icon: <FaClock className="text-xl" /> },
          ].map((item, i) => (
            <NextLink key={i} href={item.href} className="group block">
              <div className="h-full flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-gold/40 hover:shadow-lg transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary-gold/10 flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-primary-black transition-all shrink-0">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold dark:text-white leading-snug text-sm sm:text-base">{item.title}</h3>
                </div>
                <FaArrowRight className="text-primary-gold text-sm group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </NextLink>
          ))}
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

      {/* ── Explore by Topic (Programmatic Verticals) ── */}
      <section className="bg-primary-surface dark:bg-primary-dark/80 py-28 w-full border-y border-primary-gold/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-gold mb-3">Explore by Topic</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">Answer Guides by Category</h2>
            <p className="text-lg text-secondary-gray-dark dark:text-secondary-gray mt-3 max-w-xl mx-auto">
              Deep-dive guides organised by the topics you search for most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NextLink href="/payment-calendar" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all"><FaCalendarAlt /></div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Payment Dates & Calendar</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">Monthly schedules for the SRD R370 and all permanent grants.</p>
              </div>
            </NextLink>

            <NextLink href="/sassa-offices" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all">📍</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">SASSA Offices by City</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">Addresses, phones and tips for offices in all nine provinces.</p>
              </div>
            </NextLink>

            <NextLink href="/banking" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all"><FaCreditCard /></div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Banking & Payment Methods</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">Bank transfer, Postbank, cash send and how to update your details.</p>
              </div>
            </NextLink>

            <NextLink href="/appeals" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all"><FaFileSignature /></div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">How to Appeal a Rejection</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">Submit, track and understand your SRD appeal on the ITSAA portal.</p>
              </div>
            </NextLink>

            <NextLink href="/status" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all">🔍</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Grant Status Meanings</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">What each SASSA status means and what to do next.</p>
              </div>
            </NextLink>

            <NextLink href="/grants" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all">📋</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">All SASSA Grants Explained</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">Eligibility, amounts and application steps for every grant type.</p>
              </div>
            </NextLink>

            <NextLink href="/how-much-is-srd-grant" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all">💰</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">How Much Is the SRD Grant?</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">The R370 amount, the R624 income limit, and when it changes.</p>
              </div>
            </NextLink>

            <NextLink href="/sassa-contact" className="group block">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center text-2xl text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-primary-black transition-all">📞</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">SASSA Contact Numbers</h3>
                <p className="text-sm text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">Official helpline, WhatsApp, USSD and email — in one place.</p>
              </div>
            </NextLink>
          </div>
        </div>
      </section>

      {/* ── Editorial: The Grant Landscape in 2026 ── */}
      <section className="bg-white dark:bg-gray-900 py-28 w-full border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-gold mb-3">The Big Picture</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">
              The SRD Grant in 2026: What's Changed and What It Means for You
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-5 text-lg text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">
              <p>
                The Social Relief of Distress grant — commonly known as the SRD grant — remains the backbone of emergency support for unemployed South Africans in 2026, paying {getFact("srd_grant_amount")} per month to qualifying applicants aged {getFact("srd_age_range_min")} to {getFact("srd_age_range_max")}. Unlike the permanent grants, the SRD is not a long-term entitlement: you must re-qualify each month, and your eligibility is checked automatically against your bank accounts, UIF records, and other government databases.
              </p>
              <p>
                This is why so many applicants are surprised by a decline. A family transfer, a stokvel payout, or even money moved between your own accounts can push your monthly deposits past the income limit and trigger an automated decline. The good news is that most of these declines are appealable, and the appeal process is free and handled online through the official portals.
              </p>
            </div>
            <div className="space-y-5 text-lg text-secondary-gray-dark dark:text-secondary-gray leading-relaxed">
              <p>
                Understanding the difference between the SRD and the permanent grants matters more in 2026 than ever. The Child Support Grant pays {getFact("child_support_grant_amount")} per child per month, the Old Age Pension pays {getFact("old_age_pension_amount_under75")} for pensioners under 75, and each has its own means test. If you are over 59, applying for the Old Age Pension — or the Disability Grant if you qualify — can replace the uncertainty of the monthly SRD cycle with a reliable permanent income.
              </p>
              <p>
                Whatever grant applies to you, the rules for checking your status, updating your banking details, and keeping your payments safe are the same. That is what this site exists to explain, in plain language, with every claim linked back to an official source you can check yourself before you act.
              </p>
            </div>
          </div>
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
               Browse the FAQ or get in touch if you need help with your grant application.
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
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

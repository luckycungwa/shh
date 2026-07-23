import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Chip, Button } from "@nextui-org/react";
import {
  FaSearch, FaExclamationTriangle, FaMoneyCheckAlt, FaUserCog,
  FaMobileAlt, FaShieldAlt, FaMapMarkerAlt, FaArrowRight,
  FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaClock,
  FaBan, FaCreditCard, FaPhone, FaLock, FaGlobeAfrica,
  FaFileAlt, FaClipboardList
} from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { faqPageSchema } from "../../lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Common SASSA Problems — Find Your Solution Fast",
  description: "Stuck on a SASSA grant issue? Browse common problems by category — applications, payments, appeals, banking, scams, and more. Step-by-step guides for every SASSA problem.",
  path: "/common-problems",
});

const categories = [
  {
    id: "applications",
    icon: FaFileAlt,
    title: "Application Problems",
    description: "Status checks, eligibility, documents, and what each status means.",
    links: [
      { href: "/status", label: "All 10 Grant Status Meanings Explained", desc: "What each status means and what to do next" },
      { href: "/status/pending", label: "Stuck on Pending for Weeks", desc: "Why it happens and when to take action" },
      { href: "/status/bank-details-pending", label: "Bank Details Pending — Payment Blocked", desc: "How to fix this status and get paid" },
      { href: "/status/identity-verification", label: "Identity Verification Required", desc: "Why SASSA needs to verify you and how to do it" },
      { href: "/status/referred", label: "Application Referred for Manual Review", desc: "What it means and how long it takes" },
      { href: "/status/means-test-failed", label: "Means Test Failed", desc: "Why income threshold was exceeded and how to appeal" },
      { href: "/status/approved", label: "Approved — When Do I Get Paid?", desc: "What happens after approval and payment timelines" },
      { href: "/status/declined", label: "Application Declined", desc: "Common decline reasons and how to appeal" },
      { href: "/status/paid", label: "Status Shows Paid but No Money", desc: "What to do if your money hasn't arrived" },
      { href: "/guides/guide-001", label: "How to Apply for Child Support Grant", desc: "Step-by-step application for CSG" },
      { href: "/guides/srd-grant", label: "How to Apply for SRD R370 Grant", desc: "Online application process for the SRD grant" },
      { href: "/guides/document-checklist", label: "SASSA Documents Checklist", desc: "What documents to bring for each grant type" },
      { href: "/guides/guide-means-test", label: "Understanding the Means Test", desc: "How income and assets are assessed" },
      { href: "/guides/sassa-grant-renewal", label: "Why Your Grant Is Checked Every Month", desc: "Monthly reassessment explained" },
      { href: "/eligibility-check", label: "SASSA Grant Eligibility Checker", desc: "Check which grants you qualify for" },
      { href: "/glossary", label: "SASSA Glossary of Terms", desc: "Understand SASSA terminology" },
    ],
  },
  {
    id: "declined",
    icon: FaTimesCircle,
    title: "Declined Applications & Appeals",
    description: "Your application was declined — here is why and how to appeal.",
    links: [
      { href: "/guides/appeal-guide", label: "How to Appeal a Declined SRD Application", desc: "Full step-by-step appeal process" },
      { href: "/guides/appeal-timeline", label: "How Long Does an Appeal Take?", desc: "Appeal timeline and how to track it" },
      { href: "/status/appeal-pending", label: "Appeal Pending — What Now?", desc: "What happens after you submit an appeal" },
      { href: "/decline-reason/income-source-detected", label: "Income Source Detected", desc: "Bank deposits over R624 — how to fix" },
      { href: "/decline-reason/identity-verification-failed", label: "Identity Verification Failed", desc: "ID mismatch with Home Affairs" },
      { href: "/decline-reason/uif-registered", label: "UIF Registered", desc: "Old UIF record blocking your grant" },
      { href: "/decline-reason/nsfas-registered", label: "NSFAS Registered", desc: "Student funding record still active" },
      { href: "/decline-reason/existing-sassa-grant", label: "Existing SASSA Grant", desc: "One-grant rule explained" },
      { href: "/decline-reason/government-payroll", label: "Government Payroll Registered", desc: "Government job record still active" },
      { href: "/decline-reason/age-outside-range", label: "Age Outside Range", desc: "Under 18 or over 59 — which grant to apply for" },
      { href: "/decline-reason/deceased-dha-record", label: "Deceased Record on DHA", desc: "Home Affairs shows you as deceased" },
      { href: "/guides/stokvel-e-wallet", label: "Stokvel Payouts Causing Declines", desc: "Why savings payouts trigger declines" },
    ],
  },
  {
    id: "payments",
    icon: FaMoneyCheckAlt,
    title: "Payment Problems",
    description: "Missing payments, wrong amounts, and banking issues.",
    links: [
      { href: "/payment-calendar", label: "SASSA Payment Dates 2026", desc: "Full payment schedule for all grants" },
      { href: "/guides/sassa-payment-methods", label: "Payment Methods Compared", desc: "Bank vs Postbank vs Cash Send vs Retail" },
      { href: "/guides/change-banking-details", label: "How to Change Banking Details", desc: "Update your bank account for grant payments" },
      { href: "/guides/postbank-black-card", label: "Gold Card to Black Card Migration", desc: "Switch before 31 August 2026 deadline" },
      { href: "/guides/grant-amounts-history", label: "Grant Amounts History 2020-2026", desc: "Historical grant amounts and increases" },
      { href: "/updates/update-2026-027", label: "August 2026 Payment Schedule", desc: "Latest confirmed payment dates" },
    ],
  },
  {
    id: "account",
    icon: FaUserCog,
    title: "Account Management",
    description: "Lost phone, life certification, suspended grants, and profile updates.",
    links: [
      { href: "/guides/lost-phone-number", label: "Lost or Changed Your Phone Number", desc: "How to update your SASSA phone number" },
      { href: "/guides/life-certification", label: "SASSA Life Certification 2026", desc: "Complete annual verification online" },
      { href: "/guides/guide-reinstate-grant", label: "Reinstate a Lapsed or Suspended Grant", desc: "How to get your grant reinstated" },
      { href: "/guides/guide-report-fraud", label: "Report SASSA Fraud", desc: "How to report fraud and protect your grant" },
    ],
  },
  {
    id: "technology",
    icon: FaMobileAlt,
    title: "Technology & Access Tools",
    description: "Check your status without internet, use WhatsApp, or pass biometrics.",
    links: [
      { href: "/guides/sassa-whatsapp", label: "SASSA WhatsApp Guide", desc: "Use WhatsApp for status checks and appeals" },
      { href: "/guides/moya-app-sassa", label: "Moya App for SASSA", desc: "Free-data app for SRD status checks" },
      { href: "/guides/ussd-codes", label: "USSD Codes — No Internet Needed", desc: "Check status on any phone with no data" },
      { href: "/guides/biometric-verification-guide", label: "Biometric Verification Guide", desc: "Pass the facial recognition requirement" },
      { href: "/status-check", label: "SASSA Status Check Tool", desc: "Check your SRD application status" },
    ],
  },
  {
    id: "scams",
    icon: FaShieldAlt,
    title: "Scams & Fraud Protection",
    description: "Protect yourself from SASSA-related scams and phishing.",
    links: [
      { href: "/scam-alert", label: "SASSA Scam & Fraud Alerts", desc: "Latest scams targeting grant beneficiaries" },
      { href: "/guides/sassa-online-security", label: "Online Security Guide", desc: "How to spot fake SASSA websites" },
      { href: "/guides/guide-report-fraud", label: "How to Report SASSA Fraud", desc: "Step-by-step fraud reporting guide" },
    ],
  },
  {
    id: "provinces",
    icon: FaMapMarkerAlt,
    title: "Province-Specific Help",
    description: "SASSA office locations, contact details, and local challenges by province.",
    links: [
      { href: "/sassa-offices", label: "All SASSA Offices by Province", desc: "Addresses, contacts, and operating hours" },
      { href: "/resources", label: "SASSA Office Locator", desc: "Find offices and services near you" },
      { href: "/province/eastern-cape", label: "Eastern Cape", desc: "Rural access and mobile unit info" },
      { href: "/province/free-state", label: "Free State", desc: "Farming community access" },
      { href: "/province/gauteng", label: "Gauteng", desc: "High volume and scam prevalence" },
      { href: "/province/kwazulu-natal", label: "KwaZulu-Natal", desc: "Flooding disruptions and mobile units" },
      { href: "/province/limpopo", label: "Limpopo", desc: "Remote villages and limited internet" },
      { href: "/province/mpumalanga", label: "Mpumalanga", desc: "Cross-border issues and mobile units" },
      { href: "/province/north-west", label: "North West", desc: "UIF deregistration issues" },
      { href: "/province/northern-cape", label: "Northern Cape", desc: "Vast distances — online methods recommended" },
      { href: "/province/western-cape", label: "Western Cape", desc: "Seasonal farm worker issues" },
    ],
  },
  {
    id: "faqs",
    icon: FaQuestionCircle,
    title: "Frequently Asked Questions",
    description: "Quick answers to the most common SASSA questions.",
    links: [
      { href: "/faq", label: "Full SASSA FAQ — 50+ Questions", desc: "Payments, applications, eligibility, biometrics, scams, and more" },
      { href: "/faq#payments", label: "Payment Questions", desc: "When grants are paid, delays, and methods" },
      { href: "/faq#applications", label: "Application Questions", desc: "How to apply, who qualifies, and documents needed" },
      { href: "/faq#biometrics", label: "Biometric Questions", desc: "Facial recognition and identity verification" },
      { href: "/faq#scams", label: "Fraud & Scam Questions", desc: "How to spot and report scams" },
    ],
  },
];

const urgentAlert = {
  title: "Gold Card Deadline: 31 August 2026",
  desc: "Your SASSA Gold Card stops working on 31 August 2026. Over 600,000 beneficiaries still need to switch to the Postbank Black Card. The replacement is free.",
  href: "/guides/postbank-black-card",
};

export default function CommonProblemsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <JsonLd data={faqPageSchema([
        { q: "My SASSA SRD status is stuck on Pending — what do I do?", a: "Pending means SASSA is still verifying your information. No action is needed unless it has been pending for more than 30 days — then contact SASSA on 0800 60 10 11." },
        { q: "My application was declined — how do I appeal?", a: "Visit the official SRD appeals portal at srd.sassa.gov.za/appeals/appeal, enter your ID and phone number, select the declined month, and submit your explanation within 30 days." },
        { q: "My status says Approved but I have not been paid — why?", a: "An approved status means you qualified, but the payment date may not be assigned yet. Check back after the 20th of the month. If no payment date appears after 3 weeks, contact SASSA." },
        { q: "How do I change my banking details for SRD?", a: "Log into the SRD portal at srd.sassa.gov.za, go to 'Change Banking Details', enter your new account info, and wait for verification." },
        { q: "My SASSA Gold Card is expiring — what should I do?", a: "Replace your Gold Card with the free Postbank Black Card before 31 August 2026. Visit any Postbank service point with your ID." },
      ])} />

      <header className="text-center mb-16 max-w-3xl mx-auto">
        <Chip color="danger" variant="flat" className="font-bold uppercase text-xs mb-4 animate-pulse">
          Most Visited Page
        </Chip>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
          Common SASSA Problems
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          Find your problem below. Every guide on this site is organised by category so you can quickly find the solution you need.
        </p>
      </header>

      <NextLink
        href={urgentAlert.href}
        className="block mb-16 p-6 bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-3xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-all group"
      >
        <div className="flex items-start gap-4">
          <div className="bg-red-500 p-3 rounded-2xl flex-shrink-0">
            <FaExclamationTriangle className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <p className="font-black text-lg text-red-800 dark:text-red-300 group-hover:underline">{urgentAlert.title}</p>
            <p className="text-red-600 dark:text-red-400 mt-1">{urgentAlert.desc}</p>
          </div>
          <FaArrowRight className="text-red-400 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </NextLink>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-primary-gold/10 hover:border-primary-gold/30 border border-gray-100 dark:border-gray-800 transition-all"
          >
            <cat.icon className="text-primary-gold text-lg flex-shrink-0" />
            <span className="text-sm font-bold leading-tight">{cat.title}</span>
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary-gold/10 p-3 rounded-2xl">
                <category.icon className="text-primary-gold text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-black">{category.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.links.map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="group block p-5 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-gold/30 hover:shadow-lg transition-all"
                >
                  <p className="font-bold text-sm group-hover:text-primary-gold transition-colors leading-tight mb-1">
                    {link.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {link.desc}
                  </p>
                </NextLink>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 p-10 bg-primary-gold/5 rounded-3xl border border-primary-gold/10 text-center">
        <FaSearch className="text-4xl text-primary-gold mx-auto mb-4" />
        <h2 className="text-2xl font-black mb-3">Still Stuck?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
          If you cannot find your problem listed here, try the full FAQ page or contact us directly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button as={NextLink} href="/faq" color="primary" variant="flat" size="lg" className="font-bold">
            Browse Full FAQ
          </Button>
          <Button as={NextLink} href="/contact" color="primary" size="lg" className="font-bold">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
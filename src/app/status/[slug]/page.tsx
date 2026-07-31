import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, Chip, Divider } from "@nextui-org/react";
import { FaClock, FaPhone, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import { articleSchema, breadcrumbSchema } from "../../../lib/schema";
import { getCurrentYearString } from "../../../lib/config";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface StatusMeaning {
  slug: string;
  status_label: string;
  title: string;
  description: string;
  what_it_means: string;
  why_it_happens: string[];
  how_to_fix: { title: string; content: string }[];
  how_long: string;
  who_to_contact: { label: string; value: string }[];
  sources: string[];
  related: string[];
  last_updated: string;
  author: string;
}

const statusMeanings: StatusMeaning[] = [
  {
    slug: "application-complete",
    status_label: "Application Complete",
    title: "SASSA Status: 'Application Complete' — What It Means & What Happens Next",
    description: "Your SASSA application has been submitted successfully. Learn what this status means, how long processing takes, and what to do while waiting.",
    what_it_means: "'Application Complete' means SASSA has received your application and all the information you provided. Your details are now in the queue for verification and processing. This is the first status you will see after submitting your application online or at a SASSA office. It does not mean your application has been approved yet — it simply confirms that the system has accepted your submission.",
    why_it_happens: [
      "You successfully submitted your SRD R370 application on srd.sassa.gov.za",
      "A SASSA officer entered your details during an in-person application",
      "Your application was received outside of normal business hours and is awaiting processing"
    ],
    how_to_fix: [
      { title: "Wait for Processing", content: "The status will change as your application moves through the verification process. This typically takes a few days." },
      { title: "Keep Your Phone Active", content: "Make sure your registered mobile number is active and has network coverage. SASSA may send you SMS updates." },
      { title: "Check Your Status Regularly", content: "Return to the SRD portal or use the WhatsApp line (082 046 8553) to check for updates." }
    ],
    how_long: "The 'Application Complete' status usually lasts 1 to 7 days before changing to 'Pending' or another status as verification begins.",
    who_to_contact: [
      { label: "SASSA Helpline", value: "0800 60 10 11" },
      { label: "SRD Portal", value: "srd.sassa.gov.za" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/grants/srd-r370-grant", "/status/pending", "/status/declined"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "pending",
    status_label: "Pending",
    title: "SASSA Status: 'Pending' — What It Means & What To Do",
    description: "'Pending' is the most common SASSA status. Learn what it means, why it happens, how long it lasts, and when to take action.",
    what_it_means: "'Pending' means SASSA is actively verifying your information. Your application is being cross-checked against several government databases including the Department of Home Affairs (for identity verification), the South African Revenue Service (SARS) for income checks, the Unemployment Insurance Fund (UIF), and the National Student Financial Aid Scheme (NSFAS). Your bank accounts are also being monitored to ensure your income stays below R624. This is a normal part of the process and most applications go through a 'Pending' period.",
    why_it_happens: [
      "SASSA is verifying your ID number with Home Affairs",
      "Your bank accounts are being checked for income deposits",
      "Your details are being cross-referenced with UIF and SARS databases",
      "There is a backlog of applications causing delays",
      "Manual review is required due to a data mismatch"
    ],
    how_to_fix: [
      { title: "Wait — This is Normal", content: "Pending does not mean rejected. Most applications remain in this status for 1 to 4 weeks." },
      { title: "Do Not Reapply", content: "Applying again while your existing application is pending will not speed up the process and may cause confusion." },
      { title: "Check for SMS Updates", content: "SASSA will send SMS updates when your status changes." },
      { title: "Contact SASSA After 30 Days", content: "If your status remains 'Pending' for more than 30 days, call the SASSA helpline at 0800 60 10 11." }
    ],
    how_long: "The 'Pending' status typically lasts 1 to 4 weeks. During peak application periods (the start of each month), it may take longer.",
    who_to_contact: [
      { label: "SASSA Helpline", value: "0800 60 10 11" },
      { label: "SRD Portal", value: "srd.sassa.gov.za" },
      { label: "WhatsApp Line", value: "082 046 8553" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/status/application-complete", "/status/approved", "/status/declined", "/faq"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "bank-details-pending",
    status_label: "Bank Details Pending",
    title: "SASSA Status: 'Bank Details Pending' — How to Fix It Fast",
    description: "'Bank Details Pending' means your application is approved but SASSA cannot pay you. Learn how to update your banking details immediately.",
    what_it_means: "'Bank Details Pending' indicates that your application has been approved in principle, but SASSA does not have valid banking information to deposit your grant. Your payment cannot be processed until you provide correct banking details. This is one of the most common reasons for payment delays. The good news is that fixing this is straightforward.",
    why_it_happens: [
      "You did not provide banking details during your application",
      "The bank account details you provided are invalid or incorrect",
      "Your bank account has been closed or frozen",
      "The account name does not match your ID document",
      "You recently changed banks and did not update your details"
    ],
    how_to_fix: [
      { title: "Log into the SRD Portal", content: "Go to srd.sassa.gov.za and log in using your ID number and registered phone number." },
      { title: "Navigate to Banking Details", content: "Find the 'Update Banking Details' section on the portal." },
      { title: "Enter Correct Details", content: "Provide your full bank name, account number, branch code, and account holder name exactly as it appears on your ID." },
      { title: "Submit and Wait", content: "After submitting, your details will be verified. This usually takes 3 to 7 working days." },
      { title: "Check Your Status", content: "Return to the portal to confirm your status has changed from 'Bank Details Pending'." }
    ],
    how_long: "After submitting corrected banking details, verification takes 3 to 7 working days. Payment will be released in the next available batch.",
    who_to_contact: [
      { label: "SRD Portal", value: "srd.sassa.gov.za" },
      { label: "SASSA Helpline", value: "0800 60 10 11" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/guides/change-banking-details", "/status/approved", "/payment-calendar"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "identity-verification",
    status_label: "Identity Verification",
    title: "SASSA Status: 'Identity Verification' — What It Means & How to Resolve",
    description: "'Identity Verification' means SASSA needs to confirm your identity. Learn why this happens and how to complete the verification process.",
    what_it_means: "'Identity Verification' means that SASSA could not automatically verify your identity through the Department of Home Affairs database. Your application has been flagged for manual identity verification. This may involve submitting additional documents or completing a biometric verification (facial recognition) process. This status is becoming more common in 2026 as SASSA implements stricter security measures.",
    why_it_happens: [
      "Your ID number does not match Home Affairs records",
      "Your name or surname is spelled differently on your application vs your ID document",
      "A nickname or shortened name was used instead of your full name",
      "Your ID document was recently issued and has not propagated to all databases",
      "Your application was flagged for biometric (facial recognition) verification"
    ],
    how_to_fix: [
      { title: "Check Your Application Details", content: "Log into the SRD portal and verify that your name, surname, and ID number are exactly as they appear on your ID document." },
      { title: "Complete Biometric Verification", content: "If you received an SMS with a biometric verification link, complete the facial recognition process within 72 hours." },
      { title: "Correct Name/Surname", content: "Use the 'Request Names and Surname Update' tool on the SRD website if there is a spelling mismatch." },
      { title: "Visit a SASSA Office", content: "If online methods do not resolve the issue, visit your nearest SASSA office with your ID document." }
    ],
    how_long: "Online corrections typically take 3 to 7 working days. Biometric verification is instant once you complete the facial recognition process.",
    who_to_contact: [
      { label: "SRD Portal", value: "srd.sassa.gov.za" },
      { label: "SASSA Helpline", value: "0800 60 10 11" },
      { label: "Home Affairs", value: "0800 60 11 90" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za", "https://www.dha.gov.za"],
    related: ["/status/pending", "/status/declined", "/guides/biometric-verification-guide", "/faq"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "referred",
    status_label: "Referred",
    title: "SASSA Status: 'Referred' — What It Means & How to Get Unstuck",
    description: "'Referred' means your application is being manually reviewed. Learn why this happens, how long it takes, and what you can do.",
    what_it_means: "'Referred' means your application did not pass the automated checks and has been referred for manual review by a SASSA official. This is not a decline — it simply means a human being needs to look at your application because the system found something that requires human judgment. This status often leads to either approval or decline after the manual review is complete.",
    why_it_happens: [
      "There is a mismatch between your application data and government databases",
      "Your income is borderline relative to the R624 threshold",
      "Your bank account has irregular deposits that need human assessment",
      "Your ID or personal details triggered a manual review flag",
      "There is a potential duplicate application linked to your ID"
    ],
    how_to_fix: [
      { title: "Wait for the Review", content: "Manual review is conducted by SASSA officials. There is nothing you can do to speed this up." },
      { title: "Do Not Reapply", content: "Reapplying will not help and may create additional confusion." },
      { title: "Check for SMS Updates", content: "SASSA will notify you when the review is complete and your status has changed." },
      { title: "Contact SASSA After 30 Days", content: "If the status remains 'Referred' for more than 30 days, call the helpline to follow up." }
    ],
    how_long: "Manual review takes 2 to 6 weeks, depending on the complexity of your case and the current workload at your regional SASSA office.",
    who_to_contact: [
      { label: "SASSA Helpline", value: "0800 60 10 11" },
      { label: "Your Local SASSA Office", value: "Visit our offices page" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/status/pending", "/status/means-test-failed", "/status/declined", "/guides/appeal-guide"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "means-test-failed",
    status_label: "Means Test Failed",
    title: "SASSA Status: 'Means Test Failed' — What It Means & How to Appeal",
    description: "'Means Test Failed' means SASSA found that your income or assets exceed the allowed limit. Learn what this means and how to appeal.",
    what_it_means: "'Means Test Failed' means SASSA's automated system checked your financial situation and determined that you have income or assets above the threshold for the grant you applied for. For the SRD grant, the threshold is R624 per month. For permanent grants, the thresholds are higher. This status is not necessarily permanent — if the system made an error, you can appeal the decision.",
    why_it_happens: [
      "Your bank account received deposits totaling more than R624 in a month",
      "You received a payment from a family member or friend that pushed you over the limit",
      "SASSA detected income from UIF, NSFAS, or another source",
      "You have multiple bank accounts and the combined deposits exceed the threshold",
      "Your spouse's income was included in the assessment for a permanent grant"
    ],
    how_to_fix: [
      { title: "Review Your Bank Deposits", content: "Check your bank statements for the month in question. Identify any deposits that may have triggered the alert." },
      { title: "Lodge an Appeal", content: "Go to srd-appeals.dsd.gov.za and submit an appeal explaining why the income detected should not disqualify you." },
      { title: "Provide Supporting Evidence", content: "If a family member sent you money that was a gift (not income), provide an affidavit explaining this." },
      { title: "Isolate Your Bank Account", content: "Do not allow anyone else to use your bank account for their transactions. SASSA cannot distinguish between 'loans' and 'income.'" }
    ],
    how_long: "Appeals are processed within 60 to 90 days. If successful, you will receive back pay for the months that were incorrectly declined.",
    who_to_contact: [
      { label: "DSD Appeals Portal", value: "srd-appeals.dsd.gov.za" },
      { label: "SASSA Helpline", value: "0800 60 10 11" }
    ],
    sources: ["https://srd-appeals.dsd.gov.za", "https://www.sassa.gov.za"],
    related: ["/status/declined", "/guides/appeal-guide", "/grants/srd-r370-grant", "/eligibility-check"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "approved",
    status_label: "Approved",
    title: "SASSA Status: 'Approved' — What It Means & When You Will Be Paid",
    description: "'Approved' means your SASSA application was successful. Learn what happens next, when to expect payment, and how to check for your 'Pay Day' date.",
    what_it_means: "'Approved' is the status every applicant wants to see. It means SASSA has verified your information and you qualify for the grant. Your application has passed all the checks — identity verification, means test, bank verification, and cross-referencing with other government databases. However, 'Approved' does not mean the money is in your account yet. You still need to wait for a 'Pay Day' date to be assigned, which indicates when payment will be processed.",
    why_it_happens: [
      "You met all eligibility criteria for the grant",
      "Your identity was successfully verified with Home Affairs",
      "Your income was below the threshold",
      "Your banking details are valid and verified"
    ],
    how_to_fix: [
      { title: "Check for a 'Pay Day' Date", content: "Log into the SRD portal and look for a 'Pay Day' date next to your approved status." },
      { title: "Wait for Payment Processing", content: "Once a Pay Day date is assigned, it takes 1 to 2 business days for the money to reflect in your account." },
      { title: "Do Not Close Your Bank Account", content: "Keep your bank account active. Closing it after receiving 'Approved' will delay your payment." },
      { title: "Check Payment Method", content: "Confirm whether payment will be made to your bank account, Postbank, or retail collection point." }
    ],
    how_long: "After 'Approved', a Pay Day date is usually assigned within 1 to 7 days. Payment takes 1 to 2 business days after the Pay Day date.",
    who_to_contact: [
      { label: "SRD Portal", value: "srd.sassa.gov.za" },
      { label: "SASSA Helpline", value: "0800 60 10 11" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/status/approved", "/status/paid", "/payment-calendar", "/guides/change-banking-details"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "declined",
    status_label: "Declined",
    title: "SASSA Status: 'Declined' — What It Means, Why & How to Appeal",
    description: "'Declined' means your application was not approved. Learn the common reasons, what to do next, and how to submit a successful appeal.",
    what_it_means: "'Declined' means SASSA has evaluated your application and determined that you do not qualify for the grant for the month in question. This can happen for many reasons, and it does not necessarily mean you will never qualify. The decline applies to each month separately — even if you were declined this month, you may be approved in a future month if your circumstances change. You have the right to appeal a decline within 90 days.",
    why_it_happens: [
      "Your income exceeded the R624 threshold due to deposits in your bank account",
      "UIF or NSFAS records show you are registered with them",
      "Identity verification failed due to a name or ID mismatch",
      "Alternative income source was detected (gifts, family transfers, informal trade)",
      "You are receiving another social grant",
      "Your banking details are invalid or unverified"
    ],
    how_to_fix: [
      { title: "Check the Decline Reason", content: "Log into the SRD portal and look for the specific reason code for your decline." },
      { title: "Lodge an Appeal", content: "Go to srd-appeals.dsd.gov.za within 30 days (you have up to 90 days, but early appeals are processed faster)." },
      { title: "Provide Evidence", content: "If the decline was due to income detection, provide proof that the deposits were not regular income." },
      { title: "Fix the Root Cause", content: "Close unused bank accounts, stop others from using your account, or update your personal details if there was a name mismatch." }
    ],
    how_long: "Appeals take 60 to 90 days to process. If successful, you will receive back pay for all the months that were incorrectly declined.",
    who_to_contact: [
      { label: "DSD Appeals Portal", value: "srd-appeals.dsd.gov.za" },
      { label: "SASSA Helpline", value: "0800 60 10 11" },
      { label: "SASSA Office", value: "Visit our offices page" }
    ],
    sources: ["https://srd-appeals.dsd.gov.za", "https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/status/means-test-failed", "/guides/appeal-guide", "/grants/srd-r370-grant", "/decline-reason/income-source-detected", "/faq"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "appeal-pending",
    status_label: "Appeal Pending",
    title: "SASSA Status: 'Appeal Pending' — What It Means & How Long It Takes",
    description: "'Appeal Pending' means your appeal has been received and is being reviewed. Learn about the appeal process, timeline, and what to expect.",
    what_it_means: "'Appeal Pending' means your appeal against a declined grant decision has been received by the Independent Tribunal for Social Assistance Appeals (ITSAA) and is being reviewed. ITSAA is an independent body separate from SASSA, which ensures fairness in the appeal process. Your application and supporting documents are being evaluated by an independent tribunal member who will decide whether the original decline decision was correct.",
    why_it_happens: [
      "You submitted an appeal through the ITSAA portal (srd-appeals.dsd.gov.za)",
      "Your appeal has been logged and assigned to a case officer",
      "The tribunal is reviewing your application and the evidence you provided",
      "SASSA has been asked to provide their reasons for the decline"
    ],
    how_to_fix: [
      { title: "Wait for Processing", content: "The tribunal process takes time. Most appeals are resolved within 60 to 90 days." },
      { title: "Keep Your Contact Details Updated", content: "Ensure your phone number and address are correct so you receive the outcome notification." },
      { title: "Check Your Status Online", content: "You can check your appeal status on the ITSAA portal using your reference number." },
      { title: "Do Not Submit a Second Appeal", content: "Submitting a duplicate appeal will not speed up the process and may cause delays." }
    ],
    how_long: "The Independent Tribunal typically takes 60 to 90 days to process an appeal. Complex cases may take longer.",
    who_to_contact: [
      { label: "ITSAA Portal", value: "srd-appeals.dsd.gov.za" },
      { label: "DSD Contact", value: "012 312 7726" }
    ],
    sources: ["https://srd-appeals.dsd.gov.za", "https://www.dsd.gov.za"],
    related: ["/guides/appeal-guide", "/status/declined", "/status/approved", "/status/declined"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  },
  {
    slug: "paid",
    status_label: "Paid",
    title: "SASSA Status: 'Paid' — What It Means & What to Do If Money Is Not Received",
    description: "'Paid' means SASSA has released your payment. Learn what to do if the money has not reached your account and how to track your payment.",
    what_it_means: "'Paid' is the final and best status — it means SASSA has successfully processed your payment and the funds have been released. However, 'Paid' does not mean the money is already in your account. Depending on your bank, it can take 1 to 3 business days for the payment to reflect. This delay is normal and is caused by the banking system processing times, not SASSA.",
    why_it_happens: [
      "Your grant was approved and a Pay Day date was assigned",
      "SASSA processed the payment batch and sent it to the bank",
      "The payment was sent via your chosen payment method (bank transfer, Postbank, or retail)"
    ],
    how_to_fix: [
      { title: "Wait 1 to 3 Business Days", content: "Bank processing times vary. The money may not appear immediately even though the status says 'Paid'." },
      { title: "Check Your Bank Account", content: "Log into your banking app or check your balance at an ATM." },
      { title: "Check for an SMS", content: "If you collect at retail (Pick n Pay, Boxer), wait for the SMS collection code before going to the store." },
      { title: "Contact SASSA After 5 Days", content: "If the money has not reflected after 5 business days, call the SASSA helpline at 0800 60 10 11." }
    ],
    how_long: "Once 'Paid' is shown, money usually reflects within 1 to 3 business days. Retail collection SMS may take 1 to 2 days.",
    who_to_contact: [
      { label: "Your Bank", value: "Contact your bank's customer service" },
      { label: "SASSA Helpline", value: "0800 60 10 11" },
      { label: "Postbank", value: "0800 53 54 55" }
    ],
    sources: ["https://srd.sassa.gov.za", "https://www.sassa.gov.za"],
    related: ["/status/approved", "/payment-calendar", "/faq"],
    last_updated: todayStr(),
    author: "Lucky Cungwa"
  }
];

export function generateStaticParams() {
  return statusMeanings.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const status = statusMeanings.find((s) => s.slug === params.slug);
  if (!status) return { title: "Status Not Found" };
  const url = `https://www.sassahelphub.co.za/status/${params.slug}`;
  return {
    title: status.title,
    description: status.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: status.title,
      description: status.description,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: status.title,
      description: status.description,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default function StatusMeaningPage({ params }: { params: { slug: string } }) {
  const status = statusMeanings.find((s) => s.slug === params.slug);
  if (!status) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(status.title, status.description, `/status/${status.slug}`, status.author, status.last_updated)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Status Meanings", slug: "/status" },
        { name: status.status_label, slug: `/status/${status.slug}` },
      ])} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <a href="/" className="hover:text-primary-gold">Home</a>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">{status.status_label}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="warning" variant="flat" className="font-bold uppercase text-xs">
            Status Meaning
          </Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {status.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {status.description}
          </p>
          <EditorialMeta lastVerified={status.last_updated} author={status.author} />
        </header>

        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border-l-8 border-blue-500">
          <h2 className="text-2xl font-bold mb-4">What This Status Means</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{status.what_it_means}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Why It Happens</h2>
          <ul className="space-y-4">
            {status.why_it_happens.map((reason, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700 dark:text-gray-300">{reason}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">What To Do</h2>
          <div className="space-y-6">
            {status.how_to_fix.map((step, i) => (
              <div key={i} className="relative pl-12 border-l-2 border-gray-100 dark:border-gray-800 pb-2">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FaClock className="text-primary-gold" /> How Long It Takes
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{status.how_long}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaPhone className="text-primary-gold" /> Who To Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {status.who_to_contact.map((contact, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-sm">{contact.label}</p>
                <p className="text-primary-gold font-medium">{contact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {status.sources.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaLink className="text-primary-gold" /> Sources & References
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This status guide was researched and verified against the following official sources:
            </p>
            <ul className="space-y-4">
              {status.sources.map((url, i) => (
                <li key={i} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <span className="break-all">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  <Button as="a" href={url} target="_blank" rel="noopener noreferrer" size="sm" variant="flat" color="primary">
                    Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {status.related.length > 0 && (
          <>
            <Divider />
            <section>
              <h2 className="text-xl font-bold mb-4">Related Articles</h2>
              <div className="flex flex-wrap gap-3">
                {status.related.map((slug, i) => (
                  <a key={i} href={slug} className="text-sm font-bold text-primary-gold bg-primary-gold/5 px-4 py-2 rounded-full border border-primary-gold/20 hover:bg-primary-gold/10 transition-colors">
                    {slug.split("/").pop()?.replace(/-/g, " ") || slug}
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        <Divider />
        <EditorialFooter lastUpdated={status.last_updated} author={status.author} />
      </article>
    </div>
  );
}

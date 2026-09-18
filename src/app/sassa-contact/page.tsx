import React from "react";
import type { Metadata } from "next";
import { Card, CardBody, Chip, Divider, Button } from "@nextui-org/react";
import { FaPhoneAlt, FaMobileAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaShieldAlt, FaExclamationTriangle, FaCommentDots, FaCheckCircle, FaClock } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../components/JsonLd";
import { buildMetadata } from "../../lib/seo";
import { breadcrumbSchema, articleSchema, faqPageSchema } from "../../lib/schema";
import { getCurrentYearString } from "../../lib/config";
import NextStepCard from "../../components/affiliate/NextStepCard";

const currentYear = getCurrentYearString();
const lastUpdated = "2026-08-31";

export const metadata: Metadata = buildMetadata({
  title: `SASSA Contact Numbers & Helpline ${currentYear}: Official Phone, WhatsApp, USSD`,
  description: `The official SASSA contact numbers for ${currentYear}: 0800 60 10 11 helpline, WhatsApp 082 601 0111, USSD *120*69277#, and email. Free, independent guide with scam warnings.`,
  path: "/sassa-contact",
});

export default function SassaContactPage() {
  const faqs = [
    {
      q: "What is the SASSA contact number?",
      a: "The official SASSA national call centre is 0800 60 10 11. It is open weekdays from 08:00 to 16:00, and calls to this toll-free number are free from any South African network.",
    },
    {
      q: "Is the SASSA WhatsApp number free?",
      a: "Yes, you can save 082 601 0111 as a contact and message it on WhatsApp. WhatsApp uses data, but SASSA does not charge a fee for the service. It is a quick way to check your SRD status and get an automated response.",
    },
    {
      q: "What is the SASSA USSD code for checking status?",
      a: "Dial *120*69277# from any phone to check your SRD R370 status using USSD. This works without data and is free from all major South African networks.",
    },
    {
      q: "Can I contact SASSA by email?",
      a: "Yes. The general national SASSA email address is SASSAHeadOffice@sassa.gov.za. For faster help with urgent queries, calling 0800 60 10 11 or visiting a local SASSA office is usually more reliable.",
    },
    {
      q: "How do I report a SASSA scam or fraud?",
      a: "Report SASSA-related fraud to SASSA on 0800 60 10 11. If you suspect an online phishing scam asking for your OTP, banking PIN, or ID documents, stop communicating and report it — see our scam alert page for what to do.",
    },
  ];

  const helplineCards = [
    { label: "National Call Centre", value: "0800 60 10 11", icon: <FaPhoneAlt />, color: "blue", note: "Toll-free, Mon–Fri 08:00–16:00" },
    { label: "WhatsApp", value: "082 601 0111", icon: <FaWhatsapp />, color: "green", note: "Check status & automated help" },
    { label: "USSD (no data)", value: "*120*69277#", icon: <FaMobileAlt />, color: "purple", note: "Free status check on any phone" },
    { label: "SRD Helpline", value: "0800 60 10 11", icon: <FaCommentDots />, color: "orange", note: "SRD-specific enquiries" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <JsonLd data={articleSchema("SASSA Contact Numbers & Helpline", "Official SASSA contact channels for 2026: call centre, WhatsApp, USSD, email and office locator with scam warnings.", "/sassa-contact", "Lucky Cungwa", lastUpdated)} />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "SASSA Contact", slug: "/sassa-contact" },
      ])} />

      <header className="text-center mb-14 space-y-6">
        <Chip color="primary" variant="flat" className="font-bold uppercase">Official Contacts</Chip>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          SASSA Contact Numbers <span className="text-primary-gold">{currentYear}</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          The direct, official ways to reach SASSA — phone, WhatsApp, USSD and email — in one place, with warnings about scams that pretend to be SASSA.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {helplineCards.map((c, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 ${
              c.color === "blue" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" :
              c.color === "green" ? "bg-green-100 text-green-600 dark:bg-green-900/30" :
              c.color === "purple" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30" :
              "bg-orange-100 text-orange-600 dark:bg-orange-900/30"
            }`}>{c.icon}</div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{c.label}</p>
            <p className="text-2xl font-black dark:text-white my-1">{c.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        <div className="lg:col-span-7 space-y-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaPhoneAlt className="text-primary-gold" /> National Call Centre</h2>
            <p className="text-lg font-bold text-primary-gold mb-3">0800 60 10 11</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This is the main numbers to call for general SASSA enquiries — applications, status, payments, and problems with your grant. The line is toll-free from all South African networks and open weekdays 08:00 to 16:00. It gets very busy early in the week and around payment dates, so call later in the day or later in the week for a shorter wait.
            </p>
            <p className="text-sm text-gray-500 mt-3">Have your ID number and SASSA reference number ready before you call — it helps the agent find your file faster.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaWhatsapp className="text-primary-gold" /> WhatsApp</h2>
            <p className="text-lg font-bold text-primary-gold mb-3">082 601 0111</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Save <strong>082 601 0111</strong> as a contact and send a message on WhatsApp. It&rsquo;s an automated bot you can use to check your SRD status, get payment information and receive quick answers. It uses a small amount of data but no airtime. See our full step-by-step guide to the <NextLink href="/guides/sassa-whatsapp" className="text-primary-gold underline font-bold">SASSA WhatsApp service</NextLink>.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaMobileAlt className="text-primary-gold" /> USSD (No Data Needed)</h2>
            <p className="text-lg font-bold text-primary-gold mb-3">*120*69277#</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Dial <strong>*120*69277#</strong> from your phone&rsquo;s keypad to check your SRD status using USSD. This works on any phone, needs no data and is free. It&rsquo;s the go-to channel if you don&rsquo;t have a smartphone or internet. Learn all the codes in our <NextLink href="/guides/ussd-codes" className="text-primary-gold underline font-bold">USSD codes guide</NextLink>.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaEnvelope className="text-primary-gold" /> Email</h2>
            <p className="font-bold text-primary-gold mb-3">SASSAHeadOffice@sassa.gov.za</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Email is best for non-urgent questions or sending supporting documents. Response times vary, so for anything time-sensitive — a missing payment or a declined appeal — use the phone line or visit an office.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <Card className="p-6 bg-red-50 dark:bg-red-900/10 border-none shadow-sm rounded-3xl">
            <CardBody className="space-y-3">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 flex items-center gap-2"><FaExclamationTriangle /> Beware of SASSA Scams</h3>
              <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                SASSA will <strong>never</strong> ask for your OTP, banking PIN, or security code over the phone, WhatsApp or SMS. If someone claiming to be SASSA asks for these, it is a scam. Hang up, stop messaging, and report it to SASSA on <strong>0800 60 10 11</strong>.
              </p>
              <Button as={NextLink} href="/scam-alert" variant="flat" color="danger" size="sm" className="font-bold">Read the Scam Alert</Button>
            </CardBody>
          </Card>

          <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-none shadow-sm rounded-3xl">
            <CardBody className="space-y-3">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2"><FaShieldAlt /> Remember</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Official status checks only need your ID number and phone number.</li>
                <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> Real SASSA channels never direct you to pay a "release fee".</li>
                <li className="flex gap-2"><FaCheckCircle className="mt-0.5 flex-shrink-0" /> The only official website is srd.sassa.gov.za for the SRD.</li>
              </ul>
            </CardBody>
          </Card>

          <NextStepCard
            pagePath="/sassa-contact"
            items={[
              { title: "Check my SRD status", url: "/status-check", description: "Official channels step-by-step" },
              { title: "Find a SASSA office near me", url: "/sassa-offices", description: "By province and city" },
              { title: "See full payment dates", url: "/payment-calendar", description: "Monthly grant schedule" },
              { title: "Report fraud or a scam", url: "/scam-alert", description: "What to do and who to tell" },
            ]}
          />
        </aside>
      </div>

      <section className="max-w-4xl mx-auto space-y-10 mt-16">
        <div className="p-8 rounded-3xl bg-primary-gold/5 border border-primary-gold/20">
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaMapMarkerAlt className="text-primary-gold" /> Need to Visit an Office?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Some problems cannot be fixed over the phone — for example, identity verification issues or correcting personal details may require a visit to a SASSA local office. Bring your original ID document. Find your nearest office, address and phone number in our <NextLink href="/sassa-offices" className="text-primary-gold underline font-bold">SASSA offices directory</NextLink>.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FaClock className="text-primary-gold" /> When Is the Best Time to Call?</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The call centre is busiest on Monday mornings and during payment weeks. For the shortest wait, call on a Tuesday to Thursday afternoon, or after the 20th of the month. If you can&rsquo;t get through, try WhatsApp or USSD for routine checks instead of waiting on hold.
          </p>
        </div>

        <Divider />

        <div>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <p className="font-bold mb-2">{f.q}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
          Independent, unofficial guide. "SASSA" and "SRD" are used for informational purposes; we are not affiliated with the South African Social Security Agency. Last reviewed {lastUpdated}.
        </p>
      </section>
    </div>
  );
}

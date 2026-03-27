import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  Shield,
  Users,
  MapPin,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Smartphone,
  FileText,
  UserCheck,
} from "lucide-react";
import { useAppContext } from "../hooks/useAppContext";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import AdUnit from "../components/Common/AdUnit";
import HowToApply from "../components/Home/HowToApply";
import PaymentCountdown from "../components/Home/PaymentCountdown";
import GrantTypes from "../components/Home/grant-types";
import SrdStatusMessages from "../components/Home/SrdStatusMessages";

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: "news" | "alert" | "update";
  urgent: boolean;
}

interface QuickStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

interface PaymentDate {
  grant: string;
  date: string;
  day: string;
}

interface HomeContent {
  grantTypes: {
    title: string;
    intro: string;
    grants: Array<{
      name: string;
      description: string;
      link: string;
    }>;
    outro: string;
  };
  howToApply: {
    title: string;
    intro: string;
    steps: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    outro: string;
  };
  statusCheckMethods: {
    title: string;
    intro: string;
    methods: Array<{
      name:string;
      description: string;
      icon: string;
    }>;
  };
  latestNews: {
    title: string;
    articles: Array<{
      id: string;
      title: string;
      summary: string;
      date: string;
    }>;
  };
}

const Home: React.FC = () => {
  const { translations, searchQuery, setSearchQuery } = useAppContext();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [paymentDates, setPaymentDates] = useState<PaymentDate[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [updatesResponse, paymentDatesResponse, homeContentResponse] =
          await Promise.all([
            fetch("/data/updates.json"),
            fetch("/data/paymentDates.json"),
            fetch("/data/homeContent.json"),
          ]);

        if (!updatesResponse.ok) throw new Error("Failed to fetch updates");
        if (!paymentDatesResponse.ok)
          throw new Error("Failed to fetch payment dates");
        if (!homeContentResponse.ok)
          throw new Error("Failed to fetch home content");

        const updatesJson = await updatesResponse.json();
        const paymentDatesJson = await paymentDatesResponse.json();
        const homeContentJson = await homeContentResponse.json();

        setUpdates(updatesJson.slice(0, 3));
        setPaymentDates(paymentDatesJson);
        setHomeContent(homeContentJson);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickStats: QuickStat[] = [
    {
      label: translations.beneficiariesHelped || "Beneficiaries Helped",
      value: "2000+",
      icon: <Users className="w-6 h-6" />,
      trend: "+15%",
    },
    {
      label: translations.scamsPrevented || "Scams Prevented",
      value: "100+",
      icon: <Shield className="w-6 h-6" />,
      trend: "+22%",
    },
    {
      label: translations.officesListed || "SASSA Offices",
      value: "200+",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      label: translations.lastUpdated || "Last Updated",
      value: new Date().toLocaleString("default", { month: "long" }),
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const quickActions = [
    {
      title: translations.checkPaymentDates || "Check Payment Dates",
      description:
        translations.checkPaymentDatesDesc ||
        "View upcoming SASSA payment schedules",
      icon: <Calendar className="w-8 h-8" />,
      link: "/payment-calendar",
      color: "bg-green-600",
    },
    {
      title: translations.scamAlert || "Scam Alert",
      description:
        translations.scamAlertDesc ||
        "Protect yourself from SASSA-related scams",
      icon: <Shield className="w-8 h-8" />,
      link: "/scam-alert",
      color: "bg-red-500",
    },
    {
      title: translations.findOffice || "Find SASSA Office",
      description:
        translations.findOfficeDesc || "Locate your nearest SASSA office",
      icon: <MapPin className="w-8 h-8" />,
      link: "/resources",
      color: "bg-green-600",
    },
    {
      title: translations.faqAndGuides || "FAQ & Guides",
      description:
        translations.faqAndGuidesDesc || "Get answers to common questions",
      icon: <HelpCircle className="w-8 h-8" />,
      link: "/faq",
      color: "bg-green-600",
    },
    {
      title: "Eligibility Checker",
      description: "Check if you qualify for a SASSA grant",
      icon: <CheckCircle className="w-8 h-8" />,
      link: "/eligibility-check",
      color: "bg-blue-600",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/faq?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <Helmet>
        <title>
          SASSA Help Hub - Your Unofficial SASSA Resource | Payment Dates, Scam
          Alerts & More
        </title>
        <meta
          name="description"
          content="Get accurate SASSA information, payment dates 2026, scam protection, and community support. Unofficial resource for South African Social Security Agency beneficiaries."
        />
        <meta
          name="keywords"
          content="SASSA payment dates 2026, avoid SASSA scams, SASSA grant application, South African social security, SASSA help"
        />
        <link rel="canonical" href="https://sassahelphub.co.za" />

        {/* Open Graph tags */}
        <meta property="og:title" content="SASSA Help Hub - Your Unofficial SASSA Resource" />
        <meta property="og:description" content="Get accurate SASSA information, payment dates 2026, scam protection, and community support." />
        <meta property="og:url" content="https://sassahelphub.co.za" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sassahelphub.co.za/logo.png" />
        <meta property="og:image:alt" content="SASSA Help Hub Logo" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SASSA Help Hub - Your Unofficial SASSA Resource" />
        <meta name="twitter:description" content="Get accurate SASSA information, payment dates 2026, scam protection, and community support." />
        <meta name="twitter:image" content="https://sassahelphub.co.za/logo.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "SASSA Help Hub",
                description:
                  "Unofficial SASSA resource for South African beneficiaries",
                url: "https://sassahelphub.co.za",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://sassahelphub.co.za/faq?search={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                name: "SASSA Help Hub",
                url: "https://sassahelphub.co.za",
                logo: "https://sassahelphub.co.za/logo.png",
                address: {
                  "@type": "PostalAddress",
                  "addressLocality": "Johannesburg",
                  "addressRegion": "Gauteng",
                  "addressCountry": "ZA"
                }
              },
              {
                "@type": "HowTo",
                "name": "How to Check SASSA Status in Johannesburg",
                "description": "Step-by-step guide to checking your SASSA SRD status when the official site is down.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "text": "Visit SASSA Help Hub for the latest reliable alternative links.",
                    "url": "https://sassahelphub.co.za"
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Have your 13-digit South African ID and cellphone number ready.",
                    "url": "https://sassahelphub.co.za"
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Follow our redirection to the secure government portal.",
                    "url": "https://sassahelphub.co.za"
                  }
                ]
              }
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-black via-primary-dark to-primary-black text-white py-20 px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {translations.heroTitle || "Welcome to SASSA Help Hub"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto animate-slide-up">
              {translations.heroSubtitle ||
                "Your friendly guide to SASSA services, payment dates, questions, and scam protection"}
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mb-12 animate-slide-up"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    translations.searchPlaceholder ||
                    "Search FAQs, guides, or ask a question..."
                  }
                  className="w-full px-6 py-4 pl-14 text-gray-900 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-gold focus:ring-opacity-50"
                  aria-label="Search FAQs and guides"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-gold text-primary-black px-6 py-2 rounded-full font-medium hover:bg-primary-gold transition-colors duration-200"
                  aria-label="Search"
                >
                  {translations.search || "Search"}
                </button>
              </div>
            </form>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Updated daily</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Linked in 50+ Facebook groups</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="w-4 h-4 text-primary-gold" />
                <span>2000+ helped</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <div className="flex justify-center mb-2 text-primary-gold">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-300">{stat.label}</div>
                  {stat.trend && (
                    <div className="text-xs text-green-400 flex items-center justify-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-4">
                <a
                  href="https://sassaaistatusupdate.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-5 px-10 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 animate-bounce hover:animate-none"
                >
                  Check your real-time SRD status now →
                </a>
                <Link
                  to="/eligibility-check"
                  className="inline-flex items-center justify-center gap-2 text-primary-gold font-bold hover:underline"
                >
                  <CheckCircle className="w-5 h-5" />
                  Not sure if you qualify? Use our calculator
                </Link>
              </div>

              <div className="max-w-md mx-auto lg:mx-0 w-full">
                <PaymentCountdown />
              </div>
            </div>

            <div className="hidden">
              <a
                href="https://sassaaistatusupdate.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-5 px-10 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 animate-bounce hover:animate-none"
              >
                Check your real-time SRD status now →
              </a>
            </div>
          </div>
        </section>

        <AdUnit slot="1234567890" />

        {/* Eligibility CTA Banner */}
        <section className="py-12 px-4 bg-primary-gold">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-primary-black text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Not sure if you qualify?</h2>
              <p className="text-lg font-medium opacity-80">Use our 1-minute eligibility calculator to find the right grant for you.</p>
            </div>
            <Link
              to="/eligibility-check"
              className="bg-primary-black text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-800 transition-all shadow-xl flex items-center gap-2"
            >
              <CheckCircle className="w-6 h-6" />
              Check Eligibility Now
            </Link>
          </div>
        </section>

        {/* SASSA Online Services & Tools */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Essential SASSA Online Tools 2026
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Quickly access the most important SASSA services. Use our guides to ensure your application or update is successful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Change Banking Details",
                  description: "Update your bank account for SRD R370 payments to avoid delays.",
                  icon: <CreditCard className="w-8 h-8" />,
                  link: "/guides/change-banking-details",
                  color: "border-blue-500"
                },
                {
                  title: "Change Phone Number",
                  description: "Lost your registered number? Follow our guide to update it safely.",
                  icon: <Smartphone className="w-8 h-8" />,
                  link: "/guides/srd-grant",
                  color: "border-green-500"
                },
                {
                  title: "Lodge an Appeal",
                  description: "If your grant was declined, you must submit an appeal within 90 days.",
                  icon: <FileText className="w-8 h-8" />,
                  link: "/guides/appeal-guide",
                  color: "border-red-500"
                },
                {
                  title: "Biometric Verification",
                  description: "New for 2026: Complete your facial recognition for enhanced security.",
                  icon: <UserCheck className="w-8 h-8" />,
                  link: "/guides/biometric-verification-guide",
                  color: "border-yellow-500"
                }
              ].map((tool, index) => (
                <Link
                  key={index}
                  to={tool.link}
                  className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-t-4 ${tool.color} shadow-sm hover:shadow-md transition-all group`}
                >
                  <div className="text-gray-700 dark:text-gray-200 mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{tool.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{tool.description}</p>
                  <span className="text-primary-gold font-medium flex items-center">
                    Open Guide <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SASSA SRD Status Meanings */}
        <SrdStatusMessages />

        {/* Why is my SASSA grant not paid? Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why is My SASSA Grant Not Paid in 2026?
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "My status is 'Approved' but there is no payment date.",
                  a: "Approval is the first step. A payment date is only generated once the funds are allocated to your specific batch. This can take 7-10 working days after approval."
                },
                {
                  q: "I have a payment date but the money isn't in my account.",
                  a: "Banks can take 2-3 business days to process the transaction. If it's been longer than 5 days, contact your bank first to see if there's a pending deposit."
                },
                {
                  q: "My status says 'Bank Details Pending'.",
                  a: "SASSA cannot pay you if they don't have verified banking details. Log in to the SRD portal to submit your personal bank account details immediately."
                },
                {
                  q: "I usually get paid, but this month it's 'Declined'.",
                  a: "SASSA performs monthly checks. You may have exceeded the income threshold (R624) this month due to a temporary deposit or interest in your account."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary-black dark:text-primary-gold mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/faq" className="text-primary-black dark:text-white font-bold hover:underline">
                View more common questions and solutions →
              </Link>
            </div>
          </div>
        </section>

        {/* SASSA Status Check Section */}
        <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              SRD SASSA Status Check R370
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Use our fast sister tool for instant real-time SRD status checks and payment date verification.
            </p>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl border-2 border-primary-gold relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary-gold text-primary-black px-4 py-1 rounded-bl-lg font-bold text-xs uppercase tracking-wider">
                Recommended
              </div>
              <div className="mb-8">
                <img
                  src="/status-form.png"
                  alt="SASSA SRD status check form preview"
                  className="mx-auto rounded-lg shadow-inner opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="space-y-4">
                <a
                  href="https://sassaaistatusupdate.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-primary-gold text-primary-black px-8 py-4 rounded-xl font-bold text-xl hover:bg-primary-gold transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                >
                  <Search className="w-6 h-6" />
                  Check Your Status Instantly →
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Safe, secure, and accurate real-time data from official sources.
                </p>
              </div>
            </div>
            <div className="flex overflow-hidden w-full bottom-0">
              <div className="flex-1 h-1.5 bg-yellow-600 rounded-bl-lg"></div>
              <div className="flex-1 h-1.5 bg-red-600"></div>
              <div className="flex-1 h-1.5 bg-green-600"></div>
              <div className="flex-1 h-1.5 bg-black/95"></div>
              <div className="flex-1 h-1.5 bg-blue-600 rounded-br-lg"></div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 px-4 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {translations.quickActions || "Quick Actions"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {translations.quickActionsDesc ||
                  "Get instant access to the most important SASSA information and tools."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${action.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-black">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{action.description}</p>
                  <div className="flex items-center text-primary-gold font-medium group-hover:text-primary-gold">
                    {translations.learnMore || "Learn More"}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Payment Dates Section */}
        <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Upcoming SASSA Grant Dates for{" "}
                {new Date(
                  new Date().setMonth(new Date().getMonth() + 1)
                ).toLocaleString("default", { month: "long", year: "numeric" })}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Here are the confirmed payment dates for the major SASSA grants.
                SRD R370 grant dates are variable and will be paid towards the
                end of the month.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentDates.map((payment, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 hover:shadow-md rounded-lg shadow-sm p-6 text-center border-2 border-gray-400 dark:border-gray-600"
                >
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {payment.grant}
                  </p>
                  <p className="text-2xl font-bold text-primary-black dark:text-white my-2">
                    {new Date(payment.date).getDate()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {payment.day},{" "}
                    {new Date(payment.date).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(payment.date).getFullYear()}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/payment-calendar"
                className="bg-primary-gold text-primary-black rounded-lg hover:text-black font-medium border-2 border-primary-gold py-2 px-3"
              >
                View Full Calendar →
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {translations.latestUpdates || "Latest Updates"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {translations.latestUpdatesDesc ||
                    "Stay informed with the latest SASSA news and important announcements."}
                </p>
              </div>
              <Link
                to="/updates"
                className="hidden md:inline-flex items-center text-primary-gold hover:text-yellow-700 font-medium"
              >
                {translations.viewAll || "View All Updates"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-error mb-4">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                  <p>{error}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {updates.map((update) => (
                  <Link to={`/updates/${update.id}`} key={update.id}>
                    <article
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 hover:cursor-pointer h-full"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            update.type === "alert"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : update.type === "news"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          }`}
                        >
                          {update.type === "alert" && (
                            <AlertTriangle className="w-3 h-3 mr-1" />
                          )}
                          {update.type.toUpperCase()}
                        </span>
                        {update.urgent && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-primary-black">
                            {translations.urgent || "URGENT"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {update.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {update.summary}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
                        <time dateTime={update.date}>
                          {new Date(update.date).toLocaleDateString()}
                        </time>
                        <span className="text-primary-gold font-medium">
                          {translations.readMore || "Read More"}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-8 md:hidden">
              <Link
                to="/updates"
                className="inline-flex items-center text-primary-gold hover:text-primary-gold font-medium"
              >
                {translations.viewAll || "View All Updates"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Grant Types Info Section */}
        {homeContent && <GrantTypes grantTypes={homeContent.grantTypes} />}

        {/* Browse All Updates Section for SEO */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore Latest SASSA News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {updates.map((update) => (
                <Link
                  key={update.id}
                  to={`/updates/${update.id}`}
                  className="text-sm text-primary-gold hover:underline line-clamp-1"
                >
                  • {update.title}
                </Link>
              ))}
              <Link to="/updates" className="text-sm font-bold text-primary-gold hover:underline">
                View All News & Updates →
              </Link>
            </div>
          </div>
        </section>

        {/* Rejection messages */}

        <AdUnit slot="0987654321" />
        
        {/* How to Apply Section */}
        {homeContent && <HowToApply content={homeContent.howToApply} />}
       

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary-dark dark:bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {translations.ctaTitle || "Need Help with SASSA Services?"}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {translations.ctaDesc ||
                "Join thousands of South Africans who trust SASSA Help Hub for accurate, up-to-date information."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link
                to="/community"
                className="bg-primary-gold text-primary-black px-8 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                {translations.joinCommunity || 'Join Our Community'}
              </Link> */}
              <a
                href="tel:0800601011"
                className="border border-gray-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition-colors duration-200"
              >
                {translations.callSassa || "Call SASSA: 0800 60 10 11"}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

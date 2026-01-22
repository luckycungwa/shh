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
  AlertCircle,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { useAppContext } from "../hooks/useAppContext";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import AdUnit from "../components/Common/AdUnit";
import HowToApply from "../components/Home/HowToApply";
import GrantTypes from "../components/Home/grant-types";

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
            fetch(
              "https://api.jsonbin.io/v3/b/68a4a96fd0ea881f405d88f4"
            ),
            fetch("https://api.jsonbin.io/v3/b/68a4a9cbae596e708fce5820"),
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

        setUpdates(updatesJson.record.slice(0, 3));
        setPaymentDates(paymentDatesJson.record);
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
          SASSA AI Status Update - Your Unofficial SASSA Resource | Johannesburg & Gauteng Status Updates
        </title>
        <meta
          name="description"
          content="Get accurate SASSA information, payment dates 2026, and status updates for Johannesburg and Gauteng. Unofficial resource for South African Social Security Agency beneficiaries."
        />
        <meta
          name="keywords"
          content="SASSA status check Johannesburg, SASSA updates Gauteng, SASSA payment dates 2026, avoid SASSA scams, SASSA grant application, South African social security, SASSA Soweto"
        />
        <link rel="canonical" href="https://sassaaistatusupdate.co.za" />

        {/* Open Graph tags */}
        <meta property="og:title" content="SASSA AI Status Update - Your Unofficial SASSA Resource" />
        <meta property="og:description" content="Get accurate SASSA information, payment dates 2026, scam protection, and community support." />
        <meta property="og:url" content="https://sassaaistatusupdate.co.za" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sassaaistatusupdate.co.za/logo.png" />
        <meta property="og:image:alt" content="SASSA AI Status Update Logo" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SASSA AI Status Update - Your Unofficial SASSA Resource" />
        <meta name="twitter:description" content="Get accurate SASSA information, payment dates 2026, scam protection, and community support." />
        <meta name="twitter:image" content="https://sassaaistatusupdate.co.za/logo.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "SASSA AI Status Update",
                description:
                  "Unofficial SASSA resource for South African beneficiaries",
                url: "https://sassaaistatusupdate.co.za",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://sassaaistatusupdate.co.za/faq?search={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                name: "SASSA AI Status Update",
                url: "https://sassaaistatusupdate.co.za",
                logo: "https://sassaaistatusupdate.co.za/logo.png",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {/* Downtime Alert Banner */}
        <div className="bg-red-600 text-white py-3 px-4 text-center font-bold flex items-center justify-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>⚠️ Official SASSA Website is currently experiencing downtime. Please use our alternative status check methods below (WhatsApp/SMS) for immediate updates.</span>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-black via-primary-dark to-primary-black text-white py-20 px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {translations.heroTitle || "Welcome to SASSA AI Status Update"}
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
          </div>
        </section>

        {/* Alternative Status Check Guide (AEO) */}
        <section className="py-12 px-4 bg-primary-gold bg-opacity-10 border-b border-primary-gold">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Smartphone className="w-6 h-6 mr-2 text-primary-gold" />
              Quick Status Check (Alternative Methods)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <h3 className="font-bold mb-2">1. WhatsApp</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Message "Status" to <strong>082 046 8553</strong>. Follow the prompts with your ID number.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h3 className="font-bold mb-2">2. SMS</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">SMS your ID number to <strong>34548</strong>. (Cost: R1.00 per SMS).</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <h3 className="font-bold mb-2">3. USSD</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dial <strong>*120*3227#</strong> on your phone and follow the on-screen instructions.</p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit slot="1234567890" />

        {/* SASSA Status Check Section */}
        <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              SRD SASSA Status Check for R370
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Enter your South African ID number and the cell phone number you
              used during your application to see your payment dates and status
              for{" "}
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
              .
            </p>
            <form
              action="https://srd.sassa.gov.za/sc19/status"
              method="get"
              target="_blank"
              className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md space-y-6"
            >
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="id_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1">
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idnumber"
                    id="id_number"
                    pattern="\d{13}"
                    title="Please enter a valid 13-digit South African ID number"
                    required
                    placeholder="Your 13-digit SA ID Number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  />
                </div>
                <div>
                  <label htmlFor="cell_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1">
                    Cellphone Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    id="cell_phone"
                    pattern="\d{10}"
                    title="Please enter a valid 10-digit cellphone number"
                    required
                    placeholder="Your 10-digit cellphone number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  />
                </div>
              </div> */}
              <div>
                <img
                  src="/status-form.png"
                  alt="A form to check SASSA SRD status, with fields for South African ID number and cellphone number."
                  className="mt-4 mx-auto"
                />
                <span className="flex items-start p-0 m-0 text-xs text-left text-gray-400 dark:text-gray-500">
                  sassa status check form image
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-primary-black px-8 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Check Status (Official SASSA Site)</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This will securely redirect you to the official SASSA website to
                  check your status. We do not store your personal information.
                </p>
                <p className="text-xs text-red-500 font-medium">
                  Note: This link leads to a government website that may be slow or unavailable during peak times.
                </p>
              </div>
            </form>
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
                "Join thousands of South Africans who trust SASSA AI Status Update for accurate, up-to-date information."}
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

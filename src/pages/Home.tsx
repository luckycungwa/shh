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
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import LoadingSpinner from "../components/Common/LoadingSpinner";
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
      name: string;
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

const sassaData = {
  // how to apply data
  howToApply: {
    title:
      "Step-by-Step Guide: How to Apply for SASSA Grants",
    intro:
      "Learning how to apply for SASSA grants is easier with this step-by-step guide. Whether you need the SASSA SRD R370 grant, Child Support Grant, or Disability Grant, we simplify the process for financial aid in South Africa.",
    steps: [
      {
        id: "step1",
        title: "Gather Required SASSA Documents 2025",
        description:
          "Begin by gathering essential SASSA documents 2025 to avoid delays in your application. You'll need a 13-digit bar-coded South African ID, proof of income, proof of residence, and grant-specific items like a child's birth certificate for the Child Support Grant.",
      },
      {
        id: "step2",
        title: "Select Your SASSA Application Method",
        description:
          "Choose between online or in-person SASSA grant applications 2025. Apply for the SRD R370 grant online at srd.sassa.gov.za with your ID and phone number. For other grants like Older Persons or Disability, visit a SASSA office near you.",
      },
      {
        id: "step3",
        title: "Complete Your SASSA Application Form",
        description:
          "Accurately fill out the SASSA application form 2025 online or with help at a SASSA office. Verify details like ID number, income, and contact info to avoid rejections. SASSA staff assist in-person applicants.",
      },
      {
        id: "step4",
        title: "Submit and Secure Your SASSA Receipt",
        description:
          "After submission, get a dated receipt with the SASSA official's name (in-person) or reference number (online) as proof. Keep it for tracking or appeals.",
      },
      {
        id: "step5",
        title: "Wait for Your SASSA Grant Outcome",
        description:
          "SASSA processes applications within 90 days. Track via SASSA status tracker or call 0800 60 10 11. Approved payments begin from the application date. If declined, appeal within 90 days.",
      },
    ],
    outro:
      "Mastering how to apply for SASSA grants 2025 is simple with preparation. Use our SASSA eligibility guide for documents and appeals. Need help? Contact SASSA at 0800 60 10 11 or find a SASSA office near you.",
  },
  // Grant Types Data
  grantTypes: {
    title:
      "Discover All SASSA Grants 2025: Eligibility, Application, and Benefits Guide",
    intro:
      "Navigating SASSA grants 2025 can be daunting, but finding the right SASSA grant is your key to essential financial support in South Africa. Whether you're a struggling parent, a senior citizen, or unemployed, SASSA grants cover critical needs like food, education, and healthcare.",
    grants: [
      {
        name: "SRD R370 Grant (Social Relief of Distress)",
        description:
          "The SRD R370 Grant 2025, now increased to R370 monthly, is a vital SASSA relief fund for South African citizens, refugees, asylum seekers, and special permit holders aged 18–59 with no other income.",
        link: "/srd-grant-guide",
      },
      {
        name: "Older Persons Grant (Old Age Pension)",
        description:
          "The SASSA Older Persons Grant 2025 supports South Africans, permanent residents, or refugees aged 60+ unable to work. Offering R2,320/month (under 75) or R2,340/month (75+), it helps seniors with essentials like healthcare and food.",
        link: "/old-age-grant-guide",
      },
      {
        name: "Disability Grant",
        description:
          "The SASSA Disability Grant 2025 provides R2,320/month for citizens aged 18–59 with a physical or mental disability hindering work for over six months.",
        link: "/disability-grant-guide",
      },
      {
        name: "Child Support Grant",
        description:
          "The SASSA Child Support Grant 2025 offers R570/month to primary caregivers of children under 18 in low-income households.",
        link: "/child-support-grant-guide",
      },
      {
        name: "Foster Child Grant",
        description:
          "The SASSA Foster Child Grant 2025 pays R1,180/month to foster parents caring for court-placed children under 18, covering food, clothing, and education.",
        link: "/foster-child-grant-guide",
      },
      {
        name: "Care Dependency Grant",
        description:
          "The SASSA Care Dependency Grant 2025 provides R2,320/month for caregivers of children under 18 with severe, permanent disabilities needing full-time care.",
        link: "/care-dependency-grant-guide",
      },
      {
        name: "War Veterans Grant",
        description:
          "The SASSA War Veterans Grant 2025 offers R2,340/month for Second World War or Korean War veterans over 60 or disabled, meeting residency and means test criteria.",
        link: "/war-veterans-grant-guide",
      },
      {
        name: "Grant-In-Aid",
        description:
          "The SASSA Grant-In-Aid 2025 adds R570/month for Older Persons, Disability, or War Veterans Grant recipients needing full-time care, aiding caregiver costs.",
        link: "/grant-in-aid-guide",
      },
    ],
    outro:
      "Selecting the best SASSA grant 2025 can change your life. Dive into our SASSA application guides for detailed eligibility, documents, and steps.",
  },
};

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
              "https://api.jsonbin.io/v3/b/68a4ad18d0ea881f405d8b0c/latest"
            ),
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

        setUpdates(updatesJson.record.slice(0, 3));
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
          content="Get accurate SASSA information, payment dates 2025, scam protection, and community support. Unofficial resource for South African Social Security Agency beneficiaries."
        />
        <meta
          name="keywords"
          content="SASSA payment dates 2025, avoid SASSA scams, SASSA grant application, South African social security, SASSA help"
        />
        <link rel="canonical" href="https://sassahelphub.co.za" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
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
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                  className="w-full px-6 py-4 pl-14 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-gold focus:ring-opacity-50"
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

        {/* SASSA Status Check Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SRD SASSA Status Check for R370
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
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
              className="bg-white p-8 rounded-lg shadow-md space-y-6"
            >
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="id_number" className="block text-sm font-medium text-gray-700 text-left mb-1">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  />
                </div>
                <div>
                  <label htmlFor="cell_phone" className="block text-sm font-medium text-gray-700 text-left mb-1">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  />
                </div>
              </div> */}
              <div>
                <img
                  src="/status-form.png"
                  alt="sassa status check form"
                  className="mt-4 mx-auto"
                />
                <span className="flex items-start p-0 m-0 text-xs text-left text-gray-400">
                  sassa status check form image
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-primary-black px-8 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                Check Status Now
              </button>
              <p className="text-xs text-gray-500">
                This will securely redirect you to the official SASSA website to
                check your status. We do not store your personal information.
              </p>
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
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {translations.quickActions || "Quick Actions"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {translations.quickActionsDesc ||
                  "Get instant access to the most important SASSA information and tools."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 ${action.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-black">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
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
        <section className="py-16 px-4 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming SASSA Grant Dates for{" "}
                {new Date(
                  new Date().setMonth(new Date().getMonth() + 1)
                ).toLocaleString("default", { month: "long", year: "numeric" })}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here are the confirmed payment dates for the major SASSA grants.
                SRD R370 grant dates are variable and will be paid towards the
                end of the month.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentDates.map((payment, index) => (
                <div
                  key={index}
                  className="bg-white hover:shadow-md rounded-lg shadow-sm p-6 text-center border-2 border-gray-400"
                >
                  <p className="text-sm font-semibold text-gray-600">
                    {payment.grant}
                  </p>
                  <p className="text-2xl font-bold text-primary-black my-2">
                    {new Date(payment.date).getDate()}
                  </p>
                  <p className="text-sm text-gray-500">
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
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {translations.latestUpdates || "Latest Updates"}
                </h2>
                <p className="text-gray-600">
                  {translations.latestUpdatesDesc ||
                    "Stay informed with the latest SASSA news and important announcements."}
                </p>
              </div>
              <Link
                to="/updates"
                className="hidden md:inline-flex items-center text-primary-gold hover:text-primary-gold font-medium"
              >
                {translations.viewAll || "View All"}
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
                  <article
                    key={update.id}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          update.type === "alert"
                            ? "bg-red-100 text-red-800"
                            : update.type === "news"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
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

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {update.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {update.summary}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={update.date}>
                        {new Date(update.date).toLocaleDateString()}
                      </time>
                      <span className="text-primary-gold font-medium">
                        {/* Navigate to Updates pages > {slug} */}
                        {translations.readMore || "Read More"}
                      </span>
                    </div>
                  </article>
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
        <GrantTypes grantTypes={sassaData.grantTypes} />

        {/* Rejection messages */}

        
        {/* How to Apply Section */}
        <HowToApply content={sassaData.howToApply} />
       

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary-dark text-white">
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

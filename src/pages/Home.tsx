import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Calendar, Shield, Users, MapPin, HelpCircle, ArrowRight, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: 'news' | 'alert' | 'update';
  urgent: boolean;
}

interface QuickStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

const Home: React.FC = () => {
  const { translations, searchQuery, setSearchQuery } = useAppContext();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/68a4ad18d0ea881f405d8b0c/latest');
        if (!response.ok) throw new Error('Failed to fetch updates');
        const jsonResponse = await response.json();
        const data = jsonResponse.record;
        setUpdates(data.slice(0, 3)); // Show only latest 3 updates
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const quickStats: QuickStat[] = [
    {
      label: translations.beneficiariesHelped || 'Beneficiaries Helped',
      value: '50,000+',
      icon: <Users className="w-6 h-6" />,
      trend: '+15%',
    },
    {
      label: translations.scamsPrevented || 'Scams Prevented',
      value: '1,200+',
      icon: <Shield className="w-6 h-6" />,
      trend: '+22%',
    },
    {
      label: translations.officesListed || 'SASSA Offices',
      value: '350+',
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      label: translations.lastUpdated || 'Last Updated',
      value: 'Today',
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const quickActions = [
    {
      title: translations.checkPaymentDates || 'Check Payment Dates',
      description: translations.checkPaymentDatesDesc || 'View upcoming SASSA payment schedules',
      icon: <Calendar className="w-8 h-8" />,
      link: '/payment-calendar',
      color: 'bg-blue-500',
    },
    {
      title: translations.scamAlert || 'Scam Alert',
      description: translations.scamAlertDesc || 'Protect yourself from SASSA-related scams',
      icon: <Shield className="w-8 h-8" />,
      link: '/scam-alert',
      color: 'bg-red-500',
    },
    {
      title: translations.findOffice || 'Find SASSA Office',
      description: translations.findOfficeDesc || 'Locate your nearest SASSA office',
      icon: <MapPin className="w-8 h-8" />,
      link: '/resources',
      color: 'bg-green-500',
    },
    {
      title: translations.faqAndGuides || 'FAQ & Guides',
      description: translations.faqAndGuidesDesc || 'Get answers to common questions',
      icon: <HelpCircle className="w-8 h-8" />,
      link: '/faq',
      color: 'bg-purple-500',
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
        <title>SASSA Help Hub - Your Unofficial SASSA Resource | Payment Dates, Scam Alerts & More</title>
        <meta name="description" content="Get accurate SASSA information, payment dates 2025, scam protection, and community support. Unofficial resource for South African Social Security Agency beneficiaries." />
        <meta name="keywords" content="SASSA payment dates 2025, avoid SASSA scams, SASSA grant application, South African social security, SASSA help" />
        <link rel="canonical" href="https://sassahelphub.co.za" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SASSA Help Hub",
            "description": "Unofficial SASSA resource for South African beneficiaries",
            "url": "https://sassahelphub.co.za",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://sassahelphub.co.za/faq?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-black via-primary-dark to-primary-black text-white py-20 px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {translations.heroTitle || 'Welcome to SASSA Help Hub'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto animate-slide-up">
              {translations.heroSubtitle || 'Your unofficial guide to SASSA services, payment dates, scam protection, and community support.'}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 animate-slide-up">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={translations.searchPlaceholder || 'Search FAQs, guides, or ask a question...'}
                  className="w-full px-6 py-4 pl-14 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-yellow focus:ring-opacity-50"
                  aria-label="Search FAQs and guides"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-yellow text-primary-black px-6 py-2 rounded-full font-medium hover:bg-primary-gold transition-colors duration-200"
                  aria-label="Search"
                >
                  {translations.search || 'Search'}
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2 text-primary-yellow">
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

        {/* Quick Actions */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {translations.quickActions || 'Quick Actions'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {translations.quickActionsDesc || 'Get instant access to the most important SASSA information and tools.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${action.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-black">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-primary-yellow font-medium group-hover:text-primary-gold">
                    {translations.learnMore || 'Learn More'}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {translations.latestUpdates || 'Latest Updates'}
                </h2>
                <p className="text-gray-600">
                  {translations.latestUpdatesDesc || 'Stay informed with the latest SASSA news and important announcements.'}
                </p>
              </div>
              <Link
                to="/updates"
                className="hidden md:inline-flex items-center text-primary-yellow hover:text-primary-gold font-medium"
              >
                {translations.viewAll || 'View All'}
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
                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        update.type === 'alert' ? 'bg-red-100 text-red-800' :
                        update.type === 'news' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {update.type === 'alert' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {update.type.toUpperCase()}
                      </span>
                      {update.urgent && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning text-primary-black">
                          {translations.urgent || 'URGENT'}
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
                      <span className="text-primary-yellow font-medium">
                        {translations.readMore || 'Read More'}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center mt-8 md:hidden">
              <Link
                to="/updates"
                className="inline-flex items-center text-primary-yellow hover:text-primary-gold font-medium"
              >
                {translations.viewAll || 'View All Updates'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary-dark text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {translations.ctaTitle || 'Need Help with SASSA Services?'}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {translations.ctaDesc || 'Join thousands of South Africans who trust SASSA Help Hub for accurate, up-to-date information.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community"
                className="bg-primary-yellow text-primary-black px-8 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                {translations.joinCommunity || 'Join Our Community'}
              </Link>
              <a
                href="tel:0800601011"
                className="border border-gray-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition-colors duration-200"
              >
                {translations.callSassa || 'Call SASSA: 0800 60 10 11'}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
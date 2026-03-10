import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - SASSA Help Hub</title>
        <meta name="description" content="Privacy Policy for SASSA Help Hub. Learn how we handle data and protect your privacy while using our informational resource." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                How we protect your data at SASSA Help Hub.
              </p>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <p className="lead">
                At SASSA Help Hub, accessible from sassahelphub.co.za, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SASSA Help Hub and how we use it.
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-primary-gold" />
                  No Collection of Personal Grant Data
                </h2>
                <p>
                  We want to be absolutely clear: <strong>SASSA Help Hub does not collect, store, or have access to your personal SASSA grant details, ID numbers, or banking information.</strong> Any status checks performed through our links are processed on official government servers or our trusted partner tool at sassaaistatusupdate.co.za.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-primary-gold" />
                  Log Files
                </h2>
                <p>
                  SASSA Help Hub follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-primary-gold" />
                  Cookies and Web Beacons
                </h2>
                <p>
                  Like any other website, SASSA Help Hub uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-22xl font-semibold text-gray-900 dark:text-white mb-4">Google DoubleClick DART Cookie</h2>
                <p>
                  Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to sassahelphub.co.za and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-primary-gold hover:underline">https://policies.google.com/technologies/ads</a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Advertising Partners</h2>
                <p>
                  Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on SASSA Help Hub, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <p>
                  Note that SASSA Help Hub has no access to or control over these cookies that are used by third-party advertisers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Consent</h2>
                <p>
                  By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </p>
              </section>

              <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: March 10, 2026.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

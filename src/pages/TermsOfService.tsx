import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Gavel, Scale, AlertCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - SASSA Help Hub</title>
        <meta name="description" content="Terms of Service for SASSA Help Hub. Understand the rules and regulations for using our unofficial informational resource." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <Gavel className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Terms and Conditions for using SASSA Help Hub.
              </p>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-primary-gold" />
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use SASSA Help Hub if you do not accept all of the terms and conditions stated on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-primary-gold" />
                  2. Use of Information
                </h2>
                <p>
                  The information provided on SASSA Help Hub is for general informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                </p>
                <p>
                  <strong>Any reliance you place on such information is therefore strictly at your own risk.</strong>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Conduct</h2>
                <p>
                  Users are prohibited from:
                </p>
                <ul>
                  <li>Using the website in any way that is, or may be, damaging to the website.</li>
                  <li>Using the website in any way that impacts user access to the website.</li>
                  <li>Using the website contrary to applicable laws and regulations.</li>
                  <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Intellectual Property</h2>
                <p>
                  Unless otherwise stated, SASSA Help Hub and/or its licensors own the intellectual property rights for all material on SASSA Help Hub. All intellectual property rights are reserved. You may view and/or print pages from sassahelphub.co.za for your own personal use subject to restrictions set in these terms and conditions.
                </p>
                <p>
                  You must not:
                </p>
                <ul>
                  <li>Republish material from sassahelphub.co.za</li>
                  <li>Sell, rent, or sub-license material from sassahelphub.co.za</li>
                  <li>Reproduce, duplicate, or copy material from sassahelphub.co.za</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
                <p>
                  In no event shall SASSA Help Hub, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of South Africa, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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

export default TermsOfService;

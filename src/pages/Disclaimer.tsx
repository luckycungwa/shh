import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Official Disclaimer - SASSA Help Hub</title>
        <meta name="description" content="Official disclaimer for SASSA Help Hub. We are an independent information portal and not affiliated with SASSA or the South African government." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Official Disclaimer</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Important information regarding our relationship with SASSA.
              </p>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <section className="mb-8 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4 uppercase">
                  Not a Government Entity
                </h2>
                <p className="text-lg font-medium">
                  SASSA Help Hub (sassahelphub.co.za) is an <strong>independent, unofficial information portal</strong>. We are NOT SASSA, we are NOT affiliated with the South African Social Security Agency, and we do NOT represent any government department of South Africa.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Purpose of This Website
                </h2>
                <p>
                  This website is created and maintained for educational and informational purposes only. We aim to help South African citizens navigate the complexities of social grants by providing simplified guides, payment dates, and news summaries.
                </p>
                <p>
                  While we strive to provide the most accurate and up-to-date information, the official and final word on any SASSA grant application, status, or policy rests solely with SASSA and the Department of Social Development.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ShieldCheck className="w-6 h-6 mr-2 text-primary-gold" />
                  Accuracy of Information
                </h2>
                <p>
                  The information provided on this site is "as is" without any warranties. SASSA policies, payment dates, and application procedures can change without notice. We recommend all users to verify any information obtained here with the official SASSA channels.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Official SASSA Contact Channels
                </h2>
                <p>
                  For official assistance, please use the following authorized channels:
                </p>
                <ul className="list-none space-y-4">
                  <li className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-3 text-primary-gold" />
                    <span>Official SRD Portal: <a href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline">srd.sassa.gov.za</a></span>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-3 text-primary-gold" />
                    <span>SASSA Toll-Free Helpline: <a href="tel:0800601011" className="text-primary-gold hover:underline">0800 60 10 11</a></span>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-3 text-primary-gold" />
                    <span>Official SASSA Website: <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline">www.sassa.gov.za</a></span>
                  </li>
                </ul>
              </section>

              <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: March 10, 2026. By using this website, you acknowledge that you have read and understood this disclaimer.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;

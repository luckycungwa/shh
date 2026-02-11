import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, Scale, Info, ExternalLink } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Legal Disclaimer - SASSA AI Status Update</title>
        <meta name="description" content="Official legal disclaimer for SASSA AI Status Update. We are an independent, unofficial resource and not affiliated with the South African government or SASSA." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <ShieldAlert className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Legal Disclaimer</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Important information regarding our independent status and content accuracy.
              </p>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <section className="mb-8 border-l-4 border-red-500 pl-6 py-2 bg-red-50 dark:bg-red-900 dark:bg-opacity-20">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-red-500" />
                  No Affiliation with SASSA
                </h2>
                <p className="font-bold">
                  SASSA AI Status Update (sassaaistatusupdate.co.za) is an INDEPENDENT and UNOFFICIAL resource. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with the South African Social Security Agency (SASSA), the Department of Social Development (DSD), or any other government agency or department in South Africa.
                </p>
                <p>
                  The official SASSA website can be found at <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline">www.sassa.gov.za <ExternalLink className="inline w-3 h-3"/></a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-primary-gold" />
                  Informational Purposes Only
                </h2>
                <p>
                  All information provided on this website is for general informational and educational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.
                </p>
                <p>
                  Any reliance you place on such information is therefore strictly at your own risk. We recommend that you always verify information through official government channels before making any financial or legal decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Privacy and Personal Data
                </h2>
                <p>
                  We do not collect personal grant application details, ID numbers, or banking information. We will never ask you for your SASSA PIN or bank password. If you encounter any form on this site asking for such sensitive information (other than our contact form), please report it immediately as it may be a result of external malicious interference.
                </p>
              </section>

              <section className="mb-8 border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Limitation of Liability
                </h2>
                <p>
                  In no event will SASSA AI Status Update be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
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

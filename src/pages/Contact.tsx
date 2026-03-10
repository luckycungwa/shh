import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - SASSA Help Hub</title>
        <meta name="description" content="Get in touch with the SASSA Help Hub team for website inquiries, feedback, or content suggestions." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-primary-gold p-8 text-primary-black">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg font-medium opacity-90">
                We're here to help improve your experience on our platform.
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Have feedback about our guides or found an error in our payment dates? We value community input to keep SASSA Help Hub the most accurate resource possible.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary-gold/10 p-3 rounded-lg mr-4">
                        <Mail className="w-6 h-6 text-primary-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Email Us</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">General & Website Inquiries:</p>
                        <a href="mailto:support@sassahelphub.co.za" className="text-primary-gold font-medium hover:underline">support@sassahelphub.co.za</a>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Technical/Dev Support:</p>
                        <a href="mailto:44tagstudios@gmail.com" className="text-primary-gold font-medium hover:underline">44tagstudios@gmail.com</a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary-gold/10 p-3 rounded-lg mr-4">
                        <Clock className="w-6 h-6 text-primary-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Response Time</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          We aim to respond to all website-related inquiries within 48 business hours.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary-gold/10 p-3 rounded-lg mr-4">
                        <MapPin className="w-6 h-6 text-primary-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Location</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Based in Johannesburg, serving all of South Africa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Urgent SASSA Help?</h2>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6 border-l-4 border-red-500">
                    <p className="text-red-700 dark:text-red-400 font-medium">
                      PLEASE NOTE: We cannot check your status or access your personal SASSA file.
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    If you have an urgent issue with your grant payment or application, please contact the official SASSA help desk directly.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="tel:0800601011"
                      className="flex items-center justify-center w-full bg-primary-gold text-primary-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      0800 60 10 11 (Toll-Free)
                    </a>
                    <a
                      href="https://srd.sassa.gov.za"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Official SRD Portal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

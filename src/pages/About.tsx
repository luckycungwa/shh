import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building, Users, Mail, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - SASSA Help Hub</title>
        <meta name="description" content="Learn about the mission and team behind SASSA Help Hub, your trusted unofficial resource for SASSA information." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <Building className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About SASSA Help Hub</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Your Unofficial Guide to Navigating SASSA.
              </p>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-primary-gold" />
                  Our Mission
                </h2>
                <p>
                  At SASSA Help Hub, our mission is to provide clear, accessible, and up-to-date information about the South African Social Security Agency (SASSA) grants. We understand that navigating the social security system can be challenging, and we are here to simplify the process for you. We aim to empower individuals and families by providing them with the knowledge they need to access the support they are entitled to.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-primary-gold" />
                  Who We Are
                </h2>
                <p>
                  We are a small team of developers and content creators passionate about social justice and technology. SASSA Help Hub was born out of a desire to create a reliable, user-friendly resource for all South Africans who rely on SASSA grants. We are not affiliated with SASSA or the South African government; we are an independent entity committed to serving the community. This project is developed and maintained by 44Tag Studios.
                </p>
              </section>

              <section className="bg-primary-gold bg-opacity-10 dark:bg-opacity-20 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-primary-gold" />
                  Contact Us
                </h2>
                <p>
                  Have questions, suggestions, or feedback? We'd love to hear from you. Please note that we cannot assist with personal grant applications or status checks. For official support, you must contact SASSA directly.
                </p>
                <p>
                  For inquiries related to this website, you can reach out to the development team at:
                  <a href="mailto:44tagstudios@gmail.com" className="font-semibold text-primary-gold hover:underline"> 44tagstudios@gmail.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

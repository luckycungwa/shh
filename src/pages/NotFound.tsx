import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - SASSA AI Status Update</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to SASSA AI Status Update homepage." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl font-bold text-primary-gold mb-4">404</div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
            </p>

            <div className="space-y-4">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-gold transition-colors duration-200"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              
              <Link
                to="/faq"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Search className="w-5 h-5 mr-2" />
                Search FAQs
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full inline-flex items-center justify-center px-6 py-3 text-gray-600 font-semibold hover:text-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Looking for something specific? Try these popular sections:</p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              <Link to="/payment-calendar" className="text-primary-gold hover:text-primary-gold">
                Payment Date
              </Link>
              <span>•</span>
              <Link to="/scam-alert" className="text-primary-gold hover:text-primary-gold">
                Scam Alert
              </Link>
              <span>•</span>
              <Link to="/resources" className="text-primary-gold hover:text-primary-gold">
                SASSA Offices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
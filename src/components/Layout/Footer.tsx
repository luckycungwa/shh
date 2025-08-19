import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Phone, Mail, MapPin } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Footer: React.FC = () => {
  const { translations } = useAppContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-yellow">
              {translations.aboutSassaHelpHub || 'About SASSA Help Hub'}
            </h3>
            <p className="text-secondary-gray text-sm mb-4">
              {translations.footerAbout || 'An unofficial resource providing accurate SASSA information, payment dates, and scam protection for South African beneficiaries.'}
            </p>
            <div className="flex items-start space-x-2 text-xs text-secondary-gray">
              <div className="w-1 h-1 bg-warning rounded-full mt-2 flex-shrink-0"></div>
              <span>
                {translations.footerDisclaimer || 'This is an independent, unofficial resource. Always verify information on official SASSA channels.'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-yellow">
              {translations.quickLinks || 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.faq || 'FAQ'}
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.guides || 'Guides'}
                </Link>
              </li>
              <li>
                <Link to="/payment-calendar" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.paymentCalendar || 'Payment Calendar'}
                </Link>
              </li>
              <li>
                <Link to="/scam-alert" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.scamAlert || 'Scam Alert'}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.resources || 'Resources'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-yellow">
              {translations.officialResources || 'Official Resources'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.sassa.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200 flex items-center"
                >
                  SASSA Official Website
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanews.gov.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200 flex items-center"
                >
                  SA Government News
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <div className="flex items-center text-secondary-gray">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>SASSA Helpline: 0800 60 10 11</span>
                </div>
              </li>
              <li>
                <div className="flex items-center text-secondary-gray">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@sassa.gov.za</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-yellow">
              {translations.legalAndSupport || 'Legal & Support'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.privacyPolicy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200">
                  {translations.termsOfService || 'Terms of Service'}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@sassahelphub.co.za"
                  className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200"
                >
                  {translations.contactSupport || 'Contact Support'}
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-secondary-gray hover:text-primary-yellow transition-colors duration-200"
                >
                  {translations.sitemap || 'Sitemap'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-secondary-gray text-center lg:text-left">
              <p>© {currentYear} SASSA Help Hub. All rights reserved.</p>
              <p className="mt-1">
                {translations.footerNote || 'This is an independent resource not affiliated with SASSA.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-secondary-gray">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>South Africa</span>
              </div>
              <div className="text-center">
                Built with ❤️ for SA beneficiaries
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-6 p-4 bg-warning bg-opacity-20 border-l-4 border-warning rounded-r-lg">
            <p className="text-sm font-medium text-warning">
              {translations.emergencyNotice || '🚨 Emergency: For urgent SASSA queries, call 0800 60 10 11 or visit your nearest SASSA office.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
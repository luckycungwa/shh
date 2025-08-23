import React, { useState, useEffect } from 'react';
import { Cookie, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('sassa-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now(),
    };
    localStorage.setItem('sassa-cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    // Initialize analytics and advertising if accepted
    if (consentData.analytics) {
      // Initialize Google Analytics
      console.log('Analytics enabled');
    }
    if (consentData.advertising) {
      // Initialize advertising services
      console.log('Advertising enabled');
    }
  };

  const handleAcceptSelected = () => {
    const consentData = {
      ...preferences,
      timestamp: Date.now(),
    };
    localStorage.setItem('sassa-cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    // Initialize services based on preferences
    if (preferences.analytics) {
      console.log('Analytics enabled');
    }
    if (preferences.advertising) {
      console.log('Advertising enabled');
    }
  };

  const handleDeclineAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now(),
    };
    localStorage.setItem('sassa-cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Cookie className="w-6 h-6 text-primary-gold" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cookie Preferences
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              We use cookies to improve your experience on our website. You can choose which types of cookies you want to allow.{' '}
              <Link to="/privacy" className="text-primary-gold hover:text-primary-gold underline">
                Learn more in our Privacy Policy
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </Link>
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                  className="w-4 h-4 text-primary-gold bg-gray-100 border-gray-300 rounded focus:ring-primary-gold"
                />
                <label htmlFor="necessary" className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">Necessary cookies</span> (Required)
                  <span className="block text-xs text-gray-500">
                    Essential for website functionality and security.
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange('analytics')}
                  className="w-4 h-4 text-primary-gold bg-gray-100 border-gray-300 rounded focus:ring-primary-gold"
                />
                <label htmlFor="analytics" className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">Analytics cookies</span>
                  <span className="block text-xs text-gray-500">
                    Help us understand how you use our website to improve your experience.
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="advertising"
                  checked={preferences.advertising}
                  onChange={() => handlePreferenceChange('advertising')}
                  className="w-4 h-4 text-primary-gold bg-gray-100 border-gray-300 rounded focus:ring-primary-gold"
                />
                <label htmlFor="advertising" className="ml-2 text-sm text-gray-700">
                  <span className="font-medium">Advertising cookies</span>
                  <span className="block text-xs text-gray-500">
                    Used to deliver relevant ads and measure advertising effectiveness.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-primary-gold text-primary-black font-medium rounded-lg hover:bg-primary-gold transition-colors duration-200"
              >
                Accept All
              </button>
              
              <button
                onClick={handleAcceptSelected}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Save Preferences
              </button>
              
              <button
                onClick={handleDeclineAll}
                className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors duration-200"
              >
                Decline All
              </button>
            </div>
          </div>

          <button
            onClick={handleDeclineAll}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close cookie banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
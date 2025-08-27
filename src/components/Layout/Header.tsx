import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon, Contrast } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, theme, setTheme, translations } = useAppContext();

  const navigationItems = [
    { path: '/', label: translations.home || 'Home' },
   
    { path: '/payment-calendar', label: translations.paymentCalendar || 'Payment Date' },
    { path: '/guides', label: translations.guides || 'Guides' },
    { path: '/scam-alert', label: translations.scamAlert || 'Scam Alert' },
    { path: '/resources', label: translations.resources || 'Resources' },
   { path: '/faq', label: translations.faq || 'FAQ' },
    // { path: '/community', label: translations.community || 'Community' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zu', name: 'isiZulu' },
    { code: 'xh', name: 'isiXhosa' },
  ];

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'high-contrast', label: 'High Contrast', icon: Contrast },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-gold font-bold text-xl"
            aria-label="SASSA Help Hub Home"
          >
            <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="rounded-full w-8 h-8" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-gold text-primary-black'
                    : 'text-white hover:bg-primary-dark hover:text-primary-gold'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Accessibility Controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 text-white hover:text-primary-gold transition-colors duration-200"
                aria-label="Change theme"
                aria-expanded={isThemeMenuOpen}
                aria-haspopup="true"
              >
                {themes.find(t => t.value === theme)?.icon && 
                  React.createElement(themes.find(t => t.value === theme)!.icon, { className: 'w-5 h-5' })
                }
              </button>
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.value}
                      onClick={() => {
                        setTheme(themeOption.value as 'light' | 'dark' | 'high-contrast');
                        setIsThemeMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        theme === themeOption.value ? 'bg-gray-100' : ''
                      }`}
                    >
                      <themeOption.icon className="w-4 h-4 mr-2" />
                      {themeOption.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 p-2 text-white hover:text-primary-gold transition-colors duration-200"
                aria-label="Change language"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs uppercase">{language}</span>
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        language === lang.code ? 'bg-gray-100' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-primary-gold transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-gold text-primary-black'
                      : 'text-white hover:bg-primary-dark hover:text-primary-gold'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
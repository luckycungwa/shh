import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchRoutes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import UpdatePage from './pages/UpdatePage';
import UpdatesListPage from './pages/UpdatesListPage';
import FAQ from './pages/FAQ';
import Guides from './pages/Guides';
import GuidePage from './pages/GuidePage';
import PaymentCalendar from './pages/PaymentCalendar';
import ScamAlert from './pages/ScamAlert';
import Resources from './pages/Resources';
// import Community from './pages/Community';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/Common/ErrorBoundary';
import CookieConsent from './components/Common/CookieConsent';
import Chatbot from './components/Chatbot/Chatbot';
import AdSense from './components/Common/AdSense';

const routes = [
  { path: "/" },
  { path: "/updates" },
  { path: "/updates/:id" },
  { path: "/faq" },
  { path: "/guides" },
  { path: "/guides/:id" },
  { path: "/payment-calendar" },
  { path: "/scam-alert" },
  { path: "/resources" },
  { path: "/privacy" },
  { path: "/terms" },
  { path: "/about" },
  { path: "*" },
];

const AppContent: React.FC = () => {
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);
  const isNotFoundPage = matchedRoutes ? matchedRoutes.some(match => match.route.path === '*') : false;

  return (
    <>
      {!isNotFoundPage && <AdSense />}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/updates" element={<UpdatesListPage />} />
          <Route path="/updates/:id" element={<UpdatePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:id" element={<GuidePage />} />
          <Route path="/payment-calendar" element={<PaymentCalendar />} />
          <Route path="/scam-alert" element={<ScamAlert />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Navigate to="/updates" replace />} />
          <Route path="/blog/*" element={<Navigate to="/updates" replace />} />
          <Route path="/status-check" element={<Navigate to="/" replace />} />
          <Route path="/application-tracking" element={<Navigate to="/" replace />} />
          <Route path="/appeals" element={<Navigate to="/guides/appeal-guide" replace />} />
          <Route path="/offices" element={<Navigate to="/resources" replace />} />
          <Route path="/bank-details" element={<Navigate to="/guides/srd-grant" replace />} />
          <Route path="/srd-grant-guide" element={<Navigate to="/guides/srd-grant" replace />} />
          <Route path="/old-age-grant-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/disability-grant-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/child-support-grant-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/foster-child-grant-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/care-dependency-grant-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/war-veterans-grant-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/grant-in-aid-guide" element={<Navigate to="/guides" replace />} />
          <Route path="/scams" element={<Navigate to="/scam-alert" replace />} />
          <Route path="/financial-tools" element={<Navigate to="/" replace />} />
          <Route path="/eligibility" element={<Navigate to="/guides" replace />} />
          <Route path="/travel" element={<Navigate to="/guides" replace />} />
          <Route path="/account-management" element={<Navigate to="/guides" replace />} />
          <Route path="/assistance" element={<Navigate to="/guides" replace />} />
          <Route path="/payment-issues" element={<Navigate to="/guides" replace />} />
          <Route path="/communication" element={<Navigate to="/guides" replace />} />
          <Route path="/biometrics" element={<Navigate to="/guides" replace />} />
          <Route path="/grant-reviews" element={<Navigate to="/guides" replace />} />
          <Route path="/applications" element={<Navigate to="/guides" replace />} />
          <Route path="/fraud-prevention" element={<Navigate to="/scam-alert" replace />} />
          <Route path="/grant-amounts" element={<Navigate to="/guides" replace />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        <Chatbot />
      </Layout>
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AppProvider>
          <Router>
            <AppContent />
          </Router>
        </AppProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import UpdatePage from './pages/UpdatePage';
import UpdatesListPage from './pages/UpdatesListPage';
import FAQ from './pages/FAQ';
import Guides from './pages/Guides';
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
          <Route path="/payment-calendar" element={<PaymentCalendar />} />
          <Route path="/scam-alert" element={<ScamAlert />} />
          <Route path="/resources" element={<Resources />} />
          {/* <Route path="/community" element={<Community />} /> */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
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
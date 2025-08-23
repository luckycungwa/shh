import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Guides from './pages/Guides';
import PaymentCalendar from './pages/PaymentCalendar';
import ScamAlert from './pages/ScamAlert';
import Resources from './pages/Resources';
// import Community from './pages/Community';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/Common/ErrorBoundary';
import CookieConsent from './components/Common/CookieConsent';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/payment-calendar" element={<PaymentCalendar />} />
                <Route path="/scam-alert" element={<ScamAlert />} />
                <Route path="/resources" element={<Resources />} />
                {/* <Route path="/community" element={<Community />} /> */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
              <Chatbot />
            </Layout>
          </Router>
        </AppProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
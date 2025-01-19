import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CostCalculator from './components/CostCalculator';
import ROICalculator from './components/ROICalculator';
import DMARCGenerator from './components/DMARCGenerator';
import SPFGenerator from './components/SPFGenerator';
import SPFChecker from './components/SPFChecker';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import DomainSuggestion from './components/DomainSuggestion';
import Navigation from './components/Navigation';
import ToolsNavbar from './components/ToolsNavbar';
import MailboxBanner from './components/MailboxBanner';
import LeadGenBanner from './components/LeadGenBanner';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const isToolPage = location.pathname !== '/';

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`flex-grow ${isToolPage ? 'bg-gray-50' : ''}`}>
        {isToolPage && <ToolsNavbar />}
        {isToolPage ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4 space-y-8">
            <div className="grid grid-cols-[240px_1fr] gap-8">
              <div className="space-y-8">
                <Navigation />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <MailboxBanner />
                <Routes>
                  <Route path="/tools/calculator" element={<CostCalculator />} />
                  <Route path="/tools/roi" element={<ROICalculator />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/tools/domain" element={<DomainSuggestion />} />
                  <Route path="/tools/dmarc" element={<DMARCGenerator />} />
                  <Route path="/tools/spf-generator" element={<SPFGenerator />} />
                  <Route path="/tools/spf-checker" element={<SPFChecker />} />
                </Routes>
              </div>
            </div>
            <LeadGenBanner />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
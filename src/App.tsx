import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import ItineraryPage from './pages/ItineraryPage';
import FleetPage from './pages/FleetPage';
import TeamPage from './pages/TeamPage';
import LogisticsPage from './pages/LogisticsPage';
import PracticalPage from './pages/PracticalPage';
import BlogPage from './pages/BlogPage';
import SponsorsPage from './pages/SponsorsPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import SponsorTargetsPage from './pages/SponsorTargetsPage';
import NotFound from './pages/NotFound';
import LegalPage from './pages/LegalPage';
import DonationPage from './pages/DonationPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-amber-50">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-amber-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-[100] font-serif"
      >
        Aller au contenu principal
      </a>

      <Header />
      {/* Add top padding to avoid body content overlapping the fixed header */}
      <main id="main-content" role="main" tabIndex={-1} className="pt-24 md:pt-28">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/logistics" element={<LogisticsPage />} />
            <Route path="/practical" element={<PracticalPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/sponsor-targets" element={<SponsorTargetsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/privacy" element={<Navigate to="/legal" replace />} />
            <Route path="/terms" element={<Navigate to="/legal" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;

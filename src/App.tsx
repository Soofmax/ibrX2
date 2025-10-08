import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

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
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header />
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ItineraryPage from './pages/ItineraryPage';
import FleetPage from './pages/FleetPage';
import TeamPage from './pages/TeamPage';
import LogisticsPage from './pages/LogisticsPage';
import BlogPage from './pages/BlogPage';
import SponsorsPage from './pages/SponsorsPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/logistics" element={<LogisticsPage />} />
        <Route path="/practical" element={<LogisticsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

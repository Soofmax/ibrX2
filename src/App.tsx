import Header from './components/Header';
import Hero from './components/Hero';
import CurrentLocation from './components/CurrentLocation';
import Itinerary from './components/Itinerary';
import Fleet from './components/Fleet';
import Team from './components/Team';
import Logistics from './components/Logistics';
import PracticalInfo from './components/PracticalInfo';
import BlogPosts from './components/BlogPosts';
import Sponsoring from './components/Sponsoring';
import Crowdfunding from './components/Crowdfunding';
import ContactFAQ from './components/ContactFAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <Hero />
      <CurrentLocation />
      <Itinerary />
      <Fleet />
      <Team />
      <Logistics />
      <PracticalInfo />
      <BlogPosts />
      <Sponsoring />
      <Crowdfunding />
      <ContactFAQ />
      <Footer />
    </div>
  );
}

export default App;

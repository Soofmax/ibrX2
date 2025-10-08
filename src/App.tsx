import Header from './components/Header';
import Hero from './components/Hero';
import CurrentLocation from './components/CurrentLocation';
import BlogPosts from './components/BlogPosts';
import Crowdfunding from './components/Crowdfunding';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <Hero />
      <CurrentLocation />
      <BlogPosts />
      <Crowdfunding />
      <Footer />
    </div>
  );
}

export default App;

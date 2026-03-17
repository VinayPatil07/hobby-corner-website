import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturesAndCommunity } from './components/FeaturesAndCommunity';
import { StoreInfo } from './components/StoreInfo';
import { Footer } from './components/Footer';
import { Community } from './components/Community';
import { SpecialOrders } from './pages/SpecialOrders'; 
import ServicesPage from './pages/Services';
import { EventsPage } from './pages/Events';
import BlogPage from './pages/Blog';
import FAQPage from './pages/FAQ';

const HomePage = () => (
  <>
    <Hero />
    <FeaturesAndCommunity />
    <Community />
    <StoreInfo />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-soft-gray-blue">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/special-orders" element={<SpecialOrders />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
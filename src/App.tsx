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
import { Blog } from './pages/Blog'; 
import AdminTerminal from './admin/AdminTerminal';
import BlogPostDetail from './pages/BlogPostDetail';
import { FAQPage } from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ScrollToTop from './components/ScrollToTop'; 
import { NotFound } from './pages/NotFound';
import { HobbyCon } from './pages/HobbyCon';

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
      <ScrollToTop />
      <div className="min-h-screen bg-soft-gray-blue">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/special-orders" element={<SpecialOrders />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/admin/terminal" element={<AdminTerminal />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/hobby-con" element={<HobbyCon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
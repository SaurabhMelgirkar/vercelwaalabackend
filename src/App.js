import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SpeakersPage from './pages/SpeakersPage';
import ListenPage from './pages/ListenPage';
import AboutPage from './pages/AboutPage';
import ContactUsPage from './pages/ContactUsPage';
import BuyTicketsPage from './pages/BuyTicketsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CancellationRefundPage from './pages/CancellationRefundPage';
import ShippingDeliveryPage from './pages/ShippingDeliveryPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import SuccessPage from './pages/SuccessPage';  // ✅ Correct import matching your file name


function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/listen" element={<ListenPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/buy-tickets" element={<BuyTicketsPage />} />
            <Route path="/success" element={<SuccessPage />} />  // ✅ Use SuccessPage component

            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cancellation-refund" element={<CancellationRefundPage />} />
            <Route path="/shipping-delivery" element={<ShippingDeliveryPage />} />
            <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

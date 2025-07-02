import React, { useState } from "react";
import { SESSIONS } from "../utils/constants";
import SessionCard from "../components/SessionCard";
import Modal from "../components/Modal";
import PageTemplate from "../components/PageTemplate";

const BuyTicketsPage = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSession) {
      alert("Please select a session");
      return;
    }
    setShowPaymentModal(true);
  };

  const initiatePayment = async () => {
    if (!selectedSession) return;

    try {
      const orderRes = await fetch("https://tedx-dyp-akurdi.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedSession.price }),
      });
      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: "rzp_test_20KaMSW4yjfZm5", // Replace with live key before production
        amount: selectedSession.price * 100,
        currency: "INR",
        name: "TEDx DYP Akurdi",
        description: `${selectedSession.name} Ticket`,
        order_id: orderData.id,
        handler: function (response) {
          verifyPayment(response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#EB0028",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setShowPaymentModal(false);
    } catch (err) {
      console.error(err);
      alert("Error initiating payment");
    }
  };

  const verifyPayment = async (response) => {
    try {
      const res = await fetch("https://tedx-dyp-akurdi.onrender.com/api/payment/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          session: selectedSession.name,
          amount: selectedSession.price,
        }),
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = `/success?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&amount=${selectedSession.price}&ticketId=${data.ticketId}`;
      } else {
        alert("Payment verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying payment");
    }
  };

  return (
    <PageTemplate title="Register for TEDx Event" subtitle="Choose your session and join us for an inspiring experience">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Session</h2>
            <div className="space-y-4">
              {SESSIONS.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onSelect={handleSessionSelect}
                  isSelected={selectedSession?.id === session.id}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Full Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tedx-red" />
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Email Address *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tedx-red" />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="Phone Number *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tedx-red" />
              <input type="text" name="organization" value={formData.organization} onChange={handleInputChange} placeholder="Organization/Institution" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tedx-red" />

              {selectedSession && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                  <div className="flex justify-between items-center">
                    <span>{selectedSession.name}</span>
                    <span className="font-bold text-tedx-red">₹{selectedSession.price}</span>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full btn-primary py-4 text-lg" disabled={!selectedSession}>
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Confirm Payment">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Session:</span>
                <span>{selectedSession?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-bold text-tedx-red">₹{selectedSession?.price}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => setShowPaymentModal(false)} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button onClick={initiatePayment} className="flex-1 btn-primary">
              Pay Now
            </button>
          </div>
        </div>
      </Modal>
    </PageTemplate>
  );
};

export default BuyTicketsPage;


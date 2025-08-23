import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreditsWorksPopup from './CreditsWorksPopup';
import StepperBar from './StepperBar';

const BuyPackageCheckout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gstin, setGstin] = useState('27AAMCB4079M1Z1');
  const [editingGstin, setEditingGstin] = useState(false);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Get plan from location.state or localStorage
  let plan = location.state?.plan;
  if (!plan) {
    const storedPlan = localStorage.getItem('chosenPlan');
    if (storedPlan) {
      plan = JSON.parse(storedPlan);
    } else {
      plan = {
        name: "Free Plan",
        price: 0,
        jobPosts: 1,
        candidateApplications: "Up to 50 profiles",
        databaseAccess: "50-profile limit per job post",
      };
    }
  }

  // Calculation logic for each plan
  const planPrice = plan.price;
  const discount = 0;
  const subtotal = planPrice;
  const gst = planPrice > 0 ? Math.round(subtotal * 0.18) : 0;
  const total = subtotal + gst;
  const planName = plan.name;
  

  return (
        <div className="bg-[#FFF7E0] min-h-screen">
      {/* Stepper Bar with Logo and Credits */}
      <StepperBar onShowCredits={() => setShowCreditsPopup(true)} onShowOffer={() => setShowOfferModal(true)} />

      {/* Credits Works Popup */}
      {showCreditsPopup && (
        <CreditsWorksPopup onClose={() => setShowCreditsPopup(false)} />
      )}

      {/* Offer Modal Popup */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-fadeIn border border-[#fbb040]/20">
            <button className="absolute top-4 left-4 p-1 rounded hover:bg-[#FFF7E0]" aria-label="Close" onClick={() => setShowOfferModal(false)}>
              <svg width="24" height="24" fill="none" stroke="#b97a13" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="flex flex-col items-center mt-2">
              {/* Icon */}
              <div className="mb-2">
                <svg width="60" height="60" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFF7E0"/><path d="M7 13l3 3 7-7" stroke="#fbb040" strokeWidth="2"/></svg>
              </div>
              <div className="text-red-600 font-semibold text-base mb-1">Don't miss out the offer!</div>
              <div className="text-2xl font-bold text-[#253858] mb-1 text-center">Save up to 53% OFF</div>
              <div className="text-[#b97a13] text-center mb-4 text-base">Complete your purchase and get up to 53% OFF on credit plans to hire top talent.</div>
              <button className="bg-[#fbb040] hover:bg-orange-500 text-white font-semibold rounded-xl w-full py-2 mb-2 text-base shadow transition-all duration-200" onClick={() => setShowOfferModal(false)}>Continue buying now</button>
              <button className="text-[#b97a13] underline text-sm" onClick={() => setShowOfferModal(false)}>No thanks</button>
            </div>
          </div>
        </div>
      )}

      {/* Card for Checkout */}
      <div className="w-full max-w-xl mx-auto bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-2xl p-4 sm:p-8 mt-8">
        {/* Back and Heading */}
        <div className="flex items-center mb-6">
          <button className="mr-2 p-2 rounded hover:bg-[#FFF7E0] border border-[#fbb040]/30" aria-label="Back" onClick={() => navigate(-1)}>
            <svg width="24" height="24" fill="none" stroke="#b97a13" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-2xl font-bold text-[#183b56]">Checkout</h1>
        </div>

        {/* Purchase Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-[#183b56]">Purchase summary</h2>
          <div className="mb-2">
            <div className="font-semibold text-base mb-1">{planName} <span className="float-right font-bold text-[#fbb040]">₹{planPrice.toLocaleString()}</span></div>
            
            <div className="text-[#fbb040] text-sm font-medium flex items-center mb-2">Plan discount (~13%) <span className="ml-auto text-[#fbb040] font-semibold">-₹{discount}</span></div>
          </div>
          <hr className="my-2 border-[#fbb040]/20" />
          <div className="flex justify-between text-sm mb-1"><span>Sub Total</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm mb-1"><span>GST (18%)</span><span className="font-semibold">₹{gst.toLocaleString()}</span></div>
          <div className="flex items-center text-sm mb-2">
            <span>GSTIN: </span>
            {editingGstin ? (
              <input
                className="ml-2 border-b border-[#fbb040] outline-none px-1 py-0.5 text-sm w-48 bg-[#fff7e0]"
                value={gstin}
                onChange={e => setGstin(e.target.value)}
                onBlur={() => setEditingGstin(false)}
                autoFocus
              />
            ) : (
              <span className="ml-2 font-mono">{gstin}</span>
            )}
            <button className="ml-1 p-1" onClick={() => setEditingGstin(true)} aria-label="Edit GSTIN">
              <svg width="16" height="16" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
            </button>
          </div>
          <hr className="my-2 border-[#fbb040]/20" />
          <div className="flex justify-between items-end">
            <div className="text-xl font-bold text-[#183b56]">Total <span className="text-xs font-normal text-gray-500">(Inc tax)</span></div>
            <div className="text-2xl font-bold text-[#fbb040]">₹{total.toLocaleString()}</div>
          </div>
        </div>

        {/* Savings Message */}
        <div className="bg-[#fff7e0] border border-[#fbb040]/20 rounded-lg px-4 py-2 flex items-center mb-6">
          <span className="mr-2">🎉</span>
          <span className="font-medium">Yay! You’re saving <b>₹{discount}</b> on this purchase</span>
        </div>

        {/* Proceed to Pay Button */}
        <button className="w-full bg-[#fbb040] hover:bg-[#ffd77a] text-white font-semibold rounded-xl py-3 text-lg mb-4 transition-all duration-200">Proceed to Pay ₹{total.toLocaleString()}</button>

        {/* Info and Security Note */}
        <div className="text-xs text-gray-500 text-center mb-2">
          We ensure fair use and privacy. Policy violations or fraud may result in suspension and loss of fees. KYC verification is mandatory for unregistered users to activate subscriptions.
        </div>
        <div className="flex items-center justify-center text-xs text-gray-700 gap-2">
          <svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <span>100% safe and secure checkout</span>
        </div>
      </div>
    </div>
  );
};

export default BuyPackageCheckout;

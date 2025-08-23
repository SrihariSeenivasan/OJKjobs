import { BadgePercent, Info, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from '../Common/ContactPopup';
import BuyPackageFAQ from './BuyPackageFAQ';
import BuyPackageTestimonials from './BuyPackageTestimonials';
import CreditsWorksPopup from './CreditsWorksPopup';
import StepperBar from './StepperBar';


const plans = [
  {
    name: "Free Plan",
    price: 0,
    jobPosts: 1,
    candidateApplications: "Up to 50 profiles",
    databaseAccess: "50-profile limit per job post",
  },
  {
    name: "Starter Plan",
    price: 599,
    jobPosts: 1,
    candidateApplications: "Unlimited",
    databaseAccess: "Unlimited",
  },
  {
    name: "Pro Plan",
    price: 1499,
    jobPosts: 5,
    candidateApplications: "Unlimited",
    databaseAccess: "Unlimited",
  },
];

const BuyPackageSelection: React.FC = () => {
  const navigate = useNavigate();
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  return (
    
    <div className="bg-[#FFF7E0] min-h-screen">
      {/* Stepper Bar with Logo and Credits */}
      <StepperBar onShowCredits={() => setShowCreditsPopup(true)} onShowOffer={() => setShowOfferModal(true)} />

      {/* Main Heading and Sub-link */}
      <div className="max-w-4xl mx-auto flex flex-col items-center mt-8 mb-4">
        <h1 className="text-4xl font-bold text-[#253858] text-center mb-2">Recruitment made easy with OJK Jobs</h1>
        <button onClick={() => setShowCreditsPopup(true)} className="text-[#fbb040] underline font-semibold text-base mb-4 flex items-center gap-1 hover:text-[#b97a13] transition-all duration-200"><Info size={18} />View how credits works</button>
      </div>
      {/* Credits Works Popup */}
      {showCreditsPopup && (
        <CreditsWorksPopup onClose={() => setShowCreditsPopup(false)} />
      )}

      {/* Limited-Time Deal Banner as Image */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <img
          src="/assets/limited-time-deal-banner.png"
          alt="Limited-Time Deal Banner"
          className="w-full rounded-2xl shadow-lg object-cover border border-[#fbb040]/20"
          style={{ minHeight: '120px', maxHeight: '200px' }}
        />
      </div>

      {/* Offer Modal Popup */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-fadeIn border border-[#fbb040]/20">
            <button className="absolute top-4 left-4 p-1 rounded hover:bg-[#FFF7E0]" aria-label="Close" onClick={() => setShowOfferModal(false)}>
              <X size={24} stroke="#b97a13" />
            </button>
            <div className="flex flex-col items-center mt-2">
              {/* Icon */}
              <div className="mb-2">
                <BadgePercent size={60} stroke="#fbb040" fill="#FFF7E0" />
              </div>
              <div className="text-red-600 font-semibold text-base mb-1">Don't miss out the offer!</div>
              <div className="text-2xl font-bold text-[#253858] mb-1 text-center">Save up to 53% OFF</div>
              <div className="text-[#b97a13] text-center mb-4 text-base">Complete your purchase and get up to 53% OFF on credit plans to hire top talent.</div>
              <button className="bg-[#fbb040] hover:bg-orange-500 text-white font-semibold rounded-xl w-full py-2 mb-2 text-base shadow transition-all duration-200" onClick={() => setShowOfferModal(false)}>Continue buying now</button>
              <button className="text-[#b97a13] underline text-sm" onClick={() => navigate("/Employer/Jobs")}>No thanks</button>
            </div>
          </div>
        </div>
      )}

      {/* Plans inside a frame - Only Free, Starter, Pro plans */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="bg-white/90 border border-[#fbb040]/30 rounded-3xl shadow-2xl p-4 sm:p-8 mt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className="border border-[#fbb040]/40 rounded-2xl bg-[#fff7e0] p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group flex flex-col min-h-[320px]">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-2xl text-[#b97a13]">{plan.name}</h2>
                  <span className="text-xl font-bold text-[#fbb040]">₹{plan.price.toLocaleString()}{plan.name === 'Starter Plan' ? ' / job post' : ''}</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-800 mb-2">
                  <li>Job Posts: <b>{plan.jobPosts}</b></li>
                  <li>Candidate Applications: <b>{plan.candidateApplications}</b></li>
                  <li>Database Access: <b>{plan.databaseAccess}</b></li>
                </ul>
                <div className="flex-1" />
                  <button
                    className="w-full bg-[#fbb040] hover:bg-[#ffd77a] text-white font-semibold rounded-xl py-2 text-base mt-2 transition-all duration-200"
                    style={{marginTop: 'auto'}}
                    onClick={() => {
                      localStorage.setItem('chosenPlan', JSON.stringify(plan));
                      navigate('/Employer/BuyPackageCheckout', { state: { plan } });
                    }}
                  >
                    Choose {plan.name}
                  </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 text-center mt-2">*All plans prices are shown excluding applicable taxes.</div>
      <BuyPackageTestimonials/>
      <BuyPackageFAQ/>
      <ContactPopup open={showContactPopup} onClose={() => setShowContactPopup(false)} />
    </div>
    
  );
};

export default BuyPackageSelection;

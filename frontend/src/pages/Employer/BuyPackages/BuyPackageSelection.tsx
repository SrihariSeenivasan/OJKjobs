import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from '../Common/ContactPopup';
import BuyPackageFAQ from './BuyPackageFAQ';
import BuyPackageTestimonials from './BuyPackageTestimonials';
import CreditsWorksPopup from './CreditsWorksPopup';

const plansTabs = [
  { label: 'Bundle plans (Jobs+Database)' },
  { label: 'Job posting plans' },
  { label: 'Database plans' },
];

const plansData = [
  // Bundle plans (Jobs+Database)
  [
    {
      months: 6,
      price: 1100,
      oldPrice: 12300,
      discount: '46% OFF',
      total: 6599,
      credits: '6 Job credits',
      dbCredits: '400 Database credits',
      duration: '180 days',
      features: [
        'Use these credits in 180 days',
        'Job will be active for 15 days',
        'AI driven matching algorithm',
        'AI-assisted Search',
        'Area wise filter',
      ],
    },
    {
      months: 3,
      price: 1133,
      oldPrice: 6150,
      discount: '45% OFF',
      total: 3399,
      credits: '3 Job credits',
      dbCredits: '150 Database credits',
      duration: '90 days',
      recommended: true,
      features: [
        'Use these credits in 90 days',
        'Job will be active for 15 days',
        'AI driven matching algorithm',
        'AI-assisted Search',
        'Area wise filter',
      ],
    },
    {
      months: 1,
      price: 1799,
      oldPrice: 2700,
      discount: '33% OFF',
      total: 1799,
      credits: '2 Job credits',
      dbCredits: '50 Database credits',
      duration: '30 days',
      features: [
        'Use these credits in 30 days',
        'Job will be active for 15 days',
        'AI driven matching algorithm',
        'AI-assisted Search',
        'Area wise filter',
      ],
    },
    {
      custom: true,
      credits: undefined,
      dbCredits: undefined,
    },
  ],
  // Job posting plans
  [
    {
      months: 6,
      price: 1100,
      oldPrice: 1450,
      discount: '22% OFF',
      total: 6599,
      credits: '13 Job credits',
      dbCredits: undefined,
      features: [
        'Use these credits in 180 days',
        'Job will be active for 15 days',
        'AI driven matching algorithm',
        '15+ Advanced filters',
        'Whatsapp & Call based lead management',
      ],
    },
    {
      months: 3,
      price: 1133,
      oldPrice: 1300,
      discount: '13% OFF',
      total: 3399,
      credits: '6 Job credits',
      dbCredits: undefined,
      duration: '90 days',
      recommended: true,
      features: [
        'Use these credits in 90 days',
        'Job will be active for 15 days',
        'AI driven matching algorithm',
        '15+ Advanced filters',
        'Whatsapp & Call based lead management',
      ],
    },
    {
      months: 1,
      price: 1799,
      oldPrice: 1950,
      discount: '7% OFF',
      total: 1799,
      credits: '3 Job credits',
      dbCredits: undefined,
      duration: '30 days',
      features: [
        'Use these credits in 30 days',
        'Job will be active for 15 days',
        'AI driven matching algorithm',
        '15+ Advanced filters',
        'Whatsapp & Call based lead management',
      ],
    },
    {
      custom: true,
      credits: undefined,
      dbCredits: undefined,
    },
  ],
  // Database plans
  [
    {
      months: 6,
      price: 1100,
      oldPrice: 14000,
      discount: '53% OFF',
      total: 6599,
      credits: undefined,
      dbCredits: '800 Database credits',
      duration: '180 days',
      features: [
        'Use these credits in 180 days',
        'AI-assisted Search',
        'Area wise filter',
      ],
    },
    {
      months: 3,
      price: 1133,
      oldPrice: 6300,
      discount: '46% OFF',
      total: 3399,
      credits: undefined,
      dbCredits: '350 Database credits',
      duration: '90 days',
      recommended: true,
      features: [
        'Use these credits in 90 days',
        'AI-assisted Search',
        'Area wise filter',
      ],
    },
    {
      months: 1,
      price: 1799,
      oldPrice: 2800,
      discount: '36% OFF',
      total: 1799,
      credits: undefined,
      dbCredits: '150 Database credits',
      duration: '30 days',
      features: [
        'Use these credits in 30 days',
        'AI-assisted Search',
        'Area wise filter',
      ],
    },
    {
      custom: true,
      credits: undefined,
      dbCredits: undefined,
    },
  ],
];

const BuyPackageSelection: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen">
      {/* Stepper Bar with Logo and Credits */}
      <div className="w-full border-b bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-[48px]">
            <img src="/assets/ojk-logo.png" alt="OJK Jobs" className="h-10 w-10 rounded" />
          </div>
          {/* Stepper */}
          <div className="flex items-center justify-center gap-4 flex-1">
            <div className="flex flex-col items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-lg">1</span>
              <span className="text-xs text-blue-600 font-semibold mt-1">Select a plan</span>
            </div>
            <div className="w-10 h-0.5 bg-gray-300 mx-2" />
            <div className="flex flex-col items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-400 font-bold text-lg">2</span>
              <span className="text-xs text-gray-400 font-semibold mt-1">Checkout</span>
            </div>
          </div>
          {/* Credits and Close */}
          <div className="flex items-center gap-2 min-w-[180px] justify-end">
            <button className="flex items-center gap-2 text-[#00646e] font-semibold text-base px-3 py-1 rounded hover:bg-gray-100">
              <svg width="24" height="24" fill="none" stroke="#00646e" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="17" rx="8" ry="3"/><ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7"/></svg>
              Available Credits
            </button>
            <button className="ml-2 p-2 rounded hover:bg-gray-100" aria-label="Close" onClick={() => setShowOfferModal(true)}>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Heading and Sub-link */}
      <div className="max-w-4xl mx-auto flex flex-col items-center mt-8 mb-4">
        <h1 className="text-4xl font-bold text-[#183b56] text-center mb-2">Recruitment made easy with Apna</h1>
        <button onClick={() => setShowCreditsPopup(true)} className="text-blue-700 underline font-medium text-base mb-4">View how credits works</button>
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
          className="w-full rounded-xl shadow-md object-cover"
          style={{ minHeight: '120px', maxHeight: '200px' }}
        />
      </div>

      {/* Offer Modal Popup */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative animate-fadeIn">
            <button className="absolute top-4 left-4 p-1 rounded hover:bg-gray-100" aria-label="Close" onClick={() => setShowOfferModal(false)}>
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="flex flex-col items-center mt-2">
              {/* Icon */}
              <div className="mb-2">
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="70" height="70" rx="16" fill="#FFF7D6"/>
                  <text x="18" y="40" fontSize="32" fontWeight="bold" fill="#222">%</text>
                  <g>
                    <rect x="38" y="18" width="20" height="12" rx="3" fill="#1A73E8"/>
                    <polygon points="58,24 68,28 58,32" fill="#F9AB00"/>
                  </g>
                </svg>
              </div>
              <div className="text-red-600 font-semibold text-base mb-1">Don't miss out the offer!</div>
              <div className="text-2xl font-bold text-gray-800 mb-1 text-center">Save up to 53% OFF</div>
              <div className="text-gray-700 text-center mb-4 text-base">Complete your purchase and get up to 53% OFF on credit plans to hire top talent.</div>
              <button className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded w-full py-2 mb-2 text-base" onClick={() => setShowOfferModal(false)}>Continue buying now</button>
              <button className="text-gray-600 underline text-sm" onClick={() => setShowOfferModal(false)}>No thanks</button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center border-b">
        {plansTabs.map((t, idx) => (
          <button
            key={t.label}
            className={`px-6 py-3 font-semibold text-base border-b-2 transition-colors duration-200 ${tab === idx ? 'border-[#1aaf5d] text-[#1aaf5d]' : 'border-transparent text-gray-700 hover:text-[#1aaf5d]'}`}
            onClick={() => setTab(idx)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Plans */}
      <div className="flex flex-wrap justify-center gap-4 py-8">
        {plansData[tab].map((plan, idx) => (
          plan.custom ? (
            <div key={idx} className="w-64 bg-white border rounded-lg p-6 flex flex-col items-center justify-between min-h-[400px]">
              <div className="font-bold text-lg mb-2">Custom Solution</div>
              <div className="text-gray-700 mb-2">Make your own personalised plan</div>
              <div className="font-semibold text-xl mb-4">Let's talk</div>
              <button className="border border-gray-400 rounded px-4 py-2 font-semibold mb-4" onClick={() => setShowContactPopup(true)}>Contact Sales</button>
              <ul className="text-sm text-gray-700 space-y-1 text-left w-full">
                <li><b>Dedicated</b> account manager</li>
                <li>Valid up to <b>360 days</b></li>
                <li><b>Multiple logins</b> & Reports</li>
                <li>ATS Integration</li>
                <li>Company <b>branding & boosting</b></li>
                <li>Multimedia WhatsApp Invites</li>
              </ul>
            </div>
          ) : (
            <div key={idx} className={`w-64 bg-white border rounded-lg p-6 flex flex-col items-center min-h-[400px] ${plan.recommended ? 'border-2 border-blue-600 shadow-lg relative' : ''}`}>
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-t-lg font-semibold">Recommended for you</div>
              )}
              <div className="font-bold text-lg mb-1">{plan.months} Months</div>
              <div className="text-gray-600 text-sm mb-2">{tab === 0 ? (plan.months === 6 ? 'Best fit for larger hiring needs' : plan.months === 3 ? 'Perfect for growing businesses' : 'Ideal for small teams') : tab === 1 ? (plan.months === 6 ? 'Best fit for larger hiring needs' : plan.months === 3 ? 'Perfect for growing businesses' : 'Ideal for small teams') : (plan.months === 6 ? 'Best fit for larger hiring needs' : plan.months === 3 ? 'Perfect for growing businesses' : 'Ideal for small teams')}</div>
              <div className="text-2xl font-bold mb-1">₹{plan.price}<span className="text-base font-normal">/Month</span></div>
              <div className="text-gray-500 line-through text-sm">₹{plan.oldPrice}</div>
              <div className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold rounded px-2 py-0.5 mb-2">{plan.discount}</div>
              <button
                className="bg-[#1aaf5d] text-white font-semibold rounded w-full py-2 mb-3"
                onClick={() => {
                  navigate('/Employer/BuyPackageCheckout', {
                    state: {
                      plan: {
                        months: plan.months,
                        price: plan.price,
                        oldPrice: plan.oldPrice,
                        discount: plan.discount,
                        total: plan.total,
                        credits: plan.credits,
                        dbCredits: plan.dbCredits,
                        duration: plan.duration,
                        features: plan.features,
                        tab: tab,
                      }
                    }
                  });
                }}
              >
                Buy Now
              </button>
              <ul className="text-sm text-gray-700 space-y-1 text-left w-full mb-2">
                {typeof plan.credits !== 'undefined' && plan.credits && <li>{plan.credits}</li>}
                {typeof plan.dbCredits !== 'undefined' && plan.dbCredits && <li>{plan.dbCredits}</li>}
                {plan.duration && <li>Use these credits in <b>{plan.duration}</b></li>}
                {(plan.features ?? []).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )
        ))}
      </div>
      <div className="text-xs text-gray-500 text-center mt-2">*All plans prices are shown excluding applicable taxes.</div>
      <BuyPackageTestimonials/>
      <BuyPackageFAQ/>
      <ContactPopup open={showContactPopup} onClose={() => setShowContactPopup(false)} />
    </div>
    
  );
};

export default BuyPackageSelection;

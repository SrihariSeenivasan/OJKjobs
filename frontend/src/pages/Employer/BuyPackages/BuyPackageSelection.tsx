import { BadgePercent, CheckCircle, Info, Star, User2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from '../Common/ContactPopup';
import BuyPackageFAQ from './BuyPackageFAQ';
import BuyPackageTestimonials from './BuyPackageTestimonials';
import CreditsWorksPopup from './CreditsWorksPopup';
import StepperBar from './StepperBar';

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

      {/* Tabs */}
      <div className="flex justify-center border-b border-[#fbb040]/30 bg-white">
        {plansTabs.map((t, idx) => (
          <button
            key={t.label}
            className={`px-6 py-3 font-semibold text-base border-b-2 transition-colors duration-200 ${tab === idx ? 'border-[#fbb040] text-[#fbb040] bg-[#FFF7E0]' : 'border-transparent text-gray-700 hover:text-[#b97a13] hover:bg-[#FFF7E0]'}`}
            onClick={() => setTab(idx)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Plans inside a frame */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="bg-white/90 border border-[#fbb040]/30 rounded-3xl shadow-2xl p-4 sm:p-8 mt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plansData[tab].map((plan, idx) => (
              plan.custom ? (
            <div
              key={idx}
              className="relative flex flex-col items-center justify-between min-h-[420px] bg-gradient-to-br from-[#fff7e0] to-[#ffe6b3] border-2 border-dashed border-[#fbb040]/40 rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#fbb040] text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-1 animate-bounce">
                <User2 size={16} /> Custom
              </div>
              <div className="text-center mt-6">
                <h3 className="font-bold text-2xl mb-2 text-[#b97a13]">Custom Solution</h3>
                <p className="text-gray-600 mb-4">Make your own personalised plan</p>
                <div className="font-bold text-2xl mb-6 text-[#fbb040]">Let's talk</div>
                <button
                  className="bg-gradient-to-r from-[#fbb040] to-[#e09a36] text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mb-6"
                  onClick={() => setShowContactPopup(true)}
                >
                  <Info size={18} /> Contact Sales
                </button>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 text-left w-full mt-2">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /><span><strong>Dedicated</strong> account manager</span></li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /><span>Valid up to <strong>360 days</strong></span></li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /><span><strong>Multiple logins</strong> & Reports</span></li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /><span>ATS Integration</span></li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /><span>Company <strong>branding & boosting</strong></span></li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /><span>Multimedia WhatsApp Invites</span></li>
              </ul>
            </div>
          ) : (
            <div
              key={idx}
              className={`relative flex flex-col min-h-[420px] bg-white rounded-3xl p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] border-2 ${plan.recommended ? 'border-[#fbb040] ring-4 ring-[#fbb040]/20' : 'border-[#fbb040]/10 hover:border-[#fbb040]/40'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#fbb040] to-[#e09a36] text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-1 animate-pulse">
                  <Star size={16} /> Recommended
                </div>
              )}
              <div className="text-center mb-6 mt-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle size={20} className="text-[#fbb040]" />
                  <h3 className="font-bold text-xl text-gray-800">{typeof plan.months === 'number' ? `${plan.months} Month${plan.months > 1 ? 's' : ''}` : ''}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {tab === 0
                    ? plan.months === 6
                      ? 'Best fit for larger hiring needs'
                      : plan.months === 3
                        ? 'Perfect for growing businesses'
                        : 'Ideal for small teams'
                    : tab === 1
                      ? plan.months === 6
                        ? 'Best fit for larger hiring needs'
                        : plan.months === 3
                          ? 'Perfect for growing businesses'
                          : 'Ideal for small teams'
                      : plan.months === 6
                        ? 'Best fit for larger hiring needs'
                        : plan.months === 3
                          ? 'Perfect for growing businesses'
                          : 'Ideal for small teams'}
                </p>
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-[#fbb040]">₹{plan.price}</span>
                    <span className="text-base text-gray-500">/Month</span>
                  </div>
                  <div className="text-gray-400 line-through text-sm">₹{plan.oldPrice}</div>
                  <div className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-semibold rounded-full px-3 py-1 mt-2 shadow-md">
                    {plan.discount}
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-[#fbb040] to-[#e09a36] hover:from-[#e09a36] hover:to-[#d08a2f] text-white font-semibold rounded-2xl w-full py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 justify-center group-hover:animate-pulse"
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
                  <BadgePercent size={18} /> Buy Now
                </button>
              </div>
              <div className="flex-1">
                <ul className="space-y-3 text-sm text-gray-700">
                  {plan.credits && (
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#fbb040] rounded-full flex-shrink-0"></div>
                      <span className="font-semibold">{plan.credits}</span>
                    </li>
                  )}
                  {plan.dbCredits && (
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#fbb040] rounded-full flex-shrink-0"></div>
                      <span className="font-semibold">{plan.dbCredits}</span>
                    </li>
                  )}
                  {plan.duration && (
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#fbb040] rounded-full flex-shrink-0"></div>
                      <span>Use these credits in <b>{plan.duration}</b></span>
                    </li>
                  )}
                  {(plan.features ?? []).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
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

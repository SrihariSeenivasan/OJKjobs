import React from 'react';

const candidatePlans = [
  {
    name: 'Free Plan',
    price: 0,
    features: 'Build your profile, upload CV, and apply to selected jobs as per employer’s settings',
  },
  {
    name: 'Premium Access',
    price: 199,
    features: 'Apply to all active jobs without restrictions for 30 days',
  },
];

const CandidatePlanSelection: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7FAE0] flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold text-[#4F8CC9] mb-6">For Candidates</h2>
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-3 bg-[#A3C86D] rounded-t-lg">
          <div className="py-3 px-4 font-bold text-white text-lg">Plan</div>
          <div className="py-3 px-4 font-bold text-white text-lg">Price</div>
          <div className="py-3 px-4 font-bold text-white text-lg">Features</div>
        </div>
        {candidatePlans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`grid grid-cols-3 border border-[#D3E6B5] ${idx === 0 ? 'bg-[#F3F8E6]' : 'bg-white'} items-center`}
          >
            <div className="py-4 px-4 font-bold text-lg text-[#253858]">{plan.name}</div>
            <div className="py-4 px-4 font-bold text-lg text-[#253858]">₹{plan.price}</div>
            <div className="py-4 px-4 text-[#253858] text-base">{plan.features}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatePlanSelection;

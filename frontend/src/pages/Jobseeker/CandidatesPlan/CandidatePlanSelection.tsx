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
      <h2 className="text-2xl font-bold text-[#7BAA3C] mb-6">For Candidates</h2>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {candidatePlans.map((plan) => (
            <div key={plan.name} className="border border-[#A3C86D] rounded-2xl bg-[#F3F8E6] p-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group flex flex-col min-h-[260px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-2xl" style={{ color: '#39b54a' }}>{plan.name}</h2>
                <span className="text-xl font-bold" style={{ color: '#39b54a' }}>₹{plan.price}</span>
              </div>
              <div className="text-[#3A5A1A] text-base mb-4">{plan.features}</div>
              <div className="flex-1" />
              <button className="w-full bg-[#A3C86D] hover:bg-[#7BAA3C] text-white font-semibold rounded-xl py-2 text-base mt-2 transition-all duration-200" style={{marginTop: 'auto'}}>Choose {plan.name}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatePlanSelection;

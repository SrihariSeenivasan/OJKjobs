import React, { useState } from 'react';

const CreditWorkfaqs = [
  {
    q: 'How should I use these credits?',
    a: 'Credits can be used for job posting and unlocking candidate profiles. Use them as per your hiring needs.'
  },
  {
    q: 'What is the validity of credits? Can I extend them?',
    a: 'Credits are valid for a specific period as per your plan. Extension depends on the plan terms.'
  },
  {
    q: 'How to get an Invoice?',
    a: 'You can download invoices from your dashboard or contact support for assistance.'
  },
  {
    q: 'How to add GST to invoices?',
    a: 'Add your GST details in your profile before making a purchase to get GST on invoices.'
  },
];

const BuyPackageFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently asked questions</h2>
      <div className="divide-y border rounded-lg bg-white">
        {CreditWorkfaqs.map((faq, idx) => (
          <div key={idx}>
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <span>{faq.q}</span>
              <svg className={`w-5 h-5 ml-2 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {openFaq === idx && (
              <div className="px-4 pb-4 text-gray-700 text-sm bg-gray-50">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyPackageFAQ;

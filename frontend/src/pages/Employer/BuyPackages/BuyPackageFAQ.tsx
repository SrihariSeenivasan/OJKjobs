import React, { useEffect, useState } from 'react';
import { FAQ, getFAQs } from '../../admin/faqStore';

const BuyPackageFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    setFaqs(getFAQs('employer'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-2 sm:px-4">
      <div className="bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#fbb040]">Frequently asked questions</h2>
        <div className="divide-y divide-[#fbb040]/20 border border-[#fbb040]/20 rounded-lg bg-[#fff7e0]">
          {faqs.length === 0 ? (
            <div className="px-4 py-6 text-gray-500 text-center">No FAQs available.</div>
          ) : faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-[#b97a13] hover:bg-[#ffe6b3] focus:outline-none transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <svg className={`w-5 h-5 ml-2 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-gray-700 text-sm bg-[#fff7e0] border-l-4 border-[#fbb040]">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyPackageFAQ;

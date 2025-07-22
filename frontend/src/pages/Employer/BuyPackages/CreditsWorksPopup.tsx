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

const CreditsWorksPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button className="absolute top-4 right-4 p-2 rounded hover:bg-gray-100 z-10" aria-label="Close" onClick={onClose}>
          <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6" style={{ scrollbarWidth: 'thin' }}>
          {/* What are Credits? */}
          <div className="relative bg-[#fffbe6] rounded-lg p-6 mb-6">
            {/* Yellow Circles */}
            <div className="absolute left-0 top-0 flex flex-wrap gap-2">
              <span className="block w-8 h-8 bg-yellow-200 rounded-full opacity-70" style={{margin:'8px'}}></span>
              <span className="block w-6 h-6 bg-yellow-200 rounded-full opacity-50" style={{margin:'2px'}}></span>
              <span className="block w-4 h-4 bg-yellow-200 rounded-full opacity-40" style={{margin:'2px'}}></span>
            </div>
            <div className="absolute right-0 bottom-0 flex flex-wrap gap-2">
              <span className="block w-8 h-8 bg-yellow-200 rounded-full opacity-70" style={{margin:'8px'}}></span>
              <span className="block w-6 h-6 bg-yellow-200 rounded-full opacity-50" style={{margin:'2px'}}></span>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2 mt-2">What are Credits?</h2>
            <p className="text-center text-gray-700 max-w-xl mx-auto">Credits are the virtual currencies in apna to make any transactions on platform. Credits are charged each time you do job posting and unlock candidate profiles from database.</p>
          </div>

          {/* Credit Types */}
          <h3 className="text-xl font-bold text-center mb-4">Credit types</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Job Credits */}
            <div className="flex-1 bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Job Credits</h4>
              <ul className="text-sm text-gray-700 mb-2 list-disc list-inside">
                <li>Job credits are charged for all type of job postings (e.g. Classic, Premium and Super Premium).</li>
                <li>1 Job Credit = 1 Classic job</li>
                <li>2 Job Credits = 1 Premium job</li>
                <li>4 Job Credits = 1 Super Premium job</li>
                <li>1 Premium Job + AI Calling Agent = 1 AI Job Calling credit</li>
              </ul>
            </div>
            {/* Database Credits */}
            <div className="flex-1 bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Database Credits</h4>
              <ul className="text-sm text-gray-700 mb-2 list-disc list-inside">
                <li>Database credits are used to unlock candidate profiles from the database.</li>
                <li>Each unlock deducts 1 database credit.</li>
              </ul>
            </div>
          </div>

          {/* How it works */}
          <h3 className="text-xl font-bold text-center mb-4">How it works</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-6">
            <div className="flex flex-col items-center">
              <span className="mb-2">
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#FFF7D6"/><path d="M12 28v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#F9AB00" strokeWidth="2"/><circle cx="18" cy="14" r="4" stroke="#F9AB00" strokeWidth="2"/></svg>
              </span>
              <div className="font-semibold text-sm text-center">Buy Credits</div>
              <div className="text-xs text-gray-600 text-center">Check our hiring solutions and choose a plan tailored to your requirement.</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-2">
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#E3F2FD"/><path d="M12 24v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#1976D2" strokeWidth="2"/><rect x="14" y="10" width="8" height="6" rx="2" stroke="#1976D2" strokeWidth="2"/></svg>
              </span>
              <div className="font-semibold text-sm text-center">Use it for..</div>
              <div className="text-xs text-gray-600 text-center">Job posting and searching candidates on apna Database.</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-2">
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#FFF3E0"/><path d="M18 10v8l6 3" stroke="#FF9800" strokeWidth="2"/></svg>
              </span>
              <div className="font-semibold text-sm text-center">Credits gets charged</div>
              <div className="text-xs text-gray-600 text-center">Credits charged on every job posting or profile unlocks in database.</div>
            </div>
          </div>

          {/* FAQ */}
          <h3 className="text-xl font-bold text-center mb-4">Frequently asked questions</h3>
          <div className="divide-y border rounded-lg bg-white mb-2">
            {CreditWorkfaqs.map((CreditWorkfaqs, idx) => (
              <div key={idx}>
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{CreditWorkfaqs.q}</span>
                  <svg className={`w-5 h-5 ml-2 transform transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-gray-700 text-sm bg-gray-50">{CreditWorkfaqs.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsWorksPopup;

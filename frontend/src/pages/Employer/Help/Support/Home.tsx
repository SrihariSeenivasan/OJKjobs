import React, { useState } from 'react';

const helpCards = [
  {
    title: 'Job Activation',
    img: '/public/assets/ojk-logo.png',
    desc: 'Job Activation',
  },
  {
    title: 'apnaHire',
    img: '/public/assets/ojk-logo.png',
    desc: 'apnaHire',
  },
  {
    title: 'apnaDatabase',
    img: '/public/assets/ojk-logo.png',
    desc: 'apnaDatabase',
  },
  {
    title: 'apnaCredits and Payments',
    img: '/public/assets/ojk-logo.png',
    desc: 'apnaCredits and Payments',
  },
  {
    title: 'Enterprise Account',
    img: '/public/assets/ojk-logo.png',
    desc: 'Enterprise Account',
  },
  {
    title: 'Additional FAQs',
    img: '/public/assets/ojk-logo.png',
    desc: 'Additional FAQs',
  },
];

const SupportHome: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src="/assets/ojk-logo.png" alt="OJK Jobs" className="h-8 w-auto" />
              <div className="hidden md:flex gap-6 text-gray-800 font-medium text-base">
                <button className="hover:text-[#2DC6A8] bg-transparent border-none p-0" onClick={() => {}}>Post Job</button>
                <button className="hover:text-[#2DC6A8] bg-transparent border-none p-0" onClick={() => {}}>Start Hiring</button>
                <button className="hover:text-[#2DC6A8] bg-transparent border-none p-0" onClick={() => {}}>Renew Job</button>
                <button className="hover:text-[#2DC6A8] bg-transparent border-none p-0" onClick={() => {}}>Job Approval</button>
                <button className="hover:text-[#2DC6A8] bg-transparent border-none p-0" onClick={() => {}}>Apna for Candidates</button>
              </div>
            </div>
            <div className="flex items-center">
              <a href="#" className="bg-[#4B3952] text-white px-6 py-2 rounded-xl font-semibold text-base hidden md:inline-block">Go to OJK JOBS</a>
              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#2DC6A8] focus:outline-none" aria-label="Open main menu" onClick={() => setShowMobileMenu((v: boolean) => !v)}>
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t px-4 pb-4">
            <div className="flex flex-col gap-3 mt-2 text-gray-800 font-medium text-base">
              <button className="hover:text-[#2DC6A8] text-left bg-transparent border-none p-0" onClick={() => {}}>Post Job</button>
              <button className="hover:text-[#2DC6A8] text-left bg-transparent border-none p-0" onClick={() => {}}>Start Hiring</button>
              <button className="hover:text-[#2DC6A8] text-left bg-transparent border-none p-0" onClick={() => {}}>Renew Job</button>
              <button className="hover:text-[#2DC6A8] text-left bg-transparent border-none p-0" onClick={() => {}}>Job Approval</button>
              <button className="hover:text-[#2DC6A8] text-left bg-transparent border-none p-0" onClick={() => {}}>Apna for Candidates</button>
              <button className="bg-[#4B3952] text-white px-6 py-2 rounded-xl font-semibold text-base mt-2 text-left" onClick={() => {}}>Go to OJK JOBS</button>
            </div>
          </div>
        )}
      </nav>


      {/* Search Section */}
      <div className="bg-[#4B3952] py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-6">Hi, how can we help you?</h2>
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter the search term here...."
            className="flex-1 px-6 py-3 rounded-l-lg text-lg border-none focus:outline-none"
          />
          <button className="bg-white px-6 rounded-r-lg flex items-center justify-center">
            <svg width="24" height="24" fill="none" stroke="#4B3952" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
      </div>

      {/* Help Cards */}
      <div className="flex flex-wrap justify-center gap-6 py-12 bg-white">
        {helpCards.map((card, idx) => (
          <div key={idx} className="w-60 bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
            <img src={card.img} alt={card.title} className="h-8 w-auto mb-3" />
            <a href="#" className="text-[#2DC6A8] font-semibold text-sm mb-1">{card.title}</a>
            <div className="font-bold text-gray-800 text-base text-center">{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-4 border-t text-gray-500 text-sm bg-white">
        <span>© 2025 Apna.co</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default SupportHome;

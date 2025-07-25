import React from "react";

// Modal for Company Logo suggestion
interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Company Logo</label>
        <div className="border-2 border-dashed border-[#fbb040] bg-[#FFF7E0] rounded-xl flex flex-col items-center justify-center py-8 mb-2 cursor-pointer transition-all duration-200">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2 text-[#fbb040]"><path d="M12 5v14m7-7H5" stroke="#fbb040" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-[#fbb040] font-medium">Upload a photo</span>
        </div>
        <div className="text-xs text-gray-500 mb-4">Maximum file size 5MB - acceptable file types .jpg, .jpeg, .png.</div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040]/30 text-[#fbb040] border border-[#fbb040]/30 cursor-not-allowed" disabled>Submit</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Social Profiles suggestion
const SocialSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-[#b97a13]"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-7 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 8.25h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3.5h-3v-7h3v1.08c.41-.63 1.17-1.08 2-1.08 1.66 0 3 1.34 3 3v4z" fill="#fbb040"/></svg>LinkedIn</label>
            <input type="text" className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 bg-[#FFF7E0]" placeholder="https://linkedin.com/company/companyname" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-[#b97a13]"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h21.351c.732 0 1.324-.592 1.324-1.324v-21.351c0-.733-.592-1.325-1.324-1.325zm-13.538 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 8.25h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3.5h-3v-7h3v1.08c.41-.63 1.17-1.08 2-1.08 1.66 0 3 1.34 3 3v4z" fill="#fbb040"/></svg>Facebook</label>
            <input type="text" className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 bg-[#FFF7E0]" placeholder="https://facebook.com/username" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-[#b97a13]"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.326-3.678 1.317-.991.991-1.259 2.402-1.317 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.326 2.687 1.317 3.678.991.991 2.402 1.259 3.678 1.317 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.326 3.678-1.317.991-.991 1.259-2.402 1.317-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.326-2.687-1.317-3.678-.991-.991-2.402-1.259-3.678-1.317-1.28-.058-1.688-.07-4.947-.07z" fill="#fbb040"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" fill="#fbb040"/></svg>Instagram</label>
            <input type="text" className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 bg-[#FFF7E0]" placeholder="https://instagram.com/username" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040]/30 text-[#fbb040] border border-[#fbb040]/30 cursor-not-allowed" disabled>Submit</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Description suggestion
const DescriptionSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Description</label>
        <textarea className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0] text-gray-700" rows={5} maxLength={2000} defaultValue={"Bot Digital Solutions Private Limited, established in Mumbai in March 2024, is a private company involved in advertising and market research. It focuses on providing digital solutions to enhance business growth, increase sales, and promote online presence. The company is registered with an authorized share capital of ₹15,00,000 and a paid-up capita..."}></textarea>
        <div className="text-xs text-gray-500 mb-4 text-right">365/2000</div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
};



// Modal for Industry suggestion
const IndustrySuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  const industries = [
    "Advertising & Marketing",
    "Beverage",
    "Biotech",
    "BPO / Call Centre",
    "Building Material",
    "Chemicals",
    "Consumer Electronics & Appliances",
    "Content Development / Language",
    "Diagnostics",
    "FinTech / Payments",
    "Import & Export"
    // ...add more as needed
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Industry</label>
        <select className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0]">
          <option value="">Choose your company Industry</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Type suggestion
const TypeSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  const types = [
    "Government agency",
    "Private Limited company",
    "Public Limited company",
    "Individual/Self-employed",
    "Non-profit (NGO)",
    "Educational"
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Type of company</label>
        <select className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0]">
          <option value="">Choose your company type</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
        
  
};

// Modal for Size suggestion
const SizeSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  const sizes = [
    "1 employee",
    "2-10 employees",
    "11-50 employees",
    "51-100 employees",
    "101-300 employees",
    "301-500 employees"
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Company size</label>
        <select className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0]">
          <option value="">Choose your company size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Website suggestion
const WebsiteSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Website</label>
        <input type="text" className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0]" placeholder="e.g. https://company.com" />
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Founded suggestion
const FoundedSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  const foundedOptions = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2010-2014",
    "2000-2009",
    "Before 2000"
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Founded</label>
        <select className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0]">
          <option value="">Choose year founded</option>
          {foundedOptions.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
};

// Modal for Name suggestion
const NameSuggestionModal: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#fbb040]/30">
        <button className="absolute top-4 right-4 text-[#fbb040] hover:text-orange-500 text-2xl font-bold" onClick={onClose} aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#253858]">Make a suggestion</h2>
        <label className="block text-sm font-medium mb-2 text-[#b97a13]">Company Name</label>
        <input type="text" className="w-full border border-[#fbb040]/30 rounded-xl px-4 py-2 mb-2 bg-[#FFF7E0]" placeholder="e.g. Bot Digital Solutions Private Limited" />
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-[#FFF7E0] text-[#b97a13] border border-[#fbb040]/30 hover:bg-[#fbb040]/10 transition-all duration-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-[#fbb040] text-white border border-[#fbb040] hover:bg-orange-500 transition-all duration-200">Submit</button>
        </div>
      </div>
    </div>
  );
};

export {
  DescriptionSuggestionModal, FoundedSuggestionModal, IndustrySuggestionModal, LogoSuggestionModal, NameSuggestionModal, SizeSuggestionModal, SocialSuggestionModal, TypeSuggestionModal, WebsiteSuggestionModal
};


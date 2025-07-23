import React, { useState } from "react";
import {
    DescriptionSuggestionModal,
    FoundedSuggestionModal,
    IndustrySuggestionModal,
    LogoSuggestionModal,
    NameSuggestionModal,
    SizeSuggestionModal,
    SocialSuggestionModal,
    TypeSuggestionModal,
    WebsiteSuggestionModal
} from "./SuggestionModals";


const CompanyProfile: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpen = (modal: string) => setOpenModal(modal);
  const handleClose = () => setOpenModal(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#253858] mb-4">Company profile</h2>
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-3 mb-4 flex items-center text-yellow-900 text-sm">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-2"><circle cx="12" cy="12" r="10" fill="#fde68a"/><path d="M12 8v4l3 3" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Please share company information to improve job seekers trust. Update <span className="font-bold mx-1">6 information</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#253858] mb-4">Basic details</h3>
          <div className="flex items-center mb-6">
            <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">BD</div>
            <span className="text-sm text-gray-500">Company Logo</span>
            <button className="ml-auto text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("logo")}> 
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Suggest
            </button>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">Company name</div>
                <div className="font-medium text-[#253858]">Bot Digital Solutions Private Limited</div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("name")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">Founded</div>
                <div className="text-gray-400 text-sm">Not available</div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("founded")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">Website</div>
                <div className="text-gray-400 text-sm">Not available</div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("website")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">Company size</div>
                <div className="text-gray-400 text-sm">Not available</div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("size")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">Type of company</div>
                <div className="text-gray-400 text-sm">Not available</div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("type")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">Industry</div>
                <div className="font-medium text-[#253858]">Advertising & Marketing</div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("industry")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 8v4l3 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-gray-700 text-sm">About Company</div>
                <div className="text-gray-700 text-sm max-w-md">Bot Digital Solutions Private Limited, established in Mumbai in March 2024, is a private company involved in advertising and market research. It focuses on providing digital solutions to enhance business growth, increase sales, and promote online presence. The company is registered with an authorized share capital of ₹15,00,000 and a paid-up capita... <span className="text-blue-600 cursor-pointer hover:underline">Read more</span></div>
              </div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline" onClick={() => handleOpen("description")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 8v4l3 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-[#253858] mb-4">Social profiles</h3>
          <div className="border-t pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 py-2">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-7 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 8.25h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3.5h-3v-7h3v1.08c.41-.63 1.17-1.08 2-1.08 1.66 0 3 1.34 3 3v4z" fill="#0A66C2"/></svg>
                <span className="text-gray-700 text-sm">LinkedIn</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h21.351c.732 0 1.324-.592 1.324-1.324v-21.351c0-.733-.592-1.325-1.324-1.325zm-13.538 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 8.25h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3.5h-3v-7h3v1.08c.41-.63 1.17-1.08 2-1.08 1.66 0 3 1.34 3 3v4z" fill="#1877F2"/></svg>
                <span className="text-gray-700 text-sm">Facebook</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.326-3.678 1.317-.991.991-1.259 2.402-1.317 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.326 2.687 1.317 3.678.991.991 2.402 1.259 3.678 1.317 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.326 3.678-1.317.991-.991 1.259-2.402 1.317-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.326-2.687-1.317-3.678-.991-.991-2.402-1.259-3.678-1.317-1.28-.058-1.688-.07-4.947-.07z" fill="#E1306C"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" fill="#E1306C"/></svg>
                <span className="text-gray-700 text-sm">Instagram</span>
              </div>
              <div className="flex-1"></div>
              <button className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline sm:ml-0 ml-2 sm:mt-0 mt-2" onClick={() => handleOpen("social")}> 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M12 8v4l3 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Suggest
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        {openModal === "logo" && <LogoSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "social" && <SocialSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "description" && <DescriptionSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "industry" && <IndustrySuggestionModal open={true} onClose={handleClose} />}
        {openModal === "type" && <TypeSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "size" && <SizeSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "website" && <WebsiteSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "founded" && <FoundedSuggestionModal open={true} onClose={handleClose} />}
        {openModal === "name" && <NameSuggestionModal open={true} onClose={handleClose} />}
      </div>
    </div>
  );
};

export default CompanyProfile;

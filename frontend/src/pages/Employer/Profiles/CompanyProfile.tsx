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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E0] via-[#FFFBF0] to-[#FFF4D6] py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with enhanced styling */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#fbb040] to-[#f59e0b] bg-clip-text text-transparent mb-4 tracking-tight">
            Company profile
          </h2>
          
          {/* Enhanced notification banner */}
          <div className="bg-gradient-to-r from-[#FFF7E0] to-[#FFFBF0] border-2 border-[#fbb040]/40 rounded-xl px-6 py-4 mb-6 flex items-center text-[#fbb040] text-sm shadow-lg backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-300">
            <div className="bg-gradient-to-br from-[#fde68a] to-[#fbbf24] rounded-full p-2 mr-4 shadow-md">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none"/>
                <path d="M12 8v4l3 3" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <span className="font-medium">Please share company information to improve job seekers trust.</span>
              <span className="ml-2">Update <span className="font-bold bg-[#fbb040] text-white px-2 py-1 rounded-md">6 information</span></span>
            </div>
          </div>
        </div>

        {/* Enhanced Basic Details Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#fbb040]/20 p-8 mb-8 hover:shadow-2xl transition-all duration-500 hover:border-[#fbb040]/40">
          <h3 className="text-xl font-bold text-[#fbb040] mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-[#fbb040] to-[#f59e0b] rounded-full mr-3"></div>
            Basic details
          </h3>
          
          {/* Enhanced Logo Section */}
          <div className="flex items-center mb-8 p-4 bg-gradient-to-r from-[#FFF7E0]/50 to-transparent rounded-xl">
            <div className="bg-gradient-to-br from-[#fbb040] to-[#f59e0b] text-white rounded-2xl w-16 h-16 flex items-center justify-center font-bold text-xl mr-6 shadow-lg transform hover:rotate-3 transition-transform duration-300">
              BD
            </div>
            <span className="text-sm text-gray-600 font-medium">Company Logo</span>
            <button 
              className="ml-auto bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
              onClick={() => handleOpen("logo")}
            > 
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Suggest
            </button>
          </div>
          
          <div className="border-t border-gray-100 pt-6 space-y-1">
            {/* Company Name */}
            <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-1">Company name</div>
                <div className="font-semibold text-[#253858] text-lg">Bot Digital Solutions Private Limited</div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
                onClick={() => handleOpen("name")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
            
            {/* Founded */}
            <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-1">Founded</div>
                <div className="text-gray-400 text-sm italic">Not available</div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
                onClick={() => handleOpen("founded")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
            
            {/* Website */}
            <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-1">Website</div>
                <div className="text-gray-400 text-sm italic">Not available</div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
                onClick={() => handleOpen("website")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
            
            {/* Company Size */}
            <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-1">Company size</div>
                <div className="text-gray-400 text-sm italic">Not available</div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
                onClick={() => handleOpen("size")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
            
            {/* Type of Company */}
            <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-1">Type of company</div>
                <div className="text-gray-400 text-sm italic">Not available</div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
                onClick={() => handleOpen("type")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 7v5m0 0v5m0-5h5m-5 0H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
            
            {/* Industry */}
            <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-1">Industry</div>
                <div className="font-semibold text-[#253858] bg-gradient-to-r from-[#fbb040]/10 to-[#f59e0b]/10 px-3 py-1 rounded-full inline-block">Advertising & Marketing</div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300" 
                onClick={() => handleOpen("industry")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
            
            {/* About Company */}
            <div className="flex items-start justify-between py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              <div className="flex-1 mr-4">
                <div className="text-gray-600 text-sm font-medium mb-2">About Company</div>
                <div className="text-gray-700 text-sm leading-relaxed max-w-2xl bg-gray-50 p-4 rounded-lg border-l-4 border-[#fbb040]">
                  Bot Digital Solutions Private Limited, established in Mumbai in March 2024, is a private company involved in advertising and market research. It focuses on providing digital solutions to enhance business growth, increase sales, and promote online presence. The company is registered with an authorized share capital of ₹15,00,000 and a paid-up capita... 
                  <span className="text-blue-600 cursor-pointer hover:underline font-medium ml-1">Read more</span>
                </div>
              </div>
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-8" 
                onClick={() => handleOpen("description")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Suggest
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Social Profiles Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#fbb040]/20 p-8 hover:shadow-2xl transition-all duration-500 hover:border-[#fbb040]/40">
          <h3 className="text-xl font-bold text-[#fbb040] mb-6 flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-[#fbb040] to-[#f59e0b] rounded-full mr-3"></div>
            Social profiles
          </h3>
          
          <div className="border-t border-gray-100 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 py-4 px-4 rounded-xl hover:bg-[#FFF7E0]/30 transition-all duration-300 group">
              {/* Social Media Icons */}
              <div className="flex flex-wrap items-center gap-6 mb-4 sm:mb-0">
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="bg-[#0A66C2] p-2 rounded-lg">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-7 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 8.25h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3.5h-3v-7h3v1.08c.41-.63 1.17-1.08 2-1.08 1.66 0 3 1.34 3 3v4z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">LinkedIn</span>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="bg-[#1877F2] p-2 rounded-lg">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h21.351c.732 0 1.324-.592 1.324-1.324v-21.351c0-.733-.592-1.325-1.324-1.325zm-13.538 19h-3v-7h3v7zm-1.5-8.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm10.5 8.25h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3.5h-3v-7h3v1.08c.41-.63 1.17-1.08 2-1.08 1.66 0 3 1.34 3 3v4z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Facebook</span>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-100 px-4 py-2 rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-r from-[#E1306C] to-[#C13584] p-2 rounded-lg">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.326-3.678 1.317-.991.991-1.259 2.402-1.317 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.326 2.687 1.317 3.678.991.991 2.402 1.259 3.678 1.317 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.326 3.678-1.317.991-.991 1.259-2.402 1.317-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.326-2.687-1.317-3.678-.991-.991-2.402-1.259-3.678-1.317-1.28-.058-1.688-.07-4.947-.07z"/>
                      <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Instagram</span>
                </div>
              </div>
              
              <div className="flex-1"></div>
              
              <button 
                className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] text-white px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300 sm:ml-0 ml-2 sm:mt-0 mt-2" 
                onClick={() => handleOpen("social")}
              > 
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)"/>
                  <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
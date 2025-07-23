import React from "react";
import { useNavigate } from "react-router-dom";

interface ProfilePopupProps {
  open: boolean;
  onClose: () => void;
  name: string;
  phone: string;
  onViewProfile: () => void;
  onCompanyProfile: () => void;
  onSignOut: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ open, onClose, name, phone, onViewProfile, onCompanyProfile, onSignOut }) => {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg max-w-xs w-full relative" style={{ position: 'absolute', top: '4px', right: '0', zIndex: 100 }}>
      {/* Pointer triangle */}
      <div style={{ position: 'absolute', top: '-12px', right: '32px', width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '12px solid #fff', zIndex: 101 }} />
      <button
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-blue-500 rounded bg-white text-xl text-gray-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="5" y1="5" x2="15" y2="15" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="5" x2="5" y2="15" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex flex-col items-center pt-6 pb-2">
        <div className="bg-[#4B234A] rounded-full w-12 h-12 flex items-center justify-center font-bold text-white text-xl mb-2">E</div>
        <div className="font-semibold text-lg text-[#253858]">{name}</div>
        <div className="text-gray-500 text-sm mb-2">{phone}</div>
      </div>
      <hr className="mb-2" />
      <div className="flex flex-col gap-1 px-4 pb-4">
        <button
          className="flex items-center gap-2 py-2 text-[#253858] hover:bg-gray-100 rounded font-medium text-base"
          onClick={() => {
            onViewProfile?.();
            navigate("/Employer/Profile");
            onClose();
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#253858"/></svg>
          View profile
        </button>
        <button className="flex items-center gap-2 py-2 text-[#253858] hover:bg-gray-100 rounded font-medium text-base" onClick={() => {
            onCompanyProfile?.();
            navigate("/Employer/CompanyProfile");
            onClose();
          }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm4 0h2v-2H7v2zm0-4h2v-2H7v2zm4 4h2v-2h-2v2zm0-4h2v-2h-2v2zm4 4h2v-2h-2v2zm0-4h2v-2h-2v2z" fill="#253858"/><path d="M21 7V5c0-1.1-.9-2-2-2H5C3.9 3 3 3.9 3 5v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z" fill="#253858"/></svg>
          Company profile
        </button>
        <button className="flex items-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded font-medium text-base" onClick={onSignOut}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 13v-2H7v2h9zm-1-9h-6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-4h-2v4H7V6h8v4h2V6c0-1.1-.9-2-2-2z" fill="#e11d48"/></svg>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;

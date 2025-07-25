import { Building2, LogOut, User, X } from "lucide-react";
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
    <div
      className="bg-white backdrop-blur-md border border-[#fbb040]/30 rounded-2xl shadow-2xl max-w-xs w-full relative"
      style={{ position: 'absolute', top: '4px', right: '0', zIndex: 100 }}
    >
      {/* Pointer triangle */}
      <div
        style={{
          position: 'absolute',
          top: '-12px',
          right: '32px',
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderBottom: '12px solid #FFF7E0',
          zIndex: 101,
        }}
      />
      <button
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border border-[#fbb040] rounded-full bg-[#FFF7E0] text-xl text-[#b97a13] hover:bg-[#fbb040] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#fbb040] transition-all duration-200"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} stroke="currentColor" strokeWidth={2} />
      </button>
      <div className="flex flex-col items-center pt-8 pb-3 px-4">
        <div className="bg-gradient-to-br from-[#fbb040] to-orange-400 shadow-lg rounded-full w-16 h-16 flex items-center justify-center font-bold text-white text-2xl mb-2 border-4 border-white">
          {name?.[0] || 'E'}
        </div>
        <div className="font-semibold text-lg text-[#253858] text-center break-words w-full">{name}</div>
        <div className="text-gray-500 text-sm mb-2 text-center w-full">{phone}</div>
      </div>
      <hr className="mb-2 border-[#fbb040]/20" />
      <div className="flex flex-col gap-2 px-2 sm:px-4 pb-4">
        <button
          className="flex items-center gap-2 py-2 px-2 sm:px-3 text-[#253858] hover:bg-[#FFF7E0] active:bg-[#fbb040]/20 rounded-xl font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040]"
          onClick={() => {
            onViewProfile?.();
            navigate("/Employer/Profile");
            onClose();
          }}
        >
          <User size={20} stroke="#253858" strokeWidth={2} />
          <span className="truncate">View profile</span>
        </button>
        <button
          className="flex items-center gap-2 py-2 px-2 sm:px-3 text-[#253858] hover:bg-[#FFF7E0] active:bg-[#fbb040]/20 rounded-xl font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040]"
          onClick={() => {
            onCompanyProfile?.();
            navigate("/Employer/CompanyProfile");
            onClose();
          }}
        >
          <Building2 size={20} stroke="#253858" strokeWidth={2} />
          <span className="truncate">Company profile</span>
        </button>
        <button
          className="flex items-center gap-2 py-2 px-2 sm:px-3 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
          onClick={onSignOut}
        >
          <LogOut size={20} stroke="#e11d48" strokeWidth={2} />
          <span className="truncate">Sign out</span>
        </button>
      </div>
      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 480px) {
          .max-w-xs { max-width: 95vw !important; }
        }
      `}</style>
    </div>
  );
};

export default ProfilePopup;

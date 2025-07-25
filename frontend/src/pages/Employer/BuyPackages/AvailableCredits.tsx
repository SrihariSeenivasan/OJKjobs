import React from "react";
import { useNavigate } from "react-router-dom";

interface AvailableCreditsProps {
  open: boolean;
  onClose: () => void;
  jobCredits?: number;
  dbCredits?: number;
}

const AvailableCredits: React.FC<AvailableCreditsProps> = ({ open, onClose, jobCredits = 0, dbCredits = 0 }) => {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="bg-white/90 border border-[#fbb040]/30 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full relative" style={{ position: 'absolute', top: '5px', right: '0', zIndex: 100 }}>
      {/* Pointer triangle */}
      <div style={{ position: 'fixed', top: '-10px', right: '32px', width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: '12px solid #fff7e0', zIndex: 101 }} />
      <button
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#fff7e0] text-xl text-[#b97a13] hover:bg-[#fbb040]/20 focus:outline-none focus:ring-2 focus:ring-[#fbb040]"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="#b97a13" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>

      <div className="text-2xl font-bold text-[#fbb040] mb-6 text-center">Available Credits</div>
      <div className="flex flex-col gap-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#fbb040] rounded-lg p-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="3" fill="#fff7e0"/><rect x="4" y="6" width="16" height="12" rx="3" stroke="#fbb040" strokeWidth="2"/><rect x="8" y="10" width="8" height="2" rx="1" fill="#fbb040"/></svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#b97a13]">{jobCredits}</div>
            <div className="text-[#b97a13] text-base flex items-center gap-1">Job Credits <span className="ml-1 cursor-pointer" title="Job credits info"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fbb040" strokeWidth="2"/><text x="8" y="16" fontSize="12" fill="#fbb040">i</text></svg></span></div>
          </div>
        </div>
        <hr className="my-2 border-[#fbb040]/20" />
        <div className="flex items-center gap-4">
          <div className="bg-[#ffe6b3] rounded-lg p-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff7e0"/><circle cx="12" cy="12" r="10" stroke="#fbb040" strokeWidth="2"/><path d="M12 8a4 4 0 100 8 4 4 0 000-8z" fill="#fbb040"/></svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#b97a13]">{dbCredits}</div>
            <div className="text-[#b97a13] text-base">Database Credits</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-4">
        <div className="bg-[#fbb040] text-white text-xs font-semibold rounded px-3 py-1 mb-2 flex items-center gap-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff7e0"/><circle cx="12" cy="12" r="10" stroke="#fbb040" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="#fbb040" strokeWidth="2" fill="none"/></svg>
          Up to 53% OFF
        </div>
        <button
          className="bg-[#fbb040] hover:bg-[#ffd77a] text-white rounded-xl px-8 py-3 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-200"
          onClick={() => navigate('/Employer/BuyPackageSelection')}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="17" rx="8" ry="3" fill="#fff7e0"/><ellipse cx="12" cy="7" rx="8" ry="3" fill="#fff7e0"/><ellipse cx="12" cy="17" rx="8" ry="3" stroke="#fbb040" strokeWidth="2"/><ellipse cx="12" cy="7" rx="8" ry="3" stroke="#fbb040" strokeWidth="2"/><path d="M4 7v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7" stroke="#fbb040" strokeWidth="2"/></svg>
          Buy credits
        </button>
      </div>
    </div>
  );
};

export default AvailableCredits;

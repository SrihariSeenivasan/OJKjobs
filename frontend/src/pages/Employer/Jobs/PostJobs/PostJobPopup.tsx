import React from "react";
import { useNavigate } from "react-router-dom";

const PostJobPopup: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg w-[400px] sm:w-[480px] p-6 border border-gray-100 min-h-[160px] sm:min-h-[220px] flex flex-col justify-center">
      <div className="flex flex-col gap-2">
        {/* Start with new post */}
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition group" onClick={() => navigate("/Employer/NewJobPost") }>
          <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#E0EDFF"/><path d="M12 7v10M7 12h10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium text-[#253858] text-base">Start with new post</span>
            <span className="text-gray-500 text-xs">Use our blank form to create your job</span>
          </div>
          <svg className="ml-auto" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {/* Use a job template */}
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition group relative">
          <div className="bg-purple-100 rounded-lg p-2 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#F3E8FF"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#9333EA" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium text-[#253858] text-base">Use a job template</span>
            <span className="text-gray-500 text-xs">Save time and hire the right candidates using templates</span>
            <span className="absolute left-0 top-full mt-1"><span className="bg-purple-700 text-white text-[10px] font-semibold px-2 py-1 rounded-full">Save 50% more time</span></span>
          </div>
          <svg className="ml-auto" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {onClose && (
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      )}
    </div>
  );
};

export default PostJobPopup;

import React from "react";

const PostJobHeader: React.FC = () => (
  <div className="w-full flex items-center justify-between px-8 pt-6 pb-2 bg-[#2D2346] border-b border-[#E5E7EB] shadow-sm">
    <div className="flex items-center gap-3">
      <button className="p-2 rounded-full hover:bg-[#453A5A] transition-colors" aria-label="Back">
        <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <span className="font-semibold text-lg text-white">Post job</span>
    </div>
    <div className="flex items-center gap-6">
      <button className="flex items-center gap-1 text-[#A0AEC0] text-sm font-medium" aria-label="Support">
        <svg width="20" height="20" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>
        Support
      </button>
      <button className="p-2 rounded-full hover:bg-[#453A5A] transition-colors" aria-label="Close">
        <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
      </button>
    </div>
  </div>
);

export default PostJobHeader;


import React, { useState } from "react";

const jobsData = [
  {
    id: 1,
    title: "Social Media Manager",
    location: "Ghatkopar East, Mumbai",
    postedOn: "11 Jun 2024",
    postedBy: "Evangelin Gladin",
    status: "Expired",
    matches: 489,
    applied: null,
    repost: true,
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    location: "Ghatkopar East, Mumbai",
    postedOn: "01 Aug 2023",
    postedBy: "Evangelin Gladin",
    status: "Expired",
    matches: 0,
    applied: null,
    repost: true,
  },
  {
    id: 3,
    title: "Full-stack Developer",
    location: "Tirunelveli",
    postedOn: "24 Apr 2025",
    postedBy: "Evangelin Gladin",
    status: "Expired",
    matches: 208,
    applied: null,
    repost: true,
  },
];

const tabs = [
  { label: "Active", count: 0 },
  { label: "Under Review", count: 0 },
  { label: "Expired", count: 16 },
  { label: "Select Plan", count: 1 },
];

const Jobs: React.FC = () => {
  const [tab, setTab] = useState(2); // Expired by default
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  return (
    <div className="bg-[#F7F7F7] min-h-screen p-0 sm:p-4">
      {/* Pending Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#42526E] font-semibold text-base">
          <svg width="20" height="20" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg>
          Pending Actions (1)
        </div>
        <div className="bg-[#E9F8F5] rounded-lg flex items-center gap-3 p-3">
          <div className="bg-white rounded-lg p-2 flex items-center justify-center">
            <svg width="28" height="28" fill="none" stroke="#2DC6A8" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-[#253858] text-sm sm:text-base">Book a free live training session with one of our product experts</div>
            <a href="#" className="text-[#1A7F64] font-semibold text-sm sm:text-base">Schedule Training &rarr;</a>
          </div>
        </div>
      </div>

      {/* All Jobs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-2xl font-bold text-[#253858]">All Jobs <span className="font-normal text-lg text-[#42526E]">(17)</span></h2>
        <button className="bg-[#00704A] hover:bg-[#005C3B] text-white font-semibold rounded-lg px-6 py-2 flex items-center gap-2 transition-colors">
          Post a new job
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"/></svg>
        </button>
      </div>

      {/* Filters & Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="border border-[#D6DDEB] rounded-full px-4 py-2 text-[#42526E] font-medium flex items-center gap-2 bg-white">
          <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          All Filters
        </button>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            className={`border border-[#D6DDEB] rounded-full px-4 py-2 font-medium flex items-center gap-2 bg-white transition-colors ${tab === i ? 'text-white bg-[#00704A] border-[#00704A]' : 'text-[#42526E]'}`}
            onClick={() => setTab(i)}
          >
            + {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-4">
        {jobsData.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-2 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-[#253858]">{job.title}</span>
                  <span className="bg-[#FEE2E2] text-[#B91C1C] text-xs font-semibold rounded px-2 py-0.5">{job.status}</span>
                </div>
                <div className="text-[#6B7280] text-sm flex flex-wrap gap-2 items-center">
                  {job.location}
                  <span className="hidden sm:inline">|</span>
                  <span>Posted on : {job.postedOn}</span>
                  <span className="hidden sm:inline">|</span>
                  <span>{job.postedBy}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="border border-[#00704A] text-[#00704A] font-semibold rounded-lg px-4 py-1.5 bg-white hover:bg-[#E6F4F0] transition-colors">Repost now</button>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === job.id ? null : job.id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <svg width="22" height="22" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                  </button>
                  {menuOpen === job.id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50 flex flex-col py-2 animate-fade-in">
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[#253858] text-sm">
                        <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12h8"/></svg>
                        Duplicate
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[#253858] text-sm">
                        <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                        Edit job
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-[#B91C1C] text-sm">
                        <svg width="18" height="18" fill="none" stroke="#B91C1C" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                        Delete job
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2 text-[#6B7280] text-sm">
                <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18"/><path d="M12 3v18"/></svg>
                Repost now to receive new candidates
              </div>
              <div className="flex items-center gap-6 text-[#A0AEC0] text-sm font-semibold">
                <span>- Applied to job</span>
                <span>{job.matches} Database Matches</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;

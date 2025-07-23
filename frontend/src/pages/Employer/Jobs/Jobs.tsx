
import React, { useState } from "react";
import PostJobPopup from "./PostJobs/PostJobPopup";

const jobsData = [
  {
    id: 1,
    title: "Back End Developer",
    location: "Chennai",
    postedOn: "23 Jul 2025",
    postedBy: "Evangelin Gladin",
    status: "Active",
    matches: 58306,
    applied: 23,
    pending: 23,
    repost: false,
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    title: "Full-stack Developer",
    location: "Tirunelveli",
    postedOn: "24 Apr 2025",
    postedBy: "Evangelin Gladin",
    status: "Expired",
    matches: 208,
    applied: null,
    repost: true,
  },
  {
    id: 5,
    title: "Multimedia Designer",
    location: "Palayamkottai",
    postedOn: "15 Apr 2025",
    postedBy: "Evangelin Gladin",
    status: "Expired",
    matches: 48,
    applied: null,
    repost: true,
  },
  {
    id: 6,
    title: "Social Media Marketing Executive",
    location: "KK Nagar, Chennai",
    postedOn: "01 Apr 2025",
    postedBy: "Amruth Kumar",
    status: "Expired",
    matches: 59765,
    applied: null,
    repost: true,
  },
  {
    id: 7,
    title: "Telecalling Executive",
    location: "All Areas in Chennai",
    postedOn: "20 Mar 2025",
    postedBy: "Evangelin Gladin",
    status: "Expired",
    matches: 69185,
    applied: null,
    repost: true,
  },
  // Extra mock jobs
  {
    id: 8,
    title: "Frontend Developer",
    location: "Bangalore",
    postedOn: "10 Jul 2025",
    postedBy: "Rahul Singh",
    status: "Active",
    matches: 1200,
    applied: 10,
    pending: 2,
    repost: false,
  },
  {
    id: 9,
    title: "Content Writer",
    location: "Remote",
    postedOn: "05 Jul 2025",
    postedBy: "Priya Sharma",
    status: "Expired",
    matches: 300,
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
  // Map tab index to job status
  const tabStatusMap = ['Active', 'Under Review', 'Expired', 'Select Plan'];
  const filteredJobs = jobsData.filter(job => job.status === tabStatusMap[tab]);
  const [menuOpen, setMenuOpen] = useState<string | number | null>(null);
  const [showPostJobPopup, setShowPostJobPopup] = useState(false);
  const [hovering, setHovering] = useState(false);
  const postJobBtnRef = React.useRef<HTMLButtonElement>(null);

  // Simulate: Only show Pending Actions if a new webinar is posted from admin side
  const newWebinarPosted = true; // Set to true if admin posts a new webinar

  return (
    <div className="bg-[#F7F7F7] min-h-screen p-0 sm:p-4">
      {/* Pending Actions Dropdown (only if new webinar posted) */}
      {newWebinarPosted && (
        <div className="relative mb-6">
          <button
            className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-2 border border-orange-100 w-full text-left"
            onClick={() => setMenuOpen(menuOpen === 'pending' ? null : 'pending')}
          >
            <svg width="20" height="20" fill="none" stroke="grey" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/></svg>
            <span className="font-bold text-grey-500 text-base">Pending Actions (1)</span>
            <svg width="18" height="18" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24" className={`ml-auto transition-transform ${menuOpen === 'pending' ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
          </button>
          {menuOpen === 'pending' && (
            <div className="absolute left-0 right-0 mt-2 z-40 bg-white rounded-xl shadow-lg border border-orange-100 p-4">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg flex items-center gap-3 p-3 border border-orange-100">
                <div className="bg-white rounded-lg p-2 flex items-center justify-center shadow-sm border border-orange-100">
                  <svg width="28" height="28" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/></svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#253858] text-sm sm:text-base">Book a free live training session with one of our product experts</div>
                  <a
                    href="/Employer/ScheduleTraining"
                    className="text-orange-500 font-bold text-sm sm:text-base underline hover:text-orange-600 transition-colors"
                  >
                    Schedule Training &rarr;
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* All Jobs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 relative">
        <h2 className="text-2xl font-bold text-orange-500">All Jobs <span className="font-normal text-lg text-orange-400">(17)</span></h2>
        <div
          className="relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <button
            ref={postJobBtnRef}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-2 flex items-center gap-2 transition-colors"
            onClick={() => setShowPostJobPopup((prev) => !prev)}
          >
            Post a new job
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"/></svg>
          </button>
          {(showPostJobPopup || hovering) && (
            <div className="absolute right-0 left-auto mt-2 z-50" style={{ minWidth: '320px' }}>
              <PostJobPopup onClose={() => setShowPostJobPopup(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="border border-orange-300 rounded-full px-4 py-2 text-orange-500 font-medium flex items-center gap-2 bg-white transition-colors hover:text-orange-600">
          <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          All Filters
        </button>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            className={`border border-orange-300 rounded-full px-4 py-2 font-medium flex items-center gap-2 bg-white transition-colors ${tab === i ? 'text-orange-500 bg-[#FFF7ED] border-orange-500' : 'text-orange-500 hover:text-orange-600'}`}
            onClick={() => setTab(i)}
          >
            + {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-400 py-12 text-lg font-semibold">
            No jobs found for this tab.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-2 relative border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base sm:text-lg text-[#253858]">{job.title}</span>
                    {job.status === 'Active' ? (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold rounded-full px-2 py-0.5">Active</span>
                    ) : (
                      <span className="bg-[#FEE2E2] text-[#B91C1C] text-xs font-semibold rounded-full px-2 py-0.5">Expired</span>
                    )}
                  </div>
                  <div className="text-[#6B7280] text-xs sm:text-sm flex flex-wrap gap-2 items-center">
                    {job.location}
                    <span className="hidden sm:inline">|</span>
                    <span>Posted on : {job.postedOn}</span>
                    <span className="hidden sm:inline">|</span>
                    <span>{job.postedBy}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {job.status === 'Active' && (
                    <button className="border border-orange-500 text-orange-500 font-semibold rounded-lg px-4 py-1.5 bg-white hover:bg-orange-50 transition-colors">Duplicate</button>
                  )}
                  {job.status === 'Expired' && (
                    <button className="border border-orange-500 text-orange-500 font-semibold rounded-lg px-4 py-1.5 bg-white hover:bg-orange-50 transition-colors">Repost now</button>
                  )}
                  <div className="relative">
                    <button onClick={() => setMenuOpen(menuOpen === job.id ? null : job.id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <svg width="22" height="22" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                    </button>
                    {menuOpen === job.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50 flex flex-col py-2 animate-fade-in">
                        {job.status === 'Active' ? (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[#253858] text-sm">
                              <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                              Edit job
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[#253858] text-sm">
                              <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M12 4v16"/></svg>
                              Share
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-[#B91C1C] text-sm">
                              <svg width="18" height="18" fill="none" stroke="#B91C1C" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                              Expire job
                            </button>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                {job.status === 'Active' ? (
                  <div className="flex items-center gap-6 text-[#253858] text-sm font-semibold">
                    <span className="text-orange-600 font-bold">{job.applied} <span className="font-normal text-xs text-[#A0AEC0]">{job.pending ? (<>&gt; <span className='border border-[#A0AEC0] rounded px-2 py-0.5'>{job.pending} pending</span></>) : null}</span></span>
                    <span>Applied to job</span>
                    <span className="text-[#A0AEC0]">{job.matches} Database Matches</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-[#6B7280] text-sm">
                      <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18"/><path d="M12 3v18"/></svg>
                      Repost now to receive new candidates
                    </div>
                    <div className="flex items-center gap-6 text-[#A0AEC0] text-sm font-semibold">
                      <span>{job.applied !== null ? (
                        <span className="text-orange-600 font-bold">{job.applied}</span>
                      ) : (
                        <span>-</span>
                      )} Applied to job</span>
                      <span>{job.matches} Database Matches</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default Jobs;

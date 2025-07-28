
import { ArrowDownTrayIcon, CheckCircleIcon, FunnelIcon, UserIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

// Dummy data for demonstration
const candidates = [
  {
    id: 1,
    name: 'Mohamed Basudeen',
    gender: 'M',
    age: 24,
    experience: '2yrs 7mos',
    salary: '₹ 14,000 / mos',
    location: 'Chennai, TN',
    current: 'Node Js Developer at Agni software solutions Nov 2023 - Present',
    previous: 'Node.js Developer at JLVM TECH SOLUTIONS Nov 2023 - Present',
    education: 'Post Graduate',
    skills: ['Backend development', 'Database language', 'MySQL', 'PHP'],
    languages: ['English', 'Tamil'],
    matched: true,
    matching: ['Work Experience', 'Skills', 'Education', 'English Proficiency', 'Salary'],
    profilePic: '',
    resume: true,
    contacted: false,
    shortlisted: false,
    rejected: false,
  },
  // ...more candidates
];

const AppliedForJobs: React.FC = () => {
  const [tab, setTab] = useState('action');
  // const [filterOpen, setFilterOpen] = useState(false); // Removed unused state
  const [shareOpen, setShareOpen] = useState(false);
  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);

  const handleShortlist = (id: number) => {
    setShortlisted((prev) => [...prev, id]);
    setRejected((prev) => prev.filter((rid) => rid !== id));
  };
  const handleReject = (id: number) => {
    setRejected((prev) => [...prev, id]);
    setShortlisted((prev) => prev.filter((sid) => sid !== id));
  };

  // Filter candidates based on tab
  const filteredCandidates = candidates.filter((c) => {
    if (tab === 'all') return true;
    if (tab === 'action') return !shortlisted.includes(c.id) && !rejected.includes(c.id);
    if (tab === 'shortlisted') return shortlisted.includes(c.id);
    if (tab === 'rejected') return rejected.includes(c.id);
    return true;
  });

  // Example: total applied and database matches (replace with real data as needed)
  const totalApplied = 81;
  const databaseMatches = 58456;

  // Mock database matches data
  const databaseCandidates = [
    {
      id: 101,
      name: 'Princy',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
      experience: '2 yrs 5 mos',
      salary: '2.4 Lakhs',
      location: 'Chromepet, Chennai',
      current: 'Full-stack Developer at MocDoc',
      previous: 'Full Stack Web Developer at Yro Systems Private Limited',
      education: 'BE/B.Tech, Karpagam College of Engineering, Coimbatore',
      prefLocation: 'Chennai Region',
      skills: ['Java', 'HTML', 'CSS', 'JavaScript', 'SQL', '+4 more'],
      languages: ['English (Good)', 'Tamil'],
      resumeSummary: "Java. SQL.... Keyword found in Full Profile",
      phone: '8438698905',
      unlocked: true,
      activeOn: '18 Jul\'25',
      cvAttached: true,
    },
    // Add more mock candidates as needed
  ];

  // Job info for header (dummy data)
  const jobInfo = {
    title: 'Senior Node.js Developer',
    status: 'Active',
    location: 'Chennai, TN',
    applied: totalApplied,
  };
  const [tabStats, setTabStats] = useState<'applied' | 'database'>('applied');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Top job info header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-md">
        {/* Left: Back, job info */}
        <div className="flex items-center gap-4 flex-wrap">
          <button className="p-2 rounded-full hover:bg-gray-100" title="Back">
            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold text-gray-800">{jobInfo.title}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">{jobInfo.status}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1"><svg className="h-4 w-4 inline text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z"/><circle cx="12" cy="11" r="3"/></svg>{jobInfo.location}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Currently applied: <span className="font-semibold text-gray-700">{jobInfo.applied}</span></div>
          </div>
        </div>
        {/* Right: Share, menu */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-blue-50" title="Share" onClick={() => setShareOpen(v => !v)}>
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM9 8.6V8a3 3 0 0 1 6 0v.6m-6 0a3 3 0 0 0 0 6v.6m6-.6a3 3 0 0 0 0-6v-.6"/></svg>
            </button>
            {shareOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col py-2">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-green-700" onClick={() => setShareOpen(false)}>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.211-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  Share on WhatsApp
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-blue-700" onClick={() => setShareOpen(false)}>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.35c0-.734-.593-1.326-1.324-1.326z"/></svg>
                  Share on Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700" onClick={() => setShareOpen(false)}>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                  Share via Email
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setMenuOpen(v => !v)} title="More">
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setMenuOpen(false)}>Duplicate Job</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setMenuOpen(false)}>Expire Job</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Tabs for stats */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-gray-200 px-4 flex items-center gap-2 shadow-sm">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-md border-b-2 transition-all ${tabStats === 'applied' ? 'border-[#fbb040] text-[#fbb040] bg-white' : 'border-transparent text-gray-600 bg-gray-50 hover:bg-gray-100'}`}
          onClick={() => setTabStats('applied')}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-[#fbb040]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 0-8 0v2a4 4 0 0 0 8 0V7z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0 0a4 4 0 0 1-4-4h8a4 4 0 0 1-4 4z"/></svg>
            Applied to job <span className="font-bold">({totalApplied})</span>
          </span>
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-md border-b-2 transition-all ${tabStats === 'database' ? 'border-[#fbb040] text-[#fbb040] bg-white' : 'border-transparent text-gray-600 bg-gray-50 hover:bg-gray-100'}`}
          onClick={() => setTabStats('database')}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-[#fbb040]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-4V7a4 4 0 0 0-8 0v2m8 0a4 4 0 0 1-8 0"/></svg>
            Database matches <span className="font-bold">({databaseMatches.toLocaleString()})</span>
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">New</span>
          </span>
        </button>
        <div className="flex-1" />
      </div>
      {/* Main row: Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Wrap sidebar and main content in a parent div for valid JSX */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 bg-white rounded-xl shadow-md p-4 mb-4 lg:mb-0 overflow-y-auto max-h-[90vh]">
            {/* Sidebar content starts */}
            <div className="flex items-center gap-2 mb-4">
              <FunnelIcon className="h-5 w-5 text-[#fbb040]" />
              <span className="font-semibold text-lg text-gray-800">Filters</span>
              <span className="ml-auto text-xs text-blue-600 cursor-pointer hover:underline">Reset</span>
            </div>
            {/* Applied filter chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">&lt;= 3 Lakh <button className="ml-1 text-blue-400 hover:text-blue-700">&times;</button></span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">Exp: &gt; 1 Year <button className="ml-1 text-blue-400 hover:text-blue-700">&times;</button></span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">Graduate <button className="ml-1 text-blue-400 hover:text-blue-700">&times;</button></span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">Post Graduate <button className="ml-1 text-blue-400 hover:text-blue-700">&times;</button></span>
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">Basic English <button className="ml-1 text-blue-400 hover:text-blue-700">&times;</button></span>
              <span className="text-xs text-blue-600 cursor-pointer hover:underline">See More</span>
            </div>
            {/* Collapsible filter sections (static UI) */}
            <div className="divide-y divide-gray-100">
              {/* Hide candidates */}
              <details className="py-2" open>
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Hide candidates that are</summary>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Already unlocked</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Already downloaded in excel</label>
                </div>
              </details>
              {/* Show only candidates who */}
              <details className="py-2" open>
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Show only candidates who</summary>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Have CV attached</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Already unlocked</label>
                </div>
              </details>
              {/* Must-Have Keywords */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Must-Have Keywords</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add keywords" />
              </details>
              {/* Current City / Area */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Current City / Area</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Enter city or area" />
              </details>
              {/* Exclude Keywords */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Exclude Keywords</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add keywords to exclude" />
              </details>
              {/* Experience */}
              <details className="py-2" open>
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Experience <span className="ml-1 text-red-500">●</span> <span className="ml-auto text-xs text-blue-600 cursor-pointer">Clear</span></summary>
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <input className="w-1/2 border rounded-md px-2 py-1 text-xs" placeholder="1 Year" />
                  <span className="text-xs text-gray-400">-</span>
                  <input className="w-1/2 border rounded-md px-2 py-1 text-xs" placeholder="Max..." />
                </div>
                <div className="text-[10px] text-gray-400 mt-1 ml-2">You can filter within your search range only</div>
              </details>
              {/* Industries */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Industries</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add industries" />
              </details>
              {/* Current/Previous Company */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Current/Previous Company</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add company" />
              </details>
              {/* Annual Salary */}
              <details className="py-2" open>
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Annual Salary <span className="ml-1 text-red-500">●</span> <span className="ml-auto text-xs text-blue-600 cursor-pointer">Clear</span></summary>
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <input className="w-1/2 border rounded-md px-2 py-1 text-xs" placeholder="Min..." />
                  <span className="text-xs text-gray-400">-</span>
                  <input className="w-1/2 border rounded-md px-2 py-1 text-xs" placeholder="3 Lakh" />
                </div>
                <label className="flex items-center gap-2 mt-2 ml-2 text-xs"><input type="checkbox" /> Include candidates who have not disclosed their salary</label>
              </details>
              {/* Degrees/Specialization */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Degrees/Specialization</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add degree or specialization" />
              </details>
              {/* Education */}
              <details className="py-2" open>
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Education <span className="ml-1 text-red-500">?</span> <span className="ml-auto text-xs text-blue-600 cursor-pointer">Clear</span></summary>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked readOnly /> Graduate only <span className="text-gray-400">(44,690)</span></label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked readOnly /> Post Graduate only <span className="text-gray-400">(13,766)</span></label>
                </div>
              </details>
              {/* Gender */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Gender</summary>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Male</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Female</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Other</label>
                </div>
              </details>
              {/* Age */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Age</summary>
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <input className="w-1/2 border rounded-md px-2 py-1 text-xs" placeholder="Min..." />
                  <span className="text-xs text-gray-400">-</span>
                  <input className="w-1/2 border rounded-md px-2 py-1 text-xs" placeholder="Max..." />
                </div>
              </details>
              {/* Languages */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Languages</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add languages" />
              </details>
              {/* English Fluency Level */}
              <details className="py-2" open>
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">English Fluency Level <span className="ml-1 text-red-500">?</span> <span className="ml-auto text-xs text-blue-600 cursor-pointer">Clear</span></summary>
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked readOnly /> Basic English <span className="text-gray-400">(13,471)</span></label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" /> Good English <span className="text-gray-400">(44,985)</span></label>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 ml-2">Candidates can understand &amp; read english</div>
                <div className="text-[10px] text-gray-400 mt-1 ml-2">Candidates can understand, read &amp; speak english</div>
              </details>
              {/* Departments */}
              <details className="py-2">
                <summary className="font-semibold text-xs text-gray-700 cursor-pointer flex items-center">Departments</summary>
                <input className="mt-2 ml-2 w-full border rounded-md px-2 py-1 text-xs" placeholder="Add departments" />
              </details>
            </div>
            <div className="mt-4 text-xs text-blue-600 cursor-pointer hover:underline text-center">Load more filters</div>
            {/* Sidebar content ends */}
          </aside>
          {/* Main Content */}
          <main className="flex-1">
            {/* Main content starts */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => setTab('all')} className={`px-4 py-2 rounded-full font-medium text-sm ${tab === 'all' ? 'bg-[#fbb040] text-white' : 'bg-gray-100 text-gray-700'} transition`}>All candidates (81)</button>
              <button onClick={() => setTab('action')} className={`px-4 py-2 rounded-full font-medium text-sm ${tab === 'action' ? 'bg-[#fbb040] text-white' : 'bg-gray-100 text-gray-700'} transition`}>Action Pending (75)</button>
              <button onClick={() => setTab('shortlisted')} className={`px-4 py-2 rounded-full font-medium text-sm ${tab === 'shortlisted' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'} transition`}>Shortlisted (10)</button>
              <button onClick={() => setTab('rejected')} className={`px-4 py-2 rounded-full font-medium text-sm ${tab === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'} transition`}>Rejected (6)</button>
              <button className="ml-auto flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium text-sm border border-blue-100 hover:bg-blue-100 transition">
                <ArrowDownTrayIcon className="h-5 w-5" /> Download Excel
              </button>
            </div>
            {tabStats === 'applied' && (
              <div className="space-y-6">
                {filteredCandidates.length === 0 && (
                  <div className="text-center text-gray-400 py-12">No candidates found.</div>
                )}
                {filteredCandidates.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center gap-4 p-6 border border-gray-100">
                    {/* Profile Pic */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      {c.profilePic ? (
                        <img src={c.profilePic} alt={c.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#fbb040]" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-400 border-2 border-[#fbb040]">
                          <UserIcon className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 text-base">{c.name}</span>
                        <span className="text-xs text-gray-500">{c.gender === 'M' ? 'Male' : c.gender === 'F' ? 'Female' : ''}, {c.age} yr</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                        <span>{c.experience}</span>
                        <span>{c.salary}</span>
                        <span>{c.location}</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">Current: {c.current}</div>
                      <div className="text-xs text-gray-500 mb-1">Previous: {c.previous}</div>
                      <div className="text-xs text-gray-500 mb-1">Education: {c.education}</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {c.skills && c.skills.map(skill => (
                          <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{skill}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {c.languages && c.languages.map(lang => (
                          <span key={lang} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{lang}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {c.matching && c.matching.length > 0 ? c.matching.map(match => (
                          <span key={match} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">{match}</span>
                        )) : null}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col gap-2 items-end md:items-center md:w-40">
                      <button
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition ${shortlisted.includes(c.id) ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
                        onClick={() => handleShortlist(c.id)}
                        disabled={shortlisted.includes(c.id)}
                      >
                        <CheckCircleIcon className="h-5 w-5" /> {shortlisted.includes(c.id) ? 'Shortlisted' : 'Shortlist'}
                      </button>
                      <button
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition ${rejected.includes(c.id) ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                        onClick={() => handleReject(c.id)}
                        disabled={rejected.includes(c.id)}
                      >
                        <XCircleIcon className="h-5 w-5" /> {rejected.includes(c.id) ? 'Rejected' : 'Reject'}
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        View Number
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tabStats === 'database' && (
              <div className="space-y-6">
                {databaseCandidates.length === 0 ? (
                  <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center gap-4 p-10 border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-gray-700">Database Matches</div>
                    <div className="text-gray-500">This is a placeholder for database matches. Integrate your actual database data here.</div>
                    <div className="flex justify-center gap-2 mt-4">
                      <button className="px-4 py-2 rounded bg-[#fbb040] text-white font-semibold">Unlock Candidates</button>
                      <button className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold">Learn More</button>
                    </div>
                  </div>
                ) : (
                  databaseCandidates.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        {c.profilePic ? (
                          <img src={c.profilePic} alt={c.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#fbb040]" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-400 border-2 border-[#fbb040]">
                            <UserIcon className="h-10 w-10" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-base">{c.name}</span>
                          <span className="text-green-600 text-xs font-semibold ml-1 cursor-pointer">View Full Profile for Free &raquo;</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          <span>{c.experience}</span>
                          <span>{c.salary}</span>
                          <span>{c.location}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">Current / Latest <span className="font-semibold bg-yellow-100 text-yellow-800 px-1 rounded">{c.current.split(' at ')[0]}</span> at {c.current.split(' at ')[1]}</div>
                        <div className="text-xs text-gray-500 mb-1">Previous <span className="font-semibold bg-yellow-100 text-yellow-800 px-1 rounded">{c.previous.split(' at ')[0]}</span> at {c.previous.split(' at ')[1]}</div>
                        <div className="text-xs text-gray-500 mb-1">Education {c.education}</div>
                        <div className="text-xs text-gray-500 mb-1">Pref. Location {c.prefLocation}</div>
                        <div className="flex flex-wrap gap-2 mb-2 items-center text-xs">
                          <span className="font-semibold">Skills</span>
                          {c.skills.map(skill => (
                            <span key={skill} className={skill === 'Java' ? 'bg-yellow-100 text-yellow-800 px-1 rounded' : 'px-1'}>{skill}</span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2 items-center text-xs">
                          <span className="font-semibold">Languages</span>
                          {c.languages.map(lang => (
                            <span key={lang}>{lang}</span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2 items-center text-xs">
                          <span className="font-semibold">Resume Summary</span>
                          <span className="bg-yellow-100 text-yellow-800 px-1 rounded">Java</span>. SQL.... Keyword found in <span className="text-blue-600 underline cursor-pointer">Full Profile</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 items-center">
                          {c.cvAttached && <span className="text-xs text-gray-500">CV attached</span>}
                          <span className="text-xs text-gray-500">Active on {c.activeOn}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end md:items-center md:w-48 justify-center">
                        <div className="flex gap-2 mb-2">
                          <button className="flex items-center gap-2 px-3 py-2 rounded bg-green-50 text-green-700 border border-green-200 font-semibold">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M8 11h8M8 15h6"/></svg>
                            {c.phone}
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 rounded bg-white text-green-700 border border-green-200 font-semibold">
                            Message
                          </button>
                        </div>
                        <div className="flex gap-2 text-xs text-gray-400">
                          <span>1 unlocks</span>
                        </div>
                        <div className="flex gap-2 text-xs text-gray-400">
                          {c.cvAttached && <span>CV attached</span>}
                          <span>Active on {c.activeOn}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {/* Pagination */}
            <div className="flex justify-between items-center mt-8">
              <span className="text-sm text-gray-500">Showing {filteredCandidates.length} candidates</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Prev</button>
                <button className="px-3 py-1 rounded bg-[#fbb040] text-white">1</button>
                <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">2</button>
                <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Next</button>
              </div>
            </div>
            {/* Main content ends */}
          </main>
        </div>
      </div>

    </div>
  );
};

export default AppliedForJobs;



import React, { useEffect, useState } from "react";

// Add a registrationEnd property for demo
const contests = [
  {
    id: 1,
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Placeholder
    title: "AI For Career Growth: Future Proof Your Jobs",
    date: "May 6, 2025",
    time: "7:00 PM",
    organizer: {
      name: "apna",
      logo: "https://seeklogo.com/images/A/apna-logo-6B2B1B6B2B-seeklogo.com.png", // Placeholder
    },
    status: "Closed",
    foundation: {
      name: "Foundation For Future AI Mastery",
      desc: "Building Core Skill Sets",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // Placeholder
    },
    participants: "4537+",
    registered: true,
    registrationEnd: new Date(Date.now() + 1000 * 60 * 60 * 19 + 1000 * 60 * 55 + 1000 * 15 * 60 + 1000 * 15).toISOString(), // 19:55:15 from now
  },
   {
    id: 2,
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Placeholder
    title: "AI For Career Growth: Future Proof Your Jobs",
    date: "May 6, 2025",
    time: "7:00 PM",
    organizer: {
      name: "apna",
      logo: "https://seeklogo.com/images/A/apna-logo-6B2B1B6B2B-seeklogo.com.png", // Placeholder
    },
    status: "Live",
    foundation: {
      name: "Foundation For Future AI Mastery",
      desc: "Building Core Skill Sets",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // Placeholder
    },
    participants: "4537+",
    registered: false,
    registrationEnd: new Date(Date.now() + 1000 * 60 * 60 * 10 + 1000 * 60 * 30 + 1000 * 10).toISOString(), // 10:30:10 from now
  },
   {
    id: 3,
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Placeholder
    title: "AI For Career Growth: Future Proof Your Jobs",
    date: "May 6, 2025",
    time: "7:00 PM",
    organizer: {
      name: "apna",
      logo: "https://seeklogo.com/images/A/apna-logo-6B2B1B6B2B-seeklogo.com.png", // Placeholder
    },
    status: "Closed",
    foundation: {
      name: "Foundation For Future AI Mastery",
      desc: "Building Core Skill Sets",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // Placeholder
    },
    participants: "4537+",
    registered: true,
    registrationEnd: new Date(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 20 + 1000 * 5).toISOString(), // 5:20:05 from now
  },
   {
    id: 4,
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Placeholder
    title: "AI For Career Growth: Future Proof Your Jobs",
    date: "May 6, 2025",
    time: "7:00 PM",
    organizer: {
      name: "apna",
      logo: "https://seeklogo.com/images/A/apna-logo-6B2B1B6B2B-seeklogo.com.png", // Placeholder
    },
    status: "Live",
    foundation: {
      name: "Foundation For Future AI Mastery",
      desc: "Building Core Skill Sets",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // Placeholder
    },
    participants: "4537+",
    registered: false,
    registrationEnd: new Date(Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 10 + 1000 * 2).toISOString(), // 2:10:02 from now
  },
];


function useCountdown(targetDateIso: string) {
  const calc = () => {
    const now = new Date();
    const target = new Date(targetDateIso);
    const diff = Math.max(0, target.getTime() - now.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, ended: diff === 0 };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    if (time.ended) return;
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [targetDateIso, time.ended]);
  return time;
}

const ContestCard = ({ contest }: { contest: typeof contests[0] }) => {
  // Only show countdown if contest.status === 'Live' and registrationEnd exists
  const showCountdown = contest.status === 'Live' && contest.registrationEnd;
  const { hours, minutes, seconds, ended } = useCountdown(contest.registrationEnd || '');

  function pad(n: number) {
    return n.toString().padStart(2, '0');
  }

  return (
    <div className="bg-white rounded-2xl shadow p-0 overflow-hidden mb-6">
      <div className="w-full h-28 md:h-32 bg-gray-200 relative">
        <img
          src={contest.banner}
          alt="Contest Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-4 bg-black bg-opacity-60 text-yellow-400 px-2 py-1 rounded text-xs font-semibold tracking-wide">
          AI FOR CAREER GROWTH: <span className="text-white">FUTURE PROOF YOUR JOBS</span>
        </div>
        <div className="absolute bottom-2 right-4 flex items-center space-x-2">
          <span className="bg-white bg-opacity-80 text-gray-800 px-2 py-0.5 rounded text-xs font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {contest.date}
          </span>
          <span className="bg-white bg-opacity-80 text-gray-800 px-2 py-0.5 rounded text-xs font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {contest.time}
          </span>
        </div>
        <div className="absolute bottom-2 right-4 text-xs text-yellow-400 font-bold"></div>
      </div>
      <div className="p-6 pt-4">
        <div className="flex items-center space-x-3 mb-2">
          <img src={contest.organizer.logo} alt="Organizer Logo" className="w-10 h-10 rounded bg-gray-100 border" />
          <div className="font-semibold text-lg text-gray-800 flex-1">{contest.title}</div>
          <span className="ml-2 px-3 py-1 bg-red-100 text-red-500 rounded text-xs font-semibold">{contest.status}</span>
        </div>
        <div className="flex items-center bg-yellow-50 rounded-lg p-3 mb-4">
          <img src={contest.foundation.icon} alt="Foundation Icon" className="w-7 h-7 mr-2" />
          <div>
            <div className="font-semibold text-sm text-yellow-800">{contest.foundation.name}</div>
            <div className="text-xs text-yellow-700">{contest.foundation.desc}</div>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center text-blue-700 font-semibold text-sm">
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" /></svg>
            {contest.participants} <span className="ml-1 text-xs font-normal">Participants</span>
          </div>
        </div>
        {showCountdown && (
          <div className="flex items-center mb-4">
            <span className="font-semibold text-base md:text-lg text-black mr-2">Registration Ends in</span>
            <span className="flex items-center border border-red-400 bg-red-50 text-red-600 font-mono font-semibold rounded-full px-4 py-1 text-base">
              <svg className="w-5 h-5 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" /></svg>
              {ended ? '00:00:00' : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
            </span>
          </div>
        )}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg text-base transition">View Contest</button>
      </div>
    </div>
  );
};


const PAGE_SIZE = 2;

type TabType = 'all' | 'registered';

const ContestsListing: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Live' | 'Closed'>('All');
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<TabType>('all');

  // Tab logic
  let filteredContests = contests;
  if (tab === 'registered') {
    filteredContests = contests.filter((c) => c.registered);
  } else {
    filteredContests =
      filter === 'All' ? contests : contests.filter((c) => c.status === filter);
  }

  // Pagination
  const totalPages = Math.ceil(filteredContests.length / PAGE_SIZE);
  const paginatedContests = filteredContests.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Count for filter buttons
  const liveCount = contests.filter((c) => c.status === 'Live').length;
  const closedCount = contests.filter((c) => c.status === 'Closed').length;

  // Handle filter change
  const handleFilter = (val: 'All' | 'Live' | 'Closed') => {
    setFilter(val);
    setPage(1);
  };

  // Handle page change
  const handlePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // Handle tab change
  const handleTab = (tabVal: TabType) => {
    setTab(tabVal);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 ml-4 md:ml-0">All contests</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow p-6 mb-0 md:sticky md:top-8">
              <div className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-4.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z" /></svg>
                Filters
              </div>
              <div className="text-gray-700 font-medium mb-2">Contests</div>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-5 py-1.5 rounded-full border text-base font-semibold transition ${filter === 'All' ? 'border-green-600 text-green-700 bg-green-50' : 'border-gray-300 text-gray-700 bg-white'}`}
                  onClick={() => handleFilter('All')}
                >
                  All
                </button>
                <button
                  className={`px-5 py-1.5 rounded-full border text-base font-medium transition flex items-center ${filter === 'Live' ? 'border-green-600 text-green-700 bg-green-50' : 'border-gray-300 text-gray-700 bg-white'}`}
                  onClick={() => handleFilter('Live')}
                >
                  Live <span className="ml-2 text-xs bg-green-100 px-2 py-0.5 rounded-full">{liveCount}</span>
                </button>
                <button
                  className={`px-5 py-1.5 rounded-full border text-base font-medium transition flex items-center ${filter === 'Closed' ? 'border-green-600 text-red-700 bg-red-50' : 'border-gray-300 text-gray-700 bg-white'}`}
                  onClick={() => handleFilter('Closed')}
                >
                  Closed <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">{closedCount}</span>
                </button>
              </div>
            </div>
            <div className="bg-red-50 rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold text-red-700 mb-2">Contests</h2>
              <div className="text-gray-700 mb-4">Unlock opportunities, <br />one challenge at a time</div>
              <ul className="list-disc pl-5 text-gray-700 text-sm mb-6">
                <li>Explore free competitions</li>
                <li>Showcase your skills</li>
                <li>Win exciting rewards</li>
              </ul>
              <div className="flex justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="40" fill="#FEE2E2" />
                  <rect x="30" y="50" width="20" height="10" rx="2" fill="#FBBF24" />
                  <rect x="35" y="40" width="10" height="10" rx="2" fill="#F59E42" />
                  <rect x="37" y="30" width="6" height="10" rx="2" fill="#F472B6" />
                  <circle cx="40" cy="28" r="6" fill="#FBBF24" stroke="#F59E42" strokeWidth="2" />
                  <path d="M40 22v-4" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" />
                  <path d="M40 34v4" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-2 md:gap-8 border-b border-gray-200 mb-6">
              <button
                className={`text-lg md:text-xl font-semibold pb-2 px-2 md:px-4 border-b-2 transition ${tab === 'all' ? 'border-green-500 text-green-700' : 'border-transparent text-gray-700'}`}
                type="button"
                onClick={() => handleTab('all')}
              >
                All Contests
              </button>
              <button
                className={`text-lg md:text-xl font-semibold pb-2 px-2 md:px-4 border-b-2 transition ${tab === 'registered' ? 'border-green-500 text-green-700' : 'border-transparent text-gray-700'}`}
                type="button"
                onClick={() => handleTab('registered')}
              >
                Registered Contests
              </button>
            </div>
            {/* Contest Cards */}
            {paginatedContests.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No contests found.</div>
            ) : (
              paginatedContests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
              ))
            )}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                  className="px-3 py-1 rounded bg-gray-100 text-gray-600 font-medium"
                  onClick={() => handlePage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    className={`px-3 py-1 rounded font-semibold border transition ${page === idx + 1 ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
                    onClick={() => handlePage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded bg-gray-100 text-gray-600 font-medium"
                  onClick={() => handlePage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestsListing;

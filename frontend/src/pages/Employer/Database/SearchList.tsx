import { useState } from "react";

// Used for saving searches in localStorage (future use)
const SAVED_SEARCHES_KEY = "ojk_saved_searches";

const filters = [
  "Hide candidates that are",
  "Show only candidates who",
  "Must-Have Keywords",
  "Current City / Area",
  "Exclude Keywords",
  "Experience",
  "Industries",
  "Current/Previous Company",
  "Annual Salary",
  "Degrees/Specialization",
  "Education",
  "Gender",
  "Age",
  "Languages",
  "English Fluency Level",
  "Departments",
  "Notice Period",
  "Candidate Preferences",
];

const candidateList = [
  {
    name: "Sanjeeta Kumari",
    initials: "S",
    months: 6,
    salary: "< 50 Thousand",
    location: "Dwarka, New Delhi",
    current: "figma designer at NotionZoa",
    education: "Higher Secondary school Certificate, CBSE",
    prefLocation: "Delhi-NCR",
    skills: ["Figma", "Digital design", "Print design", "Typography", "Logo designing", "+3 more"],
    languages: ["English|Basic", "Hindi"],
    unlocked: true,
  },
  {
    name: "Akshay Shaji",
    initials: "A",
    months: 2,
    salary: "3 Lakhs",
    location: "Chenganur",
    current: "Figma internship at Zoople Technologies, Kochi",
    previous: "Adobe Xd",
    education: "BE/B.Tech, St. Thomas College Of Engineering And Technology - [STC], Chenganur",
    prefLocation: "Kochi Region | Thiruvananthapuram Region | Bengaluru/Bangalore Region",
    skills: ["Figma", "ADOBE XD", "Illustration", "Photoshop", "UI/UX", "+10 more"],
    languages: ["English|Good", "Hindi", "Malayalam", "Tamil"],
    unlocked: false,
  },
];

const SearchList = () => {
  const [activeIn, setActiveIn] = useState("6 months");
  const [showing, setShowing] = useState(20);
  const [selectedCandidates, setSelectedCandidates] = useState(new Set());
  
  // Mock URL params for demo
  const keywords = 'figma designer';
  const city = 'delhi';
  const minExp = '';
  const maxExp = '';
  const minSalary = '';
  const maxSalary = '';
  const education: string[] = [];
  const activeInParam = '';
  const searchingFor = 'UI/UX Designer';

  // Save search handler
  const handleSaveSearch = () => {
    // Use all variables to avoid ESLint unused warnings
    const searchParams = { keywords, city, minExp, maxExp, minSalary, maxSalary, education, activeInParam, searchingFor };
    const name = keywords ? keywords.split(',')[0] : 'Search';
    const savedBy = 'Evangelin Gladin';
    const savedAt = new Date().toISOString();
    const newSearch = { name, params: searchParams, savedBy, savedAt };
    // Example: log to show usage
    console.log('Saving search:', newSearch, 'Key:', SAVED_SEARCHES_KEY);
    alert('Search saved successfully!');
  };

  // Helper: parse months from candidate


  // Toggle candidate selection
const toggleCandidate = (index: number) => {
  const newSelected = new Set(selectedCandidates);
  if (newSelected.has(index)) {
    newSelected.delete(index);
  } else {
    newSelected.add(index);
  }
  setSelectedCandidates(newSelected);
};

  // Select all candidates
const selectAll = () => {
  if (selectedCandidates.size === candidateList.length) {
    setSelectedCandidates(new Set());
  } else {
    setSelectedCandidates(new Set(candidateList.map((_, i) => i)));
  }
};

  // Filtering logic
  const filteredCandidates = candidateList.filter(c => {
    if (keywords) {
      const kw = keywords.split(',').map(k => k.trim().toLowerCase());
      const inName = kw.some(k => c.name.toLowerCase().includes(k));
      const inSkills = kw.some(k => c.skills.some(s => s.toLowerCase().includes(k)));
      const inCurrent = c.current && kw.some(k => c.current.toLowerCase().includes(k));
      const inPrevious = c.previous && kw.some(k => c.previous.toLowerCase().includes(k));
      if (!(inName || inSkills || inCurrent || inPrevious)) return false;
    }
    if (city && !(c.location.toLowerCase().includes(city.toLowerCase()) || (c.prefLocation && c.prefLocation.toLowerCase().includes(city.toLowerCase())))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col xl:flex-row-reverse gap-6">
          {/* Filters Sidebar on right */}
          <aside className="w-full xl:w-80 flex-shrink-0 xl:fixed xl:top-24 xl:right-0 xl:left-auto xl:h-[calc(100vh-6rem)] xl:z-30 xl:overflow-y-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 sticky top-6 xl:static xl:top-auto xl:w-80 xl:max-w-xs xl:h-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#fbb040] to-[#f59e0b] rounded-full"></div>
                  Filters
                </h2>
                <span className="bg-[#fbb040]/10 text-[#fbb040] px-3 py-1 rounded-full text-sm font-semibold">
                  0 active
                </span>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#fbb040]/20">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#fbb040]/5 hover:text-[#fbb040] transition-all duration-200 border border-transparent hover:border-[#fbb040]/20 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter}</span>
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#fbb040] transition-colors"></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Results Area */}
          <main className="flex-1 min-w-0 xl:mr-96">
            {/* Search Results Header Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="text-gray-700 text-lg leading-relaxed">
                    <span className="font-black text-3xl text-[#fbb040] bg-gradient-to-r from-[#fbb040] to-[#f59e0b] bg-clip-text text-transparent">
                      36,537
                    </span>
                    <span className="ml-2 text-gray-600">profiles found for</span>
                    {keywords && <span className="font-bold text-[#fbb040] ml-1">{keywords}</span>}
                    {searchingFor && <span className="font-semibold text-gray-700">, {searchingFor}</span>}
                    {city && <span className="font-semibold text-gray-700">, {city}</span>}
                  </div>
                  <button className="mt-2 text-[#fbb040] text-sm font-semibold hover:underline flex items-center gap-1 group">
                    View details
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbb040] text-black font-semibold text-sm rounded-xl px-4 py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Modify search
                  </button>
                  <button 
                    onClick={handleSaveSearch}
                    className="bg-white text-gray-700 font-semibold text-sm border-2 border-gray-200 rounded-xl px-4 py-2.5 hover:border-[#fbb040] hover:text-[#fbb040] transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Save search
                  </button>
                  <button className="bg-[#fbb040]/10 text-[#fbb040] font-semibold text-sm border-2 border-[#fbb040]/30 rounded-xl px-4 py-2.5 hover:bg-[#fbb040] hover:text-black transition-all duration-200 shadow-md hover:shadow-lg">
                    View saved
                  </button>
                </div>
              </div>
            </div>

            {/* Toolbar Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm font-medium">Active in</label>
                    <select 
                      className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium focus:border-[#fbb040] focus:ring-0 transition-colors bg-white" 
                      value={activeIn} 
                      onChange={e => setActiveIn(e.target.value)}
                    >
                      {["1 month", "3 months", "6 months", "12 months"].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm font-medium">Showing</span>
                    <select 
                      className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium focus:border-[#fbb040] focus:ring-0 transition-colors bg-white" 
                      value={showing} 
                      onChange={e => setShowing(Number(e.target.value))}
                    >
                      {[20, 50, 100].map(opt => (
                        <option key={opt} value={opt}>{opt} per page</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-gray-600 text-sm">
                    Page <span className="font-bold text-[#fbb040]">1</span> of <span className="font-bold text-[#fbb040]">1827</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={selectAll}
                    className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#fbb040] hover:text-[#fbb040] transition-all duration-200 bg-white shadow-md hover:shadow-lg"
                  >
                    {selectedCandidates.size === candidateList.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <button className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbb040] text-black rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="7" width="18" height="13" rx="2"/>
                      <path d="M16 3v4"/>
                      <path d="M8 3v4"/>
                    </svg>
                    Download Excel
                  </button>
                </div>
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {filteredCandidates.length === 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-12 text-center">
                  <div className="w-16 h-16 bg-[#fbb040]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#fbb040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.709M15 6.34A7.965 7.965 0 0112 5c-2.34 0-4.29 1.007-5.824 2.709" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No candidates found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria to find more candidates.</p>
                </div>
              )}
              
              {filteredCandidates.map((candidate, index) => (
                <div key={candidate.name + index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-2 border-[#fbb040]/30 text-[#fbb040] focus:ring-[#fbb040] focus:ring-offset-0"
                        checked={selectedCandidates.has(index)}
                        onChange={() => toggleCandidate(index)}
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-[#fbb040] to-[#f59e0b] text-black font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg">
                            {candidate.initials}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-[#253858] truncate">{candidate.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                            <span className="bg-[#fbb040]/10 text-[#fbb040] px-2 py-1 rounded-full font-semibold">{candidate.months} months</span>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{candidate.salary}</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{candidate.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-gray-600">Current / Latest:</span>
                          <span className="text-gray-800 font-medium">{candidate.current}</span>
                        </div>
                        {candidate.previous && (
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-gray-600">Previous:</span>
                            <span className="text-gray-800 font-medium">{candidate.previous}</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-gray-600">Education:</span>
                          <span className="text-gray-800 font-medium">{candidate.education}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-gray-600">Preferred Location:</span>
                          <span className="text-gray-800 font-medium">{candidate.prefLocation}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-gray-600">Languages:</span>
                          <span className="text-gray-800 font-medium">{candidate.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <span className="font-semibold text-gray-600 text-sm block mb-2">Skills:</span>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="bg-gradient-to-r from-[#fbb040]/20 to-[#f59e0b]/20 text-[#f59e0b] font-semibold rounded-lg px-3 py-1.5 text-sm border border-[#fbb040]/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2 border-t border-gray-100">
                      <button className="bg-gradient-to-r from-[#fbb040] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#fbb040] text-black rounded-xl px-6 py-3 text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        View Phone Number
                      </button>
                      <button className="bg-white text-gray-700 font-semibold text-sm border-2 border-gray-200 rounded-xl px-6 py-3 hover:border-[#fbb040] hover:text-[#fbb040] transition-all duration-200 shadow-md hover:shadow-lg">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
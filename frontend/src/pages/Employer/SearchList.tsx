
import { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keywords = params.get('keywords')?.toLowerCase() || '';
  const city = params.get('city')?.toLowerCase() || '';
  const minExp = params.get('minExp') || '';
  const maxExp = params.get('maxExp') || '';
  const minSalary = params.get('minSalary') || '';
  const maxSalary = params.get('maxSalary') || '';
  const education = params.get('education') ? params.get('education')!.split(',') : [];
  const activeInParam = params.get('activeIn') || '';
  const searchingFor = params.get('searchingFor') || '';

  // Save search handler
  const handleSaveSearch = () => {
    const searchParams: Record<string, string> = {};
    params.forEach((v, k) => { searchParams[k] = v; });
    const name = keywords ? keywords.split(',')[0] : 'Search';
    const savedBy = 'Evangelin Gladin'; // mock user
    const savedAt = new Date().toISOString();
    const newSearch = { name, params: searchParams, savedBy, savedAt };
    let searches: Array<{ name: string; params: Record<string, string>; savedBy: string; savedAt: string }> = [];
    try {
      searches = JSON.parse(localStorage.getItem(SAVED_SEARCHES_KEY) || '[]');
    } catch {
      // ignore JSON parse errors
    }
    // Avoid duplicate (same params)
    if (!searches.some((s) => JSON.stringify(s.params) === JSON.stringify(searchParams))) {
      searches.unshift(newSearch);
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(searches));
      alert('Search saved!');
    } else {
      alert('This search is already saved.');
    }
  };

  // Helper: parse months from candidate (mock: months field)
  const parseMonths = (val: string | number) => {
    if (typeof val === 'number') return val;
    const n = parseInt(val);
    return isNaN(n) ? 0 : n;
  };

  // Filtering logic
  const filteredCandidates = candidateList.filter(c => {
    // Keywords: match in name, skills, current, previous
    if (keywords) {
      const kw = keywords.split(',').map(k => k.trim());
      const inName = kw.some(k => c.name.toLowerCase().includes(k));
      const inSkills = kw.some(k => c.skills.some(s => s.toLowerCase().includes(k)));
      const inCurrent = c.current && kw.some(k => c.current.toLowerCase().includes(k));
      const inPrevious = c.previous && kw.some(k => c.previous.toLowerCase().includes(k));
      if (!(inName || inSkills || inCurrent || inPrevious)) return false;
    }
    // City
    if (city && !(c.location.toLowerCase().includes(city) || (c.prefLocation && c.prefLocation.toLowerCase().includes(city)))) return false;
    // Min Exp
    if (minExp) {
      const min = parseInt(minExp);
      if (!isNaN(min) && parseMonths(c.months) < min) return false;
    }
    // Max Exp
    if (maxExp) {
      const max = parseInt(maxExp);
      if (!isNaN(max) && parseMonths(c.months) > max) return false;
    }
    // Education
    if (education.length) {
      const found = education.some(e => c.education.toLowerCase().includes(e.toLowerCase()));
      if (!found) return false;
    }
    // (Other filters can be added here)
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full py-6 px-2 sm:px-4">
      {/* Filters sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 mb-4 lg:mb-0">
        <div className="bg-white rounded-xl shadow-sm border p-4 sticky top-24">
          <div className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
            Filters <span className="text-xs font-normal text-gray-400">(0)</span>
          </div>
          <div className="flex flex-col gap-1">
            {filters.map((f) => (
              <button key={f} className="text-left px-2 py-2 rounded-lg w-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                {f}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main results area */}
      <section className="flex-1 min-w-0">
        {/* Results header with dynamic search context */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="text-gray-700 text-base sm:text-lg font-medium">
            <span className="font-bold text-xl sm:text-2xl text-[#253858]">36,537</span> profiles found for
            {keywords && <span className="font-semibold"> {keywords}</span>}
            {searchingFor && <span className="font-semibold">, {searchingFor}</span>}
            {city && <span className="font-semibold">, {city}</span>}
            {minExp && <span className="font-semibold">, Min Exp: {minExp}</span>}
            {maxExp && <span className="font-semibold">, Max Exp: {maxExp}</span>}
            {minSalary && <span className="font-semibold">, Min Salary: {minSalary}</span>}
            {maxSalary && <span className="font-semibold">, Max Salary: {maxSalary}</span>}
            {education && <span className="font-semibold">, Education: {education}</span>}
            {activeInParam && <span className="font-semibold">, Active in: {activeInParam}</span>}
            <button className="ml-2 text-blue-700 text-sm font-semibold hover:underline">View details</button>
          </div>
          <div className="flex gap-2 items-center">
            <button className="text-green-700 font-semibold text-sm border border-green-600 rounded-lg px-3 py-1.5 hover:bg-green-50">Modify search</button>
            <button className="text-gray-700 font-semibold text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50" onClick={handleSaveSearch}>Save search</button>
            <button className="text-blue-700 font-semibold text-sm border border-blue-300 rounded-lg px-3 py-1.5 hover:bg-blue-50" onClick={() => window.location.href='/EmployerLayout/SavedSearches'}>View saved</button>
          </div>
        </div>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div className="flex gap-2 items-center">
            <select className="border rounded-lg px-3 py-2 text-sm" value={activeIn} onChange={e => setActiveIn(e.target.value)}>
              {["1 month", "3 months", "6 months", "12 months"].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="text-gray-500 text-sm">Active in</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 text-sm">Showing</span>
            <select className="border rounded-lg px-3 py-2 text-sm" value={showing} onChange={e => setShowing(Number(e.target.value))}>
              {[20, 50, 100].map(opt => (
                <option key={opt} value={opt}>{opt} per page</option>
              ))}
            </select>
            <span className="text-gray-500 text-sm">Page <b>1</b> of <b>1827</b></span>
          </div>
          <div className="flex gap-2 items-center">
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Select All</button>
            <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-2 text-sm font-semibold flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
              Download Excel
            </button>
          </div>
        </div>
        {/* Candidate cards */}
        <div className="flex flex-col gap-4">
          {filteredCandidates.length === 0 && (
            <div className="text-center text-gray-500 py-8">No candidates found matching your search.</div>
          )}
          {filteredCandidates.map((c, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="accent-green-600 w-4 h-4" />
                <div className="flex items-center gap-2">
                  <span className="bg-gray-200 text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-lg">
                    {c.initials}
                  </span>
                  <span className="font-semibold text-base text-[#253858]">{c.name}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{c.months} mos</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{c.salary}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{c.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm text-gray-700 mt-1">
                <div><span className="font-medium text-gray-500">Current / Latest:</span> {c.current}</div>
                {c.previous && <div><span className="font-medium text-gray-500">Previous:</span> {c.previous}</div>}
                <div><span className="font-medium text-gray-500">Education:</span> {c.education}</div>
                <div><span className="font-medium text-gray-500">Pref. Location:</span> {c.prefLocation}</div>
                <div className="flex flex-wrap gap-1 items-center"><span className="font-medium text-gray-500">Skills:</span> {c.skills.map((s, idx) => <span key={idx} className="bg-yellow-100 text-yellow-800 rounded px-1.5 py-0.5 text-xs font-semibold ml-1">{s}</span>)}</div>
                <div><span className="font-medium text-gray-500">Languages:</span> {c.languages.join(", ")}</div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
                  View Phone Number
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchList;

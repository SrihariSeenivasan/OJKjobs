import { useState } from "react";
import { useNavigate } from "react-router-dom";

const educationOptions = [
  "10th pass",
  "12th pass",
  "ITI",
  "Diploma",
  "Graduate",
  "Post Graduate",
];

const experienceOptions = Array.from({ length: 31 }, (_, i) => i + " years");
const activeInOptions = [
  "1 month",
  "3 months",
  "6 months",
  "12 months",
];

const recentSearches = [
  "Social Media Manager | Social Media Marketing Executive | Social Media...",
  "Social Media Manager | Social Media Marketing Executive | Social Media...",
  "Social Media Manager | Social Media Marketing Executive | Social Media...",
  "Social Media Manager | Social Media Marketing Executive | Social Media...",
  "Experienced only | Social Media Manager | Social Media Marketing Executive | Socia...",
];

const SearchCandidates = () => {
  const [searchingFor, setSearchingFor] = useState("Any");
  const [keywords, setKeywords] = useState("");
  const [city, setCity] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [education, setEducation] = useState<string[]>([]);
  const [activeIn, setActiveIn] = useState("6 months");


  const navigate = useNavigate();

  const handleEducationToggle = (option: string) => {
    setEducation((prev) =>
      prev.includes(option)
        ? prev.filter((e) => e !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query params for search
    const params = new URLSearchParams();
    if (keywords) params.append('keywords', keywords);
    if (city) params.append('city', city);
    if (minExp) params.append('minExp', minExp);
    if (maxExp) params.append('maxExp', maxExp);
    if (minSalary) params.append('minSalary', minSalary);
    if (maxSalary) params.append('maxSalary', maxSalary);
    if (education.length) params.append('education', education.join(','));
    if (activeIn) params.append('activeIn', activeIn);
    if (searchingFor) params.append('searchingFor', searchingFor);
    navigate(`/EmployerLayout/SearchList?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full py-6 px-2 sm:px-4">
      {/* Main search area */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Search Candidates</h1>
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 rounded-t-lg border-b-2 border-blue-600 bg-white font-medium text-blue-700 flex items-center gap-2 focus:outline-none">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Search manually
          </button>
          <button className="px-4 py-2 rounded-t-lg bg-white font-medium text-gray-600 flex items-center gap-2 border-b-2 border-transparent focus:outline-none">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10h8m-8 0H4"/></svg>
            Use OJK AI
          </button>
        </div>
        {/* Search form */}
        <form className="bg-white rounded-xl shadow-sm border p-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Searching for */}
          <div>
            <label className="block font-semibold mb-2">Searching for</label>
            <div className="flex gap-6">
              {['Freshers only', 'Experienced only', 'Any'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchingFor"
                    value={opt}
                    checked={searchingFor === opt}
                    onChange={() => setSearchingFor(opt)}
                    className="accent-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Keywords */}
          <div>
            <label className="block font-semibold mb-2">Keywords <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter keywords such as job title, skills etc"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              required
            />
          </div>
          {/* City/region */}
          <div>
            <label className="block font-semibold mb-2">Current city/region</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Type to search city/region"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          {/* Experience */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Experience</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={minExp}
                onChange={e => setMinExp(e.target.value)}
              >
                <option value="">Minimum experience</option>
                {experienceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-2 invisible">Max</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={maxExp}
                onChange={e => setMaxExp(e.target.value)}
              >
                <option value="">Maximum experience</option>
                {experienceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Annual salary */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Annual salary</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Min. salary in lakhs"
                value={minSalary}
                onChange={e => setMinSalary(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-2 invisible">Max</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Max. salary in lakhs"
                value={maxSalary}
                onChange={e => setMaxSalary(e.target.value)}
              />
            </div>
          </div>
          {/* Minimum education */}
          <div>
            <label className="block font-semibold mb-2">Minimum education</label>
            <div className="flex flex-wrap gap-2">
              {educationOptions.map(opt => (
                <button
                  type="button"
                  key={opt}
                  className={`px-3 py-1 rounded-full border text-sm font-medium ${education.includes(opt) ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-300 text-gray-700'} transition`}
                  onClick={() => handleEducationToggle(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          {/* Active in */}
          <div className="flex items-center gap-3">
            <label className="font-semibold">Active in</label>
            <select
              className="border rounded-lg px-3 py-2"
              value={activeIn}
              onChange={e => setActiveIn(e.target.value)}
            >
              {activeInOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button type="button" className="text-blue-700 font-semibold hover:underline" onClick={() => {
              setKeywords(""); setCity(""); setMinExp(""); setMaxExp(""); setMinSalary(""); setMaxSalary(""); setEducation([]); setActiveIn("6 months"); setSearchingFor("Any");
            }}>Reset</button>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search candidates
            </button>
          </div>
        </form>
      </div>
      {/* Right sidebar */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-4">
        {/* How Database Credits work */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between cursor-pointer select-none">
            <span className="font-semibold text-gray-800">How Database Credits work?</span>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <ul className="text-sm text-gray-700 mt-3 space-y-2">
            <li className="flex items-center gap-2"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> 1 Profile Unlock = <b>1 Database Credit</b></li>
            <li className="flex items-center gap-2"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg> 1 Excel Download = <b>2 Database Credits</b><span className="text-xs text-gray-400 ml-1">*</span></li>
          </ul>
          <div className="text-xs text-gray-500 mt-2">* For already unlocked profiles, only 1 Database Credit is used for Excel Download</div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 border border-gray-300 rounded-lg px-3 py-2 font-semibold text-gray-800 hover:bg-gray-50">Explore Plans & Offers</button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-2 font-semibold">Buy credits</button>
          </div>
        </div>
        {/* Recent searches */}
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-2 max-h-64 overflow-y-auto">
          <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="8"/></svg>
            Recent searches
          </div>
          {recentSearches.map((search, idx) => (
            <div key={idx} className="flex flex-col text-sm text-gray-700 border-b last:border-b-0 pb-2 mb-2 last:pb-0 last:mb-0">
              <span className="truncate">{search}</span>
              <div className="flex gap-2 mt-1">
                <button className="text-green-700 font-semibold text-xs hover:underline">Fill search</button>
                <button className="text-blue-700 font-semibold text-xs hover:underline">Search candidates</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCandidates;

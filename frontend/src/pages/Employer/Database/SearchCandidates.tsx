import { ChevronDown, Download, FileText, History, Search, Sparkles } from "lucide-react";
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#253858]">Search Candidates</h1>
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 rounded-t-xl border-b-2 border-[#fbb040] bg-white font-semibold text-[#fbb040] flex items-center gap-2 focus:outline-none transition-all duration-200" type="button">
            <Search size={18} stroke="#fbb040" strokeWidth={2.2} />
            Search manually
          </button>
          <button className="px-4 py-2 rounded-t-xl bg-white font-semibold text-gray-500 flex items-center gap-2 border-b-2 border-transparent focus:outline-none transition-all duration-200" type="button">
            <Sparkles size={18} stroke="#b97a13" strokeWidth={2.2} />
            Use OJK AI
          </button>
        </div>
        {/* Search form */}
        <form className="bg-white rounded-2xl shadow-lg border border-[#fbb040]/20 p-5 flex flex-col gap-5" onSubmit={handleSubmit}>
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
                    className="accent-[#fbb040]"
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
              className="w-full border border-[#fbb040]/30 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fbb040]"
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
              className="w-full border border-[#fbb040]/30 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fbb040]"
              placeholder="Type to search city/region"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          {/* Experience */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Experience</label>
              <div className="relative bg-[#FFF7E0] rounded-xl shadow-sm border border-[#fbb040]/30">
                <select
                  className="w-full bg-[#FFF7E0] border-0 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-[#b97a13] font-semibold"
                  value={minExp}
                  onChange={e => setMinExp(e.target.value)}
                >
                  <option value="" className="text-[#b97a13] font-normal bg-[#FFF7E0]">Minimum experience</option>
                  {experienceOptions.map(opt => (
                    <option key={opt} value={opt} className="text-[#253858] font-normal bg-[#FFF7E0]">{opt}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#b97a13]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-2 invisible">Max</label>
              <div className="relative bg-[#FFF7E0] rounded-xl shadow-sm border border-[#fbb040]/30">
                <select
                  className="w-full bg-[#FFF7E0] border-0 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-[#b97a13] font-semibold"
                  value={maxExp}
                  onChange={e => setMaxExp(e.target.value)}
                >
                  <option value="" className="text-[#b97a13] font-normal bg-[#FFF7E0]">Maximum experience</option>
                  {experienceOptions.map(opt => (
                    <option key={opt} value={opt} className="text-[#253858] font-normal bg-[#FFF7E0]">{opt}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#b97a13]" />
              </div>
            </div>
          </div>
          {/* Annual salary */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Annual salary</label>
              <input
                type="text"
                className="w-full border border-[#fbb040]/30 rounded-xl px-3 py-2"
                placeholder="Min. salary in lakhs"
                value={minSalary}
                onChange={e => setMinSalary(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-2 invisible">Max</label>
              <input
                type="text"
                className="w-full border border-[#fbb040]/30 rounded-xl px-3 py-2"
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
                  className={`px-3 py-1 rounded-full border text-sm font-medium transition ${education.includes(opt) ? 'bg-[#FFF7E0] border-[#fbb040] text-[#b97a13]' : 'bg-white border-[#fbb040]/20 text-gray-700'}`}
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
            <div className="relative w-40 bg-[#FFF7E0] rounded-xl shadow-sm border border-[#fbb040]/30">
              <select
                className="w-full bg-[#FFF7E0] border-0 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-[#b97a13] font-semibold"
                value={activeIn}
                onChange={e => setActiveIn(e.target.value)}
              >
                {activeInOptions.map(opt => (
                  <option key={opt} value={opt} className="text-[#253858] font-normal bg-[#FFF7E0]">{opt}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#b97a13]" />
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button type="button" className="text-[#fbb040] font-semibold hover:underline" onClick={() => {
              setKeywords(""); setCity(""); setMinExp(""); setMaxExp(""); setMinSalary(""); setMaxSalary(""); setEducation([]); setActiveIn("6 months"); setSearchingFor("Any");
            }}>Reset</button>
            <button type="submit" className="bg-[#fbb040] hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-xl flex items-center gap-2 shadow transition-all duration-200">
              <Search size={20} stroke="#fff" strokeWidth={2.2} />
              Search candidates
            </button>
          </div>
        </form>
      </div>
      {/* Right sidebar */}
      <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-4">
        {/* How Database Credits work */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#fbb040]/20 p-4">
          <div className="flex items-center justify-between cursor-pointer select-none">
            <span className="font-semibold text-[#253858]">How Database Credits work?</span>
            <ChevronDown size={18} stroke="#b97a13" strokeWidth={2.2} />
          </div>
          <ul className="text-sm text-gray-700 mt-3 space-y-2">
            <li className="flex items-center gap-2"><FileText size={16} stroke="#fbb040" strokeWidth={2} /> 1 Profile Unlock = <b>1 Database Credit</b></li>
            <li className="flex items-center gap-2"><Download size={16} stroke="#fbb040" strokeWidth={2} /> 1 Excel Download = <b>2 Database Credits</b><span className="text-xs text-gray-400 ml-1">*</span></li>
          </ul>
          <div className="text-xs text-gray-500 mt-2">* For already unlocked profiles, only 1 Database Credit is used for Excel Download</div>
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 border border-[#fbb040]/30 rounded-xl px-3 py-2 font-semibold text-[#b97a13] hover:bg-[#FFF7E0] transition-all duration-200"
              onClick={() => navigate('/Employer/Billing')}
            >
              Explore Plans & Offers
            </button>
            <button
              className="flex-1 bg-[#fbb040] hover:bg-orange-500 text-white rounded-xl px-3 py-2 font-semibold shadow transition-all duration-200"
              onClick={() => navigate('/Employer/BuyPackageSelection')}
            >
              Buy credits
            </button>
          </div>
        </div>
        {/* Recent searches */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#fbb040]/20 p-4 flex flex-col gap-2 max-h-64 overflow-y-auto">
          <div className="font-semibold text-[#253858] mb-2 flex items-center gap-2">
            <History size={18} stroke="#b97a13" strokeWidth={2.2} />
            Recent searches
          </div>
          {recentSearches.map((search, idx) => (
            <div key={idx} className="flex flex-col text-sm text-gray-700 border-b last:border-b-0 pb-2 mb-2 last:pb-0 last:mb-0">
              <span className="truncate">{search}</span>
              <div className="flex gap-2 mt-1">
                <button className="text-[#fbb040] font-semibold text-xs hover:underline">Fill search</button>
                <button className="text-[#b97a13] font-semibold text-xs hover:underline">Search candidates</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCandidates;

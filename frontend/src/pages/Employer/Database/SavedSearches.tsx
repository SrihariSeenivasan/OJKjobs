import { CalendarDays, ChevronDown, Filter, Search as LucideSearch, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SavedSearch = {
  name: string;
  params: Record<string, string>;
  savedBy: string;
  savedAt: string;
};

const SAVED_SEARCHES_KEY = "ojk_saved_searches";

const getSavedSearches = (): SavedSearch[] => {
  try {
    const data = localStorage.getItem(SAVED_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const SavedSearches = () => {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(0); // 0: all, 7, 30, 90
  const navigate = useNavigate();

  useEffect(() => {
    setSearches(getSavedSearches());
  }, []);

  // Filter logic
  const filtered = searches.filter(s => {
    if (dateFilter) {
      const daysAgo = Date.now() - dateFilter * 24 * 60 * 60 * 1000;
      if (new Date(s.savedAt).getTime() < daysAgo) return false;
    }
    if (filter === "me") {
      return s.savedBy === "Evangelin Gladin"; // mock user
    }
    if (filter === "others") {
      return s.savedBy !== "Evangelin Gladin";
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto w-full py-6 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#253858]">Saved Searches</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
          <div className="bg-white rounded-2xl shadow-lg border border-[#fbb040]/20 p-4">
            <div className="font-semibold text-[#253858] mb-4 flex items-center gap-2 text-base">
              <Filter size={18} stroke="#b97a13" strokeWidth={2.2} />
              Filter
            </div>
            <div className="mb-4">
              <div className="font-medium text-[#b97a13] mb-2 flex items-center gap-2"><CalendarDays size={16} stroke="#b97a13" /> Saved date</div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="date" checked={dateFilter === 7} onChange={() => setDateFilter(7)} className="accent-[#fbb040]" /> Last 7 days
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="date" checked={dateFilter === 30} onChange={() => setDateFilter(30)} className="accent-[#fbb040]" /> Last 30 days
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="date" checked={dateFilter === 90} onChange={() => setDateFilter(90)} className="accent-[#fbb040]" /> Last 90 days
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="date" checked={dateFilter === 0} onChange={() => setDateFilter(0)} className="accent-[#fbb040]" /> All
                </label>
              </div>
            </div>
            <div>
              <div className="font-medium text-[#b97a13] mb-2 flex items-center gap-2"><Users size={16} stroke="#b97a13" /> Show searches saved by</div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="by" checked={filter === "me"} onChange={() => setFilter("me") } className="accent-[#fbb040]"/> <User size={14} /> Me
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="by" checked={filter === "others"} onChange={() => setFilter("others") } className="accent-[#fbb040]"/> <Users size={14} /> Others
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="by" checked={filter === "all"} onChange={() => setFilter("all") } className="accent-[#fbb040]"/> All
                </label>
              </div>
            </div>
          </div>
        </aside>
        {/* Main content */}
        <section className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <img src="/assets/ojk-logo.png" alt="No saved" className="w-24 h-24 mb-4 opacity-60" />
              <div className="font-semibold text-lg text-[#b97a13] mb-2">No searches saved</div>
              <div className="text-gray-500 text-sm mb-2">All the saved searches will appear here once you start saving them</div>
              <div className="text-gray-500 text-sm mb-4">Please go to search page to search candidates</div>
              <button className="bg-[#fbb040] hover:bg-orange-500 text-white rounded-xl px-4 py-2 font-semibold shadow transition-all duration-200 flex items-center gap-2" onClick={() => navigate('/Employer/SearchCandidates')}><LucideSearch size={18} />Go to search page</button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-[#b97a13]">{filtered.length} saved search{filtered.length > 1 ? 'es' : ''}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Showing</span>
                  <div className="relative bg-[#FFF7E0] rounded-xl border border-[#fbb040]/30">
                    <select className="w-full bg-[#FFF7E0] border-0 rounded-xl px-2 py-1 pr-6 appearance-none focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-[#b97a13] font-semibold" style={{minWidth: 60}}>
                      <option>20</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#b97a13]" />
                  </div>
                  <span>per page</span>
                  <span className="ml-2">1</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-[#fbb040]/20">
                <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b text-[#b97a13] text-xs font-semibold">
                  <div className="col-span-4">Search name</div>
                  <div className="col-span-3">Saved by</div>
                  <div className="col-span-5"></div>
                </div>
                {filtered.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 border-b last:border-b-0 items-center">
                    <div className="col-span-4">
                      <div className="font-semibold text-sm text-[#fbb040]">{s.name}</div>
                      <div className="text-xs text-gray-600 truncate max-w-xs">{Object.entries(s.params).map(([v]) => v).join(' | ')}</div>
                      <div className="text-xs text-gray-400 mt-1">Saved on: {new Date(s.savedAt).toLocaleDateString()}</div>
                    </div>
                    <div className="col-span-3 text-sm">{s.savedBy}</div>
                    <div className="col-span-5 flex gap-2">
                      <button className="text-[#fbb040] font-semibold text-xs hover:underline" onClick={() => navigate(`/EmployerLayout/SearchCandidates?${new URLSearchParams(s.params).toString()}`)}>Fill search</button>
                      <button className="text-[#b97a13] font-semibold text-xs hover:underline" onClick={() => navigate(`/EmployerLayout/SearchList?${new URLSearchParams(s.params).toString()}`)}>Search candidates</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SavedSearches;

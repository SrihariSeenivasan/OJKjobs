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
      <h1 className="text-lg font-semibold mb-4">Saved Searches</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-base">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6h8M6 6h.01M6 12h.01M6 18h.01M10 12h8m-8 6h8"/></svg>
              Filter
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-700 mb-2">Saved date</div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" checked={dateFilter === 7} onChange={() => setDateFilter(7)} /> Last 7 days
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" checked={dateFilter === 30} onChange={() => setDateFilter(30)} /> Last 30 days
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" checked={dateFilter === 90} onChange={() => setDateFilter(90)} /> Last 90 days
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" checked={dateFilter === 0} onChange={() => setDateFilter(0)} /> All
                </label>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2">Show searches saved by</div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="by" checked={filter === "me"} onChange={() => setFilter("me")}/> Me
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="by" checked={filter === "others"} onChange={() => setFilter("others")}/> Others
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="by" checked={filter === "all"} onChange={() => setFilter("all")}/> All
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
              <div className="font-semibold text-lg text-gray-700 mb-2">No searches saved</div>
              <div className="text-gray-500 text-sm mb-2">All the saved searches will appear here once you start saving them</div>
              <div className="text-gray-500 text-sm mb-4">Please go to search page to search candidates</div>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 font-semibold" onClick={() => navigate('/Employer/SearchCandidates')}>Go to search page</button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-700">{filtered.length} saved search{filtered.length > 1 ? 'es' : ''}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Showing</span>
                  <select className="border rounded px-2 py-1" style={{minWidth: 60}}>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                  <span>per page</span>
                  <span className="ml-2">1</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b text-gray-500 text-xs font-semibold">
                  <div className="col-span-4">Search name</div>
                  <div className="col-span-3">Saved by</div>
                  <div className="col-span-5"></div>
                </div>
                {filtered.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 px-4 py-3 border-b last:border-b-0 items-center">
                    <div className="col-span-4">
                      <div className="font-semibold text-sm text-green-800">{s.name}</div>
                      <div className="text-xs text-gray-600 truncate max-w-xs">{Object.entries(s.params).map(([v]) => v).join(' | ')}</div>
                      <div className="text-xs text-gray-400 mt-1">Saved on: {new Date(s.savedAt).toLocaleDateString()}</div>
                    </div>
                    <div className="col-span-3 text-sm">{s.savedBy}</div>
                    <div className="col-span-5 flex gap-2">
                      <button className="text-green-700 font-semibold text-xs hover:underline" onClick={() => navigate(`/EmployerLayout/SearchCandidates?${new URLSearchParams(s.params).toString()}`)}>Fill search</button>
                      <button className="text-blue-700 font-semibold text-xs hover:underline" onClick={() => navigate(`/EmployerLayout/SearchList?${new URLSearchParams(s.params).toString()}`)}>Search candidates</button>
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

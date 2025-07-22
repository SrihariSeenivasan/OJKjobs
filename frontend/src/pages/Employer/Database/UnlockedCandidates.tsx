import { useNavigate } from "react-router-dom";

const UnlockedCandidates = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto w-full py-6 px-2 sm:px-4">
      <h1 className="text-lg font-semibold mb-4">Unlocked Candidates</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
          <div className="bg-white rounded-xl shadow-sm border p-4 min-h-[200px]">
            <div className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-base">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6h8M6 6h.01M6 12h.01M6 18h.01M10 12h8m-8 6h8"/></svg>
              Filters <span className="text-xs font-normal text-gray-400">(0)</span>
            </div>
            {/* Add filter controls here if needed */}
          </div>
        </aside>
        {/* Main content */}
        <section className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              <span>Showing</span>
              <select className="border rounded px-2 py-1" style={{minWidth: 60}}>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>per page</span>
              <span className="ml-2">Page 1 of 1</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border mb-4">
            <div className="flex items-center gap-2 px-4 py-2 border-b">
              <input type="checkbox" className="accent-green-600 w-4 h-4" />
              <span className="text-sm">Select All</span>
              <button className="text-green-700 font-semibold text-sm ml-4 flex items-center gap-1 hover:underline">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
                Download Excel
              </button>
            </div>
            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-16">
              <img src="/assets/ojk-logo.png" alt="No unlocked" className="w-24 h-24 mb-4 opacity-60" />
              <div className="font-semibold text-lg text-gray-700 mb-2">No unlocked candidates found</div>
              <div className="text-gray-500 text-sm mb-4">Please modify search and expand you search criteria</div>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 font-semibold" onClick={() => navigate(-1)}>Modify search</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UnlockedCandidates;

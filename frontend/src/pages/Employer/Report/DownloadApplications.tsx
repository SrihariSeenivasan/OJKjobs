import { useNavigate } from "react-router-dom";

const DownloadApplications = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f7f6f2] px-8 py-8">
      <button className="flex items-center gap-2 mb-6 text-black font-semibold text-lg" onClick={() => navigate(-1)}>
        <svg width="24" height="24" fill="none" stroke="#253858" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>
      <h1 className="text-3xl font-bold text-[#253858] mb-6">Download applications</h1>
      <div className="bg-white rounded-xl shadow-sm border p-8 flex items-center gap-8 max-w-5xl">
        <div className="flex-1 min-w-0">
          <div className="text-2xl font-semibold text-[#253858] mb-2">Download applications from last 7 days</div>
          <div className="text-gray-700 text-base mb-4">You can download applications received across all jobs in CSV format.</div>
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2 text-gray-600 text-base">
              <svg width="20" height="20" fill="none" stroke="#5e6c84" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              You have downloaded
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-base">
              <svg width="20" height="20" fill="none" stroke="#5e6c84" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              You have <b className="mx-1">0 applications</b> from <b className="mx-1">0 jobs</b> in the last 7 days.
            </div>
          </div>
          <button className="bg-gray-300 text-white rounded px-6 py-3 font-semibold text-lg cursor-not-allowed" disabled>Download now</button>
        </div>
        <div className="flex-shrink-0">
          <img src="/assets/ojk-logo.png" alt="Download" className="w-40 h-40 opacity-90" />
        </div>
      </div>
    </div>
  );
};

export default DownloadApplications;

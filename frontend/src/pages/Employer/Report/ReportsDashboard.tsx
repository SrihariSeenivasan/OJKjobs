import { useState } from "react";
import ContactPopup from "../Common/ContactPopup";

const ReportsDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#f7f6f2] px-8 py-8">
      <h1 className="text-3xl font-bold text-[#253858] mb-6">Reports</h1>
      <div className="max-w-sm">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block bg-gray-100 p-2 rounded-full">
              <svg width="32" height="32" fill="none" stroke="#5e6c84" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            <div>
              <div className="text-xl font-semibold text-[#253858]">Applications</div>
              <div className="text-gray-700 text-sm">Get all applications received in a single report</div>
            </div>
          </div>
          <button className="text-green-700 font-semibold mt-4 flex items-center gap-1 hover:underline" onClick={() => window.location.href='/Employer/Reports/Download-Applications'}>
            View Report <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div className="text-gray-700 text-sm mt-2">
          Can't find the data you need?{' '}
          <button className="text-blue-700 underline" onClick={() => setShowModal(true)}>Contact sales team</button>
        </div>
      </div>

      {/* Modal */}
      <ContactPopup open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ReportsDashboard;

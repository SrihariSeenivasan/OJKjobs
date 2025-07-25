import { ArrowDownToLine, MessageCircleQuestion, Users2 } from "lucide-react";
import { useState } from "react";
import ContactPopup from "../Common/ContactPopup";

const ReportsDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#FFF7E0] px-2 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-[#253858] mb-6">Reports</h1>
      <div className="max-w-sm w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-[#fbb040]/20 p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block bg-[#FFF7E0] p-2 rounded-full border border-[#fbb040]/30">
              <Users2 size={32} stroke="#fbb040" strokeWidth={2.2} />
            </span>
            <div>
              <div className="text-xl font-semibold text-[#253858]">Applications</div>
              <div className="text-gray-700 text-sm">Get all applications received in a single report</div>
            </div>
          </div>
          <button className="mt-4 flex items-center gap-2 font-semibold text-[#fbb040] hover:underline hover:text-orange-500 transition-all duration-200" onClick={() => window.location.href='/Employer/Reports/Download-Applications'}>
            View Report <ArrowDownToLine size={18} stroke="#fbb040" strokeWidth={2.2} />
          </button>
        </div>
        <div className="text-gray-700 text-sm mt-2 flex items-center gap-2">
          <MessageCircleQuestion size={18} stroke="#fbb040" strokeWidth={2} />
          <span>Can't find the data you need?</span>
          <button className="text-[#fbb040] underline font-semibold hover:text-orange-500 transition-all duration-200" onClick={() => setShowModal(true)}>Contact sales team</button>
        </div>
      </div>

      {/* Modal */}
      <ContactPopup open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ReportsDashboard;

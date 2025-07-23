import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Evangelin Gladin");
  const [email, setEmail] = useState("evanglad@gmail.com");
  const [mobile, setMobile] = useState("9619905777");
  const [gst, setGst] = useState("27AAMCB4079M1Z1");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#253858]">Profile</h2>
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2 rounded transition-colors"
                  onClick={() => setIsEditing(false)}
                >Cancel</button>
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded transition-colors"
                  onClick={() => {
                    setIsEditing(false);
                    setShowPopup(true);
                    setTimeout(() => {
                      setShowPopup(false);
                      navigate("/Employer/Jobs");
                    }, 1500);
                  }}
                >Save</button>
              </div>
            ) : (
              <button
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded transition-colors"
                onClick={() => setIsEditing(true)}
              >Edit</button>
            )}
          </div>
          {showPopup && (
            <div className="fixed top-6 right-8 z-[9999] bg-white border border-green-400 shadow-lg rounded-lg px-6 py-3 flex items-center gap-2 animate-fade-in">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M17 9l-5.5 5.5L7 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-green-700 font-medium">Profile updated successfully!</span>
            </div>
          )}
          <form className="space-y-8" onSubmit={e => e.preventDefault()}>
            <div>
              <h3 className="text-xl font-semibold text-[#253858] mb-4">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-1" htmlFor="name">Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    readOnly={!isEditing}
                    onChange={e => setName(e.target.value)}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none ${isEditing ? "bg-white" : ""}`}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly={!isEditing}
                    onChange={e => setEmail(e.target.value)}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none ${isEditing ? "bg-white" : ""}`}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1" htmlFor="mobile">Mobile *</label>
                  <input
                    id="mobile"
                    type="text"
                    value={mobile}
                    readOnly={!isEditing}
                    onChange={e => setMobile(e.target.value)}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none ${isEditing ? "bg-white" : ""}`}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#253858] mb-4">GST / ISD-GST Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative">
                  <label className="block text-gray-700 text-sm mb-1" htmlFor="gst">GST / ISD-GST No.</label>
                  <input
                    id="gst"
                    type="text"
                    value={gst}
                    readOnly={!isEditing}
                    onChange={e => setGst(e.target.value)}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none pr-24 ${isEditing ? "bg-white" : ""}`}
                  />
                  <span className="absolute top-9 right-4 flex items-center gap-1 text-purple-500 font-medium text-sm bg-purple-50 px-3 py-1 rounded-full">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a78bfa"/><path d="M17 9l-5.5 5.5L7 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Verified
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                <div className="font-medium text-gray-700 mb-2">We found following company details</div>
                <div className="text-gray-700 text-sm mb-1"><span className="font-semibold">Company name:</span> BOT DIGITAL SOLUTIONS PRIVATE LIMITED</div>
                <div className="text-gray-700 text-sm"><span className="font-semibold">Address:</span> 10TH FLOOR, 1007-1008, Mahavir Platinum, OP RBK, NEAR INDIAN OIL NAGAR, Govandi, Mumbai, Mumbai Suburban, Maharashtra, 400043, Mumbai, Maharashtra 400043</div>
              </div>
              <div className="flex items-center mt-4">
                <input type="checkbox" checked readOnly className="form-checkbox h-4 w-4 text-green-600" />
                <span className="ml-2 text-gray-700 text-sm">I verify my company details and understand that the invoices would be generated using the same information.</span>
              </div>
            </div>
            {/* ...existing code... */}
          </form>
        </div>
      </main>
    </div>
  );
};

export default EmployerProfile;

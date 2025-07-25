import React, { useState } from "react";

const EmployerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Evangelin Gladin");
  const [email, setEmail] = useState("evanglad@gmail.com");
  const [mobile, setMobile] = useState("9619905777");
  const [gst, setGst] = useState("27AAMCB4079M1Z1");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = (path: string) => console.log(`Navigating to: ${path}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#253858] mb-2">Profile Management</h2>
              <p className="text-gray-600">Manage your account information and company details</p>
            </div>
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#fbb040] hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => {
                    setIsEditing(false);
                    setShowPopup(true);
                    setTimeout(() => {
                      setShowPopup(false);
                      navigate("/Employer/Jobs");
                    }, 1500);
                  }}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                className="bg-[#fbb040] hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Success Popup */}
        {showPopup && (
          <div className="fixed top-6 right-6 z-[9999] bg-white border-l-4 border-[#fbb040] shadow-xl rounded-xl px-6 py-4 flex items-center gap-3 animate-fade-in max-w-sm">
            <div className="w-8 h-8 bg-[#fbb040] rounded-full flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M17 9l-5.5 5.5L7 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[#253858] font-semibold">Success!</div>
              <div className="text-gray-600 text-sm">Profile updated successfully</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Details Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#fbb040] to-orange-500 rounded-xl flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3" stroke="#fff" strokeWidth="2"/>
                    <path d="M16 21v-2a4 4 0 0 0-8 0v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#253858]">Basic Details</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-gray-700 text-sm font-medium" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      readOnly={!isEditing}
                      onChange={e => setName(e.target.value)}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:border-transparent ${
                        isEditing 
                          ? "bg-white border-gray-200 hover:border-[#fbb040]" 
                          : "bg-orange-50 border-orange-100"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-700 text-sm font-medium" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      readOnly={!isEditing}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:border-transparent ${
                        isEditing 
                          ? "bg-white border-gray-200 hover:border-[#fbb040]" 
                          : "bg-orange-50 border-orange-100"
                      }`}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <label className="block text-gray-700 text-sm font-medium" htmlFor="mobile">
                      Mobile Number *
                    </label>
                    <input
                      id="mobile"
                      type="text"
                      value={mobile}
                      readOnly={!isEditing}
                      onChange={e => setMobile(e.target.value)}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:border-transparent ${
                        isEditing 
                          ? "bg-white border-gray-200 hover:border-[#fbb040]" 
                          : "bg-orange-50 border-orange-100"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#fbb040] to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm opacity-90">Account Type: Employer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm opacity-90">Status: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm opacity-90">Verification: Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GST Details Card */}
        <div className="mt-6">
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#fbb040] to-orange-500 rounded-xl flex items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#fff" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="#fff" strokeWidth="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="#fff" strokeWidth="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="#fff" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#253858]">GST / ISD-GST Details</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="gst">
                  GST / ISD-GST Number
                </label>
                <div className="relative">
                  <input
                    id="gst"
                    type="text"
                    value={gst}
                    readOnly={!isEditing}
                    onChange={e => setGst(e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 pr-28 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#fbb040] focus:border-transparent ${
                      isEditing 
                        ? "bg-white border-gray-200 hover:border-[#fbb040]" 
                        : "bg-orange-50 border-orange-100"
                    }`}
                  />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2 text-[#fbb040] font-semibold text-sm bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#fbb040"/>
                      <path d="M17 9l-5.5 5.5L7 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Company Details Card */}
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#fbb040] rounded-full flex items-center justify-center">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                    <path d="M17 9l-5.5 5.5L7 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-bold text-[#253858]">Verified Company Details</div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                  <div className="font-semibold text-gray-700 text-sm">Company Name:</div>
                  <div className="text-gray-700 text-sm sm:col-span-2">BOT DIGITAL SOLUTIONS PRIVATE LIMITED</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                  <div className="font-semibold text-gray-700 text-sm">Address:</div>
                  <div className="text-gray-700 text-sm sm:col-span-2">
                    10TH FLOOR, 1007-1008, Mahavir Platinum, OP RBK, NEAR INDIAN OIL NAGAR, Govandi, Mumbai, Mumbai Suburban, Maharashtra, 400043, Mumbai, Maharashtra 400043
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Checkbox */}
            <div className="flex items-start gap-3 mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <input 
                type="checkbox" 
                checked 
                readOnly 
                className="mt-0.5 h-5 w-5 text-[#fbb040] border-2 border-orange-300 rounded focus:ring-[#fbb040] focus:ring-2" 
              />
              <span className="text-gray-700 text-sm leading-relaxed">
                I verify my company details and understand that the invoices would be generated using the same information.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
            <p className="text-gray-600 text-sm mb-4">
              Need help with your profile? Contact our support team.
            </p>
            <button className="bg-gradient-to-r from-[#fbb040] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );  
};

export default EmployerProfile;
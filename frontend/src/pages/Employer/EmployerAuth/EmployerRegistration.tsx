import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OjkLogo from "../../../components/common/OjkLogo";

const EmployerRegistration = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10 digit mobile number");
      return;
    }
    setError("");
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/Employer/verifyOtp", { state: { mobile } });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  const [showVideo, setShowVideo] = useState(false);

  const handleWatchVideo = () => setShowVideo(true);
  const handleCloseVideo = () => setShowVideo(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-6 relative max-w-xl w-full">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={handleCloseVideo}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Sample Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <OjkLogo className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="font-bold text-lg sm:text-xl text-orange-600 tracking-tight">
                OJK jobs
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-8 items-center text-slate-700 font-medium">
              <button 
                className="hover:text-orange-600 transition-colors duration-200" 
                onClick={() => navigate("/Employer/BuyPackageSelection")}
              >
                Pricing
              </button>
              <button 
                className="hover:text-orange-600 transition-colors duration-200 flex items-center gap-1" 
                onClick={() => navigate("/")}
              >
                Looking for a job 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex gap-3">
              <button className="px-4 py-2 border border-orange-500 rounded-lg font-semibold text-orange-600 bg-white hover:bg-orange-50 transition-all duration-200 hover:shadow-md">
                Contact us
              </button>
              <button className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                Login/Sign up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col xl:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-16 gap-8 lg:gap-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-2xl">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            🚀 Trusted by 7 Lakh+ Employers
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Hire top talent in{" "}
            <span className="relative">
              <span className="text-orange-600">48 hours</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" fill="none">
                <path d="M2 10C20 5 40 2 60 4C75 6 85 8 98 10" stroke="#FB923C" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            {" "}with{" "}
            <span className="text-orange-600">OJK jobs</span>.
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
            Streamline your recruitment with AI-driven precision. Single solution from Fresher to experienced hiring.
          </p>
          
          <button
            className="flex items-center gap-3 text-orange-600 font-semibold mb-12 group hover:text-orange-700 transition-colors"
            onClick={handleWatchVideo}
            type="button"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="absolute inset-0 bg-orange-300 rounded-full animate-ping opacity-25"></div>
            </div>
            <span className="text-lg cursor-pointer">Watch video</span>
          </button>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 w-full border-t border-orange-100 pt-8">
            <div className="text-center sm:text-left">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                6 Crores+
              </div>
              <div className="text-sm lg:text-base text-slate-600 mt-1">Qualified candidates</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                7 Lakhs+
              </div>
              <div className="text-sm lg:text-base text-slate-600 mt-1">Employers use OJK jobs</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                900+
              </div>
              <div className="text-sm lg:text-base text-slate-600 mt-1">Available cities</div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex justify-center items-center w-full max-w-md xl:max-w-lg">
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 lg:p-8 w-full relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-50 to-orange-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                  Let's get started
                </h2>
                <p className="text-base text-slate-600">
                  Hire top talent faster with OJK jobs
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-base font-semibold text-slate-800 mb-3">
                    Mobile number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full px-4 py-3 lg:py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-100 ${
                        error 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-orange-200 focus:border-orange-500'
                      }`}
                      placeholder="Enter 10 digit mobile number"
                      value={mobile}
                      onChange={e => {
                        setMobile(e.target.value);
                        if (error) setError("");
                      }}
                      onKeyPress={handleKeyPress}
                      maxLength={10}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  )}
                </div>

                <button
                  className="w-full py-3 lg:py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  onClick={handleContinue}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
                
                <div className="text-xs text-slate-500 leading-relaxed pt-2">
                  By clicking continue, you agree to the OJK jobs{" "}
                  <a href="#" className="text-orange-600 hover:text-orange-700 underline font-medium">
                    Terms of service
                  </a>
                  {" "}&{" "}
                  <a href="#" className="text-orange-600 hover:text-orange-700 underline font-medium">
                    Privacy policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerRegistration;
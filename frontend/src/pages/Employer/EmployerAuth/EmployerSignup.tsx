import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock OjkLogo component
interface OjkLogoProps {
  className?: string;
}
const OjkLogo = ({ className }: OjkLogoProps) => (
  <div className={`${className} bg-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
    OJK
  </div>
);

const employeeOptions = [
  "0-50",
  "51-100",
  "101-300",
  "301-500",
  "501-1000",
  "1000 above",
];

// Removed unused PRIMARY_TEXT

const EmployerSignup = () => {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    isConsultancy: false,
    employees: "",
    workEmail: "",
    agree: false,
    mobile: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEmployeeSelect = (option: string) => {
    setForm((prev) => ({ ...prev, employees: option }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      setError("Please enter a valid 10 digit mobile number");
      return;
    }
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const res = await fetch("/api/employer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Registration successful, OTP sent
        alert("Registration successful! OTP sent to your mobile.");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleSupport = () => {
    navigate("/Employer/SupportHome");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Common Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <OjkLogo className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-800 tracking-tight">OJK Jobs</span>
                <span className="text-xs text-gray-500 font-medium">Find Your Perfect Match</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={handleSupport}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a.75.75 0 000 1.5 2.25 2.25 0 012.25 2.25.75.75 0 001.5 0 3.75 3.75 0 00-7.5 0 .75.75 0 001.5 0 2.25 2.25 0 012.25-2.25z" />
                </svg>
                Support
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
  <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
  {/* Left Section - Features */}
  <div
    className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative flex-col items-start overflow-hidden lg:max-h-[calc(100vh-4rem)]"
    style={{
      position: 'fixed',
      top: '4rem',
      left: 0,
      height: 'calc(100vh - 4rem)',
      zIndex: 20,
    }}
  >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-400 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-start p-8 lg:p-12 min-h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            {/* Welcome Section */}
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">Trusted by 10,000+ companies</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Find Top Talent
              </h1>
              <p className="text-lg text-purple-100 leading-relaxed">
                Connect with skilled professionals and build your dream team with our AI-powered hiring platform.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-orange-300">AI-Powered Matching</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Our advanced algorithms match you with the perfect candidates based on skills, experience, and cultural fit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">Quality Candidates</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Access pre-screened, verified professionals ready to contribute to your company's success.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-pink-300">Cost Effective</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Save time and money with our streamlined hiring process and competitive pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
  <div
    className="flex-1 flex items-center justify-center p-4 lg:p-8"
    style={{
      marginLeft: undefined,
      width: undefined,
    }}
  >
  <div className="w-full max-w-lg lg:ml-[40%] lg:w-[60%]">
          <div className="w-full max-w-lg">
            {/* Form Card */}
            <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-3xl p-8 lg:p-10 border border-white/20 relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-80"></div>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Let's get started!</h2>
                <p className="text-gray-600">Create your employer account in minutes</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter 10 digit mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    maxLength={10}
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Swiggy, Amazon, Google"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    required
                  />
                </div>

                {/* Consultancy Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isConsultancy"
                    checked={form.isConsultancy}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-400 border-gray-300 rounded focus:ring-orange-400 focus:ring-2"
                  />
                  <label className="text-sm text-gray-700">
                    This is a consultancy (Hiring or staffing agency)
                  </label>
                </div>

                {/* Employee Count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Number of Employees
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {employeeOptions.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          form.employees === option
                            ? "bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg transform scale-105"
                            : "bg-white/50 text-gray-700 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                        }`}
                        onClick={() => handleEmployeeSelect(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Email <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    placeholder="Enter your work email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-400 border-gray-300 rounded focus:ring-orange-400 focus:ring-2 mt-0.5"
                    required
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    I agree to OJK Job's{" "}
                    <a href="/terms-and-conditions" className="text-orange-500 hover:text-orange-600 underline font-medium">
                      Terms of Service
                    </a>
                    {" "}and{" "}
                    <a href="/privacy-policy" className="text-orange-500 hover:text-orange-600 underline font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Account & Post Job
                    </div>
                  )}
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
    
  );
}

export default EmployerSignup;
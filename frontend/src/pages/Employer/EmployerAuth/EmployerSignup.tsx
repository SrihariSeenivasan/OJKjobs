import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const employeeOptions = [
  "0-50",
  "51-100",
  "101-300",
  "301-500",
  "501-1000",
  "1000 above",
];

// Tailwind custom colors using arbitrary values

const PRIMARY_TEXT = 'text-[#fbb040]';


const EmployerSignup: React.FC = () => {
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
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
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
        navigate("/Employer/verifyOtp", { state: { mobile: form.mobile } });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Section */}
      <div className="w-full md:max-w-md bg-[#3c2a4d] text-white flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 h-[320px] md:h-auto min-h-[320px]">
        <div className="mb-6 md:mb-8">
          <span className={`text-2xl md:text-3xl font-bold ${PRIMARY_TEXT}`}>OJK Jobs</span>
        </div>
        <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
          What does OJK offer <span className="text-lg md:text-2xl">👋</span>
        </h2>
        <div className="mb-4 md:mb-6">
          <div className="mb-2 flex items-center">
            <span className="inline-block mr-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M2 12l20-7-7 20-4-9-9-4z" fill="#fbb040"/></svg>
            </span>
            <span className="text-lg md:text-xl font-semibold">Job Posting</span>
          </div>
          <p className="text-xs md:text-sm mb-3 md:mb-4">A comprehensive platform for your hiring needs</p>
          <ul className="list-none space-y-2">
            <li className="flex items-start gap-2 text-xs md:text-sm">
              <span className="text-[#fbb040]">✓</span>
              <span>AI-powered classic and premium job postings to get candidates at desired speed</span>
            </li>
            <li className="flex items-start gap-2 text-xs md:text-sm">
              <span className="text-[#fbb040]">✓</span>
              <span>Unlimited applications with 15 days job visibility on the platform</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center px-2 py-6 md:py-0">
        <form
          className="bg-white shadow-2xl rounded-2xl p-4 md:p-10 w-full max-w-lg transition-all duration-300 border border-[#ffe5b8]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-lg md:text-2xl font-bold mb-6 md:mb-8 text-center text-[#253858]">Let's get you started!</h1>
          <div className="mb-3 md:mb-4">
            <label className="block font-medium mb-1 text-xs md:text-base">Your full name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-[#ffe5b8] rounded px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-xs md:text-base"
              required
            />
          </div>
          <div className="mb-3 md:mb-4">
            <label className="block font-medium mb-1 text-xs md:text-base">Mobile number</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter 10 digit mobile number"
              className="w-full border border-[#ffe5b8] rounded px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-xs md:text-base"
              maxLength={10}
              required
            />
          </div>
          <div className="mb-3 md:mb-4">
            <label className="block font-medium mb-1 text-xs md:text-base">Enter the name of your company</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="e.g Swiggy"
              className="w-full border border-[#ffe5b8] rounded px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-xs md:text-base"
              required
            />
          </div>
          <div className="mb-3 md:mb-4 flex items-center">
            <input
              type="checkbox"
              name="isConsultancy"
              checked={form.isConsultancy}
              onChange={handleChange}
              className="mr-2 accent-[#fbb040]"
            />
            <label className="text-xs md:text-sm">This is a consultancy (Hiring or staffing agency)</label>
          </div>
          <div className="mb-3 md:mb-4">
            <label className="block font-medium mb-2 text-xs md:text-base">Number of employees in your company</label>
            <div className="flex flex-wrap gap-2">
              {employeeOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-3 py-1 md:px-4 md:py-2 rounded border text-xs md:text-base transition-colors duration-200 ${form.employees === option ? "bg-[#fbb040] text-white border-[#fbb040]" : "bg-white text-[#253858] border-[#ffe5b8]"}`}
                  onClick={() => handleEmployeeSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3 md:mb-4">
            <label className="block font-medium mb-1 text-xs md:text-base">Work email <span className="text-gray-400 text-xs">(Optional)</span></label>
            <input
              type="email"
              name="workEmail"
              value={form.workEmail}
              onChange={handleChange}
              placeholder="Enter your work email address"
              className="w-full border border-[#ffe5b8] rounded px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#fbb040] text-xs md:text-base"
            />
          </div>
          <div className="mb-5 md:mb-6 flex items-center">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mr-2 accent-[#fbb040]"
              required
            />
            <span className="text-xs md:text-sm">
              I agree to OJK Job's
              <a href="/terms-and-conditions" className="text-[#fbb040] underline mx-1">Terms of Service</a>
              and
              <a href="/privacy-policy" className="text-[#fbb040] underline mx-1">Privacy Policy</a>
            </span>
          </div>
          {error && (
            <div className="text-red-500 text-xs mb-2">{error}</div>
          )}
          <button
            type="submit"
            className={`w-full bg-[#fbb040] text-white font-semibold py-2 md:py-3 rounded-lg hover:bg-[#e09c2d] transition text-xs md:text-base shadow-md ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Post a job'}
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default EmployerSignup;

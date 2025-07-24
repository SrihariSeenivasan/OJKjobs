import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OjkLogo from "../../components/common/OjkLogo";

const EmployerRegistration: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10 digit mobile number");
      return;
    }
    setError("");
    navigate("/Employer/verifyOtp", { state: { mobile } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b border-[#F3F4F6] bg-white">
        <div className="flex items-center gap-3">
          <OjkLogo className="h-10 w-10" />
          <span className="font-bold text-xl text-[#FF6F00] tracking-tight">OJK jobs</span>
        </div>
        <nav className="flex gap-8 items-center text-[#253858] font-medium">
          {/* <a href="#" className="hover:text-[#FF6F00]">Product</a>
          <a href="#" className="hover:text-[#FF6F00]">Enterprise</a>
          <a href="#" className="hover:text-[#FF6F00]">Blogs</a> */}
          <button className="hover:text-[#FF6F00] bg-transparent border-none cursor-pointer" onClick={() => navigate("/Employer/BuyPackageSelection")}>Pricing</button>
          <button className="hover:text-[#FF6F00] bg-transparent border-none cursor-pointer" onClick={() => navigate("/")}>Looking for a job <span className="ml-1">↗</span></button>
        </nav>
        <div className="flex gap-4">
          <button className="px-5 py-2 border border-[#FF6F00] rounded font-semibold text-[#FF6F00] bg-white hover:bg-[#FFF3E0] transition">Contact us</button>
          <button className="px-5 py-2 rounded font-semibold text-white bg-[#FF6F00] hover:bg-[#F57C00] transition">Login/Sign up</button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-12 bg-white">
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <h1 className="text-5xl font-bold text-[#253858] mb-6 leading-tight">Hire top talent in 48 hours with <span className="text-[#FF6F00]">OJK jobs</span>.</h1>
          <p className="text-lg text-[#42526E] mb-6">Streamline your recruitment with AI-driven precision. Single solution from Fresher to experienced hiring.</p>
          <a href="#" className="flex items-center gap-2 text-[#FF6F00] font-semibold mb-8">
            <svg width="22" height="22" fill="none" stroke="#FF6F00" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="#FF6F00"/></svg>
            Watch video
          </a>
          <div className="flex gap-12 mt-8 border-t pt-8">
            <div>
              <div className="text-2xl font-bold text-[#FF6F00]">6 Crores+</div>
              <div className="text-base text-[#253858]">Qualified candidates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF6F00]">7 Lakhs+</div>
              <div className="text-base text-[#253858]">Employers use OJK jobs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF6F00]">900+</div>
              <div className="text-base text-[#253858]">Available cities</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg border border-[#F3F4F6] p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#253858] mb-2">Let's get started</h2>
            <p className="text-base text-[#42526E] mb-6">Hire top talent faster with OJK jobs</p>
            <label className="block text-base font-semibold text-[#253858] mb-2">Mobile number</label>
            <input
              type="text"
              className="border border-[#FF6F00] rounded px-4 py-3 w-full text-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
              placeholder="Enter 10 digit mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              maxLength={10}
            />
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <button
              className="w-full py-3 rounded font-bold text-white text-lg bg-[#FF6F00] hover:bg-[#F57C00] transition mb-4"
              onClick={handleContinue}
            >Continue</button>
            
            <div className="text-xs text-[#42526E] mb-2">By clicking continue, you agree to the OJK jobs <a href="#" className="underline">Terms of service</a> & <a href="#" className="underline">Privacy policy</a></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerRegistration;

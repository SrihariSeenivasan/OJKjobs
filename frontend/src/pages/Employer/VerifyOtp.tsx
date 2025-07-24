import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OjkLogo from "../../components/common/OjkLogo";

const EmployerRegisterVerifyOtp: React.FC<{ mobile?: string }> = ({ mobile = "" }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (idx: number, val: string) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      setError("");
      if (val && idx < 3) {
        inputRefs[idx + 1].current?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(["", "", "", ""]);
    setError("");
    // Mock resend logic: show a message for demonstration
    alert("OTP resent to your mobile number");
  };

  const handleLogin = () => {
    if (otp.some(d => d === "")) {
      setError("Please enter the complete OTP");
      return;
    }
    // Mock login logic: check if OTP is '1234' for demo
    if (otp.join("") === "1234") {
      navigate("/Employer/Jobs");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center px-8 py-4 border-b border-[#F3F4F6] bg-white">
        <OjkLogo className="h-10 w-10" />
        <span className="font-bold text-xl text-[#FF6F00] ml-3 tracking-tight">OJK jobs</span>
      </header>
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-12 bg-[#FAF9F6]">
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          <h1 className="text-5xl font-bold text-[#253858] mb-6 leading-tight">Hire top talent in 48 hours with <span className="text-[#FF6F00]">OJK jobs</span>.</h1>
          <p className="text-lg text-[#42526E] mb-6">Streamline your recruitment with AI-driven precision. Single solution from Fresher to experienced hiring.</p>
          <div className="flex gap-12 mt-8 border-t pt-8">
            <div>
              <div className="text-2xl font-bold text-[#FF6F00]">6 crore+</div>
              <div className="text-base text-[#253858]">Qualified candidates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF6F00]">7 lakhs+</div>
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
            <button className="flex items-center gap-2 text-[#253858] font-semibold mb-6" type="button" onClick={() => window.history.back()}>
              <svg width="22" height="22" fill="none" stroke="#253858" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              Back
            </button>
            <h2 className="text-2xl font-bold text-[#253858] mb-2">Verify OTP</h2>
            <p className="text-base text-[#42526E] mb-6">A one time password sent on your mobile number<br /><span className="font-bold text-[#FF6F00]">+91-{mobile || "XXXXXXXXXX"}</span></p>
            <div className="flex gap-4 mb-4">
              {otp.map((val, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-2xl text-center border border-[#FF6F00] rounded focus:outline-none focus:ring-2 focus:ring-[#FF6F00] bg-[#FAF9F6]"
                  value={val}
                  onChange={e => handleChange(idx, e.target.value)}
                />
              ))}
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <div className="text-sm text-[#42526E] mb-4">Didn't receive OTP? Resend in <span className="font-bold text-[#FF6F00]">00:{timer.toString().padStart(2, "0")}</span> Sec</div>
            <button
              className="w-full py-3 rounded font-bold text-white text-lg bg-[#FF6F00] disabled:bg-[#F3F4F6] disabled:text-[#A0AEC0] transition mb-2"
              onClick={handleLogin}
              disabled={otp.some(d => d === "")}
            >Login</button>
            <button
              className="w-full py-2 rounded font-semibold text-[#FF6F00] bg-white border border-[#FF6F00] hover:bg-[#FFF3E0] transition"
              type="button"
              onClick={handleResend}
              disabled={timer > 0}
            >Resend OTP</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerRegisterVerifyOtp;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OjkLogo from "../../../components/common/OjkLogo";

interface Props {
  mobile?: string;
}

const inputRefs: React.RefObject<HTMLInputElement>[] = [
  React.createRef<HTMLInputElement>(),
  React.createRef<HTMLInputElement>(),
  React.createRef<HTMLInputElement>(),
  React.createRef<HTMLInputElement>()
];

const EmployerRegisterVerifyOtp: React.FC<Props> = ({ mobile = "" }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  useEffect(() => {
    // Reset timer when mobile prop changes
    setTimer(30);
    setOtp(["", "", "", ""]);
    setError("");
  }, [mobile]);
  useEffect(() => {
    // Focus first input on mount
    const firstInput = inputRefs[0]?.current;
    if (firstInput) firstInput.focus();
  }, []);

  const handleChange = (idx: number, val: string) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      setError("");
      setShake(false);
      if (val && idx < 3) {
        inputRefs[idx + 1]?.current?.focus();
      }
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs[idx - 1]?.current?.focus();
    }
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 4);
    if (/^\d{1,4}$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      setError("");
      const nextFocusIndex = Math.min(pastedData.length, 3);
      inputRefs[nextFocusIndex]?.current?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(["", "", "", ""]);
    setError("");
    inputRefs[0]?.current?.focus();
    // Mock resend logic
    alert("OTP resent to your mobile number");
  };

  const handleLogin = async () => {
    if (otp.some(d => d === "")) {
      setError("Please enter the complete OTP");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (otp.join("") === "1234") {
      navigate("/Employer/Jobs");
    } else {
      setError("Invalid OTP. Please try again.");
      setShake(true);
      setOtp(["", "", "", ""]);
      inputRefs[0].current?.focus();
      setTimeout(() => setShake(false), 500);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 flex flex-col">
      {/* Enhanced Header with subtle shadow and gradient */}
      <header className="w-full flex items-center px-4 sm:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <OjkLogo className="h-10 w-10 flex-shrink-0" />
        <span className="font-bold text-xl text-orange-600 ml-3 tracking-tight">OJK jobs</span>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 py-8 lg:py-16 gap-8 lg:gap-16">
        {/* Left side content - enhanced with better spacing and animations */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-2xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Hire top talent in 
            <span className="block text-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              48 hours
            </span>
            with OJK jobs.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg">
            Streamline your recruitment with AI-driven precision. Single solution from Fresher to experienced hiring.
          </p>
          
          {/* Enhanced stats with hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-8 pt-8 border-t border-orange-100 w-full max-w-lg lg:max-w-none">
            {[
              { value: "6 crore+", label: "Qualified candidates" },
              { value: "7 lakhs+", label: "Employers use OJK jobs" },
              { value: "900+", label: "Available cities" }
            ].map((stat, idx) => (
              <div key={idx} className="group hover:scale-105 transition-transform duration-200 cursor-default">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-200">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-slate-700 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side form - enhanced with glassmorphism and animations */}
        <div className="flex-1 flex justify-center items-center w-full max-w-md lg:max-w-lg">
          <div className={`bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 w-full transform transition-all duration-300 ${shake ? 'animate-pulse' : ''}`}>
            {/* Back button with improved styling */}
            <button 
              className="flex items-center gap-2 text-slate-700 font-semibold mb-6 hover:text-orange-600 transition-colors duration-200 group" 
              type="button" 
              onClick={() => window.history.back()}
            >
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                className="group-hover:-translate-x-1 transition-transform duration-200"
              >
                <path d="M15 19l-7-7 7-7"/>
              </svg>
              Back
            </button>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Verify OTP</h2>
              <p className="text-slate-600 leading-relaxed">
                A one time password sent on your mobile number
                <br />
                <span className="font-bold text-orange-600 text-lg">
                  +91-{mobile || "XXXXXXXXXX"}
                </span>
              </p>
            </div>

            {/* Enhanced OTP inputs with better styling */}
            <div className="flex gap-3 sm:gap-4 mb-6 justify-center">
              {otp.map((val, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold text-center border-2 rounded-xl 
                    focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500
                    bg-white/80 backdrop-blur-sm transition-all duration-200
                    ${val ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-300'}
                    ${error ? 'border-red-400' : ''}
                  `}
                  value={val}
                  onChange={e => handleChange(idx, e.target.value)}
                  onKeyDown={e => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            {/* Enhanced error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Enhanced timer display */}
            <div className="text-sm text-slate-600 mb-6 text-center">
              Didn't receive OTP? 
              {timer > 0 ? (
                <span className="font-semibold">
                  {" "}Resend in <span className="font-bold text-orange-600 tabular-nums">
                    00:{timer.toString().padStart(2, "0")}
                  </span> Sec
                </span>
              ) : (
                <span className="text-orange-600 font-semibold"> You can resend now</span>
              )}
            </div>

            {/* Enhanced buttons with loading states */}
            <div className="space-y-3">
              <button
                className={`w-full py-3 sm:py-4 rounded-xl font-bold text-white text-base sm:text-lg transition-all duration-200 relative overflow-hidden
                  ${otp.some(d => d === "") || isLoading
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                  }
                `}
                onClick={handleLogin}
                disabled={otp.some(d => d === "") || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200
                  ${timer > 0 
                    ? 'text-slate-400 bg-slate-100 cursor-not-allowed' 
                    : 'text-orange-600 bg-white border-2 border-orange-500 hover:bg-orange-50 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg'
                  }
                `}
                type="button"
                onClick={handleResend}
                disabled={timer > 0}
              >
                Resend OTP
              </button>
            </div>

            {/* Demo hint */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
              <strong>Demo:</strong> Use OTP "1234" to login
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerRegisterVerifyOtp;
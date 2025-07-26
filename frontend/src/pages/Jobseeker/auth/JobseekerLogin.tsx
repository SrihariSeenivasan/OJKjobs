import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OjkLogo from '../../../components/common/OjkLogo';
import OtpInput from '../../../components/common/OtpInput';
import { setUser } from '../../../store/slices/authSlice';

const JobseekerLogin: React.FC = () => {
  const [resendTimer, setResendTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!otpSent) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setResendDisabled(false);
            if (timer) clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpSent, resendTimer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      setResendTimer(300); // 5 minutes
      setResendDisabled(true);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Simulate successful OTP verification and set Redux auth state
      dispatch(setUser({
        id: 'jobseeker-1',
        email: 'jobseeker@example.com',
        name: 'Jobseeker',
        role: 'jobseeker',
        isVerified: true,
        profileComplete: true
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  // ...existing code...
  // Only one return statement below:
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#39b54a]/10 py-8 px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-[#39b54a]/30">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#39b54a]/20 flex items-center justify-center mb-2 shadow-md">
            <OjkLogo className="h-10 w-16 drop-shadow-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-[#39b54a]">Candidate Login</h2>
          <p className="text-gray-500 text-base mt-1">Sign in to access your jobseeker dashboard</p>
        </div>
        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-7 w-full">
          <div>
            <label className="block text-base font-semibold text-[#39b54a] mb-1">Mobile Number</label>
            <div className="flex gap-2 mt-1">
              <select
                id="countryCode"
                name="countryCode"
                className="border-2 border-[#39b54a]/30 focus:border-[#39b54a] focus:ring-2 focus:ring-[#39b54a]/20 rounded-lg px-2 py-2 bg-[#39b54a]/10 text-gray-800 w-28 text-base"
                disabled={otpSent}
                required
                defaultValue="+91"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+94">🇱🇰 +94</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+7">🇷🇺 +7</option>
              </select>
              <input
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#39b54a]/30 focus:border-[#39b54a] focus:ring-2 focus:ring-[#39b54a]/20 rounded-lg transition-all duration-200 outline-none bg-[#39b54a]/10 text-gray-800 placeholder-gray-400 shadow-sm text-base"
                placeholder="Enter your mobile number (e.g. 9876543210)"
                pattern="\d{10}"
                maxLength={10}
                minLength={10}
                disabled={otpSent}
                required
              />
            </div>
          </div>
          {otpSent && (
            <div>
              <label className="block text-base font-semibold text-[#39b54a] mb-1">OTP</label>
              <OtpInput value={otp} onChange={setOtp} numInputs={6} isInputNum inputStyle="w-12 h-12 text-2xl border-2 border-[#39b54a]/30 focus:border-[#39b54a] rounded-lg text-center mx-1 bg-[#39b54a]/10 transition-all duration-200 outline-none" />
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  className={`text-[#39b54a] font-semibold hover:underline disabled:opacity-50`}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setResendTimer(300);
                      setResendDisabled(true);
                    }, 800);
                  }}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </button>
                {resendDisabled ? (
                  <span className="text-sm text-gray-500 ml-2">Resend available in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}</span>
                ) : null}
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || (otpSent && otp.length !== 6)}
            className="w-full bg-[#39b54a] text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#2e8c3a] transition-all duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="animate-spin h-6 w-6 mr-2 border-2 border-white border-t-[#39b54a] rounded-full inline-block"></span>
            ) : null}
            {isLoading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-base text-[#39b54a] cursor-pointer hover:underline" onClick={() => window.location.href = '/authReg'}>
            I don't have an account !
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobseekerLogin;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../../components/common/OtpInput';
import { setUser } from '../../store/slices/authSlice';

const EmployerLogin: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Removed showForm and formData state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      dispatch(setUser({
        id: 'EMP' + Math.floor(100000 + Math.random() * 900000),
        name: 'Employer',
        email: mobile + '@employer.com',
        role: 'employer',
        isVerified: true,
        profileComplete: true
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };



  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md">
            <span className="text-3xl">🏢</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-700">Employer Login</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to access your employer dashboard</p>
        </div>
        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className="w-full px-4 py-2 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 outline-none bg-blue-50 text-gray-800 placeholder-gray-400 shadow-sm"
              placeholder="Enter your mobile number"
              disabled={otpSent}
              required
            />
          </div>
          {otpSent && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1">OTP</label>
              <OtpInput value={otp} onChange={setOtp} numInputs={6} isInputNum inputStyle="w-10 h-10 text-xl border-2 border-blue-200 focus:border-blue-500 rounded-lg text-center mx-1 bg-blue-50 transition-all duration-200 outline-none" />
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || (otpSent && otp.length !== 6)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-blue-400 rounded-full inline-block"></span>
            ) : null}
            {isLoading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../../components/common/OtpInput';

const JobseekerLogin: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP send
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 800);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      navigate('/jobseeker-profile', { state: { mobile } });
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold text-blue-700 mb-6 tracking-tight drop-shadow">Jobseeker Login</h2>
      <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="w-full flex flex-col gap-8 items-center">
        <div className="w-full">
          <label htmlFor="mobile" className="block text-base font-semibold text-blue-600 mb-2">Mobile Number</label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-lg transition disabled:bg-gray-100"
            placeholder="Enter your mobile number"
            disabled={otpSent}
          />
        </div>
        {otpSent && (
          <div className="w-full flex flex-col items-center">
            <label htmlFor="otp" className="block text-base font-semibold text-blue-600 mb-2">OTP</label>
            <div className="flex justify-center w-full">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                isInputNum={true}
                inputStyle="mx-1 w-12 h-12 text-center text-xl border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-purple-400 bg-blue-50 shadow-md transition"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Enter the 6-digit OTP sent to your mobile</p>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || (otpSent && otp.replace(/\D/g, '').length < 6)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
      {/* Modal for loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            <span className="text-blue-700 font-semibold">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobseekerLogin;

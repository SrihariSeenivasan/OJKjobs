import React, { useState } from 'react';
import OtpInput from '../../components/common/OtpInput';

const JobseekerRegister: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(false);
      // Registration success logic here
      alert('Registration successful!');
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md">
            <span className="text-3xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-700">Jobseeker Registration</h2>
          <p className="text-gray-500 text-sm mt-1">Register to apply for jobs and manage your profile</p>
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
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-blue-400 rounded-full inline-block"></span>
            ) : null}
            {isLoading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-blue-700 cursor-pointer hover:underline" onClick={() => window.location.href = '/authLog'}>
            I have an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobseekerRegister;

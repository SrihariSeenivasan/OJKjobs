import React, { useState } from 'react';
import OtpInput from '../../components/common/OtpInput';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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
      setIsLoading(false);
      setShowForm(true);
    }, 800);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      dispatch(setUser({
        id: 'EMP' + Math.floor(100000 + Math.random() * 900000),
        name: formData.name,
        email: formData.email,
        role: 'employer',
        isVerified: true,
        profileComplete: true
      }));
      setIsLoading(false);
      navigate('/Dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <div className="w-full max-w-md mx-auto">
        {!showForm ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
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
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md">
                <span className="text-3xl">🏢</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-700">Employer Login</h2>
              <p className="text-gray-500 text-sm mt-1">Access your employer dashboard.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 outline-none bg-blue-50 text-gray-800 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 outline-none bg-blue-50 text-gray-800 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all duration-200 outline-none bg-blue-50 text-gray-800 placeholder-gray-400 shadow-sm"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-blue-400 rounded-full inline-block"></span>
                ) : null}
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeLogin;

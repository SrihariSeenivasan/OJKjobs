import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';

const generateEmployeeId = () => 'OJK' + Math.floor(100000 + Math.random() * 900000);


const JobseekerProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = (location.state && typeof location.state === 'object' && 'mobile' in location.state)
    ? (location.state as { mobile: string }).mobile
    : '';
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    location: '',
    kyc: null as File | null,
    education: '',
    experience: '',
    cv: null as File | null,
    socialLinks: '',
    headline: '',
    employeeId: generateEmployeeId(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal, 2: Professional

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    let newValue: string | File | null = value;
    if (type === 'file' && (target as HTMLInputElement).files) {
      newValue = (target as HTMLInputElement).files![0];
    }
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(setUser({
        id: formData.employeeId,
        name: formData.name,
        email: '',
        role: 'jobseeker',
        isVerified: true,
        profileComplete: true
      }));
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
        {/* Stepper */}
        <div className="flex justify-center items-center mb-8 gap-4">
          <div className={`flex flex-col items-center ${step === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 ${step === 1 ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'}`}>1</div>
            <span className="text-xs mt-1">Personal</span>
          </div>
          <div className="w-8 h-1 bg-gray-300 rounded" />
          <div className={`flex flex-col items-center ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 ${step === 2 ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'}`}>2</div>
            <span className="text-xs mt-1">Professional</span>
          </div>
        </div>
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <form className="space-y-4" onSubmit={handleNext}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input type="tel" value={mobile} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input name="age" type="number" min="18" required value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (City/State)</label>
              <input name="location" type="text" required value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KYC Upload (Aadhaar/Voter ID)</label>
              <input name="kyc" type="file" accept="image/*,.pdf" required onChange={handleChange} className="w-full" />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
          </form>
        )}
        {/* Step 2: Professional Info */}
        {step === 2 && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input name="education" type="text" required value={formData.education} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
              <input name="experience" type="number" min="0" value={formData.experience} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CV Upload</label>
              <input name="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Social Links (optional)</label>
              <input name="socialLinks" type="text" value={formData.socialLinks} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="LinkedIn, Facebook, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
              <textarea name="headline" required value={formData.headline} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Experienced Machine Operator" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <input type="text" value={formData.employeeId} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobseekerProfile;

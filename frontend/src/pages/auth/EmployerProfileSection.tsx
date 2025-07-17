import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { submitEmployerProfile } from '../../store/slices/employerSlice';
import EmployerProfileSetup from './EmployerProfileSetup';
import EmployerReviewStep from './EmployerReviewStep';

const EmployerProfileSection: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'review'>('setup');
  const [logo, setLogo] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [hiringNeeds, setHiringNeeds] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const employerProfile = useSelector((state: RootState) =>
    state.employers.employers.find(e => e.id === user?.id)
  );
  const isVerified = employerProfile?.status === 'approved';

  // Handle profile completion and review submission
  const handleProfileComplete = () => {
    if (!user) return;
    dispatch(submitEmployerProfile({
      id: user.id,
      name: user.name,
      email: user.email,
      category: 'MSME', // default, can be changed by admin
      status: 'pending',
      description,
      logo: logo ? logo.name : undefined,
      hiringNeeds,
      activityLog: [`Registered on ${new Date().toISOString().slice(0, 10)}`],
    }));
    setStep('review');
  };

  // Back to dashboard
  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mr-2">Company Profile {isVerified && <span title="Verified" className="text-green-600 ml-2">✔️</span>}</h2>
      </div>
      {step === 'setup' && (
        <>
          {/* Inline EmployerProfileSetup fields for Redux integration */}
          <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Company Profile Setup</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (optional)</label>
              <input type="file" accept="image/*" onChange={e => setLogo(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
              {logo && <div className="mt-2 text-xs text-gray-500">Selected: {logo.name}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Company Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your company in a few sentences..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Needs</label>
              <div className="flex flex-col gap-2">
                {['Factory Workers','Housekeeping Staff','Cashiers / Sales Staff','Delivery Boys','Kitchen Helpers / Chefs','Others'].map(need => (
                  <label key={need} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={hiringNeeds.includes(need)}
                      onChange={() => setHiringNeeds(prev => prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need])}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{need}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
              onClick={handleProfileComplete}
            >
              Finish & Send for Review
            </button>
          </div>
        </>
      )}
      {step === 'review' && (
        <>
          <EmployerReviewStep />
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium"
              onClick={handleBack}
            >
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerProfileSection;

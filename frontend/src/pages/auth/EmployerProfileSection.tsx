import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { submitEmployerProfile } from '../../store/slices/employerSlice';
import { addNotification } from '../../store/slices/uiSlice';

const EmployerProfileSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    companyLocation: '',
    yearOfEstablishment: '',
    numEmployees: '',
    gstNumber: '',
    logo: null as File | null,
    description: '',
    hiringNeeds: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // Stepper UI
  const steps = ["Company Information", "Profile Details", "Review & Submit", "Under Review"];
  const icons = [
    <span role="img" aria-label="company">🏢</span>,
    <span role="img" aria-label="profile">📄</span>,
    <span role="img" aria-label="review">✔️</span>,
    <span role="img" aria-label="clock">⏲️</span>
  ];

  // Multi-step Form
  // Ref for form section
  const formSectionRef = React.useRef<HTMLDivElement>(null);

  const handleShowProfileForm = () => {
    setShowProfileForm(true);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
        {/* Complete Company Profile Card Section */}
        {!showProfileForm && (
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center w-full max-w-md mx-auto mt-0 mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 text-center">Company Profile</h2>
              <p className="text-gray-600 mb-6 text-center text-base sm:text-lg">Complete your company profile to get started with posting jobs and managing your employer account.</p>
              <button
                className="bg-blue-600 text-white py-3 px-6 sm:px-8 rounded-md font-semibold text-base sm:text-lg hover:bg-blue-700 transition w-full"
                onClick={handleShowProfileForm}
              >
                Complete Company Profile
              </button>
            </div>
          </div>
        )}
        {/* Company Profile Form Section */}
        {showProfileForm && (
          <div className="mt-8" ref={formSectionRef}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h1>
              <p className="text-gray-600">Fill out the form below to set up your company profile</p>
            </div>
            {/* Stepper UI */}
            <div className="flex items-center justify-between mb-8">
              {(() => {
                const items = [];
                for (let i = 0; i < steps.length; i++) {
                  items.push(
                    <div key={steps[i]} className="flex-1 flex flex-col items-center">
                      <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-2 ${step === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        style={{ border: step === i ? '2px solid #2563eb' : '2px solid #e5e7eb' }}>
                        {icons[i]}
                      </div>
                      <span className={`text-sm font-medium ${step === i ? 'text-blue-700' : 'text-gray-700'}`}>{steps[i]}</span>
                    </div>
                  );
                  if (i < steps.length - 1) {
                    let dividerColor = 'bg-gray-200';
                    if (step > i) dividerColor = 'bg-blue-600';
                    else if (step === 2 && i === 2) dividerColor = 'bg-yellow-400';
                    items.push(
                      <div key={`divider-${i}`} className={`flex-1 h-1 mx-2 ${dividerColor}`} style={{ alignSelf: 'center' }} />
                    );
                  }
                }
                return <>{items}</>;
              })()}
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 0: Company Information */}
              {step === 0 && (
                <form onSubmit={e => { e.preventDefault(); setStep(1); }}>
                  <div className="bg-blue-50 rounded-lg p-4 mb-2">
                    <h2 className="text-lg font-semibold text-blue-700 mb-2">Company Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                        <input type="text" name="companyName" required value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your company name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                        <input type="text" name="companyLocation" required value={form.companyLocation} onChange={e => setForm(f => ({ ...f, companyLocation: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Coimbatore" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment *</label>
                        <input type="number" name="yearOfEstablishment" required value={form.yearOfEstablishment} onChange={e => setForm(f => ({ ...f, yearOfEstablishment: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 2010" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. of Employees *</label>
                        <select name="numEmployees" required value={form.numEmployees} onChange={e => setForm(f => ({ ...f, numEmployees: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="500+">500+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST or Registration Number (optional)</label>
                        <input type="text" name="gstNumber" value={form.gstNumber} onChange={e => setForm(f => ({ ...f, gstNumber: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="GSTIN or Reg. No." />
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
                      <strong>Admin Verification Pending:</strong> Your company details are under review. You can post jobs, but they will be visible after admin approval.
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span />
                    <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700">Next</button>
                  </div>
                </form>
              )}
              {/* Step 1: Profile Details */}
              {step === 1 && (
                <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
                  <div className="bg-green-50 rounded-lg p-4 mb-2">
                    <h2 className="text-lg font-semibold text-green-700 mb-2">Profile Details</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo (optional)</label>
                      <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, logo: e.target.files && e.target.files[0] ? e.target.files[0] : null }))} />
                      {form.logo && <div className="mt-2 text-xs text-gray-500">Selected: {form.logo.name}</div>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Short Company Description</label>
                      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your company in a few sentences..." />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Needs</label>
                      <div className="flex flex-col gap-2">
                        {['Factory Workers','Housekeeping Staff','Cashiers / Sales Staff','Delivery Boys','Kitchen Helpers / Chefs','Others'].map(need => (
                          <label key={need} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={form.hiringNeeds.includes(need)}
                              onChange={() => setForm(f => ({ ...f, hiringNeeds: f.hiringNeeds.includes(need) ? f.hiringNeeds.filter(n => n !== need) : [...f.hiringNeeds, need] }))}
                              className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">{need}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button type="button" className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-300" onClick={() => setStep(0)}>Back</button>
                    <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700">Next</button>
                  </div>
                </form>
              )}
              {/* Step 2: Review & Submit */}
              {step === 2 && (
                <form onSubmit={e => {
                  e.preventDefault();
                  setIsLoading(true);
                  setTimeout(() => {
                    if (user) {
                      dispatch(submitEmployerProfile({
                        id: user.id,
                        name: form.companyName,
                        email: user.email || '',
                        category: 'MSME',
                        status: 'pending',
                        description: form.description,
                        logo: form.logo ? form.logo.name : undefined,
                        hiringNeeds: form.hiringNeeds,
                        activityLog: [`Registered on ${new Date().toISOString().slice(0, 10)}`],
                      }));
                      dispatch(addNotification({ type: 'info', message: 'Your profile is under review. Once approved, you can post jobs.' }));
                    }
                    setIsLoading(false);
                    setStep(3);
                  }, 1000);
                }}>
                  <div className="bg-gray-50 rounded-lg p-4 mb-2">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Review & Submit</h2>
                    <div className="space-y-2">
                      <div><strong>Company Name:</strong> {form.companyName}</div>
                      <div><strong>Location:</strong> {form.companyLocation}</div>
                      <div><strong>Year of Establishment:</strong> {form.yearOfEstablishment}</div>
                      <div><strong>No. of Employees:</strong> {form.numEmployees}</div>
                      <div><strong>GST/Reg No:</strong> {form.gstNumber}</div>
                      <div><strong>Description:</strong> {form.description}</div>
                      <div><strong>Hiring Needs:</strong> {form.hiringNeeds.join(', ')}</div>
                      {form.logo && <div><strong>Logo:</strong> {form.logo.name}</div>}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button type="button" className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-300" onClick={() => setStep(1)}>Back</button>
                    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">{isLoading ? 'Submitting...' : 'Submit for Review'}</button>
                  </div>
                </form>
              )}
              {step === 3 && (
                <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded text-center">
                  <h2 className="text-2xl font-bold mb-4">Profile Under Review</h2>
                  <div className="mb-4 text-lg text-gray-700">
                    Thank you! Your profile is under review. Our team will approve your account within 24 hours.
                  </div>
                  <div className="text-gray-500 text-sm mb-4">
                    You will receive a login link to post jobs, view applicants, and download CVs after approval.
                  </div>
                  <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfileSection;

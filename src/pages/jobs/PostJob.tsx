import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addJob } from '../../store/slices/jobSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { RootState } from '../../store';


const PostJob: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    companyLocation: '',
    yearOfEstablishment: '',
    numEmployees: '',
    gstNumber: '',
    adminVerified: false, // for demo, always false
    location: {
      city: '',
      state: '',
    },
    salary: {
      min: '',
      max: '',
      currency: 'INR'
    },
    type: 'full-time',
    industry: '',
    requirements: '',
    benefits: '',
    expiryDate: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [showBoostModal, setShowBoostModal] = useState(false);
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Removed isAdminApproved state (no longer needed)
  // Removed unused jobId state

  const jobTypes = [
    { value: 'full-time', label: t('jobs.filters.fullTime') },
    { value: 'part-time', label: t('jobs.filters.partTime') },
    { value: 'contract', label: t('jobs.filters.contract') },
    { value: 'temporary', label: t('jobs.filters.temporary') },
    { value: '1-day', label: t('jobs.filters.oneDay') }
  ];

  const industries = [
    'Textile',
    'Hospitality',
    'Construction',
    'Manufacturing',
    'Retail',
    'Services'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Create job object with status 'pending' initially
    const newJob = {
      id: 'JOB' + Math.floor(100000 + Math.random() * 900000),
      title: formData.title,
      description: formData.description,
      company: formData.company,
      location: {
        city: formData.location.city,
        state: formData.location.state,
      },
      salary: {
        min: Number(formData.salary.min),
        max: Number(formData.salary.max),
        currency: formData.salary.currency,
      },
      type: formData.type as 'full-time' | 'part-time' | 'contract' | 'temporary' | '1-day',
      industry: formData.industry,
      requirements: formData.requirements.split('\n').filter(Boolean),
      benefits: formData.benefits.split('\n').filter(Boolean),
      postedDate: new Date().toISOString(),
      expiryDate: formData.expiryDate,
      isActive: false,
      isBoosted: false,
      applicationsCount: 0,
      employerId: user?.id || '',
      status: 'pending' as 'pending' | 'approved',
    };
    dispatch(addJob(newJob));
    setIsLoading(false);
    setIsSubmitted(true);
    // isAdminApproved state removed
    dispatch(addNotification({
      type: 'info',
      message: 'Your job post is under review. It will be posted once approved by admin.'
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof typeof formData, string];
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // const handleBoost = (amount: number) => {
  //   // Integrate with Razorpay here
  //   console.log(`Boosting job for ₹${amount}`);
  //   setShowBoostModal(false);
  //   dispatch(addNotification({
  //     type: 'success',
  //     message: `Job boosted successfully for ₹${amount}!`
  //   }));
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('jobs.postJob')}</h1>
          <p className="text-gray-600">Fill out the form below to post a new job</p>
        </div>

        {/* Stepper UI */}
        <div className="flex items-center justify-between mb-8">
          {(() => {
            const steps = ["Company Information", "Job Details", "Review & Submit", "Under Review"];
            const icons = [
              <span role="img" aria-label="company">🏢</span>,
              <span role="img" aria-label="profile">📍</span>,
              <span role="img" aria-label="review">✔️</span>,
              <span role="img" aria-label="clock">⏲️</span>
            ];
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
                // Divider color logic
                let dividerColor = 'bg-gray-200';
                if (step > i) {
                  dividerColor = 'bg-blue-600'; // completed
                } else if (step === 2 && i === 2) {
                  dividerColor = 'bg-yellow-400'; // review line
                }
                items.push(
                  <div key={`divider-${i}`} className={`flex-1 h-1 mx-2 ${dividerColor}`} style={{ alignSelf: 'center' }} />
                );
              }
            }
            return <>{items}</>;
          })()}
        </div>

        {/* Multi-step Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {step === 0 && (
            <form onSubmit={e => { e.preventDefault(); setStep(1); }}>
              <div className="bg-blue-50 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-semibold text-blue-700 mb-2">Company Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input type="text" name="companyLocation" required value={formData.companyLocation} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Coimbatore" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment *</label>
                    <input type="number" name="yearOfEstablishment" required value={formData.yearOfEstablishment} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 2010" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Employees *</label>
                    <select name="numEmployees" required value={formData.numEmployees} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
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
                    <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="GSTIN or Reg. No." />
                  </div>
                </div>
                {/* Admin Verification Pending Message */}
                {!formData.adminVerified && (
                  <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
                    <strong>Admin Verification Pending:</strong> Your company details are under review. You can post jobs, but they will be visible after admin approval.
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700">Next</button>
              </div>
            </form>
          )}
          {step === 1 && (
            <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <div className="bg-green-50 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-semibold text-green-700 mb-2">Job Details</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Headline *</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Textile Machine Operator" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Responsibilities *</label>
                  <textarea name="description" required value={formData.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Describe the job responsibilities..." />
                </div>
                {/* Auto Location Detection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Location *</label>
                  <div className="flex gap-2">
                    <input type="text" name="location.city" required value={formData.location.city} onChange={handleChange} className="flex-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="City" />
                    <input type="text" name="location.state" required value={formData.location.state} onChange={handleChange} className="flex-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="State" />
                    <button type="button" className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium hover:bg-blue-200" onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(() => {
                          setFormData(prev => ({
                            ...prev,
                            location: { city: 'Detected', state: 'Detected' }
                          }));
                        });
                      }
                    }}>Detect Location</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary (₹) *</label>
                    <input type="number" name="salary.min" required value={formData.salary.min} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="15000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary (₹) *</label>
                    <input type="number" name="salary.max" required value={formData.salary.max} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="25000" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('jobs.type')} *</label>
                    <select name="type" required value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      {jobTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                    <select name="industry" required value={formData.industry} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('jobs.requirements')} (one per line)</label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Experience with machinery&#10;Basic literacy&#10;Physical fitness" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('jobs.benefits')} (one per line)</label>
                  <textarea name="benefits" value={formData.benefits} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Health insurance&#10;Overtime pay&#10;Transport allowance" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
                  <input type="date" name="expiryDate" required value={formData.expiryDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button type="button" className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-300" onClick={() => setStep(0)}>Back</button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700">Next</button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-50 rounded-lg p-4 mb-2">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Review & Submit</h2>
                <div className="space-y-2">
                  <div><strong>Company Name:</strong> {formData.company}</div>
                  <div><strong>Location:</strong> {formData.companyLocation}</div>
                  <div><strong>Year of Establishment:</strong> {formData.yearOfEstablishment}</div>
                  <div><strong>No. of Employees:</strong> {formData.numEmployees}</div>
                  <div><strong>GST/Reg No:</strong> {formData.gstNumber}</div>
                  <div><strong>Headline:</strong> {formData.title}</div>
                  <div><strong>Job Responsibilities:</strong> {formData.description}</div>
                  <div><strong>Location:</strong> {formData.location.city}, {formData.location.state}</div>
                  <div><strong>Salary:</strong> ₹{formData.salary.min} - ₹{formData.salary.max} ({formData.salary.currency})</div>
                  <div><strong>Type:</strong> {formData.type}</div>
                  <div><strong>Industry:</strong> {formData.industry}</div>
                  <div><strong>Requirements:</strong> <ul className="list-disc ml-6">{formData.requirements.split('\n').filter(Boolean).map((req, i) => <li key={i}>{req}</li>)}</ul></div>
                  <div><strong>Benefits:</strong> <ul className="list-disc ml-6">{formData.benefits.split('\n').filter(Boolean).map((ben, i) => <li key={i}>{ben}</li>)}</ul></div>
                  <div><strong>Application Deadline:</strong> {formData.expiryDate}</div>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button type="button" className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md font-medium hover:bg-gray-300" onClick={() => setStep(1)}>Back</button>
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">{isLoading ? t('common.loading') : 'Submit for Review'}</button>
              </div>
            </form>
          )}
          {step === 2 && isSubmitted && (
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
              <strong>Under Review:</strong> Your job post is under admin review. It will be posted once approved.
              <div className="mt-2 text-sm">Please wait for admin approval...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostJob;
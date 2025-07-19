import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addJob } from '../../store/slices/jobSlice';
import { addNotification } from '../../store/slices/uiSlice';


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
  const [jobPosted, setJobPosted] = useState(false);


  const jobTypes = [
    { value: 'full-time', label: t('jobs.filters.fullTime') },
    { value: 'part-time', label: t('jobs.filters.partTime') },
    { value: 'contract', label: t('jobs.filters.contract') },
    { value: 'temporary', label: t('jobs.filters.temporary') },
    { value: '1-day', label: t('jobs.filters.oneDay') }
  ];

  // Expanded industry list (can be further extended)
  const industries = [
    'Agriculture', 'Automotive', 'Banking', 'Biotechnology', 'Chemicals', 'Construction', 'Consulting',
    'Consumer Goods', 'Design', 'Education', 'Electronics', 'Energy', 'Engineering', 'Entertainment',
    'Environmental', 'Finance', 'Food & Beverage', 'Government', 'Healthcare', 'Hospitality',
    'Information Technology', 'Insurance', 'Legal', 'Logistics', 'Manufacturing', 'Marketing',
    'Media', 'Mining', 'Non-Profit', 'Oil & Gas', 'Pharmaceuticals', 'Real Estate', 'Retail',
    'Services', 'Telecommunications', 'Textile', 'Tourism', 'Transportation', 'Utilities', 'Other'
  ];

  // For city/state autocomplete
  // Removed unused cityQuery state
  const [cityResults, setCityResults] = useState<{city: string, region: string}[]>([]);
  const [cityLoading, setCityLoading] = useState(false);

  // Free API: GeoDB Cities (https://rapidapi.com/wirefreethought/api/geodb-cities/)
  // We'll use the public endpoint for demo (no API key, limited results)
  const fetchCities = async (query: string) => {
    if (!query) return;
    setCityLoading(true);
    try {
      const resp = await fetch(`https://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&namePrefix=${encodeURIComponent(query)}`);
      const data = await resp.json();
      setCityResults(
        (data.data || []).map((item: { city: string; region: string }) => ({ city: item.city, region: item.region }))
      );
    } catch {
      setCityResults([]);
    }
    setCityLoading(false);
  };

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
    setJobPosted(true);
    // Optionally reset form fields after submit
    // setFormData({ ... });
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

        {/* Removed Stepper UI */}

        {/* Single Job Details Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {!jobPosted ? (
            <form onSubmit={handleSubmit}>
              {/* Back button at the top */}
              <div className="mb-4">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 py-2 px-4 md:px-6 rounded-md font-medium hover:bg-gray-300 w-full md:w-auto text-left md:text-base"
                  style={{ maxWidth: '200px' }}
                  onClick={() => window.history.back()}
                >
                  &larr; Back
                </button>
              </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      name="location.city"
                      required
                      value={formData.location.city}
                      onChange={e => {
                        handleChange(e);
                        if (e.target.value.length >= 3) fetchCities(e.target.value);
                        else setCityResults([]);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                      placeholder="City (type to search)"
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      name="location.state"
                      required
                      value={formData.location.state}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full"
                      placeholder="State"
                    />
                    <button
                      type="button"
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md font-medium hover:bg-blue-200 w-full"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(() => {
                            setFormData(prev => ({
                              ...prev,
                              location: { city: 'Detected', state: 'Detected' }
                            }));
                          });
                        }
                      }}
                    >
                      Detect Location
                    </button>
                  </div>
                  {/* City autocomplete dropdown */}
                  {cityLoading && <div className="text-xs text-gray-500">Searching cities...</div>}
                  {cityResults.length > 0 && (
                    <div className="border border-gray-200 rounded bg-white shadow-md mt-1 z-10 absolute w-full max-w-md">
                      {cityResults.map((item, idx) => (
                        <div
                          key={item.city + item.region + idx}
                          className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              location: { city: item.city, state: item.region }
                            }));
                            setCityResults([]);
                          }}
                        >
                          {item.city}, {item.region}
                        </div>
                      ))}
                    </div>
                  )}
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
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">{isLoading ? t('common.loading') : 'Post Job'}</button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 mb-2">
              <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-400 text-green-800 rounded text-center">
                <strong>Job has been posted!</strong> Your job post is now live and visible to job seekers.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostJob;
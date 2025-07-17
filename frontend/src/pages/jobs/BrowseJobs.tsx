import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { setJobs, setFilters, applyToJob, saveJob, unsaveJob } from '../../store/slices/jobSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  CurrencyRupeeIcon,
  BookmarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

const BrowseJobs: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { jobs, filters, appliedJobs, savedJobs } = useSelector((state: RootState) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock jobs data
  const mockJobs = [
    {
      id: '1',
      title: 'Textile Machine Operator',
      company: 'Kongu Textiles Ltd',
      location: { city: 'Coimbatore', state: 'Tamil Nadu' },
      salary: { min: 18000, max: 25000, currency: 'INR' },
      type: 'full-time' as const,
      industry: 'Textile',
      requirements: ['Experience with textile machinery', 'Basic literacy'],
      benefits: ['Health insurance', 'Overtime pay'],
      postedDate: '2024-01-15',
      expiryDate: '2024-02-15',
      isActive: true,
      isBoosted: false,
      applicationsCount: 12,
      employerId: 'emp1'
    },
    {
      id: '2',
      title: 'Hotel Service Staff',
      company: 'Grand Palace Hotel',
      location: { city: 'Madurai', state: 'Tamil Nadu' },
      salary: { min: 15000, max: 20000, currency: 'INR' },
      type: 'part-time' as const,
      industry: 'Hospitality',
      requirements: ['Good communication skills', 'Presentable appearance'],
      benefits: ['Flexible timing', 'Tips'],
      postedDate: '2024-01-16',
      expiryDate: '2024-02-16',
      isActive: true,
      isBoosted: true,
      applicationsCount: 8,
      employerId: 'emp2'
    },
    {
      id: '3',
      title: 'Daily Wage Construction Worker',
      company: 'ABC Construction',
      location: { city: 'Chennai', state: 'Tamil Nadu' },
      salary: { min: 500, max: 800, currency: 'INR' },
      type: '1-day' as const,
      industry: 'Construction',
      requirements: ['Physical fitness', 'Basic tools knowledge'],
      benefits: ['Daily payment', 'Transport allowance'],
      postedDate: '2024-01-17',
      expiryDate: '2024-01-20',
      isActive: true,
      isBoosted: false,
      applicationsCount: 25,
      employerId: 'emp3'
    }
  ];

  useEffect(() => {
    dispatch(setJobs(mockJobs));
  }, [dispatch]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation = !filters.location || 
                           job.location.city.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSalary = !filters.salary || job.salary.min >= filters.salary;
    const matchesIndustry = !filters.industry || job.industry === filters.industry;

    return matchesSearch && matchesType && matchesLocation && matchesSalary && matchesIndustry;
  });

  const handleApply = (jobId: string) => {
    dispatch(applyToJob(jobId));
    dispatch(addNotification({
      type: 'success',
      message: 'Successfully applied to job!'
    }));
  };

  const handleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      dispatch(unsaveJob(jobId));
      dispatch(addNotification({
        type: 'info',
        message: 'Job removed from saved list'
      }));
    } else {
      dispatch(saveJob(jobId));
      dispatch(addNotification({
        type: 'success',
        message: 'Job saved successfully!'
      }));
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-yellow-100 text-yellow-800';
      case 'temporary': return 'bg-purple-100 text-purple-800';
      case '1-day': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('jobs.browseJobs')}</h1>
          <p className="text-gray-600">Find your next opportunity</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.search')}
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('jobs.type')}
              </label>
              <select
                value={filters.type}
                onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('jobs.filters.all')}</option>
                <option value="full-time">{t('jobs.filters.fullTime')}</option>
                <option value="part-time">{t('jobs.filters.partTime')}</option>
                <option value="contract">{t('jobs.filters.contract')}</option>
                <option value="temporary">{t('jobs.filters.temporary')}</option>
                <option value="1-day">{t('jobs.filters.oneDay')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('jobs.location')}
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => dispatch(setFilters({ location: e.target.value }))}
                placeholder="City..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Salary
              </label>
              <input
                type="number"
                value={filters.salary}
                onChange={(e) => dispatch(setFilters({ salary: Number(e.target.value) }))}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('jobs.noJobs')}</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      {job.isBoosted && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{job.location.city}, {job.location.state}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CurrencyRupeeIcon className="h-4 w-4" />
                        <span>₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                        {t(`jobs.filters.${job.type.replace('-', '')}`)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.applicationsCount} applications
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {job.requirements.join(' • ')}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleSave(job.id)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {savedJobs.includes(job.id) ? (
                        <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <BookmarkIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                      className={`px-6 py-2 rounded-md font-medium transition-colors ${
                        appliedJobs.includes(job.id)
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {appliedJobs.includes(job.id) ? t('jobs.applied') : t('jobs.apply')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
import React, { useEffect, useState } from 'react';

const plans = [
  {
    id: 'free-trial',
    title: 'Starter Plan',
  },
  {
    id: 'subscription',
    title: 'Continuous Plan',
  },
  {
    id: 'yearly',
    title: 'Yearly Plan',
  },
];

const PLAN_OPTIONS = [
  'All',
  ...plans.map(p => p.title)
];

function getPlanTitle(planId?: string) {
  if (!planId) return 'N/A';
  const plan = plans.find(p => p.id === planId);
  return plan ? plan.title : 'N/A';
}
export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  postedDate: string;
  employerId: string;
  requirements: string[];
  status: string;
}

export interface Employer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  registrationDate: string;
  status: string;
  documents: string[];
  jobsPosted: number;
  address: string;
  jobs: Job[];
  yearOfEstablishment?: string;
  companyLogo?: string; // New field
  companyDescription?: string; // New field
  hiringNeeds?: string; // New field
  currentPlan?: string; // Added field for current plan
}

interface EmployerManagementProps {
  employers: Employer[];
  getStatusColor: (status: string) => string;
  handleEmployerAction: (employerId: string, action: 'approve' | 'reject', showPopup: (msg: string, status: 'approved' | 'rejected') => void) => void;
}

const EmployerManagement: React.FC<EmployerManagementProps> = ({
  employers = [],
  getStatusColor = (status: string) => status === 'approved' ? 'bg-green-100 text-green-800' : status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800',
  handleEmployerAction,
}) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<'approved' | 'rejected' | null>(null);
  const [filter, setFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showJobsModal, setShowJobsModal] = useState(false);

  // Responsive view mode: card for mobile, table for desktop
  const [viewMode, setViewMode] = useState<'table' | 'card'>(window.innerWidth < 768 ? 'card' : 'table');
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'card' : 'table');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const PAGE_SIZE = 10;

  const filterLower = filter.toLowerCase();
  const filteredEmployers = employers.filter(e => {
    const matchesText =
      e.companyName.toLowerCase().includes(filterLower) ||
      e.contactPerson.toLowerCase().includes(filterLower) ||
      e.industry.toLowerCase().includes(filterLower);
    const planTitle = getPlanTitle(e.currentPlan);
    const matchesPlan = planFilter === 'All' || planTitle === planFilter;
    return matchesText && matchesPlan;
  });
  
  const totalPages = Math.ceil(filteredEmployers.length / PAGE_SIZE);
  const paginatedEmployers = filteredEmployers.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const showPopup = (msg: string, status: 'approved' | 'rejected') => {
    setPopupMessage(msg);
    setPopupStatus(status);
  };

  // Card view for mobile
  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {paginatedEmployers.map((employer) => (
        <div key={employer.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                {employer.companyName}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {employer.industry}
              </p>
              <p className="text-xs md:text-sm text-blue-600 mt-1 font-semibold">
                Plan: {getPlanTitle(employer.currentPlan)}
              </p>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${getStatusColor(employer.status)}`}>
              {employer.status}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs md:text-sm">
              <span className="text-gray-500 w-16 flex-shrink-0">Contact:</span>
              <span className="text-gray-900 truncate">{employer.contactPerson}</span>
            </div>
            <div className="flex items-center text-xs md:text-sm">
              <span className="text-gray-500 w-16 flex-shrink-0">Email:</span>
              <span className="text-gray-900 truncate">{employer.email}</span>
            </div>
            <div className="flex items-center text-xs md:text-sm">
              <span className="text-gray-500 w-16 flex-shrink-0">Jobs:</span>
              <span className="text-gray-900">{employer.jobsPosted}</span>
            </div>
            <div className="flex items-center text-xs md:text-sm">
              <span className="text-gray-500 w-16 flex-shrink-0">Size:</span>
              <span className="text-gray-900">{employer.companySize}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => {setSelectedEmployer(employer); setShowEmployerModal(true);}}
              className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
            >
              View Details
            </button>
            {employer.status === 'pending' && (
              <>
                <button 
                  onClick={() => handleEmployerAction(employer.id, 'approve', showPopup)}
                  className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleEmployerAction(employer.id, 'reject', showPopup)}
                  className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Table view for desktop
  const renderTableView = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jobs
              </th>
              <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedEmployers.map((employer) => (
              <tr key={employer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="max-w-xs">
                    <div className="font-medium text-gray-900 text-sm lg:text-base truncate">
                      {employer.companyName}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500 mt-1">
                      Size: {employer.companySize}
                    </div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="max-w-xs">
                    <div className="text-sm lg:text-base text-gray-900 truncate">
                      {employer.contactPerson}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500 truncate">
                      {employer.email}
                    </div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="text-sm lg:text-base text-gray-900 max-w-xs truncate">
                    {employer.industry}
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="text-sm lg:text-base text-blue-600 font-semibold">
                    {getPlanTitle(employer.currentPlan)}
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employer.status)}`}>
                    {employer.status}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="text-sm lg:text-base text-gray-900 font-medium">
                    {employer.jobsPosted}
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => {setSelectedEmployer(employer); setShowEmployerModal(true);}}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      View
                    </button>
                    {employer.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleEmployerAction(employer.id, 'approve', showPopup)}
                          className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleEmployerAction(employer.id, 'reject', showPopup)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
          Employer Management
        </h2>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full sm:w-auto">
          {/* Search */}
          <div className="flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search employers..."
              value={filter}
              onChange={e => { setFilter(e.target.value); setPage(1); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Plan Dropdown */}
          <div className="max-w-xs">
            <select
              value={planFilter}
              onChange={e => { setPlanFilter(e.target.value); setPage(1); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {PLAN_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {paginatedEmployers.length} of {filteredEmployers.length} employers
        </p>
      </div>

      {/* Content */}
      {filteredEmployers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No employers found</div>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          {viewMode === 'card' ? renderCardView() : renderTableView()}
          {/* Pagination (always show, with page numbers) */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages} ({filteredEmployers.length} total results)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p-1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Previous
              </button>
              {/* Page Numbers (up to 5 at a time) */}
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                if (pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p+1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === totalPages 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Popup Message */}
      {popupMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                popupStatus === 'approved' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {popupStatus === 'approved' ? (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {popupStatus === 'approved' ? 'Request Approved' : 'Request Rejected'}
              </h3>
              <p className="text-gray-600 mb-6">{popupMessage}</p>
              <button
                onClick={() => { setPopupMessage(null); setPopupStatus(null); }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employer Details Modal */}
      {showEmployerModal && selectedEmployer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-gray-200 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-800">
                  Employer Details
                </h3>
                <button 
                  onClick={() => setShowEmployerModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6">
              {/* Company Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg">Company Information</h4>
                  <div className="space-y-3">
                    {/* Company Name and Logo in the same row */}
                    <div className="flex items-center gap-4">
                      {selectedEmployer.companyLogo ? (
                        <img src={selectedEmployer.companyLogo} alt="Company Logo" className="w-20 h-20 object-contain rounded border bg-white" />
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 text-gray-400 rounded border">No Logo</div>
                      )}
                      <div>
                        <label className="text-sm text-gray-600">Company Name</label>
                        <p className="font-medium text-gray-900 text-lg">{selectedEmployer.companyName}</p>
                        <p className="text-xs text-blue-600 font-semibold mt-1">Current Plan: {getPlanTitle(selectedEmployer.currentPlan)}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Address</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.address}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Short Company Description</label>
                      <p className="font-medium text-gray-900 whitespace-pre-line">{selectedEmployer.companyDescription || '-'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Industry</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Company Size</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.companySize}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Year of Establishment</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.yearOfEstablishment || '-'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Hiring Needs</label>
                      <p className="font-medium text-gray-900 whitespace-pre-line">{selectedEmployer.hiringNeeds || '-'}</p>
                    </div>
                    
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 text-lg">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Contact Person</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.contactPerson}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="font-medium text-gray-900">{selectedEmployer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Registration Date</label>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedEmployer.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 text-lg mb-4">Activity Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedEmployer.jobsPosted}</div>
                    <div className="text-sm text-gray-600">Jobs Posted</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedEmployer.documents.length}</div>
                    <div className="text-sm text-gray-600">Documents</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
                        {selectedEmployer.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{selectedEmployer.companySize}</div>
                    <div className="text-sm text-gray-600">Company Size</div>
                  </div>
                </div>
              </div>



              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowJobsModal(true)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  View Jobs ({selectedEmployer.jobs.length})
                </button>
                {selectedEmployer.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => {
                        handleEmployerAction(selectedEmployer.id, 'approve', showPopup);
                        setShowEmployerModal(false);
                      }}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve Employer
                    </button>
                    <button 
                      onClick={() => {
                        handleEmployerAction(selectedEmployer.id, 'reject', showPopup);
                        setShowEmployerModal(false);
                      }}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Reject Application
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Modal */}
      {showJobsModal && selectedEmployer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 lg:p-6 border-b border-gray-200 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-800">
                  Jobs by {selectedEmployer.companyName}
                </h3>
                <button 
                  onClick={() => setShowJobsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6">
              {selectedEmployer.jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No jobs posted</div>
                  <p className="text-gray-500">This employer hasn't posted any jobs yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedEmployer.jobs.map((job: Job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 lg:p-6 hover:shadow-sm transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-blue-700 mb-1">{job.title}</h4>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>📍 {job.location}</span>
                            <span>💰 {job.salary}</span>
                            <span>📅 {new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-gray-900">Description:</span>
                          <p className="text-gray-700 mt-1">{job.description}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-900">Requirements:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {job.requirements.map((req, index) => (
                              <span key={index} className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerManagement;


import React, { useState } from 'react';

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
  jobs: Job[];
}

interface JobManagementProps {
  employers: Employer[];
}

const PAGE_SIZE = 10;


const JobManagement: React.FC<JobManagementProps> = ({ employers }) => {
  const [page, setPage] = useState(1);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  // Filter employers by company name or job title
  const filteredEmployers = employers.filter(employer => {
    const companyMatch = employer.companyName.toLowerCase().includes(filter.toLowerCase());
    const jobMatch = employer.jobs.some(job => job.title.toLowerCase().includes(filter.toLowerCase()));
    return companyMatch || jobMatch;
  });

  const totalPages = Math.ceil(filteredEmployers.length / PAGE_SIZE);
  const paginatedEmployers = filteredEmployers.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const handleExpand = (companyId: string) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Job Management
          </h2>
          <p className="text-gray-600">Manage and view job postings from all employers</p>
        </div>

        {/* Filter/Search Input */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="text"
            value={filter}
            onChange={e => { setFilter(e.target.value); setPage(1); }}
            placeholder="Search by company or job title..."
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm transition-all"
          />
          <span className="text-sm text-gray-500">Showing {filteredEmployers.length} companies</span>
        </div>

        <div className="bg-white backdrop-blur-sm bg-opacity-90 border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Company Name</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"># Job Posts</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedEmployers.map(employer => (
                  <React.Fragment key={employer.id}>
                    <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                            {employer.companyName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900">{employer.companyName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {employer.jobs.length}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
                          onClick={() => handleExpand(employer.id)}
                        >
                          {expandedCompany === employer.id ? (
                            <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              Hide Jobs
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                              Show Jobs
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedCompany === employer.id && employer.jobs.length > 0 && (
                      <tr>
                        <td colSpan={3} className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 border-t border-blue-100">
                          <div className="space-y-3">
                            {employer.jobs.map(job => (
                              <div
                                key={job.id}
                                className={`bg-white rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-200 mb-2 cursor-pointer ${expandedJob === job.id ? 'ring-2 ring-blue-200' : ''}`}
                                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                tabIndex={0}
                                role="button"
                                aria-expanded={expandedJob === job.id}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <span className="text-blue-700 font-semibold text-left hover:underline transition-colors duration-200">
                                      {job.title}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                                      {job.status}
                                    </span>
                                  </div>
                                  <span className="text-gray-400 hover:text-blue-600">
                                    {expandedJob === job.id ? (
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                      </svg>
                                    ) : (
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    )}
                                  </span>
                                </div>
                                {expandedJob === job.id && (
                                  <div className="mt-4 space-y-3 border-t pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                                        <div className="flex items-center text-gray-900">
                                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                          </svg>
                                          {job.location}
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Salary</label>
                                        <div className="flex items-center text-gray-900">
                                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                          </svg>
                                          {job.salary}
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Posted Date</label>
                                        <div className="flex items-center text-gray-900">
                                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          {new Date(job.postedDate).toLocaleDateString()}
                                        </div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                                          {job.status}
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                      <p className="text-gray-900 leading-relaxed">{job.description}</p>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-semibold text-gray-700 mb-1">Requirements</label>
                                      <div className="flex flex-wrap gap-2">
                                        {job.requirements.map((req, index) => (
                                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {req}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                    {expandedCompany === employer.id && employer.jobs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 border-t border-blue-100">
                          <div className="text-center py-8">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM8 14v.01M12 14v.01M16 14v.01" />
                            </svg>
                            <p className="text-gray-500 font-medium">No job posts available.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination controls */}
          <div className="flex justify-between items-center p-6 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-600 font-medium">
              Page <span className="font-bold text-gray-800">{page}</span> of <span className="font-bold text-gray-800">{totalPages}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPage(p => Math.max(1, p-1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  page === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p+1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  page === totalPages 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md'
                }`}
              >
                Next
                <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobManagement;



import React, { useState } from 'react';

// Extended Job and Employer interfaces to include all fields from employer job posting flow
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
  // Extended fields from employer job post flow
  companyName: string;
  jobCategory?: string;
  jobType?: string;
  workType?: string;
  jobCity?: string;
  additionalPerks?: string;
  joiningFee?: string;
  education?: string;
  experience?: string;
  english?: string;
  age?: string;
  gender?: string;
  skills?: string;
  degree?: string;
  interviewCommPref?: string;
  walkIn?: string;
  interviewAddress?: string;
  interviewInstructions?: string;
}

export interface Employer {
  id: string;
  companyName: string;
  email: string;
  mobile: string;
  jobs: Job[];
  contactPerson?: string;
}

// Example mock data with all fields filled from employer job post flow
const mockEmployers: Employer[] = [
  {
    id: 'emp1',
    companyName: 'Bot Digital Solutions Private Limited',
    email: 'hr@botdigitals.com',
    mobile: '9876543210',
    contactPerson: 'Rahul Sharma',
    jobs: [
      {
        id: 'job1',
        title: 'Designer',
        description: 'Design marketing materials and digital assets for our clients.',
        location: 'All Areas in Chennai Region',
        salary: '₹ 2,000 - ₹ 4,200 per month (Fixed + incentives)',
        postedDate: '2025-07-20',
        employerId: 'emp1',
        requirements: ['Graduate', 'Fresher Only', 'No English Required'],
        status: 'active',
        // Extended fields
        companyName: 'Bot Digital Solutions Private Limited',
        jobCategory: 'Advertising / Communication',
        jobType: 'Full Time | Day shift',
        workType: 'Work from home',
        jobCity: 'All Areas in Chennai Region',
        additionalPerks: 'Weekly Payout, Annual Bonus, PF, Laptop',
        joiningFee: '₹ 1000',
        education: 'Graduate',
        experience: 'Fresher Only',
        english: 'No English Required',
        age: '18 - 60 yrs',
        gender: 'Both genders allowed',
        skills: 'None',
        degree: 'No input selected',
        interviewCommPref: 'Myself',
        walkIn: 'No',
        interviewAddress: '',
        interviewInstructions: '',
      },
      {
        id: 'job2',
        title: 'Sales Executive',
        description: 'Drive sales and manage client relationships.',
        location: 'Bangalore',
        salary: '₹ 3,000 - ₹ 5,000 per month',
        postedDate: '2025-07-22',
        employerId: 'emp1',
        requirements: ['12th Pass', 'Experienced Only', 'Basic English'],
        status: 'pending',
        companyName: 'Bot Digital Solutions Private Limited',
        jobCategory: 'Sales',
        jobType: 'Full Time',
        workType: 'Work from office',
        jobCity: 'Bangalore',
        additionalPerks: 'Travel Allowance, Incentives',
        joiningFee: 'No',
        education: '12th Pass',
        experience: 'Experienced Only',
        english: 'Basic English',
        age: '21 - 35 yrs',
        gender: 'Both',
        skills: 'Sales, Communication',
        degree: 'Any',
        interviewCommPref: 'Other recruiter',
        walkIn: 'Yes',
        interviewAddress: 'Bot Digital, 2nd Floor, Bangalore',
        interviewInstructions: 'Bring resume and ID proof.',
      },
    ],
  },
  {
    id: 'emp2',
    companyName: 'Acme Corp',
    email: 'contact@acmecorp.com',
    mobile: '9123456789',
    contactPerson: 'Priya Verma',
    jobs: [
      {
        id: 'job3',
        title: 'Accountant',
        description: 'Manage company accounts and financial records.',
        location: 'Mumbai',
        salary: '₹ 4,000 - ₹ 6,000 per month',
        postedDate: '2025-07-23',
        employerId: 'emp2',
        requirements: ['Graduate', 'Experienced Only', 'Good English'],
        status: 'active',
        companyName: 'Acme Corp',
        jobCategory: 'Finance',
        jobType: 'Part Time',
        workType: 'Work from office',
        jobCity: 'Mumbai',
        additionalPerks: 'PF, Health Insurance',
        joiningFee: 'No',
        education: 'Graduate',
        experience: 'Experienced Only',
        english: 'Good English',
        age: '25 - 40 yrs',
        gender: 'Both',
        skills: 'Accounting, Tally',
        degree: 'B.Com',
        interviewCommPref: 'Myself',
        walkIn: 'No',
        interviewAddress: '',
        interviewInstructions: '',
      },
    ],
  },
];

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
  email: string;
  mobile: string;
  jobs: Job[];
}

// Removed JobManagementProps, will use mockEmployers directly

const PAGE_SIZE = 5;


const JobManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  // Use the extended mockEmployers directly
  const employers: Employer[] = mockEmployers;

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
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Employer Name / Email</th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Mobile</th>
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
                          <span className="font-semibold text-gray-900 block">{employer.companyName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div>
                          <span className="font-semibold text-gray-900 block">{employer.contactPerson || '-'}</span>
                          <span className="text-xs text-gray-500 block">{employer.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          {employer.mobile}
                        </span>
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                                        <div className="text-gray-900">{job.title}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                                        <div className="text-gray-900">{job.companyName}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Category</label>
                                        <div className="text-gray-900">{job.jobCategory}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
                                        <div className="text-gray-900">{job.jobType}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Work Type</label>
                                        <div className="text-gray-900">{job.workType}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job City</label>
                                        <div className="text-gray-900">{job.jobCity}</div>
                                      </div>
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
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Perks</label>
                                        <div className="text-gray-900">{job.additionalPerks}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Joining Fee</label>
                                        <div className="text-gray-900">{job.joiningFee}</div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                                        <div className="text-gray-900">{job.education}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Experience</label>
                                        <div className="text-gray-900">{job.experience}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">English</label>
                                        <div className="text-gray-900">{job.english}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                                        <div className="text-gray-900">{job.age}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                                        <div className="text-gray-900">{job.gender}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Skills</label>
                                        <div className="text-gray-900">{job.skills}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Degree</label>
                                        <div className="text-gray-900">{job.degree}</div>
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Interview Communication Preference</label>
                                        <div className="text-gray-900">{job.interviewCommPref}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Walk-in Interview</label>
                                        <div className="text-gray-900">{job.walkIn}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Interview Address</label>
                                        <div className="text-gray-900">{job.interviewAddress}</div>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Interview Instructions</label>
                                        <div className="text-gray-900">{job.interviewInstructions}</div>
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
        </div>
        {/* Pagination controls styled like EmployerManagement, outside the card */}
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
      </div>

    </div>
  );
};

export default JobManagement;

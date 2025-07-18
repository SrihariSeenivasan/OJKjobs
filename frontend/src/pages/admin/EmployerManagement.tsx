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

import React from 'react';

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
}

import { useState } from 'react';

interface EmployerManagementProps {
  employers: Employer[];
  getStatusColor: (status: string) => string;
  handleEmployerAction: (employerId: string, action: 'approve' | 'reject') => void;
}

const EmployerManagement: React.FC<EmployerManagementProps> = ({
  employers,
  getStatusColor,
  handleEmployerAction,
}) => {
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showJobsModal, setShowJobsModal] = useState(false);

  return (
    <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-blue-700">Employer Management</h2>
      {/* Removed Export Data button */}
    </div>
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobs Posted</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employers.map((employer) => (
              <tr key={employer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{employer.companyName}</div>
                    <div className="text-sm text-gray-500">Size: {employer.companySize}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-gray-900">{employer.contactPerson}</div>
                    <div className="text-sm text-gray-500">{employer.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{employer.industry}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employer.status)}`}>
                    {employer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{employer.jobsPosted}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {setSelectedEmployer(employer); setShowEmployerModal(true);}}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View
                    </button>
                    {employer.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleEmployerAction(employer.id, 'approve')}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleEmployerAction(employer.id, 'reject')}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
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

      {/* Employer Details Modal */}
      {showEmployerModal && selectedEmployer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Employer Details</h3>
                <button 
                  onClick={() => setShowEmployerModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Company Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Contact Person</label>
                      <p className="font-medium">{selectedEmployer.contactPerson}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-medium">{selectedEmployer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="font-medium">{selectedEmployer.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Registration Date</label>
                      <p className="font-medium">{new Date(selectedEmployer.registrationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Activity Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="text-sm text-gray-600">Current Status</div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Uploaded Documents</h4>
                <div className="space-y-2">
                  {selectedEmployer.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600">📄</span>
                      <span className="font-medium">{doc}</span>
                      <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setShowJobsModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  View Jobs
                </button>
                {selectedEmployer.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => {
                        handleEmployerAction(selectedEmployer.id, 'approve');
                        setShowEmployerModal(false);
                      }}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all"
                    >
                      Approve Employer
                    </button>
                    <button 
                      onClick={() => {
                        handleEmployerAction(selectedEmployer.id, 'reject');
                        setShowEmployerModal(false);
                      }}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all"
                    >
                      Reject Application
                    </button>
                  </>
                )}
              </div>
              {showJobsModal && selectedEmployer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-gray-800">Jobs Posted by {selectedEmployer.companyName}</h3>
                      <button onClick={() => setShowJobsModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                    </div>
                    <div className="p-6">
                      {selectedEmployer.jobs.length === 0 ? (
                        <div className="text-gray-500 text-center">No jobs posted by this employer.</div>
                      ) : (
                        <div className="space-y-4">
                          {selectedEmployer.jobs.map((job: Job) => (
                            <div key={job.id} className="border rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-semibold text-blue-700">{job.title}</h4>
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{job.status}</span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">{job.location} | Posted: {new Date(job.postedDate).toLocaleDateString()}</div>
                              <div className="mb-2"><span className="font-medium">Salary:</span> {job.salary}</div>
                              <div className="mb-2"><span className="font-medium">Description:</span> {job.description}</div>
                              <div className="mb-2"><span className="font-medium">Requirements:</span> {job.requirements.join(', ')}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerManagement;

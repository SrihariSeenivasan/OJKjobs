
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
}

interface EmployerManagementProps {
  employers: Employer[];
  getStatusColor: (status: string) => string;
  handleEmployerAction: (employerId: string, action: 'approve' | 'reject') => void;
  setSelectedEmployer: (employer: Employer) => void;
  setShowEmployerModal: (show: boolean) => void;
}

const EmployerManagement: React.FC<EmployerManagementProps> = ({
  employers,
  getStatusColor,
  handleEmployerAction,
  setSelectedEmployer,
  setShowEmployerModal,
}) => (
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
  </div>
);

export default EmployerManagement;

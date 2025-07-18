
import React from 'react';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  profileComplete: number;
  skills: string[];
  experience: string;
  resume: string;
  location: string;
  jobsApplied: number;
  profileImage: string;
}

import { useState } from 'react';

interface EmployeeManagementProps {
  employees: Employee[];
}

const JobSeekerManagement: React.FC<EmployeeManagementProps> = ({ employees }) => {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Job Seeker Management</h2>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Seeker</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">{employee.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{employee.email}</div>
                      <div className="text-sm text-gray-500">{employee.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${employee.profileComplete}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{employee.profileComplete}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.jobsApplied}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {setSelectedEmployee(employee); setShowEmployeeModal(true);}}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEmployeeModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-800">Employee Details</h3>
                  <button 
                    onClick={() => setShowEmployeeModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Personal Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xl">{selectedEmployee ? selectedEmployee.name.charAt(0) : ''}</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-lg">{selectedEmployee ? selectedEmployee.name : ''}</h5>
                          <p className="text-gray-600">{selectedEmployee ? selectedEmployee.location : ''}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="font-medium">{selectedEmployee ? selectedEmployee.email : ''}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <p className="font-medium">{selectedEmployee ? selectedEmployee.phone : ''}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Experience</label>
                        <p className="font-medium">{selectedEmployee ? selectedEmployee.experience : ''}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Registration Date</label>
                        <p className="font-medium">{selectedEmployee ? new Date(selectedEmployee.registrationDate).toLocaleDateString() : ''}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Professional Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Skills</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedEmployee && selectedEmployee.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Profile Completion</label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${selectedEmployee ? selectedEmployee.profileComplete : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{selectedEmployee ? selectedEmployee.profileComplete : 0}%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Resume</label>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-blue-600">📄</span>
                          <span className="font-medium">{selectedEmployee ? selectedEmployee.resume : ''}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Activity Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedEmployee ? selectedEmployee.jobsApplied : 0}</div>
                      <div className="text-sm text-gray-600">Jobs Applied</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedEmployee ? selectedEmployee.profileComplete : 0}%</div>
                      <div className="text-sm text-gray-600">Profile Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobSeekerManagement;


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

interface EmployeeManagementProps {
  employees: Employee[];
  setSelectedEmployee: (employee: Employee) => void;
  setShowEmployeeModal: (show: boolean) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  employees,
  setSelectedEmployee,
  setShowEmployeeModal,
}) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-blue-700">Employee Management</h2>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
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
    </div>
  </div>
);

export default EmployeeManagement;

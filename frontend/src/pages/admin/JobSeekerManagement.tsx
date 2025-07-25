import React, { useEffect, useState } from 'react';
import { mockEmployees } from '../../constants';

export interface Employee {
  id: string;
  employeeId?: string;
  name: string;
  gender?: string;
  age?: number;
  dob?: string;
  email: string;
  phone: string;
  registrationDate: string;
  profileComplete: number;
  skills: string[];
  experience: string | Experience[];
  education?: string | Education[];
  resume: string | File | null;
  location: string;
  jobsApplied: number;
  profileImage: string;
  headline?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  certifications?: string[];
  languages?: string[];
  preferences?: {
    jobTitle?: string;
    preferredLocation?: string;
    jobType?: string[];
  };
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  salary: string;
  skills: string[];
}

interface Education {
  degree: string;
  institution: string;
  batch: string;
  medium: string;
}

interface EmployeeManagementProps {
  employees: Employee[];
}



const JobSeekerManagement: React.FC<EmployeeManagementProps> = ({ employees = mockEmployees }) => {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  // Responsive view mode: card for mobile, table for desktop
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(window.innerWidth < 768 ? 'cards' : 'table');
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const PAGE_SIZE = 10;

  const filterLower = filter.toLowerCase();
  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(filterLower) ||
    e.email.toLowerCase().includes(filterLower) ||
    e.location.toLowerCase().includes(filterLower) ||
    e.phone.toLowerCase().includes(filterLower)
  );
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const paginatedEmployees = filteredEmployees.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  // Card view for mobile
  const renderCardView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {paginatedEmployees.map((employee) => (
        <div key={employee.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-lg sm:text-xl">{employee.name.charAt(0)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{employee.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{employee.location}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Contact</p>
              <p className="text-sm text-gray-900 truncate">{employee.email}</p>
              <p className="text-sm text-gray-500 truncate">{employee.phone}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Profile Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${employee.profileComplete}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{employee.profileComplete}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-gray-500">Applications</p>
                <p className="text-sm font-semibold text-gray-900">{employee.jobsApplied}</p>
              </div>
              <button 
                onClick={() => {setSelectedEmployee(employee); setShowEmployeeModal(true);}}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Table view for desktop
  const renderTableView = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Job Seeker</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Applications</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-medium text-sm sm:text-base">{employee.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{employee.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{employee.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="min-w-0">
                    <div className="text-sm text-gray-900 truncate">{employee.email}</div>
                    <div className="text-sm text-gray-500 truncate">{employee.phone}</div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${employee.profileComplete}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{employee.profileComplete}%</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 font-medium">{employee.jobsApplied}</td>
                <td className="px-4 sm:px-6 py-4">
                  <button 
                    onClick={() => {setSelectedEmployee(employee); setShowEmployeeModal(true);}}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium hover:underline transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 text-center lg:text-left">
            Job Seeker Management
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search by name, email, or location..."
                value={filter}
                onChange={e => { setFilter(e.target.value); setPage(1); }}
                className="w-full sm:w-80 px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm transition-all"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Results Summary */}
        <div className="mb-4 sm:mb-6">
          <p className="text-sm text-gray-600">
            Showing {paginatedEmployees.length} of {filteredEmployees.length} job seekers
          </p>
        </div>
        {/* Content */}
        {viewMode === 'cards' ? renderCardView() : renderTableView()}
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-4">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages} ({filteredEmployees.length} total results)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p-1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              Previous
            </button>
            {/* Page Numbers */}
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
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              Next
            </button>
          </div>
        </div>
        {/* Modal */}
        {showEmployeeModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Jobseeker Profile Details</h3>
                  <button 
                    onClick={() => setShowEmployeeModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 text-lg">Personal Information</h4>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-xl sm:text-2xl">
                            {selectedEmployee.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-lg sm:text-xl text-gray-900">{selectedEmployee.name}</h5>
                          {selectedEmployee.headline && (
                            <p className="text-blue-700 text-sm sm:text-base font-medium mb-1">{selectedEmployee.headline}</p>
                          )}
                          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-600">
                            {selectedEmployee.employeeId && <span className="bg-gray-100 px-2 py-0.5 rounded">ID: {selectedEmployee.employeeId}</span>}
                            {selectedEmployee.gender && <span className="bg-gray-100 px-2 py-0.5 rounded">{selectedEmployee.gender}</span>}
                            {selectedEmployee.age !== undefined && <span className="bg-gray-100 px-2 py-0.5 rounded">Age: {selectedEmployee.age}</span>}
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">{selectedEmployee.location}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                          <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Mobile</label>
                          <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.phone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Date of Birth</label>
                          <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.dob || '-'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Gender</label>
                          <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.gender || '-'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Location</label>
                          <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.location}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Registration Date</label>
                          <p className="text-gray-900 text-sm sm:text-base">
                            {new Date(selectedEmployee.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                        {/* Social Links */}
                        {selectedEmployee.socialLinks && (
                          <div>
                            <label className="text-sm font-medium text-gray-500 block mb-1">Social Links</label>
                            <div className="flex gap-2 mt-1">
                              {selectedEmployee.socialLinks.linkedin && (
                                <a href={selectedEmployee.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                                  LinkedIn
                                </a>
                              )}
                              {selectedEmployee.socialLinks.github && (
                                <a href={selectedEmployee.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline flex items-center gap-1">
                                  GitHub
                                </a>
                              )}
                              {selectedEmployee.socialLinks.twitter && (
                                <a href={selectedEmployee.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                                  Twitter
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Professional Information */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 text-lg">Professional Information</h4>
                      <div className="space-y-4">
                        {/* Experience (object details) */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Experience</label>
                          {Array.isArray(selectedEmployee.experience) ? (
                            selectedEmployee.experience.map((exp, idx) => (
                              <div key={idx} className="mb-2 p-2 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-700 font-semibold">{exp.title || '-'}</div>
                                <div className="text-xs text-gray-500">Company: {exp.company || '-'}</div>
                                <div className="text-xs text-gray-500">Duration: {exp.duration || '-'}</div>
                                <div className="text-xs text-gray-500">Salary: {exp.salary || '-'}</div>
                                <div className="text-xs text-gray-500">Skills: {Array.isArray(exp.skills) && exp.skills.length > 0 ? exp.skills.join(', ') : '-'}</div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.experience || '-'}</p>
                          )}
                        </div>
                        {/* Education (object details) */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Education</label>
                          {Array.isArray(selectedEmployee.education) ? (
                            selectedEmployee.education.map((edu, idx) => (
                              <div key={idx} className="mb-2 p-2 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-700 font-semibold">{edu.degree || '-'}</div>
                                <div className="text-xs text-gray-500">Institution: {edu.institution || '-'}</div>
                                <div className="text-xs text-gray-500">Batch: {edu.batch || '-'}</div>
                                <div className="text-xs text-gray-500">Medium: {edu.medium || '-'}</div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-900 text-sm sm:text-base">{selectedEmployee.education || '-'}</p>
                          )}
                        </div>
                        {/* Skills */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Skills</label>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(selectedEmployee.skills) && selectedEmployee.skills.length > 0 ? (
                              selectedEmployee.skills.map((skill, idx) => (
                                <span key={idx as number} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{skill}</span>
                              ))
                            ) : (
                              <span className="text-gray-400">No skills listed</span>
                            )}
                          </div>
                        </div>
                        {/* Certifications */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Certifications</label>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(selectedEmployee.certifications) && selectedEmployee.certifications.length > 0 ? (
                              selectedEmployee.certifications.map((cert, idx) => (
                                <span key={idx as number} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{cert}</span>
                              ))
                            ) : (
                              <span className="text-gray-400">No certifications listed</span>
                            )}
                          </div>
                        </div>
                        {/* Languages */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Languages Known</label>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(selectedEmployee.languages) && selectedEmployee.languages.length > 0 ? (
                              selectedEmployee.languages.map((lang, idx) => (
                                <span key={idx as number} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">{lang as string}</span>
                              ))
                            ) : (
                              <span className="text-gray-400">No languages listed</span>
                            )}
                          </div>
                        </div>
                        {/* Resume */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Resume</label>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">📄</span>
                            <span className="font-medium text-gray-900 flex-1 truncate text-sm sm:text-base">
                              {selectedEmployee.resume ? (typeof selectedEmployee.resume === 'string' ? selectedEmployee.resume : selectedEmployee.resume.name) : 'No resume uploaded'}
                            </span>
                          </div>
                        </div>
                        {/* Preferences */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Preferences</label>
                          {selectedEmployee.preferences ? (
                            <div className="space-y-1">
                              <div className="text-xs text-gray-700">Job Title: {selectedEmployee.preferences.jobTitle || '-'}</div>
                              <div className="text-xs text-gray-700">Preferred Location: {selectedEmployee.preferences.preferredLocation || '-'}</div>
                              <div className="text-xs text-gray-700">Job Type: {Array.isArray(selectedEmployee.preferences.jobType) && selectedEmployee.preferences.jobType.length > 0 ? selectedEmployee.preferences.jobType.join(', ') : '-'}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">No preferences set</span>
                          )}
                        </div>
                        {/* Profile Completion */}
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Profile Completion</label>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${selectedEmployee.profileComplete || 0}%` }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 min-w-0">{selectedEmployee.profileComplete || 0}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Activity Summary */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 mb-4 text-lg">Activity Summary</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600">{selectedEmployee.jobsApplied || 0}</div>
                      <div className="text-sm text-gray-600 mt-1">Jobs Applied</div>
                    </div>
                    <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">{selectedEmployee.profileComplete || 0}%</div>
                      <div className="text-sm text-gray-600 mt-1">Profile Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )}
  export default JobSeekerManagement;
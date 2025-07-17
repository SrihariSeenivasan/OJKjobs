import React, { useState } from 'react';

import { mockEmployees, mockEmployers } from '../../constants';
import EmployeeManagement, { Employee } from './EmployeeManagement';
import EmployerManagement, { Employer } from './EmployerManagement';
import JobManagement from './JobManagement';

const ADMIN_PASSWORD = 'ojkadmin2025';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employers' | 'employees' | 'jobs'>('dashboard');
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Handler stubs
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupStatus, setPopupStatus] = useState<'approved' | 'rejected' | null>(null);

  const handleEmployerAction = (id: string, action: string) => {
    const employer = employers.find(e => e.id === id);
    if (!employer) return;
    if (action === 'approve') {
      setPopupMessage(`Employer ID: ${employer.id}, from ${employer.companyName} request has been approved.`);
      setPopupStatus('approved');
      setEmployers(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' } : e));
    } else if (action === 'reject') {
      setPopupMessage(`Employer ID: ${employer.id}, from ${employer.companyName} request has been rejected.`);
      setPopupStatus('rejected');
      setEmployers(prev => prev.map(e => e.id === id ? { ...e, status: 'rejected' } : e));
    }
  };


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [employers, setEmployers] = useState(mockEmployers);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-row md:flex-col justify-between py-4 md:py-8 px-2 md:px-6">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">OJK</span>
                </div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
              </div>
              {isAuthenticated && (
                <nav className="flex flex-col gap-2">
                  <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>
                    <span>📊</span> Dashboard
                  </button>
                  <button onClick={() => setActiveTab('employers')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === 'employers' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>
                    <span>🏢</span> Employers
                  </button>
                  <button onClick={() => setActiveTab('employees')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === 'employees' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>
                    <span>👥</span> Employees
                  </button>
                  <button onClick={() => setActiveTab('jobs')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTab === 'jobs' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>
                    <span>💼</span> Job Posts
                  </button>
                </nav>
              )}
            </div>
            {isAuthenticated && (
              <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-all">
                🚪 Logout
              </button>
            )}
          </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-4 md:p-8 overflow-y-auto min-h-screen">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-center h-full">
                <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl px-10 py-10 flex flex-col items-center gap-6 w-full max-w-sm border border-blue-200">
                  <div className="flex flex-col items-center mb-2">
                    <div className="bg-blue-100 rounded-full p-4 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A4.5 4.5 0 008 6.75v3.75m8.25 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0m0 0V6.75m0 3.75a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0m0 0V6.75A4.5 4.5 0 018 6.75v3.75m0 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-700">Admin Login</h2>
                    <p className="text-gray-500 text-sm mt-1">Enter your admin password to access the panel</p>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Admin password"
                    className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 outline-none w-full text-lg"
                    required
                  />
                  <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all w-full text-lg shadow">
                    Login
                  </button>
                </form>
              </div>
            ) : (
              <div>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <div>
                    <h2 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">🏢</span>
                          <span className="text-sm font-medium text-blue-600">Total</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-700">{employers.length}</div>
                        <div className="text-sm text-gray-600">Registered Employers</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">👥</span>
                          <span className="text-sm font-medium text-green-600">Active</span>
                        </div>
                        <div className="text-2xl font-bold text-green-700">{employees.length}</div>
                        <div className="text-sm text-gray-600">Registered Workers</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">💼</span>
                          <span className="text-sm font-medium text-purple-600">Live</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-700">{employers.reduce((acc, emp) => acc + (emp.jobsPosted || 0), 0)}</div>
                        <div className="text-sm text-gray-600">Job Posts</div>
                      </div>
                      {/* Removed KYC card as requested */}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <span className="text-sm">Employer Applications</span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              {employers.filter(e => e.status === 'pending').length}
                            </span>
                          </div>
                          {/* Removed KYC Verifications as requested */}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">New employer registered</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">KYC document submitted</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">New job posted</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Employers Tab */}
                {activeTab === 'employers' && (
                  <EmployerManagement
                    employers={employers}
                    getStatusColor={getStatusColor}
                    handleEmployerAction={handleEmployerAction}
                    setSelectedEmployer={setSelectedEmployer}
                    setShowEmployerModal={setShowEmployerModal}
                  />
                )}

                {/* Employees Tab */}
                {activeTab === 'employees' && (
                  <EmployeeManagement
                    employees={mockEmployees}
                    setSelectedEmployee={setSelectedEmployee}
                    setShowEmployeeModal={setShowEmployeeModal}
                  />
                )}

                {/* Jobs Tab */}
                {activeTab === 'jobs' && (
                  <JobManagement employers={employers} />
                )}
              </div>
            )}
          </div>
        </div>
        {/* Modals should be rendered here, inside the main return */}
        {popupMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {popupStatus === 'approved' ? 'Request Approved' : popupStatus === 'rejected' ? 'Request Rejected' : 'Action Status'}
              </h3>
              <p className="text-gray-700 mb-6 text-center">{popupMessage}</p>
              <button
                onClick={() => { setPopupMessage(null); setPopupStatus(null); }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
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

                {selectedEmployer.status === 'pending' && (
                  <div className="mt-6 flex gap-4">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
    </>
  );
}

export default AdminPanel;
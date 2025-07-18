import React, { useState } from 'react';

import { mockEmployees, mockEmployers } from '../../constants';

import AdminDashboard from './AdminDashboard';
import JobSeekerManagement from './EmployeeManagement';
import EmployerManagement from './EmployerManagement';
import JobManagement from './JobManagement';

const ADMIN_PASSWORD = 'ojkadmin2025';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employers' | 'employees' | 'jobs'>('dashboard');


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
                    <span>👥</span> Job Seeker 
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
                  <AdminDashboard />
                )}

                {/* Employers Tab */}
                {activeTab === 'employers' && (
                  <EmployerManagement
                    employers={employers}
                    getStatusColor={getStatusColor}
                    handleEmployerAction={handleEmployerAction}
                  />
                )}

                {/* Employees Tab */}
                {activeTab === 'employees' && (
                  <JobSeekerManagement employees={mockEmployees} />
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
        {/* Employer Details modal moved to EmployerManagement */}
        
    </>
  );
}

export default AdminPanel;
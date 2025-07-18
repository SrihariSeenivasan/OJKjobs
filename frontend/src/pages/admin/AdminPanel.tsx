import React, { useState } from 'react';

import { mockEmployees, mockEmployers } from '../../constants';

import AdminDashboard from './AdminDashboard';
import AdminSupport from './AdminSupport';
import EmployeeManagement from './EmployeeManagement';
import EmployerManagement from './EmployerManagement';
import JobManagement from './JobManagement';

const ADMIN_PASSWORD = 'ojkadmin2025';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employers' | 'employees' | 'jobs' | 'support'>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [employers, setEmployers] = useState(mockEmployers);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setIsSidebarOpen(false);
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

  const handleEmployerAction = (id: string, action: string, showPopup: (msg: string, status: 'approved' | 'rejected') => void) => {
    const employer = employers.find(e => e.id === id);
    if (!employer) return;
    if (action === 'approve') {
      showPopup(`Employer ID: ${employer.id}, from ${employer.companyName} request has been approved.`, 'approved');
      setEmployers(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' } : e));
    } else if (action === 'reject') {
      showPopup(`Employer ID: ${employer.id}, from ${employer.companyName} request has been rejected.`, 'rejected');
      setEmployers(prev => prev.map(e => e.id === id ? { ...e, status: 'rejected' } : e));
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'employers' | 'employees' | 'jobs' | 'support') => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile when tab is selected
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:fixed top-0 left-0 h-full z-50 w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-col shadow-2xl md:shadow-lg transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >
          <div className="flex flex-col h-full relative">
            {/* Header */}
            <div className="p-6 border-b border-blue-600 border-opacity-30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-blue-600 font-bold text-xl">OJK</span>
                  </div>
                  <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                {/* Close button for mobile */}
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden p-2 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            {isAuthenticated && (
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <button 
                  onClick={() => handleTabChange('dashboard')} 
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 group ${
                    activeTab === 'dashboard' 
                      ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
                      : 'hover:bg-blue-600 hover:bg-opacity-80 hover:translate-x-2'
                  }`}
                >
                  <span className="text-lg">📊</span> 
                  <span className="font-semibold">Dashboard</span>
                </button>
                <button 
                  onClick={() => handleTabChange('employers')} 
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 group ${
                    activeTab === 'employers' 
                      ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
                      : 'hover:bg-blue-600 hover:bg-opacity-80 hover:translate-x-2'
                  }`}
                >
                  <span className="text-lg">🏢</span> 
                  <span className="font-semibold">Employers</span>
                </button>
                <button 
                  onClick={() => handleTabChange('employees')} 
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 group ${
                    activeTab === 'employees' 
                      ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
                      : 'hover:bg-blue-600 hover:bg-opacity-80 hover:translate-x-2'
                  }`}
                >
                  <span className="text-lg">👥</span> 
                  <span className="font-semibold">Job Seekers</span>
                </button>
                <button 
                  onClick={() => handleTabChange('jobs')} 
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 group ${
                    activeTab === 'jobs' 
                      ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
                      : 'hover:bg-blue-600 hover:bg-opacity-80 hover:translate-x-2'
                  }`}
                >
                  <span className="text-lg">💼</span> 
                  <span className="font-semibold">Job Posts</span>
                </button>
                <button 
                  onClick={() => handleTabChange('support')} 
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 group ${
                    activeTab === 'support' 
                      ? 'bg-white text-blue-700 shadow-lg transform scale-105' 
                      : 'hover:bg-blue-600 hover:bg-opacity-80 hover:translate-x-2'
                  }`}
                >
                  <span className="text-lg">🛟</span> 
                  <span className="font-semibold">Support</span>
                </button>
              </nav>
            )}

            {/* Logout Button fixed to bottom */}
            {isAuthenticated && (
              <div className="absolute bottom-0 left-0 w-full p-4 border-t border-blue-600 border-opacity-30 bg-gradient-to-b from-blue-700 to-blue-500 md:static md:bg-none">
                <button 
                  onClick={handleLogout} 
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white flex flex-col min-h-screen transition-all duration-300 md:ml-64">
          {/* Mobile Header */}
          {isAuthenticated && (
            <header className="md:hidden bg-white shadow-md p-4 flex items-center justify-between border-b">
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {activeTab === 'employees' ? 'Job Seekers' : activeTab}
              </h2>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">OJK</span>
              </div>
            </header>
          )}

          {/* Content Area */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-center h-full min-h-96">
                <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center gap-6 w-full max-w-md border border-blue-200 mx-4">
                  <div className="flex flex-col items-center mb-2">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-4 mb-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A4.5 4.5 0 008 6.75v3.75m8.25 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0m0 0V6.75m0 3.75a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0m0 0V6.75A4.5 4.5 0 018 6.75v3.75m0 0a2.25 2.25 0 11-4.5 0m4.5 0a2.25 2.25 0 01-4.5 0" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">Admin Login</h2>
                    <p className="text-gray-500 text-sm text-center px-2">Enter your admin password to access the panel</p>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Admin password"
                    className="px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none w-full text-lg transition-all duration-200"
                    required
                  />
                  <button onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 w-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                    Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <AdminDashboard />
                )}

                {/* Employers Tab */}
                {activeTab === 'employers' && (
                  <EmployerManagement
                    employers={employers}
                    getStatusColor={getStatusColor}
                    handleEmployerAction={(id, action, showPopup) => handleEmployerAction(id, action, showPopup)}
                  />
                )}

                {/* Employees Tab */}
                {activeTab === 'employees' && (
                  <EmployeeManagement employees={mockEmployees} />
                )}

                {/* Jobs Tab */}
                {activeTab === 'jobs' && (
                  <JobManagement employers={employers} />
                )}

                {/* Support Tab */}
                {activeTab === 'support' && (
                  <AdminSupport />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
  
}

export default AdminPanel;
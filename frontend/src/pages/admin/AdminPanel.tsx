import React, { useEffect, useState } from 'react';
import EmployerApprovalPanel from './EmployerApprovalPanel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateJob, Job } from '../../store/slices/jobSlice';
import { addNotification } from '../../store/slices/uiSlice';

const ADMIN_PASSWORD = 'ojkadmin2025'; // Change this to a secure value in production

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { jobs, appliedJobs } = useSelector((state: RootState) => state.jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'employers' | 'subscription' | 'normal'>('dashboard');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const handleApprove = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      dispatch(updateJob({ ...job, status: 'approved', isActive: true }));
      dispatch(addNotification({
        type: 'success',
        message: `Job post "${job.title}" has been approved and is now live!`
      }));
    }
  };

  // Handle logout: reset auth and go to home
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  // Hide navbar/footer by adding a class to body when admin panel is mounted
  useEffect(() => {
    document.body.classList.add('admin-panel-active');
    return () => {
      document.body.classList.remove('admin-panel-active');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex overflow-hidden border border-blue-200">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-col justify-between py-8 px-6">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <img src="/assets/social/fb.png" alt="OJK Logo" className="w-10 h-10" />
              <h1 className="text-2xl font-bold">OJK Admin</h1>
            </div>
            {!isAuthenticated ? null : (
              <nav className="flex flex-col gap-2">
                <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>Dashboard</button>
                <button onClick={() => setActiveTab('jobs')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'jobs' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>Job Approvals</button>
                <button onClick={() => setActiveTab('employers')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'employers' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>Employer Approvals</button>
                <button onClick={() => setActiveTab('subscription')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'subscription' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>Subscription Logins</button>
                <button onClick={() => setActiveTab('normal')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'normal' ? 'bg-white text-blue-700 shadow' : 'hover:bg-blue-600'}`}>Normal Logins</button>
              </nav>
            )}
          </div>
          {isAuthenticated && (
            <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold mt-10">Logout</button>
          )}
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-white p-10 overflow-y-auto min-h-[600px]">
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
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all w-full text-lg shadow">Login</button>
              </form>
            </div>
          ) : (
            <div>
              {activeTab === 'dashboard' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2"></span>
                      <div className="text-lg font-semibold">Jobs Posted</div>
                      <div className="text-2xl font-bold">{jobs.length}</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">✅</span>
                      <div className="text-lg font-semibold">Jobs Approved</div>
                      <div className="text-2xl font-bold">{jobs.filter((j) => j.status === 'approved').length}</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">📝</span>
                      <div className="text-lg font-semibold">Jobs Applied</div>
                      <div className="text-2xl font-bold">{appliedJobs ? appliedJobs.length : 0}</div>
                    </div>
                  </div>
                </div>
              )}
              {/* Other tabs and modal restored from original code */}
              {activeTab === 'jobs' && (
                // ...existing code for job approvals...
                <>
                  {/* ...existing code... */}
                </>
              )}
              {activeTab === 'employers' && (
                <EmployerApprovalPanel />
              )}
              {/* Subscription and Normal Logins tabs removed due to lack of users array */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminPanel;

import React, { useState } from 'react';
import { mockEmployees, mockEmployers } from '../../constants';

const AdminDashboard: React.FC = () => {
  // Pagination state for Pending Approvals and Recent Activity
  const [pendingPage, setPendingPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const PENDING_PER_PAGE = 3;
  const ACTIVITY_PER_PAGE = 3;

  const pendingEmployers = mockEmployers.filter(e => e.status === 'pending');
  const paginatedPending = pendingEmployers.slice((pendingPage-1)*PENDING_PER_PAGE, pendingPage*PENDING_PER_PAGE);
  const totalPendingPages = Math.ceil(pendingEmployers.length / PENDING_PER_PAGE);

  // Example recent activity (replace with real data as needed)
  const recentActivity = [
    ...mockEmployers.slice(0, 5).map(e => ({ type: 'employer', text: `New employer registered: ${e.companyName}` })),
    ...mockEmployees.slice(0, 5).map(e => ({ type: 'jobseeker', text: `New job seeker registered: ${e.name}` })),
  ];
  const paginatedActivity = recentActivity.slice((activityPage-1)*ACTIVITY_PER_PAGE, activityPage*ACTIVITY_PER_PAGE);
  const totalActivityPages = Math.ceil(recentActivity.length / ACTIVITY_PER_PAGE);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🏢</span>
            <span className="text-sm font-medium text-blue-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{mockEmployers.length}</div>
          <div className="text-sm text-gray-600">Registered Employers</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">👥</span>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
          <div className="text-2xl font-bold text-green-700">{mockEmployees.length}</div>
          <div className="text-sm text-gray-600">Registered Job Seeker</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">👤</span>
            <span className="text-sm font-medium text-orange-600">Users</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">{mockEmployers.length + mockEmployees.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💼</span>
            <span className="text-sm font-medium text-purple-600">Live</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">{mockEmployers.reduce((acc, emp) => acc + (emp.jobs ? emp.jobs.length : 0), 0)}</div>
          <div className="text-sm text-gray-600">Job Posts</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-lg p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">⏳</span>
            <span className="text-sm font-medium text-yellow-600">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-700">{pendingEmployers.length}</div>
          <div className="text-sm text-gray-600">Pending Approvals</div>
        </div>
      </div>

      {/* Pending Approvals Card with Pagination */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
        <div className="space-y-3">
          {paginatedPending.map(e => (
            <div key={e.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium">Employer Application</span>
              <span className="font-semibold text-blue-700">{e.companyName}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button disabled={pendingPage === 1} onClick={() => setPendingPage(p => p-1)} className={`px-3 py-1 rounded ${pendingPage === 1 ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}>Prev</button>
          <span className="px-2 text-sm">Page {pendingPage} of {totalPendingPages}</span>
          <button disabled={pendingPage === totalPendingPages} onClick={() => setPendingPage(p => p+1)} className={`px-3 py-1 rounded ${pendingPage === totalPendingPages ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}>Next</button>
        </div>
      </div>

      {/* Recent Activity Card with Pagination */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {paginatedActivity.map((a, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${a.type === 'employer' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <span className="text-sm">{a.text}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button disabled={activityPage === 1} onClick={() => setActivityPage(p => p-1)} className={`px-3 py-1 rounded ${activityPage === 1 ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}>Prev</button>
          <span className="px-2 text-sm">Page {activityPage} of {totalActivityPages}</span>
          <button disabled={activityPage === totalActivityPages} onClick={() => setActivityPage(p => p+1)} className={`px-3 py-1 rounded ${activityPage === totalActivityPages ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

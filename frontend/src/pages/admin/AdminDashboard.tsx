import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h2>
      {/* Add dashboard widgets and summary here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🏢</span>
            <span className="text-sm font-medium text-blue-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">--</div>
          <div className="text-sm text-gray-600">Registered Employers</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">👥</span>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
          <div className="text-2xl font-bold text-green-700">--</div>
          <div className="text-sm text-gray-600">Registered Workers</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💼</span>
            <span className="text-sm font-medium text-purple-600">Live</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">--</div>
          <div className="text-sm text-gray-600">Job Posts</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">✅</span>
            <span className="text-sm font-medium text-orange-600">KYC</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">--</div>
          <div className="text-sm text-gray-600">Verified Employers</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

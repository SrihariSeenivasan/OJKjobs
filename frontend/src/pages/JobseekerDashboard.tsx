import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import {
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  BookmarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const JobseekerDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { appliedJobs, savedJobs } = useSelector((state: RootState) => state.jobs);

  const stats = [
    {
      name: 'Applied Jobs',
      value: appliedJobs.length,
      icon: BriefcaseIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Saved Jobs',
      value: savedJobs.length,
      icon: BookmarkIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Profile Completeness',
      value: '80%',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = [
    { name: 'Browse Jobs', href: '/browse-jobs', icon: BriefcaseIcon, color: 'bg-blue-600' },
    { name: 'Saved Jobs', href: '/saved-jobs', icon: BookmarkIcon, color: 'bg-green-600' },
    { name: 'Profile', href: '/profile', icon: UserGroupIcon, color: 'bg-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your job search today.
          </p>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-3`}
              >
                <action.icon className="h-6 w-6" />
                <span className="font-medium">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
        {/* Recent Activity for Jobseekers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <DocumentTextIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Application submitted</p>
                <p className="text-sm text-gray-600">Applied for "Construction Worker" position</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <BookmarkIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Job saved</p>
                <p className="text-sm text-gray-600">Saved "Retail Sales Assistant" position</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerDashboard;

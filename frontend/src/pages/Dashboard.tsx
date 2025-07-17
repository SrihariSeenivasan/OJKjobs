import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { RootState } from '../store';
import { addNotification } from '../store/slices/uiSlice';
import {
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  BookmarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import EmployerProfileSection from './auth/EmployerProfileSection';

const Dashboard: React.FC = () => {
  // const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { myJobs, appliedJobs, savedJobs } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();
  // Track previously approved jobs to avoid duplicate notifications
  const prevApprovedJobs = useRef<string[]>([]);

  useEffect(() => {
    if (user?.role === 'employer') {
      const approvedJobs = myJobs.filter(job => job.status === 'approved').map(job => job.id);
      const newApproved = approvedJobs.filter(id => !prevApprovedJobs.current.includes(id));
      if (newApproved.length > 0) {
        dispatch(addNotification({
          type: 'success',
          message: 'Your job post has been approved!'
        }));
      }
      prevApprovedJobs.current = approvedJobs;
    }
  }, [myJobs, user, dispatch]);

  const stats = [
    {
      name: user?.role === 'employer' ? 'Active Jobs' : 'Applied Jobs',
      value: user?.role === 'employer' ? myJobs.length : appliedJobs.length,
      icon: BriefcaseIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: user?.role === 'employer' ? 'Total Applications' : 'Saved Jobs',
      value: user?.role === 'employer' ? myJobs.reduce((sum, job) => sum + job.applicationsCount, 0) : savedJobs.length,
      icon: user?.role === 'employer' ? UserGroupIcon : BookmarkIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: user?.role === 'employer' ? 'Profile Views' : 'Profile Completeness',
      value: user?.role === 'employer' ? 156 : '80%',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = user?.role === 'employer' ? [
    { name: 'Post New Job', href: '/post-job', icon: PlusIcon, color: 'bg-blue-600' },
    { name: 'View Applications', href: '/applications', icon: DocumentTextIcon, color: 'bg-green-600' },
    { name: 'Manage Jobs', href: '/my-jobs', icon: BriefcaseIcon, color: 'bg-purple-600' }
  ] : [
    { name: 'Browse Jobs', href: '/browse-jobs', icon: BriefcaseIcon, color: 'bg-blue-600' },
    { name: 'Saved Jobs', href: '/saved-jobs', icon: BookmarkIcon, color: 'bg-green-600' },
    { name: 'Profile', href: '/profile', icon: UserGroupIcon, color: 'bg-purple-600' }
  ];

  // Mock: isVerified should come from backend/admin approval, here just false for demo
  const isVerified = false;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your {user?.role === 'employer' ? 'job posts' : 'job search'} today.
          </p>
        </div>

        {/* Company Profile Setup Section for Employer */}
        {user?.role === 'employer' && (
          <EmployerProfileSection isVerified={isVerified} />
        )}

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

        {/* My Jobs List for Employer */}
        {user?.role === 'employer' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Posted Jobs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {myJobs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 text-center text-gray-400">No jobs posted yet.</td>
                    </tr>
                  )}
                  {myJobs.map(job => (
                    <tr key={job.id}>
                      <td className="px-4 py-2 font-medium text-gray-900">{job.title}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${job.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {job.status === 'approved' ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-2">{job.applicationsCount}</td>
                      <td className="px-4 py-2">{new Date(job.postedDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Recent Activity for Jobseekers */}
        {user?.role !== 'employer' && (
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
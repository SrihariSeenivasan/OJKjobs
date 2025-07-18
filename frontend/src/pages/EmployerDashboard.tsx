import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { addNotification } from '../store/slices/uiSlice';
import {
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import EmployerProfileSection from './auth/EmployerProfileSection';

const EmployerDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { myJobs } = useSelector((state: RootState) => state.jobs);
  // Mock applicants data for each job
  const [applicants, setApplicants] = useState<{ [jobId: string]: any[] }>({});
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // Mock: Each job has 2 applicants
    const mockApplicants: { [jobId: string]: any[] } = {};
    myJobs.forEach(job => {
      mockApplicants[job.id] = [
        {
          id: 'OJK100001',
          name: 'Rahul Sharma',
          age: 28,
          location: 'Delhi',
          education: 'B.A.',
          experience: 3,
          headline: 'Retail Sales Assistant',
          cover: 'I am passionate about retail and have 3 years of experience in sales. I am eager to join your team and contribute to your company.',
          cv: '/assets/cv/rahul-sharma.pdf',
          status: 'pending'
        },
        {
          id: 'OJK100002',
          name: 'Priya Singh',
          age: 25,
          location: 'Bangalore',
          education: 'Diploma',
          experience: 2,
          headline: 'Construction Worker',
          cover: 'I have worked on several construction projects and am skilled in teamwork and safety. Looking forward to an interview.',
          cv: '/assets/cv/priya-singh.pdf',
          status: 'pending'
        }
      ];
    });
    setApplicants(mockApplicants);
  }, [myJobs]);

  // Approve applicant handler
  const handleApprove = (jobId: string, applicantId: string) => {
    setApplicants(prev => ({
      ...prev,
      [jobId]: prev[jobId].map(app =>
        app.id === applicantId ? { ...app, status: 'approved' } : app
      )
    }));
  };

  // View details handler
  const handleViewDetails = (applicant: any) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };
  const dispatch = useDispatch();
  const prevApprovedJobs = useRef<string[]>([]);

  useEffect(() => {
    const approvedJobs = myJobs.filter(job => job.status === 'approved').map(job => job.id);
    const newApproved = approvedJobs.filter(id => !prevApprovedJobs.current.includes(id));
    if (newApproved.length > 0) {
      dispatch(addNotification({
        type: 'success',
        message: 'Your job post has been approved!'
      }));
    }
    prevApprovedJobs.current = approvedJobs;
  }, [myJobs, dispatch]);

  const stats = [
    {
      name: 'Active Jobs',
      value: myJobs.length,
      icon: BriefcaseIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Total Applications',
      value: myJobs.reduce((sum, job) => sum + job.applicationsCount, 0),
      icon: UserGroupIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Profile Views',
      value: 156,
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = [
    { name: 'Post New Job', href: '/post-job', icon: PlusIcon, color: 'bg-blue-600' },
    { name: 'View Applications', href: '/applications', icon: DocumentTextIcon, color: 'bg-green-600' },
    { name: 'Manage Jobs', href: '/my-jobs', icon: BriefcaseIcon, color: 'bg-purple-600' }
  ];

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
            Here's what's happening with your job posts today.
          </p>
        </div>
        {/* Company Profile Setup Section for Employer */}
        <EmployerProfileSection isVerified={isVerified} />
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
                  <React.Fragment key={job.id}>
                    <tr>
                      <td className="px-4 py-2 font-medium text-gray-900">{job.title}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${job.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {job.status === 'approved' ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-2">{job.applicationsCount}</td>
                      <td className="px-4 py-2">{new Date(job.postedDate).toLocaleDateString()}</td>
                    </tr>
                    {/* Applicants Section */}
                    <tr>
                      <td colSpan={4} className="bg-gray-50 px-4 py-4">
                        <div className="mb-2 font-semibold text-gray-800">Applicants:</div>
                        {applicants[job.id] && applicants[job.id].length > 0 ? (
                          <div className="space-y-2">
                            {applicants[job.id].map(applicant => (
                              <div key={applicant.id} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between bg-white">
                                <div>
                                  <div className="font-bold text-gray-900">{applicant.name} ({applicant.age}, {applicant.location})</div>
                                  <div className="text-sm text-gray-600">{applicant.education} | {applicant.experience} yrs exp</div>
                                  <div className="text-sm text-gray-600">{applicant.headline}</div>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-2">
                                  <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => handleViewDetails(applicant)}
                                  >
                                    View Details
                                  </button>
                                  {applicant.status === 'pending' ? (
                                    <button
                                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                      onClick={() => handleApprove(job.id, applicant.id)}
                                    >
                                      Approve for Interview
                                    </button>
                                  ) : (
                                    <span className="text-green-700 font-semibold">Approved for Interview</span>
                                  )}
                                </div>
                              </div>
                            ))}
      {/* Applicant Details Modal */}
      {showModal && selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Applicant Details</h3>
            <div className="mb-2"><span className="font-semibold">Name:</span> {selectedApplicant.name}</div>
            <div className="mb-2"><span className="font-semibold">Age:</span> {selectedApplicant.age}</div>
            <div className="mb-2"><span className="font-semibold">Location:</span> {selectedApplicant.location}</div>
            <div className="mb-2"><span className="font-semibold">Education:</span> {selectedApplicant.education}</div>
            <div className="mb-2"><span className="font-semibold">Experience:</span> {selectedApplicant.experience} years</div>
            <div className="mb-2"><span className="font-semibold">Headline:</span> {selectedApplicant.headline}</div>
            <div className="mb-2"><span className="font-semibold">Cover Details:</span> {selectedApplicant.cover}</div>
            <div className="mb-2"><span className="font-semibold">CV:</span> {selectedApplicant.cv ? (
              <a href={selectedApplicant.cv} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View CV</a>
            ) : (
              <span className="text-gray-400">No CV uploaded</span>
            )}
            </div>
          </div>
        </div>
      )}
                          </div>
                        ) : (
                          <div className="text-gray-400">No applicants yet.</div>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;

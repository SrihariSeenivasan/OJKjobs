
import React from 'react';
export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  postedDate: string;
  employerId: string;
  requirements: string[];
  status: string;
}

export interface Employer {
  id: string;
  companyName: string;
  jobs: Job[];
}

interface JobManagementProps {
  employers: Employer[];
}

const JobManagement: React.FC<JobManagementProps> = ({ employers }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Job Management</h2>
      {employers.map((employer) => (
        <div key={employer.id} className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {employer.companyName} <span className="text-sm text-gray-500">(Job Posts: {employer.jobs.length})</span>
          </h3>
          {employer.jobs.length === 0 ? (
            <p className="text-gray-500 mb-6">No job posts available.</p>
          ) : (
            <div className="space-y-8">
              {employer.jobs.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                  <h4 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h4>
                  <div className="mb-2"><span className="font-semibold">Description:</span> {job.description}</div>
                  <div className="mb-2"><span className="font-semibold">Location:</span> {job.location}</div>
                  <div className="mb-2"><span className="font-semibold">Salary:</span> {job.salary}</div>
                  <div className="mb-2"><span className="font-semibold">Posted Date:</span> {new Date(job.postedDate).toLocaleDateString()}</div>
                  <div className="mb-2"><span className="font-semibold">Requirements:</span> {job.requirements.join(', ')}</div>
                  <div className="mb-2"><span className="font-semibold">Status:</span> {job.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobManagement;

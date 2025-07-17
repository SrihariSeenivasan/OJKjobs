import React from 'react';

// Example job type
interface Job {
  id: string;
  headline: string;
  responsibilities: string;
  location: { city: string; state: string };
  minSalary: number;
  maxSalary: number;
  jobType: string;
  industry: string;
  requirements: string;
  benefits: string;
  applicationDeadline: string;
}

interface Employer {
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
                  <h4 className="text-xl font-bold text-blue-600 mb-2">{job.headline}</h4>
                  <div className="mb-2"><span className="font-semibold">Responsibilities:</span> {job.responsibilities}</div>
                  <div className="mb-2"><span className="font-semibold">Location:</span> {job.location.city}, {job.location.state}</div>
                  <div className="mb-2"><span className="font-semibold">Salary:</span> ₹{job.minSalary} - ₹{job.maxSalary}</div>
                  <div className="mb-2"><span className="font-semibold">Job Type:</span> {job.jobType}</div>
                  <div className="mb-2"><span className="font-semibold">Industry:</span> {job.industry}</div>
                  <div className="mb-2"><span className="font-semibold">Requirements:</span> {job.requirements}</div>
                  <div className="mb-2"><span className="font-semibold">Benefits:</span> {job.benefits}</div>
                  <div className="mb-2"><span className="font-semibold">Application Deadline:</span> {job.applicationDeadline}</div>
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

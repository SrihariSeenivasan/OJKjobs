

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">No Profile Data Found</h2>
          <p className="text-gray-600">Please complete your profile details.</p>
        </div>
      </div>
    );
  }

  // Calculate profile completion (simple logic: count filled fields)
  const completionFields = [
    profile.name, profile.email, profile.mobile, profile.dob, profile.gender, profile.location,
    profile.experience?.length ? '1' : '',
    profile.education?.length ? '1' : '',
    profile.skills?.length ? '1' : '',
    profile.certifications?.length ? '1' : '',
    profile.languages?.length ? '1' : '',
    profile.resume ? '1' : '',
    profile.preferences?.jobTitle, profile.preferences?.jobType?.length ? '1' : '', profile.preferences?.preferredLocation
  ];
  const completion = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100);

  // Mock applied jobs if not present
  type AppliedJob = { id: string; title: string; company: string; status?: string };
  const appliedJobs: AppliedJob[] =
    'appliedJobs' in profile && Array.isArray((profile as { appliedJobs?: AppliedJob[] }).appliedJobs)
      ? ((profile as { appliedJobs: AppliedJob[] }).appliedJobs)
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Left summary card */}
        <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-2xl p-0 flex flex-col items-center mb-8 md:mb-0 border border-green-100 overflow-hidden">
          {/* Avatar and Name */}
          <div className="w-full flex flex-col items-center bg-gradient-to-b from-green-100 to-green-50 p-8 pb-4 border-b border-green-50">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-5xl font-bold text-white mb-3 shadow-lg border-4 border-white">
              {profile.name?.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="font-bold text-2xl text-gray-800 mb-1">{profile.name}</div>
            <div className="text-base text-green-600 mb-2">{profile.preferences?.jobTitle || 'No job title added'}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded text-xs font-semibold">{profile.gender}</span>
              <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded text-xs font-semibold">{profile.dob}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">{profile.location || 'Add Home Town'}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full px-8 py-4 border-b border-green-50 flex flex-col gap-1 text-base text-gray-600 bg-white">
            <div><span className="font-semibold">Email:</span> <span className="break-all">{profile.email}</span></div>
            <div><span className="font-semibold">Mobile:</span> {profile.mobile}</div>
          </div>

          {/* Profile Completion Status */}
          <div className="w-full px-8 py-4 border-b border-green-50 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-700">Profile Completion</span>
              <span className="font-bold text-green-600">{completion}%</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-right">Complete your profile for better job matches</div>
          </div>

          {/* Small Dashboard: Applied Jobs */}
          <div className="w-full px-8 py-4 bg-white">
            <div className="font-semibold text-green-700 mb-2">My Job Activity</div>
            <div className="flex flex-col gap-2">
              {appliedJobs.length > 0 ? (
                appliedJobs.slice(0, 3).map((job: AppliedJob) => (
                  <div key={job.id} className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 flex flex-col">
                    <span className="font-medium text-gray-800">{job.title}</span>
                    <span className="text-xs text-gray-500">{job.company} • {job.status || 'Applied'}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400">No jobs applied yet</div>
              )}
            </div>
            <div className="mt-2 text-xs text-blue-600 cursor-pointer hover:underline text-right" onClick={() => window.location.href='/dashboard'}>
              View all job activity
            </div>
          </div>
        </div>

        {/* Right details section */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Work Experience */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Work Experience</h3>
              <button className="text-green-600 text-sm font-medium">+ Add</button>
            </div>
            {profile.experience?.length > 0 && profile.experience[0].title ? (
              <div className="mb-2">
                <div className="font-bold text-gray-800 text-base">{profile.experience[0].title}</div>
                <div className="text-sm text-gray-600">{profile.experience[0].company}</div>
                <div className="text-sm text-gray-400">{profile.experience[0].duration}</div>
                <div className="text-sm text-gray-400">₹{profile.experience[0].salary} / month</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.experience[0].skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">No experience added</div>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Education</h3>
              <button className="text-green-600 text-sm font-medium">+ Add</button>
            </div>
            {profile.education?.length > 0 && profile.education[0].degree ? (
              <div className="mb-2">
                <div className="font-bold text-gray-800 text-base">{profile.education[0].degree}</div>
                <div className="text-sm text-gray-600">{profile.education[0].institution}</div>
                <div className="text-sm text-gray-400">Batch of {profile.education[0].batch}</div>
                <div className="text-sm text-gray-400">Medium: {profile.education[0].medium}</div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">No education added</div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Skills</h3>
              <button className="text-green-600 text-sm font-medium">Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.length > 0 ? profile.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{skill}</span>
              )) : <span className="text-gray-400 text-sm">No skills added</span>}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Certifications</h3>
              <button className="text-green-600 text-sm font-medium">+ Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.certifications?.length > 0 ? profile.certifications.map(cert => (
                <span key={cert} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{cert}</span>
              )) : <span className="text-gray-400 text-sm">No certifications added</span>}
            </div>
          </div>

          {/* Languages Known */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Languages Known</h3>
              <button className="text-green-600 text-sm font-medium">Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.languages?.length > 0 ? profile.languages.map(lang => (
                <span key={lang} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{lang}</span>
              )) : <span className="text-gray-400 text-sm">No languages added</span>}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Resume</h3>
              <button className="text-green-600 text-sm font-medium">Edit</button>
            </div>
            {profile.resume ? (
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">{profile.resume.name}</span>
                <span className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            ) : <span className="text-gray-400 text-sm">No resume uploaded</span>}
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Preferences</h3>
              <button className="text-green-600 text-sm font-medium">Edit</button>
            </div>
            <div className="mb-2 text-base text-gray-700">Preferred Job Title/Role: <span className="font-medium">{profile.preferences?.jobTitle || 'Not added'}</span></div>
            <div className="mb-2 text-base text-gray-700">Preferred Location: <span className="font-medium">{profile.preferences?.preferredLocation || 'Not added'}</span></div>
            <div className="mb-2 text-base text-gray-700">Job Type: <span className="font-medium">{profile.preferences?.jobType?.join(', ') || 'Not added'}</span></div>
          </div>

          {/* Basic Details */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50 text-base text-gray-500">
            <div>Basic details: {profile.name} • <span className="text-green-700">Verify your email</span> • {profile.mobile} • {profile.gender} • {profile.dob}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

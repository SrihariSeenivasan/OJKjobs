import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyViaEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [subject, setSubject] = useState(`Application for ${job?.title || ''} at ${job?.company || ''}`);
  const [message, setMessage] = useState(
    `The ${job?.title || ''} position at ${job?.company || ''} aligns well with my professional goals and aspirations.\nI look forward to the possibility of working together.\nBest regards,`
  );
  const [resume, setResume] = useState<File | null>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = () => {
    if (!subject.trim()) {
      alert('Please enter a subject.');
      return;
    }
    if (!resume) {
      alert('Please upload your resume.');
      return;
    }
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }
    // Here you would handle sending the email, e.g. via backend API
    setEmailSent(true);
    setTimeout(() => {
      navigate('/', { state: { job, applied: true } });
    }, 3000);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-bold mb-2">No job selected</h2>
          <p className="mb-4">Please select a job from the Browse Jobs page.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/browse-jobs')}>Go to Browse Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-10 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-lg p-0 overflow-hidden border border-gray-100">
        {/* Card Header with Job Info */}
        <div className="bg-green-600 px-8 py-7 flex items-center gap-5 rounded-t-2xl">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=0D8ABC&color=fff&size=64`} alt="Company" className="w-16 h-16 rounded-full border-4 border-white shadow" />
          <div className="flex-1">
            <div className="text-white text-xl font-bold leading-tight">{job.title}</div>
            <div className="text-green-100 text-base font-semibold">{job.company}</div>
            <div className="text-green-200 text-xs flex gap-3 mt-2">
              <span className="inline-flex items-center gap-1">
                {/* Location Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-7.333 8-13a8 8 0 1 0-16 0c0 5.667 8 13 8 13z" /></svg>
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1">
                {/* Salary Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h3m-3 0H9" /></svg>
                {job.salary}
              </span>
            </div>
          </div>
        </div>
        {/* Card Body */}
        <div className="px-8 py-8 bg-white">
          {emailSent ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <div className="text-2xl font-bold text-green-700 mb-2">Email sent successfully!</div>
              <div className="text-gray-500 text-center mb-4">You will be redirected to the job page in 3 seconds...</div>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-2xl mb-7 text-gray-900 text-center flex items-center justify-center gap-2">
                {/* Mail Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>
                Apply via Email
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 bg-white text-gray-900 font-medium shadow-sm"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Resume <span className="text-xs text-gray-400">(.pdf, .doc, .docx)</span></label>
                <div className="flex items-center gap-3">
                  <input type="file" accept=".pdf,.doc,.docx" required onChange={handleResumeChange} className="border border-gray-200 rounded-lg px-2 py-1 bg-white shadow-sm" />
                  {resume && (
                    <span className="text-green-700 text-sm font-semibold">{resume.name}</span>
                  )}
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-200 bg-white text-gray-900 font-medium shadow-sm"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <button
                className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-md transition text-lg flex items-center justify-center gap-2"
                onClick={handleSendEmail}
              >
                {/* Paper Airplane Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l9-7.5-9-7.5v15z" /></svg>
                Send email to apply
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyViaEmail;

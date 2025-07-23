import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

const similarJobs = [
  {
    title: 'Web Designer',
    company: 'Travania',
    location: 'Kolkata/Calcutta',
    salary: 'Not disclosed',
    tags: ['Work from Office', 'Full Time', 'Freshers only'],
  },
  {
    title: 'Wordpress Developer',
    company: 'Watslar Technologies',
    location: 'Kolhapur',
    salary: 'Not disclosed',
    tags: ['Work from Office', 'Full Time', 'Any experience'],
  },
  {
    title: 'Junior Web Developer',
    company: 'Neologic Software Solutions',
    location: 'Thiruvananthapuram',
    salary: 'Not disclosed',
    tags: ['Work from Office', 'Full Time', 'Any experience'],
  },
];

const ApplyJob: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Add state for share popover
  const [showShare, setShowShare] = React.useState(false);
  // Get job details from navigation state
  const job = location.state?.job;
  // Stepper logic: track application process
  // step: 1 = Apply, 2 = Schedule, 3 = Get hired
  const [step, setStep] = React.useState(1);

  // Simulate step change: when user clicks 'Apply via email', move to step 2
  const handleApply = () => {
    setStep(2);
    navigate('/apply-via-email', { state: { job } });
  };

  // Simulate completion: when user returns after applying, set step 3
  React.useEffect(() => {
    // If coming back from /apply-via-email, mark step 3 as completed
    if (location.state?.applied) {
      setStep(3);
    }
  }, [location.state]);

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
    <div className="bg-[#f7fafd] min-h-screen py-10">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Job Card */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex items-center gap-4 mb-2">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=0D8ABC&color=fff&size=64`} alt="Company" className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="font-bold text-lg text-gray-800">{job.title}</h2>
                <div className="text-gray-500 text-sm">{job.company}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="text-gray-500 text-sm">{job.location}</span>
              <span className="text-gray-500 text-sm">{job.salary}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag: string) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
          <button
            className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
            onClick={handleApply}
            disabled={step > 1}
            style={step > 1 ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
          >
            {step === 1 ? 'Apply via email' : 'Applied'}
          </button>
              <div className="relative">
                <button
                  className="flex items-center gap-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowShare(true)}
                >
                  <span>Share</span>
                </button>
                {showShare && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 flex flex-col gap-2">
                    <div className="font-bold text-lg text-gray-800 mb-2 text-center">Share this job</div>
                    <div className="border-b border-gray-100 mb-2"></div>
                    <button
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 text-gray-700 transition"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setShowShare(false);
                        window.alert('Link copied to clipboard!');
                      }}
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1H7a1 1 0 00-1 1v9m0 0l4 4 4-4'/></svg>
                      </span>
                      Copy Link
                    </button>
                    <button
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 text-green-700 transition"
                      onClick={() => {
                        window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`);
                        setShowShare(false);
                      }}
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-green-500' fill='currentColor' viewBox='0 0 32 32'><path d='M16 3C9.373 3 4 8.373 4 15c0 2.385.693 4.607 2.01 6.563L4 29l7.563-2.01A12.96 12.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.813 0-3.563-.354-5.188-1.063l-.375-.156-4.5 1.188 1.188-4.5-.156-.375C6.354 18.563 6 16.813 6 15c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.125-7.125c-.281-.141-1.625-.797-1.875-.891-.25-.094-.438-.141-.625.141-.188.281-.719.891-.875 1.078-.156.188-.313.211-.594.07-.281-.141-1.188-.438-2.25-1.344-.828-.734-1.391-1.641-1.547-1.922-.156-.281-.016-.438.125-.578.125-.125.281-.313.422-.469.141-.156.188-.266.281-.438.094-.188.047-.344-.023-.484-.07-.141-.625-1.516-.859-2.078-.227-.547-.457-.469-.625-.477-.156-.008-.344-.008-.531-.008-.188 0-.484.07-.734.344-.25.281-.953.938-.953 2.281 0 1.344.977 2.641 1.109 2.828.141.188 1.922 2.938 4.672 3.984.656.281 1.166.453 1.563.578.656.209 1.25.18 1.719.109.523-.078 1.625-.664 1.854-1.305.227-.641.227-1.188.156-1.305-.07-.117-.25-.188-.531-.328z'/></svg>
                      </span>
                      WhatsApp
                    </button>
                    <button
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 transition"
                      onClick={() => {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
                        setShowShare(false);
                      }}
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-blue-500' fill='currentColor' viewBox='0 0 24 24'><path d='M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.733 0 1.325-.593 1.325-1.326V1.326C24 .592 23.408 0 22.675 0'/></svg>
                      </span>
                      Facebook
                    </button>
                    <button
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-500 transition"
                      onClick={() => {
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(job.title + ' at ' + job.company)}`);
                        setShowShare(false);
                      }}
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50">
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-blue-400' fill='currentColor' viewBox='0 0 24 24'><path d='M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161c-.542.929-.855 2.01-.855 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z'/></svg>
                      </span>
                      Twitter
                    </button>
                    <div className="border-t border-gray-100 mt-2 mb-2"></div>
                    <button
                      className="w-full py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                      onClick={() => setShowShare(false)}
                    >Cancel</button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Job Description */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Job Description</h3>
            <div className="text-gray-700 mb-2">{job.description || 'No description available.'}</div>
            <button className="text-green-700 text-sm font-semibold">Show more</button>
          </div>

          {/* Job Role */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Job role</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 font-medium">Work location</div>
                <div className="text-gray-700">{job.location}</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">Department</div>
                <div className="text-gray-700">{job.department || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">Role / Category</div>
                <div className="text-gray-700">{job.role || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">Employment type</div>
                <div className="text-gray-700">{job.employmentType || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium">Shift</div>
                <div className="text-gray-700">{job.shift || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Job Requirements */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Job requirements</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 font-medium">Experience</div>
                <div className="text-gray-700">{job.experience || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* About Company */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">About company</h3>
            <div className="flex items-center gap-2">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=0D8ABC&color=fff&size=32`} alt="Company" className="w-8 h-8 rounded-full" />
              <span className="text-gray-700 font-medium">{job.company}</span>
            </div>
            <div className="text-xs text-gray-400 mt-2">Job posted by <span className="font-semibold">{job.company}</span></div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
          {/* Steps - Dynamic Stepper UI */}
          <div className="bg-orange-50 rounded-xl shadow p-6 flex flex-col items-center mb-2">
            <h4 className="font-bold text-orange-900 mb-4 text-center text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
             Achieve your career goals in 3 simple moves
            </h4>
            <div className="flex items-center justify-center gap-6 w-full">
              {/* Step 1: Apply for job */}
              <div className="flex flex-col items-center w-28 text-center">
                <span className={`rounded-full p-3 shadow mb-2 flex items-center justify-center mx-auto ${step >= 2 ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}> 
                  {step >= 2 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16v-1a4 4 0 0 1 4-4h4" /><rect x="8" y="8" width="8" height="8" rx="2" /></svg>
                  )}
                </span>
                <span className={`text-xs font-semibold ${step >= 2 ? 'text-green-700' : 'text-orange-700'} text-center w-full`}>Apply for job</span>
              </div>
              {/* Step 2: Schedule interview */}
              <div className="flex flex-col items-center w-28 text-center">
                <span className={`rounded-full p-3 shadow mb-2 flex items-center justify-center mx-auto ${step === 3 ? 'bg-green-100 border-2 border-green-500' : step === 2 ? 'bg-orange-100 border-2 border-orange-500' : 'bg-white'}`}> 
                  {step === 3 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" /></svg>
                  )}
                </span>
                <span className={`text-xs font-semibold ${step === 3 ? 'text-green-700' : step === 2 ? 'text-orange-700' : 'text-orange-700'} text-center w-full`}>Schedule interview</span>
              </div>
              {/* Step 3: Get hired (always green) */}
              <div className="flex flex-col items-center w-28 text-center bg-green-50 rounded-xl py-2">
                <span className="rounded-full p-3 shadow mb-2 flex items-center justify-center mx-auto bg-green-200 border-2 border-green-500"> 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="text-xs font-bold text-center w-full text-green-700">Get hired</span>
              </div>
            </div>
            {/* Completion message only if step === 3 */}
            {step === 3 && (
              <div className="mt-4 w-full flex items-center justify-center">
                <span className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm bg-green-50 rounded px-3 py-1 shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Process completed! You're ready to get hired.
                </span>
              </div>
            )}
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-xl shadow p-4 mb-2">
            <h4 className="font-semibold text-gray-800 mb-2">Similar jobs</h4>
            <div className="space-y-3">
              {similarJobs.map((job, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1 hover:shadow transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-700">{job.title}</div>
                      <div className="text-xs text-gray-500">{job.company}</div>
                      <div className="text-xs text-gray-400">{job.location}</div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-300" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 rounded-lg bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition">Show more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { setProfile } from '../../../store/slices/authSlice';

interface Experience {
  title: string;
  company: string;
  duration: string;
  salary: string;
  skills: string[];
}

interface Education {
  degree: string;
  institution: string;
  batch: string;
  medium: string;
}

// ...existing code (types, constants)...

const roleOptions = [
  'Software Engineer', 'UI/UX Designer', 'Data Analyst', 'HR Executive', 'Sales Executive', 'Marketing Manager', 'Accountant', 'Teacher', 'Nurse', 'Other'
];
const durationOptions = [
  'Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5+ years', 'Jan 2022 - Present', 'Other'
];
const locationOptions = [
  'Bangalore', 'Chennai', 'Hyderabad', 'Delhi', 'Mumbai', 'Kolkata', 'Pune', 'Other'
];
const skillSuggestions: Record<string, string[]> = {
  'Software Engineer': ['React', 'Node.js', 'Java', 'Python', 'C++', 'SQL'],
  'UI/UX Designer': ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
  'Data Analyst': ['Excel', 'SQL', 'Python', 'Power BI', 'Tableau'],
  'HR Executive': ['Recruitment', 'Payroll', 'Onboarding', 'Compliance'],
  'Sales Executive': ['Lead Generation', 'CRM', 'Negotiation', 'Communication'],
  'Marketing Manager': ['SEO', 'Content', 'Google Ads', 'Social Media'],
  'Accountant': ['Tally', 'GST', 'Taxation', 'Excel'],
  'Teacher': ['Lesson Planning', 'Classroom Management', 'Assessment'],
  'Nurse': ['Patient Care', 'Medication', 'Emergency Response'],
  'Other': ['Teamwork', 'Communication', 'Problem Solving']
};

const steps = [
  'Basic Info',
  'Experience',
  'Education',
  'Skills',
  'Certifications',
  'Languages',
  'Resume',
  'Preferences'
];


interface Profile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  location: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages: string[];
  resume: File | null;
  preferences: {
    jobTitle: string;
    preferredLocation: string;
    jobType: string[];
  };
}

// Helper to get user info from localStorage only (Redux is handled in component)
const getUserInfo = () => {
  let name = '';
  let email = '';
  let phone_number = '';
  const candidateUserRaw = localStorage.getItem('candidateUser');
  if (candidateUserRaw) {
    try {
      const candidateUser = JSON.parse(candidateUserRaw);
      name = candidateUser.name || '';
      phone_number = candidateUser.phone_number || '';
    } catch (err) {
      console.error('Error parsing candidateUser from localStorage:', err);
    }
  }
  // Fallbacks if needed
  if (!name) name = localStorage.getItem('user_name') || '';
  if (!phone_number) phone_number = localStorage.getItem('phone_number') || '';
  email = localStorage.getItem('user_email') || '';
  return { name, email, phone_number };
};

const initialProfile: Profile = {
  name: getUserInfo().name,
  email: getUserInfo().email,
  mobile: getUserInfo().phone_number, // always string
  dob: '',
  gender: '',
  location: '',
  experience: [{ title: '', company: '', duration: '', salary: '', skills: [] }],
  education: [{ degree: '', institution: '', batch: '', medium: '' }],
  skills: [],
  certifications: [],
  languages: [],
  resume: null,
  preferences: { jobTitle: '', preferredLocation: '', jobType: [] }
};

interface JobseekerProfileStepperProps {
  onClose?: () => void;
}

const JobseekerProfileStepper: React.FC<JobseekerProfileStepperProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfileState] = useState<Profile>(initialProfile);
  // Get user info from Redux store
  const user = useSelector((state: { auth: { user?: { name?: string; email?: string; phone_number?: string | number } } }) => state.auth?.user || {});
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [certFile, setCertFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-4 w-full overflow-x-auto">
      <div className="flex w-full max-w-full px-1 gap-0">
        {steps.map((label, idx) => (
          <div key={label} className="flex flex-col items-center flex-1 min-w-[36px]">
            <div className={`w-7 h-7 flex items-center justify-center rounded-full border-2 font-bold text-xs shadow transition-all duration-300
              ${step === idx
                ? 'bg-green-600 text-white border-green-600 scale-105 shadow-lg'
                : step > idx
                  ? 'bg-green-100 text-green-700 border-green-400'
                  : 'bg-gray-100 text-gray-400 border-gray-200'}`}
              style={{ zIndex: 1 }}
            >
              {idx + 1}
            </div>
            <span className={`mt-0.5 text-[10px] font-medium ${step === idx ? 'text-green-700' : 'text-gray-400'} text-center max-w-[48px]`}>{label}</span>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 w-6 transition-all duration-300 mx-0 rounded-full -mt-4 mb-1"
                ${step > idx ? 'bg-green-400' : 'bg-gray-200'}`}
                style={{ zIndex: 0 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ...existing code (renderStep, handleNext, handlePrev, return JSX)...

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-7">
            <div>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Full Name</label>
              <input type="text" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" value={user.name || profile.name} readOnly disabled />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold text-green-700 mb-1 text-xs">Email</label>
                <input type="email" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" value={profile.email} onChange={e => setProfileState({ ...profile, email: e.target.value })} required />
              </div>
              <div className="flex-1">
                <label className="block font-semibold text-green-700 mb-1 text-xs">Mobile</label>
                <input type="tel" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" value={String(user.phone_number || profile.mobile)} readOnly disabled />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold text-green-700 mb-1 text-xs">Date of Birth</label>
                <input type="date" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" value={profile.dob} onChange={e => setProfileState({ ...profile, dob: e.target.value })} required />
              </div>
              <div className="flex-1">
                <label className="block font-semibold text-green-700 mb-1 text-xs">Gender</label>
                <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" value={profile.gender} onChange={e => setProfileState({ ...profile, gender: e.target.value })} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Location</label>
              <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" value={profile.location} onChange={e => setProfileState({ ...profile, location: e.target.value })} required>
                <option value="">Select Location</option>
                {locationOptions.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
        );
      case 1: {
        const selectedRole = profile.experience[0].title;
        const relevantSkills = skillSuggestions[selectedRole] || skillSuggestions['Other'];
        return (
          <div className="space-y-7">
            <div>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Role / Job Title <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" value={profile.experience[0].title} onChange={e => setProfileState({ ...profile, experience: [{ ...profile.experience[0], title: e.target.value }] })}>
                <option value="">Select Role</option>
                {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Company Name <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <input type="text" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" placeholder="Company Name" value={profile.experience[0].company} onChange={e => setProfileState({ ...profile, experience: [{ ...profile.experience[0], company: e.target.value }] })} />
              <label className="block font-semibold text-green-700 mb-1 text-xs">Duration <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" value={profile.experience[0].duration} onChange={e => setProfileState({ ...profile, experience: [{ ...profile.experience[0], duration: e.target.value }] })}>
                <option value="">Select Duration</option>
                {durationOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Location <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" value={profile.location} onChange={e => setProfileState({ ...profile, location: e.target.value })}>
                <option value="">Select Location</option>
                {locationOptions.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Monthly Salary <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <input type="text" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" placeholder="Monthly Salary" value={profile.experience[0].salary} onChange={e => setProfileState({ ...profile, experience: [{ ...profile.experience[0], salary: e.target.value }] })} />
              <label className="block font-semibold text-green-700 mb-1 text-xs">Skills <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <div className="flex flex-wrap items-center gap-1 mb-1 min-h-[32px] bg-white border border-green-200 rounded px-1 py-1">
                {profile.experience[0].skills.map((skill: string) => (
                  <span key={skill} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium flex items-center gap-1">
                    {skill}
                    <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => setProfileState({ ...profile, experience: [{ ...profile.experience[0], skills: profile.experience[0].skills.filter((s: string) => s !== skill) }] })}>&times;</button>
                  </span>
                ))}
                <input
                  type="text"
                  className="flex-1 px-1 py-0.5 border-none outline-none text-xs min-w-[60px] bg-transparent"
                  placeholder="Add a skill"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ',') && skillInput) {
                      e.preventDefault();
                      if (!profile.experience[0].skills.includes(skillInput)) {
                        setProfileState({ ...profile, experience: [{ ...profile.experience[0], skills: [...profile.experience[0].skills, skillInput] }] });
                        setSkillInput('');
                      }
                    }
                  }}
                />
                <button type="button" className="px-1 py-0.5 bg-green-600 text-white rounded font-bold text-xs shadow hover:bg-green-700" onClick={() => {
                  if (skillInput && !profile.experience[0].skills.includes(skillInput)) {
                    setProfileState({ ...profile, experience: [{ ...profile.experience[0], skills: [...profile.experience[0].skills, skillInput] }] });
                    setSkillInput('');
                  }
                }}>+</button>
              </div>
              <div className="flex flex-wrap gap-1">
                {relevantSkills.filter((s: string) => !profile.experience[0].skills.includes(s)).map((skill: string) => (
                  <button type="button" key={skill} className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-[10px] font-medium hover:bg-green-100" onClick={() => setProfileState({ ...profile, experience: [{ ...profile.experience[0], skills: [...profile.experience[0].skills, skill] }] })}>{skill}</button>
                ))}
              </div>
            </div>
          </div>
        );
      }
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Degree</label>
              <select
                className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1"
                value={profile.education[0].degree}
                onChange={e => setProfileState({ ...profile, education: [{ ...profile.education[0], degree: e.target.value }] })}
                required
              >
                <option value="">Select Degree</option>
                <option value="BE/B.Tech">BE/B.Tech</option>
                <option value="ME/M.Tech">ME/M.Tech</option>
                <option value="Diploma">Diploma</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="B.Com">B.Com</option>
                <option value="M.Com">M.Com</option>
                <option value="BA">BA</option>
                <option value="MA">MA</option>
                <option value="BBA">BBA</option>
                <option value="MBA">MBA</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Institution</label>
              <input type="text" className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" placeholder="Institution" value={profile.education[0].institution} onChange={e => setProfileState({ ...profile, education: [{ ...profile.education[0], institution: e.target.value }] })} required />
              <label className="block font-semibold text-green-700 mb-1 text-xs">Batch</label>
              <select
                className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1"
                value={profile.education[0].batch}
                onChange={e => setProfileState({ ...profile, education: [{ ...profile.education[0], batch: e.target.value }] })}
                required
              >
                <option value="">Select Batch</option>
                {Array.from({ length: 30 }, (_, i) => 2025 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Medium</label>
              <select
                className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs"
                value={profile.education[0].medium}
                onChange={e => setProfileState({ ...profile, education: [{ ...profile.education[0], medium: e.target.value }] })}
                required
              >
                <option value="">Select Medium</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-xs">Skills</label>
              <input type="text" className="w-full px-2 py-1 border-2 border-green-400 rounded bg-gray-50 text-xs" placeholder="e.g. UI/UX, React, Photoshop" value={profile.skills.join(', ')} onChange={e => setProfileState({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) })} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Certifications <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <div className="flex gap-1 mb-1">
                <input type="text" className="flex-1 px-1 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs" placeholder="Add a certification" value={certInput} onChange={e => setCertInput(e.target.value)} />
                <button type="button" className="px-1 py-1 bg-green-600 text-white rounded font-bold text-xs shadow hover:bg-green-700" onClick={() => {
                  if (certInput && !profile.certifications.includes(certInput)) {
                    setProfileState({ ...profile, certifications: [...profile.certifications, certInput] });
                    setCertInput('');
                  }
                }}>+</button>
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                {profile.certifications.map((cert: string) => (
                  <span key={cert} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium flex items-center gap-1">
                    {cert}
                    <button type="button" className="ml-1 text-red-500 hover:text-red-700" onClick={() => setProfileState({ ...profile, certifications: profile.certifications.filter((c: string) => c !== cert) })}>&times;</button>
                  </span>
                ))}
              </div>
              <label className="block font-semibold text-green-700 mb-2 text-base">Upload Certificate (optional)</label>
              <input type="file" accept="application/pdf,image/*" className="w-full px-1 py-1 border-2 border-green-300 rounded bg-green-50 text-xs" onChange={e => setCertFile(e.target.files?.[0] || null)} />
              {certFile && <div className="mt-1 text-green-700 text-[10px]">Selected: {certFile.name}</div>}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-xs">Languages Known</label>
              <input type="text" className="w-full px-2 py-1 border-2 border-green-400 rounded bg-gray-50 text-xs" placeholder="e.g. English, Tamil" value={profile.languages.join(', ')} onChange={e => setProfileState({ ...profile, languages: e.target.value.split(',').map(s => s.trim()) })} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1 text-xs">Resume (PDF) <span className='text-gray-400 text-[10px]'>(optional)</span></label>
              <input type="file" accept="application/pdf" className="w-full px-1 py-1 border-2 border-green-400 rounded bg-gray-50 text-xs" onChange={e => setProfileState({ ...profile, resume: e.target.files?.[0] || null })} />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Preferred Job Title/Role</label>
              <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" value={profile.preferences.jobTitle} onChange={e => setProfileState({ ...profile, preferences: { ...profile.preferences, jobTitle: e.target.value } })} required>
                <option value="">Select Role</option>
                {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Preferred Location</label>
              <select className="w-full px-2 py-1 border-2 border-green-300 focus:border-green-500 rounded bg-green-50 text-xs mb-1" value={profile.preferences.preferredLocation} onChange={e => setProfileState({ ...profile, preferences: { ...profile.preferences, preferredLocation: e.target.value } })} required>
                <option value="">Select Location</option>
                {locationOptions.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <label className="block font-semibold text-green-700 mb-1 text-xs">Job Type</label>
              <div className="flex gap-1 flex-wrap">
                {['Full Time', 'Work from Home', 'Work from Office', 'Night Shift', 'Day Shift'].map(type => (
                  <button type="button" key={type} className={`px-2 py-1 rounded-full border font-medium text-[10px] transition-colors ${profile.preferences.jobType.includes(type) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'}`} onClick={() => setProfileState({ ...profile, preferences: { ...profile.preferences, jobType: profile.preferences.jobType.includes(type) ? profile.preferences.jobType.filter((t: string) => t !== type) : [...profile.preferences.jobType, type] } })}>{type}</button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setIsLoading(true);
      try {
        // Prepare payload for candidate profile creation
        const payload = { ...profile };
        // Remove resume file from payload for now (handle separately if needed)
        if (payload.resume) payload.resume = null;
        // API endpoint for candidate profile creation
        const CANDIDATE_API = 'http://127.0.0.1:8000/candidate/candidates/';
        // Get JWT token from localStorage if available
        const token = localStorage.getItem('access_token');
        console.log('Debug: access_token from localStorage:', token);
        if (!token) {
          alert('No access_token found in localStorage. Please login again.');
          setIsLoading(false);
          return;
        }
        const response = await fetch(CANDIDATE_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error('Invalid JSON response from API');
        }
        console.log('Candidate profile created:', data);
        dispatch(setProfile(profile));
        setIsLoading(false);
        navigate('/profile');
      } catch (err) {
        setIsLoading(false);
        console.error('Error creating candidate profile:', err);
        alert('Error creating candidate profile: ' + err);
      }
    }
  };
  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-4 md:p-6 border border-green-100">
        {onClose && (
          <button
            type="button"
            className="absolute top-2 right-2 text-green-600 hover:text-green-800 text-lg font-bold px-2 py-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        <h2 className="text-lg md:text-xl font-bold text-green-700 mb-1 text-center tracking-tight">Complete Your Profile</h2>
        <p className="text-gray-500 text-center mb-4 text-xs">Let employers know more about you. Fill in your details step by step.</p>
        <StepIndicator />
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleNext(); }}>
          {renderStep()}
          <div className="flex justify-between items-center mt-4">
            {step > 0 ? (
              <button
                type="button"
                className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 font-semibold shadow-sm hover:bg-gray-100 transition-all text-xs"
                onClick={handlePrev}
                disabled={isLoading}
              >
                Back
              </button>
            ) : <span />}
            <button
              type="submit"
              className={`px-4 py-1 rounded font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 text-xs
                ${isLoading ? 'bg-green-300 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : step === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobseekerProfileStepper;

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  // Resume
  const [resume, setResume] = React.useState<File | null>(null);
  const [resumeInput, setResumeInput] = React.useState<File | null>(null);
  // Preferences
  const [preferences, setPreferences] = React.useState(profile?.preferences || { jobTitle: '', preferredLocation: '', jobType: [] });
  const [prefForm, setPrefForm] = React.useState({ jobTitle: '', preferredLocation: '', jobType: '' });
  // Basic Details
  const [basicDetails, setBasicDetails] = React.useState({ name: profile?.name || '', email: profile?.email || '', mobile: profile?.mobile || '', gender: profile?.gender || '', dob: profile?.dob || '' });
  // Modal and local state for each section
  const [modalSection, setModalSection] = React.useState<string | null>(null);
  const [editIdx, setEditIdx] = React.useState<{ section: string, idx: number } | null>(null);
  // Experience
  const [experienceList, setExperienceList] = React.useState(profile?.experience || []);
  const [expForm, setExpForm] = React.useState<{ company: string; title: string; salary: string; duration: string; skills: string[] }>({ company: '', title: '', salary: '', duration: '', skills: [] });
  // Education
  const [educationList, setEducationList] = React.useState(profile?.education || []);
  const [eduForm, setEduForm] = React.useState({ degree: '', batch: '', institution: '', medium: '' });
  // Skills
  const [skillsList, setSkillsList] = React.useState(profile?.skills || []);
  const [skillInput, setSkillInput] = React.useState('');
  // Certifications
  const [certList, setCertList] = React.useState<{ name: string; file?: File }[]>([]);
  const [certInput, setCertInput] = React.useState('');
  const [certFileInput, setCertFileInput] = React.useState<File | null>(null);
  // Languages
  const [langList, setLangList] = React.useState(profile?.languages || []);
  const [langInput, setLangInput] = React.useState('');

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
              <button className="text-green-600 text-sm font-medium" onClick={() => { setModalSection('experience'); setExpForm({ company: '', title: '', salary: '', duration: '', skills: [] }); setSkillInput(''); }}>+ Add</button>
            </div>
            {experienceList.length > 0 ? (
              experienceList.map((exp, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-bold text-gray-800 text-base">{exp.title}</div>
                  <div className="text-sm text-gray-600">{exp.company}</div>
                  <div className="text-sm text-gray-400">{exp.duration}</div>
                  <div className="text-sm text-gray-400">₹{exp.salary} / month</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exp.skills && exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                  <button className="text-blue-600 text-xs ml-2" onClick={() => { setModalSection('experience'); setExpForm(exp); setSkillInput(''); setEditIdx({ section: 'experience', idx }); }}>Edit</button>
                  <button className="text-red-600 text-xs ml-2" onClick={() => { setExperienceList(experienceList.filter((_, i) => i !== idx)); }}>Delete</button>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No experience added</div>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Education</h3>
              <button className="text-green-600 text-sm font-medium" onClick={() => { setModalSection('education'); setEduForm({ degree: '', batch: '', institution: '', medium: '' }); }}>+ Add</button>
            </div>
            {educationList.length > 0 ? (
              educationList.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-bold text-gray-800 text-base">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.institution}</div>
                  <div className="text-sm text-gray-400">Batch of {edu.batch}</div>
                  <div className="text-sm text-gray-400">Medium: {edu.medium}</div>
                  <button className="text-blue-600 text-xs ml-2" onClick={() => { setModalSection('education'); setEduForm(edu); setEditIdx({ section: 'education', idx }); }}>Edit</button>
                  <button className="text-red-600 text-xs ml-2" onClick={() => { setEducationList(educationList.filter((_, i) => i !== idx)); }}>Delete</button>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No education added</div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Skills</h3>
              <button className="text-green-600 text-sm font-medium" onClick={() => setModalSection('skills')}>Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsList.length > 0 ? skillsList.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{skill}</span>
              )) : <span className="text-gray-400 text-sm">No skills added</span>}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Certifications</h3>
              <button className="text-green-600 text-sm font-medium" onClick={() => setModalSection('certifications')}>+ Add/Upload</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {certList.length > 0 ? certList.map((cert, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium flex items-center gap-2">
                  {cert.name}
                  {cert.file && <span className="text-xs text-gray-400">({cert.file.name})</span>}
                  <button className="text-red-600 text-xs ml-2" onClick={() => setCertList(certList.filter((_, i) => i !== idx))}>Delete</button>
                </span>
              )) : <span className="text-gray-400 text-sm">No certifications added</span>}
            </div>
          </div>

          {/* Languages Known */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Languages Known</h3>
              <button className="text-green-600 text-sm font-medium" onClick={() => setModalSection('languages')}>Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {langList.length > 0 ? langList.map((lang, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{lang}</span>
              )) : <span className="text-gray-400 text-sm">No languages added</span>}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Resume</h3>
              <button className="text-green-600 text-sm font-medium" onClick={() => setModalSection('resume')}>Upload/Edit</button>
            </div>
            {resume ? (
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">{resume.name}</span>
                <span className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</span>
                <button className="text-red-600 text-xs ml-2" onClick={() => setResume(null)}>Delete</button>
              </div>
            ) : <span className="text-gray-400 text-sm">No resume uploaded</span>}
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-green-700 tracking-tight">Preferences</h3>
              <button className="text-green-600 text-sm font-medium" onClick={() => setModalSection('preferences')}>Edit</button>
            </div>
            <div className="mb-2 text-base text-gray-700">Preferred Job Title/Role: <span className="font-medium">{preferences.jobTitle || 'Not added'}</span></div>
            <div className="mb-2 text-base text-gray-700">Preferred Location: <span className="font-medium">{preferences.preferredLocation || 'Not added'}</span></div>
            <div className="mb-2 text-base text-gray-700">Job Type: <span className="font-medium">{Array.isArray(preferences.jobType) ? preferences.jobType.join(', ') : preferences.jobType || 'Not added'}</span></div>
          </div>

          {/* Basic Details */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-50 text-base text-gray-500">
            <div>Basic details: {basicDetails.name} • <span className="text-green-700">Verify your email</span> • {basicDetails.mobile} • {basicDetails.gender} • {basicDetails.dob}</div>
            <button className="text-green-600 text-sm font-medium mt-2" onClick={() => setModalSection('basicDetails')}>Edit</button>
          </div>
        </div>
      {/* Modal for Add/Edit Section */}
      {modalSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => { setModalSection(null); setEditIdx(null); }} aria-label="Close">&times;</button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{modalSection === 'profile' ? 'Edit Profile' : `Add/Edit ${modalSection.charAt(0).toUpperCase() + modalSection.slice(1)}`}</h3>
            <form className="flex flex-col gap-4" onSubmit={e => {
              e.preventDefault();
              if (modalSection === 'experience') {
                if (editIdx && editIdx.section === 'experience') {
                  const updated = [...experienceList];
                  updated[editIdx.idx] = expForm;
                  setExperienceList(updated);
                } else {
                  setExperienceList([...experienceList, expForm]);
                }
              } else if (modalSection === 'education') {
                if (editIdx && editIdx.section === 'education') {
                  const updated = [...educationList];
                  updated[editIdx.idx] = eduForm;
                  setEducationList(updated);
                } else {
                  setEducationList([...educationList, eduForm]);
                }
              } else if (modalSection === 'skills') {
                if (skillInput.trim()) {
                  setSkillsList([...skillsList, skillInput]);
                  setSkillInput('');
                }
              } else if (modalSection === 'certifications') {
                // No-op: handled by Add button in modal
              } else if (modalSection === 'languages') {
                if (langInput.trim()) {
                  setLangList([...langList, langInput]);
                  setLangInput('');
                }
              } else if (modalSection === 'resume') {
                if (resumeInput) {
                  setResume(resumeInput);
                  setResumeInput(null);
                }
              } else if (modalSection === 'preferences') {
                setPreferences({
                  jobTitle: prefForm.jobTitle,
                  preferredLocation: prefForm.preferredLocation,
                  jobType: prefForm.jobType.split(',').map(j => j.trim()).filter(Boolean)
                });
              } else if (modalSection === 'basicDetails') {
                setBasicDetails({
                  name: basicDetails.name,
                  email: basicDetails.email,
                  mobile: basicDetails.mobile,
                  gender: basicDetails.gender,
                  dob: basicDetails.dob
                });
              }
              setModalSection(null);
              setEditIdx(null);
            }}>
              {modalSection === 'experience' ? (
                <>
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Company Name" value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Role/Designation" value={expForm.title} onChange={e => setExpForm({ ...expForm, title: e.target.value })} />
                  <input type="number" className="border rounded-lg px-4 py-2" placeholder="Salary" value={expForm.salary} onChange={e => setExpForm({ ...expForm, salary: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Duration (e.g. Jan 2022 - Dec 2023)" value={expForm.duration} onChange={e => setExpForm({ ...expForm, duration: e.target.value })} />
                  <div>
                    <label className="block mb-1 font-medium">Skills Used</label>
                    {expForm.skills && expForm.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <input type="text" className="border rounded-lg px-4 py-2" value={skill} onChange={e => {
                          const newSkills = [...expForm.skills];
                          newSkills[i] = e.target.value;
                          setExpForm({ ...expForm, skills: newSkills });
                        }} />
                        <button type="button" className="text-red-600" onClick={() => {
                          setExpForm({ ...expForm, skills: expForm.skills.filter((_, idx) => idx !== i) });
                        }}>Remove</button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mb-2">
                      <input type="text" className="border rounded-lg px-4 py-2" placeholder="Add Skill" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
                      <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => {
                        if (skillInput.trim()) {
                          setExpForm({ ...expForm, skills: [...(expForm.skills || []), skillInput] });
                          setSkillInput('');
                        }
                      }}>Add</button>
                    </div>
                  </div>
                </>
              ) : modalSection === 'education' ? (
                <>
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Degree" value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Batch" value={eduForm.batch} onChange={e => setEduForm({ ...eduForm, batch: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Institution" value={eduForm.institution} onChange={e => setEduForm({ ...eduForm, institution: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Medium" value={eduForm.medium} onChange={e => setEduForm({ ...eduForm, medium: e.target.value })} />
                </>
              ) : modalSection === 'skills' ? (
                <>
                  <label className="block mb-1 font-medium">Skills</label>
                  {skillsList.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input type="text" className="border rounded-lg px-4 py-2" value={skill} onChange={e => {
                        const newSkills = [...skillsList];
                        newSkills[i] = e.target.value;
                        setSkillsList(newSkills);
                      }} />
                      <button type="button" className="text-red-600" onClick={() => setSkillsList(skillsList.filter((_, idx) => idx !== i))}>Remove</button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mb-2">
                    <input type="text" className="border rounded-lg px-4 py-2" placeholder="Add Skill" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
                    <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => {
                      if (skillInput.trim()) {
                        setSkillsList([...skillsList, skillInput]);
                        setSkillInput('');
                      }
                    }}>Add</button>
                  </div>
                </>
              ) : modalSection === 'certifications' ? (
                <>
                  <label className="block mb-1 font-medium">Add/Upload Certification</label>
                  <div className="flex flex-col gap-2 w-full">
                    {certList.map((cert, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-2 mb-2 w-full">
                        <input type="text" className="border rounded-lg px-4 py-2 flex-1 min-w-0" value={cert.name} onChange={e => {
                          const newCerts = [...certList];
                          newCerts[i].name = e.target.value;
                          setCertList(newCerts);
                        }} />
                        {cert.file && <span className="text-xs text-gray-400 break-all">({cert.file.name})</span>}
                        <button type="button" className="text-red-600" onClick={() => setCertList(certList.filter((_, idx) => idx !== i))}>Delete</button>
                      </div>
                    ))}
                    <div className="flex flex-wrap items-center gap-2 mb-2 w-full">
                      <input type="text" className="border rounded-lg px-4 py-2 flex-1 min-w-0" placeholder="Certification Name" value={certInput} onChange={e => setCertInput(e.target.value)} />
                      <input type="file" accept=".pdf,.jpg,.png,.jpeg" className="border rounded-lg px-4 py-2" style={{ maxWidth: '180px' }} onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setCertFileInput(e.target.files[0]);
                        }
                      }} />
                      <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" style={{ whiteSpace: 'nowrap' }} onClick={() => {
                        if (certInput.trim() || certFileInput) {
                          setCertList([...certList, { name: certInput, file: certFileInput || undefined }]);
                          setCertInput('');
                          setCertFileInput(null);
                        }
                      }}>Add</button>
                    </div>
                  </div>
                </>
              ) : modalSection === 'languages' ? (
                <>
                  <label className="block mb-1 font-medium">Languages</label>
                  {langList.map((lang, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input type="text" className="border rounded-lg px-4 py-2" value={lang} onChange={e => {
                        const newLangs = [...langList];
                        newLangs[i] = e.target.value;
                        setLangList(newLangs);
                      }} />
                      <button type="button" className="text-red-600" onClick={() => setLangList(langList.filter((_, idx) => idx !== i))}>Remove</button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mb-2">
                    <input type="text" className="border rounded-lg px-4 py-2" placeholder="Add Language" value={langInput} onChange={e => setLangInput(e.target.value)} />
                    <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => {
                      if (langInput.trim()) {
                        setLangList([...langList, langInput]);
                        setLangInput('');
                      }
                    }}>Add</button>
                  </div>
                </>
              ) : modalSection === 'resume' ? (
                <>
                  <label className="block mb-1 font-medium">Upload Resume</label>
                  <input type="file" accept=".pdf,.doc,.docx" className="border rounded-lg px-4 py-2" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setResumeInput(e.target.files[0]);
                    }
                  }} />
                  {resumeInput && <div className="text-sm text-gray-600">Selected: {resumeInput.name}</div>}
                </>
              ) : modalSection === 'preferences' ? (
                <>
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Preferred Job Title/Role" value={prefForm.jobTitle} onChange={e => setPrefForm({ ...prefForm, jobTitle: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Preferred Location" value={prefForm.preferredLocation} onChange={e => setPrefForm({ ...prefForm, preferredLocation: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Job Type (comma separated)" value={prefForm.jobType} onChange={e => setPrefForm({ ...prefForm, jobType: e.target.value })} />
                </>
              ) : modalSection === 'basicDetails' ? (
                <>
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Name" value={basicDetails.name} onChange={e => setBasicDetails({ ...basicDetails, name: e.target.value })} />
                  <input type="email" className="border rounded-lg px-4 py-2" placeholder="Email" value={basicDetails.email} onChange={e => setBasicDetails({ ...basicDetails, email: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Mobile" value={basicDetails.mobile} onChange={e => setBasicDetails({ ...basicDetails, mobile: e.target.value })} />
                  <input type="text" className="border rounded-lg px-4 py-2" placeholder="Gender" value={basicDetails.gender} onChange={e => setBasicDetails({ ...basicDetails, gender: e.target.value })} />
                  <input type="date" className="border rounded-lg px-4 py-2" placeholder="Date of Birth" value={basicDetails.dob} onChange={e => setBasicDetails({ ...basicDetails, dob: e.target.value })} />
                </>
              ) : (
                <input type="text" className="border rounded-lg px-4 py-2" placeholder={`Enter details for ${modalSection}`} />
              )}
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all text-base">Save</button>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Profile;

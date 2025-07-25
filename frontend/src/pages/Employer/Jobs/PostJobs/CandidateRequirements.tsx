import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../Common/Stepper";
import PostJobHeader from "./PostJobHeader";

const educationOptions = [
  "10th or Below 10th", "12th Pass", "Diploma", "ITI", "Graduate", "Post Graduate"
];
const englishOptions = ["No English", "Basic English", "Good English"];
const experienceOptions = ["Any", "Experienced Only", "Fresher Only"];
const jobRoleOptions = [
  "Designer", "Advertising & Creative", "Corporate Communication", "Media Direction", "Media Editing", "Senior Designer", "3D Designer", "Junior Graphic Designer", "Assistant Designer", "Junior Designer", "3D Graphic Designer", "Graphic Designer"
];
const aiRecommendedRoles = [
  "Corporate Communication", "Media Direction", "Media Editing", "Senior Designer", "3D Designer", "Junior Graphic Designer", "Assistant Designer", "Junior Designer", "3D Graphic Designer", "Graphic Designer"
];
const additionalOptions = ["Industry", "Gender", "Age", "Regional Languages", "Skills"];

const CandidateRequirements: React.FC = () => {
  // For show more options
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [showMoreDegrees, setShowMoreDegrees] = useState(false);
  // State for dynamic additional requirements
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<{min: number; max: number}>({min: 18, max: 60});
  const [selectedGender, setSelectedGender] = useState<string>("Both");
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [degreeSearch, setDegreeSearch] = useState("");
  const navigate = useNavigate();
  const [selectedEducation, setSelectedEducation] = useState<string>("");
  const [selectedEnglish, setSelectedEnglish] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>(experienceOptions[0]);
  const [allowBoth, setAllowBoth] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [roleSearch, setRoleSearch] = useState("");
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [minExp, setMinExp] = useState<string>("");

  return (
    <div className="bg-gradient-to-br from-[#FFF7E0] via-[#FAFAFA] to-[#FFF7E0] min-h-screen w-full flex flex-col items-center">
      {/* Header bar - themed */}
      <PostJobHeader />
      
      <div className="w-full max-w-4xl bg-white rounded-2xl  shadow-lg p-2 sm:p-8 mt-8">
        {/* Basic Requirements Card */}
        {/* Common Stepper */}
      
        <Stepper
          steps={["Job Details", "Candidate Requirements", "Interviewer information", "Review & Post"]}
          activeStep={1}
        />
      
        <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-6 mb-8 mt-4">
          <div className="font-bold text-lg sm:text-xl text-[#253858] mb-2">Basic Requirements</div>
          <div className="text-sm text-[#42526E] mb-4">We'll use these requirement details to make your job visible to the right candidates.</div>
          <label className="block text-base font-semibold text-[#253858] mb-2">Minimum Education</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {educationOptions.map(opt => (
              <button
                key={opt}
                type="button"
                className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors duration-200 ${selectedEducation === opt ? 'bg-[#fbb040] text-white border-[#fbb040] shadow' : 'bg-white text-[#253858] border-[#fbb040]'}`}
                onClick={() => setSelectedEducation(opt)}
              >{opt}</button>
            ))}
          </div>
          <label className="block text-base font-semibold text-[#253858] mb-2">English level required</label>
          <div className="flex gap-2 mb-4">
            {englishOptions.map(opt => (
              <button key={opt} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors duration-200 ${selectedEnglish === opt ? 'bg-[#fbb040] text-white border-[#fbb040] shadow' : 'bg-white text-[#253858] border-[#fbb040]'}`} onClick={() => setSelectedEnglish(opt)}>{opt}</button>
            ))}
          </div>
          <label className="block text-base font-semibold text-[#253858] mb-2">Total experience required</label>
          <div className="flex gap-2 mb-4">
            {experienceOptions.map(opt => (
              <button key={opt} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors duration-200 ${selectedExperience === opt ? 'bg-[#fbb040] text-white border-[#fbb040] shadow' : 'bg-white text-[#253858] border-[#fbb040]'}`} onClick={() => setSelectedExperience(opt)}>{opt}</button>
            ))}
          </div>
          {selectedExperience === "Fresher Only" && (
            <div className="mb-4">
              <div className="bg-[#FFF7E0] border border-[#fbb040] rounded px-4 py-3 flex items-center gap-2 text-[#253858] text-xs">
                <svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>
                <span className="text-[#253858] text-base">Only candidates with upto 1 year of experience will be eligible to apply</span>
              </div>
            </div>
          )}
          {selectedExperience === "Experienced Only" && (
            <div className="mb-4">
              <label className="block text-base font-semibold text-[#253858] mb-2">Minimum experience <span className="text-[#fbb040]">*</span></label>
              <div className="flex gap-2 flex-wrap">
                {["6 Months", "1 Year", "2 Years", "3 Years", "5 Years", "10 Years"].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors duration-200 ${minExp === opt ? 'bg-[#fbb040] text-white border-[#fbb040] shadow' : 'bg-white text-[#253858] border-[#fbb040]'}`}
                    onClick={() => setMinExp(opt)}
                  >{opt}</button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" checked={allowBoth} onChange={e => setAllowBoth(e.target.checked)} />
            <span className="text-[#253858] text-sm">Both fresher & experienced candidates will be able to apply</span>
          </div>
        </div>
        {selectedExperience !== "Fresher Only" && (
          <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-6 mt-8 mb-6">
            <div className="font-bold text-lg text-[#253858] mb-2">Candidates from which other job title / role can apply? <span className="text-xs bg-[#FFF7E0] text-[#fbb040] px-2 py-1 rounded ml-2">New</span></div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedRoles.map(role => (
                <span key={role} className="px-3 py-1 rounded-full border text-xs font-semibold bg-[#fbb040] text-white border-[#fbb040] flex items-center gap-1">{role} <button type="button" className="ml-1 text-white" onClick={() => setSelectedRoles(selectedRoles.filter(r => r !== role))}>&times;</button></span>
              ))}
            </div>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full text-sm mb-2"
              placeholder="Search"
              value={roleSearch}
              onChange={e => setRoleSearch(e.target.value)}
            />
            {/* Show filtered jobRoleOptions below search */}
            {roleSearch.trim() && (
              <div className="flex flex-wrap gap-2 mb-2">
                {jobRoleOptions.filter(role => role.toLowerCase().includes(roleSearch.toLowerCase()) && !selectedRoles.includes(role)).map(role => (
                  <button key={role} type="button" className="px-3 py-1 rounded-full border text-xs font-semibold bg-white text-[#253858] border-[#fbb040]" onClick={() => setSelectedRoles([...selectedRoles, role])}>{role} +</button>
                ))}
                {jobRoleOptions.filter(role => role.toLowerCase().includes(roleSearch.toLowerCase()) && !selectedRoles.includes(role)).length === 0 && (
                  <span className="text-xs text-[#A0AEC0]">No roles found</span>
                )}
              </div>
            )}
            <div className="text-xs text-[#fbb040] font-semibold mb-2">90% of the recruiters choose 3+ job title / role to find the right candidates</div>
            <div className="bg-[#FFF7E0] border border-[#fbb040] rounded-lg p-3 mb-2">
              <div className="text-xs text-[#fbb040] font-semibold mb-2">Recommended by AI</div>
              <div className="flex flex-wrap gap-2">
                {aiRecommendedRoles.map(role => (
                  <button key={role} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold ${selectedRoles.includes(role) ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-white text-[#253858] border-[#fbb040]'}`} onClick={() => setSelectedRoles(selectedRoles.includes(role) ? selectedRoles.filter(r => r !== role) : [...selectedRoles, role])}>{role} +</button>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Additional Requirements Card */}
        <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-6 mb-6">
          <div className="font-bold text-lg text-[#253858] mb-2">Additional Requirements <span className="text-xs text-[#fbb040]">(Optional)</span></div>
          <div className="flex flex-wrap gap-2 mb-2">
            {additionalOptions.map(opt => (
              <button key={opt} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold ${selectedAdditional.includes(opt) ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-white text-[#253858] border-[#fbb040]'}`} onClick={() => setSelectedAdditional(selectedAdditional.includes(opt) ? selectedAdditional.filter(a => a !== opt) : [...selectedAdditional, opt])}>{opt} +</button>
            ))}
          </div>
          {/* Dynamic sections based on selection */}
          {selectedAdditional.includes("Skills") && (
            <div className="mb-6">
              <div className="font-semibold text-base text-[#253858] mb-1 flex items-center gap-2">Skills preference <span className="text-[#A0AEC0] text-xs">You can add up to 15 key skills to make your job visible to the right candidates.</span></div>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full text-sm mb-2"
                placeholder="Type to search for skills"
                value={skillSearch}
                onChange={e => setSkillSearch(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSkills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full border text-xs font-semibold bg-[#fbb040] text-white border-[#fbb040] flex items-center gap-1">{skill} <button type="button" className="ml-1 text-white" onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}>&times;</button></span>
                ))}
              </div>
              <div className="bg-[#FFF7E0] border border-[#fbb040] rounded-lg p-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Illustration", "Story Editing", "Art Direction", "Blending Options", "Motif", "Collateral Development", "Creative Management", "Layer Tool",
                    ...(showMoreSkills ? ["Typography", "Layout Design", "Branding", "Animation", "UI/UX", "Print Design", "Video Editing"] : [])
                  ]
                    .filter(skill => skill.toLowerCase().includes(skillSearch.toLowerCase()) && !selectedSkills.includes(skill))
                    .map(skill => (
                      <button key={skill} type="button" className="px-3 py-1 rounded-full border text-xs font-semibold bg-white text-[#253858] border-[#fbb040]" onClick={() => selectedSkills.length < 15 && setSelectedSkills([...selectedSkills, skill])}>{skill} +</button>
                    ))}
                </div>
                <button className="text-[#fbb040] text-xs font-semibold" type="button" onClick={() => setShowMoreSkills(v => !v)}>{showMoreSkills ? "Show Less ▲" : "Show 3 More ▼"}</button>
              </div>
            </div>
          )}
          {selectedAdditional.includes("Regional Languages") && (
            <div className="mb-6">
              <div className="font-semibold text-base text-[#253858] mb-1">Regional language required</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedLanguages.map(lang => (
                  <span key={lang} className="px-3 py-1 rounded-full border text-xs font-semibold bg-[#fbb040] text-white border-[#fbb040] flex items-center gap-1">{lang} <button type="button" className="ml-1 text-white" onClick={() => setSelectedLanguages(selectedLanguages.filter(l => l !== lang))}>&times;</button></span>
                ))}
                {["Assamese", "Bengali", "Gujarati", "Hindi", "Kannada", "Malayalam", "Marathi", "Oriya", "Punjabi", "Tamil", "Telugu"]
                  .filter(lang => !selectedLanguages.includes(lang))
                  .map(lang => (
                    <button key={lang} type="button" className="px-3 py-1 rounded-full border text-xs font-semibold bg-white text-[#253858] border-[#fbb040]" onClick={() => setSelectedLanguages([...selectedLanguages, lang])}>{lang} +</button>
                  ))}
              </div>
            </div>
          )}
          {selectedAdditional.includes("Age") && (
            <div className="mb-6">
              <div className="font-semibold text-base text-[#253858] mb-1">Age (in years)</div>
              <div className="flex gap-2 items-center mb-1">
                <input type="number" min="18" max="100" className="border rounded px-3 py-2 w-20 text-sm" placeholder="18" value={ageRange.min} onChange={e => setAgeRange({...ageRange, min: Math.max(18, Number(e.target.value))})} />
                <span className="mx-2">to</span>
                <input type="number" min="18" max="100" className="border rounded px-3 py-2 w-20 text-sm" placeholder="60" value={ageRange.max} onChange={e => setAgeRange({...ageRange, max: Math.max(ageRange.min, Number(e.target.value))})} />
              </div>
              <div className="text-xs text-[#A0AEC0]">Min. age must be above 18</div>
            </div>
          )}
          {selectedAdditional.includes("Gender") && (
            <div className="mb-6">
              <div className="font-semibold text-base text-[#253858] mb-1">Gender</div>
              <div className="flex gap-2 mb-2">
                {["Both", "Male", "Female"].map(gender => (
                  <button key={gender} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold ${selectedGender === gender ? 'bg-[#fbb040] text-white border-[#fbb040]' : 'bg-white text-[#253858] border-[#fbb040]'}`} onClick={() => setSelectedGender(gender)}>{gender}</button>
                ))}
              </div>
            </div>
          )}
          {selectedAdditional.includes("Industry") && (
            <div className="mb-6">
              <div className="font-semibold text-base text-[#253858] mb-1">Degree / specialization</div>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full text-sm mb-2"
                placeholder="E.g. B.Tech / B.E"
                value={degreeSearch}
                onChange={e => setDegreeSearch(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedDegrees.map(degree => (
                  <span key={degree} className="px-3 py-1 rounded-full border text-xs font-semibold bg-[#fbb040] text-white border-[#fbb040] flex items-center gap-1">{degree} <button type="button" className="ml-1 text-white" onClick={() => setSelectedDegrees(selectedDegrees.filter(d => d !== degree))}>&times;</button></span>
                ))}
              </div>
              <div className="text-xs text-[#A0AEC0] mb-2">You can select upto 10 degrees.</div>
              <div className="bg-[#FFF7E0] border border-[#fbb040] rounded-lg p-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {["M.A: Multimedia", "M.A (Hons.): Multimedia", "MBA: Advertising", "MBA: Advertising And Public Relations",
                    ...(showMoreDegrees ? ["B.Sc: Animation", "B.Des: Graphic Design", "BFA: Applied Arts", "PGDM: Digital Marketing", "MFA: Visual Communication"] : [])
                  ]
                    .filter(degree => degree.toLowerCase().includes(degreeSearch.toLowerCase()) && !selectedDegrees.includes(degree))
                    .map(degree => (
                      <button key={degree} type="button" className="px-3 py-1 rounded-full border text-xs font-semibold bg-white text-[#253858] border-[#fbb040]" onClick={() => selectedDegrees.length < 10 && setSelectedDegrees([...selectedDegrees, degree])}>{degree} +</button>
                    ))}
                </div>
                <button className="text-[#fbb040] text-xs font-semibold" type="button" onClick={() => setShowMoreDegrees(v => !v)}>{showMoreDegrees ? "Show Less ▲" : "Show More ▼"}</button>
              </div>
            </div>
          )}
        </div>
        {/* Job Description Card */}
        <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-6 mb-6">
          <div className="font-bold text-lg text-[#253858] mb-2">Job Description</div>
          <div className="border rounded mb-2 p-2 bg-white">
            <textarea
              className="w-full h-24 border-none outline-none resize-none text-sm text-[#253858]"
              placeholder="Enter the job description, including the main responsibility and tasks..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            className="bg-[#FFF7E0] hover:bg-[#fbb040] text-[#253858] font-semibold rounded-lg px-8 py-2 border border-[#fbb040] transition-colors duration-200 w-full sm:w-auto"
            type="button"
            onClick={() => navigate("/Employer/NewJobPost")}
          >Back</button>
          <button
            className="bg-[#fbb040] hover:bg-[#e6a900] text-white font-semibold rounded-lg px-8 py-2 border border-[#fbb040] shadow transition-colors duration-200 w-full sm:w-auto"
            type="button"
            onClick={() => navigate("/Employer/InterviewerInformation")}
          >Continue</button>
        </div>
      </div>
  </div>
  );
}

export default CandidateRequirements;

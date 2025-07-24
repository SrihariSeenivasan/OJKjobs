import React from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../Common/Stepper";
import PostJobHeader from "./PostJobHeader";

const JobPostPreview: React.FC = () => {
  const navigate = useNavigate();
  // Dummy data for preview, replace with actual state/props as needed
  const jobDetails = {
    companyName: "Bot Digital Solutions Private Limited",
    jobTitle: "Designer",
    jobCategory: "Advertising / Communication",
    jobType: "Full Time | Day shift",
    workType: "Work from home",
    jobCity: "All Areas in Chennai Region",
    salary: "₹ 2,000 - ₹ 4,200 per month (Fixed + incentives)",
    additionalPerks: "Weekly Payout, Annual Bonus, PF, Laptop",
    joiningFee: "₹ 1000"
  };
  const candidateReq = {
    education: "Graduate",
    experience: "Fresher Only",
    english: "No English Required",
    age: "18 - 60 yrs",
    gender: "Both genders allowed",
    skills: "None",
    degree: "No input selected",
    jobDesc: "None"
  };
  const interviewInfo = {
    commPref: "Myself",
    walkIn: "No"
  };

  // Dropdown state for each section
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  // Section configs for summary and details
  const sections = [
    {
      key: "jobDetails",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#EAF3FF"/><path d="M10 24V12a2 2 0 012-2h8a2 2 0 012 2v12" stroke="#2563EB" strokeWidth="2"/><rect x="12" y="16" width="8" height="4" rx="1" fill="#2563EB"/></svg>
      ),
      title: "Job Details",
      summary: (
        <span>
          Job Title: <span className="font-semibold">{jobDetails.jobTitle}</span> | Department: <span className="font-semibold">Advertising / Communication</span> | Work Type: <span className="font-semibold">{jobDetails.workType}</span>
        </span>
      ),
      details: (
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
          <div>Company name</div><div className="font-semibold text-[#253858]">{jobDetails.companyName}</div>
          <div>Job title</div><div className="font-semibold text-[#253858]">{jobDetails.jobTitle}</div>
          <div>Job category</div><div className="font-semibold text-[#253858]">{jobDetails.jobCategory}</div>
          <div>Job type</div><div className="font-semibold text-[#253858]">{jobDetails.jobType}</div>
          <div>Work type</div><div className="font-semibold text-[#253858]">{jobDetails.workType}</div>
          <div>Job City</div><div className="font-semibold text-[#253858]">{jobDetails.jobCity}</div>
          <div>Monthly Salary / Pay Type</div><div className="font-semibold text-[#253858]">{jobDetails.salary}</div>
          <div>Additional perks</div><div className="font-semibold text-[#253858]">{jobDetails.additionalPerks}</div>
          <div>Joining Fee</div><div className="font-semibold text-[#253858]">{jobDetails.joiningFee}</div>
        </div>
      ),
      edit: () => navigate("/Employer/NewJobPost"),
      viewMore: "View 6 more"
    },
    {
      key: "candidateReq",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#EAF3FF"/><path d="M16 10v12M10 16h12" stroke="#2563EB" strokeWidth="2"/></svg>
      ),
      title: "Candidate Requirements",
      summary: (
        <span>
          Education: <span className="font-semibold">{candidateReq.education}</span> | Experience: <span className="font-semibold">{candidateReq.experience}</span> | English: <span className="font-semibold">{candidateReq.english}</span>
        </span>
      ),
      details: (
        <>
          <div className="bg-[#EAF3FF] rounded p-3 mb-2 text-xs text-[#253858]">Eligible requirements<br/>Your job will only be visible to the candidates who meet these requirements.</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-4">
            <div>Minimum Education</div><div className="font-semibold text-[#253858]">{candidateReq.education}</div>
            <div>Experience Required</div><div className="font-semibold text-[#253858]">{candidateReq.experience}</div>
            <div>English</div><div className="font-semibold text-[#253858]">{candidateReq.english}</div>
          </div>
          <div className="bg-[#EAF3FF] rounded p-3 mb-2 text-xs text-[#253858]">Preferred requirements<br/>Your job will be promoted to the candidates meeting below requirements, but others can still apply.</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>Age</div><div className="font-semibold text-[#253858]">{candidateReq.age}</div>
            <div>Gender</div><div className="font-semibold text-[#253858]">{candidateReq.gender}</div>
            <div>Candidate job titles & roles</div><div className="font-semibold text-[#253858]">{candidateReq.skills}</div>
            <div>Degree / Specialization</div><div className="font-semibold text-[#253858]">{candidateReq.degree}</div>
            <div>Job Description</div><div className="font-semibold text-[#253858]">{candidateReq.jobDesc}</div>
          </div>
        </>
      ),
      edit: () => navigate("/Employer/CandidateRequirements"),
      viewMore: "View 4 more"
    },
    {
      key: "interviewInfo",
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#EAF3FF"/><path d="M10 22v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#2563EB" strokeWidth="2"/><circle cx="16" cy="12" r="4" stroke="#2563EB" strokeWidth="2"/></svg>
      ),
      title: "Interview Information",
      summary: (
        <span>
          Communication Preference: <span className="font-semibold">{interviewInfo.commPref}</span> | Is this walk-in interview? <span className="font-semibold">{interviewInfo.walkIn}</span>
        </span>
      ),
      details: (
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
          <div>Communication Preference</div><div className="font-semibold text-[#253858]">{interviewInfo.commPref}</div>
          <div>Is this walk-in interview?</div><div className="font-semibold text-[#253858]">{interviewInfo.walkIn}</div>
        </div>
      ),
      edit: () => navigate("/Employer/InterviewerInformation"),
      viewMore: "View 2 more"
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen w-full flex flex-col items-center">
        {/* Header bar */}
              <PostJobHeader/>
      {/* Stepper at top */}
       <div className="w-full max-w-4xl bg-white  rounded-3xl border-2 shadow-xl p-4 sm:p-10 mt-8 mb-8">
        <Stepper
          steps={["Job Details", "Candidate Requirements", "Interviewer information", "Review & Post", "Job Preview"]}
          activeStep={3}
        />
      
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border  border-[#E5E7EB] shadow-sm p-4 mt-4">
        {sections.map((section, idx) => {
          const isOpen = openSection === section.key;
          return (
            <div key={section.key} className={`border-b ${idx === sections.length-1 ? "border-b-0" : "border-[#E5E7EB]"}`}>
              <div className="flex items-center justify-between py-6 cursor-pointer" onClick={() => setOpenSection(isOpen ? null : section.key)}>
                <div className="flex items-center gap-4">
                  {section.icon}
                  <div>
                    <div className="font-bold text-lg text-[#253858] mb-1">{section.title}</div>
                    <div className="text-sm text-[#253858]">{section.summary}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-white border border-[#fbb040] text-[#253858] font-semibold rounded-lg px-6 py-2 transition-colors duration-200 hover:bg-[#FFF7E0]"
                    onClick={e => {e.stopPropagation(); section.edit();}}
                  >Back</button>
                  <button
                    className="bg-[#fbb040] text-white font-semibold rounded-lg px-6 py-2 transition-colors duration-200 hover:bg-[#e6a900]"
                    onClick={e => {e.stopPropagation(); section.edit();}}
                  >Continue</button>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className={isOpen ? "rotate-180 transition-transform" : "transition-transform"}><path d="M7 8l3 3 3-3" stroke="#253858" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              {isOpen && (
                <div className="pl-16 pb-6 animate-fade-in">
                  {section.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    {/* Navigation buttons at bottom, styled like CandidateRequirements */}
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 w-full max-w-4xl mx-auto">
      <button
        className="bg-[#FFF7E0] hover:bg-[#fbb040] text-[#253858] font-semibold rounded-lg px-8 py-2 border border-[#fbb040] transition-colors duration-200 w-full sm:w-auto"
        type="button"
        onClick={() => navigate("/Employer/InterviewerInformation")}
      >Back</button>
      <button
        className="bg-[#fbb040] hover:bg-[#e6a900] text-white font-semibold rounded-lg px-8 py-2 border border-[#fbb040] shadow transition-colors duration-200 w-full sm:w-auto"
        type="button"
        onClick={() => navigate("/Employer/PublishJob")}
      >Continue</button>
    </div>
    </div>
    </div>

  );
};

export default JobPostPreview;

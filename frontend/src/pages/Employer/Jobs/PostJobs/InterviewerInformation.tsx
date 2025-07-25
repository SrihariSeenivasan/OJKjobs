import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../Common/Stepper";
import PostJobHeader from "./PostJobHeader";

const walkInTimings = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
];

const InterviewerInformation: React.FC = () => {
  const navigate = useNavigate();
  const [isWalkIn, setIsWalkIn] = useState(true);
  const [address, setAddress] = useState("");
  const [floorInfo, setFloorInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(walkInTimings[0]);
  const [endTime, setEndTime] = useState(walkInTimings[12]);
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [commPref, setCommPref] = useState("myself");
  const [notifPref, setNotifPref] = useState("myself");
  const [showMore, setShowMore] = useState(false);
  const [candidateFilter, setCandidateFilter] = useState('all');
  const [showWalkInModal, setShowWalkInModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#FFF7E0] via-[#FAFAFA] to-[#FFF7E0] min-h-screen w-full flex flex-col items-center">
      <PostJobHeader />
     
      

      {/* Single Card Container for all sections */}
      <div className="w-full max-w-4xl bg-white  rounded-3xl border-2 shadow-xl p-4 sm:p-10 mt-8 mb-8">
        {/* Common Stepper */}
        <Stepper
          steps={["Job Details", "Candidate Requirements", "Interviewer information", "Review & Post"]}
          activeStep={2}
        />

        {/* Interview method and address card */}
        <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-8 mb-8 mt-4">
          <div className="font-bold text-lg sm:text-xl mb-6 text-[#253858]">Interview method and address</div>
          <div className="mb-8">
          <div className="font-semibold mb-2 text-[#253858]">Is this a walk-in interview? <span className="ml-2 px-2 py-1 bg-[#E6F0FF] text-[#2563EB] rounded text-xs font-semibold">New</span> <button className="text-[#2563EB] text-xs underline font-semibold" type="button" onClick={()=>setShowMore(v=>!v)}>Know More</button></div>
          <div className="flex gap-8 mb-2">
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={isWalkIn} onChange={()=>setIsWalkIn(true)} /> Yes
            </label>
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={!isWalkIn} onChange={()=>setIsWalkIn(false)} /> No
            </label>
          </div>
          {showMore && (
            <div className="bg-[#E6F0FF] border border-[#2563EB] rounded p-3 text-xs text-[#2563EB] mb-2 font-medium">Walk-in interviews allow candidates to directly visit the interview location during the specified time window. You can specify address, date, time, and instructions for candidates.</div>
          )}
        </div>
        {isWalkIn ? (
          <div className="mb-8">
            <div className="font-semibold mb-2 text-[#253858]">Walk-in Interview address <span className="text-red-500">*</span></div>
            <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full mb-2 text-sm" placeholder="Search for your address/locality" value={address} onChange={e=>setAddress(e.target.value)} />
            <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full mb-2 text-sm" placeholder="+ Add Floor / Plot no. / Shop no. (optional)" value={floorInfo} onChange={e=>setFloorInfo(e.target.value)} />
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <div className="font-semibold mb-1 text-[#253858]">Walk-in Start date <span className="text-red-500">*</span></div>
                <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" placeholder="dd/mm/yyyy" value={startDate} onChange={e=>setStartDate(e.target.value)} />
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1 text-[#253858]">Walk-in End Date <span className="text-red-500">*</span></div>
                <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" placeholder="dd/mm/yyyy" value={endDate} onChange={e=>setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <div className="font-semibold mb-1 text-[#253858]">Walk-in timings <span className="text-red-500">*</span></div>
                <div className="relative">
                  <button
                    type="button"
                    className="border border-[#fbb040] rounded px-3 py-2 w-full text-sm bg-white flex justify-between items-center focus:outline-none focus:bg-[#FFF7E0]"
                    onClick={() => setShowStartTimeDropdown(v => !v)}
                  >
                    {startTime}
                    <span className="ml-2">
                      <svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </button>
                  {showStartTimeDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-[#FFF7E0] border border-[#fbb040] rounded-xl shadow-lg z-10 max-h-48 overflow-auto p-2" style={{ boxShadow: '0 2px 8px rgba(251,176,64,0.12)' }}>
                      {walkInTimings.map(t => (
                        <div
                          key={t}
                          className={`px-3 py-2 cursor-pointer rounded-lg hover:bg-[#fbb040] hover:text-white text-[#253858] text-sm border border-transparent hover:border-[#fbb040] ${startTime === t ? 'bg-[#fbb040] text-white' : ''}`}
                          onMouseDown={() => {
                            setStartTime(t);
                            setShowStartTimeDropdown(false);
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1 text-[#253858]">to</div>
                <div className="relative">
                  <button
                    type="button"
                    className="border border-[#fbb040] rounded px-3 py-2 w-full text-sm bg-white flex justify-between items-center focus:outline-none focus:bg-[#FFF7E0]"
                    onClick={() => setShowEndTimeDropdown(v => !v)}
                  >
                    {endTime}
                    <span className="ml-2">
                      <svg width="18" height="18" fill="none" stroke="#fbb040" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </button>
                  {showEndTimeDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-[#FFF7E0] border border-[#fbb040] rounded-xl shadow-lg z-10 max-h-48 overflow-auto p-2" style={{ boxShadow: '0 2px 8px rgba(251,176,64,0.12)' }}>
                      {walkInTimings.map(t => (
                        <div
                          key={t}
                          className={`px-3 py-2 cursor-pointer rounded-lg hover:bg-[#fbb040] hover:text-white text-[#253858] text-sm border border-transparent hover:border-[#fbb040] ${endTime === t ? 'bg-[#fbb040] text-white' : ''}`}
                          onMouseDown={() => {
                            setEndTime(t);
                            setShowEndTimeDropdown(false);
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="font-semibold mb-1 text-[#253858]">Other Instructions</div>
            <textarea className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" maxLength={300} rows={3} placeholder="e.g. Bring ID card, CV / Resume etc." value={instructions} onChange={e=>setInstructions(e.target.value)} />
            <div className="text-xs text-[#A0AEC0] text-right">{instructions.length}/300</div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="font-semibold mb-2 text-[#253858]">Company address <span className="text-red-500">*</span></div>
            <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full mb-2 text-sm" placeholder="Enter company address" value={address} onChange={e=>setAddress(e.target.value)} />
          </div>
        )}
 </div>
        {/* Communication Preferences card */}
        <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-8 mb-8">
          <div className="font-bold text-lg mb-6 mt-2 text-[#253858]">Communication Preferences</div>
          <div className="mb-8">
          <div className="font-semibold mb-2 text-[#253858]">Do you want candidates to contact you via Call / Whatsapp after they apply? <span className="text-red-500">*</span></div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={commPref === "myself"} onChange={()=>setCommPref("myself")} disabled={isWalkIn} /> Yes, to myself
            </label>
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={commPref === "other"} onChange={()=>setCommPref("other")} disabled={isWalkIn} /> Yes, to other recruiter
            </label>
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={commPref === "no"} onChange={()=>setCommPref("no")} disabled={isWalkIn} /> No, I will contact candidates first
            </label>
          </div>
          {commPref === "other" && !isWalkIn && (
            <div className="mb-4">
              <div className="font-semibold text-base text-[#253858] mb-2">Fill other recruiter details</div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-[#253858] mb-1">Recruiter's Name <span className="text-red-500">*</span></label>
                <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" placeholder="Enter Full Name" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-[#253858] mb-1">Recruiter's Whatsapp No. <span className="text-red-500">*</span></label>
                <input type="text" className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" placeholder="Enter Number" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-[#253858] mb-1">Recruiter's Email ID <span className="text-red-500">*</span></label>
                <input type="email" className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" placeholder="Enter Email" />
              </div>
            </div>
          )}
          {commPref === "myself" && !isWalkIn && (
            <div className="mb-4">
              <div className="font-semibold text-base text-[#253858] mb-2">Which candidates should be able to contact you ? <span className="bg-[#E6F0FF] text-[#2563EB] px-2 py-1 rounded text-xs font-semibold ml-1">New</span></div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-[#253858] font-medium">
                  <input type="radio" name="candidateFilter" checked={candidateFilter === 'all'} onChange={()=>setCandidateFilter('all')} /> All candidates
                </label>
                <label className="flex items-center gap-2 text-[#253858] font-medium">
                  <input type="radio" name="candidateFilter" checked={candidateFilter === 'matched'} onChange={()=>setCandidateFilter('matched')} /> Only matched candidates (~30% of all candidates)
                </label>
              </div>
              {candidateFilter === 'matched' && (
                <div className="bg-[#F3F4FD] border border-[#C7D2FE] rounded p-3 mt-2 text-xs text-[#4F46E5] font-medium flex items-center justify-between">
                  <span>✦ Matched candidates meet your key requirements such as education, work experience, skills, location, age and language</span>
                  <button type="button" className="text-[#2563EB] underline ml-2 text-xs font-semibold" onClick={()=>setShowWalkInModal(true)}>Know more</button>
                </div>
              )}
            </div>
          )}
          {isWalkIn && commPref === "no" && (
            <div className="bg-[#F6F7FB] border border-[#A0AEC0] rounded p-2 text-xs text-[#253858] font-medium w-fit mt-2">This option is not available for walk-in interview</div>
          )}
        </div>
         </div>
        {/* WalkInInterview Popup Modal */}
        {showWalkInModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button className="absolute top-3 right-3 text-[#253858] text-xl font-bold" onClick={()=>setShowWalkInModal(false)}>&times;</button>
              <div className="flex flex-col items-center mb-4">
                <div className="w-64 h-16 bg-[#F3F4F6] rounded-lg flex items-center justify-center mb-2">
                  <span className="text-[#253858] font-semibold text-base">★ Walk-in interview</span>
                </div>
              </div>
              <div className="font-bold text-lg text-[#253858] mb-3">Important note for Walk-in Interview jobs :</div>
              <ol className="list-decimal pl-5 text-sm text-[#253858] mb-4">
                <li>Remember to call candidates for better results.</li>
                <li>Jobs with walk-in interviews will be marked with a “Walk-in” tag.</li>
                <li>Selecting walk-in doesn’t ensure more applications. It’s just an option for you to share walk-in interview details with candidates.</li>
                <li>The “Walk-in” tag will be removed after the event, but candidates can still apply (until the job expires).</li>
              </ol>
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" checked readOnly className="accent-[#2563EB]" />
                <span className="text-xs text-[#253858]">By choosing this, you adhere to OJK <a href="#" className="text-[#2563EB] underline">Terms of Service</a> and <a href="#" className="text-[#2563EB] underline">Code of Conduct</a></span>
              </div>
              <button className="w-full bg-[#198754] text-white font-semibold py-2 rounded" type="button" onClick={()=>setShowWalkInModal(false)}>Okay, got it</button>
            </div>
          </div>
        )}

        {/* Notification Preferences card */}
        <div className="bg-white rounded-xl border border-[#fbb040] shadow p-4 sm:p-8 mb-8">
          <div className="font-bold text-lg mb-6 mt-2 text-[#253858]">Notification Preferences</div>
          <div className="mb-8">
          <div className="font-semibold mb-2 text-[#253858]">
            {candidateFilter === 'all'
              ? 'Every time you receive a candidate application, do you want'
              : 'Every time you receive a matched candidate application, do you want'}
            <span className="inline-flex items-center"><span className="bg-[#E6F4EA] text-[#1A7F37] px-2 py-1 rounded text-xs font-semibold mr-1">WhatsApp</span> Alerts from OJK jobs?</span> <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={notifPref === "myself"} onChange={()=>setNotifPref("myself")} /> Yes, to myself
            </label>
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={notifPref === "summary"} onChange={()=>setNotifPref("summary")} /> No, send me summary once a day
            </label>
          </div>
        </div>
        
      </div>
      {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 border-t pt-6">
          <button className="px-6 py-2 rounded-lg bg-[#FFF7E0] text-[#253858] font-semibold border border-[#fbb040] hover:bg-[#fbb040] hover:text-white transition-colors duration-200 w-full sm:w-auto" type="button" onClick={()=>navigate(-1)}>Back</button>
          <button className="px-6 py-2 rounded-lg bg-[#fbb040] text-white font-semibold border border-[#fbb040] shadow hover:bg-[#e6a900] transition-colors duration-200 w-full sm:w-auto" type="button" onClick={()=>navigate("/Employer/JobPostPreview")}>Continue</button>
        </div>
    </div>
     </div>
     
  );
}

export default InterviewerInformation;

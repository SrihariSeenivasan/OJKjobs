import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [instructions, setInstructions] = useState("");
  const [commPref, setCommPref] = useState("myself");
  const [notifPref, setNotifPref] = useState("myself");
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-[#FAFAFA] min-h-screen w-full flex flex-col items-center">
        <PostJobHeader />
      {/* Stepper */}
      <div className="w-full flex items-center justify-center py-6 bg-white border-b">
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
            <span className="text-xs mt-1">Job Details</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
            <span className="text-xs mt-1">Candidate Requirements</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#2D2346] flex items-center justify-center text-white font-bold">●</div>
            <span className="text-xs mt-1 font-semibold text-[#2D2346]">Interviewer information</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">4</div>
            <span className="text-xs mt-1 text-gray-400">Review & Post</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded border border-[#E5E7EB] shadow-sm p-8 mt-8">
        <div className="font-bold text-lg mb-6">Interview method and address</div>
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
        {isWalkIn && (
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
                <select className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" value={startTime} onChange={e=>setStartTime(e.target.value)}>
                  {walkInTimings.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1 text-[#253858]">to</div>
                <select className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" value={endTime} onChange={e=>setEndTime(e.target.value)}>
                  {walkInTimings.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="font-semibold mb-1 text-[#253858]">Other Instructions</div>
            <textarea className="border border-[#A0AEC0] rounded px-3 py-2 w-full text-sm" maxLength={300} rows={3} placeholder="e.g. Bring ID card, CV / Resume etc." value={instructions} onChange={e=>setInstructions(e.target.value)} />
            <div className="text-xs text-[#A0AEC0] text-right">{instructions.length}/300</div>
          </div>
        )}

        {/* Communication Preferences */}
        <div className="font-bold text-lg mb-6 mt-10">Communication Preferences</div>
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
          {isWalkIn && (
            <div className="bg-[#F6F7FB] border border-[#A0AEC0] rounded p-2 text-xs text-[#253858] font-medium w-fit mt-2">This option is not available for walk-in interview</div>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="font-bold text-lg mb-6 mt-10">Notification Preferences</div>
        <div className="mb-8">
          <div className="font-semibold mb-2 text-[#253858]">Every time you receive a candidate application, do you want <span className="inline-flex items-center"><span className="bg-[#E6F4EA] text-[#1A7F37] px-2 py-1 rounded text-xs font-semibold mr-1">WhatsApp</span> Alerts from Apna?</span> <span className="text-red-500">*</span></div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={notifPref === "myself"} onChange={()=>setNotifPref("myself")} /> Yes, to myself
            </label>
            <label className="flex items-center gap-2 text-[#253858] font-medium">
              <input type="radio" checked={notifPref === "summary"} onChange={()=>setNotifPref("summary")} /> No, send me summary once a day
            </label>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 border-t pt-6">
          <button className="px-6 py-2 rounded bg-white text-[#253858] font-semibold border border-[#A0AEC0]" type="button" onClick={()=>navigate(-1)}>Back</button>
          <button className="px-6 py-2 rounded bg-[#198754] text-white font-semibold" type="button" onClick={()=>navigate("../ReviewAndPost")}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default InterviewerInformation;

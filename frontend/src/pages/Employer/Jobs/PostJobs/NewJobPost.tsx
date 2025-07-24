import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostJobHeader from "./PostJobHeader";

const jobTypes = ["Full Time", "Part Time", "Both (Full-Time And Part-Time)"];
const locationTypes = ["Work From Office", "Work From Home", "Field Job"];
const payTypes = ["Fixed Only", "Fixed + Incentive", "Incentive Only"];
const perks = [
  "Flexible Working Hours", "Weekly Payout", "Overtime Pay", "Joining Bonus", "Annual Bonus", "PF", "Travel Allowance (TA)",
  "Petrol Allowance", "Mobile Allowance", "Internet Allowance", "Laptop", "Health Insurance", "ESI (ESIC)", "Food/Meals",
  "Accommodation", "5 Working Days", "One-Way Cab", "Two-Way Cab"
];

const NewJobPost: React.FC = () => {
  const navigate = useNavigate();
  const [showJobRoleInfo, setShowJobRoleInfo] = useState(false);
  const [showCityInfo, setShowCityInfo] = useState(false);
  // Job Role/Category typeahead state
  const [jobRole, setJobRole] = useState("");
  const [jobRoleFocused, setJobRoleFocused] = useState(false);
  const [showJobRoleDropdown, setShowJobRoleDropdown] = useState(false);
  const jobRoleOptions = [
    "Designer", "Developer", "Accountant", "Sales Executive", "Marketing", "HR", "Support", "Manager", "Analyst", "Consultant", "Other"
  ];
  const [showCompanyReasonModal, setShowCompanyReasonModal] = useState(false);
  const [companyChangeReason, setCompanyChangeReason] = useState("");
  const companyChangeReasons = [
    "I changed my company",
    "I belong to a consultancy & want to post for my client's company",
    "I want to post for another company/business/consultancy of my own"
  ];
  const [minFixedSalary, setMinFixedSalary] = useState("");
  const [maxFixedSalary, setMaxFixedSalary] = useState("");
  const [avgIncentive, setAvgIncentive] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [officeFloor, setOfficeFloor] = useState("");
  const [fieldArea, setFieldArea] = useState("");
  const [fieldAreaFocused, setFieldAreaFocused] = useState(false);
  const [jobCity, setJobCity] = useState("");
  const cityOptions = ["Bangalore", "Chennai", "Delhi", "Hyderabad", "Mumbai", "Pune", "Other"];
  // Fee details state
  const [feeAmount, setFeeAmount] = useState("");
  const feeReasons = [
    "Asset/ Inventory Charge",
    "Security Deposit( Refundable)",
    "Registration/ Training Fees",
    "Commission",
    "IRDA Exam",
    "Other Reason"
  ];
  const [selectedFeeReason, setSelectedFeeReason] = useState(feeReasons[0]);
  const assetOptions = ["Bag", "Laptop", "Mobile", "SIM Card", "Uniform", "Other"];
  const [selectedAsset, setSelectedAsset] = useState("");
  const [otherReasonText, setOtherReasonText] = useState("");
  const [feePaidWhen, setFeePaidWhen] = useState("");
  const feePaidOptions = ["Before The Interview", "After Job Confirmation", "Deducted From Salary"];
  const [companyName] = useState("Bot Digital Solutions Private Limited");
  const [jobTitle, setJobTitle] = useState("");
  const [selectedJobType, setSelectedJobType] = useState(jobTypes[0]);
  const [nightShift, setNightShift] = useState(false);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([locationTypes[0]]);
  const [selectedPayType, setSelectedPayType] = useState(payTypes[0]);
  const [selectedPerks, setSelectedPerks] = useState<string[]>([]);
  const [otherPerks, setOtherPerks] = useState("");
  const [joiningFee, setJoiningFee] = useState("No");
  const [showOtherPerksInput, setShowOtherPerksInput] = useState(false);

  return (
    <div className="bg-[#F7F7F7] min-h-screen w-full flex flex-col items-center">
      {/* Header bar */}
      <PostJobHeader/>
      {/* Stepper and Use Templates button */}
      <div className="w-full flex items-center justify-between px-8 pt-6 pb-2 bg-[#F7F7F7]">
        <span className="font-bold text-xl text-[#253858]">Post a new job</span>
        <button className="flex items-center gap-2 border px-3 py-1 rounded text-sm text-[#253858] font-medium" aria-label="Use Templates">
          <svg width="18" height="18" fill="none" stroke="#253858" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h8"/></svg>
          Use Templates
        </button>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm mt-2 mb-8 px-8 pt-6 pb-4">
        {/* Stepper */}
        <div className="flex items-center justify-between w-full mb-6">
          {[1,2,3,4,5].map((step) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`rounded-full flex items-center justify-center font-semibold ${step === 1 ? 'bg-[#2D2346] text-white' : 'bg-[#A0AEC0] text-white'} w-7 h-7 text-sm`}>{step}</div>
                <span className={`text-xs mt-2 ${step === 1 ? 'text-[#2D2346] font-semibold' : 'text-[#42526E]'}`}>{step === 1 ? 'Job details' : ''}</span>
              </div>
              {step < 5 && <div className="flex-1 h-px bg-[#A0AEC0] mx-2" />}
            </React.Fragment>
          ))}
        </div>

        {/* Job details section */}
        <div className="mb-6">
          <div className="text-xs text-[#F97316] font-semibold mb-1">Job details<br /><span className="text-[#B91C1C]">*Marked fields are mandatory</span></div>
          <label className="block text-sm font-medium text-[#253858] mb-1">Company you belong to <span className="font-bold">{companyName}</span></label>
          <div className="flex items-center gap-2 mb-3">
            <input type="text" className="border rounded px-3 py-2 w-full text-sm" value={companyName} readOnly />
            <div className="relative">
              <button className="text-[#12B981] text-base font-semibold px-4 py-2 border rounded bg-white" type="button" onClick={() => setShowCompanyReasonModal(true)}>Change</button>
              {showCompanyReasonModal && (
                <div className="absolute right-0 top-full mt-2 z-50 w-[400px] bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-lg text-[#253858]">Reason to change the company name</span>
                    <button className="text-[#253858] text-xl font-bold" type="button" aria-label="Close" onClick={() => setShowCompanyReasonModal(false)}>&times;</button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {companyChangeReasons.map(reason => (
                      <label key={reason} className="flex items-center gap-3 border rounded-lg px-3 py-3 cursor-pointer hover:border-[#2563EB]">
                        <input
                          type="radio"
                          name="companyChangeReason"
                          value={reason}
                          checked={companyChangeReason === reason}
                          onChange={() => setCompanyChangeReason(reason)}
                          className="w-5 h-5 accent-[#2563EB]"
                        />
                        <span className="text-[#253858] text-base">{reason}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="bg-[#2563EB] text-white font-semibold rounded px-6 py-2 disabled:opacity-50"
                      type="button"
                      disabled={!companyChangeReason}
                      onClick={() => {
                        setShowCompanyReasonModal(false);
                        // You can add logic here to show company name input if needed
                      }}
                    >Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <label className="block text-sm font-medium text-[#253858] mb-1">Job title / Designation <span className="text-[#B91C1C]">*</span></label>
          <input type="text" className="border rounded px-3 py-2 w-full text-sm mb-3" placeholder="e.g. Accountant" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
          {/* Show Job Role/Category only after jobTitle is entered */}
          {jobTitle.trim() && (
            <>
              <label className="block text-sm font-medium text-[#253858] mb-1 mt-2 flex items-center gap-1">
                Job Role/ Category <span className="text-[#B91C1C]">*</span>
                <span
                  className="relative inline-block align-middle cursor-pointer"
                  onMouseEnter={() => setShowJobRoleInfo(true)}
                  onMouseLeave={() => setShowJobRoleInfo(false)}
                >
                  <svg width="16" height="16" fill="none" stroke="#253858" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>
                  {showJobRoleInfo && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-[#0A1733] text-white text-xs rounded shadow-lg px-4 py-2 z-50 w-64" style={{whiteSpace:'pre-line'}}>
                      Job role/ category defines the responsibilities and nature of work this job involves
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3" style={{marginTop:'-6px'}}>
                        <svg width="12" height="12"><polygon points="6,0 12,12 0,12" fill="#0A1733"/></svg>
                      </span>
                    </div>
                  )}
                </span>
              </label>
              <div className="relative mb-3">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full text-sm focus:border-[#2563EB]"
                  placeholder="Type at least 2 letters for search"
                  value={jobRole}
                  onChange={e => {
                    setJobRole(e.target.value);
                    setShowJobRoleDropdown(e.target.value.length >= 2);
                  }}
                  onFocus={() => setJobRoleFocused(true)}
                  onBlur={() => setTimeout(() => setJobRoleFocused(false), 200)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#42526E] text-base"
                  tabIndex={-1}
                  onClick={() => setShowJobRoleDropdown(v => !v)}
                  aria-label="Toggle dropdown"
                >
                  <svg width="18" height="18" fill="none" stroke="#42526E" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {(showJobRoleDropdown && jobRoleFocused) && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#A0AEC0] rounded shadow z-10 max-h-48 overflow-auto">
                    {jobRoleOptions.filter(opt => opt.toLowerCase().includes(jobRole.toLowerCase())).length > 0 ? (
                      jobRoleOptions.filter(opt => opt.toLowerCase().includes(jobRole.toLowerCase())).map(opt => (
                        <div
                          key={opt}
                          className="px-3 py-2 cursor-pointer hover:bg-[#F3F4F6] text-[#253858] text-sm"
                          onMouseDown={() => {
                            setJobRole(opt);
                            setShowJobRoleDropdown(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-[#A0AEC0] text-sm">No roles found</div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          <label className="block text-sm font-medium text-[#253858] mb-1">Type of Job <span className="text-[#B91C1C]">*</span></label>
          <div className="flex gap-2 mb-2">
            {jobTypes.map(type => (
              <button key={type} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold ${selectedJobType === type ? 'bg-[#F97316] text-white border-[#F97316]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`} onClick={() => setSelectedJobType(type)}>{type}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs mb-2">
            <input type="checkbox" checked={nightShift} onChange={e => setNightShift(e.target.checked)} />
            This is a night shift job
          </label>
        </div>

        {/* Location section */}
        <div className="mb-6">
          {/* Location section header - updated to match image */}
          <div className="mb-2">
            <span className="text-[#253858] font-bold text-xl">Location</span>
            <div className="text-[#42526E] text-base mt-1">Let candidates know where they will be working from.</div>
          </div>
          <label className="block text-base font-semibold text-[#253858] mb-2">Work location type <span className="text-[#B91C1C]">*</span></label>
          <div className="flex gap-2 mb-2">
            {locationTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 transition-colors duration-150 ${selectedLocationTypes[0] === type ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`}
                onClick={() => setSelectedLocationTypes([type])}
              >
                {type}
                {type === "Field Job" && (
                  <span className="ml-1">
                    <svg width="14" height="14" fill="none" stroke={selectedLocationTypes[0] === type ? '#fff' : '#A0AEC0'} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Conditional fields for each location type */}
          {selectedLocationTypes[0] === "Work From Office" && (
            <>
              <label className="block text-base font-semibold text-[#253858] mb-2">Office address / landmark <span className="text-[#B91C1C]">*</span></label>
              <input type="text" className="border rounded px-3 py-2 w-full text-base mb-3" placeholder="Search for your address/locality" value={officeAddress} onChange={e => setOfficeAddress(e.target.value)} />
              <label className="block text-base font-semibold text-[#253858] mb-2">Add Floor / Plot no. / Shop no. (optional)</label>
              <input type="text" className="border rounded px-3 py-2 w-full text-base mb-3" placeholder="Enter office floor / plot no. / shop no.  (optional)" value={officeFloor} onChange={e => setOfficeFloor(e.target.value)} />
            </>
          )}
          {selectedLocationTypes[0] === "Field Job" && (
            <>
              <label className="block text-base font-semibold text-[#253858] mb-2">Which area will the candidates be working in ? <span className="text-[#B91C1C]">*</span></label>
              <div className="relative mb-3">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full text-base pr-10"
                  placeholder="Search for your address/locality"
                  value={fieldArea}
                  onChange={e => setFieldArea(e.target.value)}
                  onFocus={() => setFieldAreaFocused(true)}
                  onBlur={() => setTimeout(() => setFieldAreaFocused(false), 200)}
                />
                {fieldArea && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#42526E] text-xl"
                    onClick={() => setFieldArea("")}
                    aria-label="Clear"
                  >&#10005;</button>
                )}
              </div>
              {fieldAreaFocused && (
                <div className="bg-white rounded-lg shadow border mt-2 p-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-[#158C7E] hover:bg-[#10796C] text-white font-semibold px-3 py-2 rounded text-sm"
                    style={{ minHeight: '32px' }}
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(pos => {
                          const { latitude, longitude } = pos.coords;
                          setFieldArea(`Lat: ${latitude}, Lng: ${longitude}`);
                        });
                      }
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
                    Use my current location
                  </button>
                </div>
              )}
            </>
          )}
          {selectedLocationTypes[0] === "Work From Home" && (
            <>
              <label className="block text-base font-semibold text-[#253858] mb-2">Job City <span className="text-[#B91C1C]">*</span></label>
              <select
                className="border rounded px-3 py-2 w-full text-base mb-3"
                value={jobCity}
                onChange={e => {
                  setJobCity(e.target.value);
                  setShowCityInfo(!!e.target.value);
                }}
              >
                <option value="">Select City</option>
                {cityOptions.map(city => (
                  <option key={city} value={city}>{city} Region</option>
                ))}
              </select>
              {showCityInfo && jobCity && (
                <div className="bg-[#EAF3FF] border border-[#B6D4FE] text-[#0A1733] text-base rounded px-4 py-3 flex items-center gap-2 mt-2">
                  <svg width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>
                  You will be receiving applications from within {jobCity} Region
                  <span className="ml-1"><svg width="16" height="16" fill="none" stroke="#0A1733" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg></span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Compensation section */}
        <div className="mb-6">
          <label className="block text-xl font-semibold text-[#253858] mb-1">Compensation</label>
          <div className="text-sm text-[#42526E] mb-2">Job postings with right salary & incentives will help you find the right candidates.</div>
          <label className="block text-base font-semibold text-[#253858] mb-2">What is the pay type? <span className="text-[#B91C1C]">*</span></label>
          <div className="flex gap-2 mb-2">
            {payTypes.map(type => (
              <button
                key={type}
                type="button"
                className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors duration-150 ${selectedPayType === type ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`}
                onClick={() => setSelectedPayType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Conditional salary/incentive fields */}
          {selectedPayType === "Fixed Only" && (
            <>
              <label className="block text-base font-semibold text-[#253858] mb-2">Fixed salary / month <span className="text-[#B91C1C]">*</span> <span className="ml-1"><svg width="16" height="16" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg></span></label>
              <div className="flex gap-2 mb-4">
                <input type="text" className="border rounded px-3 py-2 w-1/2 text-base" placeholder="Minimum fixed salary" value={minFixedSalary} onChange={e => setMinFixedSalary(e.target.value.replace(/[^0-9]/g, ""))} />
                <div className="flex items-center justify-center px-2">to</div>
                <input type="text" className="border rounded px-3 py-2 w-1/2 text-base" placeholder="Maximum fixed salary" value={maxFixedSalary} onChange={e => setMaxFixedSalary(e.target.value.replace(/[^0-9]/g, ""))} />
              </div>
            </>
          )}
          {selectedPayType === "Fixed + Incentive" && (
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-base font-semibold text-[#253858] mb-2">Fixed salary / month (excluding incentives) <span className="text-[#B91C1C]">*</span> <span className="ml-1"><svg width="16" height="16" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg></span></label>
                <div className="flex gap-2">
                  <input type="text" className="border rounded px-3 py-2 w-1/2 text-base" placeholder="Minimum fixed salary" value={minFixedSalary} onChange={e => setMinFixedSalary(e.target.value.replace(/[^0-9]/g, ""))} />
                  <div className="flex items-center justify-center px-2">to</div>
                  <input type="text" className="border rounded px-3 py-2 w-1/2 text-base" placeholder="Maximum fixed salary" value={maxFixedSalary} onChange={e => setMaxFixedSalary(e.target.value.replace(/[^0-9]/g, ""))} />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-base font-semibold text-[#253858] mb-2">Average Incentive / month <span className="text-[#B91C1C]">*</span> <span className="ml-1"><svg width="16" height="16" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg></span></label>
                <input type="text" className="border rounded px-3 py-2 w-full text-base" placeholder="Eg. ₹2000" value={avgIncentive} onChange={e => setAvgIncentive(e.target.value.replace(/[^0-9]/g, ""))} />
              </div>
            </div>
          )}
          {selectedPayType === "Incentive Only" && (
            <div className="mb-4">
              <label className="block text-base font-semibold text-[#253858] mb-2">Average Incentive / month <span className="text-[#B91C1C]">*</span> <span className="ml-1"><svg width="16" height="16" fill="none" stroke="#A0AEC0" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg></span></label>
              <input type="text" className="border rounded px-3 py-2 w-full text-base" placeholder="Eg. ₹2000" value={avgIncentive} onChange={e => setAvgIncentive(e.target.value.replace(/[^0-9]/g, ""))} />
              {avgIncentive !== "" && Number(avgIncentive) < 1000 && (
                <div className="text-[#B91C1C] text-sm mt-2 font-semibold">Incentive should be at least ₹ 1000</div>
              )}
              {/* Salary breakup card */}
              {avgIncentive !== "" && (
                <div className="bg-[#FFF7E6] border border-[#FACC15] rounded mt-4 p-5">
                  <div className="font-semibold text-lg text-[#253858] mb-4">Salary breakup shown to candidates</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-[#253858]">Fixed Salary / Month</span>
                    <span className="text-base text-[#253858]">₹ 0</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base text-[#253858]">Average Incentive / Month</span>
                    <span className="text-base text-[#253858]">₹ {avgIncentive || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg text-[#253858]">Earning Potential / Month</span>
                    <span className="font-bold text-lg text-[#253858]">₹ {avgIncentive || 0}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <label className="block text-sm font-medium text-[#253858] mb-1">Do you offer any additional perks?</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {perks.map(perk => (
              <button key={perk} type="button" className={`px-2 py-1 rounded-full border text-xs font-medium ${selectedPerks.includes(perk) ? 'bg-[#F97316] text-white border-[#F97316]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`} onClick={() => setSelectedPerks(selectedPerks.includes(perk) ? selectedPerks.filter(p => p !== perk) : [...selectedPerks, perk])}>{perk} +</button>
            ))}
            {selectedPerks.filter(p => !perks.includes(p)).map(perk => (
              <span key={perk} className="px-2 py-1 rounded-full border text-xs font-medium bg-[#F97316] text-white border-[#F97316]">{perk} <button type="button" className="ml-1 text-white" onClick={() => setSelectedPerks(selectedPerks.filter(p => p !== perk))}>&times;</button></span>
            ))}
          </div>
          {showOtherPerksInput ? (
            <div className="flex gap-2 mb-2">
              <input type="text" className="border rounded px-2 py-1 text-xs" placeholder="Other perk" value={otherPerks} onChange={e => setOtherPerks(e.target.value)} />
              <button type="button" className="text-[#F97316] text-xs font-semibold" onClick={() => {
                if (otherPerks.trim()) {
                  setSelectedPerks([...selectedPerks, otherPerks.trim()]);
                  setOtherPerks("");
                  setShowOtherPerksInput(false);
                }
              }}>Add</button>
              <button type="button" className="text-[#253858] text-xs font-semibold" onClick={() => setShowOtherPerksInput(false)}>Cancel</button>
            </div>
          ) : (
            <button type="button" className="text-[#16A34A] text-xs font-semibold mb-2" onClick={() => setShowOtherPerksInput(true)}>+ Add other perks</button>
          )}
          <label className="block text-sm font-medium text-[#253858] mb-1">Is there any joining fee or deposit required from the candidate? <span className="text-[#B91C1C]">*</span></label>
          <div className="flex gap-2 mb-2">
            {['Yes', 'No'].map(opt => (
              <button key={opt} type="button" className={`px-3 py-1 rounded-full border text-xs font-semibold ${joiningFee === opt ? 'bg-[#F97316] text-white border-[#F97316]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`} onClick={() => setJoiningFee(opt)}>{opt}</button>
            ))}
          </div>
          {/* Fee details section - show only if Yes is selected */}
          {joiningFee === "Yes" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#253858] mb-1">Fee amount <span className="text-[#B91C1C]">*</span></label>
              <input type="text" className="border rounded px-3 py-2 w-full text-sm mb-3" placeholder="₹1000" value={feeAmount} onChange={e => setFeeAmount(e.target.value.replace(/[^0-9]/g, ""))} />

              <label className="block text-sm font-medium text-[#253858] mb-1">What is this fee for? <span className="text-[#B91C1C]">*</span></label>
              <div className="flex flex-wrap gap-2 mb-3">
                {feeReasons.map(reason => (
                  <button
                    key={reason}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-xs font-semibold ${selectedFeeReason === reason ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`}
                    onClick={() => setSelectedFeeReason(reason)}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              {/* Asset/Inventory Charge: show dropdown */}
              {selectedFeeReason === "Asset/ Inventory Charge" && (
                <>
                  <label className="block text-sm font-medium text-[#253858] mb-1">Mention assets/inventory <span className="text-[#B91C1C]">*</span></label>
                  <select className="border rounded px-3 py-2 w-full text-sm mb-3" value={selectedAsset} onChange={e => setSelectedAsset(e.target.value)}>
                    <option value="">Eg. Bag, Laptop, etc.</option>
                    {assetOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </>
              )}

              {/* Registration/Training Fees or Other Reason: show text input */}
              {(selectedFeeReason === "Registration/ Training Fees" || selectedFeeReason === "Other Reason") && (
                <>
                  <label className="block text-sm font-medium text-[#253858] mb-1">Mention your reason here <span className="text-[#B91C1C]">*</span></label>
                  <input type="text" className="border rounded px-3 py-2 w-full text-sm mb-3" placeholder="Enter reason" value={otherReasonText} onChange={e => setOtherReasonText(e.target.value)} />
                </>
              )}

              <label className="block text-sm font-medium text-[#253858] mb-1">When should the fee be paid? <span className="text-[#B91C1C]">*</span></label>
              <div className="flex gap-2 mb-2">
                {feePaidOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-xs font-semibold ${feePaidWhen === opt ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-[#253858] border-[#A0AEC0]'}`}
                    onClick={() => setFeePaidWhen(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-8 py-2"
            type="button"
            disabled={
              !companyName ||
              !jobTitle.trim() ||
              !selectedJobType ||
              (selectedLocationTypes[0] === "Work From Office" && !officeAddress.trim()) ||
              (selectedLocationTypes[0] === "Field Job" && !fieldArea.trim()) ||
              (selectedLocationTypes[0] === "Work From Home" && !jobCity.trim()) ||
              !selectedPayType ||
              (selectedPayType === "Fixed Only" && (!minFixedSalary || !maxFixedSalary)) ||
              (selectedPayType === "Fixed + Incentive" && (!minFixedSalary || !maxFixedSalary || !avgIncentive)) ||
              (selectedPayType === "Incentive Only" && !avgIncentive)
            }
            onClick={() => navigate("/Employer/CandidateRequirements")}
          >Continue</button>
        </div>
      </div>
    </div>
  );
};

export default NewJobPost;

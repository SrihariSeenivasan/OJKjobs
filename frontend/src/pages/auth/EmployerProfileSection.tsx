// ...existing code...
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { submitEmployerProfile } from '../../store/slices/employerSlice';
import { addNotification } from '../../store/slices/uiSlice';

const EmployerProfileSection: React.FC = () => {
  const [step, setStep] = useState(0); // 0: start, 1: form1, 2: form2, 3: payment, 4: review
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    mobile: '',
    otp: '',
    email: '',
    location: { state: '', district: '', city: '' },
    industry: '',
    year: '',
    numEmployees: '',
    gst: '',
    logo: null as File | null,
    description: '',
    hiringNeeds: [] as string[],
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  // For edit mode in verified profile
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<{ name: string; mobile: string; numEmployees: string }>({
    name: '',
    mobile: '',
    numEmployees: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const employerProfile = useSelector((state: RootState) =>
    state.employers.employers.find(e => e.id === user?.id)
  );
  const isVerified = employerProfile?.status === 'approved';

  // Initialize editForm when employerProfile changes and is verified
  React.useEffect(() => {
    if (isVerified && employerProfile) {
      setEditForm({
        name: employerProfile.name || '',
        // @ts-expect-error: Add 'mobile' to EmployerProfile type in your slice for full type safety
        mobile: employerProfile.mobile || '',
        // @ts-expect-error: Add 'numEmployees' to EmployerProfile type in your slice for full type safety
        numEmployees: employerProfile.numEmployees || '',
      });
    }
  }, [isVerified, employerProfile]);

  // Step 0: Show button to start or profile details if verified
  if (step === 0) {
    if (isVerified && employerProfile) {
      const handleEditSave = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user) return;
        dispatch({
          type: 'employers/updateEmployerProfile',
          payload: {
            id: user.id,
            name: editForm.name,
            mobile: editForm.mobile,
            numEmployees: editForm.numEmployees,
          },
        });
        setEditMode(false);
        dispatch(addNotification({ type: 'success', message: 'Profile updated successfully.' }));
      };
      return (
        <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
            Company Profile <span title="Verified" className="text-green-600 ml-2">✔️</span>
            {!editMode && <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={() => setEditMode(true)}>Edit</button>}
          </h2>
          <div className="grid grid-cols-1 gap-4 text-left">
            <div>
              <span className="font-medium">Company Name:</span>
              {editMode ? (
                <input type="text" className="ml-2 px-2 py-1 border rounded" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
              ) : (
                <span className="ml-2">{employerProfile.name}</span>
              )}
            </div>
            <div>
              <span className="font-medium">Mobile:</span>
              {editMode ? (
                <input type="text" className="ml-2 px-2 py-1 border rounded" value={editForm.mobile} onChange={e => setEditForm(f => ({ ...f, mobile: e.target.value }))} />
              ) : (
                <span className="ml-2">{employerProfile?.mobile ?? '-'}</span>
              )}
            </div>
            <div>
              <span className="font-medium">Employee Strength:</span>
              {editMode ? (
                <select className="ml-2 px-2 py-1 border rounded" value={editForm.numEmployees} onChange={e => setEditForm(f => ({ ...f, numEmployees: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              ) : (
                <span className="ml-2">{employerProfile?.numEmployees ?? '-'}</span>
              )}
            </div>
            <div>
              <span className="font-medium">Email:</span> <span className="ml-2">{employerProfile.email}</span>
            </div>
            <div>
              <span className="font-medium">Industry:</span> <span className="ml-2">{employerProfile?.industry ?? '-'}</span>
            </div>
            <div>
              <span className="font-medium">Location:</span> <span className="ml-2">{employerProfile?.location ? `${employerProfile.location.state}, ${employerProfile.location.district}, ${employerProfile.location.city}` : '-'}</span>
            </div>
            <div>
              <span className="font-medium">GST/Reg No.:</span> <span className="ml-2">{employerProfile?.gst ?? '-'}</span>
            </div>
            <div>
              <span className="font-medium">Description:</span> <span className="ml-2">{employerProfile?.description ?? '-'}</span>
            </div>
            <div>
              <span className="font-medium">Hiring Needs:</span> <span className="ml-2">{employerProfile?.hiringNeeds?.join(', ') ?? '-'}</span>
            </div>
          </div>
          {editMode && (
            <div className="flex gap-2 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleEditSave}>Save</button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          )}
        </div>
      );
    }
    // Not verified: show setup button
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Profile</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium" onClick={() => setStep(1)}>
          Set Up Company Profile
        </button>
      </div>
    );
  }

  // Step 1: Company Details
  if (step === 1) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Company Details</h2>
        <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.contactPerson} onChange={e => setForm(f => ({ ...f, contactPerson: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number (OTP Verified)</label>
            <div className="flex gap-2">
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))} disabled={otpVerified} />
              {!otpVerified && <button type="button" className="bg-blue-500 text-white px-3 py-2 rounded-md" onClick={() => setOtpSent(true)}>Send OTP</button>}
            </div>
            {otpSent && !otpVerified && (
              <div className="flex gap-2 mt-2">
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter OTP" value={form.otp} onChange={e => setForm(f => ({ ...f, otp: e.target.value }))} />
                <button type="button" className="bg-green-500 text-white px-3 py-2 rounded-md" onClick={() => setOtpVerified(true)}>Verify</button>
              </div>
            )}
            {otpVerified && <span className="text-green-600 text-sm ml-2">Verified</span>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Location</label>
            <div className="flex gap-2 mb-2">
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="State" required value={form.location.state} onChange={e => setForm(f => ({ ...f, location: { ...f.location, state: e.target.value } }))} />
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="District" required value={form.location.district} onChange={e => setForm(f => ({ ...f, location: { ...f.location, district: e.target.value } }))} />
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="City" required value={form.location.city} onChange={e => setForm(f => ({ ...f, location: { ...f.location, city: e.target.value } }))} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}>
              <option value="">Select</option>
              <option value="Textile">Textile</option>
              <option value="Hotel">Hotel</option>
              <option value="Retail">Retail</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Year of Establishment</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" required value={form.numEmployees} onChange={e => setForm(f => ({ ...f, numEmployees: e.target.value }))}>
              <option value="">Select</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">GST / Business Registration No. (optional)</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={form.gst} onChange={e => setForm(f => ({ ...f, gst: e.target.value }))} />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium" onClick={() => setStep(0)}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">Next</button>
          </div>
        </form>
      </div>
    );
  }

  // Step 2: Company Logo, Description, Hiring Needs
  if (step === 2) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Company Profile Details</h2>
        <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (optional)</label>
            <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, logo: e.target.files && e.target.files[0] ? e.target.files[0] : null }))} />
            {form.logo && <div className="mt-2 text-xs text-gray-500">Selected: {form.logo.name}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Company Description</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your company in a few sentences..." />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Needs</label>
            <div className="flex flex-col gap-2">
              {['Factory Workers','Housekeeping Staff','Cashiers / Sales Staff','Delivery Boys','Kitchen Helpers / Chefs','Others'].map(need => (
                <label key={need} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={form.hiringNeeds.includes(need)}
                    onChange={() => setForm(f => ({ ...f, hiringNeeds: f.hiringNeeds.includes(need) ? f.hiringNeeds.filter(n => n !== need) : [...f.hiringNeeds, need] }))}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{need}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium" onClick={() => setStep(1)}>Back</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">Next</button>
          </div>
        </form>
      </div>
    );
  }

  // Step 3: Payment Option
  if (step === 3) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Step 3: Payment Option (Optional)</h2>
        <div className="mb-4">
          <div className="text-green-700 font-semibold text-lg mb-2">Post 1 job free</div>
          <div className="text-gray-600 mb-2">You can post your first job for free. Upgrade to premium for more visibility and sponsored placement (coming soon).</div>
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium opacity-60 cursor-not-allowed" disabled>
              Unlock Premium (Coming Soon)
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium" onClick={() => setStep(4)}>
              Continue Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Review & Notify
  if (step === 4) {
    // Dispatch to Redux and show notification
    if (user && !employerProfile) {
      dispatch(submitEmployerProfile({
        id: user.id,
        name: form.companyName,
        email: form.email,
        category: 'MSME',
        status: 'pending',
        description: form.description,
        logo: form.logo ? form.logo.name : undefined,
        hiringNeeds: form.hiringNeeds,
        activityLog: [`Registered on ${new Date().toISOString().slice(0, 10)}`],
      }));
      dispatch(addNotification({ type: 'info', message: 'Your profile is under review. Once approved, you can post jobs.' }));
    }
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile Under Review</h2>
        <div className="mb-4 text-lg text-gray-700">
          Thank you! Your profile is under review. Our team will approve your account within 24 hours.
        </div>
        <div className="text-gray-500 text-sm mb-4">
          You will receive a login link to post jobs, view applicants, and download CVs after approval.
        </div>
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return null;
};

export default EmployerProfileSection;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BuyPackageCheckout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gstin, setGstin] = useState('27AAMCB4079M1Z1');
  const [editingGstin, setEditingGstin] = useState(false);

  // Get plan from location.state or fallback to defaults
  const plan = location.state?.plan || {};
  const months = plan.months || 3;
  const jobCredits = plan.credits ? parseInt(plan.credits) || 6 : 6;
  const duration = plan.duration ? parseInt(plan.duration) || 90 : 90;
  const planPrice = plan.price || 3900;
  const discount = plan.discount ? parseInt(plan.discount) || 501 : 501;
  const subtotal = plan.total || 3399;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const planName = `${months} Months Plan`;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl">
        {/* Back and Heading */}
        <div className="flex items-center mb-6">
          <button className="mr-2 p-2 rounded hover:bg-gray-100" aria-label="Back" onClick={() => navigate(-1)}>
            <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-2xl font-bold text-[#183b56]">Checkout</h1>
        </div>

        {/* Purchase Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-[#183b56]">Purchase summary</h2>
          <div className="mb-2">
            <div className="font-semibold text-base mb-1">{planName} <span className="float-right font-bold">₹{planPrice.toLocaleString()}</span></div>
            <ul className="list-disc ml-5 text-sm text-gray-800 mb-2">
              <li>You are buying <b>{jobCredits} Job Credits</b></li>
              <li>Use these credits to post Jobs within <b>{duration} days</b>.</li>
            </ul>
            <div className="text-green-700 text-sm font-medium flex items-center mb-2">Plan discount (~13%) <span className="ml-auto text-green-700 font-semibold">-₹{discount}</span></div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-sm mb-1"><span>Sub Total</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm mb-1"><span>GST (18%)</span><span className="font-semibold">₹{gst.toLocaleString()}</span></div>
          <div className="flex items-center text-sm mb-2">
            <span>GSTIN: </span>
            {editingGstin ? (
              <input
                className="ml-2 border-b border-gray-400 outline-none px-1 py-0.5 text-sm w-48"
                value={gstin}
                onChange={e => setGstin(e.target.value)}
                onBlur={() => setEditingGstin(false)}
                autoFocus
              />
            ) : (
              <span className="ml-2 font-mono">{gstin}</span>
            )}
            <button className="ml-1 p-1" onClick={() => setEditingGstin(true)} aria-label="Edit GSTIN">
              <svg width="16" height="16" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
            </button>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-end">
            <div className="text-xl font-bold text-[#183b56]">Total <span className="text-xs font-normal text-gray-500">(Inc tax)</span></div>
            <div className="text-2xl font-bold text-[#183b56]">₹{total.toLocaleString()}</div>
          </div>
        </div>

        {/* Savings Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center mb-6">
          <span className="mr-2">🎉</span>
          <span className="text-green-800 font-medium">Yay! You’re saving <b>₹{discount}</b> on this purchase</span>
        </div>

        {/* Proceed to Pay Button */}
        <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg py-3 text-lg mb-4 transition">Proceed to Pay ₹{total.toLocaleString()}</button>

        {/* Info and Security Note */}
        <div className="text-xs text-gray-500 text-center mb-2">
          We ensure fair use and privacy. Policy violations or fraud may result in suspension and loss of fees. KYC verification is mandatory for unregistered users to activate subscriptions.
        </div>
        <div className="flex items-center justify-center text-xs text-gray-700 gap-2">
          <svg width="18" height="18" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <span>100% safe and secure checkout</span>
        </div>
      </div>
    </div>
  );
};

export default BuyPackageCheckout;

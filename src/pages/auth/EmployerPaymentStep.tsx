import React from 'react';

const EmployerPaymentStep: React.FC = () => {
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
          <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium">
            Continue Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerPaymentStep;

import React from 'react';

const EmployerReviewStep: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Step 4: Admin Review & Activation</h2>
      <div className="mb-4 text-lg text-gray-700">
        Thank you! Your profile is under review. Our team will approve your account within 24 hours.
      </div>
      <div className="text-gray-500 text-sm">
        You will receive a login link to post jobs, view applicants, and download CVs after approval.
      </div>
    </div>
  );
};

export default EmployerReviewStep;

import React from 'react';

const JobseekerRegister: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Jobseeker Registration</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Full Name</label>
          <input type="text" className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50" placeholder="Enter your full name" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Mobile Number</label>
          <input type="tel" className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50" placeholder="Enter your mobile number" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">Email</label>
          <input type="email" className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg bg-blue-50" placeholder="Enter your email" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all">Register</button>
      </form>
    </div>
  );
};

export default JobseekerRegister;

import React, { useState } from 'react';
import EmployerLogin from './auth/EmployerLogin';
import JobseekerLogin from './auth/JobseekerLogin';

const AuthGatewayLog: React.FC = () => {
  const [role, setRole] = useState<'jobseeker' | 'employer' | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        {!role && (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Welcome to OJK Jobs</h2>
            <h3 className="text-center text-2xl font-bold text-gray-900 mb-4">Login</h3>
            <div className="flex flex-col gap-4">
              <button onClick={() => setRole('jobseeker')} className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">I am a Jobseeker</button>
              <button onClick={() => setRole('employer')} className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition">I am an Employer</button>
            </div>
          </>
        )}
        {role === 'jobseeker' && <JobseekerLogin />}
        {role === 'employer' && <EmployerLogin />}
      </div>
    </div>
  );
};

export default AuthGatewayLog;

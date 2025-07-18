import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EmployerDashboard from './EmployerDashboard';
import JobseekerDashboard from './JobseekerDashboard';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) return null;
  return user.role === 'employer' ? <EmployerDashboard /> : <JobseekerDashboard />;
};

export default Dashboard;
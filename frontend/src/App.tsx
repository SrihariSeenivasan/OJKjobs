import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './i18n';

// Layout Components
import Layout from './components/common/Layout';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import AuthGateway from './pages/AuthGateway';
import Dashboard from './pages/Dashboard';
import BrowseJobs from './pages/jobs/BrowseJobs';
import PostJob from './pages/jobs/PostJob';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
// import JobseekerLogin from './pages/auth/JobseekerLogin';
import JobseekerProfile from './pages/auth/JobseekerProfile';
import Profile from './pages/Profile';
import EmployeeLogin from './pages/auth/EmployeeLogin';
import EmployerPaymentStep from './pages/auth/EmployerPaymentStep';
import EmployerProfileSetup from './pages/auth/EmployerProfileSetup';
import EmployerReviewStep from './pages/auth/EmployerReviewStep';
import ContactUs from './pages/ContactUs';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/auth" element={<AuthGateway />} />
            <Route path="/jobseeker-profile" element={<JobseekerProfile />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/1-day-job" element={<BrowseJobs />} />
            <Route path="/profile" element={<Profile />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/EmployerPaymentSetup" element={<EmployerPaymentStep />} />
          <Route path="/EmployerProfileSetup" element={<EmployerProfileSetup />} />
          <Route path="/EmployerReviewStep" element={<EmployerReviewStep />} />
          <Route path="/ContactUs" element ={<ContactUs />} />
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/post-job" element={
              <ProtectedRoute requiredRole="employer">
                <PostJob />
              </ProtectedRoute>
            } />

            {/* Static Pages */}
            <Route path="/contact-us" element={<div className="p-8 text-center">Contact Us page coming soon!</div>} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/unauthorized" element={<div className="p-8 text-center">Unauthorized access!</div>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
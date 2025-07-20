import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './i18n';
import { store } from './store';

// Layout Components
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminPanel from './pages/admin/AdminPanel';

// Pages
import AuthGatewayLog from './pages/AuthGatewayLog';

import Home from './pages/Home';
import BrowseJobs from './pages/jobs/BrowseJobs';
import PostJob from './pages/jobs/PostJob';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import JobseekerLogin from './pages/auth/JobseekerLogin';
import EmployeeLogin from './pages/auth/EmployerLogin';
import EmployerPaymentStep from './pages/auth/EmployerPaymentStep';
import EmployerProfileSetup from './pages/auth/EmployerProfileSetup';
import EmployerReviewStep from './pages/auth/EmployerReviewStep';
import JobseekerProfile from './pages/auth/JobseekerProfile';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import AuthGatewayReg from './pages/AuthGatewayReg';
import JobseekerRegister from './pages/auth/JobseekerRegister';
import EmployerRegister from './pages/auth/EmployerRegister';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/authLog" element={<AuthGatewayLog />} />
            <Route path="/authReg" element={<AuthGatewayReg />} />
            <Route path="/jobseeker-profile" element={<JobseekerProfile />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/1-day-job" element={<BrowseJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/JobseekerRegister" element={<JobseekerRegister />} />
            <Route path="/EmployerRegister" element={< EmployerRegister/>} />
            <Route path="/JobseekerLogin" element={<JobseekerLogin />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/EmployerPaymentSetup" element={<EmployerPaymentStep />} />
          <Route path="/EmployerProfileSetup" element={<EmployerProfileSetup />} />
          <Route path="/EmployerReviewStep" element={<EmployerReviewStep />} />
          <Route path="/ContactUs" element ={<ContactUs />} />
          <Route path="/Blog" element ={<Blog />} />
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
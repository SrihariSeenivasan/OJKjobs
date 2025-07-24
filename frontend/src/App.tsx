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

import EmployerLogin from './pages/auth/EmployerLogin';
import EmployerPaymentStep from './pages/auth/EmployerPaymentStep';
import EmployerProfileSetup from './pages/auth/EmployerProfileSetup';
import EmployerRegister from './pages/auth/EmployerRegister';
import EmployerReviewStep from './pages/auth/EmployerReviewStep';
import JobseekerLogin from './pages/auth/JobseekerLogin';
import JobseekerProfile from './pages/auth/JobseekerProfile';
import JobseekerRegister from './pages/auth/JobseekerRegister';
import AuthGatewayReg from './pages/AuthGatewayReg';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import ContestDetails from './pages/Contests/Contests';
import ContestsListing from './pages/Contests/ContestsListing';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Employer/Billing';
import ContactPopup from './pages/Employer/Common/ContactPopup';
import CreditsAndUsage from './pages/Employer/CreditsAndUsage';
import SavedSearches from './pages/Employer/Database/SavedSearches';
import SearchCandidates from './pages/Employer/Database/SearchCandidates';
import SearchList from './pages/Employer/Database/SearchList';
import UnlockedCandidates from './pages/Employer/Database/UnlockedCandidates';
import EmployerLayout from './pages/Employer/EmployerLayout';

import Jobs from './pages/Employer/Jobs/Jobs';
import ReferAndEarn from './pages/Employer/ReferAndEarn';
import DownloadApplications from './pages/Employer/Report/DownloadApplications';
import ReportsDashboard from './pages/Employer/Report/ReportsDashboard';
import Home from './pages/Home';
import BrowseJobs from './pages/jobs/BrowseJobs';
import PostJob from './pages/jobs/PostJob';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ScheduleTraining from './pages/Employer/Help/ScheduleTraining';
import SupportHome from './pages/Employer/Help/Support/Home';
import BuyPackageSelection from './pages/Employer/BuyPackages/BuyPackageSelection';
import BuyPackageCheckout from './pages/Employer/BuyPackages/BuyPackageCheckout';
import EmployerProfile from './pages/Employer/Profiles/Profile';
import CompanyProfile from './pages/Employer/Profiles/CompanyProfile';
import NewJobPost from './pages/Employer/Jobs/PostJobs/NewJobPost';
import CandidateRequirements from './pages/Employer/Jobs/PostJobs/CandidateRequirements';

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
          <Route path="/EmployerLogin" element={<EmployerLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/EmployerPaymentSetup" element={<EmployerPaymentStep />} />
          <Route path="/EmployerProfileSetup" element={<EmployerProfileSetup />} />
          <Route path="/EmployerReviewStep" element={<EmployerReviewStep />} />
          <Route path="/ContactUs" element ={<ContactUs />} />
          <Route path="/Blog" element ={<Blog />} />
          <Route path="/ContestsListing" element ={<ContestsListing />} />
          <Route path="/ContestDetails" element ={<ContestDetails />} />
          
          
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

          {/* Employer Layout with nested routes */}
          <Route path="/Employer" element={<EmployerLayout />}>
            <Route path="/Employer/Jobs" element={<Jobs />} />
            <Route path="/Employer/SearchCandidates" element={<SearchCandidates />} />
            <Route path="SearchList" element={<SearchList />} />
            <Route path="/Employer/SavedSearches" element={<SavedSearches />} />
            <Route path="/Employer/UnlockedCandidates" element={<UnlockedCandidates />} />
            <Route path="/Employer/Reports" element={<ReportsDashboard />} />
            <Route path="/Employer/Reports/Download-Applications" element={<DownloadApplications />} />
            <Route path="/Employer/Refer" element={<ReferAndEarn />} />
            <Route path="/Employer/Credits" element={<CreditsAndUsage />} />
            <Route path="/Employer/Billing" element={<Billing />} />
            <Route path="/Employer/ContactPopup" element={<ContactPopup open={true} onClose={() => window.history.back()} />} />
            <Route path="/Employer/Profile" element={<EmployerProfile />} />  
            <Route path="/Employer/CompanyProfile" element={<CompanyProfile />} />  
            

          
          </Route>
             <Route path="/Employer/ScheduleTraining" element={<ScheduleTraining />} />
             <Route path="/Employer/SupportHome" element={<SupportHome />} />
             <Route path="/Employer/BuyPackageSelection" element={<BuyPackageSelection />} />
             <Route path="/Employer/BuyPackageCheckout" element={<BuyPackageCheckout />} />
             <Route path="/Employer/NewJobPost" element={<NewJobPost />} />
             <Route path="/Employer/CandidateRequirements" element={<CandidateRequirements />} />
             

             

             
             
          
          
          
          
          {/* Catch-all route */}
          
            
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
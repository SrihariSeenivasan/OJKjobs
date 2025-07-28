import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './i18n';
import Profile from './pages/Jobseeker/Profile';
import { store } from './store';
// Layout Components
import Layout from './components/common/Layout';
import AdminPanel from './pages/admin/AdminPanel';
// Pages
import Billing from './pages/Employer/Billing';
import BuyPackageCheckout from './pages/Employer/BuyPackages/BuyPackageCheckout';
import BuyPackageSelection from './pages/Employer/BuyPackages/BuyPackageSelection';
import ContactPopup from './pages/Employer/Common/ContactPopup';
import CreditsAndUsage from './pages/Employer/CreditsAndUsage';
import SavedSearches from './pages/Employer/Database/SavedSearches';
import SearchCandidates from './pages/Employer/Database/SearchCandidates';
import SearchList from './pages/Employer/Database/SearchList';
import UnlockedCandidates from './pages/Employer/Database/UnlockedCandidates';
import EmployerSignIn from './pages/Employer/EmployerAuth/EmployerSignIn';
import EmployerSignup from './pages/Employer/EmployerAuth/EmployerSignup';
import EmployerRegisterVerifyOtp from './pages/Employer/EmployerAuth/VerifyOtp';
import EmployerLayout from './pages/Employer/EmployerLayout';
import ScheduleTraining from './pages/Employer/Help/ScheduleTraining';
import SupportHome from './pages/Employer/Help/Support/Home';
import Jobs from './pages/Employer/Jobs/Jobs';
import CandidateRequirements from './pages/Employer/Jobs/PostJobs/CandidateRequirements';
import InterviewerInformation from './pages/Employer/Jobs/PostJobs/InterviewerInformation';
import JobPostPreview from './pages/Employer/Jobs/PostJobs/JobPreview';
import NewJobPost from './pages/Employer/Jobs/PostJobs/NewJobPost';
import PublishJob from './pages/Employer/Jobs/PostJobs/PublishJob';
import CompanyProfile from './pages/Employer/Profiles/CompanyProfile';
import EmployerProfile from './pages/Employer/Profiles/Profile';
import ReferAndEarn from './pages/Employer/ReferAndEarn';
import DownloadApplications from './pages/Employer/Report/DownloadApplications';
import ReportsDashboard from './pages/Employer/Report/ReportsDashboard';
import JobseekerLogin from './pages/Jobseeker/auth/JobseekerLogin';
import JobseekerProfileStepper from './pages/Jobseeker/auth/JobseekerProfileStepper';
import Blog from './pages/Jobseeker/Blog';
import ContactUs from './pages/Jobseeker/ContactUs';
import Home from './pages/Jobseeker/Home';
import ApplyJob from './pages/Jobseeker/jobs/ApplyJob';
import ApplyViaEmail from './pages/Jobseeker/jobs/ApplyViaEmail';
import BrowseJobs from './pages/Jobseeker/jobs/BrowseJobs';
import PrivacyPolicy from './pages/Jobseeker/PrivacyPolicy';
import RefundPolicy from './pages/Jobseeker/RefundPolicy';
import TermsAndConditions from './pages/Jobseeker/TermsAndConditions';
import AppliedForJobs from './pages/Employer/Jobs/AppliedForJobs';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/1-day-job" element={<BrowseJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-setup" element={<JobseekerProfileStepper />} />          
            <Route path="/JobseekerLogin" element={<JobseekerLogin />} />   
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/ContactUs" element ={<ContactUs />} />
            <Route path="/Blog" element ={<Blog />} />
            <Route path="/jobs/apply" element={<ApplyJob />} />
            <Route path="/apply-via-email" element={<ApplyViaEmail />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<JobseekerProfileStepper />} />
          

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
            <Route path="/Employer/Jobs/AppliedForJobs" element={<AppliedForJobs />} />
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
             <Route path="/Employer/InterviewerInformation" element={<InterviewerInformation />} />
             <Route path="/Employer/JobPostPreview" element={<JobPostPreview />} />
             <Route path="/Employer/PublishJob" element={<PublishJob />} />
             
             
            {/* {EmployerRegistration} */}
            
             <Route path="/Employer/OJKHireSignup" element={<EmployerSignup />} />
             <Route path="/Employer/EmployerSignIn" element={<EmployerSignIn />} />
             <Route path="/Employer/verifyOtp" element={<EmployerRegisterVerifyOtp />} />
              
          {/* Catch-all route */}
   
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
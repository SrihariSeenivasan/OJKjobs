import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl px-6 sm:px-10 py-10 border border-blue-100">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700 tracking-tight">Privacy Policy</h1>
      <p className="text-xs text-gray-400 mb-8 text-center uppercase tracking-widest">Last Updated: July 2025</p>
      <p className="mb-8 text-base text-gray-700 leading-relaxed text-center">OJK JOBS (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, store, and disclose personal information when you use our website, mobile app, and related services.<br/>By accessing or using OJK JOBS, you agree to the terms of this Privacy Policy.</p>
      <ol className="list-decimal pl-6 space-y-6 text-gray-800">
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Information We Collect</h2>
          <div className="mb-2 font-medium">a. From Employers:</div>
          <ul className="list-disc pl-6 mb-2">
            <li>Company Name and Registration Details</li>
            <li>Contact Person Name</li>
            <li>Email Address and Mobile Number (OTP verified)</li>
            <li>Business Address and Location</li>
            <li>Job Postings and Hiring Activity</li>
            <li>GSTIN or other government IDs (optional)</li>
          </ul>
          <div className="mb-2 font-medium">b. From Jobseekers:</div>
          <ul className="list-disc pl-6 mb-2">
            <li>Name, Age, Gender, and Mobile Number (OTP verified)</li>
            <li>Educational Qualification and Work Experience</li>
            <li>Preferred Job Location</li>
            <li>Uploaded CV, KYC Documents (Aadhaar, Voter ID, etc.)</li>
            <li>Profile Headline, Skills, and Industry Preference</li>
            <li>Social Media Links (optional)</li>
          </ul>
          <div className="mb-2 font-medium">c. Automatically Collected Data:</div>
          <ul className="list-disc pl-6">
            <li>IP Address and Device Info</li>
            <li>Location (via browser or app permission)</li>
            <li>Login timestamps and user activity on the platform</li>
            <li>Browser cookies (to improve functionality and personalize content)</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>Facilitate communication between jobseekers and employers</li>
            <li>Match candidates with suitable job openings</li>
            <li>Verify user authenticity and prevent fraud</li>
            <li>Improve platform performance and user experience</li>
            <li>Send relevant updates, job alerts, and service messages</li>
            <li>Comply with legal requirements when necessary</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Sharing of Information</h2>
          <ul className="list-disc pl-6">
            <li>We do not sell your personal information. We may share data:</li>
            <li>With verified employers (for jobseekers' CVs and profiles)</li>
            <li>With verified jobseekers (for job listings and employer contacts)</li>
            <li>With our technical service providers (for hosting, analytics, and communication tools)</li>
            <li>With government authorities, when legally required</li>
            <li>All third-party service providers are bound by confidentiality obligations.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Data Retention</h2>
          <ul className="list-disc pl-6">
            <li>We retain your data as long as your account is active or as needed to provide services.</li>
            <li>Inactive accounts may be archived or deleted after 12 months of inactivity.</li>
            <li>You may request data deletion at any time by contacting our support team.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Your Rights</h2>
          <ul className="list-disc pl-6">
            <li>Access and review your personal information</li>
            <li>Correct or update incorrect information</li>
            <li>Request account deletion or data removal</li>
            <li>Opt out of marketing communication</li>
            <li>Raise privacy concerns or complaints</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Data Security</h2>
          <ul className="list-disc pl-6">
            <li>End-to-end encryption for mobile OTP</li>
            <li>Role-based access control for internal data handling</li>
            <li>Secure cloud hosting with firewall and regular audits</li>
            <li>Periodic system backups and threat detection tools</li>
            <li>Despite these measures, we cannot guarantee 100% security, especially for data transmitted over the internet.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Children’s Privacy</h2>
          <p>OJK JOBS does not knowingly collect personal information from individuals under 18 years of age. If we learn that a minor has registered, we will delete their data immediately.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Third-Party Links</h2>
          <p>Our platform may contain links to external sites or services. We are not responsible for the privacy practices or content of third-party platforms.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Policy Updates</h2>
          <p>We may revise this Privacy Policy from time to time. All changes will be posted here with a revised date. Continued use of the platform indicates acceptance of the updated policy.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Contact Us</h2>
          <p>If you have questions, concerns, or complaints about your privacy or data handling:</p>
          <span className="inline-flex items-center gap-2 mt-2">📧 <a href="mailto:support@ojkjobs.com" className="text-blue-600 underline">support@ojkjobs.com</a></span><br/>
          <span className="inline-flex items-center gap-2 mt-2">📍 OJK JOBS, [Your Company Address], Tamil Nadu, India</span>
        </li>
      </ol>
    </div>
  </div>
);

export default PrivacyPolicy;

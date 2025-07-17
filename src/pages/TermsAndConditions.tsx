import React from 'react';

const TermsAndConditions: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl px-6 sm:px-10 py-10 border border-blue-100">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700 tracking-tight">Terms &amp; Conditions</h1>
      <p className="text-xs text-gray-400 mb-8 text-center uppercase tracking-widest">Last Updated: July 2025</p>
      <p className="mb-8 text-base text-gray-700 leading-relaxed text-center">Welcome to OJK JOBS (“we,” “our,” “us”), a manpower consultancy and digital job-matching platform operating primarily in Kongo Nadu, focused on providing blue-collar job opportunities and workforce solutions. By using our platform (website and/or mobile application), you agree to the following terms and conditions:</p>
      <ol className="list-decimal pl-6 space-y-6 text-gray-800">
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Acceptance of Terms</h2>
          <p>By accessing or using OJK JOBS, you agree to be bound by these Terms and Conditions. If you do not agree, you may not use our services.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Eligibility</h2>
          <ul className="list-disc pl-6">
            <li>Employers must be legally registered entities or individuals hiring for legitimate work.</li>
            <li>Workers/Jobseekers must be at least 18 years old and legally eligible to work in India.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Account Registration &amp; Verification</h2>
          <div className="mb-2 font-medium">For Employers:</div>
          <ul className="list-disc pl-6 mb-2">
            <li>You must provide accurate business information during onboarding (e.g., company name, location, year of establishment, number of employees).</li>
            <li>Each employer account must be verified and approved by the OJK Admin Panel before job posting is allowed.</li>
            <li>OJK JOBS reserves the right to reject or suspend any employer account for suspicious or misleading activity.</li>
          </ul>
          <div className="mb-2 font-medium">For Workers:</div>
          <ul className="list-disc pl-6">
            <li>Workers must complete their profile, including personal details, education, work experience, and optionally upload their CV and social media links.</li>
            <li>Worker accounts are created upon mobile OTP verification and do not require admin approval.</li>
            <li>OJK JOBS is not liable for any false claims made by workers on their profiles.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Job Posting Rules</h2>
          <ul className="list-disc pl-6">
            <li>Employers must post clear, honest, and legal job offers. No misleading job titles or fake offers.</li>
            <li>Each job post must include a headline, job responsibilities, location (auto-located or manually selected), and optional salary.</li>
            <li>“1-Day Jobs” may be posted for temporary or on-demand hiring purposes.</li>
            <li>Jobs may be boosted (paid service) for higher visibility.</li>
            <li>OJK JOBS reserves the right to remove or flag any job listing that violates policies.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Boosting &amp; Paid Services</h2>
          <ul className="list-disc pl-6">
            <li>Employers may choose to “Boost” job postings for additional reach.</li>
            <li>All payments made for premium listings or boost services are non-refundable, unless otherwise stated in writing.</li>
            <li>OJK JOBS does not guarantee hiring results from boosted jobs.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Data Privacy &amp; Confidentiality</h2>
          <ul className="list-disc pl-6">
            <li>All data submitted to OJK JOBS is stored securely and used only for hiring and placement purposes.</li>
            <li>We do not sell user data to third parties.</li>
            <li>Personal data may be shared with verified employers and recruiters when required to facilitate hiring.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Platform Misuse &amp; Account Suspension</h2>
          <ul className="list-disc pl-6">
            <li>Use of offensive, discriminatory, fraudulent, or abusive content will lead to immediate suspension or permanent ban.</li>
            <li>Posting adult content, illegal jobs, MLM schemes, or misleading listings is strictly prohibited.</li>
            <li>Impersonation or use of fake identity is a criminal offense and will be reported.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Limitation of Liability</h2>
          <ul className="list-disc pl-6">
            <li>OJK JOBS is a facilitator of jobs, not an employer.</li>
            <li>We are not responsible for employment contracts, salary payments, or disputes between employers and jobseekers.</li>
            <li>We are not liable for losses, damages, or fraudulent hiring events initiated by third-party users.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Termination of Services</h2>
          <ul className="list-disc pl-6">
            <li>You may delete your account at any time.</li>
            <li>OJK JOBS reserves the right to terminate or restrict access to any user found violating these terms.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Modifications to the Platform or Terms</h2>
          <ul className="list-disc pl-6">
            <li>We may update or revise these terms at any time. The latest version will always be available on our website.</li>
            <li>Continued use of the platform implies acceptance of updated terms.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Governing Law &amp; Jurisdiction</h2>
          <p>These terms shall be governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Tamil Nadu.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Contact Us</h2>
          <p>If you have any questions or concerns about these Terms &amp; Conditions, please email us at:</p>
          <span className="inline-flex items-center gap-2 mt-2">📧 <a href="mailto:support@ojkjobs.com" className="text-blue-600 underline">support@ojkjobs.com</a></span>
        </li>
      </ol>
    </div>
  </div>
);

export default TermsAndConditions;
 
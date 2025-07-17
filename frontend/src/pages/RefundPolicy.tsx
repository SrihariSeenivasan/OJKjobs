import React from 'react';


const RefundPolicy: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl px-6 sm:px-10 py-10 border border-blue-100">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700 tracking-tight">Refund Policy – OJK JOBS</h1>
      <p className="text-xs text-gray-400 mb-8 text-center uppercase tracking-widest">Last Updated: July 2025</p>
      <p className="mb-8 text-base text-gray-700 leading-relaxed text-center">At OJK JOBS, we strive to offer fair pricing and reliable service to both employers and jobseekers. This Refund Policy outlines the terms under which payments made for premium services may or may not be refunded.</p>
      <ol className="list-decimal pl-6 space-y-6 text-gray-800">
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Free Services</h2>
          <ul className="list-disc pl-6">
            <li>Most of our platform services are free to both jobseekers and employers, including basic job posting, registration, and profile creation.</li>
            <li>Free users are not eligible for refunds as there are no charges involved.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Paid Services (For Employers)</h2>
          <p>Employers may choose to purchase premium features such as:</p>
          <ul className="list-disc pl-6">
            <li>Boosted Job Listings</li>
            <li>Featured Employer Placement</li>
            <li>WhatsApp Broadcasting or SMS Campaigns</li>
            <li>Custom Hiring Plans or Packages</li>
          </ul>
          <p>These are prepaid digital services and are subject to the following refund rules.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Refund Eligibility</h2>
          <ul className="list-disc pl-6">
            <li>You were charged multiple times for the same service due to a technical error.</li>
            <li>You made a payment but could not access the paid service within 24 hours due to system error or platform-side failure.</li>
            <li>You mistakenly purchased a service and contact us within 1 hour of the transaction, without having used any part of the service.</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">Note: Refunds will not be entertained for reasons such as lack of applicants, hiring delays, or change of mind after purchase.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Non-Refundable Scenarios</h2>
          <ul className="list-disc pl-6">
            <li>Payments for job boosts or premium services already activated or consumed</li>
            <li>Situations where candidates did not meet your expectations</li>
            <li>Misuse, unauthorized access, or failure to follow platform guidelines</li>
            <li>Refund requests made after 3 days from the date of transaction</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Refund Process</h2>
          <ul className="list-disc pl-6">
            <li>
              To request a refund, please email <a href="mailto:refunds@ojkjobs.in" className="text-blue-600 underline">refunds@ojkjobs.in</a> with:
              <ul className="list-disc pl-6 mt-2">
                <li>Registered phone number or email</li>
                <li>Transaction ID or payment receipt</li>
                <li>Reason for refund</li>
              </ul>
            </li>
          </ul>
          <p>Our team will respond within 3 working days, and if approved, the refund will be processed within 7–10 working days via the original payment method.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Cancellation</h2>
          <ul className="list-disc pl-6">
            <li>You may cancel a boost or campaign before it goes live (within 1 hour of purchase). Once activated, it is no longer eligible for cancellation or refund.</li>
          </ul>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Disputes</h2>
          <p>For any payment disputes, please reach out to our team before initiating a chargeback or legal process. We aim to resolve all concerns amicably.</p>
        </li>
        <li>
          <h2 className="font-semibold text-lg text-blue-600 mb-1">Changes to This Policy</h2>
          <p>OJK JOBS reserves the right to revise or update this Refund Policy at any time. All changes will be posted on this page with the latest effective date.</p>
        </li>
      </ol>
      <div className="mt-8 border-t pt-6 text-sm text-gray-700 text-center">
        <div className="mb-2">📩 <span className="font-semibold">Contact Us for Refund Support</span></div>
        <div>Email: <a href="mailto:refunds@ojkjobs.in" className="text-blue-600 underline">refunds@ojkjobs.in</a></div>
        <div>Phone: +91</div>
        <div>Support Hours: Monday to Saturday, 10 AM – 6 PM IST</div>
      </div>
    </div>
  </div>
);

export default RefundPolicy;

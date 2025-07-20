import React, { useEffect, useState } from 'react';


interface Payment {
  id: string;
  employerName: string;
  email: string;
  plan: string;
  paymentAmount: string;
  paymentMethod: string; // UPI/Account/Other
  paymentVia: string; // PayVia (UPI, Card, etc)
  mobile: string;
  company: string;
  purchaseDate: string; // ISO date string
  nextPaymentDate: string; // ISO date string
}

const mockPayments: Payment[] = [
  {
    id: '1',
    employerName: 'Rahul Sharma',
    email: 'rahul@company.com',
    plan: 'Yearly Plan',
    paymentAmount: '₹999',
    paymentMethod: 'rahul@upi',
    paymentVia: 'UPI',
    mobile: '9876543210',
    company: 'Tech Solutions',
    purchaseDate: '2024-07-20',
    nextPaymentDate: '2025-07-20',
  },
  {
    id: '2',
    employerName: 'Priya Singh',
    email: 'priya@startup.com',
    plan: 'Continuous Plan',
    paymentAmount: '₹99',
    paymentMethod: '123456789012',
    paymentVia: 'Credit Card',
    mobile: '9123456780',
    company: 'Startup Hub',
    purchaseDate: '2025-07-01',
    nextPaymentDate: '2025-08-01',
  },
  {
    id: '3',
    employerName: 'Amit Verma',
    email: 'amit@enterprise.com',
    plan: 'Starter Plan',
    paymentAmount: '₹0',
    paymentMethod: 'amit@bank',
    paymentVia: 'Bank Transfer',
    mobile: '9988776655',
    company: 'Enterprise Inc',
    purchaseDate: '2025-06-15',
    nextPaymentDate: '2025-07-15',
  },
];



const PLAN_OPTIONS = [
  'All',
  'Starter Plan',
  'Continuous Plan',
  'Yearly Plan',
];

const PAGE_SIZE = 10;


const ManagePayment: React.FC = () => {
  const [payments] = useState<Payment[]>(mockPayments);
  const [filter, setFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [page, setPage] = useState(1);

  // Filter logic (by employer name, email, company, plan, mobile, and plan dropdown)
  const filterLower = filter.toLowerCase();
  const filteredPayments = payments.filter(p => {
    const matchesText =
      p.employerName.toLowerCase().includes(filterLower) ||
      p.email.toLowerCase().includes(filterLower) ||
      p.company.toLowerCase().includes(filterLower) ||
      p.plan.toLowerCase().includes(filterLower) ||
      p.mobile.toLowerCase().includes(filterLower);
    const matchesPlan = planFilter === 'All' || p.plan === planFilter;
    return matchesText && matchesPlan;
  });
  const totalPages = Math.ceil(filteredPayments.length / PAGE_SIZE);
  const paginatedPayments = filteredPayments.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);


  // Simulate sending expiry notification emails for plans expiring within 7 days
  useEffect(() => {
    const today = new Date();
    paginatedPayments.forEach(payment => {
      const nextDue = new Date(payment.nextPaymentDate);
      const diffDays = Math.ceil((nextDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 7 && diffDays >= 0) {
        // Simulate sending email
        console.log(`Sending expiry notification email to ${payment.email} (Employer: ${payment.employerName}) for plan '${payment.plan}' expiring on ${nextDue.toLocaleDateString()}`);
        // Here you would call your backend/email API
      }
    });
  }, [paginatedPayments]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Manage Payments</h2>

      {/* Filter/Search and Plan Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
        <div className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search payments..."
            value={filter}
            onChange={e => { setFilter(e.target.value); setPage(1); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="max-w-xs">
          <select
            value={planFilter}
            onChange={e => { setPlanFilter(e.target.value); setPage(1); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {PLAN_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {paginatedPayments.length} of {filteredPayments.length} payments
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer (Name & Email)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method & PayVia</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment Due</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPayments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex flex-col">
                    <span>{payment.employerName}</span>
                    <span className="text-xs text-gray-500">{payment.email}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">{payment.plan}</td>
                <td className="px-4 py-3 text-green-700 font-bold">{payment.paymentAmount}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-gray-700">{payment.paymentMethod}</span>
                    <span className="text-xs text-gray-500">{payment.paymentVia}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{new Date(payment.purchaseDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-orange-700 font-semibold">
                  {payment.plan === 'Starter Plan'
                    ? (payment.paymentAmount !== '₹0'
                        ? new Date(payment.nextPaymentDate).toLocaleDateString()
                        : '-')
                    : new Date(payment.nextPaymentDate).toLocaleDateString()
                  }
                </td>
                <td className="px-4 py-3 text-gray-700">{payment.mobile}</td>
                <td className="px-4 py-3 text-gray-700">{payment.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} ({filteredPayments.length} total results)
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p-1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Previous
          </button>
          {/* Page Numbers (up to 5 at a time) */}
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
            if (pageNum > totalPages) return null;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p+1))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              page === totalPages 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePayment;

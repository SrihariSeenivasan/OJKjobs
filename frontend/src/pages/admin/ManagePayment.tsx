import React, { useEffect, useState } from 'react';
import { loadPlans, Plan } from '../../utils/planStorage';

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

// Dynamically generate mock payments from latest plans
function generateMockPayments(plans: Plan[]): Payment[] {
  const employers = [
    { name: 'Rahul Sharma', email: 'rahul@company.com', mobile: '9876543210', company: 'Tech Solutions', paymentMethod: 'rahul@upi', paymentVia: 'UPI' },
    { name: 'Priya Singh', email: 'priya@startup.com', mobile: '9123456780', company: 'Startup Hub', paymentMethod: '123456789012', paymentVia: 'Credit Card' },
    { name: 'Amit Verma', email: 'amit@enterprise.com', mobile: '9988776655', company: 'Enterprise Inc', paymentMethod: 'amit@bank', paymentVia: 'Bank Transfer' },
    { name: 'Sonal Mehta', email: 'sonal@fintech.com', mobile: '9001122334', company: 'Fintech Ltd', paymentMethod: 'sonal@upi', paymentVia: 'UPI' },
    { name: 'Deepak Rao', email: 'deepak@edutech.com', mobile: '9011223344', company: 'EduTech', paymentMethod: 'deepak@upi', paymentVia: 'UPI' },
    { name: 'Anjali Patel', email: 'anjali@retail.com', mobile: '9022334455', company: 'RetailMart', paymentMethod: 'anjali@upi', paymentVia: 'UPI' },
  ];
  const today = new Date();
  return plans.map((plan, idx) => {
    const emp = employers[idx % employers.length];
    const purchaseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (idx * 3));
    const nextPaymentDate = new Date(purchaseDate);
    nextPaymentDate.setDate(purchaseDate.getDate() + 30); // 30 days after purchase
    return {
      id: `${plan.id}-${idx+1}`,
      employerName: emp.name,
      email: emp.email,
      plan: plan.title,
      paymentAmount: `₹${plan.price}`,
      paymentMethod: emp.paymentMethod,
      paymentVia: emp.paymentVia,
      mobile: emp.mobile,
      company: emp.company,
      purchaseDate: purchaseDate.toISOString(),
      nextPaymentDate: nextPaymentDate.toISOString(),
    };
  });
}

const PLAN_TYPE_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Booster Plan', value: 'boost' },
  { label: 'Credit Plan', value: 'credit' },
];

const PAGE_SIZE = 10;


const ManagePayment: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState('');
  const [planTypeFilter, setPlanTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [viewDetail, setViewDetail] = useState<{ payment: Payment; plan: Plan | undefined } | null>(null);

  // Load plans and generate payments from latest plans
  useEffect(() => {
    const loaded = loadPlans();
    setPlans(loaded || []);
    setPayments(generateMockPayments(loaded || []));
  }, []);

  // Filter logic (by employer name, email, company, plan, mobile, and plan type dropdown)
  const filterLower = filter.toLowerCase();
  const filteredPayments = payments.filter(p => {
    const matchesText =
      p.employerName.toLowerCase().includes(filterLower) ||
      p.email.toLowerCase().includes(filterLower) ||
      p.company.toLowerCase().includes(filterLower) ||
      p.plan.toLowerCase().includes(filterLower) ||
      p.mobile.toLowerCase().includes(filterLower);
    // Find plan object for planType filtering
    const planObj = plans.find(plan => plan.title === p.plan || plan.id === p.plan);
    const matchesType =
      planTypeFilter === 'all' ||
      (planTypeFilter === 'boost' && planObj?.planType === 'boost') ||
      (planTypeFilter === 'credit' && planObj?.planType === 'credit');
    return matchesText && matchesType;
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

      {/* Filter/Search and Plan Type Dropdown */}
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
            value={planTypeFilter}
            onChange={e => { setPlanTypeFilter(e.target.value); setPage(1); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {PLAN_TYPE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
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
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employer (Name & Email)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method & PayVia</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPayments.map(payment => {
              const planObj = plans.find(p => p.title === payment.plan || p.id === payment.plan);
              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span>{payment.employerName}</span>
                      <span className="text-xs text-gray-500">{payment.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">
                    {planObj ? planObj.title : payment.plan}
                    {planObj && planObj.badge && (
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${planObj.badgeColor}`}>{planObj.badge}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {planObj ? (planObj.planType === 'boost' ? 'Job Boosting' : 'Credit/Database') : '-'}
                  </td>
                  <td className="px-4 py-3 text-green-700 font-bold">{payment.paymentAmount}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-gray-700">{payment.paymentMethod}</span>
                      <span className="text-xs text-gray-500">{payment.paymentVia}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{new Date(payment.purchaseDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.mobile}</td>
                  <td className="px-4 py-3 text-gray-700">{payment.company}</td>
                  <td className="px-4 py-3">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold"
                      onClick={() => setViewDetail({ payment, plan: planObj })}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-200 w-full max-w-2xl p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-blue-700 text-2xl font-bold"
              onClick={() => setViewDetail(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Payment & Plan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Employer Details</h4>
                <div className="text-sm text-gray-800 mb-1"><b>Name:</b> {viewDetail.payment.employerName}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Email:</b> {viewDetail.payment.email}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Company:</b> {viewDetail.payment.company}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Mobile:</b> {viewDetail.payment.mobile}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Payment:</b> {viewDetail.payment.paymentAmount}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Method:</b> {viewDetail.payment.paymentMethod}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Via:</b> {viewDetail.payment.paymentVia}</div>
                <div className="text-sm text-gray-800 mb-1"><b>Purchase Date:</b> {new Date(viewDetail.payment.purchaseDate).toLocaleDateString()}</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Plan Details</h4>
                {viewDetail.plan ? (
                  <div className="space-y-1 text-sm text-gray-800">
                    <div><b>ID:</b> {viewDetail.plan.id}</div>
                    <div><b>Type:</b> {viewDetail.plan.planType}</div>
                    <div><b>Title:</b> {viewDetail.plan.title}</div>
                    <div><b>Badge:</b> {viewDetail.plan.badge}</div>
                    <div><b>Badge Color:</b> {viewDetail.plan.badgeColor}</div>
                    <div><b>Price:</b> {viewDetail.plan.price}</div>
                    <div><b>Price Description:</b> {viewDetail.plan.priceDescription}</div>
                    <div><b>Subtitle:</b> {viewDetail.plan.subtitle}</div>
                    <div><b>Popular:</b> {viewDetail.plan.popular ? 'Yes' : 'No'}</div>
                    <div><b>Savings:</b> {viewDetail.plan.savings}</div>
                    <div><b>Status:</b> {viewDetail.plan.status}</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-800">No plan details found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

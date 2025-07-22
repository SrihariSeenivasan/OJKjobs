import { useState } from "react";
import ContactPopup from "./Common/ContactPopup";

const mockProfile = {
  gstin: "27AACCM84073M1ZI",
  verified: true,
  company: "BOT DIGITAL SOLUTIONS PRIVATE LIMITED",
  address: "10TH FLOOR,1007-1008,MAHAVIR PLATINUM,OP REX,NEAR INDIAN OIL NAGAR,GOVANDI SUBURBAN Mumbai Suburban Maharashtra 400043",
};

const mockBilling = [
  { date: "24 Apr 2025 8:55:44 AM", plan: "1 Job Credit Package", planLink: "#", expires: "24 May 2025", amount: "₹ 766", status: "Success", action: "Invoice" },
  { date: "25 Apr 2025 3:01:45 AM", plan: "2 Job Credit Package", planLink: "#", expires: "-", amount: "₹ 1533", status: "Failed", action: "Contact us" },
  { date: "15 Apr 2025 1:35:46 PM", plan: "1 Job Credit Package", planLink: "#", expires: "15 May 2025", amount: "₹ 766", status: "Success", action: "Invoice" },
  { date: "16 Apr 2025 3:06:08 AM", plan: "2 Job Credit Package", planLink: "#", expires: "-", amount: "₹ 1533", status: "Failed", action: "Contact us" },
  { date: "01 Apr 2025 11:31:45 AM", plan: "1 Job Credit Package", planLink: "#", expires: "01 May 2025", amount: "₹ 766", status: "Success", action: "Invoice" },
  { date: "02 Apr 2025 3:01:47 AM", plan: "2 Job Credit Package", planLink: "#", expires: "-", amount: "₹ 1533", status: "Failed", action: "Contact us" },
  { date: "20 Mar 2025 10:14:29 AM", plan: "1 Job Credit Package", planLink: "#", expires: "19 Apr 2025", amount: "₹ 766", status: "Success", action: "Invoice" },
  { date: "21 Mar 2025 3:01:45 AM", plan: "2 Job Credit Package", planLink: "#", expires: "-", amount: "₹ 1533", status: "Failed", action: "Contact us" },
  { date: "21 Mar 2025 3:01:45 AM", plan: "1 Job Credit Package", planLink: "#", expires: "-", amount: "₹ 766", status: "Success", action: "Invoice" },
  { date: "21 Mar 2025 3:01:45 AM", plan: "2 Job Credit Package", planLink: "#", expires: "-", amount: "₹ 1533", status: "Failed", action: "Contact us" },
];
const BILLING_RESULTS_PER_PAGE = 10;

const billingFilters = [
  { label: "All", value: "all" },
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

const Billing = () => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [gstin, setGstin] = useState(mockProfile.gstin);
  const [checkbox, setCheckbox] = useState(false);

  // Handler to open invoice in new window and print as PDF
  const handleInvoiceClick = (billing: typeof mockBilling[0]) => {
    const win = window.open('', '_blank', 'width=800,height=900');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Invoice - ${billing.plan}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; }
            .header { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
            .section { margin-bottom: 16px; }
            .label { font-weight: bold; }
            .table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; }
            .table th { background: #f3f4f6; }
          </style>
        </head>
        <body>
          <div class="header">Invoice</div>
          <div class="section"><span class="label">Company:</span> ${mockProfile.company}</div>
          <div class="section"><span class="label">GSTIN:</span> ${mockProfile.gstin}</div>
          <div class="section"><span class="label">Address:</span> ${mockProfile.address}</div>
          <table class="table">
            <tr><th>Date</th><td>${billing.date}</td></tr>
            <tr><th>Plan</th><td>${billing.plan}</td></tr>
            <tr><th>Expires on</th><td>${billing.expires}</td></tr>
            <tr><th>Amount</th><td>${billing.amount}</td></tr>
          </table>
          <div style="margin-top:32px; font-size:12px; color:#888;">This is a system generated invoice.</div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const filtered = mockBilling.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'success') return b.status.toLowerCase() === 'success';
    if (filter === 'failed') return b.status.toLowerCase() === 'failed';
    if (filter === 'pending') return b.status.toLowerCase() === 'pending';
    return true;
  });
  const totalResults = filtered.length;
  const totalPages = Math.ceil(totalResults / BILLING_RESULTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * BILLING_RESULTS_PER_PAGE, page * BILLING_RESULTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(true);
    setGstin(mockProfile.gstin);
    setCheckbox(false);
  };
  const handleModalClose = () => setShowModal(false);
  const handleModalSave = () => {
    // Save logic here
    setShowModal(false);
  };

  return (
    <div className="bg-[#fafaf7] min-h-screen py-4 px-2 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg sm:text-xl font-bold mb-2">Billing</h1>
        <div className="bg-white rounded-lg border shadow-sm p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold mb-1">Billing profile</div>
              <div className="text-xs text-gray-700 mb-1">GSTIN: <span className="font-semibold">{mockProfile.gstin}</span> {mockProfile.verified && <span className="text-green-700 font-semibold ml-1">Verified</span>}</div>
              <div className="text-xs text-gray-700 mb-1">Company name: <span className="font-semibold">{mockProfile.company}</span></div>
              <div className="text-xs text-gray-700 mb-1">Address: <span className="font-semibold">{mockProfile.address}</span></div>
            </div>
            <button className="bg-white border border-gray-400 text-gray-700 rounded px-4 py-2 text-xs font-semibold self-start md:self-auto" onClick={handleModalOpen}>Update GSTIN / ISD-GSTIN</button>
          </div>
        </div>
        <div className="bg-yellow-100 border border-yellow-300 rounded flex items-center justify-between px-4 py-3 mb-4 text-xs">
          <span>🛈 If you’re registered with ISD-GSTIN, kindly update your GSTIN accordingly.</span>
          <a href="#" className="text-blue-700 underline ml-2" onClick={handleModalOpen}>Update GSTIN / ISD-GSTIN</a>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="font-semibold mb-2">Billing History</div>
          <div className="flex gap-2 mb-4">
            {billingFilters.map(f => (
              <button
                key={f.value}
                className={`px-3 py-1 rounded text-xs border font-semibold ${filter === f.value ? 'bg-blue-700 text-white border-blue-700' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
                onClick={() => { setFilter(f.value); setPage(1); }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold">
                  <th className="py-2 px-2 text-left">Date</th>
                  <th className="py-2 px-2 text-left">Plan details</th>
                  <th className="py-2 px-2 text-left">Expires on</th>
                  <th className="py-2 px-2 text-left">Amount</th>
                  <th className="py-2 px-2 text-left">Status</th>
                  <th className="py-2 px-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((b, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-2 px-2">{b.date}</td>
                    <td className="py-2 px-2"><a href={b.planLink} className="text-blue-700 underline">{b.plan}</a></td>
                    <td className="py-2 px-2">{b.expires}</td>
                    <td className="py-2 px-2">{b.amount}</td>
                    <td className="py-2 px-2">
                      {b.status === 'Success' && <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">Success</span>}
                      {b.status === 'Failed' && <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold">Failed</span>}
                      {b.status === 'Pending' && <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">Pending</span>}
                    </td>
                    <td className="py-2 px-2">
                      {b.action === 'Invoice' && (
                        <button
                          type="button"
                          className="text-blue-700 underline text-xs flex items-center gap-1"
                          onClick={() => handleInvoiceClick(b)}
                        >
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4M12 3v18" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Invoice
                        </button>
                      )}
                      {b.action === 'Contact us' && <button type="button" className="text-blue-700 underline text-xs flex items-center gap-1" onClick={() => setShowContactPopup(true)}><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.73 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.36 2.01.6 3.06.73A2 2 0 0 1 21 16.91z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Contact us</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-500">
              Showing {((page - 1) * BILLING_RESULTS_PER_PAGE) + 1}-{Math.min(page * BILLING_RESULTS_PER_PAGE, totalResults)} of {totalResults} results
            </div>
            <div className="flex gap-1">
              <button
                className={`px-2 py-1 rounded border text-xs font-semibold ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  className={`px-2 py-1 rounded border text-xs font-semibold ${page === idx + 1 ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className={`px-2 py-1 rounded border text-xs font-semibold ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showContactPopup && (
        <ContactPopup open={showContactPopup} onClose={() => setShowContactPopup(false)} />
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative animate-fade-in">
            <div className="font-semibold text-base mb-1">Update ISD-GSTIN / GSTIN Number</div>
            <div className="text-xs text-gray-500 mb-3">The tax id would appear on your future invoices.</div>
            <div className="mb-3">
              <label className="block text-xs font-semibold mb-1" htmlFor="gstin">ISD-GSTIN / GSTIN number<span className="text-red-500">*</span></label>
              <input id="gstin" type="text" className="border rounded px-3 py-2 w-full text-sm" value={gstin} onChange={e => setGstin(e.target.value)} />
            </div>
            <div className="mb-2 text-xs font-semibold">We found following company details</div>
            <div className="mb-2 text-xs">
              <div className="flex items-center gap-1 text-green-700 mb-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#d1fae5"/><path d="M8 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Company name: <span className="font-semibold text-gray-700">{mockProfile.company}</span></div>
              <div className="flex items-center gap-1 text-green-700"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#d1fae5"/><path d="M8 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Address: <span className="font-semibold text-gray-700">{mockProfile.address}</span></div>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-2">
              <input id="verify" type="checkbox" checked={checkbox} onChange={e => setCheckbox(e.target.checked)} className="accent-blue-600" />
              <label htmlFor="verify" className="text-xs text-gray-700">I verify my company details and understand that the invoices would be generated using the same information.</label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 rounded border text-sm font-semibold bg-gray-100 text-gray-700" onClick={handleModalClose}>Cancel</button>
              <button className="px-4 py-2 rounded text-sm font-semibold bg-green-700 text-white" onClick={handleModalSave} disabled={!gstin || !checkbox}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;

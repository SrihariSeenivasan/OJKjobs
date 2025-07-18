import React, { useEffect, useState } from 'react';

interface SupportTicket {
  id: string;
  subject: string;
  user: string;
  email: string;
  status: 'open' | 'pending' | 'closed';
  createdAt: string;
  updatedAt: string;
  message: string;
}

// Sample data for demonstration
const sampleTickets: SupportTicket[] = [
  {
    id: '1',
    subject: 'Unable to login',
    user: 'John Doe',
    email: 'john@example.com',
    status: 'open',
    createdAt: '2024-07-01',
    updatedAt: '2024-07-01',
    message: 'I am unable to login with my credentials.'
  },
  {
    id: '2',
    subject: 'Payment not processed',
    user: 'Jane Smith',
    email: 'jane@example.com',
    status: 'pending',
    createdAt: '2024-07-02',
    updatedAt: '2024-07-03',
    message: 'My payment is not reflecting in my account.'
  },
  {
    id: '3',
    subject: 'Profile update issue',
    user: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'closed',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-04',
    message: 'Unable to update my profile information.'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'closed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};


const AdminSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(sampleTickets.map(t => ({ ...t, status: t.status || 'pending' })));
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const PAGE_SIZE = 10;

  // Filter tickets by subject, user, or email
  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(filter.toLowerCase()) ||
    ticket.user.toLowerCase().includes(filter.toLowerCase()) ||
    ticket.email.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedTickets = filteredTickets.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const totalPages = Math.ceil(filteredTickets.length / PAGE_SIZE);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>(window.innerWidth < 768 ? 'cards' : 'table');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card view for mobile
  const renderCardView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {paginatedTickets.map(ticket => (
        <div key={ticket.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">{ticket.subject}</h3>
              <p className="text-xs text-gray-500">{ticket.user} • {ticket.email}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
          </div>
          <div className="text-sm text-gray-700 line-clamp-2">{ticket.message}</div>
          <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
            <span>Created: {ticket.createdAt}</span>
            <span>Updated: {ticket.updatedAt}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <select
              value={ticket.status}
              onChange={e => setTickets(ts => ts.map(t => t.id === ticket.id ? { ...t, status: e.target.value as SupportTicket['status'] } : t))}
              className="px-2 py-1 rounded border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="pending">Pending</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <button
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium"
              onClick={() => { setSelectedTicket(ticket); setShowModal(true); }}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Table view for desktop
  const renderTableView = () => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Updated</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-900">{ticket.subject}</td>
                <td className="px-4 py-4 text-gray-700">{ticket.user}</td>
                <td className="px-4 py-4 text-gray-500">{ticket.email}</td>
                <td className="px-4 py-4">
                  <select
                    value={ticket.status}
                    onChange={e => setTickets(ts => ts.map(t => t.id === ticket.id ? { ...t, status: e.target.value as SupportTicket['status'] } : t))}
                    className="px-2 py-1 rounded border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="pending">Pending</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-4 text-gray-400">{ticket.createdAt}</td>
                <td className="px-4 py-4 text-gray-400">{ticket.updatedAt}</td>
                <td className="px-4 py-4">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-medium"
                    onClick={() => { setSelectedTicket(ticket); setShowModal(true); }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Support Tickets</h2>
          <p className="text-gray-600">View and manage support requests from users</p>
        </div>

        {/* Filter/Search Input */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="text"
            value={filter}
            onChange={e => { setFilter(e.target.value); setPage(1); }}
            placeholder="Search by subject, user, or email..."
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm transition-all"
          />
          <span className="text-sm text-gray-500">Showing {filteredTickets.length} tickets</span>
        </div>

        {viewMode === 'cards' ? renderCardView() : renderTableView()}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages} ({tickets.length} total tickets)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p-1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
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
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal for ticket details */}
        {showModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-4 md:p-8 mx-2 md:mx-0 relative animate-fadeIn">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 transition-colors text-xl font-bold focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-blue-700 mb-3 break-words">{selectedTicket.subject}</h3>
              <div className="mb-3 text-base text-gray-700 break-words">{selectedTicket.message}</div>
              <div className="mb-4 text-xs text-gray-500 space-y-1">
                <div><span className="font-semibold text-gray-700">User:</span> {selectedTicket.user} ({selectedTicket.email})</div>
                <div><span className="font-semibold text-gray-700">Status:</span> <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTicket.status)}`}>{selectedTicket.status}</span></div>
                <div><span className="font-semibold text-gray-700">Created:</span> {selectedTicket.createdAt}</div>
                <div><span className="font-semibold text-gray-700">Updated:</span> {selectedTicket.updatedAt}</div>
              </div>
              <button
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;

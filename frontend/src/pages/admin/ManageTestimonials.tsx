import React, { useState } from 'react';

const initialTestimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Employer',
    message: 'Great platform for hiring textile workers!',
    date: '2025-07-20',
    time: '10:30',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    approved: false
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Jobseeker',
    message: 'Found my dream job in hospitality! Thank you OJK.',
    date: '2025-07-19',
    time: '15:45',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    approved: false
  }
];

const ManageTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleApprove = (id: number) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, approved: true } : t));
  };
  const handleReject = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  // Filtering
  const filtered = testimonials.filter(t => {
    const textMatch = [t.name, t.date, t.time, t.message].some(field => field.toLowerCase().includes(search.toLowerCase()));
    const roleMatch = roleFilter === 'all' ? true : t.role.toLowerCase() === roleFilter;
    return textMatch && roleMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Manage Testimonials</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name, date, time, or content"
          className="border rounded px-3 py-2 w-2/3"
        />
        <select
          value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 w-1/3"
        >
          <option value="all">All Roles</option>
          <option value="employer">Employer</option>
          <option value="jobseeker">Jobseeker</option>
        </select>
      </div>
      <div className="space-y-6">
        {paginated.map(t => (
          <div key={t.id} className={`bg-white rounded shadow p-6 flex gap-4 items-center ${t.approved ? 'border-green-400 border-2' : ''}`}>
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-blue-700">{t.name}</span>
                <span className="text-xs text-gray-500">{t.role}</span>
              </div>
              <div className="text-sm text-gray-500 mb-1 flex gap-2">
                <span>{t.date}</span>
                <span>{t.time}</span>
              </div>
              <p className="text-gray-700 mb-2">{t.message}</p>
              {!t.approved && (
                <div className="flex gap-2">
                  <button onClick={() => handleApprove(t.id)} className="bg-green-600 text-white px-3 py-1 rounded font-semibold">Approve</button>
                  <button onClick={() => handleReject(t.id)} className="bg-red-600 text-white px-3 py-1 rounded font-semibold">Reject</button>
                </div>
              )}
              {t.approved && <span className="text-green-600 font-semibold">Approved</span>}
            </div>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-gray-500">No testimonials to review.</p>}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
          >Prev</button>
          <span className="font-semibold">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;

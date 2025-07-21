import { Briefcase, Calendar, Check, Clock, Filter, Search, Star, User, UserCheck, X } from 'lucide-react';
import React, { useState } from 'react';

const initialTestimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Employer',
    message: 'Great platform for hiring textile workers! The interface is intuitive and the candidate quality is excellent. Highly recommend for manufacturing companies.',
    date: '2025-07-20',
    time: '10:30',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    approved: false,
    rating: 5
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Jobseeker',
    message: 'Found my dream job in hospitality! Thank you OJK. The application process was smooth and the support team was very helpful throughout.',
    date: '2025-07-19',
    time: '15:45',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    approved: false,
    rating: 5
  },
  {
    id: 3,
    name: 'Amit Kumar',
    role: 'Employer',
    message: 'Excellent service for recruiting skilled workers in the construction industry.',
    date: '2025-07-18',
    time: '09:15',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    approved: true,
    rating: 4
  },
  {
    id: 4,
    name: 'Sunita Patel',
    role: 'Jobseeker',
    message: 'Amazing platform! Got multiple job offers within a week of registering.',
    date: '2025-07-17',
    time: '14:20',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    approved: true,
    rating: 5
  },
  {
    id: 5,
    name: 'Sunita Patel',
    role: 'Jobseeker',
    message: 'Amazing platform! Got multiple job offers within a week of registering.',
    date: '2025-07-17',
    time: '14:20',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    approved: true,
    rating: 5
  },
  {
    id: 6,
    name: 'Sunita Patel',
    role: 'Jobseeker',
    message: 'Amazing platform! Got multiple job offers within a week of registering.',
    date: '2025-07-17',
    time: '14:20',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    approved: true,
    rating: 5
  }
];

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const pageSize = 4;

  const handleApprove = (id: number) => {
    setAnimatingId(id);
    setTimeout(() => {
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, approved: true } : t));
      setAnimatingId(null);
    }, 300);
  };

  const handleReject = (id: number) => {
    setAnimatingId(id);
    setTimeout(() => {
      setTestimonials(testimonials.filter(t => t.id !== id));
      setAnimatingId(null);
    }, 300);
  };

  // Filtering
  const filtered = testimonials.filter(t => {
    const textMatch = [t.name, t.date, t.time, t.message].some(field => 
      field.toLowerCase().includes(search.toLowerCase())
    );
    const roleMatch = roleFilter === 'all' || t.role.toLowerCase() === roleFilter;
    const statusMatch = statusFilter === 'all' || 
      (statusFilter === 'approved' && t.approved) || 
      (statusFilter === 'pending' && !t.approved);
    return textMatch && roleMatch && statusMatch;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  // Ensure page is always valid
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pendingCount = testimonials.filter(t => !t.approved).length;
  const approvedCount = testimonials.filter(t => t.approved).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Testimonials Management</h1>
              <p className="text-gray-600">Review and manage user feedback</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{testimonials.length}</p>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
                  <p className="text-sm text-gray-600">Pending Review</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{approvedCount}</p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search testimonials..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={roleFilter}
              onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Roles</option>
              <option value="employer">Employers</option>
              <option value="jobseeker">Job Seekers</option>
            </select>
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          {paginated.map(t => (
            <div 
              key={t.id} 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden
                ${t.approved ? 'ring-2 ring-green-100 bg-green-50/30' : ''}
                ${animatingId === t.id ? 'animate-pulse opacity-50' : ''}
              `}
            >
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100" 
                    />
                    {t.approved && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            {t.role === 'Employer' ? <Briefcase className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              t.role === 'Employer' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {t.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{t.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{t.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{t.message}</p>

                    <div className="flex items-center justify-between">
                      {!t.approved ? (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleApprove(t.id)}
                            disabled={animatingId === t.id}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(t.id)}
                            disabled={animatingId === t.id}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Approved & Published</span>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-400">
                        ID: #{t.id}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {paginated.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No testimonials found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    page === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTestimonials;

import { ChevronDownIcon, ChevronRightIcon, FunnelIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQ, getFAQs } from '../../admin/faqStore';
const filters = [
  {
    label: 'Date posted',
    options: [
      { label: 'Last 24 hours', value: '24h' },
      { label: 'Last 3 days', value: '3d' },
      { label: 'Last 7 days', value: '7d' },
    ],
  },
  {
    label: 'Salary',
    options: [
      { label: 'Minimum monthly salary', value: 'min' },
    ],
  },
  {
    label: 'Work Mode',
    options: [
      { label: 'Work from home', value: 'home' },
      { label: 'Work from office', value: 'office' },
      { label: 'Work from field', value: 'field' },
      { label: 'Jobs for Women', value: 'women' },
      { label: 'One Day Job', value: 'oneday' },
      { label: 'Part Time Job', value: 'parttime' },
      { label: 'Job for Fresher', value: 'fresher' },
    ],
  },
  {
    label: 'Work Shift',
    options: [
      { label: 'Day shift', value: 'day' },
      { label: 'Night shift', value: 'night' },
    ],
  },
  {
    label: 'Department',
    options: [
      { label: 'Admin / Back Office / Communication', value: 'admin' },
      { label: 'Advertising / Communication', value: 'ad' },
      { label: 'Aviation / Aerospace', value: 'aviation' },
      { label: 'Beauty, Fitness & Personal Care', value: 'beauty' },

    ],
  },
  {
    label: 'Sort By',
    options: [
      { label: 'Relevant', value: 'relevant' },
      { label: 'Salary - High to Low', value: 'salaryHigh' },
      { label: 'Date posted - New to Old', value: 'dateNew' },
    ],
  },
];

const jobs = [
  // Page 1
  {
    title: 'Electrical Engineer',
    company: 'Apexe Consultant Private Limited',
    location: 'Patparganj, Delhi-NCR',
    salary: '₹90,000 - ₹125,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Min. 10 years', 'Basic English'],
  },
  {
    title: 'Home Tutor',
    company: 'Indore Home Tutor',
    location: 'Indore',
    salary: '₹12,000 - ₹125,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'Basic English'],
  },
  {
    title: 'Delivery Boy Biker',
    company: 'Zomato',
    location: 'Sector 70, Gurgaon/Gurugram',
    salary: '₹60,000 - ₹100,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'No English'],
  },
  {
    title: 'MD Pathologist',
    company: 'K Indtech International Limited',
    location: 'Sahakara Nagar, Bangalore',
    salary: '₹160,000 - ₹210,000 monthly',
    tags: ['Work from office', 'Part Time', 'Full Time', 'Min. 1 year', 'Basic English'],
  },
  {
    title: 'Export Manager',
    company: 'Kimson India Pvt Ltd',
    location: 'Acher, Ahmedabad',
    salary: '₹100,000 - ₹100,000 monthly',
    tags: ['Work from office', 'Part Time', 'Full Time', 'Any experience', 'Data'],
  },
  // Page 2
  {
    title: 'Financial Advisor',
    company: 'Max Life Insurance Company Limited',
    location: 'Work from home',
    salary: '₹40,000 - ₹110,000 monthly',
    tags: ['Part Time', 'Any experience', 'Basic English'],
  },
  {
    title: 'Delivery Boy Biker',
    company: 'Zomato',
    location: 'Dwarka, New Delhi',
    salary: '₹60,000 - ₹100,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'No English'],
  },
  {
    title: 'Delivery Boy Biker',
    company: 'Zomato',
    location: 'Malviya Nagar, New Delhi',
    salary: '₹60,000 - ₹100,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'No English'],
  },
  {
    title: 'Delivery Boy Biker',
    company: 'Zomato',
    location: 'Sector 24, Gurgaon/Gurugram',
    salary: '₹60,000 - ₹100,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'No English'],
  },
  {
    title: 'Telugu Conversation Coach',
    company: 'INRB App',
    location: 'Work from home',
    salary: '₹50,000 - ₹100,000 monthly',
    tags: ['Part Time', 'Full Time', 'Any experience', 'Basic English'],
  },
  // Page 3
  {
    title: 'Delivery Boy Biker',
    company: 'Zomato',
    location: 'Sector 82A, Gurgaon/Gurugram',
    salary: '₹60,000 - ₹100,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'No English'],
  },
  {
    title: 'Kannada Listener',
    company: 'INRB App',
    location: 'Work from home',
    salary: '₹50,000 - ₹100,000 monthly',
    tags: ['Part Time', 'Full Time', 'Any experience', 'Basic English'],
  },
  {
    title: 'Home Tutor',
    company: 'Indore Home Tutor',
    location: 'Indore',
    salary: '₹12,000 - ₹125,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'Basic English'],
  },
  {
    title: 'Delivery Boy Biker',
    company: 'Zomato',
    location: 'Sector 27, Gurgaon/Gurugram',
    salary: '₹60,000 - ₹100,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Any experience', 'No English'],
  },
  {
    title: 'Electrical Engineer',
    company: 'Apexe Consultant Private Limited',
    location: 'Patparganj, Delhi-NCR',
    salary: '₹90,000 - ₹125,000 monthly',
    tags: ['Field Job', 'Part Time', 'Full Time', 'Min. 10 years', 'Basic English'],
  },
];


const BrowseJobs: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  useEffect(() => {
    setFaqs(getFAQs('jobseeker'));
  }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  // Filter state
  type FilterKeys = 'Date posted' | 'Salary' | 'Work Mode' | 'Work Shift' | 'Department' | 'Sort By';
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKeys, string[]>>({
    'Date posted': [],
    'Salary': [],
    'Work Mode': [],
    'Work Shift': [],
    'Department': [],
    'Sort By': [],
  });

  // Pagination logic
  const jobsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // Filtering logic
  const filteredJobs = jobs.filter(job => {
    let pass = true;
    if (selectedFilters['Work Mode'].length > 0) {
      pass = selectedFilters['Work Mode'].some(f => job.tags.includes(f));
    }
    if (pass && selectedFilters['Work Shift'].length > 0) {
      pass = selectedFilters['Work Shift'].some(f => job.tags.includes(f));
    }
    if (pass && selectedFilters['Department'].length > 0) {
      pass = selectedFilters['Department'].some(f => job.tags.includes(f));
    }
    return pass;
  });
  // Pagination slice
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const handlePrev = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);

  // Handle filter change
  const handleFilterChange = (filterLabel: FilterKeys, value: string) => {
    setSelectedFilters(prev => {
      const arr = prev[filterLabel] || [];
      if (arr.includes(value)) {
        return { ...prev, [filterLabel]: arr.filter((v: string) => v !== value) };
      } else {
        return { ...prev, [filterLabel]: [...arr, value] };
      }
    });
  };

  return (
    <div className="bg-[#f7fafd] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 pt-8 flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow p-4 flex-shrink-0 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-6">
            {filters.map((filter) => (
              <div key={filter.label}>
                <div className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FunnelIcon className="h-4 w-4 text-blue-400" />
                  {filter.label}
                </div>
                <div className="space-y-1 ml-6">
                  {filter.options.map(opt => (
                    <div key={opt.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={filter.label + '-' + opt.value}
                        className="accent-blue-500"
                        checked={selectedFilters[filter.label as FilterKeys]?.includes(opt.label) || false}
                        onChange={() => handleFilterChange(filter.label as FilterKeys, opt.label)}
                      />
                      <label htmlFor={filter.label + '-' + opt.value} className="text-gray-600 text-sm cursor-pointer">{opt.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">3902 Part Time Jobs - Find the Latest Jobs Today</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Jobs List */}
            <section className="flex-1 space-y-4">
              {paginatedJobs.map((job, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-800 text-lg">{job.title}</h2>
                      <div className="text-gray-500 text-sm">{job.company}</div>
                      <div className="text-gray-400 text-xs">{job.location}</div>
                    </div>
                    <button
                      className="group"
                      onClick={() => navigate('/jobs/apply', { state: { job } })}
                      aria-label="View job details"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-300 group-hover:text-blue-500 transition" />
                    </button>
                  </div>
                  <div className="text-blue-700 font-bold text-base">{job.salary}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  className={`px-2 py-1 rounded bg-white border text-gray-500 hover:bg-blue-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`px-3 py-1 rounded bg-white border text-gray-700 hover:bg-blue-100 font-medium ${currentPage === n ? 'bg-blue-100' : ''}`}
                    onClick={() => handlePageChange(n)}
                  >{n}</button>
                ))}
                <button
                  className={`px-2 py-1 rounded bg-white border text-gray-500 hover:bg-blue-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >Next</button>
              </div>
            </section>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 mb-6 flex flex-col items-center border border-blue-200">
                <div className="flex flex-col items-center w-full">
                  <div className="mb-3">
                    <img src="https://ui-avatars.com/api/?name=Profile&background=0D8ABC&color=fff&size=128" alt="Profile" className="w-24 h-24 object-cover rounded-full shadow-lg border border-blue-200" />
                  </div>
                  <h3 className="font-bold text-xl text-blue-900 mb-2 text-center">Create Your Profile</h3>
                  <p className="text-gray-700 text-sm text-center mb-4 px-2">Get personalized job matches, connect directly with HRs, and receive instant updates on new jobs. Stand out to top employers!</p>
                  <ul className="text-sm text-blue-800 mb-4 w-full px-2 space-y-2">
                    <li className="flex items-center gap-2"><span className="text-green-500">●</span>Personalized job matches</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">●</span>Direct connect with HRs</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">●</span>Instant job updates</li>
                  </ul>
                  <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:scale-105 transition-transform duration-150">Create Profile</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Know more about part time jobs</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full flex justify-between items-center py-3 text-left text-gray-700 font-medium focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="text-gray-600 text-sm pb-3 pl-2">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BrowseJobs;
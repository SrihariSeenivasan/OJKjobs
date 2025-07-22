
import React, { useState } from 'react';
import { FunnelIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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
  // ...add more jobs as needed for demo
];

const faqs = [
  {
    q: 'Explore Best Part-time Jobs in India',
    a: 'Find the best part-time jobs across India for students, freshers, and experienced professionals.',
  },
  {
    q: 'What are Some of the Most Popular Part-time Jobs?',
    a: 'Popular part-time jobs include delivery, tutoring, data entry, and more.',
  },
  {
    q: 'What are Some Companies Offering Part-time Jobs in India?',
    a: 'Companies like Zomato, Swiggy, and others offer part-time opportunities.',
  },
  {
    q: 'What are the Key Benefits of Having a Part-time Job?',
    a: 'Flexibility, extra income, and skill development are key benefits.',
  },
  {
    q: 'What is the Easiest Way to Find a Part-time Job in India?',
    a: 'Use OJK Jobs to browse and apply for the latest part-time jobs easily.',
  },
];

const BrowseJobs: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  // Filtering logic
  const filteredJobs = jobs.filter(job => {
    // Date posted, Salary, Sort By are not implemented for demo data
    // Work Mode, Work Shift, Department are demo only
    // We'll filter by tags for demo
    let pass = true;
    // Work Mode
    if (selectedFilters['Work Mode'].length > 0) {
      pass = selectedFilters['Work Mode'].some(f => job.tags.includes(f));
    }
    // Work Shift
    if (pass && selectedFilters['Work Shift'].length > 0) {
      pass = selectedFilters['Work Shift'].some(f => job.tags.includes(f));
    }
    // Department
    if (pass && selectedFilters['Department'].length > 0) {
      pass = selectedFilters['Department'].some(f => job.tags.includes(f));
    }
    // You can add more filter logic as needed
    return pass;
  });

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
              {filteredJobs.map((job, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-800 text-lg">{job.title}</h2>
                      <div className="text-gray-500 text-sm">{job.company}</div>
                      <div className="text-gray-400 text-xs">{job.location}</div>
                    </div>
                    <ChevronRightIcon className="h-6 w-6 text-gray-300" />
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
                <button className="px-2 py-1 rounded bg-white border text-gray-500 hover:bg-blue-50">Prev</button>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <button key={n} className="px-3 py-1 rounded bg-white border text-gray-700 hover:bg-blue-100 font-medium">{n}</button>
                ))}
                <button className="px-2 py-1 rounded bg-white border text-gray-500 hover:bg-blue-50">Next</button>
              </div>
            </section>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-blue-50 rounded-xl shadow p-4 mb-6 flex flex-col items-center">
                <h3 className="font-semibold text-blue-900 mb-2 text-center">Know more about Part Time Jobs</h3>
                <ul className="text-sm text-blue-800 mb-2">
                  <li>✔️ Personalised job matches</li>
                  <li>✔️ Direct connect with HRs</li>
                  <li>✔️ Latest updates on the job</li>
                </ul>
                <img src="/assets/social/fb.png" alt="App" className="w-28 h-44 object-contain mx-auto mb-2" />
                <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition-colors">Create profile »</button>
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
export const mockJobs = [
  {
    id: 'job1',
    title: 'Frontend Developer',
    description: 'Develop and maintain web applications using React and TypeScript.',
    location: 'Remote',
    salary: '₹8,00,000 - ₹12,00,000',
    postedDate: '2024-07-01',
    employerId: '1',
    requirements: ['React', 'TypeScript', 'REST APIs'],
    status: 'active',
  },
  {
    id: 'job2',
    title: 'Backend Engineer',
    description: 'Work on Node.js and Express backend services.',
    location: 'Bangalore, India',
    salary: '₹10,00,000 - ₹15,00,000',
    postedDate: '2024-07-05',
    employerId: '1',
    requirements: ['Node.js', 'Express', 'MongoDB'],
    status: 'active',
  },
  {
    id: 'job3',
    title: 'UI/UX Designer',
    description: 'Design user interfaces and experiences for mobile and web.',
    location: 'Remote',
    salary: '₹6,00,000 - ₹9,00,000',
    postedDate: '2024-07-10',
    employerId: '3',
    requirements: ['Figma', 'Adobe XD', 'Creativity'],
    status: 'active',
  },
  {
    id: 'job4',
    title: 'Energy Analyst',
    description: 'Analyze energy consumption and optimize usage.',
    location: 'Hyderabad, India',
    salary: '₹7,00,000 - ₹10,00,000',
    postedDate: '2024-07-12',
    employerId: '2',
    requirements: ['Excel', 'Data Analysis', 'Energy Sector Knowledge'],
    status: 'active',
  },
];

export const mockEmployers = [
  {
    id: '1',
    companyName: 'Tech Solutions Inc.',
    contactPerson: 'John Doe',
    email: 'john@techsolutions.com',
    phone: '+1-555-0123',
    industry: 'Technology',
    companySize: '50-100',
    registrationDate: '2024-01-15',
    status: 'pending',
    documents: ['business_license.pdf', 'tax_certificate.pdf'],
    jobsPosted: 5,
    address: '123 Tech Street, Silicon Valley, CA',
    jobs: [
     
      ...mockJobs.filter(j => j.employerId === '1')
    ]
  },
  {
    id: '2',
    companyName: 'Green Energy Corp',
    contactPerson: 'Sarah Wilson',
    email: 'sarah@greenenergy.com',
    phone: '+1-555-0456',
    industry: 'Energy',
    companySize: '100-500',
    registrationDate: '2024-01-20',
    status: 'approved',
    documents: ['business_license.pdf', 'environmental_cert.pdf'],
    jobsPosted: 12,
    address: '456 Green Ave, Portland, OR',
    jobs: [
    
      ...mockJobs.filter(j => j.employerId === '2')
    ]
  },
  {
    id: '3',
    companyName: 'Design Studio Pro',
    contactPerson: 'Mike Johnson',
    email: 'mike@designstudio.com',
    phone: '+1-555-0789',
    industry: 'Design',
    companySize: '10-50',
    registrationDate: '2024-02-01',
    status: 'rejected',
    documents: ['portfolio.pdf'],
    jobsPosted: 2,
    address: '789 Creative Blvd, New York, NY',
    jobs: [
      
      ...mockJobs.filter(j => j.employerId === '3')
    ]
  }
];

export const mockEmployees = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@email.com',
    phone: '+1-555-1111',
    registrationDate: '2024-01-10',
    kycStatus: 'verified',
    profileComplete: 95,
    skills: ['React', 'Node.js', 'Python'],
    experience: '5 years',
    resume: 'alice_resume.pdf',
    location: 'San Francisco, CA',
    jobsApplied: 8,
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: '2',
    name: 'Bob Brown',
    email: 'bob@email.com',
    phone: '+1-555-2222',
    registrationDate: '2024-01-15',
    kycStatus: 'pending',
    profileComplete: 70,
    skills: ['Java', 'Spring Boot', 'MySQL'],
    experience: '3 years',
    resume: 'bob_resume.pdf',
    location: 'Austin, TX',
    jobsApplied: 12,
    profileImage: '/api/placeholder/40/40'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@email.com',
    phone: '+1-555-3333',
    registrationDate: '2024-02-01',
    kycStatus: 'rejected',
    profileComplete: 45,
    skills: ['UI/UX', 'Figma', 'Adobe Creative Suite'],
    experience: '2 years',
    resume: 'carol_resume.pdf',
    location: 'Los Angeles, CA',
    jobsApplied: 5,
    profileImage: '/api/placeholder/40/40'
  }
];

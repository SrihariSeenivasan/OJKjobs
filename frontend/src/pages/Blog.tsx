import React from 'react';

const sampleBlogs = [
  {
    id: 1,
    title: 'Welcome to OJK Jobs!',
    date: '2025-07-01',
    author: 'Admin',
    content: 'We are excited to launch our new job portal for textile and hospitality workers. Stay tuned for updates and new features!',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'How to Apply for Jobs Effectively',
    date: '2025-07-10',
    author: 'Admin',
    content: 'Tips and tricks for jobseekers: upload a clear resume, highlight your skills, and write a short cover letter to stand out.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Employer Panel Launched',
    date: '2025-07-15',
    author: 'Admin',
    content: 'Employers can now post jobs and manage applications directly from their dashboard. Contact us for support.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
  }
];

const Blog: React.FC = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">OJK Blog</h1>
        <p className="mb-8 text-gray-600">Latest updates, news, and articles from OJK Jobs.</p>
        <div className="space-y-6">
          {sampleBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded shadow p-6">
              {blog.image && (
                <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover rounded mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-2 text-blue-700">{blog.title}</h2>
              <div className="text-sm text-gray-500 mb-2 flex justify-between">
                <span>By {blog.author}</span>
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;

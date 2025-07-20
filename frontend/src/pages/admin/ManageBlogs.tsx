import React, { useState } from 'react';

interface Blog {
  id: number;
  title: string;
  content: string;
  image?: string;
  author: string;
  date: string;
}

const ManageBlogs: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const author = 'Admin';
  const date = new Date().toISOString().slice(0, 10);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      id: blogs.length + 1,
      title,
      content,
      image,
      author,
      date,
    };
    setBlogs([newBlog, ...blogs]);
    setTitle('');
    setContent('');
    setImage('');
    setPage(1);
  };

  const totalPages = Math.ceil(blogs.length / pageSize);
  const paginated = blogs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Post a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Blog Content"
          className="w-full border rounded px-3 py-2 min-h-[120px]"
          required
        />
        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          className="w-full border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Post Blog</button>
      </form>
      <h2 className="text-xl font-bold mb-2">Posted Blogs</h2>
      <div className="space-y-4">
        {paginated.map(blog => (
          <div key={blog.id} className="bg-white rounded shadow p-4">
            {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded mb-2" />}
            <h3 className="text-lg font-semibold text-blue-700 mb-1">{blog.title}</h3>
            <div className="text-xs text-gray-500 mb-1 flex justify-between">
              <span>By {blog.author}</span>
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))}
        {paginated.length === 0 && <p className="text-gray-500">No blogs to show.</p>}
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

export default ManageBlogs;

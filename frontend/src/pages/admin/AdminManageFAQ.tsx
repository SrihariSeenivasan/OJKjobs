import { Briefcase, Edit3, HelpCircle, Plus, Trash2, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface FAQ {
  q: string;
  a: string;
  type: 'employer' | 'jobseeker';
}

type FAQPage = 'BuyPackageFAQ' | 'CreditsWorksPopup' | 'BrowseJobs';

interface AdminFAQ extends FAQ {
  page: FAQPage;
}

const FAQ_STORAGE_KEY = 'admin_faqs';

const AdminManageFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<AdminFAQ[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState<'employer' | 'jobseeker'>('employer');
  const [page, setPage] = useState<FAQPage>('BuyPackageFAQ');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'employer' | 'jobseeker'>('all');

  useEffect(() => {
    const stored = localStorage.getItem(FAQ_STORAGE_KEY);
    if (stored) {
      const rawFaqs = JSON.parse(stored);
      const migratedFaqs: AdminFAQ[] = (rawFaqs as Partial<AdminFAQ>[]).map((faq) => ({
        q: faq.q ?? '',
        a: faq.a ?? '',
        type: faq.type ?? 'employer',
        page: faq.page || (faq.type === 'employer' ? 'BuyPackageFAQ' : 'BrowseJobs'),
      }));
      setFaqs(migratedFaqs);
    }
  }, []);

  const saveFaqs = (newFaqs: AdminFAQ[]) => {
    setFaqs(newFaqs);
    localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(newFaqs));
  };

  const handleAddOrEdit = () => {
    if (!question.trim() || !answer.trim()) return;
    const newFaq: AdminFAQ = { q: question.trim(), a: answer.trim(), type, page };
    let updatedFaqs;
    if (editIdx !== null) {
      updatedFaqs = faqs.map((faq, idx) => idx === editIdx ? newFaq : faq);
    } else {
      updatedFaqs = [...faqs, newFaq];
    }
    saveFaqs(updatedFaqs);
    resetForm();
  };

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setType('employer');
    setPage('BuyPackageFAQ');
    setEditIdx(null);
  };

  const handleEdit = (idx: number) => {
    setQuestion(faqs[idx].q);
    setAnswer(faqs[idx].a);
    setType(faqs[idx].type);
    setPage(faqs[idx].page);
    setEditIdx(idx);
  };

  const handleDelete = (idx: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== idx);
    saveFaqs(updatedFaqs);
    if (editIdx === idx) {
      resetForm();
    }
  };

  const filteredFaqs = faqs.filter(faq => filterType === 'all' || faq.type === filterType);

  const getTypeIcon = (type: 'employer' | 'jobseeker') => {
    return type === 'employer' ? <Briefcase className="w-4 h-4" /> : <Users className="w-4 h-4" />;
  };

  const getTypeBadgeClass = (type: 'employer' | 'jobseeker') => {
    return type === 'employer' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">FAQ Management</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage frequently asked questions for employers and job seekers</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  {editIdx !== null ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Question Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Question</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="What question do users frequently ask?"
                  />
                </div>

                {/* Answer Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Answer</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Provide a clear and helpful answer..."
                    rows={4}
                  />
                </div>

                {/* Type and Page Selection */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">User Type</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={type}
                      onChange={e => {
                        const newType = e.target.value as 'employer' | 'jobseeker';
                        setType(newType);
                        setPage(newType === 'employer' ? 'BuyPackageFAQ' : 'BrowseJobs');
                      }}
                    >
                      <option value="employer">👔 Employer</option>
                      <option value="jobseeker">👥 Job Seeker</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Page Location</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={page}
                      onChange={e => setPage(e.target.value as FAQPage)}
                    >
                      {type === 'employer' ? (
                        <>
                          <option value="BuyPackageFAQ">Buy Package FAQ</option>
                          <option value="CreditsWorksPopup">Credits Works Popup</option>
                        </>
                      ) : (
                        <option value="BrowseJobs">Browse Jobs</option>
                      )}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                    onClick={handleAddOrEdit}
                    disabled={!question.trim() || !answer.trim()}
                  >
                    {editIdx !== null ? (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Update FAQ
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add FAQ
                      </>
                    )}
                  </button>
                  
                  {editIdx !== null && (
                    <button
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ List Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">FAQ List ({filteredFaqs.length})</h3>
                  
                  {/* Filter Buttons */}
                  <div className="flex rounded-lg bg-gray-700 p-1">
                    {(['all', 'employer', 'jobseeker'] as const).map((filterOption) => (
                      <button
                        key={filterOption}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                          filterType === filterOption
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-300 hover:text-white'
                        }`}
                        onClick={() => setFilterType(filterOption)}
                      >
                        {filterOption === 'all' ? 'All' : filterOption === 'employer' ? '👔 Employer' : '👥 Job Seeker'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredFaqs.length === 0 ? (
                  <div className="p-8 text-center">
                    <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No FAQs found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {filterType === 'all' ? 'Add your first FAQ to get started' : `No ${filterType} FAQs yet`}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredFaqs.map((faq, idx) => (
                      <div key={idx} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            {/* Type Badge */}
                            <div className="flex items-center mb-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeClass(faq.type)}`}>
                                {getTypeIcon(faq.type)}
                                <span className="ml-1.5 capitalize">{faq.type}</span>
                              </span>
                              <span className="ml-3 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                {faq.page}
                              </span>
                            </div>
                            {/* Question */}
                            <h4 className="font-semibold text-gray-900 mb-2 leading-tight">
                              {faq.q}
                            </h4>
                            {/* Answer */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 lg:ml-4">
                            <button
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              onClick={() => handleEdit(idx)}
                            >
                              <Edit3 className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                              onClick={() => handleDelete(idx)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageFAQ;
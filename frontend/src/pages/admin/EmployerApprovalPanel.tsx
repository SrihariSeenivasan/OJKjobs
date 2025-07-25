import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { approveEmployer, setEmployerCategory } from '../../store/slices/employerSlice';

const EmployerApprovalPanel: React.FC = () => {
  const employers = useSelector((state: RootState) => state.employers.employers);
  const dispatch = useDispatch();

  const handleApprove = (id: string) => {
    dispatch(approveEmployer(id));
  };

  const handleCategoryChange = (id: string, category: string) => {
    dispatch(setEmployerCategory({ id, category }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Employer Approvals</h2>
      <table className="min-w-full divide-y divide-gray-200 mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {employers.map(emp => (
            <tr key={emp.id}>
              <td className="px-4 py-2 font-medium text-gray-900">{emp.name}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">
                <select
                  value={emp.category}
                  onChange={e => handleCategoryChange(emp.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="MSME">MSME</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${emp.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {emp.status === 'approved' ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="px-4 py-2">
                {emp.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(emp.id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-xs"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="text-lg font-semibold mb-2">Employer Activity Log</h3>
      <div className="bg-gray-50 rounded p-4 text-sm">
        {employers.map(emp => (
          <div key={emp.id} className="mb-2">
            <span className="font-bold text-gray-800">{emp.name}:</span> {emp.activityLog.join(' | ')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerApprovalPanel;

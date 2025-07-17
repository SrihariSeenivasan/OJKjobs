import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/slices/authSlice';
import { UserCircleIcon, EnvelopeIcon, IdentificationIcon } from '@heroicons/react/24/solid';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <div className="p-8 text-center">No user data found.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setFormData({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      dispatch(setUser({
        ...user,
        name: formData.name,
        email: formData.email,
      }));
      setIsEditing(false);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="rounded-2xl shadow-xl bg-white/90 p-8 flex flex-col md:flex-row items-center gap-8 border-t-8 border-blue-500 relative">
          {/* Avatar and Edit */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-full p-2 mb-2">
              <UserCircleIcon className="h-28 w-28 text-white drop-shadow-lg" />
            </div>
            <button
              onClick={handleEdit}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
              style={{ display: isEditing ? 'none' : 'block' }}
            >
              Edit Profile
            </button>
          </div>
          {/* Info */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 flex items-center gap-4 shadow">
                <IdentificationIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="text-xs text-blue-700 font-semibold uppercase">OJK Job ID</div>
                  <div className="text-lg font-bold text-blue-900 tracking-wider">{user.id}</div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-5 flex items-center gap-4 shadow">
                <UserCircleIcon className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-xs text-green-700 font-semibold uppercase">Name</div>
                  <div className="text-lg font-bold text-green-900">{user.name}</div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-5 flex items-center gap-4 shadow md:col-span-2">
                <EnvelopeIcon className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="text-xs text-yellow-700 font-semibold uppercase">Email</div>
                  <div className="text-lg font-bold text-yellow-900">{user.email || <span className="italic text-gray-400">Not Provided</span>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
              <h3 className="text-xl font-bold mb-6 text-blue-700 text-center">Edit Profile</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">{isLoading ? 'Saving...' : 'Save'}</button>
                  <button type="button" onClick={handleCancel} className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

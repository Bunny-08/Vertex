import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateUser({ name, bio });
    setIsEditing(false);
    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Identity Settings</h1>
        <p className="text-gray-400 font-medium hidden sm:block">Update your operative profile credentials.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative group">
            <img 
              src={user?.avatar} 
              className="w-32 h-32 rounded-lg border-4 border-gray-50 dark:border-gray-800 shadow-md group-hover:border-indigo-500 transition-all" 
              alt="Operative" 
            />
          </div>
          <div className="flex-1 w-full">
            {!isEditing ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Assigned Name</h3>
                  <p className="text-xl font-bold">{user?.name}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Email Hash</h3>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Bio / Intel</h3>
                  <p className="text-sm text-gray-500 leading-relaxed italic">
                    {user?.bio || 'No profile data recorded. Initiate edit to provide objective background.'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Modify Credentials
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Operative Bio</label>
                  <textarea 
                    value={bio} 
                    onChange={e => setBio(e.target.value)} 
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" 
                    rows={4}
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button 
                    type="submit" 
                    disabled={saving} 
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-bold text-xs uppercase tracking-widest shadow-md transition-all"
                  >
                    {saving ? 'Saving...' : 'Sync Profile'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-2.5 rounded-md font-bold text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-700 hover:bg-gray-200 transition-all"
                  >
                    Abort
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Meta Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-medium text-gray-500">
          <p><span className="font-black text-gray-900 dark:text-gray-300 mr-2 uppercase">Operative ID:</span> {user?.id}</p>
          <p><span className="font-black text-gray-900 dark:text-gray-300 mr-2 uppercase">Date Enlisted:</span> {new Date(user?.createdAt || '').toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {} finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-tighter text-indigo-600 mb-2">VERTEX</h1>
          <p className="text-gray-500 font-medium tracking-wide">Command Center Access</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900 uppercase tracking-tight">Login</h2>
          {error && <div className="text-red-500 text-xs font-bold mb-4 p-2 bg-red-50 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-widest">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-md shadow-lg shadow-indigo-100 transition-all uppercase tracking-widest"
            >
              {loading ? 'Processing...' : 'Authorize Access'}
            </button>
          </form>
          <div className="mt-8 text-center text-xs text-gray-500 font-medium">
            New operative? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register Credentials</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {} finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-tighter text-indigo-600 mb-2">VERTEX</h1>
          <p className="text-gray-500 font-medium tracking-wide">Operative Enrollment</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900 uppercase tracking-tight">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-widest">Full Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-widest">Master Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-md shadow-lg shadow-indigo-100 transition-all uppercase tracking-widest"
            >
              {loading ? 'Creating Identity...' : 'Initialize Identity'}
            </button>
          </form>
          <div className="mt-8 text-center text-xs text-gray-500 font-medium">
            Already registered? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Proceed to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

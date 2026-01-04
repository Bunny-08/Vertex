import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <span className="text-2xl font-black tracking-tighter text-indigo-600">VERTEX</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map(link => (
            <Link 
              key={link.to}
              to={link.to} 
              className={`block px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                location.pathname === link.to 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button onClick={logout} className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <div className="md:hidden font-black tracking-tighter text-indigo-600 text-xl">VERTEX</div>
          <div className="hidden md:block text-sm font-medium text-gray-400 uppercase tracking-widest">
            {location.pathname.replace('/', '')}
          </div>
          
          <div className="flex items-center space-x-6">
            <button onClick={toggleDarkMode} className="text-gray-500 hover:text-indigo-600 transition-colors">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Link to="/profile" className="flex items-center space-x-3 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold group-hover:text-indigo-600 transition-colors">{user?.name}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase">{user?.email}</p>
              </div>
              <img src={user?.avatar} className="w-8 h-8 rounded-full border border-gray-200 group-hover:border-indigo-500 transition-all" alt="User" />
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

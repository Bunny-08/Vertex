import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Login, Register } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-[10px]">Securely loading session</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  
  return <>{children}</>;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Default Redirection */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

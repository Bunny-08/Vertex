import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockApi } from '../services/mockApi';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: localStorage.getItem('nova_token'),
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState(null);

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem('nova_token');
    if (token) {
      const response = await mockApi.getProfile(token);
      if (response.success && response.data) {
        setState({
          user: response.data,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        localStorage.removeItem('nova_token');
        setState(prev => ({ ...prev, token: null, isAuthenticated: false, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (email, password) => {
    setError(null);
    setState(prev => ({ ...prev, isLoading: true }));
    const response = await mockApi.login(email, password);
    if (response.success && response.data) {
      localStorage.setItem('nova_token', response.data.token);
      setState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setError(response.error || 'Login failed');
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error(response.error);
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    setState(prev => ({ ...prev, isLoading: true }));
    const response = await mockApi.register(name, email, password);
    if (response.success && response.data) {
      localStorage.setItem('nova_token', response.data.token);
      setState({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setError(response.error || 'Registration failed');
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error(response.error);
    }
  };

  const logout = () => {
    localStorage.removeItem('nova_token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = async (updates) => {
    if (!state.token) return;
    const response = await mockApi.updateProfile(state.token, updates);
    if (response.success && response.data) {
      setState(prev => ({ ...prev, user: response.data || prev.user }));
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

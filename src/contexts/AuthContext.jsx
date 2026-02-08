import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    
    if (token) {
      api.setToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.getProfile();
      if (response.status === 'success' && response.data) {
        setUser(response.data.user || response.data);
      } else {
        // Token invalid, clear it
        api.setToken(null);
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      // Network error or token expired, clear it
      api.setToken(null);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const response = await api.login(username, password);
    if (response.status === 'success') {
      setUser(response.data.user || response.data.admin);
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

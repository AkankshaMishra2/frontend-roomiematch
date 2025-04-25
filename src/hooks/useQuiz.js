// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
// You would typically use Firebase, Auth0, NextAuth or a custom auth service here
// This is a simplified mock for demonstration

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem('roomieMatchUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signin = useCallback(async (email, password) => {
    // Implement actual signin logic here
    setLoading(true);
    try {
      // Mock signin - replace with actual auth
      const mockUser = { 
        id: 'user123',
        email,
        name: email.split('@')[0]
      };
      
      localStorage.setItem('roomieMatchUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email, password, name) => {
    // Implement actual signup logic here
    setLoading(true);
    try {
      // Mock signup - replace with actual auth
      const mockUser = { 
        id: 'user123',
        email,
        name: name || email.split('@')[0]
      };
      
      localStorage.setItem('roomieMatchUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const signout = useCallback(async () => {
    // Implement actual signout logic here
    localStorage.removeItem('roomieMatchUser');
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    signin,
    signup,
    signout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
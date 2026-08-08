import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { loginAdmin, getAdminProfile } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('treatmed_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  const isAdmin = Boolean(user && (user.role === 'admin' || user.email === 'admin@treatmed.in'));

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('treatmed_admin_token');
      if (token) {
        try {
          const profile = await getAdminProfile();
          setUser(profile);
          localStorage.setItem('treatmed_admin_user', JSON.stringify(profile));
        } catch {
          // Token expired or invalid
          setUser(null);
          localStorage.removeItem('treatmed_admin_token');
          localStorage.removeItem('treatmed_admin_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await loginAdmin(email, pass);
      setUser(res);
      localStorage.setItem('treatmed_admin_user', JSON.stringify(res));
      addToast('success', 'Admin Sign In Successful', `Welcome back, ${res.name}!`);
      return true;
    } catch (err: any) {
      addToast('error', 'Login Failed', err.message || 'Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('treatmed_admin_token');
    localStorage.removeItem('treatmed_admin_user');
    addToast('info', 'Logged Out', 'You have signed out from the Treatmed Admin Console.');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

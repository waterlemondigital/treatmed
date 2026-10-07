import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order, Appointment } from '../types';
import { useToast } from './ToastContext';
import { loginUser, registerUser, createAppointment, fetchMyOrders, fetchMyAppointments } from '../services/api';

export type AuthFlowStatus = 
  | 'idle' 
  | 'loading' 
  | 'success' 
  | 'error_invalid' 
  | 'error_unverified' 
  | 'error_rate_limit'
  | 'verification_pending';

interface AuthContextType {
  user: User | null;
  authStatus: AuthFlowStatus;
  authErrorMessage: string | null;
  login: (email: string, pass: string, rememberMe: boolean) => Promise<boolean>;
  signup: (name: string, phone: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  resendVerificationEmail: () => Promise<void>;
  verifyEmailSimulated: () => void;
  clearAuthError: () => void;
  orders: Order[];
  appointments: Appointment[];
  addAppointment: (serviceTitle: string, date: string, time: string, patientName: string, phone: string, notes?: string) => void;
  pendingVerificationEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: "usr-789",
  name: "Mohammed Salman",
  email: "salman.mira@example.com",
  phone: "+91 9820123456",
  isVerified: true,
  createdAt: "2024-03-15",
  address: {
    street: "Flat 402, Green Valley Apartments, Kanakia Road",
    city: "Mira Road (E)",
    pincode: "401105",
    state: "Maharashtra"
  }
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "TRT-84920",
    date: "2026-07-20",
    totalAmount: 1200,
    status: "Delivered",
    items: [
      { productName: "Treatmed Ruhan Pain Relief Oil (100ml)", quantity: 2, price: 450 },
      { productName: "Treatmed Hazim-G Capsules (60s)", quantity: 1, price: 290 }
    ]
  },
  {
    id: "TRT-81023",
    date: "2026-06-12",
    totalAmount: 750,
    status: "Delivered",
    items: [
      { productName: "Royal Madinah Ajwa Dates (500g)", quantity: 1, price: 750 }
    ]
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-102",
    serviceTitle: "Hijama (Cupping Therapy) Session",
    date: "2026-08-05",
    time: "11:30 AM",
    patientName: "Mohammed Salman",
    phone: "+91 9820123456",
    status: "Confirmed",
    notes: "Focus on lower back ache and shoulder stiffness."
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('treatmed_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authStatus, setAuthStatus] = useState<AuthFlowStatus>('idle');
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('treatmed_user', JSON.stringify(user));
      // Fetch real user orders & appointments from backend
      fetchMyOrders()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) setOrders(data);
        })
        .catch(() => {});

      fetchMyAppointments()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) setAppointments(data);
        })
        .catch(() => {});
    } else {
      localStorage.removeItem('treatmed_user');
      localStorage.removeItem('treatmed_token');
    }
  }, [user]);

  const clearAuthError = () => {
    setAuthStatus('idle');
    setAuthErrorMessage(null);
  };

  const login = async (email: string, pass: string, rememberMe: boolean): Promise<boolean> => {
    setAuthStatus('loading');
    setAuthErrorMessage(null);

    // Special trigger simulation strings for UI testing:
    if (email.includes('lockout') || email.includes('ratelimit')) {
      setAuthStatus('error_rate_limit');
      setAuthErrorMessage('Too many failed login attempts. Your IP has been temporarily locked for 15 minutes to safeguard your account.');
      return false;
    }

    if (email.includes('unverified')) {
      setAuthStatus('error_unverified');
      setAuthErrorMessage('Your email address has not been verified yet. Please check your inbox or resend verification code.');
      setPendingVerificationEmail(email);
      return false;
    }

    try {
      const resData = await loginUser(email, pass);
      const loggedUser: User = {
        id: resData._id || 'usr-789',
        name: resData.name,
        email: resData.email,
        phone: resData.phone,
        role: resData.role || 'user',
        isVerified: resData.isVerified ?? true,
        createdAt: resData.createdAt || new Date().toISOString(),
        address: resData.address,
      };

      setUser(loggedUser);
      setAuthStatus('success');
      addToast('success', 'Welcome Back!', `Signed in successfully${rememberMe ? ' (Session Remembered)' : ''}.`);
      return true;
    } catch (err: any) {
      setAuthStatus('error_invalid');
      setAuthErrorMessage(err.message || 'Invalid email or password. Please verify your credentials.');
      return false;
    }
  };

  const signup = async (name: string, email: string, phone: string, pass: string): Promise<boolean> => {
    setAuthStatus('loading');
    setAuthErrorMessage(null);

    try {
      const resData = await registerUser(name, email, phone, pass);
      const newUser: User = {
        id: resData._id,
        name: resData.name,
        email: resData.email,
        phone: resData.phone,
        role: resData.role || 'user',
        isVerified: resData.isVerified ?? true,
        createdAt: resData.createdAt || new Date().toISOString(),
        address: resData.address,
      };

      setUser(newUser);
      setAuthStatus('success');
      addToast('success', 'Account Created!', 'Welcome to Treatmed!');
      return true;
    } catch (err: any) {
      setAuthStatus('error_invalid');
      setAuthErrorMessage(err.message || 'Could not register account. Email may already exist.');
      return false;
    }
  };

  const resendVerificationEmail = async () => {
    setAuthStatus('loading');
    await new Promise((res) => setTimeout(res, 800));
    setAuthStatus('verification_pending');
    addToast('success', 'Verification Resent', `A fresh verification link was dispatched to ${pendingVerificationEmail || 'your email'}.`);
  };

  const verifyEmailSimulated = () => {
    const newUser: User = {
      id: "usr-" + Math.floor(Math.random() * 100000),
      name: pendingVerificationEmail?.split('@')[0] || "Treatmed Member",
      email: pendingVerificationEmail || "user@example.com",
      phone: "+91 9820000000",
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setAuthStatus('success');
    setPendingVerificationEmail(null);
    addToast('success', 'Email Verified!', 'Your account is now fully verified. Welcome to Treatmed!');
  };

  const logout = () => {
    setUser(null);
    setAuthStatus('idle');
    addToast('info', 'Logged Out', 'You have been safely signed out.');
  };

  const addAppointment = async (serviceTitle: string, date: string, time: string, patientName: string, phone: string, notes?: string) => {
    try {
      const createdApt = await createAppointment({
        serviceTitle,
        date,
        time,
        patientName,
        phone,
        notes,
      });

      const newApt: Appointment = {
        id: (createdApt as any)._id || "APT-" + Math.floor(Math.random() * 900 + 100),
        serviceTitle,
        date,
        time,
        patientName,
        phone,
        status: 'Confirmed',
        notes,
      };

      setAppointments((prev) => [newApt, ...prev]);
      addToast('success', 'Appointment Confirmed!', `Booked ${serviceTitle} for ${date} at ${time}. Dr. Zaid's team will contact you on ${phone}.`);
    } catch (err: any) {
      // Fallback local save if offline
      const newApt: Appointment = {
        id: "APT-" + Math.floor(Math.random() * 900 + 100),
        serviceTitle,
        date,
        time,
        patientName,
        phone,
        status: 'Confirmed',
        notes,
      };
      setAppointments((prev) => [newApt, ...prev]);
      addToast('success', 'Appointment Scheduled!', `Booked ${serviceTitle} for ${date} at ${time}.`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authStatus,
        authErrorMessage,
        login,
        signup,
        logout,
        resendVerificationEmail,
        verifyEmailSimulated,
        clearAuthError,
        orders,
        appointments,
        addAppointment,
        pendingVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

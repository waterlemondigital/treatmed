import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PageView } from '../types';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { 
  User, 
  Package, 
  Calendar, 
  MapPin, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';

interface AccountPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ setCurrentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'orders' | 'appointments' | 'profile'>('orders');

  if (!isAuthenticated || !user) {
    return (
      <div className="py-20 bg-[#FBF8F2] min-h-screen flex items-center justify-center text-center">
        <div className="max-w-md px-4 space-y-4">
          <User className="w-16 h-16 text-[#B9964A] mx-auto" />
          <h2 className="font-serif font-bold text-2xl text-[#1E1B16]">
            Please Log In
          </h2>
          <p className="text-xs text-[#4A453D]">
            You need to be logged into your Treatmed account to view patient orders & appointment schedules.
          </p>
          <Button variant="primary" onClick={() => setCurrentPage({ type: 'login' })}>
            Sign In Now
          </Button>
        </div>
      </div>
    );
  }

  const mockOrders = [
    {
      id: 'TM-98214',
      date: '18 Oct 2024',
      status: 'Delivered',
      items: ['Treatmed Kalonji Hair Oil (200ml)', 'Wild Sidr Honey (500g)'],
      total: 1040,
    },
    {
      id: 'TM-98012',
      date: '02 Sep 2024',
      status: 'Delivered',
      items: ['Ajwa Dates Premium (1kg)', 'Unani Gastritis Tablets'],
      total: 1250,
    }
  ];

  const mockAppointments = [
    {
      id: 'APT-104',
      service: 'Hijama (Wet Cupping Therapy)',
      doctor: 'Dr. Hkm. Zaid Abdul Aziz',
      date: '25 Nov 2024',
      time: '04:30 PM',
      status: 'Confirmed (In-Clinic)',
    },
    {
      id: 'APT-088',
      service: 'Unani Pulse Diagnosis',
      doctor: 'Dr. Hkm. Zaid Abdul Aziz',
      date: '10 Aug 2024',
      time: '11:00 AM',
      status: 'Completed',
    }
  ];

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Greeting Card */}
        <div className="bg-white rounded-3xl border border-[#E8DCC4] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-[#2F4A3D] text-[#E2D1A9] font-serif font-bold text-2xl flex items-center justify-center shrink-0 border-2 border-[#B9964A]">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif font-bold text-2xl text-[#1E1B16]">{user.name}</h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Email & Phone Verified</span>
                </span>
              </div>
              <p className="text-xs text-[#7A8F6C] mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              addToast('info', 'Logged Out', 'You have been signed out.');
              setCurrentPage({ type: 'home' });
            }}
            className="gap-2 shrink-0 text-red-700 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DCC4] gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#B9964A] text-[#B9964A]'
                : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({mockOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'appointments'
                ? 'border-[#B9964A] text-[#B9964A]'
                : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Clinical Appointments ({mockAppointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'profile'
                ? 'border-[#B9964A] text-[#B9964A]'
                : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Saved Addresses & Profile</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {mockOrders.map((ord) => (
              <div key={ord.id} className="bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#1E1B16]">{ord.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A8F6C] mb-2">Ordered on {ord.date}</p>
                  <p className="text-xs text-[#4A453D] font-medium">{ord.items.join(', ')}</p>
                </div>

                <div className="text-right sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#F3EBDA]">
                  <p className="font-serif font-bold text-lg text-[#1E1B16]">₹{ord.total}</p>
                  <span className="text-[10px] text-[#8C6D2F] font-semibold">Fulfilled by Mira Road Store</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {mockAppointments.map((apt) => (
              <div key={apt.id} className="bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif font-bold text-base text-[#1E1B16]">{apt.service}</span>
                    <span className="bg-[#FAF4E8] text-[#8C6D2F] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#B9964A]/30">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A453D]">{apt.doctor}</p>
                  <p className="text-xs text-[#7A8F6C] mt-1">{apt.date} at {apt.time}</p>
                </div>

                <Button variant="outline" size="sm" onClick={() => addToast('info', 'Appointment Confirmed', 'Clinic reminder active for ' + apt.date)}>
                  View Receipt
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#1E1B16] pb-2 border-b border-[#F3EBDA]">
              Default Delivery Address
            </h3>
            <div className="text-xs text-[#4A453D] space-y-1">
              <p className="font-bold text-[#1E1B16]">{user.name}</p>
              <p>{user.address?.street || 'Flat 402, Kanakia Road'}</p>
              <p>{user.address?.city || 'Mira Road (East)'}, {user.address?.pincode || '401105'}</p>
              <p className="text-[#8C6D2F] font-semibold">Primary Contact: {user.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

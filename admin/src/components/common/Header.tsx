import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminTab } from '../../types';
import { Menu, RefreshCw, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  activeTab: AdminTab;
  onRefresh: () => void;
  isLoading: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onRefresh,
  isLoading,
  onToggleSidebar,
}) => {
  const { user } = useAuth();

  const tabTitles: Record<AdminTab, string> = {
    dashboard: 'Dashboard Overview',
    products: 'Products Catalog Management',
    services: 'Clinic Services Management',
    treatments: 'Treatment Programs Management',
    orders: 'Orders & Fulfillment Workspace',
    appointments: 'Patient Appointment Bookings',
    reviews: 'Customer Reviews & Feedback',
    inquiries: 'Patient Contact Inquiries',
    subscribers: 'Newsletter Subscribers List',
    coupons: 'Promotional Coupons & Discounts',
  };

  return (
    <header className="bg-white border-b border-[#E8DCC4] sticky top-0 z-30 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1E1B16]">
            {tabTitles[activeTab] || 'Admin Console'}
          </h1>
          <p className="text-[11px] text-[#7A8F6C]">
            Dr. HKM. Zaid Abdul Aziz Clinic • Mira Road Control Panel
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#FAF4E8] hover:bg-[#E8DCC4] text-[#8C6D2F] font-semibold text-xs flex items-center gap-1.5 transition-all border border-[#B9964A]/30"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh Data</span>
        </button>

        <div className="flex items-center gap-2 bg-[#F3EBDA] px-3 py-1.5 rounded-xl border border-[#E8DCC4]">
          <ShieldCheck className="w-4 h-4 text-[#B9964A]" />
          <span className="text-xs font-bold text-[#1E1B16] hidden md:inline">
            {user?.name || 'Dr. Zaid'}
          </span>
        </div>
      </div>
    </header>
  );
};

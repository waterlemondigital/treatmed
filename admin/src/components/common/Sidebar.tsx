import React from 'react';
import { AdminTab } from '../../types';
import { Logo } from './Logo';
import {
  LayoutDashboard,
  Package,
  Stethoscope,
  HeartPulse,
  ShoppingBag,
  Calendar,
  Star,
  Mail,
  Users,
  Tag,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}) => {
  const { logout, user } = useAuth();

  const menuItems: { id: AdminTab; label: string; icon: any; countBadge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products Catalog', icon: Package },
    { id: 'services', label: 'Clinic Services', icon: Stethoscope },
    { id: 'treatments', label: 'Treatment Care', icon: HeartPulse },
    { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
    { id: 'appointments', label: 'Patient Bookings', icon: Calendar },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'inquiries', label: 'Contact Messages', icon: Mail },
    { id: 'subscribers', label: 'Newsletter List', icon: Users },
    { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#1C382B] text-white flex flex-col transition-transform duration-300 border-r border-[#C89B3C]/30 shadow-2xl lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#234233]">
          <Logo size="md" className="text-white" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-none">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#C89B3C]/80 mb-2">
            Apothecary Management
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  active
                    ? 'bg-[#C89B3C] text-black shadow-lg font-bold'
                    : 'text-[#E3D4B5] hover:bg-[#234233] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-[#C89B3C]'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    active ? 'text-black translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-[#C89B3C]'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#234233] bg-[#172E23] space-y-3">
          <div className="flex items-center justify-between text-xs px-2">
            <div className="truncate">
              <p className="font-bold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-[#C89B3C] truncate">{user?.email || 'admin@treatmed.in'}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#234233] hover:bg-[#2C523F] text-[#E3D4B5] text-[11px] font-semibold py-2 rounded-xl border border-[#C89B3C]/30 transition-all"
          >
            <span>Open Public Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C89B3C]" />
          </a>
        </div>
      </aside>
    </>
  );
};

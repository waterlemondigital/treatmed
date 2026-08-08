import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { STORE_INFO } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { PageView } from '../../types';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles,
  Calendar,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
  openAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openBookingModal,
  openAIAssistant,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: { type: 'home' } as PageView },
    { label: 'Shop Products', page: { type: 'shop' } as PageView },
    { label: 'Services', page: { type: 'services' } as PageView },
    { label: 'Special Treatments', page: { type: 'treatments' } as PageView },
    { label: 'About Us', page: { type: 'about' } as PageView },
    { label: 'Contact', page: { type: 'contact' } as PageView },
  ];

  const isLinkActive = (page: PageView) => {
    return currentPage.type === page.type;
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar - Contact & Timings */}
      <div className="bg-[#1E1B16] text-[#E8DCC4] text-xs py-2 px-4 border-b border-[#343029] hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${STORE_INFO.phones[0]}`} className="flex items-center gap-1.5 hover:text-[#B9964A] transition-colors whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-[#B9964A]" />
              <span>{STORE_INFO.phones[0]}</span>
            </a>
            <span className="text-[#343029]">|</span>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-[#B9964A]" />
              <span className="truncate max-w-xs">{STORE_INFO.shortAddress}</span>
            </div>
            <span className="text-[#343029]">|</span>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-[#B9964A]" />
              <span>{STORE_INFO.hours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openAIAssistant}
              className="flex items-center gap-1.5 text-[#E2D1A9] hover:text-white bg-[#B9964A]/20 px-2.5 py-0.5 rounded-full border border-[#B9964A]/40 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-[#B9964A]" />
              <span>Ask Dr. Zaid's AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-[#FBF8F2]/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled ? 'shadow-md border-[#E8DCC4] py-2.5' : 'border-[#F3EBDA] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage({ type: 'home' })}
            className="text-left focus:outline-none shrink-0"
          >
            <Logo size="md" />
            <p className="text-[10px] text-[#7A8F6C] font-sans font-medium tracking-wide -mt-1 hidden sm:block whitespace-nowrap">
              UNANI & AYURVEDIC STORE • MIRA ROAD
            </p>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 whitespace-nowrap">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.page);
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(link.page)}
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#1C382B] text-white shadow-xs'
                      : 'text-[#4A453D] hover:text-[#1C382B] hover:bg-[#F3EBDA]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Consultation CTA */}
            <button
              onClick={() => openBookingModal()}
              className="hidden sm:inline-flex items-center gap-2 bg-[#2F4A3D] hover:bg-[#1F3229] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm transition-all whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#B9964A]" />
              <span>Book Appointment</span>
            </button>

            {/* User Account / Login */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 pr-2 rounded-xl bg-[#F3EBDA] hover:bg-[#E8DCC4] text-[#1E1B16] transition-colors text-xs font-medium whitespace-nowrap"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#B9964A] text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden md:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E8DCC4] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-1.5 border-b border-[#F3EBDA]">
                        <p className="text-xs font-bold text-[#1E1B16] truncate">{user.name}</p>
                        <p className="text-[11px] text-[#7A8F6C] truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentPage({ type: 'account' });
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-[#4A453D] hover:bg-[#FBF8F2] hover:text-[#8C6D2F] font-medium flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-[#B9964A]" />
                        <span>My Profile & Orders</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 font-medium flex items-center gap-2 border-t border-[#F3EBDA] mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setCurrentPage({ type: 'login' })}
                  className="p-2 rounded-xl text-[#4A453D] hover:text-[#8C6D2F] hover:bg-[#F3EBDA] transition-colors flex items-center gap-1 text-xs font-medium whitespace-nowrap"
                  title="Sign In"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Cart Icon & Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-[#B9964A] text-white hover:bg-[#8C6D2F] shadow-sm transition-all shrink-0"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B5652D] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FBF8F2] animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1E1B16] hover:bg-[#F3EBDA] transition-colors shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-[#FBF8F2] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DCC4]">
                <Logo size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-[#1E1B16] hover:bg-[#F3EBDA]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPage(link.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                      isLinkActive(link.page)
                        ? 'bg-[#B9964A] text-white font-semibold'
                        : 'text-[#1E1B16] hover:bg-[#F3EBDA]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8DCC4]">
                <button
                  onClick={() => {
                    openAIAssistant();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#FAF4E8] text-[#8C6D2F] border border-[#B9964A]/40 font-semibold py-3 rounded-xl text-sm mb-3"
                >
                  <Sparkles className="w-4 h-4 text-[#B9964A]" />
                  <span>Unani AI Assistant</span>
                </button>

                <button
                  onClick={() => {
                    openBookingModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#2F4A3D] text-white font-semibold py-3 rounded-xl text-sm shadow-md"
                >
                  Book Appointment
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8DCC4] text-xs text-[#4A453D]">
              <p className="font-bold text-[#1E1B16] mb-1">{STORE_INFO.name}</p>
              <p className="mb-2">{STORE_INFO.address}</p>
              <a href={`tel:${STORE_INFO.phones[0]}`} className="text-[#8C6D2F] font-semibold block">
                {STORE_INFO.phones[0]}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

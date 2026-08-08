import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ProductsManager } from './components/products/ProductsManager';
import { ServicesManager } from './components/services/ServicesManager';
import { TreatmentsManager } from './components/treatments/TreatmentsManager';
import { OrdersManager } from './components/orders/OrdersManager';
import { AppointmentsManager } from './components/appointments/AppointmentsManager';
import { ReviewsManager } from './components/reviews/ReviewsManager';
import { InquiriesManager } from './components/inquiries/InquiriesManager';
import { CouponsManager } from './components/coupons/CouponsManager';
import {
  Product,
  Service,
  Treatment,
  Order,
  Appointment,
  Review,
  ContactInquiry,
  NewsletterSubscriber,
  AdminTab,
} from './types';
import {
  fetchProductsAdmin,
  fetchServicesAdmin,
  fetchTreatmentsAdmin,
  fetchOrdersAdmin,
  fetchAppointmentsAdmin,
  fetchReviewsAdmin,
  fetchContactInquiriesAdmin,
  fetchNewsletterSubscribersAdmin,
} from './services/api';

export const AppContent: React.FC = () => {
  const { isAdmin, isLoading: isAuthLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Live Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const loadAllData = async () => {
    if (!isAdmin) return;
    setIsLoadingData(true);
    try {
      const [prods, servs, treats, ords, apts, revs, inqs, subs] = await Promise.all([
        fetchProductsAdmin().catch(() => []),
        fetchServicesAdmin().catch(() => []),
        fetchTreatmentsAdmin().catch(() => []),
        fetchOrdersAdmin().catch(() => []),
        fetchAppointmentsAdmin().catch(() => []),
        fetchReviewsAdmin().catch(() => []),
        fetchContactInquiriesAdmin().catch(() => []),
        fetchNewsletterSubscribersAdmin().catch(() => []),
      ]);

      setProducts(prods);
      setServices(servs);
      setTreatments(treats);
      setOrders(ords);
      setAppointments(apts);
      setReviews(revs);
      setInquiries(inqs);
      setSubscribers(subs);
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#2F4A3D] border-t-[#B9964A] rounded-full animate-spin mx-auto" />
          <p className="font-serif font-bold text-sm text-[#1E1B16]">Loading Treatmed Console...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          onRefresh={loadAllData}
          isLoading={isLoadingData}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="p-4 sm:p-8 flex-1 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              products={products}
              services={services}
              treatments={treatments}
              orders={orders}
              appointments={appointments}
              inquiries={inquiries}
              subscribers={subscribers}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'products' && (
            <ProductsManager
              products={products}
              setProducts={setProducts}
              onRefresh={loadAllData}
            />
          )}

          {activeTab === 'services' && (
            <ServicesManager
              services={services}
              setServices={setServices}
            />
          )}

          {activeTab === 'treatments' && (
            <TreatmentsManager
              treatments={treatments}
              setTreatments={setTreatments}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersManager
              orders={orders}
              setOrders={setOrders}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsManager
              appointments={appointments}
              setAppointments={setAppointments}
            />
          )}

          {activeTab === 'reviews' && (
            <ReviewsManager reviews={reviews} />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesManager
              inquiries={inquiries}
              subscribers={subscribers}
            />
          )}

          {activeTab === 'subscribers' && (
            <InquiriesManager
              inquiries={inquiries}
              subscribers={subscribers}
            />
          )}

          {activeTab === 'coupons' && <CouponsManager />}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

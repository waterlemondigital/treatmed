import React from 'react';
import { Product, Service, Treatment, Order, Appointment, ContactInquiry, NewsletterSubscriber, AdminTab } from '../../types';
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Package,
  Stethoscope,
  HeartPulse,
  Mail,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';

interface DashboardOverviewProps {
  products: Product[];
  services: Service[];
  treatments: Treatment[];
  orders: Order[];
  appointments: Appointment[];
  inquiries: ContactInquiry[];
  subscribers: NewsletterSubscriber[];
  setActiveTab: (tab: AdminTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  products,
  services,
  treatments,
  orders,
  appointments,
  inquiries,
  subscribers,
  setActiveTab,
}) => {
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Processing').length;
  const activeAppointments = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length;
  const outOfStockProducts = products.filter((p) => !p.inStock).length;

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      subtitle: `${orders.length} orders total`,
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      iconBg: 'bg-emerald-600 text-white',
      onClick: () => setActiveTab('orders'),
    },
    {
      title: 'Pending Orders',
      value: pendingOrders.toString(),
      subtitle: 'Requires fulfillment',
      icon: ShoppingBag,
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      iconBg: 'bg-amber-600 text-white',
      onClick: () => setActiveTab('orders'),
    },
    {
      title: 'Active Appointments',
      value: activeAppointments.toString(),
      subtitle: 'Clinic sessions scheduled',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-900 border-blue-300',
      iconBg: 'bg-blue-600 text-white',
      onClick: () => setActiveTab('appointments'),
    },
    {
      title: 'Products in Catalog',
      value: products.length.toString(),
      subtitle: outOfStockProducts > 0 ? `${outOfStockProducts} out of stock` : 'All items in stock',
      icon: Package,
      color: 'bg-stone-100 text-stone-900 border-stone-300',
      iconBg: 'bg-[#B9964A] text-white',
      onClick: () => setActiveTab('products'),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="bg-[#2F4A3D] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-[#B9964A]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B9964A] bg-[#1C382B] px-3.5 py-1 rounded-full border border-[#B9964A]/30">
            Apothecary & Clinic Dashboard
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#FBF8F2] mt-3">
            Peace & Wellness, Dr. Zaid!
          </h2>
          <p className="text-xs text-[#E8DCC4]/80 mt-1 max-w-xl leading-relaxed">
            Monitor real-time product orders, manage clinic cupping (Hijama) appointments, and maintain your Unani herbal catalog directly from the database.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className="bg-[#B9964A] hover:bg-[#8C6D2F] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            + Add Product
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className="bg-[#1C382B] hover:bg-[#12241C] text-[#FBF8F2] text-xs font-bold px-4 py-2.5 rounded-xl shadow-md border border-[#B9964A]/30 transition-colors"
          >
            View Bookings
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={card.onClick}
              className={`p-6 rounded-3xl border shadow-xs transition-all hover:shadow-md cursor-pointer bg-white relative group`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${card.iconBg} shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#B9964A] transition-colors" />
              </div>
              <p className="text-xs font-semibold text-[#7A8F6C] uppercase tracking-wider">{card.title}</p>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1E1B16] mt-1">{card.value}</h3>
              <p className="text-[11px] text-gray-500 mt-1 font-medium">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Orders & Recent Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#F3EBDA]">
            <h3 className="font-serif font-bold text-lg text-[#1E1B16] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B9964A]" />
              <span>Recent Orders</span>
            </h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs font-bold text-[#8C6D2F] hover:underline"
            >
              View All ({orders.length})
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 5).map((ord) => {
              const id = (ord as any)._id || ord.id;
              return (
                <div
                  key={id}
                  className="p-3.5 bg-[#FBF8F2] rounded-2xl border border-[#E8DCC4] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#1E1B16]">
                        {ord.shippingAddress?.name || 'Customer'}
                      </span>
                      <span className="bg-[#FAF4E8] text-[#8C6D2F] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#B9964A]/30">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A8F6C] mt-0.5">
                      {ord.items?.map((i) => i.productName).join(', ')}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#B9964A] shrink-0">
                    ₹{ord.totalAmount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#F3EBDA]">
            <h3 className="font-serif font-bold text-lg text-[#1E1B16] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2F4A3D]" />
              <span>Clinic Bookings</span>
            </h3>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-bold text-[#8C6D2F] hover:underline"
            >
              View All ({appointments.length})
            </button>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 5).map((apt) => {
              const id = (apt as any)._id || apt.id;
              return (
                <div
                  key={id}
                  className="p-3.5 bg-[#FBF8F2] rounded-2xl border border-[#E8DCC4] space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-[#1E1B16]">{apt.patientName}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-[#2F4A3D] font-bold">{apt.serviceTitle}</p>
                  <p className="text-[11px] text-[#7A8F6C]">{apt.date} at {apt.time}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

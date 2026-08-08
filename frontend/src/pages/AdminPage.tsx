import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Product, Service, Treatment, Order, Appointment, PageView } from '../types';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import {
  fetchProducts,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  fetchServices,
  createServiceAdmin,
  updateServiceAdmin,
  deleteServiceAdmin,
  fetchTreatments,
  createTreatmentAdmin,
  updateTreatmentAdmin,
  deleteTreatmentAdmin,
  fetchAllOrdersAdmin,
  updateOrderStatusAdmin,
  fetchAllAppointmentsAdmin,
  updateAppointmentStatusAdmin,
  fetchContactInquiriesAdmin,
  fetchNewsletterSubscribersAdmin,
} from '../services/api';
import {
  ShieldCheck,
  Package,
  Stethoscope,
  HeartPulse,
  ShoppingBag,
  Calendar,
  Mail,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Lock,
} from 'lucide-react';

interface AdminPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setCurrentPage }) => {
  const { user, login } = useAuth();
  const { addToast } = useToast();

  const isAdmin = user?.role === 'admin' || user?.email === 'admin@treatmed.in';

  // Admin login state if not admin
  const [adminEmail, setAdminEmail] = useState('admin@treatmed.in');
  const [adminPassword, setAdminPassword] = useState('Admin@123');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'treatments' | 'orders' | 'appointments' | 'inquiries'>('services');

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Modal States for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'product' | 'service' | 'treatment'>('product');
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Load Data
  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      const [prods, servs, treats, ords, apts, inqs, subs] = await Promise.all([
        fetchProducts().catch(() => []),
        fetchServices().catch(() => []),
        fetchTreatments().catch(() => []),
        fetchAllOrdersAdmin().catch(() => []),
        fetchAllAppointmentsAdmin().catch(() => []),
        fetchContactInquiriesAdmin().catch(() => []),
        fetchNewsletterSubscribersAdmin().catch(() => []),
      ]);
      setProducts(prods);
      setServices(servs);
      setTreatments(treats);
      setOrders(ords);
      setAppointments(apts);
      setInquiries(inqs);
      setSubscribers(subs);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const success = await login(adminEmail, adminPassword, true);
    setIsLoggingIn(false);
    if (success) {
      addToast('success', 'Admin Access Granted', 'Welcome to Treatmed Admin Portal');
    }
  };

  const [benefitsInput, setBenefitsInput] = useState('Combats hair fall, Strengthens roots');
  const [ingredientsInput, setIngredientsInput] = useState('Amla, Bhringraj, Brahmi');

  // Open Modal for Create or Edit
  const openCreateModal = (type: 'product' | 'service' | 'treatment') => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'product') {
      setBenefitsInput('Combats hair fall, Strengthens roots');
      setIngredientsInput('Amla, Bhringraj, Brahmi');
      setFormData({
        name: '',
        category: 'Hair Care',
        price: 350,
        originalPrice: 400,
        rating: 4.8,
        reviewsCount: 12,
        image: 'https://images.unsplash.com/photo-1608248597266-2244248232f7?auto=format&fit=crop&q=80&w=600',
        shortDesc: '',
        description: '',
        ingredients: ['Amla', 'Bhringraj'],
        benefits: ['Promotes growth'],
        usage: 'Apply 10ml daily',
        size: '200 ml',
        inStock: true,
        isBestSeller: false,
      });
    } else if (type === 'service') {
      setFormData({
        title: '',
        category: 'Therapy',
        shortDesc: '',
        fullDesc: '',
        iconName: 'HeartPulse',
        duration: '45 Mins',
        priceEstimate: '₹500 / session',
        whatToExpect: ['Consultation', 'Therapy'],
        benefits: ['Relieves pain'],
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
      });
    } else {
      setFormData({
        title: '',
        category: 'Orthopedic Wellness',
        summary: '',
        symptomsAddressed: ['Joint pain'],
        unaniApproach: 'Herbal oils & Hijama',
        recommendedDuration: '4 Weeks',
        iconName: 'ShieldAlert',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      });
    }
    setIsModalOpen(true);
  };

  const openEditModal = (type: 'product' | 'service' | 'treatment', item: any) => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'product') {
      setBenefitsInput(Array.isArray(item.benefits) ? item.benefits.join(', ') : (item.benefits || ''));
      setIngredientsInput(Array.isArray(item.ingredients) ? item.ingredients.join(', ') : (item.ingredients || ''));
    }
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  // Save (Create / Update)
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (modalType === 'product') {
        const benefitsArray = benefitsInput.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
        const ingredientsArray = ingredientsInput.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
        const payload = {
          ...formData,
          benefits: benefitsArray,
          ingredients: ingredientsArray,
        };

        if (editingItem) {
          const updated = await updateProductAdmin(editingItem._id || editingItem.id, payload);
          setProducts((prev) => prev.map((p) => ((p as any)._id === editingItem._id || p.id === editingItem.id ? updated : p)));
          addToast('success', 'Product Updated', `${formData.name} updated successfully`);
        } else {
          const created = await createProductAdmin(payload);
          setProducts((prev) => [created, ...prev]);
          addToast('success', 'Product Created', `${formData.name} added to catalog`);
        }
      } else if (modalType === 'service') {
        if (editingItem) {
          const updated = await updateServiceAdmin(editingItem._id || editingItem.id, formData);
          setServices((prev) => prev.map((s) => ((s as any)._id === editingItem._id || s.id === editingItem.id ? updated : s)));
          addToast('success', 'Service Updated', `${formData.title} updated successfully`);
        } else {
          const created = await createServiceAdmin(formData);
          setServices((prev) => [created, ...prev]);
          addToast('success', 'Service Created', `${formData.title} added to clinic services`);
        }
      } else {
        if (editingItem) {
          const updated = await updateTreatmentAdmin(editingItem._id || editingItem.id, formData);
          setTreatments((prev) => prev.map((t) => ((t as any)._id === editingItem._id || t.id === editingItem.id ? updated : t)));
          addToast('success', 'Treatment Updated', `${formData.title} updated successfully`);
        } else {
          const created = await createTreatmentAdmin(formData);
          setTreatments((prev) => [created, ...prev]);
          addToast('success', 'Treatment Created', `${formData.title} added to treatment programs`);
        }
      }
      setIsModalOpen(false);
      loadAdminData();
    } catch (err: any) {
      addToast('error', 'Action Failed', err.message || 'Error saving item.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete
  const handleDeleteItem = async (type: 'product' | 'service' | 'treatment', id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      if (type === 'product') {
        await deleteProductAdmin(id);
        setProducts((prev) => prev.filter((p) => (p as any)._id !== id && p.id !== id));
      } else if (type === 'service') {
        await deleteServiceAdmin(id);
        setServices((prev) => prev.filter((s) => (s as any)._id !== id && s.id !== id));
      } else {
        await deleteTreatmentAdmin(id);
        setTreatments((prev) => prev.filter((t) => (t as any)._id !== id && t.id !== id));
      }
      addToast('info', 'Item Removed', `Deleted "${name}"`);
    } catch (err: any) {
      addToast('error', 'Delete Failed', err.message || 'Could not delete item.');
    }
  };

  // Status Updates
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatusAdmin(orderId, status);
      setOrders((prev) => prev.map((o) => ((o as any)._id === orderId || o.id === orderId ? { ...o, status: status as any } : o)));
      addToast('success', 'Order Updated', `Order status changed to ${status}`);
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  const handleUpdateAppointmentStatus = async (aptId: string, status: string) => {
    try {
      await updateAppointmentStatusAdmin(aptId, status);
      setAppointments((prev) => prev.map((a) => ((a as any)._id === aptId || a.id === aptId ? { ...a, status: status as any } : a)));
      addToast('success', 'Appointment Updated', `Appointment status changed to ${status}`);
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  // If not admin, show Admin Authentication Screen
  if (!isAdmin) {
    return (
      <div className="py-20 bg-[#FBF8F2] min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white p-8 rounded-3xl border border-[#E8DCC4] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-[#2F4A3D] text-[#B9964A] rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-serif font-bold text-2xl text-[#1E1B16]">
                Treatmed Admin Portal
              </h2>
              <p className="text-xs text-[#4A453D] mt-1">
                Restricted access for Dr. Zaid & clinic administrators.
              </p>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:ring-2 focus:ring-[#B9964A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Admin Password</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:ring-2 focus:ring-[#B9964A]"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth isLoading={isLoggingIn}>
                Sign In to Admin Console
              </Button>
            </form>

            <p className="text-[11px] text-[#7A8F6C]">
              Demo Admin Credentials: <strong className="text-[#1E1B16]">admin@treatmed.in</strong> / <strong className="text-[#1E1B16]">Admin@123</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-[#2F4A3D] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#B9964A]/30">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-[#B9964A] text-white rounded-2xl shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#FBF8F2]">
                  Treatmed Admin Management
                </h1>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  Live DB Control
                </span>
              </div>
              <p className="text-xs text-[#E8DCC4]/80 mt-1">
                Logged in as <strong className="text-white">{user?.name}</strong> ({user?.email}) • Mira Road Clinic Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={loadAdminData}
              isLoading={isLoadingData}
              className="text-white border-white/30 hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" />
              <span>Refresh Data</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage({ type: 'home' })}
            >
              View Public Website
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DCC4] gap-2 sm:gap-6 overflow-x-auto scrollbar-none pb-1">
          {/* <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
              activeTab === 'products' ? 'border-[#B9964A] text-[#B9964A]' : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button> */}

          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
              activeTab === 'services' ? 'border-[#B9964A] text-[#B9964A]' : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Clinic Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('treatments')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
              activeTab === 'treatments' ? 'border-[#B9964A] text-[#B9964A]' : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Treatments ({treatments.length})</span>
          </button>

          {/* <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
              activeTab === 'orders' ? 'border-[#B9964A] text-[#B9964A]' : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button> */}

          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
              activeTab === 'appointments' ? 'border-[#B9964A] text-[#B9964A]' : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 border-b-2 shrink-0 ${
              activeTab === 'inquiries' ? 'border-[#B9964A] text-[#B9964A]' : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* Action & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-white border border-[#E8DCC4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
            />
            <Search className="w-4 h-4 text-[#B9964A] absolute left-3 top-2.5" />
          </div>

          {(activeTab === 'products' || activeTab === 'services' || activeTab === 'treatments') && (
            <Button
              variant="primary"
              onClick={() => openCreateModal(activeTab === 'products' ? 'product' : activeTab === 'services' ? 'service' : 'treatment')}
              className="gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New {activeTab.slice(0, -1).toUpperCase()}</span>
            </Button>
          )}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E1B16]">
                <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EBDA]">
                  {products
                    .filter((p) => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
                    .map((prod) => {
                      const id = (prod as any)._id || prod.id;
                      return (
                        <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-xl shrink-0 bg-[#F3EBDA]" />
                            <div>
                              <p className="font-serif font-bold text-sm text-[#1E1B16]">{prod.name}</p>
                              <p className="text-[11px] text-[#7A8F6C]">{prod.size}</p>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-[#8C6D2F]">{prod.category}</td>
                          <td className="p-4 font-bold text-[#1E1B16]">
                            ₹{prod.price} {prod.originalPrice && <span className="line-through text-gray-400 text-[10px]">₹{prod.originalPrice}</span>}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                              {prod.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="p-4">
                            {prod.isBestSeller && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Best Seller
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openEditModal('product', prod)}
                              className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl transition-colors"
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('product', id, prod.name)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E1B16]">
                <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Service</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Price Estimate</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EBDA]">
                  {services
                    .filter((s) => s.title.toLowerCase().includes(searchFilter.toLowerCase()))
                    .map((srv) => {
                      const id = (srv as any)._id || srv.id;
                      return (
                        <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={srv.image} alt={srv.title} className="w-12 h-12 object-cover rounded-xl shrink-0 bg-[#F3EBDA]" />
                            <div>
                              <p className="font-serif font-bold text-sm text-[#1E1B16]">{srv.title}</p>
                              <p className="text-[11px] text-[#7A8F6C] truncate max-w-xs">{srv.shortDesc}</p>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-[#8C6D2F]">{srv.category}</td>
                          <td className="p-4 font-medium text-[#1E1B16]">{srv.duration}</td>
                          <td className="p-4 font-semibold text-[#7A8F6C]">{srv.priceEstimate}</td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openEditModal('service', srv)}
                              className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('service', id, srv.title)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TREATMENTS MANAGEMENT */}
        {activeTab === 'treatments' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E1B16]">
                <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Treatment</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Symptoms Addressed</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EBDA]">
                  {treatments
                    .filter((t) => t.title.toLowerCase().includes(searchFilter.toLowerCase()))
                    .map((trt) => {
                      const id = (trt as any)._id || trt.id;
                      return (
                        <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={trt.image} alt={trt.title} className="w-12 h-12 object-cover rounded-xl shrink-0 bg-[#F3EBDA]" />
                            <div>
                              <p className="font-serif font-bold text-sm text-[#1E1B16]">{trt.title}</p>
                              <p className="text-[11px] text-[#7A8F6C] truncate max-w-xs">{trt.summary}</p>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-[#8C6D2F]">{trt.category}</td>
                          <td className="p-4 font-medium text-[#1E1B16]">{trt.recommendedDuration}</td>
                          <td className="p-4 text-[11px] text-[#4A453D]">{trt.symptomsAddressed?.slice(0, 2).join(', ')}</td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openEditModal('treatment', trt)}
                              className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('treatment', id, trt.title)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E1B16]">
                <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Customer & Address</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EBDA]">
                  {orders.map((ord) => {
                    const id = (ord as any)._id || ord.id;
                    return (
                      <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-[#1E1B16]">{ord.shippingAddress?.name || 'Customer'}</p>
                          <p className="text-[11px] text-[#7A8F6C]">{ord.shippingAddress?.phone}</p>
                          <p className="text-[10px] text-gray-500">{ord.shippingAddress?.street}, {ord.shippingAddress?.pincode}</p>
                        </td>
                        <td className="p-4 max-w-xs">
                          {ord.items?.map((it, idx) => (
                            <div key={idx} className="text-[11px] text-[#4A453D]">
                              • {it.productName} (x{it.quantity})
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-bold text-[#B9964A]">₹{ord.totalAmount}</td>
                        <td className="p-4 uppercase font-semibold text-[#8C6D2F]">{ord.paymentMethod}</td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(id, e.target.value)}
                            className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1E1B16] focus:ring-2 focus:ring-[#B9964A]"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1E1B16]">
                <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Patient Name & Phone</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4">Status Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EBDA]">
                  {appointments.map((apt) => {
                    const id = (apt as any)._id || apt.id;
                    return (
                      <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-[#1E1B16]">{apt.patientName}</p>
                          <p className="text-[11px] text-[#7A8F6C]">{apt.phone}</p>
                        </td>
                        <td className="p-4 font-serif font-bold text-[#2F4A3D]">{apt.serviceTitle}</td>
                        <td className="p-4 font-medium text-[#1E1B16]">{apt.date} at {apt.time}</td>
                        <td className="p-4 text-[11px] text-gray-500 max-w-xs">{apt.notes || 'No notes'}</td>
                        <td className="p-4">
                          <select
                            value={apt.status}
                            onChange={(e) => handleUpdateAppointmentStatus(id, e.target.value)}
                            className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1E1B16] focus:ring-2 focus:ring-[#B9964A]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: INQUIRIES & SUBSCRIBERS */}
        {activeTab === 'inquiries' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-[#E8DCC4] space-y-4 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#1E1B16] border-b border-[#F3EBDA] pb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#B9964A]" />
                <span>Contact Inquiries ({inquiries.length})</span>
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {inquiries.map((inq, idx) => (
                  <div key={idx} className="p-4 bg-[#FBF8F2] rounded-2xl border border-[#E8DCC4] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-[#1E1B16]">{inq.name} ({inq.phone})</span>
                      <span className="text-[10px] text-[#8C6D2F] font-semibold">{inq.subject}</span>
                    </div>
                    <p className="text-xs text-[#4A453D] pt-1">{inq.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8DCC4] space-y-4 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#1E1B16] border-b border-[#F3EBDA] pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Newsletter Subscribers ({subscribers.length})</span>
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {subscribers.map((sub, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF4E8] rounded-xl border border-[#E8DCC4] flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1E1B16]">{sub.email}</span>
                    <span className="text-[10px] text-[#7A8F6C]">Subscribed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FBF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DCC4] overflow-hidden relative max-h-[90vh] flex flex-col">
            <div className="bg-[#2F4A3D] text-white p-6 flex justify-between items-center shrink-0">
              <h3 className="font-serif font-bold text-xl text-[#FBF8F2]">
                {editingItem ? 'Edit' : 'Create New'} {modalType.toUpperCase()}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-white/70 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Product Form Fields */}
              {modalType === 'product' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Category</label>
                      <select
                        value={formData.category || 'Hair Care'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      >
                        <option value="Hair Care">Hair Care</option>
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Tablets">Tablets</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={formData.price || 0}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Original Price (₹)</label>
                      <input
                        type="number"
                        value={formData.originalPrice || 0}
                        onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Size</label>
                      <input
                        type="text"
                        value={formData.size || ''}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Image URL</label>
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Short Description</label>
                    <input
                      type="text"
                      required
                      value={formData.shortDesc || ''}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Product Rating (1.0 - 5.0)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1.0"
                        max="5.0"
                        value={formData.rating ?? 4.8}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Reviews Count</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.reviewsCount ?? 12}
                        onChange={(e) => setFormData({ ...formData, reviewsCount: Number(e.target.value) })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Key Benefits (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={benefitsInput}
                      onChange={(e) => setBenefitsInput(e.target.value)}
                      placeholder="e.g. Combats hair fall, Strengthens hair roots, Prevents premature graying"
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Key Herbal Ingredients (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={ingredientsInput}
                      onChange={(e) => setIngredientsInput(e.target.value)}
                      placeholder="e.g. Amla, Bhringraj, Brahmi, Cold-Pressed Sesame Oil"
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock ?? true}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="accent-[#B9964A]"
                      />
                      <span>In Stock</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBestSeller ?? false}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="accent-[#B9964A]"
                      />
                      <span>Is Best Seller</span>
                    </label>
                  </div>
                </>
              )}

              {/* Service Form Fields */}
              {modalType === 'service' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Category</label>
                      <select
                        value={formData.category || 'Therapy'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      >
                        <option value="Consultation">Consultation</option>
                        <option value="Therapy">Therapy</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Diagnostics">Diagnostics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Duration</label>
                      <input
                        type="text"
                        required
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Price Estimate</label>
                      <input
                        type="text"
                        value={formData.priceEstimate || ''}
                        onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Image URL</label>
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Short Description</label>
                    <input
                      type="text"
                      required
                      value={formData.shortDesc || ''}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.fullDesc || ''}
                      onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16]"
                    />
                  </div>
                </>
              )}

              {/* Treatment Form Fields */}
              {modalType === 'treatment' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Treatment Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Image URL</label>
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Summary</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.summary || ''}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Unani Approach</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.unaniApproach || ''}
                      onChange={(e) => setFormData({ ...formData, unaniApproach: e.target.value })}
                      className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-xs text-[#1E1B16]"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-[#E8DCC4] flex justify-end gap-3 shrink-0">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isSaving}>
                  Save {modalType.toUpperCase()}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Service } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  createServiceAdmin,
  updateServiceAdmin,
  deleteServiceAdmin,
} from '../../services/api';
import { Plus, Edit2, Trash2, Search, X, Stethoscope } from 'lucide-react';

interface ServicesManagerProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  services,
  setServices,
}) => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    category: 'Therapy',
    shortDesc: '',
    fullDesc: '',
    iconName: 'HeartPulse',
    duration: '45 Mins',
    priceEstimate: '₹500 / session',
    whatToExpect: ['Initial evaluation', 'Therapeutic session'],
    benefits: ['Relieves pain', 'Improves mobility'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
  });

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Therapy',
      shortDesc: '',
      fullDesc: '',
      iconName: 'HeartPulse',
      duration: '45 Mins',
      priceEstimate: '₹500 / session',
      whatToExpect: ['Initial evaluation', 'Therapeutic session'],
      benefits: ['Relieves pain', 'Improves mobility'],
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (srv: Service) => {
    setEditingService(srv);
    setFormData({ ...srv });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingService) {
        const id = editingService._id || editingService.id;
        const updated = await updateServiceAdmin(id, formData);
        setServices((prev) => prev.map((s) => ((s as any)._id === id || s.id === id ? updated : s)));
        addToast('success', 'Service Updated', `${formData.title} updated successfully.`);
      } else {
        const created = await createServiceAdmin(formData);
        setServices((prev) => [created, ...prev]);
        addToast('success', 'Service Created', `${formData.title} added to clinic services.`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      addToast('error', 'Save Failed', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete service "${title}" from database?`)) return;
    try {
      await deleteServiceAdmin(id);
      setServices((prev) => prev.filter((s) => (s as any)._id !== id && s.id !== id));
      addToast('info', 'Service Removed', `Deleted "${title}"`);
    } catch (err: any) {
      addToast('error', 'Delete Failed', err.message);
    }
  };

  const filteredServices = services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search clinic services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
          />
          <Search className="w-4 h-4 text-[#B9964A] absolute left-3 top-2.5" />
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto bg-[#2F4A3D] hover:bg-[#1E3229] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#B9964A]" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E1B16]">
            <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Service Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Price Estimate</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDA]">
              {filteredServices.map((srv) => {
                const id = (srv as any)._id || srv.id;
                return (
                  <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={srv.image} alt={srv.title} className="w-12 h-12 object-cover rounded-xl shrink-0 bg-[#F3EBDA]" />
                      <div className="truncate max-w-sm">
                        <p className="font-serif font-bold text-sm text-[#1E1B16] truncate">{srv.title}</p>
                        <p className="text-[11px] text-[#7A8F6C] truncate">{srv.shortDesc}</p>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#8C6D2F]">{srv.category}</td>
                    <td className="p-4 font-medium text-[#1E1B16]">{srv.duration}</td>
                    <td className="p-4 font-semibold text-[#7A8F6C]">{srv.priceEstimate}</td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(srv)}
                        className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(id, srv.title)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FBF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DCC4] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#2F4A3D] text-white p-5 flex items-center justify-between shrink-0">
              <h3 className="font-serif font-bold text-xl text-[#FBF8F2]">
                {editingService ? 'Edit Clinic Service' : 'Add New Clinic Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-white/70 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Category</label>
                  <select
                    value={formData.category || 'Therapy'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
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
                  <label className="block font-semibold text-[#1E1B16] mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 45 Mins"
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Price Estimate</label>
                  <input
                    type="text"
                    value={formData.priceEstimate || ''}
                    onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                    placeholder="e.g. Consultation + Prescriptions"
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Service Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc || ''}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Full Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDesc || ''}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-[#1E1B16]"
                />
              </div>

              <div className="pt-4 border-t border-[#E8DCC4] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#2F4A3D] text-white font-bold hover:bg-[#1E3229] shadow-md"
                >
                  {isSaving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Treatment } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  createTreatmentAdmin,
  updateTreatmentAdmin,
  deleteTreatmentAdmin,
} from '../../services/api';
import { Plus, Edit2, Trash2, Search, X, HeartPulse } from 'lucide-react';

interface TreatmentsManagerProps {
  treatments: Treatment[];
  setTreatments: React.Dispatch<React.SetStateAction<Treatment[]>>;
}

export const TreatmentsManager: React.FC<TreatmentsManagerProps> = ({
  treatments,
  setTreatments,
}) => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    category: 'Orthopedic Wellness',
    summary: '',
    symptomsAddressed: ['Knee swelling', 'Joint stiffness'],
    unaniApproach: 'Anti-inflammatory herbal oils & Hijama cupping therapy.',
    recommendedDuration: '3 to 6 Weeks Program',
    iconName: 'ShieldAlert',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
  });

  const openCreateModal = () => {
    setEditingTreatment(null);
    setFormData({
      title: '',
      category: 'Orthopedic Wellness',
      summary: '',
      symptomsAddressed: ['Knee swelling', 'Joint stiffness'],
      unaniApproach: 'Anti-inflammatory herbal oils & Hijama cupping therapy.',
      recommendedDuration: '3 to 6 Weeks Program',
      iconName: 'ShieldAlert',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (trt: Treatment) => {
    setEditingTreatment(trt);
    setFormData({ ...trt });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingTreatment) {
        const id = editingTreatment._id || editingTreatment.id;
        const updated = await updateTreatmentAdmin(id, formData);
        setTreatments((prev) => prev.map((t) => ((t as any)._id === id || t.id === id ? updated : t)));
        addToast('success', 'Treatment Updated', `${formData.title} updated successfully.`);
      } else {
        const created = await createTreatmentAdmin(formData);
        setTreatments((prev) => [created, ...prev]);
        addToast('success', 'Treatment Created', `${formData.title} added to treatment programs.`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      addToast('error', 'Save Failed', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete treatment "${title}" from database?`)) return;
    try {
      await deleteTreatmentAdmin(id);
      setTreatments((prev) => prev.filter((t) => (t as any)._id !== id && t.id !== id));
      addToast('info', 'Treatment Removed', `Deleted "${title}"`);
    } catch (err: any) {
      addToast('error', 'Delete Failed', err.message);
    }
  };

  const filteredTreatments = treatments.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search treatment programs..."
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
          <span>Add New Treatment</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E1B16]">
            <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Treatment Program</th>
                <th className="p-4">Category</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Symptoms</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDA]">
              {filteredTreatments.map((trt) => {
                const id = (trt as any)._id || trt.id;
                return (
                  <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={trt.image} alt={trt.title} className="w-12 h-12 object-cover rounded-xl shrink-0 bg-[#F3EBDA]" />
                      <div className="truncate max-w-sm">
                        <p className="font-serif font-bold text-sm text-[#1E1B16] truncate">{trt.title}</p>
                        <p className="text-[11px] text-[#7A8F6C] truncate">{trt.summary}</p>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#8C6D2F]">{trt.category}</td>
                    <td className="p-4 font-medium text-[#1E1B16]">{trt.recommendedDuration}</td>
                    <td className="p-4 text-[11px] text-[#4A453D]">{trt.symptomsAddressed?.slice(0, 2).join(', ')}</td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(trt)}
                        className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(id, trt.title)}
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
                {editingTreatment ? 'Edit Treatment Program' : 'Add New Treatment Program'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-white/70 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Treatment Title</label>
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
                  <input
                    type="text"
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Orthopedic Wellness"
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Recommended Duration</label>
                  <input
                    type="text"
                    required
                    value={formData.recommendedDuration || ''}
                    onChange={(e) => setFormData({ ...formData, recommendedDuration: e.target.value })}
                    placeholder="e.g. 3 to 6 Weeks Program"
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-[#1E1B16]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Unani Clinical Approach</label>
                <textarea
                  rows={3}
                  required
                  value={formData.unaniApproach || ''}
                  onChange={(e) => setFormData({ ...formData, unaniApproach: e.target.value })}
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
                  {isSaving ? 'Saving...' : 'Save Treatment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

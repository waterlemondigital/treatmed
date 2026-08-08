import React, { useState } from 'react';
import { Product } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
} from '../../services/api';
import { Plus, Edit2, Trash2, Search, X, Package, Star, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ProductsManagerProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onRefresh: () => void;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({
  products,
  setProducts,
  onRefresh,
}) => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: '',
    category: 'Hair Care',
    price: 350,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 1,
    image: 'https://images.unsplash.com/photo-1608248597266-2244248232f7?auto=format&fit=crop&q=80&w=600',
    shortDesc: '',
    description: '',
    ingredients: ['Amla', 'Bhringraj', 'Brahmi'],
    benefits: ['Combats hair fall', 'Strengthens roots'],
    usage: 'Massage 10ml into scalp daily before sleep.',
    size: '200 ml',
    inStock: true,
    isBestSeller: false,
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Hair Care',
      price: 350,
      originalPrice: 420,
      rating: 4.8,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1608248597266-2244248232f7?auto=format&fit=crop&q=80&w=600',
      shortDesc: '',
      description: '',
      ingredients: ['Amla', 'Bhringraj', 'Brahmi'],
      benefits: ['Combats hair fall', 'Strengthens roots'],
      usage: 'Massage 10ml into scalp daily before sleep.',
      size: '200 ml',
      inStock: true,
      isBestSeller: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({ ...prod });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingProduct) {
        const id = editingProduct._id || editingProduct.id;
        const updated = await updateProductAdmin(id, formData);
        setProducts((prev) => prev.map((p) => ((p as any)._id === id || p.id === id ? updated : p)));
        addToast('success', 'Product Updated', `${formData.name} updated successfully.`);
      } else {
        const created = await createProductAdmin(formData);
        setProducts((prev) => [created, ...prev]);
        addToast('success', 'Product Created', `${formData.name} added to live database.`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      addToast('error', 'Save Failed', err.message || 'Error saving product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete product "${name}" from database?`)) return;
    try {
      await deleteProductAdmin(id);
      setProducts((prev) => prev.filter((p) => (p as any)._id !== id && p.id !== id));
      addToast('info', 'Product Removed', `Deleted "${name}"`);
    } catch (err: any) {
      addToast('error', 'Delete Failed', err.message);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
            />
            <Search className="w-4 h-4 text-[#B9964A] absolute left-3 top-2.5" />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16] font-semibold"
          >
            <option value="All">All Categories</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Pain Relief">Pain Relief</option>
            <option value="Tablets">Tablets</option>
          </select>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto bg-[#2F4A3D] hover:bg-[#1E3229] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#B9964A]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E8DCC4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1E1B16]">
            <thead className="bg-[#FAF4E8] border-b border-[#E8DCC4] text-[#8C6D2F] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EBDA]">
              {filteredProducts.map((prod) => {
                const id = (prod as any)._id || prod.id;
                return (
                  <tr key={id} className="hover:bg-[#FBF8F2] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-xl shrink-0 bg-[#F3EBDA]" />
                      <div className="truncate max-w-xs">
                        <p className="font-serif font-bold text-sm text-[#1E1B16] truncate">{prod.name}</p>
                        <p className="text-[11px] text-[#7A8F6C]">{prod.size || 'Standard Size'}</p>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#8C6D2F]">{prod.category}</td>
                    <td className="p-4 font-bold text-[#1E1B16]">
                      ₹{prod.price} {prod.originalPrice && <span className="line-through text-gray-400 text-[10px] ml-1">₹{prod.originalPrice}</span>}
                    </td>
                    <td className="p-4 flex items-center gap-1 font-bold text-[#B9964A]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{prod.rating || 5.0}</span>
                      <span className="text-gray-400 text-[10px]">({prod.reviewsCount})</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      {prod.isBestSeller && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Best Seller
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-2 text-[#2F4A3D] hover:bg-[#FAF4E8] rounded-xl transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(id, prod.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete"
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FBF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DCC4] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#2F4A3D] text-white p-5 flex items-center justify-between shrink-0">
              <h3 className="font-serif font-bold text-xl text-[#FBF8F2]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-white/70 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Category</label>
                  <select
                    value={formData.category || 'Hair Care'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  >
                    <option value="Hair Care">Hair Care</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Tablets">Tablets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice || 0}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B16] mb-1">Package Size</label>
                  <input
                    type="text"
                    value={formData.size || ''}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="e.g. 200 ml / 60 Tablets"
                    className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Product Image URL</label>
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
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl p-3 text-[#1E1B16]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B16] mb-1">Usage Instructions</label>
                <input
                  type="text"
                  value={formData.usage || ''}
                  onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  className="w-full bg-white border border-[#E8DCC4] rounded-xl px-3.5 py-2 text-[#1E1B16]"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#1E1B16]">
                  <input
                    type="checkbox"
                    checked={formData.inStock ?? true}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="accent-[#B9964A]"
                  />
                  <span>In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#1E1B16]">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller ?? false}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-[#B9964A]"
                  />
                  <span>Mark as Best Seller</span>
                </label>
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
                  {isSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

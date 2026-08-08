import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product, PageView } from '../types';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { Search, Filter, Star, ShoppingBag, Eye, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

interface ShopPageProps {
  setCurrentPage: (page: PageView) => void;
  openQuickView: (product: Product) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  setCurrentPage,
  openQuickView,
  initialCategory,
  initialSearch = '',
}) => {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const categories = [
    'All',
    'Hair Care',
    'Pain Relief',
    'Tablets',
  ];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(1000);
    setSortBy('featured');
  };

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#8C6D2F] uppercase tracking-widest bg-[#FAF4E8] px-3.5 py-1 rounded-full border border-[#B9964A]/30">
            Apothecary Shop
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B16] mt-3">
            Natural Medicines & Organics
          </h1>
          <p className="text-xs sm:text-sm text-[#4A453D] mt-2">
            100% authentic Unani & Ayurvedic formulations for hair care, pain relief, sugar control & acidity relief.
          </p>
          <BotanicalDivider />
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white p-4 rounded-3xl border border-[#E8DCC4] shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products, ingredients, or conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
            />
            <Search className="w-4 h-4 text-[#B9964A] absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#7A8F6C] hover:text-[#1E1B16]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-medium text-[#4A453D]">
              <SlidersHorizontal className="w-4 h-4 text-[#B9964A]" />
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-2 text-xs text-[#1E1B16] font-semibold focus:outline-none focus:ring-1 focus:ring-[#B9964A]"
              >
                <option value="featured">Dr. Zaid's Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Patient Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3EBDA]">
                <h3 className="font-serif font-bold text-base text-[#1E1B16] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#B9964A]" />
                  <span>Categories</span>
                </h3>
                {(selectedCategory !== 'All' || searchQuery || maxPrice < 1000) && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#8C6D2F] font-semibold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#B9964A] text-white font-semibold shadow-xs'
                          : 'text-[#4A453D] hover:bg-[#F3EBDA] hover:text-[#1E1B16]'
                      }`}
                    >
                      <span>{cat}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#F3EBDA]">
                <div className="flex justify-between items-center text-xs font-bold text-[#1E1B16] mb-2">
                  <span>Max Price:</span>
                  <span className="text-[#B9964A]">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#B9964A] bg-[#F3EBDA] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#7A8F6C] mt-1">
                  <span>₹200</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E8DCC4] p-12 text-center">
                <div className="w-16 h-16 bg-[#F3EBDA] text-[#B9964A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1E1B16] mb-2">
                  No Matching Products Found
                </h3>
                <p className="text-xs text-[#4A453D] max-w-md mx-auto mb-6">
                  We couldn't find any products matching your current filters or search term "{searchQuery}".
                </p>
                <Button variant="primary" onClick={resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl border border-[#E8DCC4] p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative bg-[#F3EBDA] rounded-2xl overflow-hidden mb-4 p-4 aspect-4/3 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-44 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />

                        {product.isBestSeller && (
                          <span className="absolute top-3 left-3 bg-[#B9964A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Best Seller
                          </span>
                        )}

                        <button
                          onClick={() => openQuickView(product)}
                          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#1E1B16] p-2 rounded-xl shadow-md backdrop-blur-xs transition-all hover:scale-110"
                          title="Quick Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#7A8F6C] mb-1">
                        <span className="font-semibold text-[#8C6D2F] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span>{product.size}</span>
                      </div>

                      <h3
                        onClick={() => setCurrentPage({ type: 'product-detail', productId: product.id })}
                        className="font-serif font-bold text-base text-[#1E1B16] hover:text-[#B9964A] cursor-pointer line-clamp-2 leading-snug mb-2 transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#4A453D] line-clamp-2 leading-relaxed mb-4">
                        {product.shortDesc}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#F3EBDA] mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#B9964A] text-[#B9964A]" />
                          <span className="text-xs font-bold text-[#1E1B16]">{product.rating}</span>
                          <span className="text-[10px] text-[#7A8F6C]">({product.reviewsCount})</span>
                        </div>

                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif font-bold text-lg text-[#1E1B16]">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#7A8F6C] line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        fullWidth
                        size="sm"
                        onClick={() => addToCart(product, 1)}
                        className="gap-1.5 text-xs py-2.5"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Basket</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

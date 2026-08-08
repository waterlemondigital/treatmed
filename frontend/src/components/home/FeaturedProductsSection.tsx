import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { Product, PageView } from '../../types';
import { fetchProducts } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { Star, ShoppingBag, Eye, ArrowRight, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeaturedProductsSectionProps {
  setCurrentPage: (page: PageView) => void;
  openQuickView: (product: Product) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  setCurrentPage,
  openQuickView,
}) => {
  const { addToCart } = useCart();
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<string>('All');

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProductsList(data);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'Hair Care', 'Pain Relief', 'Tablets'];

  const filteredProducts = productsList.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Hair Care') return p.category === 'Hair Care';
    if (activeTab === 'Pain Relief') return p.category === 'Pain Relief';
    if (activeTab === 'Tablets') return p.category === 'Tablets';
    return true;
  });

  return (
    <section className="py-20 bg-[#F5EFE0] relative border-b-2 border-[#E3D4B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8C3F2B] uppercase tracking-widest bg-[#F3E6CE] px-3.5 py-1 rounded-full border border-[#C89B3C]/40">
            Handcrafted Botanical Apothecary
          </span>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C382B] mt-3">
            Featured Herbal Medicines & Remedies
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4335] mt-2 leading-relaxed">
            Formulated using pure cold-pressed oils, unheated wild Sidr honey, and high-potency Unani botanical extracts.
          </p>

          <BotanicalDivider variant="gold" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-12">
          {categories.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#1C382B] text-white shadow-lg border border-[#C89B3C]'
                  : 'bg-[#FFFDF7] text-[#4A4335] hover:bg-[#F9F5EC] hover:text-[#1C382B] border border-[#E3D4B5]'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProducts.slice(0, 6).map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                key={product.id}
                className="bg-[#FFFDF7] rounded-3xl border-2 border-[#E3D4B5] p-5 shadow-sm hover:shadow-2xl hover:border-[#C89B3C] transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative bg-[#F5EFE0] rounded-2xl overflow-hidden mb-4 p-4 aspect-4/3 flex items-center justify-center border border-[#E3D4B5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-48 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isBestSeller && (
                        <span className="bg-[#8C3F2B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                          Best Seller
                        </span>
                      )}
                      <span className="bg-[#1C382B] text-[#C89B3C] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#C89B3C]/50 flex items-center gap-1 shadow-xs">
                        <Leaf className="w-3 h-3" />
                        100% Herbal
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => openQuickView(product)}
                      className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#1C382B] p-2.5 rounded-xl shadow-md backdrop-blur-xs transition-all hover:scale-110 border border-[#E3D4B5]"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Category & Size */}
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-[#8C3F2B] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="text-[#5C7351] font-semibold">{product.size}</span>
                  </div>

                  {/* Name */}
                  <h3
                    onClick={() => setCurrentPage({ type: 'product-detail', productId: product.id })}
                    className="font-serif font-bold text-base text-[#1C382B] hover:text-[#C89B3C] cursor-pointer line-clamp-2 leading-snug mb-2 transition-colors"
                  >
                    {product.name}
                  </h3>

                  {/* Key Ingredients snippet */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.ingredients.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="bg-[#F5EFE0] text-[#1C382B] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#E3D4B5]">
                          {ing.split('(')[0].trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-[#4A4335] line-clamp-2 leading-relaxed mb-4">
                    {product.shortDesc}
                  </p>
                </div>

                <div>
                  {/* Rating & Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E3D4B5] mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C89B3C] text-[#C89B3C]" />
                      <span className="text-xs font-bold text-[#1C382B]">{product.rating}</span>
                      <span className="text-[10px] text-[#5C7351]">({product.reviewsCount})</span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif font-bold text-lg text-[#1C382B]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#5C7351] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      fullWidth
                      size="sm"
                      onClick={() => addToCart(product, 1)}
                      className="gap-1.5 text-xs py-3"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>Add To Basket</span>
                    </Button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCurrentPage({ type: 'shop' })}
            className="gap-2 px-8 py-4 border-2 border-[#1C382B] text-[#1C382B] hover:bg-[#1C382B] hover:text-white transform transition-transform hover:scale-[1.02]"
          >
            <span>Explore Complete Shop Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
          </Button>
        </div>

      </div>
    </section>
  );
};



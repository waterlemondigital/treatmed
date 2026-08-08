import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, STORE_INFO } from '../data/mockData';
import { Product, PageView } from '../types';
import { fetchProducts, fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { 
  Star, 
  ShoppingBag, 
  MessageSquare, 
  Check, 
  ShieldCheck, 
  Leaf, 
  ArrowLeft, 
  Award, 
  Truck,
  RotateCcw
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  setCurrentPage: (page: PageView) => void;
  openQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  setCurrentPage,
  openQuickView,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');
  const [product, setProduct] = useState<Product>(() => {
    return MOCK_PRODUCTS.find((p) => (p as any)._id === productId || p.id === productId) || MOCK_PRODUCTS[0];
  });
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    fetchProductById(productId)
      .then((data) => {
        if (data) setProduct(data);
      })
      .catch(() => {});

    fetchProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAllProducts(data);
      })
      .catch(() => {});
  }, [productId]);

  const relatedProducts = allProducts.filter(
    (p) => ((p as any)._id || p.id) !== ((product as any)._id || product.id) && p.category === product.category
  ).concat(allProducts.filter((p) => ((p as any)._id || p.id) !== ((product as any)._id || product.id))).slice(0, 3);

  const handleWhatsAppOrder = () => {
    const text = `Hello Treatmed Store, I would like to order *${product.name}* (x${quantity}, Price: ₹${product.price * quantity}). Please guide me.`;
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={() => setCurrentPage({ type: 'shop' })}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D2F] hover:text-[#1E1B16] mb-8 bg-white px-3.5 py-2 rounded-xl border border-[#E8DCC4] shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Apothecary Catalog</span>
        </button>

        {/* Product Details Card */}
        <div className="bg-white rounded-3xl border border-[#E8DCC4] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#F3EBDA] w-full rounded-3xl p-8 relative flex items-center justify-center aspect-square border border-[#E8DCC4]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-72 sm:max-h-80 object-contain mix-blend-multiply"
              />
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-[#B9964A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Dr. Zaid's Choice
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <div className="p-3 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] text-center">
                <Leaf className="w-5 h-5 text-[#2F4A3D] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-[#1E1B16]">100% Herbal</p>
              </div>
              <div className="p-3 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] text-center">
                <Award className="w-5 h-5 text-[#B9964A] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-[#1E1B16]">Doctor Formulated</p>
              </div>
              <div className="p-3 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] text-center">
                <ShieldCheck className="w-5 h-5 text-[#8C6D2F] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-[#1E1B16]">Authentic</p>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Buy Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#8C6D2F] bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#B9964A]/30">
                  {product.category}
                </span>
                <span className="text-xs text-[#7A8F6C] font-semibold">{product.size}</span>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1E1B16] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#B9964A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1E1B16]">{product.rating}</span>
                <span className="text-xs text-[#7A8F6C]">({product.reviewsCount} verified patient reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 p-4 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] w-fit">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B16]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#7A8F6C] line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  In Stock • Mira Road Clinic
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#4A453D] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Tab Selector */}
              <div className="border-b border-[#E8DCC4] flex gap-4 mb-4">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 text-xs font-bold transition-all border-b-2 ${
                    activeTab === 'benefits'
                      ? 'border-[#B9964A] text-[#B9964A]'
                      : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
                  }`}
                >
                  Key Benefits
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 text-xs font-bold transition-all border-b-2 ${
                    activeTab === 'ingredients'
                      ? 'border-[#B9964A] text-[#B9964A]'
                      : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 text-xs font-bold transition-all border-b-2 ${
                    activeTab === 'usage'
                      ? 'border-[#B9964A] text-[#B9964A]'
                      : 'border-transparent text-[#7A8F6C] hover:text-[#1E1B16]'
                  }`}
                >
                  Usage Instructions
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-[#E8DCC4] mb-8 text-xs text-[#4A453D]">
                {activeTab === 'benefits' && (
                  <div className="space-y-2">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2F4A3D] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="bg-white px-3 py-1.5 rounded-xl border border-[#E8DCC4] font-medium text-[#1E1B16]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'usage' && (
                  <p className="leading-relaxed text-[#1E1B16]">{product.usage}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#E8DCC4]">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center border-2 border-[#E8DCC4] rounded-xl bg-white overflow-hidden w-full sm:w-auto shrink-0 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-sm text-[#4A453D] hover:bg-[#F3EBDA]"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-[#1E1B16]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-sm text-[#4A453D] hover:bg-[#F3EBDA]"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => addToCart(product, quantity)}
                  className="w-full gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add To Basket (₹{product.price * quantity})</span>
                </Button>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold py-3.5 rounded-xl text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h3 className="font-serif font-bold text-2xl text-[#1E1B16] mb-6">
            Related Natural Formulations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl border border-[#E8DCC4] p-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-40 object-contain bg-[#F3EBDA] rounded-2xl p-2 mb-3 mix-blend-multiply"
                  />
                  <span className="text-[10px] font-bold text-[#8C6D2F] uppercase">{rel.category}</span>
                  <h4
                    onClick={() => setCurrentPage({ type: 'product-detail', productId: rel.id })}
                    className="font-serif font-bold text-sm text-[#1E1B16] hover:text-[#B9964A] cursor-pointer line-clamp-1 mb-1"
                  >
                    {rel.name}
                  </h4>
                  <p className="text-[11px] text-[#7A8F6C] font-bold mb-3">₹{rel.price}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setCurrentPage({ type: 'product-detail', productId: rel.id })}
                  className="text-xs py-1.5"
                >
                  View Product
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

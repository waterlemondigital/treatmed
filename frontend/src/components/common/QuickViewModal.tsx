import React, { useState } from 'react';
import { Product, PageView } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';
import { X, Star, ShoppingBag, Check, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  setCurrentPage,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#FBF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DCC4] overflow-hidden animate-in zoom-in-95 duration-200 relative flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#1E1B16] rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-[#F3EBDA] relative flex items-center justify-center p-6 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-64 object-contain rounded-2xl shadow-lg mix-blend-multiply"
          />
          {product.isBestSeller && (
            <span className="absolute top-4 left-4 bg-[#B9964A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Dr. Zaid's Choice
            </span>
          )}
        </div>

        {/* Details Content */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-[#8C6D2F] bg-[#FAF4E8] px-2.5 py-0.5 rounded-full border border-[#B9964A]/30">
                {product.category}
              </span>
              <span className="text-[11px] text-[#7A8F6C]">{product.size}</span>
            </div>

            <h3 className="font-serif font-bold text-lg text-[#1E1B16] leading-snug mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-[#B9964A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1E1B16]">{product.rating}</span>
              <span className="text-xs text-[#7A8F6C]">({product.reviewsCount} reviews)</span>
            </div>

            <p className="text-xs text-[#4A453D] leading-relaxed mb-4">
              {product.shortDesc}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold font-serif text-[#1E1B16]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#7A8F6C] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Key benefits list */}
            <div className="space-y-1.5 mb-6">
              <h5 className="text-[11px] font-bold text-[#1E1B16] uppercase tracking-wider flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[#2F4A3D]" />
                Key Benefits
              </h5>
              {product.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-[#4A453D]">
                  <Check className="w-3.5 h-3.5 text-[#B9964A] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E8DCC4]">
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E8DCC4] rounded-xl bg-white overflow-hidden shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm text-[#4A453D] hover:bg-[#F3EBDA]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#1E1B16]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm text-[#4A453D] hover:bg-[#F3EBDA]"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                onClick={handleAddToCart}
                fullWidth
                className="gap-2 text-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Basket (₹{product.price * quantity})</span>
              </Button>
            </div>

            <button
              onClick={() => {
                onClose();
                setCurrentPage({ type: 'product-detail', productId: product.id });
              }}
              className="w-full text-center text-xs font-semibold text-[#8C6D2F] hover:text-[#1E1B16] flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Full Ingredients & Detailed Usage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

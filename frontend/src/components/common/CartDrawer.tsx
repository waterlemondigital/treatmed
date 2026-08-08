import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PageView } from '../../types';
import { Button } from './Button';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  setCurrentPage: (page: PageView) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ setCurrentPage }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    total,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'TREATMED10' || couponCode.trim().toUpperCase() === 'ZAID10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountApplied(discount);
      setCouponMsg({ text: '10% Unani Welcome Discount Applied!', success: true });
    } else {
      setCouponMsg({ text: 'Invalid coupon code. Try TREATMED10', success: false });
    }
  };

  const finalTotal = Math.max(0, total - discountApplied);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-[#FBF8F2] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#E8DCC4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#B9964A]/10 text-[#B9964A]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1E1B16]">Your Basket</h3>
              <p className="text-xs text-[#7A8F6C]">{cart.length} unique item(s)</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-[#4A453D] hover:bg-[#F3EBDA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-[#F3EBDA] text-[#B9964A] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 stroke-1" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#1E1B16] mb-1">Your Basket is Empty</h4>
              <p className="text-xs text-[#4A453D] mb-6">
                Explore Dr. Zaid's authentic Unani oils, tablets, dates, and wild honey.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentPage({ type: 'shop' });
                }}
              >
                Browse Medicines & Products
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-3.5 rounded-2xl border border-[#E8DCC4] flex gap-3.5 shadow-xs relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0 bg-[#F3EBDA]"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-medium text-xs text-[#1E1B16] line-clamp-2 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded-md transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#7A8F6C] mt-0.5">{item.selectedSize || item.product.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3EBDA]">
                    <div className="flex items-center border border-[#E8DCC4] rounded-lg bg-[#FBF8F2] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 text-[#4A453D] hover:bg-[#E8DCC4] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#1E1B16] min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 text-[#4A453D] hover:bg-[#E8DCC4] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-sm text-[#1E1B16]">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8DCC4] bg-white space-y-3">
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. TREATMED10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full text-xs uppercase bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3 py-2 pr-8 text-[#1E1B16] focus:outline-none focus:ring-1 focus:ring-[#B9964A]"
                />
                <Tag className="w-3.5 h-3.5 text-[#B9964A] absolute right-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="bg-[#2F4A3D] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-[#1F3229]"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p className={`text-[11px] font-medium ${couponMsg.success ? 'text-emerald-700' : 'text-red-600'}`}>
                {couponMsg.text}
              </p>
            )}

            <div className="space-y-1.5 text-xs text-[#4A453D] pt-2 border-t border-[#F3EBDA]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1E1B16]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE (Order &gt; ₹999)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              {discountApplied > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountApplied}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif font-bold text-[#1E1B16] pt-2 border-t border-[#E8DCC4]">
                <span>Total Amount</span>
                <span className="text-[#B9964A]">₹{finalTotal}</span>
              </div>
            </div>

            <div className="pt-2 gap-2 flex">
              <Button
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentPage({ type: 'cart' });
                }}
              >
                View Full Cart
              </Button>
              <Button
                variant="primary"
                className="flex-1 text-xs gap-1.5"
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentPage({ type: 'cart' });
                }}
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A8F6C] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B9964A]" />
              <span>100% Authentic Products • Direct In-Clinic Pickup or Express Home Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

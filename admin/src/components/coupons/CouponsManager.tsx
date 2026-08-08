import React from 'react';
import { Tag, CheckCircle2, X } from 'lucide-react';

export const CouponsManager: React.FC = () => {
  const coupons = [
    {
      code: 'TREATMED10',
      discountPercent: 10,
      isActive: true,
      minOrderAmount: 0,
      expiresAt: '2027-12-31',
    },
    {
      code: 'UNANI20',
      discountPercent: 20,
      isActive: true,
      minOrderAmount: 999,
      expiresAt: '2026-12-31',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E8DCC4] p-6 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#1E1B16] border-b border-[#F3EBDA] pb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#B9964A]" />
          <span>Active Coupon Codes & Promotional Discounts</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons.map((c, idx) => (
            <div key={idx} className="p-5 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] flex justify-between items-center shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-lg text-[#1E1B16]">{c.code}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[#8C6D2F] font-bold mt-1">{c.discountPercent}% Discount</p>
                <p className="text-[11px] text-gray-500">Min Order: ₹{c.minOrderAmount}</p>
              </div>

              <div className="p-3 bg-[#2F4A3D] text-[#B9964A] rounded-2xl font-serif font-bold text-xl">
                {c.discountPercent}% OFF
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

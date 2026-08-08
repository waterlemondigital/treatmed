import React from 'react';
import { Review } from '../../types';
import { Star, CheckCircle2 } from 'lucide-react';

interface ReviewsManagerProps {
  reviews: Review[];
}

export const ReviewsManager: React.FC<ReviewsManagerProps> = ({ reviews }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E8DCC4] p-6 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#1E1B16] border-b border-[#F3EBDA] pb-3">
          Customer & Patient Reviews ({reviews.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => {
            const id = (rev as any)._id || rev.id;
            return (
              <div key={id} className="p-4 bg-[#FBF8F2] rounded-2xl border border-[#E8DCC4] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#1E1B16]">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-amber-500 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1">{rev.rating} / 5</span>
                  </div>
                </div>

                <p className="font-serif font-bold text-xs text-[#2F4A3D]">{rev.title}</p>
                <p className="text-xs text-[#4A453D] leading-relaxed">{rev.comment}</p>

                {rev.treatmentOrProduct && (
                  <p className="text-[10px] text-[#8C6D2F] font-semibold pt-1">
                    Tagged: {rev.treatmentOrProduct}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

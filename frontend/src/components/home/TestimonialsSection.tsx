import React from 'react';
import { MOCK_REVIEWS } from '../../data/mockData';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { Star, Quote, CheckCircle, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F9F5EC] relative border-b-2 border-[#E3D4B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#1C382B] uppercase tracking-widest bg-[#EADBB8] px-4 py-1.5 rounded-full border border-[#C89B3C]/50">
            Real Patient Experiences
          </span>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C382B] mt-3">
            Trusted by Families Across Mumbai & Beyond
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4335] mt-2 leading-relaxed">
            Verified recovery stories and product experiences from patients treated at our Mira Road store and clinical facility.
          </p>

          <BotanicalDivider variant="gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFDF7] rounded-3xl border-2 border-[#E3D4B5] p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#C89B3C] transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-[#C89B3C]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                <div className="flex text-[#C89B3C] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#C89B3C]" />
                  ))}
                </div>

                <h3 className="font-serif font-bold text-base text-[#1C382B] mb-2 leading-snug">
                  "{review.title}"
                </h3>

                <p className="text-xs text-[#4A4335] leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3D4B5] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#1C382B] flex items-center gap-1.5">
                    <span>{review.author}</span>
                    {review.verifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 bg-[#F5EFE0] text-[#1C382B] text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-[#E3D4B5]">
                        <CheckCircle className="w-3 h-3 text-[#1C382B]" />
                        Verified Patient
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-[#8C3F2B] font-semibold mt-0.5">{review.treatmentOrProduct}</p>
                </div>
                <span className="text-[10px] text-[#5C7351] font-medium">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


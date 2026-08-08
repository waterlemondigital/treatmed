import React from 'react';
import { MOCK_TREATMENTS } from '../data/mockData';
import { PageView } from '../types';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { ShieldAlert, Sparkles, Flame, Heart, Scissors, Check, Calendar, ArrowRight } from 'lucide-react';

interface TreatmentsPageProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  setCurrentPage,
  openBookingModal,
}) => {
  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#8C6D2F] uppercase tracking-widest bg-[#FAF4E8] px-3.5 py-1 rounded-full border border-[#B9964A]/30">
            Specialized Care Protocols
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B16] mt-3">
            Targeted Clinical Treatments
          </h1>
          <p className="text-xs sm:text-sm text-[#4A453D] mt-2">
            Non-invasive Unani medical treatment plans for chronic joint, skin, liver, hair & reproductive conditions.
          </p>
          <BotanicalDivider />
        </div>

        <div className="space-y-10">
          {MOCK_TREATMENTS.map((treatment, idx) => (
            <div
              key={treatment.id}
              className="bg-white rounded-3xl border border-[#E8DCC4] p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden h-72 border-2 border-[#E8DCC4]">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="bg-[#B9964A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {treatment.recommendedDuration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#B5652D] uppercase tracking-wider">
                    {treatment.category}
                  </span>
                  <h2 className="font-serif font-bold text-2xl text-[#1E1B16] mt-1">
                    {treatment.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#4A453D] leading-relaxed">
                  {treatment.summary}
                </p>

                <div className="bg-[#FAF4E8] p-4 rounded-2xl border border-[#E8DCC4] space-y-2">
                  <h4 className="text-xs font-bold text-[#1E1B16] uppercase tracking-wider">
                    Symptoms Addressed & Unani Strategy:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A453D]">
                    {treatment.symptomsAddressed.map((s, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2F4A3D] shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#4A453D] leading-relaxed">
                  <strong className="text-[#1E1B16]">Protocol Overview:</strong> {treatment.unaniApproach}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => openBookingModal(treatment.title)}
                    className="gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation with Dr. Zaid</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

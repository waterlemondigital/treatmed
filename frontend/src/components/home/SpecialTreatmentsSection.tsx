import React, { useState, useEffect } from 'react';
import { MOCK_TREATMENTS } from '../../data/mockData';
import { Treatment, PageView } from '../../types';
import { fetchTreatments } from '../../services/api';
import { Button } from '../common/Button';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { ShieldAlert, Sparkles, Flame, Heart, Scissors, CheckCircle, ArrowRight, Activity, Leaf } from 'lucide-react';

interface SpecialTreatmentsSectionProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const SpecialTreatmentsSection: React.FC<SpecialTreatmentsSectionProps> = ({
  setCurrentPage,
  openBookingModal,
}) => {
  const [treatmentsList, setTreatmentsList] = useState<Treatment[]>(MOCK_TREATMENTS);

  useEffect(() => {
    fetchTreatments()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTreatmentsList(data);
      })
      .catch(() => {});
  }, []);
  const getTreatmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <Activity className="w-5 h-5 text-[#C89B3C]" />;
      case 'Sparkle': return <Sparkles className="w-5 h-5 text-[#C89B3C]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#C89B3C]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#C89B3C]" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#C89B3C]" />;
      default: return <Activity className="w-5 h-5 text-[#C89B3C]" />;
    }
  };

  return (
    <section className="py-20 bg-[#F5EFE0] relative border-b-2 border-[#E3D4B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#8C3F2B] uppercase tracking-widest bg-[#F3E6CE] px-4 py-1.5 rounded-full border border-[#C89B3C]/40">
            Specialized Chronic Care Focus
          </span>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C382B] mt-3">
            Targeted Unani & Ayurvedic Clinical Protocols
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4335] mt-2 leading-relaxed">
            Non-invasive, herbal-first clinical care designed for chronic joint, digestive, scalp, and metabolic conditions.
          </p>

          <BotanicalDivider variant="terracotta" />
        </div>

        {/* 5 Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentsList.map((treatment) => {
            const id = (treatment as any)._id || treatment.id;
            return (
              <div
                key={id}
              className="bg-[#FFFDF7] rounded-3xl border-2 border-[#E3D4B5] p-6 shadow-sm hover:shadow-2xl hover:border-[#C89B3C] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#1C382B] border border-[#C89B3C]/40 rounded-2xl shrink-0 shadow-xs">
                    {getTreatmentIcon(treatment.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3F2B]">
                      {treatment.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#1C382B] leading-snug">
                      {treatment.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#4A4335] leading-relaxed mb-4">
                  {treatment.summary}
                </p>

                {/* Symptoms addressed */}
                <div className="bg-[#F5EFE0] p-3.5 rounded-2xl border border-[#E3D4B5] mb-4 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C3F2B]">
                    Primary Focus & Symptoms Addressed:
                  </p>
                  {treatment.symptomsAddressed.map((symptom, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#1C382B]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#1C382B] shrink-0" />
                      <span className="font-medium">{symptom}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-[#4A4335] mb-4 leading-relaxed bg-[#FFFDF7] p-3 rounded-xl border border-[#E3D4B5]">
                  <strong className="text-[#1C382B]">Botanical Approach:</strong> {treatment.unaniApproach}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3D4B5] flex items-center justify-between">
                <span className="text-[11px] text-[#5C7351] font-bold flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-[#C89B3C]" />
                  {treatment.recommendedDuration}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openBookingModal(treatment.title)}
                  className="text-xs py-2 px-4 border-[#1C382B] text-[#1C382B] hover:bg-[#1C382B] hover:text-white"
                >
                  Consult Doctor
                </Button>
              </div>
            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
};


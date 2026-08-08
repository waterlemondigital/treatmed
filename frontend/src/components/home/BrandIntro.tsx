import React from 'react';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { PageView } from '../../types';
import { DOCTOR_INFO } from '../../data/mockData';
import { Award, ShieldCheck, HeartPulse, Check, ArrowRight, Sparkles, Flame, Droplets, Sun, Wind, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface BrandIntroProps {
  setCurrentPage: (page: PageView) => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ setCurrentPage }) => {
  const humorsList = [
    { name: 'Dam (Blood)', quality: 'Hot & Moist', icon: <Flame className="w-4 h-4 text-[#8C3F2B]" />, bg: 'bg-[#F9ECE7] border-[#8C3F2B]/30 text-[#8C3F2B]' },
    { name: 'Balgham (Phlegm)', quality: 'Cold & Moist', icon: <Droplets className="w-4 h-4 text-[#2F4A3D]" />, bg: 'bg-[#EBF2EE] border-[#2F4A3D]/30 text-[#2F4A3D]' },
    { name: 'Safra (Yellow Bile)', quality: 'Hot & Dry', icon: <Sun className="w-4 h-4 text-[#C89B3C]" />, bg: 'bg-[#FAF3E5] border-[#C89B3C]/30 text-[#8C6D2F]' },
    { name: 'Sauda (Black Bile)', quality: 'Cold & Dry', icon: <Wind className="w-4 h-4 text-[#5C7351]" />, bg: 'bg-[#F2F5F0] border-[#5C7351]/30 text-[#5C7351]' },
  ];

  return (
    <section className="py-20 bg-[#F9F5EC] border-b-2 border-[#E3D4B5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-3xl p-8 sm:p-12 border-2 border-[#C89B3C]/50 shadow-xl relative overflow-hidden">
          
          {/* Corner Botanical Flourish */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#1C382B]">
              <path d="M100 0 L0 0 L100 100 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Doctor Spotlight */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-[#E3D4B5] pb-8 lg:pb-0 lg:pr-8">
              <div className="relative mb-5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#1C382B] p-1.5 shadow-2xl border-2 border-[#C89B3C]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
                    alt={DOCTOR_INFO.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <div className="absolute -bottom-2 right-0 bg-[#C89B3C] text-black text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider border border-white">
                  B.U.M.S.
                </div>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C382B] mb-1">
                {DOCTOR_INFO.name}
              </h3>

              <p className="text-xs font-bold text-[#8C3F2B] uppercase tracking-wider mb-2">
                {DOCTOR_INFO.title}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-[11px] text-[#5C7351] font-semibold mb-4">
                <span className="bg-[#F5EFE0] px-2.5 py-0.5 rounded-md border border-[#E3D4B5] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C89B3C]" />
                  Jamia Hamdard (2017)
                </span>
                <span className="bg-[#F5EFE0] px-2.5 py-0.5 rounded-md border border-[#E3D4B5] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#8C3F2B]" />
                  8+ Yrs Experience
                </span>
              </div>

              <blockquote className="text-xs sm:text-sm text-[#4A4335] leading-relaxed italic bg-[#F5EFE0] p-4 rounded-2xl border border-[#E3D4B5] mb-5">
                "{DOCTOR_INFO.quote}"
              </blockquote>

              <button
                onClick={() => setCurrentPage({ type: 'about' })}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1C382B] hover:text-[#8C3F2B] transition-colors"
              >
                <span>Read Full Statement & Philosophy</span>
                <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
              </button>
            </div>

            {/* Right Pillars & Mizaj Concept */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#8C3F2B] uppercase tracking-widest bg-[#F3E6CE] px-3 py-1 rounded-full border border-[#C89B3C]/40">
                  The Four Vital Humors ( الاخلاط الأربعة )
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#1C382B] mt-3">
                  Restoring Internal Balance & Mizaj
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed">
                Tibb-e-Unani and Ayurveda identify four core vital humors within the body. When humors lose balance due to dietary stress or weather, discomfort begins. Treatmed formulates herbs specifically designed to harmonize your natural metabolic temperament:
              </p>

              {/* 4 Humors Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {humorsList.map((h, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-3 rounded-2xl border ${h.bg} text-center space-y-1 transition-shadow hover:shadow-md cursor-default`}
                  >
                    <div className="mx-auto w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                      {h.icon}
                    </div>
                    <p className="font-serif font-bold text-xs leading-tight">{h.name}</p>
                    <p className="text-[10px] font-semibold opacity-80">{h.quality}</p>
                  </motion.div>
                ))}
              </div>

              {/* Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#F9F5EC] p-4 rounded-2xl border border-[#E3D4B5] space-y-1 hover:border-[#C89B3C] transition-colors">
                  <div className="flex items-center gap-2 text-[#1C382B] font-bold text-xs">
                    <Check className="w-4 h-4 text-[#C89B3C]" />
                    <span>Holistic Nabd (Pulse) Assessment</span>
                  </div>
                  <p className="text-[11px] text-[#5C7351] font-medium">
                    Evaluates deep arterial pulse to identify root humor imbalance before prescribing.
                  </p>
                </div>

                <div className="bg-[#F9F5EC] p-4 rounded-2xl border border-[#E3D4B5] space-y-1 hover:border-[#C89B3C] transition-colors">
                  <div className="flex items-center gap-2 text-[#1C382B] font-bold text-xs">
                    <Check className="w-4 h-4 text-[#C89B3C]" />
                    <span>Wildcrafted Botanical Formulations</span>
                  </div>
                  <p className="text-[11px] text-[#5C7351] font-medium">
                    Hand-compounded with cold-pressed oils, mountain Sidr honey, and pure herbal roots.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};



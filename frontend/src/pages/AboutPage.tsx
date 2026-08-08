import React from 'react';
import { STORE_INFO, DOCTOR_INFO } from '../data/mockData';
import { PageView } from '../types';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { Award, Leaf, ShieldCheck, Heart, MapPin, Calendar, CheckCircle2, Quote, GraduationCap, HeartPulse, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage, openBookingModal }) => {
  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#8C6D2F] uppercase tracking-widest bg-[#FAF4E8] px-3.5 py-1 rounded-full border border-[#B9964A]/30">
            Heritage & Healing
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B16] mt-3">
            About Treatmed Store & Clinic
          </h1>
          <p className="text-xs sm:text-sm text-[#4A453D] mt-2">
            Bringing authentic Unani & Ayurvedic apothecary traditions to Mira Road under expert physician care.
          </p>
          <BotanicalDivider />
        </div>

        {/* Doctor Spotlight & Message Section */}
        <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#C89B3C]/50 p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#1C382B]">
              <path d="M50 0 C20 30, 0 60, 50 100 C100 60, 80 30, 50 0 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Doctor Photo & Qualifications Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-[#C89B3C] shadow-2xl bg-[#1C382B]">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                  alt={DOCTOR_INFO.name}
                  className="w-full h-80 sm:h-[420px] object-cover"
                />

                {/* Overlaid Doctor Details */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1C382B]/95 backdrop-blur-md p-4 rounded-2xl border border-[#C89B3C] text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-[#C89B3C] text-lg">{DOCTOR_INFO.name}</p>
                    <span className="bg-[#C89B3C] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      B.U.M.S.
                    </span>
                  </div>
                  <p className="text-xs text-[#E3D4B5] font-medium">{DOCTOR_INFO.title}</p>
                  <p className="text-[11px] text-[#A3B899] flex items-center gap-1 pt-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>Jamia Hamdard University, New Delhi (2017)</span>
                  </p>
                </div>
              </div>

              {/* Badge strip */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="bg-[#F5EFE0] text-[#1C382B] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#C89B3C]/40 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C89B3C]" />
                  <span>8+ Years Clinical Practice</span>
                </span>
                <span className="bg-[#F5EFE0] text-[#1C382B] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#C89B3C]/40 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-[#8C3F2B]" />
                  <span>Hijama Cupping Specialist</span>
                </span>
              </div>
            </div>

            {/* Right Message Body */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8C3F2B] uppercase tracking-widest bg-[#F3E6CE] px-3.5 py-1 rounded-full border border-[#C89B3C]/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Message From Our Founder</span>
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C382B] leading-tight">
                "Healthcare should be rooted in trust, compassion, and excellence."
              </h2>

              <div className="bg-[#F9F5EC] p-6 sm:p-8 rounded-2xl border-2 border-[#E3D4B5] space-y-4 relative">
                <Quote className="w-10 h-10 text-[#C89B3C]/30 absolute top-4 right-4 pointer-events-none" />

                <p className="text-sm sm:text-base text-[#1C382B] font-medium leading-relaxed italic">
                  "{DOCTOR_INFO.fullBio[0]}"
                </p>

                <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed">
                  {DOCTOR_INFO.fullBio[1]}
                </p>

                <div className="p-4 bg-[#FFFDF7] rounded-xl border-l-4 border-[#C89B3C] shadow-xs">
                  <p className="text-xs sm:text-sm font-serif font-bold text-[#8C3F2B] italic">
                    "{DOCTOR_INFO.fullBio[2]}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed">
                  {DOCTOR_INFO.fullBio[3]}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#E3D4B5]">
                  <div>
                    <p className="font-serif font-bold text-sm text-[#1C382B]">{DOCTOR_INFO.name}</p>
                    <p className="text-[11px] text-[#5C7351] font-semibold">{DOCTOR_INFO.title} • Treatmed Clinic</p>
                  </div>
                  <Button variant="forest" size="sm" onClick={() => openBookingModal('Unani Consulting')}>
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder & Story Section */}
        <div className="bg-white rounded-3xl border border-[#E8DCC4] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-12 space-y-5">
            <span className="text-xs font-bold text-[#2F4A3D] uppercase tracking-widest bg-[#EDF2EA] px-3 py-1 rounded-full">
              Our Established Heritage
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1E1B16]">
              From Offline Apothecary to Digital Healing
            </h2>
            <p className="text-xs sm:text-sm text-[#4A453D] leading-relaxed">
              Treatmed began as a dedicated physical store in Kanakia, Mira Road, serving local residents with high-purity Unani medicines, cold-pressed kalonji oils, raw Sidr honey, and Madinah dates. Under the guidance of <strong className="text-[#1E1B16]">{DOCTOR_INFO.name}</strong>, Treatmed expanded to incorporate certified Hijama (cupping) therapy and physiotherapy.
            </p>
            <p className="text-xs sm:text-sm text-[#4A453D] leading-relaxed">
              Today, Treatmed brings this entire store and clinical ecosystem online, making genuine herbal remedies accessible while continuing in-person clinical care at our Mira Road store.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E1B16] bg-[#FBF8F2] p-3 rounded-xl border border-[#E8DCC4]">
                <CheckCircle2 className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span>Zero Synthetic Preservatives</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E1B16] bg-[#FBF8F2] p-3 rounded-xl border border-[#E8DCC4]">
                <CheckCircle2 className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span>Single-Use Sterile Hijama Equipment</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E1B16] bg-[#FBF8F2] p-3 rounded-xl border border-[#E8DCC4]">
                <CheckCircle2 className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span>Authentic Madinah Date Imports</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1E1B16] bg-[#FBF8F2] p-3 rounded-xl border border-[#E8DCC4]">
                <CheckCircle2 className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span>In-Clinic Doctor Consultation</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="primary" onClick={() => setCurrentPage({ type: 'shop' })}>
                Browse Products
              </Button>
              <Button variant="forest" onClick={() => openBookingModal('Unani Consulting')}>
                Book Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Unani Philosophy Box */}
        <div className="bg-[#2F4A3D] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#416353]">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B9964A]">
              Tibb-e-Unani Philosophy
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#FBF8F2]">
              The Asbab-e-Sittah Zaruriyyah (Six Essential Factors)
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DCC4]/90 leading-relaxed">
              Unani medicine recognizes six fundamental factors required for human vitality: Air & Environment, Food & Drink, Physical Movement & Rest, Mental Activity & Rest, Sleep & Wakefulness, and Retention & Elimination. Treatmed's formulations align with these natural life forces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

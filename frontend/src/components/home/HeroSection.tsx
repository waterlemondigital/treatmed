import React from 'react';
import { PageView } from '../../types';
import { Button } from '../common/Button';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { STORE_INFO } from '../../data/mockData';
import { Calendar, ShoppingBag, Sparkles, ShieldCheck, MapPin, Award, ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
  openAIAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setCurrentPage,
  openBookingModal,
  openAIAssistant,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EBD8] via-[#F9F5EC] to-[#F5EFE0] pt-10 pb-20 lg:py-24 border-b-2 border-[#E3D4B5]">
      {/* Background Decorative Botanical Watermark & Gold Filigree */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <svg className="w-full h-full fill-current text-[#1C382B]" viewBox="0 0 100 100">
          <path d="M50 0 C20 30, 0 60, 50 100 C100 60, 80 30, 50 0 Z" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-72 h-72 opacity-10 pointer-events-none transform -translate-x-1/4 translate-y-1/4">
        <svg className="w-full h-full fill-current text-[#C89B3C]" viewBox="0 0 100 100">
          <path d="M50 0 C20 30, 0 60, 50 100 C100 60, 80 30, 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#FFFDF7] border-2 border-[#C89B3C]/50 px-4 py-1.5 rounded-full text-xs font-bold text-[#1C382B] mb-6 shadow-sm"
            >
              <Leaf className="w-4 h-4 text-[#C89B3C] animate-pulse" />
              <span>Authentic Tibb-e-Unani & Ayurvedic Heritage • Mira Road Store</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#1C382B] leading-[1.12] mb-6">
              Rooted in Pure Nature, <br className="hidden sm:block" />
              <span className="text-[#8C3F2B] italic font-serif font-normal">Nourished by Ancient Wisdom.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-[#4A4335] max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Experience classical Unani & Ayurvedic healing under the personal guidance of <strong className="text-[#1C382B] font-bold">Dr. Hkm. Zaid Abdul Aziz</strong>. Hand-crafted cold-pressed oils, wild mountain honey, sterile Hijama cupping, and customized joint & hair vitality formulations.
            </p>

            {/* Product Pills Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
              {['🌿 Hair Oil', '🫧 Hair Shampoo', '💧 Rahat Plus (Pain Relief)', '💊 Sugar Tablet', '🌱 Acidity Tablet'].map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#EADBB8] text-[#1C382B] text-[11px] font-bold px-3 py-1 rounded-lg border border-[#C89B3C]/40 shadow-xs cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
              {/* <Button
                variant="primary"
                size="lg"
                onClick={() => setCurrentPage({ type: 'shop' })}
                className="w-full sm:w-auto shadow-xl shadow-[#C89B3C]/20 py-4 px-8 transform transition-transform hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>Explore Botanical Shop</span>
              </Button> */}

              <Button
                variant="forest"
                size="lg"
                onClick={() => openBookingModal()}
                className="w-full sm:w-auto py-4 px-8 transform transition-transform hover:scale-[1.02]"
              >
                <Calendar className="w-5 h-5 text-[#C89B3C]" />
                <span>Book Clinic Appointment</span>
              </Button>

              <button
                onClick={openAIAssistant}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFFDF7] hover:bg-[#F5EFE0] text-[#1C382B] font-bold text-sm px-6 py-4 rounded-xl border-2 border-[#C89B3C]/50 transition-all shadow-sm hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                <span>Ask Unani AI</span>
              </button>
            </div>

            {/* Highlight Badges */}
            <div className="pt-6 border-t-2 border-[#E3D4B5] grid grid-cols-3 gap-4 text-left">
              <div className="bg-[#FFFDF7] p-3 rounded-2xl border border-[#E3D4B5] transition-transform hover:-translate-y-1 duration-300">
                <p className="font-serif font-bold text-lg sm:text-2xl text-[#8C3F2B]">100%</p>
                <p className="text-[11px] sm:text-xs text-[#5C7351] font-bold">Pure Herbal Formulas</p>
              </div>
              <div className="bg-[#FFFDF7] p-3 rounded-2xl border border-[#E3D4B5] transition-transform hover:-translate-y-1 duration-300">
                <p className="font-serif font-bold text-lg sm:text-2xl text-[#1C382B]">Sterile</p>
                <p className="text-[11px] sm:text-xs text-[#5C7351] font-bold">Single-Use Hijama Cups</p>
              </div>
              <div className="bg-[#FFFDF7] p-3 rounded-2xl border border-[#E3D4B5] transition-transform hover:-translate-y-1 duration-300">
                <p className="font-serif font-bold text-lg sm:text-2xl text-[#C89B3C]">In-Store</p>
                <p className="text-[11px] sm:text-xs text-[#5C7351] font-bold">Pulse & Mizaj Assessment</p>
              </div>
            </div>
          </motion.div>

          {/* Right Imagery Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Wooden Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-[#C89B3C] shadow-2xl bg-[#1C382B] text-white p-3">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
                  alt="Treatmed Unani & Ayurvedic Apothecary"
                  className="w-full h-88 sm:h-[420px] object-cover rounded-[2rem] opacity-95 transition-transform duration-700 hover:scale-105"
                />

                {/* Overlaid Badge 1: Doctor Seal */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute top-6 right-6 bg-[#1C382B]/95 backdrop-blur-md text-[#FFFDF7] p-4 rounded-2xl border-2 border-[#C89B3C] shadow-2xl max-w-[220px]"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-9 h-9 rounded-full bg-[#C89B3C] text-black font-bold flex items-center justify-center font-serif text-base shadow-inner">
                      Z
                    </div>
                    <div>
                      <p className="font-serif font-bold text-xs text-[#FFFDF7]">Dr. Hkm. Zaid</p>
                      <p className="text-[10px] text-[#C89B3C] uppercase tracking-wider font-semibold">Unani & Ayurvedic Hakīm</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#E3D4B5] leading-tight font-medium">
                    In-person Nabd (Pulse) reading & personalized humor balancing.
                  </p>
                </motion.div>

                {/* Overlaid Badge 2: Location Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-[#FFFDF7]/95 backdrop-blur-md p-4 rounded-2xl border-2 border-[#C89B3C]/60 shadow-2xl text-[#1C382B] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#1C382B] text-[#C89B3C] rounded-xl shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1C382B]">Treatmed Store & Clinic</p>
                      <p className="text-[11px] text-[#5C7351] font-medium">Aarnica Bldg, Kanakia, Mira Road</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage({ type: 'contact' })}
                    className="p-2.5 text-[#1C382B] hover:bg-[#EADBB8] rounded-xl transition-colors shrink-0 border border-[#C89B3C]/40"
                    title="View Store Location"
                  >
                    <ArrowRight className="w-4 h-4 text-[#8C3F2B]" />
                  </button>
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};



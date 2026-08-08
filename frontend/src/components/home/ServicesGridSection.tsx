import React, { useState, useEffect } from 'react';
import { MOCK_SERVICES } from '../../data/mockData';
import { Service, PageView } from '../../types';
import { fetchServices } from '../../services/api';
import { Button } from '../common/Button';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { 
  Stethoscope, 
  Sparkles, 
  HeartPulse, 
  Activity, 
  UserCheck, 
  Smile, 
  Calendar, 
  Clock, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesGridSectionProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({
  setCurrentPage,
  openBookingModal,
}) => {
  const [servicesList, setServicesList] = useState<Service[]>(MOCK_SERVICES);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setServicesList(data);
      })
      .catch(() => {});
  }, []);
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-[#C89B3C]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#C89B3C]" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-[#C89B3C]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-[#C89B3C]" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-[#C89B3C]" />;
      case 'Smile': return <Smile className="w-6 h-6 text-[#C89B3C]" />;
      default: return <HeartPulse className="w-6 h-6 text-[#C89B3C]" />;
    }
  };

  return (
    <section className="py-20 bg-[#F9F5EC] relative border-b-2 border-[#E3D4B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#1C382B] uppercase tracking-widest bg-[#EADBB8] px-4 py-1.5 rounded-full border border-[#C89B3C]/50">
            Clinical Wellness Sanctuary
          </span>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C382B] mt-3">
            Therapeutic Clinical Services & Cupping
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4335] mt-2 leading-relaxed">
            Directly supervised by Dr. Hkm. Zaid Abdul Aziz at our Mira Road store location using sterile single-use cups & herbal oils.
          </p>

          <BotanicalDivider variant="forest" />
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((service, idx) => {
            const id = (service as any)._id || service.id;
            return (
              <motion.div
                key={id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFDF7] rounded-3xl border-2 border-[#E3D4B5] p-6 shadow-sm hover:shadow-2xl hover:border-[#C89B3C] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header row with Icon and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-[#1C382B] text-[#C89B3C] shadow-md border border-[#C89B3C]/40 group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#1C382B] bg-[#F5EFE0] px-3 py-1 rounded-full border border-[#E3D4B5]">
                    <Clock className="w-3.5 h-3.5 text-[#C89B3C]" />
                    <span>{service.duration}</span>
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#1C382B] mb-2 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-[#4A4335] leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Key Benefits snippet */}
                <div className="space-y-2 mb-6 bg-[#F5EFE0] p-3.5 rounded-2xl border border-[#E3D4B5]">
                  <p className="text-[10px] font-bold text-[#8C3F2B] uppercase tracking-wider">Clinical Protocol Highlights:</p>
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-[#1C382B]">
                      <Check className="w-3.5 h-3.5 text-[#1C382B] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#E3D4B5] flex items-center gap-3">
                <Button
                  variant="forest"
                  size="sm"
                  fullWidth
                  onClick={() => openBookingModal(service.title)}
                  className="gap-2 text-xs py-3"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Book Appointment</span>
                </Button>

                <button
                  onClick={() => setCurrentPage({ type: 'service-detail', serviceId: id })}
                  className="p-3 rounded-xl border border-[#E3D4B5] text-[#1C382B] hover:bg-[#EADBB8] transition-colors shrink-0"
                  title="View Service Details"
                >
                  <ArrowRight className="w-4 h-4 text-[#8C3F2B]" />
                </button>
              </div>
            </motion.div>
          );
        })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="mt-14 bg-gradient-to-r from-[#1C382B] via-[#234233] to-[#1C382B] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border-2 border-[#C89B3C]/50 relative overflow-hidden"
        >
          <div className="relative z-10 space-y-1">
            <span className="text-xs font-bold text-[#C89B3C] uppercase tracking-widest bg-[#C89B3C]/15 px-3 py-1 rounded-full border border-[#C89B3C]/30">
              Personalized Doctor Consultation
            </span>

            <h4 className="font-serif font-bold text-2xl text-[#FFFDF7] mt-2">
              Need a Custom Unani Diagnosis?
            </h4>

            <p className="text-xs sm:text-sm text-[#E3D4B5]/90 max-w-xl">
              Dr. Hkm. Zaid Abdul Aziz evaluates deep Nabd pulse, tongue condition, and metabolic temperament in person at Mira Road.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => openBookingModal('Unani Consultant')}
            className="shrink-0 relative z-10 py-4 px-8 shadow-xl shadow-[#C89B3C]/20 transform transition-transform hover:scale-105"
          >
            <span>Schedule Doctor Consultation</span>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};



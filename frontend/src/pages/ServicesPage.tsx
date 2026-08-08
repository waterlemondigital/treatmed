import React, { useState, useEffect } from 'react';
import { MOCK_SERVICES } from '../data/mockData';
import { Service, PageView } from '../types';
import { fetchServices } from '../services/api';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { 
  Stethoscope, 
  Sparkles, 
  HeartPulse, 
  Activity, 
  UserCheck, 
  Smile, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface ServicesPageProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  setCurrentPage,
  openBookingModal,
}) => {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});
  }, []);
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-[#B9964A]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#B9964A]" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-[#B9964A]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-[#B9964A]" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-[#B9964A]" />;
      case 'Smile': return <Smile className="w-6 h-6 text-[#B9964A]" />;
      default: return <HeartPulse className="w-6 h-6 text-[#B9964A]" />;
    }
  };

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2F4A3D] uppercase tracking-widest bg-[#EDF2EA] px-3.5 py-1 rounded-full border border-[#7A8F6C]/30">
            In-Clinic Therapies & Consultation
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B16] mt-3">
            Treatmed Clinical Services
          </h1>
          <p className="text-xs sm:text-sm text-[#4A453D] mt-2">
            Supervised by Dr. Hkm. Zaid Abdul Aziz • Kanakia Road, Mira Road
          </p>
          <BotanicalDivider variant="forest" />
        </div>

        {/* Detailed Services Listing */}
        <div className="space-y-8">
          {services.map((service, index) => {
            const id = (service as any)._id || service.id;
            return (
              <div
                key={id}
              className="bg-white rounded-3xl border border-[#E8DCC4] p-6 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden h-64 border-2 border-[#E8DCC4]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#1E1B16]/90 text-[#FBF8F2] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#B9964A]/30 backdrop-blur-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B9964A]" />
                    <span>Duration: {service.duration}</span>
                  </span>
                </div>
              </div>

              {/* Info Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#FAF4E8] rounded-2xl border border-[#B9964A]/30">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B5652D]">
                      {service.category}
                    </span>
                    <h2 className="font-serif font-bold text-2xl text-[#1E1B16]">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A453D] leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* What to expect checklist */}
                <div className="bg-[#FAF4E8] p-4 rounded-2xl border border-[#E8DCC4]">
                  <h4 className="text-xs font-bold text-[#1E1B16] mb-2 uppercase tracking-wider">
                    What To Expect During Session:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A453D]">
                    {service.whatToExpect.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2F4A3D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="forest"
                    size="md"
                    onClick={() => openBookingModal(service.title)}
                    className="gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#B9964A]" />
                    <span>Book Appointment</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setCurrentPage({ type: 'service-detail', serviceId: id })}
                    className="gap-2"
                  >
                    <span>View Deep Dive & FAQs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

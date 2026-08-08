import React, { useState, useEffect } from 'react';
import { MOCK_SERVICES, STORE_INFO } from '../data/mockData';
import { Service, PageView } from '../types';
import { fetchServiceById, fetchServices } from '../services/api';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  MapPin, 
  Phone 
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceId: string;
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  setCurrentPage,
  openBookingModal,
}) => {
  const [service, setService] = useState<Service>(() => {
    return MOCK_SERVICES.find((s) => (s as any)._id === serviceId || s.id === serviceId) || MOCK_SERVICES[2];
  });

  useEffect(() => {
    fetchServiceById(serviceId)
      .then((data) => {
        if (data) setService(data);
      })
      .catch(() => {});
  }, [serviceId]);

  const faqs = [
    {
      q: "Is there any preparation required before the session?",
      a: "For Hijama (Cupping) or Massage therapy, we recommend eating a light meal 2 hours prior and staying well hydrated. Wear loose, comfortable clothing."
    },
    {
      q: "Who performs the clinical service?",
      a: "All medical consultations and specialized procedures are conducted or supervised directly by Dr. Hkm. Zaid Abdul Aziz and trained clinical staff."
    },
    {
      q: "Are single-use disposable cups used for Hijama?",
      a: "Yes, 100%. We strictly enforce hospital-grade sanitation protocols. Each patient receives a freshly opened individual sterile Hijama cup kit."
    }
  ];

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentPage({ type: 'services' })}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D2F] hover:text-[#1E1B16] mb-8 bg-white px-3.5 py-2 rounded-xl border border-[#E8DCC4] shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All In-Clinic Services</span>
        </button>

        {/* Hero Card */}
        <div className="bg-[#2F4A3D] text-white rounded-3xl p-8 sm:p-12 mb-8 shadow-xl border border-[#416353] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B9964A] bg-[#B9964A]/20 px-3 py-1 rounded-full border border-[#B9964A]/30">
              {service.category}
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#FBF8F2] mt-3 mb-4">
              {service.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#E8DCC4]/90 leading-relaxed mb-6">
              {service.fullDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#E8DCC4]">
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-[#B9964A]" />
                <span>Session Duration: {service.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#82D6A7]" />
                <span>Certified Clinical Hygiene</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-8 space-y-6">
            {/* What to expect */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1E1B16]">
                What To Expect Step-By-Step
              </h2>
              <div className="space-y-3">
                {service.whatToExpect.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-[#FBF8F2] border border-[#E8DCC4]">
                    <span className="w-6 h-6 rounded-full bg-[#B9964A] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#4A453D] leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1E1B16]">
                Key Health Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A453D]">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4]">
                    <CheckCircle2 className="w-4 h-4 text-[#2F4A3D] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1E1B16] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#B9964A]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#F3EBDA] pb-3 space-y-1">
                    <h4 className="font-bold text-xs text-[#1E1B16]">{faq.q}</h4>
                    <p className="text-xs text-[#4A453D] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA Card */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-[#FAF4E8] p-6 rounded-3xl border border-[#E8DCC4] shadow-xs sticky top-28 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B5652D]">
                  Book Service
                </span>
                <h3 className="font-serif font-bold text-xl text-[#1E1B16] mt-1">
                  Schedule Your Session
                </h3>
                <p className="text-xs text-[#4A453D] mt-1">
                  Select your preferred date & time. Payment at clinic after session.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => openBookingModal(service.title)}
                className="gap-2 shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Button>

              <div className="pt-4 border-t border-[#E8DCC4] text-xs space-y-2 text-[#4A453D]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#B9964A] shrink-0 mt-0.5" />
                  <span>{STORE_INFO.shortAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B9964A] shrink-0" />
                  <a href={`tel:${STORE_INFO.phones[0]}`} className="text-[#8C6D2F] font-semibold">
                    {STORE_INFO.phones[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

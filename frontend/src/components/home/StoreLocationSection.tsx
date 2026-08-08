import React from 'react';
import { STORE_INFO } from '../../data/mockData';
import { MapPin, Phone, Clock, MessageSquare, Navigation, UserCheck, ShieldCheck } from 'lucide-react';

export const StoreLocationSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5EFE0] relative border-b-2 border-[#E3D4B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C382B] text-[#FFFDF7] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C89B3C]/60 grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* Decorative Corner Filigree */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-15 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#C89B3C]">
              <path d="M0 0 L100 0 L0 100 Z" />
            </svg>
          </div>

          {/* Left Details */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between relative z-10">
            <div>
              <span className="text-xs font-bold text-[#C89B3C] uppercase tracking-widest bg-[#C89B3C]/20 px-3.5 py-1.5 rounded-full border border-[#C89B3C]/40">
                Physical Store & Clinical Facility
              </span>

              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#FFFDF7] mt-4 mb-2">
                Visit Treatmed in Mira Road
              </h2>

              <p className="text-xs sm:text-sm text-[#E3D4B5]/90 leading-relaxed mb-8">
                Drop in for authentic Unani medicines, mountain Sidr honey, premium dates, or schedule a pulse consultation with <strong className="text-[#C89B3C]">Dr. Hkm. Zaid Abdul Aziz</strong>.
              </p>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#C89B3C]/20 text-[#C89B3C] shrink-0 mt-0.5 border border-[#C89B3C]/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#FFFDF7] mb-0.5">Full Clinic Address</h4>
                    <p className="text-[#E3D4B5] leading-relaxed">{STORE_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#C89B3C]/20 text-[#C89B3C] shrink-0 mt-0.5 border border-[#C89B3C]/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#FFFDF7] mb-0.5">Direct Store & WhatsApp Phone</h4>
                    <div className="flex flex-col gap-0.5 text-[#E3D4B5]">
                      <a href={`tel:${STORE_INFO.phones[0]}`} className="hover:text-[#C89B3C] font-bold text-sm">{STORE_INFO.phones[0]}</a>
                      <a href={`tel:${STORE_INFO.phones[1]}`} className="hover:text-[#C89B3C] font-semibold">{STORE_INFO.phones[1]}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#C89B3C]/20 text-[#C89B3C] shrink-0 mt-0.5 border border-[#C89B3C]/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#FFFDF7] mb-0.5">Operational Timings</h4>
                    <p className="text-[#E3D4B5] font-medium">{STORE_INFO.hours}</p>
                    <p className="text-[#C89B3C] text-[11px] mt-0.5 font-bold">{STORE_INFO.clinicTimings}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#C89B3C]/30 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Dr.%20Zaid%20and%20Treatmed%20Team%2C%20I%20would%20like%20to%20inquire%20about%20store%20timing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold px-5 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Consultation</span>
              </a>

              <a
                href="https://maps.google.com/?q=Mira+Road+Jangid+Enclave"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#234233] hover:bg-[#2F4A3D] text-[#FFFDF7] text-xs font-bold px-5 py-3.5 rounded-xl border border-[#C89B3C]/40 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#C89B3C]" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Right Map Visual Frame */}
          <div className="lg:col-span-6 bg-[#162B21] relative min-h-[340px] flex items-center justify-center p-6 border-t lg:border-t-0 lg:border-l border-[#C89B3C]/30">
            <iframe
              title="Treatmed Store Location Map"
              src={STORE_INFO.mapEmbedUrl}
              className="w-full h-full min-h-[320px] rounded-2xl border-2 border-[#C89B3C] shadow-2xl"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#1C382B]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#C89B3C]/60 text-xs text-white flex items-center justify-between shadow-xl">
              <div>
                <p className="font-bold text-[#C89B3C]">Landmark Reference:</p>
                <p className="text-[11px] text-[#E3D4B5]">Near Dastarkhwan Restaurant, Kanakia, Mira Road</p>
              </div>
              <MapPin className="w-5 h-5 text-[#C89B3C] animate-bounce shrink-0 ml-2" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


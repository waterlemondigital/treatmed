import React from 'react';
import { Logo } from './Logo';
import { STORE_INFO } from '../../data/mockData';
import { PageView } from '../../types';
import { Phone, MapPin, Clock, MessageSquare, Shield, Award, Heart, Leaf } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openBookingModal }) => {
  return (
    <footer className="bg-[#1E1B16] text-[#E8DCC4] pt-16 pb-8 border-t-4 border-[#B9964A] relative overflow-hidden bg-dark-botanical">
      {/* Background Subtle Leaf Accent */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <svg className="w-96 h-96 fill-current text-[#B9964A]" viewBox="0 0 100 100">
          <path d="M50 0 C20 30, 0 60, 50 100 C100 60, 80 30, 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#343029]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#B9964A]/10 text-[#B9964A] border border-[#B9964A]/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-semibold text-sm text-[#FBF8F2]">Qualified Doctors</h5>
              <p className="text-xs text-[#E8DCC4]/70">Dr. Hkm. Zaid Abdul Aziz</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#B9964A]/10 text-[#B9964A] border border-[#B9964A]/20">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-semibold text-sm text-[#FBF8F2]">100% Pure Herbal</h5>
              <p className="text-xs text-[#E8DCC4]/70">Zero synthetic additives</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#B9964A]/10 text-[#B9964A] border border-[#B9964A]/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-semibold text-sm text-[#FBF8F2]">Sterile Hijama</h5>
              <p className="text-xs text-[#E8DCC4]/70">Single-use clinical cups</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#B9964A]/10 text-[#B9964A] border border-[#B9964A]/20">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-semibold text-sm text-[#FBF8F2]">Trusted In Mira Road</h5>
              <p className="text-xs text-[#E8DCC4]/70">Established offline clinic</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Col 1: Brand Info */}
          <div>
            <Logo variant="gold" size="lg" className="mb-4" />
            <p className="text-xs leading-relaxed text-[#E8DCC4]/80 mb-4">
              Treatmed is an established Unani & Ayurvedic apothecary and holistic clinic located in Mira Road. We craft pure herbal medicines and perform certified Hijama cupping and physiotherapy treatments.
            </p>
            <div className="text-xs space-y-1 text-[#B9964A] font-medium">
              <p>Founder: {STORE_INFO.owner}</p>
              <p className="text-[#E8DCC4]/60">Reg. Unani Practitioner & Herbalist</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#FBF8F2] mb-4 pb-2 border-b border-[#343029] inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage({ type: 'home' })} className="hover:text-[#B9964A] transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage({ type: 'shop' })} className="hover:text-[#B9964A] transition-colors">
                  Natural Products & Medicines
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage({ type: 'services' })} className="hover:text-[#B9964A] transition-colors">
                  In-Clinic Services
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage({ type: 'treatments' })} className="hover:text-[#B9964A] transition-colors">
                  Specialized Treatments
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage({ type: 'about' })} className="hover:text-[#B9964A] transition-colors">
                  About Dr. Zaid & Clinic
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage({ type: 'contact' })} className="hover:text-[#B9964A] transition-colors">
                  Store Address & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Therapies */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#FBF8F2] mb-4 pb-2 border-b border-[#343029] inline-block">
              In-Clinic Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => openBookingModal('Unani Consultant')} className="hover:text-[#B9964A] transition-colors text-left">
                  Unani Consultant
                </button>
              </li>
              <li>
                <button onClick={() => openBookingModal('Hijama (Cupping therapy)')} className="hover:text-[#B9964A] transition-colors text-left">
                  Hijama (Cupping therapy)
                </button>
              </li>
              <li>
                <button onClick={() => openBookingModal('Physiotherapy')} className="hover:text-[#B9964A] transition-colors text-left">
                  Physiotherapy
                </button>
              </li>
              <li>
                <button onClick={() => openBookingModal('Massage')} className="hover:text-[#B9964A] transition-colors text-left">
                  Massage
                </button>
              </li>
              <li>
                <button onClick={() => openBookingModal('Herbal Steam therapy')} className="hover:text-[#B9964A] transition-colors text-left">
                  Herbal Steam therapy
                </button>
              </li>
              <li>
                <button onClick={() => openBookingModal('Diet Therapy')} className="hover:text-[#B9964A] transition-colors text-left">
                  Diet Therapy
                </button>
              </li>
              <li>
                <button onClick={() => openBookingModal('Diagnostic service (X-ray, ultrasound, MRI, CT scan, and laboratory)')} className="hover:text-[#B9964A] transition-colors text-left">
                  Diagnostic service (X-ray, MRI, etc.)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Contact */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#FBF8F2] mb-4 pb-2 border-b border-[#343029] inline-block">
              Visit Store & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B9964A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{STORE_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B9964A] shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${STORE_INFO.phones[0]}`} className="hover:text-[#B9964A]">{STORE_INFO.phones[0]}</a>
                  <a href={`tel:${STORE_INFO.phones[1]}`} className="hover:text-[#B9964A]">{STORE_INFO.phones[1]}</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B9964A] shrink-0" />
                <span>{STORE_INFO.hours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Treatmed%20Store%2C%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#343029] flex flex-col md:flex-row items-center justify-between text-xs text-[#E8DCC4]/60 gap-4">
          <p>© {new Date().getFullYear()} Treatmed — Unani & Ayurvedic Store. All Rights Reserved.</p>
          <p className="text-center md:text-right">
            Formulations supervised by <strong className="text-[#B9964A]">Dr. Hkm. Zaid Abdul Aziz</strong>. Pure herbal wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};

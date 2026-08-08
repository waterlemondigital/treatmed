import React from 'react';
import { ContactInquiry, NewsletterSubscriber } from '../../types';
import { Mail, Users, Phone } from 'lucide-react';

interface InquiriesManagerProps {
  inquiries: ContactInquiry[];
  subscribers: NewsletterSubscriber[];
}

export const InquiriesManager: React.FC<InquiriesManagerProps> = ({ inquiries, subscribers }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
      {/* Contact Messages */}
      <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#1E1B16] border-b border-[#F3EBDA] pb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#B9964A]" />
          <span>Patient Contact Messages ({inquiries.length})</span>
        </h3>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {inquiries.map((inq, idx) => (
            <div key={idx} className="p-4 bg-[#FBF8F2] rounded-2xl border border-[#E8DCC4] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-xs text-[#1E1B16]">{inq.name}</span>
                  <span className="text-xs text-[#7A8F6C] ml-2 font-medium">({inq.phone})</span>
                </div>
                <span className="bg-[#FAF4E8] text-[#8C6D2F] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#B9964A]/30">
                  {inq.subject || 'General Inquiry'}
                </span>
              </div>
              <p className="text-xs text-[#4A453D] leading-relaxed pt-1">{inq.message}</p>
              {inq.email && <p className="text-[10px] text-gray-500 font-medium">Email: {inq.email}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Subscribers */}
      <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#1E1B16] border-b border-[#F3EBDA] pb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#2F4A3D]" />
          <span>Newsletter Subscribers ({subscribers.length})</span>
        </h3>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {subscribers.map((sub, idx) => (
            <div key={idx} className="p-3 bg-[#FAF4E8] rounded-xl border border-[#E8DCC4] flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1E1B16] truncate">{sub.email}</span>
              <span className="text-[10px] text-[#7A8F6C] font-bold shrink-0">Subscribed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

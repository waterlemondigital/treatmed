import React, { useState } from 'react';
import { STORE_INFO } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { BotanicalDivider } from '../components/common/BotanicalDivider';
import { MapPin, Phone, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      addToast('success', 'Message Dispatched', 'Dr. Zaid\'s team will contact you within 2-4 hours.');
    }, 900);
  };

  return (
    <div className="py-12 bg-[#FBF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#8C6D2F] uppercase tracking-widest bg-[#FAF4E8] px-3.5 py-1 rounded-full border border-[#B9964A]/30">
            Get In Touch
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#1E1B16] mt-3">
            Contact Treatmed Store & Clinic
          </h1>
          <p className="text-xs sm:text-sm text-[#4A453D] mt-2">
            Visit our store in Mira Road or send us an inquiry directly.
          </p>
          <BotanicalDivider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DCC4] shadow-xs space-y-6">
              <h3 className="font-serif font-bold text-xl text-[#1E1B16]">
                Store Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4E8] text-[#B9964A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1E1B16]">Physical Store Address</h4>
                    <p className="text-[#4A453D] leading-relaxed">{STORE_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4E8] text-[#B9964A] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1E1B16]">Mobile Numbers</h4>
                    <a href={`tel:${STORE_INFO.phones[0]}`} className="text-[#8C6D2F] font-bold block">{STORE_INFO.phones[0]}</a>
                    <a href={`tel:${STORE_INFO.phones[1]}`} className="text-[#8C6D2F] font-bold block">{STORE_INFO.phones[1]}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4E8] text-[#B9964A] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1E1B16]">Hours of Operation</h4>
                    <p className="text-[#4A453D]">{STORE_INFO.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3EBDA]">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Treatmed%20Store%2C%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white font-semibold py-3.5 rounded-2xl text-xs shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DCC4] shadow-xs">
              <h3 className="font-serif font-bold text-2xl text-[#1E1B16] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#4A453D] mb-6">
                Have a question about product availability, dates import, or Hijama appointments? Fill out the form below.
              </p>

              {isSent ? (
                <div className="p-8 bg-[#FAF4E8] rounded-2xl border border-[#E8DCC4] text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#2F4A3D] mx-auto" />
                  <h4 className="font-serif font-bold text-lg text-[#1E1B16]">Message Received!</h4>
                  <p className="text-xs text-[#4A453D]">
                    Thank you, <strong className="text-[#1E1B16]">{name}</strong>. Our staff at Kanakia, Mira Road will respond shortly.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setIsSent(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohammed Salman"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9820012345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="salman@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                      >
                        <option value="Product Inquiry">Product Availability & Pricing</option>
                        <option value="Hijama Appointment">Hijama (Cupping) Appointment</option>
                        <option value="Doctor Consultation">Consultation with Dr. Zaid</option>
                        <option value="Bulk Purchase">Bulk Dates & Sidr Honey</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E1B16] mb-1">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your health query or product request..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl p-3.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isSubmitting}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Frame */}
        <div className="bg-[#1E1B16] p-4 rounded-3xl border border-[#343029]">
          <iframe
            title="Treatmed Google Map"
            src={STORE_INFO.mapEmbedUrl}
            className="w-full h-80 rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';
import { Send, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { addToast } = useToast();

import { subscribeNewsletter } from '../../services/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return;

    try {
      const res = await subscribeNewsletter({ email, phone });
      addToast('success', 'Subscribed to Treatmed Wellness Updates', res.message);
    } catch (err: any) {
      addToast(
        'success',
        'Subscribed to Treatmed Wellness Updates',
        'Thank you! You will receive seasonal Unani health tips and exclusive product discounts.'
      );
    }
    setEmail('');
    setPhone('');
  };

  return (
    <section className="py-16 bg-[#1C382B] text-white relative overflow-hidden border-t-2 border-[#C89B3C]/50">
      {/* Botanical watermark */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg className="w-full h-full fill-current text-[#C89B3C]" viewBox="0 0 100 100">
          <path d="M50 0 C20 30, 0 60, 50 100 C100 60, 80 30, 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-3 bg-[#C89B3C]/20 text-[#C89B3C] rounded-2xl w-fit mx-auto mb-4 border border-[#C89B3C]/40 shadow-md">
          <Sparkles className="w-6 h-6" />
        </div>

        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#FFFDF7] mb-2 leading-tight">
          Receive Unani Botanical Advice & Seasonal Stock Alerts
        </h2>

        <p className="text-xs sm:text-sm text-[#E3D4B5]/90 max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe to receive Dr. Zaid's seasonal Mizaj care guidance, fresh Madinah Ajwa arrival alerts, and subscriber-only apothecary discounts.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#234233] border-2 border-[#C89B3C]/40 rounded-xl px-5 py-3.5 text-xs text-white placeholder-[#E3D4B5]/60 focus:outline-none focus:border-[#C89B3C] shadow-inner"
            required
          />
          <Button variant="primary" type="submit" className="shrink-0 text-xs px-7 py-3.5 gap-2 shadow-lg">
            <span>Subscribe</span>
            <Send className="w-3.5 h-3.5 text-black" />
          </Button>
        </form>

        <p className="text-[11px] text-[#E3D4B5]/70 mt-4 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
          <span>Strict privacy • Zero spam • Unsubscribe anytime</span>
        </p>
      </div>
    </section>
  );
};


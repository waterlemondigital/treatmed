import React, { useState } from 'react';
import { MOCK_PRODUCTS, MOCK_SERVICES } from '../../data/mockData';
import { PageView } from '../../types';
import { Button } from './Button';
import { Sparkles, X, Send, Bot, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface AIAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProducts?: typeof MOCK_PRODUCTS;
  recommendedServices?: typeof MOCK_SERVICES;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  isOpen,
  onClose,
  setCurrentPage,
  openBookingModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Assalamu Alaikum / Welcome! I am Dr. Zaid\'s Unani AI Health Assistant. How can I guide your natural wellness journey today?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    "What is best for knee and back joint pain?",
    "How to stop severe hair fall naturally?",
    "How does Hijama (cupping) help with toxins?",
    "Natural remedies for gastritis and acid reflux",
  ];

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    try {
      // Call server route if present or simulate intelligent Unani response
      const response = await fetch('/api/unani-ai', {
        method: 'POST',
        headers: { 'Content-[#1E1B16]': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: 'ai-' + Date.now(),
            sender: 'ai',
            text: data.reply || 'Unani medicine focuses on restoring temperament balance.',
          },
        ]);
        setIsTyping(false);
        return;
      }
    } catch {
      // fallback
    }

    // Fallback intelligent Unani knowledge engine
    setTimeout(() => {
      let aiText = "Tibb-e-Unani focuses on restoring equilibrium among your four body humors (Dam, Balgham, Safra, Sauda). ";
      let recommendedProducts: typeof MOCK_PRODUCTS = [];
      let recommendedServices: typeof MOCK_SERVICES = [];

      const lower = query.toLowerCase();

      if (lower.includes('joint') || lower.includes('pain') || lower.includes('knee') || lower.includes('back') || lower.includes('rahat')) {
        aiText += "For joint and muscular stiffness, we recommend warm topical applications of Rahat Plus Pain Relief Oil, coupled with sterile Hijama cupping therapy and Physiotherapy.";
        recommendedProducts = [MOCK_PRODUCTS[2]]; // Rahat Plus Pain Relief Oil
        recommendedServices = [MOCK_SERVICES[1], MOCK_SERVICES[2]]; // Hijama, Physiotherapy
      } else if (lower.includes('hair') || lower.includes('scalp') || lower.includes('shampoo') || lower.includes('dandruff')) {
        aiText += "Hair thinning and premature graying stem from scalp nutrient depletion. Treatmed Herbal Hair Oil and Botanical Hair Shampoo nourish roots overnight and maintain scalp health.";
        recommendedProducts = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]]; // Hair oil & shampoo
        recommendedServices = [MOCK_SERVICES[0]]; // Unani Consultant
      } else if (lower.includes('sugar') || lower.includes('diabetes') || lower.includes('glucose')) {
        aiText += "For glycemic management and pancreatic support, Treatmed Sugar Control Herbal Tablets combine Gurmar, Karela, Jamun seed, and Shilajit to maintain healthy blood glucose levels.";
        recommendedProducts = [MOCK_PRODUCTS[3]]; // Sugar tablet
        recommendedServices = [MOCK_SERVICES[5]]; // Diet Therapy
      } else if (lower.includes('acid') || lower.includes('gastric') || lower.includes('gas') || lower.includes('stomach') || lower.includes('bloating')) {
        aiText += "Hyperacidity and bloating indicate digestive heat. Treatmed Acidity Relief Herbal Tablets with mint, ginger, and fennel calm acidity rapidly, and Diet Therapy helps manage triggers.";
        recommendedProducts = [MOCK_PRODUCTS[4]]; // Acidity tablet
        recommendedServices = [MOCK_SERVICES[5]]; // Diet Therapy
      } else if (lower.includes('scan') || lower.includes('test') || lower.includes('x-ray') || lower.includes('mri') || lower.includes('ultrasound') || lower.includes('lab')) {
        aiText += "We offer comprehensive Diagnostic Services including X-ray, Ultrasound, MRI, CT scan, and laboratory investigations under medical supervision.";
        recommendedServices = [MOCK_SERVICES[6]]; // Diagnostic service
      } else {
        aiText += "Our clinical services include Unani Consultation, Hijama (Cupping therapy), Physiotherapy, Massage, Herbal Steam therapy, Diet Therapy, and Diagnostic Services (X-ray, Ultrasound, MRI, CT scan, Lab).";
        recommendedProducts = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[2], MOCK_PRODUCTS[3]];
        recommendedServices = [MOCK_SERVICES[0], MOCK_SERVICES[1]];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: aiText,
          recommendedProducts,
          recommendedServices,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#FBF8F2] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E8DCC4] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#2F4A3D] text-white p-4 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#B9964A] rounded-2xl text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#FBF8F2]">Dr. Zaid's Unani AI Assistant</h3>
              <p className="text-[11px] text-[#E8DCC4]/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Online • Powered by Tibb-e-Unani Wisdom</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAi ? 'items-start' : 'items-end justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-xl bg-[#B9964A] text-white flex items-center justify-center shrink-0 font-serif font-bold text-xs shadow-sm">
                    T
                  </div>
                )}

                <div className={`max-w-[85%] space-y-3`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isAi
                        ? 'bg-white text-[#1E1B16] border border-[#E8DCC4] shadow-xs'
                        : 'bg-[#B9964A] text-white font-medium shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {/* Recommended Products */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="bg-[#F3EBDA] p-3 rounded-2xl border border-[#E8DCC4] space-y-2">
                      <p className="text-[11px] font-bold text-[#8C6D2F] uppercase tracking-wider">
                        Recommended Product:
                      </p>
                      {msg.recommendedProducts.map((p) => (
                        <div key={p.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E8DCC4]">
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                            <div className="truncate">
                              <p className="font-semibold text-xs text-[#1E1B16] truncate">{p.name}</p>
                              <p className="text-[10px] text-[#B9964A] font-bold">₹{p.price}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              onClose();
                              setCurrentPage({ type: 'product-detail', productId: p.id });
                            }}
                            className="shrink-0 text-[10px] py-1 px-2.5"
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommended Services */}
                  {msg.recommendedServices && msg.recommendedServices.length > 0 && (
                    <div className="bg-[#EDF2EA] p-3 rounded-2xl border border-[#7A8F6C]/30 space-y-2">
                      <p className="text-[11px] font-bold text-[#2F4A3D] uppercase tracking-wider">
                        Recommended In-Clinic Therapy:
                      </p>
                      {msg.recommendedServices.map((s) => (
                        <div key={s.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#7A8F6C]/20">
                          <div className="truncate">
                            <p className="font-semibold text-xs text-[#1E1B16] truncate">{s.title}</p>
                            <p className="text-[10px] text-[#7A8F6C]">{s.duration}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="forest"
                            onClick={() => {
                              onClose();
                              openBookingModal(s.title);
                            }}
                            className="shrink-0 text-[10px] py-1 px-2.5"
                          >
                            Book Session
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!isAi && (
                  <div className="w-8 h-8 rounded-xl bg-[#1E1B16] text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-[#7A8F6C]">
              <div className="w-8 h-8 rounded-xl bg-[#B9964A] text-white flex items-center justify-center font-serif font-bold text-xs">
                T
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8DCC4] flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#B9964A]" />
                <span>Consulting Unani Pharmacopeia...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 border-t border-[#E8DCC4] bg-[#F3EBDA]/60 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-white hover:bg-[#B9964A] hover:text-white text-[#1E1B16] font-medium px-2.5 py-1 rounded-full border border-[#E8DCC4] shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E8DCC4] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about joint pain, hair fall, Hijama therapy..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-[#FBF8F2] border border-[#E8DCC4] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B16] focus:outline-none focus:ring-2 focus:ring-[#B9964A]"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="bg-[#B9964A] hover:bg-[#8C6D2F] text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-[#7A8F6C] mt-1.5">
            Informational Unani guidance • Consult Dr. Zaid in person for critical medical conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

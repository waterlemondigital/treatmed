import React, { useState } from 'react';
import { BotanicalDivider } from '../common/BotanicalDivider';
import { PageView } from '../../types';
import { Sparkles, Leaf, ShieldCheck, Flame, Sun, Droplets, Wind, ArrowRight, Check } from 'lucide-react';

interface HerbSpotlightSectionProps {
  setCurrentPage: (page: PageView) => void;
  openBookingModal: (serviceTitle?: string) => void;
}

interface SacredHerb {
  id: string;
  name: string;
  botanicalName: string;
  unaniMizaj: string;
  tagline: string;
  description: string;
  benefits: string[];
  image: string;
  colorAccent: string;
}

const HERBS_DATA: SacredHerb[] = [
  {
    id: 'herb-1',
    name: 'Kalonji (Habbat al-Barakah)',
    botanicalName: 'Nigella Sativa (Black Seed)',
    unaniMizaj: 'Hot 2° & Dry 2° (Haar Yabis)',
    tagline: 'The Blessed Seed of Vitality & Immunity',
    description: 'Renowned in Tibb-e-Unani and Ayurveda for centuries. Cold-pressed Kalonji seed oil is rich in Thymoquinone, protecting cells and strengthening scalp hair roots.',
    benefits: ['Stimulates dormant hair follicles', 'Strengthens respiratory & immune defense', 'Regulates joint inflammation'],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400',
    colorAccent: 'border-[#2F4A3D] text-[#2F4A3D]',
  },
  {
    id: 'herb-2',
    name: 'Wild Sidr Honey (Asal)',
    botanicalName: 'Ziziphus Spina-Christi Nectar',
    unaniMizaj: 'Harmonious Warm & Balanced',
    tagline: 'Pure Raw Mountain Nectar for Gut & Ojas',
    description: 'Unheated, unpasteurized wild forest honey harvested from Sidr trees. Naturally rich in enzymes and trace minerals that restore gut microbiome and soothe mucosal lining.',
    benefits: ['Natural antibiotic & ulcer healer', 'Enhances physical stamina & energy', 'Deeply hydrates skin & mucous tissues'],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400',
    colorAccent: 'border-[#B9964A] text-[#B9964A]',
  },
  {
    id: 'herb-3',
    name: 'Suranjan & Guggul',
    botanicalName: 'Colchicum Luteum & Commiphora Mukul',
    unaniMizaj: 'Hot 3° & Dry 2°',
    tagline: 'The Ultimate Natural Joint & Sciatica Remedy',
    description: 'Specialized herbal resin extracts used in Treatmed Rahat Plus Pain Relief Oil to flush out excess uric acid crystals and ease lumbar stiffness.',
    benefits: ['Rapid relief from knee & joint pain', 'Dissolves uric acid deposits', 'Restores cartilage flexibility'],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400',
    colorAccent: 'border-[#8C3F2B] text-[#8C3F2B]',
  },
  {
    id: 'herb-4',
    name: 'Amla, Bhringraj & Brahmi',
    botanicalName: 'Phyllanthus Emblica & Eclipta Alba',
    unaniMizaj: 'Cold 1° & Dry 2° (Muqawwi-e-Shaar)',
    tagline: 'The Sacred Tri-Herbal Scalp Rasayana',
    description: 'A traditional botanical triad infused into cold-pressed sesame oil. Rich in Vitamin C and natural tannins that preserve hair pigment and prevent hair thinning.',
    benefits: ['Prevents premature hair graying', 'Deep scalp nourishment & cooling', 'Reduces mental stress & headache'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
    colorAccent: 'border-[#5C7351] text-[#5C7351]',
  },
];

export const HerbSpotlightSection: React.FC<HerbSpotlightSectionProps> = ({
  setCurrentPage,
  openBookingModal,
}) => {
  const [activeHerb, setActiveHerb] = useState<string>('herb-1');
  
  // Quick Mizaj Evaluator state
  const [selectedTemp, setSelectedTemp] = useState<'hot' | 'cold' | null>(null);
  const [selectedMoist, setSelectedMoist] = useState<'dry' | 'moist' | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const selectedHerbData = HERBS_DATA.find((h) => h.id === activeHerb) || HERBS_DATA[0];

  const getMizajResult = () => {
    if (selectedTemp === 'hot' && selectedMoist === 'moist') {
      return {
        title: 'Damvi Mizaj (Sanguine / Sanguis)',
        desc: 'Warm & Moist temperament. Strong pulse, good circulation, warm skin. Prone to skin flushing or joint heat.',
        herb: 'Pure Sidr Honey, Cucumber Arq, & Rose Water',
        recommendation: 'Cooling herbal teas, Hijama Cupping for blood detoxification, and Treatmed Herbal Hair Oil.',
      };
    }
    if (selectedTemp === 'hot' && selectedMoist === 'dry') {
      return {
        title: 'Safrawi Mizaj (Choleric / Yellow Bile)',
        desc: 'Warm & Dry temperament. High metabolism, quick digestion, prone to acidity, heartburn & hair thinning.',
        herb: 'Mint, Ginger, Fennel & Acidity Relief Tablets',
        recommendation: 'Treatmed Acidity Relief Herbal Tablets, scalp cooling hair oil, and hydrating fluids.',
      };
    }
    if (selectedTemp === 'cold' && selectedMoist === 'moist') {
      return {
        title: 'Balghami Mizaj (Phlegmatic / Phlegm)',
        desc: 'Cool & Moist temperament. Relaxed energy, soft skin, prone to sluggish digestion, sinus congestion & lethargy.',
        herb: 'Wild Forest Honey, Ginger, Ajwain & Kalonji',
        recommendation: 'Warming Kalonji Oil, Ginger Honey Infusion, and Dry Hijama Therapy.',
      };
    }
    return {
      title: 'Saudawi Mizaj (Melancholic / Black Bile)',
      desc: 'Cool & Dry temperament. Analytical mind, slender build, prone to dry skin, joint stiffness & lumbar pain.',
      herb: 'Ruhan Pain Oil, Almond Roghan & Suranjan',
      recommendation: 'Ruhan Joint Pain Massage, Warm Sesame Oil Therapies, and Nutrient-rich Dates.',
    };
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F5EFE0] via-[#FBF8F0] to-[#F5EFE0] relative overflow-hidden border-b border-[#E3D4B5]">
      {/* Background Mandala & Leaf Watermark */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-15 pointer-events-none transform -translate-x-1/3 -translate-y-1/3">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#2F4A3D]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M100 10 C120 50, 180 50, 190 100 C180 150, 120 150, 100 190 C80 150, 20 150, 10 100 C20 50, 80 50, 100 10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#EADBB8] text-[#1C382B] px-4 py-1.5 rounded-full border border-[#C89B3C]/50 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Sacred Ayurvedic & Unani Pharmacopoeia</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#1C382B] leading-tight">
            Authentic Botanical Heritage & Healing Herbs
          </h2>

          <p className="text-sm text-[#4A4335] mt-3 leading-relaxed">
            Every Treatmed formula is ethically sourced, unrefined, and meticulously prepared according to classic Tibb-e-Unani and Ayurvedic principles.
          </p>

          <BotanicalDivider variant="terracotta" />
        </div>

        {/* Grid 1: Herb Showcase Card */}
        <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#E3D4B5] shadow-xl p-6 sm:p-10 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Herb Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-bold text-[#8C3F2B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                <span>Select Sacred Botanical:</span>
              </p>

              {HERBS_DATA.map((herb) => (
                <button
                  key={herb.id}
                  onClick={() => setActiveHerb(herb.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    activeHerb === herb.id
                      ? 'bg-[#1C382B] text-white border-[#1C382B] shadow-md scale-[1.02]'
                      : 'bg-white text-[#1C382B] border-[#E3D4B5] hover:bg-[#F5EFE0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl overflow-hidden shrink-0 border ${activeHerb === herb.id ? 'border-[#C89B3C]' : 'border-[#E3D4B5]'}`}>
                      <img src={herb.image} alt={herb.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm leading-tight">{herb.name}</h4>
                      <p className={`text-[11px] ${activeHerb === herb.id ? 'text-[#E3D4B5]' : 'text-[#7A6F5A]'}`}>
                        {herb.botanicalName}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${activeHerb === herb.id ? 'text-[#C89B3C]' : 'text-[#7A6F5A]'}`} />
                </button>
              ))}
            </div>

            {/* Right Active Herb Spotlight Details */}
            <div className="lg:col-span-7 bg-[#FBF8F0] p-6 sm:p-8 rounded-2xl border border-[#E3D4B5] relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C3F2B] bg-[#F3E6CE] px-3 py-1 rounded-full border border-[#C89B3C]/40">
                  {selectedHerbData.unaniMizaj}
                </span>
                <span className="text-xs text-[#5C7351] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#1C382B]" />
                  100% Organically Wildcrafted
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C382B] mb-2">
                {selectedHerbData.name}
              </h3>

              <p className="font-serif italic text-xs text-[#8C3F2B] mb-4">
                "{selectedHerbData.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed mb-6">
                {selectedHerbData.description}
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-[#1C382B] uppercase tracking-wider">Traditional Therapeutic Benefits:</p>
                {selectedHerbData.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#2A241B]">
                    <div className="w-5 h-5 rounded-full bg-[#1C382B] text-[#C89B3C] flex items-center justify-center text-[10px] font-bold shrink-0">
                      ✓
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E3D4B5] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentPage({ type: 'shop' })}
                  className="inline-flex items-center gap-2 bg-[#1C382B] hover:bg-[#234233] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all"
                >
                  <span>Explore Products Containing This Herb</span>
                  <ArrowRight className="w-4 h-4 text-[#C89B3C]" />
                </button>

                <p className="text-[11px] text-[#7A6F5A] font-medium italic">
                  Formulated under Dr. Hkm. Zaid's supervision
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* Interactive Banner: Mizaj (Temperament / Dosha) Quick Evaluator */}
        <div className="bg-gradient-to-r from-[#1C382B] via-[#234233] to-[#1C382B] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#C89B3C]/40 shadow-2xl relative overflow-hidden">
          {/* Gold Filigree Corner Ornaments */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#C89B3C]">
              <path d="M0 0 L100 0 L100 100 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#C89B3C] uppercase tracking-widest bg-[#C89B3C]/15 px-3 py-1 rounded-full border border-[#C89B3C]/30">
                Unani & Ayurvedic Health Wisdom
              </span>

              <h3 className="font-serif font-bold text-2xl sm:text-4xl text-[#FFFDF7] leading-tight">
                Discover Your Dominant <br />
                <span className="text-[#C89B3C] italic font-normal">Mizaj (Temperament / Dosha)</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#E3D4B5]/90 leading-relaxed">
                In Tibb-e-Unani and Ayurveda, every individual possesses a unique metabolic constitution. Find your humor balance to choose the ideal herbal medicines and dietary lifestyle.
              </p>

              {/* Step 1: Temperature */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-[#E3D4B5] flex items-center gap-1.5">
                  <span>1. Body Thermal Tendency:</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setSelectedTemp('hot'); setShowResult(false); }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      selectedTemp === 'hot'
                        ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-lg'
                        : 'bg-black/30 text-white border-[#E3D4B5]/30 hover:bg-black/50'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-[#8C3F2B]" />
                    <span>Hot / Warm (Feel Heat Easily)</span>
                  </button>

                  <button
                    onClick={() => { setSelectedTemp('cold'); setShowResult(false); }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      selectedTemp === 'cold'
                        ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-lg'
                        : 'bg-black/30 text-white border-[#E3D4B5]/30 hover:bg-black/50'
                    }`}
                  >
                    <Wind className="w-4 h-4 text-[#5C7351]" />
                    <span>Cold / Cool (Feel Chill Easily)</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Moisture */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#E3D4B5] flex items-center gap-1.5">
                  <span>2. Skin & Digestive Moisture:</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setSelectedMoist('moist'); setShowResult(false); }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      selectedMoist === 'moist'
                        ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-lg'
                        : 'bg-black/30 text-white border-[#E3D4B5]/30 hover:bg-black/50'
                    }`}
                  >
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span>Moist / Soft (Soft Skin, Fluid)</span>
                  </button>

                  <button
                    onClick={() => { setSelectedMoist('dry'); setShowResult(false); }}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      selectedMoist === 'dry'
                        ? 'bg-[#C89B3C] text-black border-[#C89B3C] shadow-lg'
                        : 'bg-black/30 text-white border-[#E3D4B5]/30 hover:bg-black/50'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Dry / Lean (Dry Scalp/Joints)</span>
                  </button>
                </div>
              </div>

              {selectedTemp && selectedMoist && (
                <button
                  onClick={() => setShowResult(true)}
                  className="w-full py-3 bg-[#C89B3C] hover:bg-[#D4A747] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all transform hover:scale-[1.01]"
                >
                  Reveal My Temperament & Remedies
                </button>
              )}
            </div>

            {/* Right Mizaj Result Panel */}
            <div className="lg:col-span-6">
              {showResult && selectedTemp && selectedMoist ? (
                <div className="bg-[#FFFDF7] text-[#1C382B] p-6 sm:p-8 rounded-2xl border-2 border-[#C89B3C] shadow-2xl animate-fadeIn space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E3D4B5] pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3F2B] bg-[#F3E6CE] px-2.5 py-0.5 rounded-md">
                      Mizaj Result
                    </span>
                    <Sparkles className="w-5 h-5 text-[#C89B3C]" />
                  </div>

                  <h4 className="font-serif font-bold text-xl text-[#1C382B]">
                    {getMizajResult().title}
                  </h4>

                  <p className="text-xs text-[#4A4335] leading-relaxed">
                    {getMizajResult().desc}
                  </p>

                  <div className="bg-[#F5EFE0] p-3.5 rounded-xl border border-[#E3D4B5] space-y-1">
                    <p className="text-[11px] font-bold text-[#8C3F2B] uppercase">Ideal Herbal Allies:</p>
                    <p className="text-xs font-semibold text-[#1C382B]">{getMizajResult().herb}</p>
                  </div>

                  <p className="text-xs text-[#4A4335]">
                    <strong className="text-[#1C382B]">Doctor Recommendation:</strong> {getMizajResult().recommendation}
                  </p>

                  <div className="pt-3 border-t border-[#E3D4B5] flex gap-3">
                    <button
                      onClick={() => openBookingModal('Mizaj Nabd Pulse Consultation')}
                      className="flex-1 bg-[#1C382B] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#234233] transition-colors"
                    >
                      Book In-Person Pulse Check
                    </button>
                    <button
                      onClick={() => setCurrentPage({ type: 'shop' })}
                      className="px-4 bg-[#E3D4B5] text-[#1C382B] py-2.5 rounded-xl text-xs font-bold hover:bg-[#D4C3A1] transition-colors"
                    >
                      Browse Remedies
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C89B3C]/20 border border-[#C89B3C] flex items-center justify-center text-[#C89B3C]">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-[#FFFDF7]">Interactive Temperament Assessment</h4>
                  <p className="text-xs text-[#E3D4B5]/80 max-w-sm mx-auto">
                    Select your thermal tendency and moisture preference on the left to reveal your unique Tibb-e-Unani Mizaj profile!
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

function ChevronRight(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

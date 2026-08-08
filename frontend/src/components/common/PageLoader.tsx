import React, { useEffect, useState } from 'react';
import { Leaf, Sparkles } from 'lucide-react';

interface PageLoaderProps {
  isLoading?: boolean;
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  message = "Harmonizing Botanical Wisdom...",
}) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setVisible(false), 400); // smooth fade out
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F5EC]/95 backdrop-blur-md transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Outer Pulsing Gold Ring */}
        <div className="absolute -inset-4 rounded-full bg-[#C89B3C]/10 animate-ping duration-1000" />
        <div className="absolute -inset-8 rounded-full border border-[#C89B3C]/20 animate-pulse" />

        {/* Center Botanical Badge */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1C382B] border-2 border-[#C89B3C] shadow-2xl flex items-center justify-center overflow-hidden group">
          {/* Subtle spinning background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1C382B] via-[#2F4A3D] to-[#1C382B] animate-spin-slow" />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-[#C89B3C]">
            <Leaf className="w-9 h-9 sm:w-11 sm:h-11 animate-bounce" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mt-6 text-center">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1C382B] tracking-wide flex items-center justify-center gap-2">
            <span>TREATMED</span>
            <Sparkles className="w-4 h-4 text-[#C89B3C] animate-pulse" />
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C3F2B] mt-0.5">
            Tibb-e-Unani & Ayurvedic Apothecary
          </p>
        </div>

        {/* Minimal Progress Bar & Text */}
        <div className="mt-5 flex flex-col items-center gap-2 w-48">
          <div className="w-full h-1 bg-[#E3D4B5] rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#1C382B] via-[#C89B3C] to-[#1C382B] w-full animate-shimmer" />
          </div>
          <p className="text-xs font-semibold text-[#4A4335] text-center italic">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

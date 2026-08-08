import React from 'react';
import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="p-2 rounded-2xl bg-[#2F4A3D] text-[#B9964A] shadow-md border border-[#B9964A]/30">
        <Leaf className={`${iconSizes[size]} transform -rotate-12`} />
      </div>
      <div>
        <span className={`font-serif font-extrabold tracking-wider text-[#1E1B16] ${textSizes[size]}`}>
          TREAT<span className="text-[#B9964A]">MED</span>
        </span>
        <span className="block text-[9px] uppercase tracking-widest text-[#8C6D2F] font-bold -mt-1">
          Admin Console
        </span>
      </div>
    </div>
  );
};

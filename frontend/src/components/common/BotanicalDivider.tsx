import React from 'react';

interface BotanicalDividerProps {
  className?: string;
  variant?: 'gold' | 'forest' | 'sage' | 'terracotta' | 'saffron';
  label?: string;
}

export const BotanicalDivider: React.FC<BotanicalDividerProps> = ({ 
  className = '', 
  variant = 'gold',
  label
}) => {
  const colorMap = {
    gold: 'text-[#C89B3C]',
    forest: 'text-[#1C382B]',
    sage: 'text-[#5C7351]',
    terracotta: 'text-[#8C3F2B]',
    saffron: 'text-[#D97706]',
  };

  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${colorMap[variant]} ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-current to-current opacity-40" />
      
      {/* Botanical Leaf Motif */}
      <div className="flex items-center gap-1.5 opacity-90">
        <svg className="w-4 h-4 fill-current transform -rotate-45" viewBox="0 0 24 24">
          <path d="M17 8C8 10 59 16.17 3.83 12 17C12 12 16 8 17 8Z" />
          <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" />
        </svg>

        {label ? (
          <span className="font-serif italic text-xs font-semibold px-2 tracking-wide uppercase opacity-90">
            {label}
          </span>
        ) : (
          <svg className="w-6 h-6 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24">
            <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" />
            <path d="M12 22V10" />
            <path d="M12 14C10 12 6 12 6 12" />
            <path d="M12 16C14 14 18 14 18 14" />
          </svg>
        )}

        <svg className="w-4 h-4 fill-current transform rotate-45 scale-x-[-1]" viewBox="0 0 24 24">
          <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2Z" />
        </svg>
      </div>

      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-current to-current opacity-40" />
    </div>
  );
};


import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold'; // light text for dark bg, dark text for light bg, gold text everywhere
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'gold', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 text-xl',
    md: 'h-10 text-2xl',
    lg: 'h-12 text-3xl',
    xl: 'h-16 text-4xl',
  };

  const textColors = {
    gold: 'text-[#B9964A]',
    light: 'text-[#FBF8F2]',
    dark: 'text-[#1E1B16]',
  };

  const leafColor = variant === 'light' ? '#FBF8F2' : '#B9964A';

  return (
    <div className={`inline-flex items-center gap-2 select-none font-serif font-bold tracking-tight ${sizeClasses[size]} ${textColors[variant]} ${className}`}>
      {/* Custom SVG icon of the Treatmed leaf-top T logo */}
      <svg
        viewBox="0 0 100 100"
        className="h-[1.25em] w-[1.25em] shrink-0 fill-current"
        style={{ color: leafColor }}
      >
        {/* Main 'T' Body with rounded top crossbar */}
        <path
          d="M 20 28 C 20 22, 30 20, 50 20 C 70 20, 80 22, 80 28 C 80 34, 65 34, 58 34 C 58 38, 58 75, 58 82 C 58 88, 50 90, 42 90 C 34 90, 42 82, 42 82 L 42 34 C 35 34, 20 34, 20 28 Z"
        />
        {/* Leaf 1 (Left curve out) */}
        <path
          d="M 38 22 C 30 14, 22 10, 24 2 C 34 2, 42 10, 42 18 Z"
          fill={leafColor}
        />
        {/* Leaf 2 (Right top curve) */}
        <path
          d="M 44 20 C 42 8, 52 2, 60 4 C 62 14, 52 20, 44 20 Z"
          fill={leafColor}
        />
      </svg>
      <span className="font-serif tracking-tight font-bold">
        <span className="text-[#B9964A]">T</span>reatmed
      </span>
    </div>
  );
};

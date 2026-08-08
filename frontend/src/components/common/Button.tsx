import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'forest' | 'terracotta' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#B9964A] hover:bg-[#8C6D2F] text-white shadow-md shadow-[#B9964A]/20 focus:ring-[#B9964A]',
    outline: 'border-2 border-[#B9964A] text-[#8C6D2F] hover:bg-[#B9964A] hover:text-white focus:ring-[#B9964A]',
    ghost: 'text-[#1E1B16] hover:bg-[#F3EBDA] hover:text-[#8C6D2F] focus:ring-[#B9964A]',
    forest: 'bg-[#2F4A3D] hover:bg-[#1F3229] text-white shadow-md shadow-[#2F4A3D]/20 focus:ring-[#2F4A3D]',
    terracotta: 'bg-[#B5652D] hover:bg-[#914D1F] text-white shadow-md shadow-[#B5652D]/20 focus:ring-[#B5652D]',
    dark: 'bg-[#1E1B16] hover:bg-[#343029] text-[#FBF8F2] focus:ring-[#1E1B16]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {children}
    </button>
  );
};

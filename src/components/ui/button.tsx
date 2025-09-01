import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2',
    outline: 'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 px-4 py-2',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 p-2'
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Romantic Button Component
 * Styled with soft shadows, rounded corners, and gentle hover effects
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: ButtonProps) => {
  const baseStyles = `
    font-body font-medium rounded-full 
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary/50
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `;

  const variants = {
    primary: `
      bg-primary text-primary-foreground
      hover:brightness-110 hover:scale-105
      shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]
      hover:shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.5)]
    `,
    outline: `
      bg-transparent border-2 border-primary text-primary
      hover:bg-primary hover:text-primary-foreground hover:scale-105
    `,
    ghost: `
      bg-transparent text-primary
      hover:bg-primary/10
    `,
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

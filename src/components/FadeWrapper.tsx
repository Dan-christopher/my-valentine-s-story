import { ReactNode, useEffect, useState } from 'react';

interface FadeWrapperProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  className?: string;
}

/**
 * FadeWrapper - Handles fade in/out transitions for page content
 * Used to create smooth chapter-like transitions between pages
 */
const FadeWrapper = ({ children, show, duration = 800, className = '' }: FadeWrapperProps) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-all ${className}`}
      style={{
        animation: show 
          ? `fade-in ${duration}ms ease-out forwards` 
          : `fade-out ${duration}ms ease-out forwards`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeWrapper;

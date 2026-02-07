import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';

/**
 * Intro Page - The romantic entrance to the story
 * Sets the emotional tone for the entire experience
 */
const Intro = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleStart = () => {
    // Trigger fade out, then navigate
    setIsVisible(false);
    setTimeout(() => {
      navigate('/quiz-invite');
    }, 800);
  };

  return (
    <div className="page-container relative overflow-hidden">
      <FloatingHearts />

      <FadeWrapper show={isVisible} className="relative z-10 text-center px-4">
        {/* Decorative heart */}
        <div className="mb-8">
          <Heart
            className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto animate-heartbeat"
            fill="currentColor"
          />
        </div>

        {/* Main heading */}
        <h1 className="font-romantic text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
          Happy Valentine's Day
        </h1>

        {/* Heart emoji */}
        <p className="text-5xl md:text-6xl mb-8">❤️</p>

        {/* Subtitle */}
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
          I wanted to make something special, just for you...
        </p>

        {/* CTA Button */}
        <Button
          onClick={handleStart}
          size="lg"
          className="animate-pulse-glow"
        >
          I made something for you 💕
        </Button>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-16 opacity-40">
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </FadeWrapper>
    </div>
  );
};

export default Intro;

import { useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';

interface GiftBoxProps {
  onOpen: () => void;
}

/**
 * Interactive Gift Box Component
 * Shakes when clicked, then opens to reveal message
 */
const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    if (isOpened) return;

    // Start shake animation
    setIsShaking(true);

    // After shake, start opening
    setTimeout(() => {
      setIsShaking(false);
      setIsOpening(true);

      // After opening animation, show content
      setTimeout(() => {
        setIsOpened(true);
        onOpen();
      }, 800);
    }, 600);
  };

  if (isOpened) {
    return (
      <div className="animate-scale-in text-center">
        <div className="relative">
          {/* Sparkle decorations */}
          <Sparkles className="absolute -top-8 -left-8 w-6 h-6 text-gold animate-float" />
          <Sparkles className="absolute -top-4 -right-10 w-5 h-5 text-gold animate-float delay-200" />
          <Sparkles className="absolute -bottom-6 -left-6 w-4 h-4 text-gold animate-float delay-400" />

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] max-w-md mx-auto">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-heartbeat" />

            <p className="font-romantic text-xl md:text-2xl text-foreground leading-relaxed">
              You didn't win this by answering questions.
            </p>
            <p className="font-romantic text-xl md:text-2xl text-primary mt-4 leading-relaxed">
              You won because you always stayed with me till the end. 💗
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        relative cursor-pointer transition-transform duration-300
        ${isShaking ? 'animate-shake' : ''}
        ${isOpening ? 'animate-gift-open' : ''}
        ${!isShaking && !isOpening ? 'hover:scale-110' : ''}
      `}
      aria-label="Open gift"
    >
      {/* Gift box shadow */}
      <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl transform translate-y-4" />

      {/* Gift box */}
      <div className="relative bg-gradient-to-br from-primary to-accent rounded-3xl p-12 md:p-16 shadow-[var(--shadow-card)]">
        {/* Ribbon vertical */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-gold/80" />
        {/* Ribbon horizontal */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-gold/80" />
        {/* Bow */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-8 h-6 bg-gold rounded-full transform -rotate-45 absolute -left-6" />
            <div className="w-8 h-6 bg-gold rounded-full transform rotate-45 absolute -right-6" />
            <div className="w-4 h-4 bg-gold rounded-full absolute left-1/2 -translate-x-1/2" />
          </div>
        </div>

        <Gift className="w-20 h-20 md:w-24 md:h-24 text-primary-foreground relative z-10" />
      </div>

      <p className="mt-6 text-muted-foreground font-body animate-pulse">
        Tap to open 💝
      </p>
    </button>
  );
};

export default GiftBox;

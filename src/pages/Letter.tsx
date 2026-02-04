import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Mail, Heart } from 'lucide-react';

// Letter content - Customize with your own message
const letterLines = [
  "My dearest love,",
  "",
  "From the moment you came into my life,",
  "everything changed for the better.",
  "",
  "You have this incredible way",
  "of making ordinary moments",
  "feel absolutely magical.",
  "",
  "Your smile lights up my world,",
  "and your laugh is my favorite sound.",
  "",
  "Thank you for being you,",
  "for choosing us,",
  "for making every day brighter.",
  "",
  "I love you more than words can say.",
  "",
  "Forever yours,",
  "[Your Name] 💕",
];

/**
 * Letter Page - The emotional heart of the experience
 * Envelope opens to reveal a love letter that appears line by line
 */
const Letter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const navigate = useNavigate();

  // Check if gift was opened (prevent skipping)
  useEffect(() => {
    const giftOpened = localStorage.getItem('giftOpened');
    if (!giftOpened) {
      navigate('/gift');
    }
  }, [navigate]);

  // Reveal letter lines one by one
  useEffect(() => {
    if (letterRevealed && visibleLines < letterLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [letterRevealed, visibleLines]);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => {
      setLetterRevealed(true);
    }, 800);
  };

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/final');
    }, 800);
  };

  return (
    <div className="page-container relative overflow-hidden min-h-screen py-12">
      <FloatingHearts />
      
      <FadeWrapper show={isVisible} className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Title */}
        <h1 className="font-romantic text-3xl md:text-4xl text-foreground text-center mb-8">
          A Letter For You
        </h1>

        {/* Envelope / Letter container */}
        <div className="relative">
          {/* Closed envelope */}
          {!envelopeOpen && (
            <div className="text-center animate-fade-in">
              <div 
                className="relative inline-block cursor-pointer group"
                onClick={handleOpenEnvelope}
              >
                {/* Envelope shadow */}
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl transform translate-y-4" />
                
                {/* Envelope body */}
                <div className="relative bg-gradient-to-br from-rose-light to-blush rounded-2xl p-12 md:p-16 shadow-[var(--shadow-card)] group-hover:scale-105 transition-transform duration-300">
                  {/* Envelope flap (triangle) */}
                  <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[100px] border-r-[100px] border-t-[60px] border-l-transparent border-r-transparent border-t-primary/30" />
                  </div>
                  
                  <Mail className="w-20 h-20 md:w-24 md:h-24 text-primary" />
                </div>
                
                <p className="mt-6 text-muted-foreground font-body animate-pulse">
                  Tap to open 💌
                </p>
              </div>
            </div>
          )}

          {/* Open letter */}
          {envelopeOpen && (
            <div className="animate-slide-up">
              <div className="bg-card rounded-3xl p-6 md:p-10 shadow-[var(--shadow-card)] min-h-[400px]">
                {/* Letter header decoration */}
                <div className="flex justify-center mb-6">
                  <Heart className="w-8 h-8 text-primary" fill="currentColor" />
                </div>

                {/* Letter content */}
                <div className="font-body text-foreground leading-relaxed space-y-1">
                  {letterLines.slice(0, visibleLines).map((line, index) => (
                    <p
                      key={index}
                      className={`
                        transition-opacity duration-500
                        ${line === "" ? "h-4" : ""}
                        ${index === 0 || line.includes("Forever") ? "font-romantic text-xl text-primary" : ""}
                        ${line.includes("[Your Name]") ? "text-primary font-medium" : ""}
                      `}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Cursor/typing indicator */}
                {letterRevealed && visibleLines < letterLines.length && (
                  <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-1" />
                )}
              </div>

              {/* Continue button - shows after letter is fully revealed */}
              {visibleLines >= letterLines.length && (
                <div className="text-center mt-8 animate-fade-in">
                  <Button onClick={handleContinue} size="lg">
                    One last thing 🎶
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </FadeWrapper>
    </div>
  );
};

export default Letter;

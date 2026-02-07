import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import GiftBox from '@/components/GiftBox';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';

/**
 * Gift Page - The reward reveal
 * Interactive gift box that opens to reveal a heartfelt message
 */
const Gift = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const navigate = useNavigate();

  // Check if quiz was completed (prevent skipping)
  useEffect(() => {
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (!quizCompleted) {
      navigate('/quiz');
    }
  }, [navigate]);

  const handleGiftOpen = () => {
    setGiftOpened(true);
    localStorage.setItem('giftOpened', 'true');
  };

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/letter');
    }, 800);
  };

  const handleReveal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowReveal(true);
      setIsVisible(true);
    }, 800);
  };

  return (
    <div className="page-container relative overflow-hidden">
      <FloatingHearts />

      <FadeWrapper show={isVisible} className="relative z-10 text-center px-4 w-full">
        {!showReveal ? (
          <>
            {/* Heading */}
            <h1 className="font-romantic text-4xl md:text-5xl text-foreground mb-8 md:mb-12">
              You won 💝
            </h1>

            {/* Gift Box */}
            <div className="mb-8 md:mb-12">
              <GiftBox onOpen={handleGiftOpen} />
            </div>

            {/* Buttons - only shows after gift is opened */}
            {giftOpened && (
              <div className="animate-fade-in mt-8 flex flex-col items-center gap-4">
                <Button
                  onClick={handleReveal}
                  size="lg"
                  className="w-full max-w-md animate-pulse-glow"
                >
                  Well… since you stayed that long, you deserve a real gift 😌
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Real Gift Reveal */
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl max-w-sm mx-auto animate-scale-in border border-white/50">
            <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg mx-auto" style={{ maxWidth: '300px' }}>
              <img
                src={`${import.meta.env.BASE_URL}images/dress.jpeg`}
                alt="A special gift for you"
                className="w-full h-auto object-cover transform hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="space-y-4">
              <p className="font-romantic text-2xl md:text-3xl text-primary">
                Do you like it? 😌
              </p>
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Look behind you…
                <br />
                <span className="font-semibold text-foreground mt-2 block">
                  Someone is standing there with something for you.
                </span>
              </p>

              <div className="pt-4 animate-fade-in" style={{ animationDelay: '1000ms' }}>
                <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
                  Now… open your letter 💌
                </Button>
              </div>
            </div>
          </div>
        )}
      </FadeWrapper>
    </div>
  );
};

export default Gift;

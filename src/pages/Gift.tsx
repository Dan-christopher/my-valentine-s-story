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

  return (
    <div className="page-container relative overflow-hidden">
      <FloatingHearts />
      
      <FadeWrapper show={isVisible} className="relative z-10 text-center px-4">
        {/* Heading */}
        <h1 className="font-romantic text-4xl md:text-5xl text-foreground mb-12">
          You won 💝
        </h1>

        {/* Gift Box */}
        <div className="mb-12">
          <GiftBox onOpen={handleGiftOpen} />
        </div>

        {/* Continue button - only shows after gift is opened */}
        {giftOpened && (
          <div className="animate-fade-in mt-8">
            <Button onClick={handleContinue} size="lg">
              Open your letter 💌
            </Button>
          </div>
        )}
      </FadeWrapper>
    </div>
  );
};

export default Gift;

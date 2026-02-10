import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GiftBox from '@/components/GiftBox';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Gift as GiftIcon, Heart } from 'lucide-react';

const Envelope = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col items-center gap-6 cursor-pointer py-8 hover:scale-105 transition-transform duration-500"
    >
      <div className="relative w-64 h-40 bg-stone-100 shadow-xl rounded-md flex justify-center items-end">

        {/* Letter Inside (Peeking) */}
        <div className={`absolute top-2 left-4 right-4 h-32 bg-white shadow-sm rounded-sm transition-all duration-700 ease-in-out border border-gray-100 ${isOpen ? '-translate-y-16' : ''}`}>
          <div className="p-4 space-y-3 opacity-40">
            <div className="h-1.5 bg-gray-300 rounded w-full"></div>
            <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-1.5 bg-gray-300 rounded w-full"></div>
            <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        {/* Side/Bottom Flaps (Pocket) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-md">
          {/* Left Triangle */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[128px] border-t-[80px] border-l-[#f5f5f4] border-t-transparent border-b-[#e7e5e4] border-r-transparent"></div>
          {/* Right Triangle */}
          <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[128px] border-t-[80px] border-r-[#f5f5f4] border-t-transparent border-b-[#e7e5e4] border-l-transparent"></div>

          {/* Bottom Triangle - creates the pocket shape */}
          <div className="absolute bottom-0 left-0 right-0 h-0 border-b-[90px] border-l-[128px] border-r-[128px] border-b-[#ebe8e6] border-l-transparent border-r-transparent shadow-sm"></div>
        </div>

        {/* Top Flap (The one that opens) */}
        <div
          className={`absolute top-0 left-0 right-0 z-20 origin-top transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'z-0' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)'
          }}
        >
          <div className="w-0 h-0 border-l-[128px] border-r-[128px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#d6d3d1] relative drop-shadow-md">
            {/* Heart Seal */}
            <div className="absolute -top-[60px] left-[-12px] text-rose-500 drop-shadow-sm">
              <Heart size={24} fill="currentColor" strokeWidth={0} />
            </div>
          </div>
        </div>

      </div>

      <span className="font-romantic text-xl text-rose-500/80 group-hover:text-rose-600 transition-colors duration-300 animate-pulse mt-2">
        Tap to open 💌
      </span>
    </div>
  );
};

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
                <style>
                  {`
                    @keyframes playful-gift {
                      0%, 100% { transform: scale(1) rotate(0deg); }
                      25% { transform: scale(1.05) rotate(-3deg); }
                      50% { transform: scale(1) rotate(0deg); }
                      75% { transform: scale(1.05) rotate(3deg); }
                    }
                  `}
                </style>
                <button
                  onClick={handleReveal}
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 text-white font-romantic font-bold text-lg shadow-[0_4px_15px_rgba(251,113,133,0.4)] hover:shadow-[0_8px_25px_rgba(251,113,133,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                  style={{
                    animation: 'playful-gift 2.5s infinite ease-in-out'
                  }}
                >
                  <GiftIcon className="w-5 h-5 animate-bounce" />
                  <span>Tap to open your gift 🎀</span>
                </button>
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
                Piche dekho
                <br />
                <span className="font-semibold text-foreground mt-2 block">
                  Vaishali khadi h a gift lekr 😂
                </span>
              </p>

              <div className="pt-8 animate-fade-in flex justify-center w-full" style={{ animationDelay: '600ms' }}>
                <Envelope onOpen={handleContinue} />
              </div>
            </div>
          </div>
        )}
      </FadeWrapper>
    </div>
  );
};

export default Gift;

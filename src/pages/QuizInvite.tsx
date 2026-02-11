import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';

/**
 * Quiz Invitation Page
 * A playful interlude before the quiz
 * Features a "No" button that dodges the cursor/taps
 */
const QuizInvite = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [noCount, setNoCount] = useState(0);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hasMoved, setHasMoved] = useState(false);

    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const noBtnRef = useRef<HTMLButtonElement>(null);

    const handleYes = () => {
        setIsVisible(false);
        setTimeout(() => {
            navigate('/quiz');
        }, 800);
    };

    const moveButton = () => {
        if (!containerRef.current || !noBtnRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const btnRect = noBtnRef.current.getBoundingClientRect();

        // Calculate available space
        // We want to keep the button within the container but move it far enough to be fun
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        // Generate random position
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        setNoBtnPosition({ x: newX, y: newY });
        setHasMoved(true);
        setNoCount(prev => prev + 1);
    };

    // Reset position if window resizes to prevent button getting lost
    useEffect(() => {
        const handleResize = () => {
            setHasMoved(false);
            setNoBtnPosition({ x: 0, y: 0 });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getNoButtonText = () => {
        if (noCount === 0) return "Nuh uh 🙅‍♀️";
        if (noCount === 1) return "Nuhhh you still have to give the quiz 😌";
        if (noCount < 5) return "Nope, try again! 🤪";
        return "Okay fine, just click Yes! 😤";
    };

    return (
        <div className="page-container relative overflow-hidden flex flex-col items-center justify-center min-h-[100dvh] w-full p-4">
            <FloatingHearts />

            <FadeWrapper show={isVisible} className="relative z-10 w-full max-w-md mx-auto text-center">

                <div className="mb-8 md:mb-12">
                    <h1 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                        Shall we have a little quiz? 😌
                    </h1>
                    <p className="font-body text-lg md:text-xl text-muted-foreground">
                        Let's see how well you really know me...
                    </p>
                </div>

                {/* 
          Button Container
          Needs relative positioning for the absolute moving button
          We give it a fixed minimum height to ensure there's space for the button to move around
        */}
                <div
                    ref={containerRef}
                    className="relative min-h-[300px] w-full flex flex-col items-center gap-4 border border-transparent"
                >
                    {/* Yes Button - Static */}
                    <Button
                        onClick={handleYes}
                        size="lg"
                        className="z-20 min-w-[200px] animate-pulse-glow"
                    >
                        Yes, obviously 😎
                    </Button>

                    {/* No Button - Dodging */}
                    <button
                        ref={noBtnRef}
                        // Logic:
                        // Desktop: onMouseEnter triggers move
                        // Mobile: onTouchStart (tap) triggers move
                        // We also add onClick as a fallback/to catch the tap
                        onMouseEnter={moveButton}
                        onTouchStart={moveButton}
                        onClick={moveButton}
                        className={`
              transition-all duration-500 ease-in-out
              px-6 py-3 rounded-full font-body font-semibold text-lg
              bg-white text-muted-foreground border-2 border-gray-200 shadow-sm
              hover:bg-gray-50 active:scale-95
              ${hasMoved ? 'absolute' : 'relative'}
            `}
                        style={hasMoved ? {
                            left: `${noBtnPosition.x}px`,
                            top: `${noBtnPosition.y}px`,
                        } : {}}
                    >
                        {getNoButtonText()}
                    </button>
                </div>

            </FadeWrapper>
        </div>
    );
};

export default QuizInvite;

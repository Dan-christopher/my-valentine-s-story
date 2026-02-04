import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Progress from '@/components/Progress';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';

// Quiz questions - Customize these with personal questions
const questions = [
  {
    question: "What makes me smile the most?",
    options: [
      { text: "Your laugh 💫", feedback: "Absolutely true 🥹" },
      { text: "Good food 🍕", feedback: "Okay, also true! 😋" },
      { text: "Surprise hugs 🤗", feedback: "You know me well 💗" },
      { text: "All of the above ✨", feedback: "Perfect answer! 💝" },
    ],
  },
  {
    question: "What's our best memory together?",
    options: [
      { text: "Our first date 💑", feedback: "That was magical ✨" },
      { text: "That spontaneous trip 🚗", feedback: "Best adventure ever! 🌟" },
      { text: "Late night conversations 🌙", feedback: "Those are precious 💫" },
      { text: "Every moment with you 💖", feedback: "You're making me blush! 🥰" },
    ],
  },
  {
    question: "What do I like more about you? 😏🔥",
    options: [
      { text: "Your ass 🍑", feedback: "Good choice... 😈💕" },
      { text: "Your boobs 🫦", feedback: "Can't argue with that! 🔥💗" },
    ],
  },
];

/**
 * Quiz Page - Playful questions to engage the user
 * No wrong answers, just cute feedback
 */
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();

  // Ensure currentQuestion is within bounds (in case questions array changed)
  const safeCurrentQuestion = Math.min(currentQuestion, questions.length - 1);
  const currentQ = questions[safeCurrentQuestion];

  const handleAnswer = (optionIndex: number) => {
    const option = currentQ.options[optionIndex];
    setFeedback(option.feedback);
    setShowFeedback(true);
    setScore((prev) => prev + 1);

    // Show feedback, then move to next question
    setTimeout(() => {
      setShowFeedback(false);
      
      if (safeCurrentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        // Quiz complete - save state and navigate
        localStorage.setItem('quizCompleted', 'true');
        localStorage.setItem('score', score.toString());
        
        setIsVisible(false);
        setTimeout(() => {
          navigate('/gift');
        }, 800);
      }
    }, 1500);
  };

  return (
    <div className="page-container relative overflow-hidden">
      <FloatingHearts />
      
      <FadeWrapper show={isVisible} className="relative z-10 w-full max-w-lg mx-auto px-4">
        {/* Progress indicator */}
        <Progress current={safeCurrentQuestion} total={questions.length} />

        {/* Question card */}
        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-[var(--shadow-card)] text-center">
          {/* Question */}
          <h2 className="font-romantic text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Feedback overlay */}
          {showFeedback && feedback && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/95 rounded-3xl animate-scale-in">
              <p className="font-romantic text-2xl text-primary">{feedback}</p>
            </div>
          )}

          {/* Answer options */}
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className="w-full justify-center text-left"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Encouragement text */}
        <p className="text-center text-muted-foreground mt-8 font-body text-sm">
          There are no wrong answers here 💕
        </p>
      </FadeWrapper>
    </div>
  );
};

export default Quiz;

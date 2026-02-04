import { useEffect, useState } from 'react';

/**
 * Floating Hearts Background Decoration
 * Creates subtle animated hearts floating in the background
 */
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Generate random hearts
    const generated = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      size: 12 + Math.random() * 16,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-light opacity-40 animate-float"
          style={{
            left: `${heart.left}%`,
            top: `${20 + Math.random() * 60}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

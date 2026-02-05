import { useState, useRef, useEffect } from 'react';
import Button from '@/components/Button';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Play, Pause, Heart, ExternalLink } from 'lucide-react';

/**
 * Final Page - The musical dedication
 * Plays a song (user initiated) without lyrics
 */
const Final = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reference to the native audio element
  const audioRef = useRef<HTMLAudioElement>(null);
  const AUDIO_SRC = "/audio/song.mp3";

  // Set initial volume when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="page-container relative overflow-hidden min-h-screen py-8">
      <FloatingHearts />

      {/* Native Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        onEnded={handleEnded}
        preload="auto"
      />

      <FadeWrapper show={isVisible} className="relative z-10 w-full max-w-lg mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="font-romantic text-3xl md:text-4xl text-foreground mb-4">
          This song is dedicated to you
        </h1>
        <p className="text-primary text-2xl mb-8">my love ❤️</p>

        {/* Photo placeholder */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 rounded-full overflow-hidden shadow-[var(--shadow-card)] border-4 border-rose-light">
          {/* Placeholder for couple photo */}
          <div className="w-full h-full bg-gradient-to-br from-rose-light to-blush flex items-center justify-center">
            <Heart className="w-20 h-20 text-primary animate-heartbeat" fill="currentColor" />
          </div>
          {/* Or use an actual image:
          <img src="/path-to-your-photo.jpg" alt="Us" className="w-full h-full object-cover" />
          */}
        </div>

        {/* Play button */}
        <button
          onClick={togglePlay}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8
            bg-primary text-primary-foreground shadow-[var(--shadow-card)]
            transition-all duration-300 hover:scale-110
            ${isPlaying ? 'animate-pulse-glow' : ''}
          `}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>

        {/* Song info */}
        <p className="text-muted-foreground font-body text-sm mb-8">
          <span className="font-semibold text-foreground">Enna Sona</span> - Arijit Singh
          <br />
          <span className="text-xs italic">from OK Jaanu</span>
        </p>



        {/* End message */}
        <div className="mt-12 pt-8 border-t border-rose-light">
          <p className="font-romantic text-xl text-primary">
            Thank you for being my valentine 💝
          </p>
          <p className="text-muted-foreground font-body text-sm mt-2">
            Made with love, just for you
          </p>
        </div>
      </FadeWrapper>
    </div>
  );
};

export default Final;

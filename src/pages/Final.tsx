import { useState, useRef, useEffect } from 'react';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Play, Pause, Heart } from 'lucide-react';

/**
 * Final Page - Music Controlled Book Album
 * Book opens and pages flip automatically when music plays
 */
const Final = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Reference to the native audio element
  const audioRef = useRef<HTMLAudioElement>(null);
  const AUDIO_SRC = "/audio/song.mp3";

  // Photos to cycle through
  const photos = [
    "/images/photo1.jpeg",
    "/images/photo2.jpeg",
    "/images/photo3.jpeg",
    "/images/photo4.jpeg",
    "/images/photo5.jpeg"
  ];

  // Set initial volume when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
    }
  }, []);

  // Sync Book State with Music Playback
  useEffect(() => {
    if (isPlaying) {
      // Delay book opening slightly after music starts for effect
      const openTimeout = setTimeout(() => setIsBookOpen(true), 500);

      // Auto-flip pages interval
      const flipInterval = setInterval(() => {
        setPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 4000); // Flip every 4 seconds

      return () => {
        clearTimeout(openTimeout);
        clearInterval(flipInterval);
      };
    } else {
      // Optional: Close book when music stops? 
      // User requirement implies 'Book stays open on current page' if paused.
      // So we do NOTHING here, keeping current state.
    }
  }, [isPlaying, photos.length]);

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
    // Optional: Reset book when song ends?
    // setIsBookOpen(false); 
    // setPhotoIndex(0);
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

        {/* Book Container */}
        {/* Pointer events disabled to prevent manual interaction */}
        <div className="relative mx-auto mb-10 w-64 h-80 perspective-[1500px] pointer-events-none select-none">
          <div className="relative w-full h-full preserve-3d transition-transform duration-700">

            {/* Pages (Right Side / Inside) */}
            <div className={`
                absolute inset-0 bg-white rounded-r-lg shadow-lg border-l border-gray-200
                flex items-center justify-center overflow-hidden
                ${isBookOpen ? 'z-10' : 'z-0'}
              `}>
              <div className="relative w-full h-full p-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className={`
                      absolute inset-0 w-full h-full object-cover rounded-md
                      transition-all duration-1000 ease-in-out origin-left
                    `}
                    style={{
                      opacity: index === photoIndex ? 1 : 0,
                      transform: index === photoIndex
                        ? 'rotateY(0deg)'
                        : (index < photoIndex ? 'rotateY(-180deg)' : 'rotateY(0deg)'),
                      zIndex: index === photoIndex ? 10 : 0
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Book Cover (Front) */}
            <div
              className={`
                absolute inset-0 bg-gradient-to-br from-rose-300 to-rose-400 rounded-lg shadow-xl
                flex flex-col items-center justify-center border-l-4 border-rose-500
                origin-left transition-transform duration-1000 ease-in-out z-20
              `}
              style={{
                transform: isBookOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              }}
            >
              <Heart className="w-16 h-16 text-white animate-pulse mb-4" fill="currentColor" />
              <p className="font-romantic text-white text-xl">Our Story</p>
            </div>

            {/* Fake Back Page (Visible when cover flips) */}
            <div
              className={`
                absolute inset-0 bg-white rounded-lg shadow-md
                origin-left transition-transform duration-1000 ease-in-out z-10
              `}
              style={{
                transform: isBookOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                backfaceVisibility: 'hidden'
              }}
            >
            </div>

          </div>
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

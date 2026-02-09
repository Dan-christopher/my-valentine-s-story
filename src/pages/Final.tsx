import { useState, useRef, useEffect } from 'react';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Play, Pause, Heart } from 'lucide-react';

/**
 * Final Page - Music Controlled Book Album
 * Book opens and pages flip automatically when music plays
 * Mobile-First Optimized with Tightened Spacing
 */
const Final = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Reference to the native audio element
  const audioRef = useRef<HTMLAudioElement>(null);
  const AUDIO_SRC = "/my-valentine-s-story/audio/song.mp3";


  // Photos to cycle through
  const photos = [
    "/my-valentine-s-story/images/photo1.jpeg",
    "/my-valentine-s-story/images/photo2.jpeg",
    "/my-valentine-s-story/images/photo3.jpeg",
    "/my-valentine-s-story/images/photo4.jpeg",
    "/my-valentine-s-story/images/photo5.jpeg",
    "/my-valentine-s-story/images/photo6.jpeg",
    "/my-valentine-s-story/images/photo7.jpeg",
    "/my-valentine-s-story/images/photo8.jpeg",
    "/my-valentine-s-story/images/photo9.jpeg",
    "/my-valentine-s-story/images/photo10.jpeg",
    "/my-valentine-s-story/images/photo11.jpeg",
    "/my-valentine-s-story/images/photo12.jpeg",
    "/my-valentine-s-story/images/photo13.jpeg",
    "/my-valentine-s-story/images/photo14.jpeg",
    "/my-valentine-s-story/images/photo15.jpeg",
    "/my-valentine-s-story/images/photo16.jpeg",
    "/my-valentine-s-story/images/photo17.jpeg",
    "/my-valentine-s-story/images/photo18.jpeg",
    "/my-valentine-s-story/images/photo19.jpeg",
    "/my-valentine-s-story/images/photo20.jpeg",
    "/my-valentine-s-story/images/photo21.jpeg",
    "/my-valentine-s-story/images/photo22.jpeg",
    "/my-valentine-s-story/images/photo23.jpeg",
    "/my-valentine-s-story/images/photo24.jpeg",
    "/my-valentine-s-story/images/photo25.jpeg",
    "/my-valentine-s-story/images/photo26.jpeg",
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
  };

  return (
    <div
      className="page-container relative overflow-hidden flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 py-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <FloatingHearts />

      {/* Native Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        onEnded={handleEnded}
        preload="auto"
      />

      <FadeWrapper show={isVisible} className="relative z-10 w-full max-w-lg md:max-w-xl mx-auto flex flex-col items-center">
        {/* Title Section */}
        <div className="text-center mb-4 md:mb-8 w-full">
          <h1 className="font-romantic text-3xl sm:text-4xl text-foreground mb-2 px-2 leading-tight">
            This song is dedicated to you
          </h1>
          <p className="text-primary text-xl sm:text-2xl">my love ❤️</p>
        </div>

        {/* Book Container - Responsive */}
        {/* Tighter margins for better vertical fit */}
        <div
          className="relative mx-auto mb-6 sm:mb-8 md:mb-10 perspective-[1500px] pointer-events-none select-none"
          style={{
            width: 'min(280px, 65vw)', // Slightly reduced width for better proportion
            height: 'min(350px, 81.25vw)' // Aspect ratio ~4:5
          }}
        >
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
              <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-pulse mb-3" fill="currentColor" />
              <p className="font-romantic text-white text-lg sm:text-xl">Our Story</p>
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
            w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6
            bg-primary text-primary-foreground shadow-[var(--shadow-card)]
            transition-all duration-300 hover:scale-110 active:scale-95
            ${isPlaying ? 'animate-pulse-glow' : ''}
          `}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
          )}
        </button>

        {/* Song info */}
        {/* <div className="text-center w-full px-4">
          <p className="text-muted-foreground font-body text-sm mb-4 sm:mb-6">
            <span className="font-semibold text-foreground">Enna Sona</span> - Arijit Singh
            <br />
            <span className="text-xs italic">from OK Jaanu</span>
          </p>
        </div> */}

        {/* End message */}
        {/* Even tighter spacing for better visibility */}
        <div className="mt-0 pt-4 border-t border-rose-light w-full flex flex-col items-center text-center">
          <div className="max-w-sm w-full">
            <p className="font-romantic text-lg sm:text-xl text-primary">
              Thank you for being my valentine 💝
            </p>
            <p className="text-muted-foreground font-body text-xs sm:text-sm mt-1">
              Made with love, just for you
            </p>
          </div>
        </div>

      </FadeWrapper>
    </div>
  );
};

export default Final;

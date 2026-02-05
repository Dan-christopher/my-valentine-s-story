import { useState, useRef, useEffect } from 'react';
import Button from '@/components/Button';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Play, Pause, Heart } from 'lucide-react';

// Enna Sona - Arijit Singh (from OK Jaanu)
// Placeholder descriptions for lyric moments - add your own personal messages!
const lyrics = [
  { time: 0, text: "🎵 [Intro melody begins...] 🎵" },
  { time: 5, text: "♪ [Soft humming...] ♪" },
  { time: 12, text: "✨ This song reminds me of you ✨" },
  { time: 18, text: "♪ [First verse - about finding someone special] ♪" },
  { time: 26, text: "💭 Every word feels like it was written for us" },
  { time: 34, text: "" },
  { time: 38, text: "♪ [Chorus begins...] ♪" },
  { time: 46, text: "💕 You make everything beautiful 💕" },
  { time: 54, text: "" },
  { time: 58, text: "♪ [Second verse - deeper feelings] ♪" },
  { time: 68, text: "🌹 I found my home in you" },
  { time: 76, text: "" },
  { time: 80, text: "♪ [Emotional chorus repeat...] ♪" },
  { time: 90, text: "💝 Tu hi mera sab kuch hai 💝" },
  { time: 100, text: "" },
  { time: 105, text: "♪ [Bridge - heartfelt moment] ♪" },
  { time: 115, text: "Forever yours... 💗" },
  { time: 125, text: "" },
  { time: 130, text: "🎵 [Final chorus fades...] 🎵" },
  { time: 145, text: "" },
  { time: 150, text: "💕 I love you, always 💕" },
];

/**
 * Final Page - The musical dedication
 * Plays a song (user initiated) with lyrics appearing line by line
 */
const Final = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      if (time > 0) {
        setShowLyrics(true);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Get visible lyrics based on current time
  const visibleLyrics = lyrics.filter((lyric) => lyric.time <= currentTime);

  return (
    <div className="page-container relative overflow-hidden min-h-screen py-8">
      <FloatingHearts />

      {/* Native Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        onTimeUpdate={handleTimeUpdate}
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

        {/* Lyrics display */}
        {showLyrics && (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-[var(--shadow-soft)] min-h-[200px] mb-8">
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {visibleLyrics.map((lyric, index) => (
                <p
                  key={index}
                  className={`
                    font-romantic text-lg transition-all duration-500
                    ${lyric.text === "" ? "h-2" : ""}
                    ${lyric.text.includes("love you") ? "text-primary text-xl font-semibold" : "text-foreground"}
                    ${index === visibleLyrics.length - 1 ? "animate-fade-in" : "opacity-70"}
                  `}
                >
                  {lyric.text}
                </p>
              ))}
            </div>
          </div>
        )}

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

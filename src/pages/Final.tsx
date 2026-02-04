import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import FadeWrapper from '@/components/FadeWrapper';
import FloatingHearts from '@/components/FloatingHearts';
import { Play, Pause, Heart, ExternalLink } from 'lucide-react';

// Lyrics with timestamps (in seconds) - Customize with your chosen song
// Using placeholder lyrics to avoid copyright issues
const lyrics = [
  { time: 0, text: "♪ The moment I saw you ♪" },
  { time: 4, text: "♪ I knew you were the one ♪" },
  { time: 8, text: "♪ My heart started singing ♪" },
  { time: 12, text: "♪ A melody of love begun ♪" },
  { time: 16, text: "" },
  { time: 18, text: "♪ With every passing day ♪" },
  { time: 22, text: "♪ My love for you grows strong ♪" },
  { time: 26, text: "♪ You're everything I wished for ♪" },
  { time: 30, text: "♪ The place where I belong ♪" },
  { time: 34, text: "" },
  { time: 36, text: "♪ Forever and always ♪" },
  { time: 40, text: "♪ You'll be my valentine ♪" },
  { time: 44, text: "♪ Through all the seasons ♪" },
  { time: 48, text: "♪ Our hearts will intertwine ♪" },
  { time: 52, text: "" },
  { time: 54, text: "💕 I love you 💕" },
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  // Simulated playback timer (since we don't have actual audio)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      setShowLyrics(true);
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 60) {
            setIsPlaying(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentTime >= 60) {
      setCurrentTime(0);
    }
  };

  // Get visible lyrics based on current time
  const visibleLyrics = lyrics.filter((lyric) => lyric.time <= currentTime);

  return (
    <div className="page-container relative overflow-hidden min-h-screen py-8">
      <FloatingHearts />
      
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
          [Song Title] - [Artist Name]
          <br />
          <span className="text-xs">Replace with your special song</span>
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

        {/* External link buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => window.open('https://spotify.com', '_blank')}
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Listen on Spotify
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('https://youtube.com', '_blank')}
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Watch on YouTube
          </Button>
        </div>

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

import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

const pages = [
  { path: '/', label: 'Intro' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/gift', label: 'Gift' },
  { path: '/letter', label: 'Letter' },
  { path: '/final', label: 'Song' },
];

const PageNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentIndex = pages.findIndex(p => p.path === location.pathname);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < pages.length - 1;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-[var(--shadow-card)] border border-rose-light">
        {/* Home button */}
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-rose-light/50 transition-colors text-muted-foreground hover:text-primary"
          aria-label="Go to start"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Previous */}
        <button
          onClick={() => hasPrev && navigate(pages[currentIndex - 1].path)}
          disabled={!hasPrev}
          className={`p-2 rounded-full transition-colors ${
            hasPrev 
              ? 'hover:bg-rose-light/50 text-muted-foreground hover:text-primary' 
              : 'text-muted-foreground/30 cursor-not-allowed'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page indicators */}
        <div className="flex items-center gap-1.5 px-2">
          {pages.map((page, index) => (
            <button
              key={page.path}
              onClick={() => navigate(page.path)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-rose-light hover:bg-primary/50'
                }
              `}
              aria-label={`Go to ${page.label}`}
              title={page.label}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => hasNext && navigate(pages[currentIndex + 1].path)}
          disabled={!hasNext}
          className={`p-2 rounded-full transition-colors ${
            hasNext 
              ? 'hover:bg-rose-light/50 text-muted-foreground hover:text-primary' 
              : 'text-muted-foreground/30 cursor-not-allowed'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PageNav;

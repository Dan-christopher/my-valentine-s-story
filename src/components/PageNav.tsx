import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Don't show nav if route not found in pages
  if (currentIndex === -1) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-rose-200/60 pointer-events-auto transition-all hover:bg-white/95 hover:shadow-lg hover:scale-105">
        {/* Previous */}
        <button
          onClick={() => hasPrev && navigate(pages[currentIndex - 1].path)}
          disabled={!hasPrev}
          className={`p-1.5 rounded-full transition-colors ${hasPrev
            ? 'hover:bg-rose-500/10 text-rose-900 hover:text-rose-600'
            : 'text-rose-900/20 cursor-not-allowed'
            }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Indicator */}
        <span className="text-xs font-medium text-rose-900/60 min-w-[3rem] text-center font-body tracking-wider">
          {currentIndex + 1} <span className="text-rose-300">/</span> {pages.length}
        </span>

        {/* Next */}
        <button
          onClick={() => hasNext && navigate(pages[currentIndex + 1].path)}
          disabled={!hasNext}
          className={`p-1.5 rounded-full transition-colors ${hasNext
            ? 'hover:bg-rose-500/10 text-rose-900 hover:text-rose-600'
            : 'text-rose-900/20 cursor-not-allowed'
            }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PageNav;

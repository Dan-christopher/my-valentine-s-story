interface ProgressProps {
  current: number;
  total: number;
}

/**
 * Progress Indicator for Quiz
 * Shows hearts to indicate progress through questions
 */
const Progress = ({ current, total }: ProgressProps) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`
            w-3 h-3 rounded-full transition-all duration-500
            ${index < current 
              ? 'bg-primary scale-110' 
              : index === current 
                ? 'bg-primary animate-pulse-glow' 
                : 'bg-rose-light'
            }
          `}
        />
      ))}
      <span className="ml-4 text-muted-foreground font-body text-sm">
        {current + 1} / {total}
      </span>
    </div>
  );
};

export default Progress;

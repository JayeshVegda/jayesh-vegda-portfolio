interface ProgressBarProps {
  rating: number;
  className?: string;
}

export default function ProgressBar({ rating, className = "" }: ProgressBarProps) {
  const percentage = (rating / 5) * 100;

  return (
    <div className={`w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}


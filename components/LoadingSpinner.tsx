import { Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export default function LoadingSpinner({
  className = '',
  size = 'md',
}: LoadingSpinnerProps) {
  return (
    <Loader2
      className={`animate-spin text-primary ${sizeClasses[size]} ${className}`}
      aria-hidden
    />
  );
}

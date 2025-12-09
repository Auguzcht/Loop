import { RotateCw } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function Logo({ size = 'md', showIcon = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconInnerSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (!showIcon) {
    return (
      <h1 className={`font-light tracking-tight text-brown-500 ${sizeClasses[size]}`}>
        Loop
      </h1>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${iconSizes[size]} rounded-full border-3 border-terracotta-300 flex items-center justify-center`}
      >
        <RotateCw className={`${iconInnerSizes[size]} text-terracotta-300`} />
      </div>
      <h1 className={`font-light tracking-tight text-brown-500 ${sizeClasses[size]}`}>
        Loop
      </h1>
    </div>
  );
}

export function Tagline() {
  return (
    <p className="font-light text-lg text-brown-400 tracking-wide">
      Stay in the loop
    </p>
  );
}

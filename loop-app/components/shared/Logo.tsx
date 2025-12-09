import { RotateCw } from 'lucide-react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  showIcon?: boolean;
}

export function Logo({ size = 'md', showIcon = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
    xxl: 'text-7xl',
  };

  const logoImageSizes = {
    sm: { height: 32, width: 120 },   // Match icon height of 32px (w-8 h-8)
    md: { height: 40, width: 150 },   // Match icon height of 40px (w-10 h-10)
    lg: { height: 48, width: 180 },   // Match icon height of 48px (w-12 h-12)
    xl: { height: 64, width: 240 },   // Match icon height of 64px (w-16 h-16)
    xxl: { height: 80, width: 300 },  // Match icon height of 80px (w-20 h-20)
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    xxl: 'w-20 h-20',
  };

  const iconInnerSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    xxl: 'w-10 h-10',
  };

  if (!showIcon) {
    return (
      <div className="flex items-center">
        <Image 
          src="/Loop-Logo-Transparent.png" 
          alt="Loop" 
          width={logoImageSizes[size].width} 
          height={logoImageSizes[size].height}
          priority
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${iconSizes[size]} rounded-full border-3 border-terracotta-300 flex items-center justify-center`}
      >
        <RotateCw className={`${iconInnerSizes[size]} text-terracotta-300`} />
      </div>
      <div className="flex items-center">
        <Image 
          src="/Loop-Logo-Transparent.png" 
          alt="Loop" 
          width={logoImageSizes[size].width} 
          height={logoImageSizes[size].height}
          priority
          className="object-contain"
        />
      </div>
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

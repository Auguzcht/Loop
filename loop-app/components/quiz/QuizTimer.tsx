'use client';

import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuizTimerProps {
  timeRemaining: number;
}

export function QuizTimer({ timeRemaining }: QuizTimerProps) {
  const getTimerColor = () => {
    if (timeRemaining > 20) {
      return 'bg-sage-100 text-sage-400';
    } else if (timeRemaining > 10) {
      return 'bg-amber-100 text-amber-600';
    } else {
      return 'bg-red-100 text-red-400';
    }
  };

  const shouldPulse = timeRemaining <= 10;

  return (
    <Badge
      className={cn(
        'font-bold text-xl px-4 py-2 rounded-lg transition-all flex items-center gap-2',
        getTimerColor(),
        shouldPulse && 'animate-pulse'
      )}
    >
      <Clock className="w-5 h-5" />
      <span>{timeRemaining}s</span>
    </Badge>
  );
}

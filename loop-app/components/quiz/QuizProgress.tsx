'use client';

import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      {/* Centered percentage above bar */}
      <div className="flex justify-center">
        <span className="text-xl text-terracotta-400 font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress
        value={progress}
        className="h-3 bg-cream-300"
      />
    </div>
  );
}

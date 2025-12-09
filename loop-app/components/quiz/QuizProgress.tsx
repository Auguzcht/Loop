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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge className="bg-terracotta-100 text-terracotta-400 font-medium text-sm px-4 py-1.5 rounded-full">
          Question {current + 1} of {total}
        </Badge>
        <span className="text-sm text-brown-400 font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress
        value={progress}
        className="h-2 bg-cream-300"
      />
    </div>
  );
}

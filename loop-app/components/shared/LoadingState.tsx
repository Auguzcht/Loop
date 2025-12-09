import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function LoadingState() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Progress header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-cream-300" />
          <Skeleton className="h-8 w-20 bg-cream-300 rounded-full" />
        </div>
        <Skeleton className="h-2 w-full bg-cream-300 rounded-full" />

        {/* Question card skeleton */}
        <Card className="p-10 bg-cream-100 border-2 border-cream-400">
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4 bg-cream-300" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 w-full bg-cream-300 rounded-xl" />
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-12 w-32 bg-cream-300 rounded-xl" />
          <Skeleton className="h-12 w-32 bg-cream-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

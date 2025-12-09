import { useEffect, useRef, useCallback } from 'react';

interface UseQuizTimerProps {
  isActive: boolean;
  timeRemaining: number;
  onTick: () => void;
  onTimeout: () => void;
}

/**
 * Hook for managing the quiz timer countdown
 * @param isActive - Whether the timer should be running
 * @param timeRemaining - Current time remaining in seconds
 * @param onTick - Callback called every second
 * @param onTimeout - Callback called when timer reaches 0
 */
export function useQuizTimer({
  isActive,
  timeRemaining,
  onTick,
  onTimeout,
}: UseQuizTimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) {
      cleanup();
      if (timeRemaining === 0 && isActive) {
        onTimeout();
      }
      return;
    }

    // Start the interval
    intervalRef.current = setInterval(() => {
      onTick();
    }, 1000);

    // Cleanup on unmount or when dependencies change
    return cleanup;
  }, [isActive, timeRemaining, onTick, onTimeout, cleanup]);

  return null;
}

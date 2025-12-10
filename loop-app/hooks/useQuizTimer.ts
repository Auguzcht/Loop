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
  const onTickRef = useRef(onTick);
  const onTimeoutRef = useRef(onTimeout);

  // Update refs to latest callbacks without triggering effect
  useEffect(() => {
    onTickRef.current = onTick;
    onTimeoutRef.current = onTimeout;
  }, [onTick, onTimeout]);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Don't restart timer if it's already running
    if (!isActive || timeRemaining <= 0) {
      cleanup();
      if (timeRemaining === 0 && isActive) {
        onTimeoutRef.current();
      }
      return;
    }

    // Only start interval if not already running
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        onTickRef.current();
      }, 1000);
    }

    // Cleanup on unmount
    return cleanup;
  }, [isActive, timeRemaining, cleanup]);

  return null;
}

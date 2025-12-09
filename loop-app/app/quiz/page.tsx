'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { useSounds } from '@/lib/sounds';

export default function QuizPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { fadeOutBackground, stopBackground } = useSounds();

  useEffect(() => {
    // Check if navigating from home page (not a direct load)
    const fromHome = typeof sessionStorage !== 'undefined' && 
      sessionStorage.getItem('navigatingToQuiz') === 'true';
    
    if (fromHome) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.removeItem('navigatingToQuiz');
        
        // Fade out and stop background music when quiz loads
        fadeOutBackground(500);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      // Direct load - ensure background music is stopped
      stopBackground();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <QuizContainer />
    </ErrorBoundary>
  );
}

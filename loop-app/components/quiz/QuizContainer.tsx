'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/hooks/useQuiz';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { useSounds } from '@/lib/sounds';
import { LoadingState } from '@/components/shared/LoadingState';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { QuizProgress } from './QuizProgress';
import { QuizTimer } from './QuizTimer';
import { QuestionCard } from './QuestionCard';
import { QuizNavigation } from './QuizNavigation';
import { CountdownOverlay } from './CountdownOverlay';
import { Badge } from '@/components/ui/badge';

export function QuizContainer() {
  const router = useRouter();
  const { playCountdown, playEnd, playTimer, stopTimer } = useSounds();
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const hasPlayedTimerWarning = useRef(false);
  const hasStartedTimer = useRef(false);
  const {
    state,
    startQuiz,
    setAnswer,
    nextQuestion,
    previousQuestion,
    tickTimer,
    submitQuizAnswers,
  } = useQuiz();

  // Load quiz on mount
  useEffect(() => {
    startQuiz();
    // DON'T stop background music here - let it fade out from QuizPage
    
    // Cleanup: stop timer when leaving quiz page
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show countdown overlay when quiz loads
  useEffect(() => {
    if (state.status === 'active' && !showCountdown && !countdownComplete) {
      setShowCountdown(true);
      playCountdown();
    }
  }, [state.status, showCountdown, countdownComplete, playCountdown]);

  // Handle timer (only start after countdown)
  useQuizTimer({
    isActive: state.status === 'active' && countdownComplete,
    timeRemaining: state.timeRemaining,
    onTick: tickTimer,
    onTimeout: () => {
      submitQuizAnswers();
    },
  });

  // Start timer sound when countdown completes (with slight delay to sync)
  useEffect(() => {
    if (state.status === 'active' && countdownComplete && !hasStartedTimer.current) {
      // Delay timer sound slightly to sync with visual timer
      setTimeout(() => {
        playTimer();
      }, 500);
      hasStartedTimer.current = true;
    }
  }, [state.status, countdownComplete, playTimer]);

  // Stop timer when quiz ends
  useEffect(() => {
    if (state.status === 'completed' || state.status === 'submitting') {
      stopTimer();
    }
  }, [state.status, stopTimer]);

  // Redirect to results when completed
  useEffect(() => {
    if (state.status === 'completed') {
      // Store results and questions in sessionStorage for the results page
      sessionStorage.setItem(
        'quizResults',
        JSON.stringify({
          score: state.score,
          total: state.total,
          results: state.results,
        })
      );
      sessionStorage.setItem(
        'quizQuestions',
        JSON.stringify(state.questions)
      );
      
      // Longer delay before navigating to results page (2.5 seconds for better UX)
      setTimeout(() => {
        router.push('/results');
      }, 2500);
    }
  }, [state.status, state.score, state.total, state.results, state.questions, router]);

  // Loading state
  if (state.status === 'loading') {
    return <LoadingState />;
  }

  // Error state
  if (state.status === 'error') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-900 font-medium">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {state.error || 'An error occurred'}
            </AlertDescription>
          </Alert>
          <div className="flex gap-3">
            <Button
              onClick={() => startQuiz()}
              className="flex-1 bg-terracotta-300 hover:bg-terracotta-400 text-white"
            >
              Try Again
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="flex-1 bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Submitting state - Show until navigation happens
  if (state.status === 'submitting' || state.status === 'completed') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-terracotta-300 border-t-transparent" />
          <p className="text-xl font-medium text-brown-500">
            Grading your answers...
          </p>
        </div>
      </div>
    );
  }

  // Active quiz state
  if (state.status === 'active' && state.questions.length > 0) {
    const currentQuestion = state.questions[state.currentIndex];
    const currentAnswer = state.answers.get(currentQuestion.id);
    const isLastQuestion = state.currentIndex === state.questions.length - 1;
    return (
      <div className="min-h-screen bg-cream-50 pb-32">
        {/* Countdown overlay */}
        <AnimatePresence>
          {showCountdown && (
            <CountdownOverlay
              onComplete={() => {
                setShowCountdown(false);
                setCountdownComplete(true);
              }}
            />
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto py-8 px-4 space-y-8"
        >
          {/* Header with progress and timer */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Question badge and timer */}
            <div className="flex items-center justify-between">
              <Badge className="bg-terracotta-100 text-terracotta-400 font-medium text-base px-5 py-2 rounded-full">
                Question {state.currentIndex + 1} of {state.questions.length}
              </Badge>
              <QuizTimer timeRemaining={state.timeRemaining} />
            </div>
            
            {/* Progress bar with centered percentage */}
            <QuizProgress
              current={state.currentIndex}
              total={state.questions.length}
            />
          </motion.div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <QuestionCard
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={setAnswer}
            />
          </AnimatePresence>
        </motion.div>

        {/* Fixed bottom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="fixed bottom-0 left-0 right-0 bg-cream-50 border-t-2 border-cream-300 shadow-lg"
        >
          <div className="max-w-4xl mx-auto px-4 py-6">
            <QuizNavigation
              currentIndex={state.currentIndex}
              totalQuestions={state.questions.length}
              onPrevious={previousQuestion}
              onNext={nextQuestion}
              onSubmit={submitQuizAnswers}
              isLastQuestion={isLastQuestion}
              canGoBack={state.currentIndex > 0}
              canGoForward={state.currentIndex < state.questions.length - 1}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

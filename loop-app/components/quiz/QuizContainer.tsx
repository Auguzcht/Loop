'use client';

import { useEffect, useRef } from 'react';
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

export function QuizContainer() {
  const router = useRouter();
  const { playCountdown, playEnd, playTimer, stopBackground } = useSounds();
  const hasPlayedCountdown = useRef(false);
  const hasPlayedTimerWarning = useRef(false);
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
    stopBackground(); // Stop landing page music
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play countdown sound when quiz becomes active
  useEffect(() => {
    if (state.status === 'active' && !hasPlayedCountdown.current) {
      playCountdown();
      hasPlayedCountdown.current = true;
    }
  }, [state.status, playCountdown]);

  // Handle timer
  useQuizTimer({
    isActive: state.status === 'active',
    timeRemaining: state.timeRemaining,
    onTick: tickTimer,
    onTimeout: () => {
      submitQuizAnswers();
    },
  });

  // Play timer warning sound when < 10 seconds
  useEffect(() => {
    if (state.status === 'active' && state.timeRemaining === 10 && !hasPlayedTimerWarning.current) {
      playTimer();
      hasPlayedTimerWarning.current = true;
    }
  }, [state.timeRemaining, state.status, playTimer]);

  // Redirect to results when completed
  useEffect(() => {
    if (state.status === 'completed') {
      playEnd();
      // Store results in sessionStorage for the results page
      sessionStorage.setItem(
        'quizResults',
        JSON.stringify({
          score: state.score,
          total: state.total,
          results: state.results,
        })
      );
      router.push('/results');
    }
  }, [state.status, state.score, state.total, state.results, router, playEnd]);

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

  // Submitting state
  if (state.status === 'submitting') {
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
      <div className="min-h-screen bg-cream-50 py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header with progress and timer */}
          <div className="flex items-center justify-between">
            <QuizProgress
              current={state.currentIndex}
              total={state.questions.length}
            />
            <QuizTimer timeRemaining={state.timeRemaining} />
          </div>

          {/* Question card */}
          <QuestionCard
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={setAnswer}
          />

          {/* Navigation */}
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
      </div>
    );
  }

  return null;
}

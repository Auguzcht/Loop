'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { QuizContainer } from '@/components/quiz/QuizContainer';

export default function QuizPage() {
  return (
    <ErrorBoundary>
      <QuizContainer />
    </ErrorBoundary>
  );
}

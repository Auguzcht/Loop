'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
  canGoBack,
  canGoForward,
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <Button
        onClick={onPrevious}
        disabled={!canGoBack}
        variant="outline"
        className="bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400 px-6 py-6 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Previous
      </Button>

      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-6 rounded-xl font-medium transition-all hover:shadow-lg"
        >
          Submit Quiz
          <Send className="w-5 h-5 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canGoForward}
          className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-6 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Question
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}

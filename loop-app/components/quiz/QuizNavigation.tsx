'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useSounds } from '@/lib/sounds';

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
  const { playPageClick } = useSounds();

  const handlePrevious = () => {
    playPageClick();
    onPrevious();
  };

  const handleNext = () => {
    playPageClick();
    onNext();
  };

  const handleSubmit = () => {
    playPageClick();
    onSubmit();
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        onClick={handlePrevious}
        disabled={!canGoBack}
        variant="outline"
        className="bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400 px-8 py-7 rounded-xl font-medium text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Previous
      </Button>

      {/* Center indicator */}
      <div className="flex-1 flex items-center justify-center gap-2">
        <div className="flex gap-1.5">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-terracotta-400'
                  : index < currentIndex
                  ? 'w-2 bg-terracotta-300'
                  : 'w-2 bg-cream-400'
              }`}
            />
          ))}
        </div>
      </div>

      {isLastQuestion ? (
        <Button
          onClick={handleSubmit}
          className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-7 rounded-xl font-medium text-lg transition-all hover:shadow-lg hover:scale-105"
        >
          Submit Quiz
          <Send className="w-5 h-5 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={handleNext}
          disabled={!canGoForward}
          className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-7 rounded-xl font-medium text-lg transition-all hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}

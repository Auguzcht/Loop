'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import type { QuestionResult } from '@/types/quiz';

interface FlashcardCarouselProps {
  results: QuestionResult[];
  questions: any[]; // We'll need to pass the actual questions
  isInView: boolean;
}

export function FlashcardCarousel({ results, questions, isInView }: FlashcardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentResult = results[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const getCorrectAnswer = () => {
    if (!currentQuestion) return 'Loading...';
    
    if (currentQuestion.type === 'radio' || currentQuestion.type === 'text') {
      const correctOption = currentQuestion.options?.find((opt: any) => opt.correct);
      return correctOption?.text || currentQuestion.correctAnswer || 'N/A';
    } else if (currentQuestion.type === 'checkbox') {
      const correctOptions = currentQuestion.options?.filter((opt: any) => opt.correct);
      return correctOptions?.map((opt: any) => opt.text).join(', ') || 'N/A';
    }
    return 'N/A';
  };

  if (!questions.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Flashcard */}
      <div className="relative h-[400px] perspective-1000">
        <motion.div
          className="w-full h-full cursor-pointer"
          onClick={handleFlip}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Front of card */}
          <Card
            className={`absolute inset-0 border-2 backface-hidden ${
              currentResult?.correct ? 'border-sage-300' : 'border-red-300'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-8 space-y-6">
              {/* Question Number & Status */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-brown-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                {currentResult?.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-sage-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>

              {/* Question Text */}
              <p className="text-2xl font-medium text-brown-500 text-center">
                {currentQuestion?.question}
              </p>

              {/* Flip Hint */}
              <p className="text-sm text-brown-400 italic">
                Click to reveal answer
              </p>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card
            className={`absolute inset-0 border-2 backface-hidden ${
              currentResult?.correct ? 'border-sage-300 bg-sage-50' : 'border-red-300 bg-red-50'
            }`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-8 space-y-6">
              {/* Status Badge */}
              <div className={`px-4 py-2 rounded-full ${
                currentResult?.correct ? 'bg-sage-100 text-sage-400' : 'bg-red-100 text-red-400'
              }`}>
                <span className="font-medium">
                  {currentResult?.correct ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>

              {/* Correct Answer */}
              <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-brown-400">Correct Answer:</p>
                <p className="text-xl font-medium text-brown-500">
                  {getCorrectAnswer()}
                </p>
              </div>

              {/* Question Type */}
              <p className="text-xs text-brown-400 uppercase tracking-wide">
                {currentQuestion?.type} Question
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrev}
          variant="outline"
          className="bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400"
          disabled={questions.length <= 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsFlipped(false);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-terracotta-400' : 'w-2 bg-cream-400'
              }`}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          variant="outline"
          className="bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400"
          disabled={questions.length <= 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

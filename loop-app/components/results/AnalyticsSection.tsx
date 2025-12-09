'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ArrowUp } from 'lucide-react';
import { TimeChart } from './TimeChart';
import { QuestionGrid } from './QuestionGrid';
import { SummaryStats } from './SummaryStats';
import { FlashcardCarousel } from './FlashcardCarousel';
import type { QuestionResult } from '@/types/quiz';

interface AnalyticsSectionProps {
  results: QuestionResult[];
  questions?: any[]; // Optional questions array for flashcards
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  isInView: boolean;
}

export const AnalyticsSection = forwardRef<HTMLDivElement, AnalyticsSectionProps>(
  ({ results, questions = [], correctCount, incorrectCount, percentage, isInView }, ref) => {
    console.log('AnalyticsSection rendering:', { isInView, resultsCount: results.length, questionsCount: questions.length });
    
    return (
      <div ref={ref} className="py-12 px-4 relative bg-cream-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-12 pb-12"
        >
          {/* Analytics Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-8 h-8 text-terracotta-400" />
              <h2 className="text-3xl font-medium text-brown-500">
                Performance Analytics
              </h2>
            </div>
            <p className="text-brown-400">
              Detailed breakdown of your quiz results
            </p>
          </motion.div>

          {/* Summary Stats - Show percentage here */}
          <SummaryStats
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            percentage={percentage}
            isInView={isInView}
          />

          {/* Time Chart */}
          <TimeChart
            results={results}
            questions={questions}
            isInView={isInView}
          />

          {/* Flashcard Carousel - Review Questions */}
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
            >
              <div className="text-center mb-6 space-y-2">
                <h3 className="text-2xl font-medium text-brown-500">Review Questions</h3>
                <p className="text-sm text-brown-400">Click cards to reveal answers</p>
              </div>
              <FlashcardCarousel 
                results={results} 
                questions={questions}
                isInView={isInView}
              />
            </motion.div>
          )}

          {/* Question Grid */}
          <QuestionGrid 
            results={results} 
            questions={questions}
            isInView={isInView} 
          />

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center pt-8"
          >
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-terracotta-300 hover:bg-terracotta-400 text-white border-2 border-terracotta-400 px-8 py-4 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 shadow-lg"
            >
              <ArrowUp className="w-5 h-5" />
              Back to Top
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }
);

AnalyticsSection.displayName = 'AnalyticsSection';

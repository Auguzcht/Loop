'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { ResultsCard } from '@/components/results/ResultsCard';
import { ResultsActions } from '@/components/results/ResultsActions';
import { ScrollIndicator } from '@/components/results/ScrollIndicator';
import { DynamicGradient } from '@/components/results/DynamicGradient';
import { AnalyticsSection } from '@/components/results/AnalyticsSection';
import { useSounds } from '@/lib/sounds';
import type { QuestionResult } from '@/types/quiz';

interface QuizResults {
  score: number;
  total: number;
  results: QuestionResult[];
}

export default function ResultsPage() {
  const router = useRouter();
  const { playEnd } = useSounds();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [hasPlayedEndSound, setHasPlayedEndSound] = useState(false);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const isAnalyticsInView = useInView(analyticsRef, { once: false, margin: "0px" });

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults');
    const storedQuestions = sessionStorage.getItem('quizQuestions');
    
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      // No results found, redirect to home
      router.push('/');
    }

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, [router]);

  // Separate effect for playing end sound - runs once when results are available
  useEffect(() => {
    if (results && !hasPlayedEndSound) {
      const timer = setTimeout(() => {
        playEnd();
        setHasPlayedEndSound(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [results, hasPlayedEndSound, playEnd]);

  if (!results) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta-300 border-t-transparent" />
      </div>
    );
  }

  const percentage = Math.round((results.score / results.total) * 100);
  const passed = percentage >= 70;
  const correctCount = results.results.filter(r => r.correct).length;
  const incorrectCount = results.results.filter(r => r.correct === false).length;
  const scrollToAnalytics = () => {
    setShowAnalytics(true);
    // Immediately scroll to analytics
    setTimeout(() => {
      window.scrollTo({ 
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="bg-cream-50 relative min-h-screen">
      {/* Results Section - Full viewport, no scroll initially */}
      <div className={`h-screen flex flex-col items-center justify-center px-4 relative ${!showAnalytics ? 'overflow-hidden' : ''}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto w-full space-y-5"
        >
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Logo size="md" />
          </motion.div>

          {/* Results Card */}
          <ResultsCard
            score={results.score}
            total={results.total}
            percentage={percentage}
            passed={passed}
          />

          {/* Actions */}
          <ResultsActions />
        </motion.div>

        {/* Dynamic Gradient at Bottom - Only when analytics hidden */}
        <AnimatePresence>
          {!showAnalytics && <DynamicGradient isVisible={!showAnalytics} />}
        </AnimatePresence>

        {/* Scroll Down Indicator - Positioned at bottom of results section */}
        <AnimatePresence>
          {!showAnalytics && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-8 z-30"
            >
              <ScrollIndicator onClick={scrollToAnalytics} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Analytics Section - Only visible after clicking scroll indicator */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-cream-50"
          >
            <div className="bg-cream-50">
              <AnalyticsSection
                ref={analyticsRef}
                results={results.results}
                questions={questions}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
                percentage={percentage}
                isInView={isAnalyticsInView}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
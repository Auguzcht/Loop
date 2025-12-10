'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCw, Home } from 'lucide-react';
import { clearQuizSession } from '@/lib/api';

export function ResultsActions() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleTryAgain = () => {
    if (isNavigating) return; // Prevent double clicks
    
    clearQuizSession();
    setIsNavigating(true);
    
    // Set navigation flag
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('navigatingToQuiz', 'true');
    }
    
    setTimeout(() => {
      router.push('/quiz');
    }, 100);
  };

  const handleGoHome = () => {
    if (isNavigating) return; // Prevent double clicks
    
    setIsNavigating(true);
    
    // Set navigation flag
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('navigatingToHome', 'true');
    }
    
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <Button 
        onClick={handleTryAgain}
        disabled={isNavigating}
        className="flex-1 bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-6 rounded-xl font-medium transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RotateCw className="w-5 h-5 mr-2" />
        Try Again
      </Button>
      <Button
        onClick={handleGoHome}
        disabled={isNavigating}
        variant="outline"
        className="flex-1 bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400 px-8 py-6 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Home className="w-5 h-5 mr-2" />
        Go Home
      </Button>
    </motion.div>
  );
}

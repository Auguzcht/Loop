'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo, Tagline } from '@/components/shared/Logo';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { ArrowRight, Clock, ListChecks, Trophy } from 'lucide-react';
import { useSounds } from '@/lib/sounds';
import { Particles } from '@/components/ui/particles';
import { Magnetic } from '@/components/ui/shadcn-io/magnetic';

export default function Home() {
  const { playBackground, stopBackground } = useSounds();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this is a hard refresh (navigation type is reload)
    const isHardRefresh = typeof performance !== 'undefined' && 
      (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    
    if (isHardRefresh) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Play background music when landing page loads
    // Use a slight delay to ensure audio context is ready
    const musicTimer = setTimeout(() => {
      playBackground();
    }, 100);

    // DON'T stop when component unmounts - let it play through loading screen
    return () => {
      clearTimeout(musicTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-cream-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Particles background */}
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color="#D4845C"
        size={0.8}
        refresh
      />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl text-center space-y-12"
      >
        {/* Logo and Tagline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <Logo size="xxl" />
          </div>
          <Tagline />
        </motion.div>

        {/* Welcome Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-brown-500">
            Test Your Knowledge
          </h2>
          <p className="text-xl text-brown-400 max-w-2xl mx-auto leading-relaxed">
            12 questions • 60 seconds • Instant results
          </p>
        </motion.div>

        {/* Features - Compact inline design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 text-brown-400"
        >
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-terracotta-400" />
            <span className="text-sm font-medium">Mixed Question Types</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-terracotta-400" />
            <span className="text-sm font-medium">Timed Challenge</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-terracotta-400" />
            <span className="text-sm font-medium">Track Your Score</span>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link href="/quiz">
            <Magnetic strength={0.3} range={200}>
              <Button 
                onClick={() => {
                  // Don't restart music, just set navigation flag
                  if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem('navigatingToQuiz', 'true');
                  }
                }}
                className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-16 py-8 rounded-2xl text-xl font-medium transition-all hover:shadow-2xl hover:shadow-terracotta-200/50 hover:scale-105"
              >
                Start Quiz
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Magnetic>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo, Tagline } from '@/components/shared/Logo';
import { ArrowRight, Clock, ListChecks, Trophy } from 'lucide-react';
import { useSounds } from '@/lib/sounds';

export default function Home() {
  const { playBackground, stopBackground } = useSounds();

  useEffect(() => {
    // Play background music when landing page loads
    playBackground();

    // Stop when component unmounts
    return () => {
      stopBackground();
    };
  }, [playBackground, stopBackground]);
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center space-y-12"
      >
        {/* Logo and Tagline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <Tagline />
        </motion.div>

        {/* Welcome Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-medium text-brown-500">
            Test Your Knowledge
          </h2>
          <p className="text-lg text-brown-400 max-w-xl mx-auto leading-relaxed">
            Challenge yourself with 12 questions covering web development,
            programming, and technology. You'll have 60 seconds to complete the quiz.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mx-auto">
              <ListChecks className="w-6 h-6 text-terracotta-400" />
            </div>
            <h3 className="font-medium text-brown-500">12 Questions</h3>
            <p className="text-sm text-brown-400">
              Multiple choice, checkboxes, and text answers
            </p>
          </div>

          <div className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-terracotta-400" />
            </div>
            <h3 className="font-medium text-brown-500">60 Seconds</h3>
            <p className="text-sm text-brown-400">
              Beat the clock and test your speed
            </p>
          </div>

          <div className="bg-cream-100 border-2 border-cream-400 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mx-auto">
              <Trophy className="w-6 h-6 text-terracotta-400" />
            </div>
            <h3 className="font-medium text-brown-500">Instant Results</h3>
            <p className="text-sm text-brown-400">
              See your score immediately after
            </p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link href="/quiz">
            <Button 
              onClick={() => playBackground()}
              className="bg-terracotta-300 hover:bg-terracotta-400 text-white px-12 py-7 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:scale-105"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-brown-300 space-y-2"
        >
          <p>• Answer all questions before time runs out</p>
          <p>• You can navigate between questions</p>
          <p>• Submit your answers when you're ready</p>
        </motion.div>
      </motion.main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownOverlayProps {
  onComplete: () => void;
}

export function CountdownOverlay({ onComplete }: CountdownOverlayProps) {
  const [count, setCount] = useState<number | string>(3);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Countdown sequence: 3, 2, 1, GO! - adjusted timing to match 3-second sound
    const timings = [
      { delay: 100, value: 3 },
      { delay: 800, value: 2 },
      { delay: 1700, value: 1 },
      { delay: 2700, value: 'GO!' },
    ];

    const timeouts = timings.map(({ delay, value }) =>
      setTimeout(() => setCount(value), delay)
    );

    // Hide overlay and trigger completion after sound finishes with smooth fade
    const completeTimeout = setTimeout(() => {
      setIsVisible(false);
      // Delay onComplete to let exit animation finish
      setTimeout(() => onComplete(), 300);
    }, 3500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brown-500/90 backdrop-blur-sm"
    >
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1] // Spring easing
            }}
            className={`text-9xl font-bold ${
              count === 'GO!' 
                ? 'text-terracotta-300' 
                : 'text-cream-50'
            }`}
          >
            {count}
          </motion.div>
        </AnimatePresence>
        {count !== 'GO!' && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-2xl text-cream-100 font-medium"
          >
            Get ready...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

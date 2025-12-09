'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryStatsProps {
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  isInView: boolean;
}

export function SummaryStats({ correctCount, incorrectCount, percentage, isInView }: SummaryStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="border-2 border-cream-400 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center min-h-[140px]">
            <motion.p 
              className="text-4xl font-bold text-sage-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              {correctCount}
            </motion.p>
            <p className="text-sm text-brown-400 mt-2">Correct Answers</p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="border-2 border-cream-400 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center min-h-[140px]">
            <motion.p 
              className="text-4xl font-bold text-red-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {incorrectCount}
            </motion.p>
            <p className="text-sm text-brown-400 mt-2">Incorrect Answers</p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="border-2 border-terracotta-300 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-terracotta-50">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center min-h-[140px]">
            <motion.p 
              className="text-5xl font-bold text-terracotta-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              {percentage}%
            </motion.p>
            <p className="text-sm text-brown-400 mt-2 font-medium">Accuracy Rate</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

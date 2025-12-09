'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

interface ResultsCardProps {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
}

export function ResultsCard({ score, total, percentage, passed }: ResultsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="bg-cream-100 border-2 border-cream-400 rounded-2xl">
        <CardContent className="p-10 text-center space-y-6">
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
              passed ? 'bg-sage-100' : 'bg-amber-100'
            }`}
          >
            <Trophy
              className={`w-10 h-10 ${passed ? 'text-sage-400' : 'text-amber-600'}`}
            />
          </motion.div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-medium text-brown-500">
              Quiz Complete!
            </h1>
            <p className="text-lg text-brown-400">
              Here's how you performed
            </p>
          </div>

          {/* Score */}
          <div className="space-y-3">
            <Badge className="bg-sage-100 text-sage-400 font-bold text-3xl px-8 py-3 rounded-xl">
              {score} / {total}
            </Badge>
          </div>

          {/* Message */}
          <div className="pt-4">
            {percentage >= 90 && (
              <p className="text-lg text-sage-400 font-medium">
                🎉 Outstanding! You're a true expert!
              </p>
            )}
            {percentage >= 70 && percentage < 90 && (
              <p className="text-lg text-sage-400 font-medium">
                ✨ Great job! You passed with flying colors!
              </p>
            )}
            {percentage >= 50 && percentage < 70 && (
              <p className="text-lg text-amber-600 font-medium">
                📚 Good effort! A bit more practice and you'll ace it!
              </p>
            )}
            {percentage < 50 && (
              <p className="text-lg text-brown-400 font-medium">
                💪 Keep learning! Try again to improve your score!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

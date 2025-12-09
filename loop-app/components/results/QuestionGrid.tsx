'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Target } from 'lucide-react';
import type { QuestionResult } from '@/types/quiz';

interface QuestionGridProps {
  results: QuestionResult[];
  isInView: boolean;
}

export function QuestionGrid({ results, isInView }: QuestionGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
    >
      <Card className="border-2 border-cream-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-brown-500 flex items-center gap-2">
            <Target className="w-5 h-5 text-terracotta-400" />
            Question-by-Question Results
          </CardTitle>
          <CardDescription>Individual performance on each question</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-3">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.03, duration: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className={`flex flex-col items-center justify-center aspect-square rounded-lg font-medium cursor-pointer ${
                  result.correct
                    ? 'bg-sage-100 text-sage-400'
                    : 'bg-red-100 text-red-400'
                }`}
                title={`Question ${index + 1}: ${result.correct ? 'Correct' : 'Incorrect'}`}
              >
                {result.correct ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="text-xs mt-1">Q{index + 1}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

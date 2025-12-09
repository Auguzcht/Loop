'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';
import type { QuestionResult } from '@/types/quiz';

interface TimeChartProps {
  results: QuestionResult[];
  isInView: boolean;
}

export function TimeChart({ results, isInView }: TimeChartProps) {
  // Prepare data for the chart
  const chartData = results
    .map((result, index) => ({
      question: `Q${index + 1}`,
      time: result.timeSpent ? Math.round(result.timeSpent / 1000) : 0, // Convert to seconds
      correct: result.correct,
    }))
    .filter(item => item.time > 0); // Only show questions with time data

  // If no time data, show message
  if (chartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      >
        <Card className="border-2 border-cream-400 bg-cream-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brown-500">
              <Clock className="w-5 h-5" />
              Time Per Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-brown-400 text-center py-8">
              No timing data available for this quiz
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Calculate max time for scaling
  const maxTime = Math.max(...chartData.map(d => d.time));

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="border-2 border-cream-400 bg-cream-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brown-500">
            <Clock className="w-5 h-5" />
            Time Per Question
          </CardTitle>
          <p className="text-sm text-brown-400 mt-1">
            Time taken to answer each question (in seconds)
          </p>
        </CardHeader>
        <CardContent className="w-full">
          <div className="w-full overflow-x-auto">
            <BarChart
              data={chartData}
              width={Math.max(600, chartData.length * 60)} // Dynamic width based on question count
              height={300}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5D5C3" />
              <XAxis 
                dataKey="question" 
                stroke="#8B7355"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#8B7355"
                style={{ fontSize: '12px', fontWeight: 500 }}
                label={{ value: 'Seconds', angle: -90, position: 'insideLeft', style: { fill: '#8B7355' } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FAF8F5',
                  border: '2px solid #E5D5C3',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#5C4A3A', fontWeight: 600 }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}s`,
                  props.payload.correct ? 'Correct Answer' : 'Incorrect Answer'
                ]}
              />
              <Bar dataKey="time" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.correct ? '#90B494' : '#E07B7B'}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

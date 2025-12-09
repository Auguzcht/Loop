'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

interface PerformanceChartProps {
  correctCount: number;
  incorrectCount: number;
  isInView: boolean;
}

export function PerformanceChart({ correctCount, incorrectCount, isInView }: PerformanceChartProps) {
  const performanceData = [
    { name: 'Correct', value: correctCount, fill: '#7BA862' },
    { name: 'Incorrect', value: incorrectCount, fill: '#EF4444' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
    >
      <Card className="border-2 border-cream-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-brown-500">Answer Distribution</CardTitle>
          <CardDescription>Overview of correct vs incorrect answers</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              correct: {
                label: "Correct",
                color: "#7BA862",
              },
              incorrect: {
                label: "Incorrect",
                color: "#EF4444",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={performanceData} layout="vertical" width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E1D8" />
              <XAxis type="number" stroke="#78716C" />
              <YAxis dataKey="name" type="category" stroke="#78716C" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={8}>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

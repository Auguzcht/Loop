'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RotateCw, Home } from 'lucide-react';

export function ResultsActions() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <Link href="/quiz" className="flex-1">
        <Button className="w-full bg-terracotta-300 hover:bg-terracotta-400 text-white px-8 py-6 rounded-xl font-medium transition-all hover:shadow-lg hover:scale-105">
          <RotateCw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </Link>
      <Link href="/" className="flex-1">
        <Button
          variant="outline"
          className="w-full bg-cream-200 hover:bg-cream-300 text-brown-500 border-2 border-cream-400 px-8 py-6 rounded-xl font-medium transition-all hover:scale-105"
        >
          <Home className="w-5 h-5 mr-2" />
          Go Home
        </Button>
      </Link>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick: () => void;
}

export function ScrollIndicator({ onClick }: ScrollIndicatorProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 text-brown-400 hover:text-terracotta-400 transition-all duration-300 cursor-pointer group"
    >
      <motion.span 
        className="text-sm font-medium"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        View Analytics
      </motion.span>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <ChevronDown className="w-7 h-7" />
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-7 h-7 blur-sm" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}

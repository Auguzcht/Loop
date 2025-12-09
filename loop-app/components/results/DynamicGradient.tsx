'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DynamicGradientProps {
  isVisible: boolean;
}

export function DynamicGradient({ isVisible }: DynamicGradientProps) {
  const [mouseY, setMouseY] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isVisible) {
        const rect = containerRef.current.getBoundingClientRect();
        const distanceFromBottom = window.innerHeight - e.clientY;
        setMouseY(distanceFromBottom);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  if (!isVisible) return null;

  // Calculate opacity based on mouse proximity to bottom (0 to 1)
  // Closer to bottom (mouseY small) = lighter/more transparent
  // Far from bottom (mouseY large) = darker/more opaque
  const maxDistance = 400;
  const normalizedDistance = Math.min(mouseY / maxDistance, 1);
  
  // Start dark (0.7), get lighter as mouse approaches (0.1)
  const gradientOpacity = 0.1 + (normalizedDistance * 0.6);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
      style={{
        background: `linear-gradient(to top, 
          rgba(198, 119, 80, ${gradientOpacity * 0.5}),
          rgba(212, 132, 92, ${gradientOpacity * 0.35}),
          rgba(232, 182, 154, ${gradientOpacity * 0.2}),
          rgba(249, 232, 224, ${gradientOpacity * 0.1}),
          transparent)`
      }}
    />
  );
}

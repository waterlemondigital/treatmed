import React from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 24, x: 0 };
      case 'down': return { y: -24, x: 0 };
      case 'left': return { x: 28, y: 0 };
      case 'right': return { x: -28, y: 0 };
      case 'none': return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // smooth custom cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

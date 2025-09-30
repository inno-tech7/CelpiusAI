'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionContextType {
  isTransitioning: boolean;
  showTransition: () => void;
  hideTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const showTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const hideTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, showTransition, hideTransition }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 z-[9999] h-full w-full bg-white"
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

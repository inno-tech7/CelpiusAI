'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface ErrorModalProps {
  title: string;
  description: string;
  onClose: () => void;
}

export function ErrorModal({ title, description, onClose }: ErrorModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[17px]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-48%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-48%' }}
          transition={{ duration: 0.2 }}
          className="glass-card-error fixed left-[50%] top-[50%] w-full max-w-md rounded-2xl border border-red-500/20 bg-red-900/30 p-8 text-white shadow-2xl shadow-red-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/50 bg-red-500/10 text-red-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-red-400">{title}</h2>
            <p className="mt-2 text-red-200/80">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-red-200/50 transition-colors hover:bg-red-500/20 hover:text-red-200"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

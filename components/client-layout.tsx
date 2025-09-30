'use client';

import type React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { TransitionProvider } from '@/components/transition-provider';
import { ModalProvider } from '@/components/modal-provider';
import { Toaster } from '@/components/ui/toaster';
import { ScrollManager } from '@/components/scroll-manager';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ScrollManager />
      <ModalProvider>
        <TransitionProvider>
          <AuthProvider>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
            <Toaster />
          </AuthProvider>
        </TransitionProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

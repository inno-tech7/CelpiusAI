'use client';

import type React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { ErrorModal } from './ui/error-modal';

interface ModalContextType {
  showModal: (title: string, description: string) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<{ title: string; description: string } | null>(
    null
  );

  const showModal = useCallback((title: string, description: string) => {
    setModalContent({ title, description });
  }, []);

  const hideModal = useCallback(() => {
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <ErrorModal
          title={modalContent.title}
          description={modalContent.description}
          onClose={hideModal}
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

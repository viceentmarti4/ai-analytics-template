'use client';

import { ReactNode } from 'react';
import { useTinybirdToken } from '@/providers/TinybirdProvider';
import { useModal } from '../context/ModalContext';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import CostPredictionModal from './CostPredictionModal';

interface RootLayoutContentProps {
  children: ReactNode;
  initialToken: string;
  initialOrgName: string;
}

export function RootLayoutContent({ children, initialToken, initialOrgName }: RootLayoutContentProps) {
  const { setToken, setOrgName } = useTinybirdToken();

  // Set the initial values from the server
  setToken(initialToken);
  setOrgName(initialOrgName);

  return (
    <>
      {children}
      <ModalController filters={{}} />
    </>
  );
}

function ModalController({ filters }: { filters: Record<string, string> }) {
  const { isCostPredictionOpen, openCostPrediction, closeCostPrediction } = useModal();

  useKeyboardShortcut('k', () => {
    if (!isCostPredictionOpen) {
      openCostPrediction();
    }
  }, true);

  return (
    <CostPredictionModal
      isOpen={isCostPredictionOpen}
      onClose={closeCostPrediction}
      currentFilters={filters}
    />
  );
} 
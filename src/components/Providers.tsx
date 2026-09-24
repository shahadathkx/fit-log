'use client';

import React from 'react';
import { PlanProvider } from '@/context/PlanContext';
import { Toaster } from 'react-hot-toast';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PlanProvider>
      {children}
      <Toaster position="bottom-right" />
    </PlanProvider>
  );
};

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '@/lib/data';
import toast from 'react-hot-toast';

interface PlanContextType {
  plannedWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [plannedWorkouts, setPlannedWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localPlanned = localStorage.getItem('fitlog_planned');
    const localSaved = localStorage.getItem('fitlog_saved');
    if (localPlanned) setPlannedWorkouts(JSON.parse(localPlanned));
    if (localSaved) setSavedWorkouts(JSON.parse(localSaved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_planned', JSON.stringify(plannedWorkouts));
    }
  }, [plannedWorkouts, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (plannedWorkouts.find(w => w.id === workout.id)) {
      toast('Already in today\'s plan!', { icon: 'ℹ️', style: { background: '#333', color: '#fff' } });
      return;
    }
    setPlannedWorkouts(prev => [...prev, workout]);
    toast.success('Added to today\'s plan!', {
      style: { background: '#ccff00', color: '#000', fontWeight: 'bold' },
      iconTheme: { primary: '#000', secondary: '#ccff00' }
    });
  };

  const saveForLater = (workout: Workout) => {
    if (savedWorkouts.find(w => w.id === workout.id)) {
      toast('Already saved for later!', { icon: 'ℹ️', style: { background: '#333', color: '#fff' } });
      return;
    }
    setSavedWorkouts(prev => [...prev, workout]);
    toast.success('Saved for later!', {
      style: { background: '#333', color: '#fff', border: '1px solid #444' },
      iconTheme: { primary: '#ccff00', secondary: '#000' }
    });
  };

  const removeFromPlan = (id: string) => {
    setPlannedWorkouts(prev => prev.filter(w => w.id !== id));
    toast('Removed from plan', { icon: '🗑️', style: { background: '#333', color: '#fff' } });
  };

  const removeFromSaved = (id: string) => {
    setSavedWorkouts(prev => prev.filter(w => w.id !== id));
    toast('Removed from saved', { icon: '🗑️', style: { background: '#333', color: '#fff' } });
  };

  return (
    <PlanContext.Provider value={{ plannedWorkouts, savedWorkouts, addToPlan, saveForLater, removeFromPlan, removeFromSaved }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

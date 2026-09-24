'use client';

import React from 'react';
import { Calendar, Bookmark } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';
import { Workout } from '@/lib/data';

export const WorkoutButtons = ({ workout }: { workout: Workout }) => {
  const { addToPlan, saveForLater } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
      <button 
        onClick={() => addToPlan(workout)}
        className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#d4ff33] text-black font-bold py-4 px-6 rounded-xl transition-colors"
      >
        <Calendar className="w-5 h-5" />
        Add to today's plan
      </button>
      <button 
        onClick={() => saveForLater(workout)}
        className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-neutral-700 hover:border-neutral-500 hover:text-white text-neutral-300 font-bold py-4 px-6 rounded-xl transition-colors"
      >
        <Bookmark className="w-5 h-5" />
        Save for later
      </button>
    </div>
  );
};

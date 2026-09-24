'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Clock, Flame, Star, ChevronDown, Check, X } from 'lucide-react';

function MyPlanContent() {
  const { plannedWorkouts, savedWorkouts, removeFromPlan, removeFromSaved } = usePlan();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(initialTab);
  const [sortBy, setSortBy] = useState<'Duration' | 'Calories' | 'Rating'>('Duration');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sortOptions: ('Duration' | 'Calories' | 'Rating')[] = ['Duration', 'Calories', 'Rating'];

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'saved') setActiveTab('saved');
    else setActiveTab('plan');
  }, [searchParams]);

  const activeWorkouts = activeTab === 'plan' ? plannedWorkouts : savedWorkouts;

  const sortedWorkouts = React.useMemo(() => {
    return [...activeWorkouts].sort((a, b) => {
      if (sortBy === 'Duration') {
        return b.duration - a.duration; // descending
      } else if (sortBy === 'Calories') {
        // @ts-ignore
        return (b.calories || b.caloriesBurned || 0) - (a.calories || a.caloriesBurned || 0); // descending
      } else if (sortBy === 'Rating') {
        return b.rating - a.rating; // descending
      }
      return 0;
    });
  }, [activeWorkouts, sortBy]);

  const totalExercises = plannedWorkouts.length;
  const totalMinutes = plannedWorkouts.reduce((acc, w) => acc + w.duration, 0);
  const totalCalories = plannedWorkouts.reduce((acc, w) => acc + w.calories, 0);

  const handleRemove = (id: string) => {
    if (activeTab === 'plan') removeFromPlan(id);
    else removeFromSaved(id);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-white text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-oswald)] leading-none">
          MY PLAN
        </h1>
        <p className="text-neutral-400 mt-2 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#111214] rounded-2xl border border-[#1e1f24] mb-8 overflow-hidden">
        <div className="flex divide-x divide-[#1e1f24]">
          <div className="flex-1 px-8 py-6">
            <div className="text-neutral-500 text-[10px] font-bold tracking-[0.12em] uppercase mb-2">Exercises</div>
            <div className="text-[#ccff00] text-5xl font-black font-[family-name:var(--font-oswald)]">
              {totalExercises}
            </div>
          </div>
          <div className="flex-1 px-8 py-6">
            <div className="text-neutral-500 text-[10px] font-bold tracking-[0.12em] uppercase mb-2">Minutes</div>
            <div className="text-white text-5xl font-black font-[family-name:var(--font-oswald)]">
              {totalMinutes}
            </div>
          </div>
          <div className="flex-1 px-8 py-6">
            <div className="text-neutral-500 text-[10px] font-bold tracking-[0.12em] uppercase mb-2">Calories</div>
            <div className="text-white text-5xl font-black font-[family-name:var(--font-oswald)]">
              {totalCalories}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="bg-[#111214] p-1 rounded-xl flex items-center border border-[#1e1f24] gap-1">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'plan' ? 'bg-[#ccff00] text-black' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'saved' ? 'bg-[#ccff00] text-black' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 text-xs font-semibold">Sort By</span>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-[#111214] border border-[#1e1f24] hover:border-[#2a2b30] text-neutral-300 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              {sortBy}
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-[#151619] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-[100] flex flex-col">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-xs transition-colors ${
                    sortBy === option 
                      ? 'bg-[#1a1b1f] text-[#ccff00] font-bold border-l-2 border-[#ccff00]' 
                      : 'text-neutral-400 hover:bg-[#1a1b1f] hover:text-white border-l-2 border-transparent'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeWorkouts.length === 0 ? (
        <div className="w-full border border-dashed border-neutral-800 rounded-3xl py-28 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-white text-2xl font-black uppercase tracking-wider font-[family-name:var(--font-oswald)] mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-neutral-500 text-sm mb-7 max-w-xs">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] hover:bg-[#d4ff33] text-black font-extrabold text-xs px-7 py-3 rounded-full transition-colors"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedWorkouts.map((workout, idx) => (
            <div
              key={`${workout.id}-${idx}`}
              className="flex flex-col sm:flex-row bg-[#111214] rounded-2xl overflow-hidden border border-[#1e1f24] hover:border-neutral-700 transition-colors"
            >
              <div className="w-full sm:w-52 h-44 sm:h-auto bg-neutral-800 relative flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80"
                  alt={workout.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white text-2xl font-black uppercase tracking-tight font-[family-name:var(--font-oswald)]">
                      {workout.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {workout.equipment}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(workout.id)}
                    className="ml-4 p-1.5 text-neutral-600 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors flex-shrink-0"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-5 text-neutral-400 text-xs font-medium mt-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{workout.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>{workout.rating}</span>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="text-center bg-[#1e1f24] hover:bg-[#26272b] text-white font-bold py-2.5 px-6 rounded-lg transition-colors text-xs"
                  >
                    View Details
                  </Link>
                  {activeTab === 'plan' && (
                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="flex items-center gap-2 bg-transparent border border-[#1e1f24] hover:border-[#ccff00] hover:text-[#ccff00] text-neutral-500 font-bold py-2.5 px-6 rounded-lg transition-colors text-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark as Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function MyPlanPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-neutral-500 font-bold uppercase tracking-widest text-sm animate-pulse">
              Loading workouts…
            </div>
          </div>
        }
      >
        <MyPlanContent />
      </Suspense>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star } from 'lucide-react';

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export default function WorkoutList({ workouts }: { workouts: Workout[] }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10 relative z-10">
        <div>
          <h2 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-oswald)]">
            THE LIBRARY
          </h2>
          <p className="text-neutral-400 mt-1 text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-0">
        {workouts.map((workout) => (
          <Link
            href={`/workouts/${workout.id}`}
            key={workout.id}
            className="group flex flex-col bg-[#151619] rounded-2xl overflow-hidden hover:bg-[#1a1b1f] transition-colors border border-transparent hover:border-neutral-800"
          >
            <div className="w-full h-44 sm:h-48 bg-neutral-800 relative overflow-hidden">
              <Image
                src={workout.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80"}
                alt={workout.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1">

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {workout.muscleGroups.map(cat => (
                  <span
                    key={cat}
                    className="bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h3 className="text-white text-lg sm:text-xl font-black uppercase tracking-tight font-[family-name:var(--font-oswald)] mt-1">
                {workout.name}
              </h3>
              <p className="text-neutral-500 text-xs mt-1">
                {workout.equipment}
              </p>

              <div className="flex-1" />

              <div className="flex items-center gap-3 sm:gap-4 mt-5 text-neutral-400 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{workout.caloriesBurned} kcal</span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Star className="w-3.5 h-3.5 text-neutral-600" />
                  <span>{workout.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

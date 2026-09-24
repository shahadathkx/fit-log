import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { WorkoutButtons } from '@/components/WorkoutButtons';

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  let workoutData = null;
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', { next: { revalidate: 3600 } });
    if (res.ok) {
      const workouts = await res.json();
      workoutData = workouts.find((w: any) => w.id.toString() === resolvedParams.id);
    }
  } catch (error) {
    console.error(error);
  }

  if (!workoutData) {
    notFound();
  }

  const mappedWorkout = {
    id: workoutData.id.toString(),
    name: workoutData.name,
    categories: workoutData.muscleGroups,
    equipment: workoutData.equipment,
    duration: workoutData.duration,
    calories: workoutData.caloriesBurned,
    rating: workoutData.rating,
    description: workoutData.description,
    difficulty: workoutData.difficulty,
    sets: workoutData.sets,
    reps: workoutData.reps,
    instructions: workoutData.instructions,
    image: workoutData.image
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

        <div className="w-full lg:w-1/2">
          <div className="w-full aspect-[4/3] sm:aspect-[4/5] relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <Image
              src={mappedWorkout.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"}
              alt={mappedWorkout.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">

          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-oswald)] mb-3">
            {mappedWorkout.name}
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base mb-5 leading-relaxed">
            {mappedWorkout.description || 'A comprehensive workout designed to build strength and endurance.'}
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {mappedWorkout.categories.map((cat: string) => (
              <span
                key={cat}
                className="bg-[#ccff00] text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="bg-[#111214] border border-neutral-800 rounded-2xl overflow-hidden mb-8">
            <div className="flex flex-col divide-y divide-neutral-800/50">
              <SpecRow label="EQUIPMENT" value={mappedWorkout.equipment} />
              <SpecRow label="DIFFICULTY" value={mappedWorkout.difficulty || 'Intermediate'} />
              <SpecRow label="SETS" value={mappedWorkout.sets?.toString() || '3'} />
              <SpecRow label="REPS" value={mappedWorkout.reps || '8-12'} />
              <SpecRow label="DURATION" value={`${mappedWorkout.duration} min`} />
              <SpecRow label="CALORIES" value={`${mappedWorkout.calories} kcal`} />
              <SpecRow label="RATING" value={mappedWorkout.rating.toString()} />
            </div>
          </div>

          <div className="mb-8 sm:mb-10">
            <h2 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              INSTRUCTIONS
            </h2>
            <ol className="list-decimal list-outside ml-4 space-y-2.5 text-neutral-300 text-sm leading-relaxed">
              {(mappedWorkout.instructions || [
                'Maintain proper form throughout the movement.',
                'Control the weight during the eccentric phase.',
                'Breathe rhythmically: exhale on exertion, inhale on release.',
                'Rest 60-90 seconds between sets.'
              ]).map((step: string, idx: number) => (
                <li key={idx} className="pl-1 marker:text-neutral-500">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <WorkoutButtons workout={mappedWorkout} />

        </div>
      </div>
    </div>
  );
}

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-neutral-500 text-[10px] font-bold tracking-wider">{label}</span>
    <span className="text-neutral-200 text-sm font-medium">{value}</span>
  </div>
);

import React from 'react';
import WorkoutList, { Workout } from './WorkoutList';

const Library = async () => {
  let workouts: Workout[] = [];
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', { next: { revalidate: 3600 } });
    if (res.ok) {
      workouts = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
  }

  return (
    <section id="library" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <WorkoutList workouts={workouts} />
    </section>
  );
};

export default Library;

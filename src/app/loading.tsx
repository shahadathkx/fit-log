import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#1e1f24] rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#ccff00] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="text-[#ccff00] font-black uppercase tracking-widest text-sm animate-pulse font-[family-name:var(--font-oswald)]">
        Loading Workouts...
      </div>
    </div>
  );
}

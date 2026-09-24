'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import logoImage from '@/assets/logo.png';
import { usePlan } from '@/context/PlanContext';

const Navbar = () => {
  const { plannedWorkouts, savedWorkouts } = usePlan();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWorkouts = pathname === '/';
  const isMyPlan = pathname === '/my-plan';

  const close = () => setMenuOpen(false);

  return (
    <nav className="bg-[#0a0a0a] border-b border-neutral-800 relative z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">

        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2" onClick={close}>
            <Image src={logoImage} alt="FITLOG Logo" height={24} className="h-6 w-auto" />
            <span className="text-xl font-black tracking-widest text-white mt-0.5">FITLOG</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-none items-center gap-2">
          <Link
            href="/"
            className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
              isWorkouts ? 'bg-[#1a2305] text-[#ccff00]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
              isMyPlan ? 'bg-[#1a2305] text-[#ccff00]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-end gap-6">
          <Link href="/my-plan" className="flex items-center gap-2 group">
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">Plan</span>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ccff00] text-black text-xs font-bold group-hover:bg-[#d4ff33] transition-colors">
              {plannedWorkouts.length}
            </div>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center gap-2 group">
            <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">Saved</span>
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-700 text-neutral-400 text-xs font-medium group-hover:border-neutral-500 group-hover:text-neutral-300 transition-colors">
              {savedWorkouts.length}
            </div>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ccff00] text-black text-xs font-bold">
              {plannedWorkouts.length}
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-[#0a0a0a] px-4 py-4 flex flex-col gap-2">
          <Link
            href="/"
            onClick={close}
            className={`px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
              isWorkouts ? 'bg-[#1a2305] text-[#ccff00]' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={close}
            className={`px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
              isMyPlan ? 'bg-[#1a2305] text-[#ccff00]' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            My Plan
          </Link>
          <div className="border-t border-neutral-800 mt-2 pt-4 flex items-center gap-6">
            <Link href="/my-plan" onClick={close} className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-300">Plan</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ccff00] text-black text-xs font-bold">
                {plannedWorkouts.length}
              </div>
            </Link>
            <Link href="/my-plan?tab=saved" onClick={close} className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-400">Saved</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-700 text-neutral-400 text-xs font-medium">
                {savedWorkouts.length}
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

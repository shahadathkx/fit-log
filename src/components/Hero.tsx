import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bannerImage from '@/assets/banner.png';

const Hero = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pt-6 sm:pt-8 px-4 sm:px-6">
      <div className="bg-[#151619] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 sm:p-10 md:p-14">

        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 sm:gap-5 z-10">
          <span className="text-[#ccff00] text-[11px] font-black tracking-[0.15em] uppercase">
            Workout Library
          </span>

          <h1 className="text-white text-[2.6rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] font-black uppercase leading-[1.05] tracking-tight font-[family-name:var(--font-oswald)]">
            Train with intent.<br />Log every set.
          </h1>

          <p className="text-neutral-400 text-sm md:text-base max-w-sm leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-2 flex items-center justify-center bg-[#ccff00] hover:bg-[#d4ff33] text-black px-6 py-2.5 rounded-md text-sm font-extrabold transition-colors"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="hidden sm:flex w-full md:w-1/2 mt-10 md:mt-0 justify-center md:justify-end">
          <Image
            src={bannerImage}
            alt="Workout Machine"
            className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-[450px] object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;
